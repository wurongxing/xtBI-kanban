"use strict";

const https = require("https");

const VIEW_LABELS = { month: "月", week: "周", day: "日" };
const CITY_COLORS = { 深圳: "#28e681", 广州: "#1aa7ff" };

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  try {
    const sheets = await fetchAllSheets();
    const data = transformWorkbook(sheets);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "DINGTALK_SYNC_FAILED",
      message: error.message,
      hint: "请检查 Vercel 环境变量、钉钉应用权限、workbookId、sheetId 和表头是否与模板一致。"
    });
  }
};

function setCors(res) {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "GET,OPTIONS");
  res.setHeader("access-control-allow-headers", "content-type");
  res.setHeader("cache-control", "no-store");
}

async function fetchAllSheets() {
  const mapping = parseJsonEnv("DINGTALK_SHEETS");
  const result = {};
  for (const [name, sheetId] of Object.entries(mapping)) {
    result[name] = await fetchSheetValues(sheetId);
  }
  return result;
}

async function fetchSheetValues(sheetId) {
  const token = await getDingTalkAccessToken();
  const workbookId = requireEnv("DINGTALK_WORKBOOK_ID");
  const range = encodeURIComponent(process.env.DINGTALK_RANGE || "A1:Z300");
  const template = process.env.DINGTALK_READ_URL_TEMPLATE ||
    "https://api.dingtalk.com/v1.0/doc/workbooks/{workbookId}/sheets/{sheetId}/ranges/{range}";
  const url = template
    .replace("{workbookId}", encodeURIComponent(workbookId))
    .replace("{sheetId}", encodeURIComponent(sheetId))
    .replace("{range}", range);

  const json = await requestJson(url, {
    method: "GET",
    headers: { "x-acs-dingtalk-access-token": token }
  }, `读取钉钉表格失败 sheetId=${sheetId}`);
  return extractMatrix(json);
}

async function getDingTalkAccessToken() {
  const appKey = requireEnv("DINGTALK_APP_KEY");
  const appSecret = requireEnv("DINGTALK_APP_SECRET");
  const json = await requestJson("https://api.dingtalk.com/v1.0/oauth2/accessToken", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ appKey, appSecret })
  }, "获取钉钉 accessToken 失败");
  if (!json.accessToken) throw new Error(`钉钉 token 响应缺少 accessToken: ${JSON.stringify(json)}`);
  return json.accessToken;
}

