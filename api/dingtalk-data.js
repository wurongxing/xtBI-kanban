"use strict";

const https = require("https");

const VIEW_LABELS = { month: "月", week: "周", day: "日" };
const CITY_COLORS = { 深圳: "#28e681", 广州: "#1aa7ff" };
const DEFAULT_REQUIRED_SHEETS = [
  "基础配置",
  "双城经营",
  "公司KR",
  "六部门OKR",
  "六项目OKR",
  "教练经营",
  "城区分布",
  "转化漏斗"
];

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  const startedAt = Date.now();
  try {
    const sheets = await fetchAllSheets();
    const data = transformWorkbook(sheets);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "DINGTALK_SYNC_FAILED",
      message: error.message,
      durationMs: Date.now() - startedAt,
      hint: "请检查 Vercel 环境变量、钉钉应用权限、operatorId、workbookId、sheetId 和表头是否与模板一致。"
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
  const token = await getDingTalkAccessToken();
  const sheetNames = requiredSheetNames(mapping);
  const concurrency = clampInt(process.env.DINGTALK_CONCURRENCY, 1, 8, 4);
  const entries = await mapLimit(sheetNames, concurrency, async (name) => {
    const sheetId = mapping[name];
    if (!sheetId) return [name, []];
    return [name, await fetchSheetValues(sheetId, token)];
  });
  return Object.fromEntries(entries);
}

function requiredSheetNames(mapping) {
  const raw = process.env.DINGTALK_REQUIRED_SHEETS;
  if (raw) {
    const names = parseSheetNameList(raw).filter((name) => mapping[name]);
    if (names.length) return names;
  }
  return DEFAULT_REQUIRED_SHEETS.filter((name) => mapping[name]);
}

function parseSheetNameList(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map((item) => text(item)).filter(Boolean);
  } catch (error) {
    // Allow a simple comma/newline separated env value for easier Vercel editing.
  }
  return String(raw).split(/[,\n，；;]+/).map((item) => item.trim()).filter(Boolean);
}

async function fetchSheetValues(sheetId, token) {
  const workbookId = requireEnv("DINGTALK_WORKBOOK_ID");
  const operatorId = requireEnv("DINGTALK_OPERATOR_ID");
  const range = encodeURIComponent(process.env.DINGTALK_RANGE || "A1:Z300");
  const template = process.env.DINGTALK_READ_URL_TEMPLATE ||
    "https://api.dingtalk.com/v1.0/doc/workbooks/{workbookId}/sheets/{sheetId}/ranges/{range}";
  const baseUrl = template
    .replace("{workbookId}", encodeURIComponent(workbookId))
    .replace("{sheetId}", encodeURIComponent(sheetId))
    .replace("{range}", range);
  const url = appendQuery(baseUrl, { operatorId });

  const json = await requestJson(url, {
    method: "GET",
    headers: { "x-acs-dingtalk-access-token": token }
  }, `读取钉钉表格失败 sheetId=${sheetId}`);
  return extractMatrix(json);
}