function requestJson(url, options, label) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`${label}: HTTP ${res.statusCode} ${body.slice(0, 500)}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(new Error(`${label}: 响应不是合法 JSON ${body.slice(0, 500)}`));
        }
      });
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function extractMatrix(payload) {
  if (Array.isArray(payload.values)) return payload.values;
  if (payload.valueRange && Array.isArray(payload.valueRange.values)) return payload.valueRange.values;
  if (payload.data && Array.isArray(payload.data.values)) return payload.data.values;
  if (payload.result && Array.isArray(payload.result.values)) return payload.result.values;
  throw new Error(`无法识别钉钉表格返回结构: ${JSON.stringify(payload).slice(0, 500)}`);
}

function transformWorkbook(sheets) {
  const metaRows = rowsFromMatrix(sheets["基础配置"]);
  const cityRows = rowsFromMatrix(sheets["双城经营"]);
  const krRows = rowsFromMatrix(sheets["公司KR"]);
  const departmentRows = rowsFromMatrix(sheets["六部门OKR"]);
  const projectRows = rowsFromMatrix(sheets["六项目OKR"]);
  const personRows = rowsFromMatrix(sheets["个人OKR"]);
  const meta = Object.fromEntries(metaRows.map((r) => [r.key, r.value]));
  const views = {};

  for (const view of ["month", "week", "day"]) {
    const cities = cityRows
      .filter((r) => r.period_type === view)
      .map((r) => ({
        key: r["城市"] === "深圳" ? "shenzhen" : "guangzhou",
        name: r["城市"],
        color: CITY_COLORS[r["城市"]] || "#1aa7ff",
        goal: num(r["目标营收_万元"]),
        completed: num(r["实际完成_万元"]),
        rate: num(r["完成率_%"]),
        time: num(r["时间进度_%"]),
        gap: num(r["差距_万元"]),
        forecast: num(r["预计月底_万元"]),
        needed: num(r["还需完成_万元"]),
        status: text(r["状态"], "预警")
      }));

    const companyKr = krRows
      .filter((r) => r.period_type === view)
      .map((r) => ({
        code: text(r["KR编号"]),
        title: text(r["KR名称"]),
        target: text(r["目标"]),
        done: text(r["完成"]),
        rate: num(r["完成率_%"]),
        owner: text(r["负责人"]),
        support: text(r["支持部门"]),
        risk: text(r["风险"]),
        action: text(r["关键行动"]),
        color: text(r["颜色"], colorByRate(num(r["完成率_%"])))
      }));

    const goal = cities.reduce((sum, city) => sum + city.goal, 0);
    const completed = cities.reduce((sum, city) => sum + city.completed, 0);
    const rate = goal ? round((completed / goal) * 100, 1) : 0;
    const time = cities.length ? round(avg(cities.map((c) => c.time)), 1) : 0;

    views[view] = {
      label: VIEW_LABELS[view],
      mission: {
        time,
        goal: round(goal, 2),
        completed: round(completed, 2),
        rate,
        status: statusByRate(rate, time),
        gap: round(rate - time, 1)
      },
      cities,
      companyKr
    };
  }

  return {
    meta: {
      company: text(meta.company, "小铁台球教培"),
      period: text(meta.period, ""),
      updatedAt: new Date().toLocaleString("zh-CN", { hour12: false, timeZone: "Asia/Shanghai" }),
      totalGoal: num(meta.totalGoal, 85),
      syncMode: "钉钉实时数据"
    },
    views,
    departments: departmentRows.map((r) => ({
      name: text(r["部门"]),
      objective: text(r["Objective"]),
      owner: text(r["负责人"]),
      target: text(r["目标值"]),
      done: text(r["实际完成"]),
      unit: text(r["单位"]),
      rate: num(r["完成率_%"]),
      risk: text(r["风险/卡点"]),
      action: text(r["下一步具体动作"]),
      dueDate: text(r["截止日期"]),
      krs: splitKrs(r["关键KR"])
    })),
    projects: projectRows.map((r) => ({
      name: text(r["项目"]),
      objective: text(r["Objective"]),
      owner: text(r["负责人"]),
      target: text(r["目标值"]),
      done: text(r["实际完成"]),
      unit: text(r["单位"]),
      rate: num(r["完成率_%"]),
      status: text(r["状态"], statusByRate(num(r["完成率_%"]), 100)),
      risk: text(r["风险/卡点"]),
      action: text(r["下一步具体动作"]),
      krs: splitKrs(r["关键KR"])
    })),
    people: summarizePeople(personRows),
    peopleDetails: personRows.map((r) => ({
      department: text(r["部门"]),
      name: text(r["姓名"]),
      role: text(r["岗位"]),
      objective: text(r["个人Objective"]),
      krCode: text(r["KR编号"]),
      keyResult: text(r["关键KR"]),
      metric: text(r["衡量指标"]),
      target: num(r["目标值"]),
      actual: num(r["实际完成"]),
      rate: num(r["完成率_%"]),
      status: text(r["状态"], statusByRate(num(r["完成率_%"]), 100)),
      risk: text(r["风险/卡点"]),
      action: text(r["下一步具体动作"]),
      dueDate: text(r["截止日期"])
    }))
  };
}

function rowsFromMatrix(matrix) {
  if (!Array.isArray(matrix)) return [];
  const headerIndex = matrix.findIndex((row) => row && row.some((cell) => isHeader(cell)));
  if (headerIndex < 0) return [];
  const headers = matrix[headerIndex].map((v) => text(v));
  return matrix.slice(headerIndex + 1)
    .filter((row) => row && row.some((cell) => text(cell) !== ""))
    .map((row) => {
      const obj = {};
      headers.forEach((h, i) => {
        if (h) obj[h] = row[i];
      });
      return obj;
    });
}

function isHeader(value) {
  return ["period_type", "城市", "KR编号", "项目", "姓名", "部门", "key", "动作ID"].includes(text(value));
}

function summarizePeople(rows) {
  const byName = new Map();
  for (const r of rows) {
    const name = text(r["姓名"]);
    if (!name) continue;
    if (!byName.has(name)) {
      byName.set(name, {
        department: text(r["部门"], "未分部门"),
        role: text(r["岗位"]),
        objective: text(r["个人Objective"]),
        target: text(r["目标值"]),
        done: text(r["实际完成"]),
        action: text(r["下一步具体动作"], "待补充"),
        rates: [],
        weekly: [],
        statusRanks: []
      });
    }
    const item = byName.get(name);
    item.rates.push(num(r["完成率_%"]));
    item.weekly.push(num(r["完成率_%"]));
    item.statusRanks.push(statusRank(text(r["状态"], statusByRate(num(r["完成率_%"]), 100))));
  }
  return Array.from(byName.entries()).map(([name, item]) => ({
    department: item.department,
    name,
    role: item.role,
    objective: item.objective,
    target: item.target,
    done: item.done,
    personal: round(avg(item.rates), 1),
    weekly: round(avg(item.weekly), 1),
    status: rankStatus(Math.max(...item.statusRanks, 0)),
    action: item.action
  }));
}

function splitKrs(value) {
  return text(value).split(/[；;|\n]+/).map((item) => item.trim()).filter(Boolean);
}

function parseJsonEnv(name) {
  const raw = requireEnv(name);
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`${name} 不是合法 JSON`);
  }
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`缺少环境变量 ${name}`);
  return value;
}

function text(value, fallback = "") {
  if (value == null) return fallback;
  return String(value).trim() || fallback;
}

function num(value, fallback = 0) {
  if (value == null || value === "") return fallback;
  const n = Number(String(value).replace(/,/g, "").replace("%", ""));
  return Number.isFinite(n) ? n : fallback;
}

function avg(values) {
  const nums = values.filter((v) => Number.isFinite(v));
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

function round(value, digits = 1) {
  const base = Math.pow(10, digits);
  return Math.round((Number(value) || 0) * base) / base;
}

function statusByRate(rate, time = 100) {
  if (rate >= time) return "良好";
  if (rate >= time - 10) return "预警";
  return "滞后";
}

function statusRank(status) {
  if (status === "滞后") return 2;
  if (status === "预警") return 1;
  return 0;
}

function rankStatus(rank) {
  if (rank >= 2) return "滞后";
  if (rank >= 1) return "预警";
  return "良好";
}

function colorByRate(rate) {
  if (rate >= 60) return "#28e681";
  if (rate >= 35) return "#ffb11a";
  return "#ff4d5e";
}