function appendQuery(url, params) {
  const parsed = new URL(url);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      parsed.searchParams.set(key, value);
    }
  }
  return parsed.toString();
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
    const timeoutMs = clampInt(process.env.DINGTALK_HTTP_TIMEOUT_MS, 3000, 25000, 9000);
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
    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error(`${label}: 请求超过 ${timeoutMs}ms`));
    });
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function mapLimit(items, limit, worker) {
  const result = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      result[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return result;
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
  const coachRows = rowsFromMatrix(sheets["教练经营"]);
  const districtRows = rowsFromMatrix(sheets["城区分布"]);
  const funnelRows = rowsFromMatrix(sheets["转化漏斗"]);
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
        status: text(r["状态"], "预警"),
        monthlyGoal: num(r["月度目标_万元"], num(r["目标营收_万元"])),
        monthlyCompleted: num(r["月度完成_万元"], num(r["实际完成_万元"])),
        weekGoal: num(r["周目标_万元"], num(r["月度目标_万元"], num(r["目标营收_万元"])) / 4),
        weekCompleted: num(r["周完成_万元"]),
        yesterdayCompleted: num(r["昨日完成_万元"]),
        courseUsersTotal: num(r["正课总用户数"]),
        courseUsersExpiring: num(r["到期用户数"]),
        courseUsersExpiringMonth: num(r["本月到期用户数"]),
        trialLessonsTotal: num(r["总体验课数"]),
        trialLessonsMonth: num(r["本月体验课数"]),
        trialDeals: num(r["体验课成交数"]),
        coachesTotal: num(r["总教练数"]),
        coachesNew: num(r["新增教练数"]),
        coachesNewMonth: num(r["月度新增教练数"], num(r["新增教练数"])),
        coachesNewYesterday: num(r["昨日新增教练数"]),
        coachesNewMonthNames: splitNames(r["月度新增教练名字"] || r["月度新增教练名称"] || r["本月新增教练名字"] || r["本月新增教练"]),
        coachesNewYesterdayNames: splitNames(r["昨日新增教练名字"] || r["昨日新增教练名称"] || r["昨天新增教练名字"] || r["昨日新增教练"]),
        storesTotal: num(r["入驻门店数"]),
        storesPaidTotal: num(r["付费入驻门店数"]),
        storesFreeTotal: num(r["免费入驻门店数"]),
        storesNew: num(r["新增门店数"]),
        storesNewPaid: num(r["月度新签付费门店数"] || r["新签付费门店数"]),
        storesNewFree: num(r["月度新签免费门店数"] || r["新签免费门店数"]),
        storesNewMonth: num(r["月度新增门店数"], num(r["新增门店数"])),
        storesNewYesterday: num(r["昨日新增门店数"]),
        storesNewMonthList: splitStoreItems(r["月度新增门店所在区及名字"] || r["月度新增门店"] || r["本月新增门店所在区及名字"] || r["本月新增门店"]),
        storesNewYesterdayList: splitStoreItems(r["昨日新增门店所在区及名字"] || r["昨日新增门店"] || r["昨天新增门店所在区及名字"]),
        newSignedStores: num(r["新签门店数"], num(r["新增门店数"])),
        channels: {
          user: channelMetrics(r, "用户端"),
          coach: channelMetrics(r, "教练端"),
          store: channelMetrics(r, "门店端")
        },
        coaches: coachRows
          .filter((coach) => text(coach.period_type, view) === view && text(coach["城市"]) === text(r["城市"]))
          .map((coach) => ({
            name: text(coach["教练"]),
            level: text(coach["教练等级"], "未定级"),
            district: text(coach["区域"]),
            storeNames: splitNames(coach["服务门店"] || coach["门店名字"] || coach["门店名称"] || coach["门店名单"]),
            cumulativeTrialLessons: num(coach["累计体验课"] || coach["累计体验课数"] || coach["体验课数"]),
            cumulativeDeals: num(coach["累计转化"] || coach["累计成交"] || coach["累计成交数"] || coach["体验课成交数"]),
            cumulativeConversionRate: num(coach["累计转化率_%"] || coach["累计成交率_%"] || coach["成交率_%"]),
            monthTrialLessons: num(coach["月度体验课"] || coach["月度体验课数"] || coach["本月体验课数"]),
            monthDeals: num(coach["月度转化"] || coach["月度成交"] || coach["月度成交数"] || coach["本月成交数"]),
            monthConversionRate: num(coach["月度转化率_%"] || coach["月度成交率_%"] || coach["本月转化率_%"]),
            yesterdayTrialLessons: num(coach["昨日体验课"] || coach["昨日体验课数"]),
            yesterdayDeals: num(coach["昨日成交"] || coach["昨日成交数"] || coach["昨日转化"]),
            yesterdayConversionRate: num(coach["昨日转化率_%"] || coach["昨日成交率_%"]),
            trialLessons: num(coach["月度体验课"] || coach["月度体验课数"] || coach["体验课数"]),
            trialDeals: num(coach["月度转化"] || coach["月度成交"] || coach["体验课成交数"]),
            conversionRate: num(coach["月度转化率_%"] || coach["成交率_%"]),
            users: num(coach["用户数"]),
            renewals: num(coach["续课数"]),
            renewalRate: num(coach["续客率_%"]),
          })),
        districts: districtRows
          .filter((district) => text(district.period_type, view) === view && text(district["城市"]) === text(r["城市"]))
          .map((district) => ({
            name: text(district["区域"]),
            coaches: num(district["教练数"]),
            coachNames: splitNames(district["教练名字"] || district["教练名称"] || district["教练名单"]),
            stores: num(district["门店数"]),
            storeNames: splitNames(district["门店名字"] || district["门店名称"] || district["门店名单"])
          }))
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
    })),
    conversionFunnel: buildConversionFunnel(funnelRows)
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
  return ["period_type", "城市", "KR编号", "项目", "姓名", "部门", "key", "动作ID", "教练", "区域"].includes(text(value));
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

function channelMetrics(row, prefix) {
  const monthTrialLessons = num(row[`${prefix}月度体验课数`] || row[`${prefix}_月度体验课数`]);
  const monthDeals = num(row[`${prefix}月度成交数`] || row[`${prefix}_月度成交数`]);
  const yesterdayTrialLessons = num(row[`${prefix}昨日体验课数`] || row[`${prefix}_昨日体验课数`]);
  const yesterdayDeals = num(row[`${prefix}昨日成交数`] || row[`${prefix}_昨日成交数`]);
  return {
    monthTrialLessons,
    monthDeals,
    monthConversionRate: num(row[`${prefix}月度转化率_%`] || row[`${prefix}_月度转化率_%`], percentValue(monthDeals, monthTrialLessons)),
    monthRenewals: num(row[`${prefix}月度续课数`] || row[`${prefix}_月度续课数`]),
    yesterdayTrialLessons,
    yesterdayDeals,
    yesterdayConversionRate: num(row[`${prefix}昨日转化率_%`] || row[`${prefix}_昨日转化率_%`], percentValue(yesterdayDeals, yesterdayTrialLessons)),
    yesterdayRenewals: num(row[`${prefix}昨日续课数`] || row[`${prefix}_昨日续课数`])
  };
}

function percentValue(done, total) {
  return total ? round((done / total) * 100, 1) : 0;
}

function splitNames(value) {
  return text(value).split(/[、,，；;|\n]+/).map((item) => item.trim()).filter(Boolean);
}

function splitStoreItems(value) {
  return splitNames(value).map((item) => {
    const parts = item.split(/[:：｜|/／-]/).map((part) => part.trim()).filter(Boolean);
    if (parts.length >= 2) return { district: parts[0], name: parts.slice(1).join("-") };
    return { district: "", name: item };
  });
}

function buildConversionFunnel(rows) {
  const sorted = rows
    .filter((r) => text(r["环节"]))
    .sort((a, b) => num(a["排序"], 999) - num(b["排序"], 999));
  if (!sorted.length) return [];
  return sorted.map((r) => ({
    name: text(r["环节"]),
    value: text(r["数值"]),
    note: text(r["副标题"] || r["说明"] || r["备注"] || r["辅助指标"]),
    channels: [
      ["美团", r["美团"]],
      ["抖音", r["抖音"]],
      ["私域", r["私域"]],
      ["其他", r["其他"]]
    ].filter(([, value]) => text(value)).map(([name, value]) => ({ name, value: text(value) }))
  }));
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

function clampInt(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(number)));
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
