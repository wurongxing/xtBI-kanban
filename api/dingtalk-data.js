"use strict";

const https = require("https");

const API_VERSION = "2026-08-04-city-sheet-date-auto-v5";
const VIEW_LABELS = { month: "月", week: "周", day: "日" };
const CITY_COLORS = { 深圳: "#28e681", 广州: "#1aa7ff" };
const DEFAULT_REQUIRED_SHEETS = [
  "基础配置",
  "双城经营",
  "公司KR",
  "六部门OKR",
  "六项目OKR",
  "门店明细",
  "教练档案",
  "教练门店关系",
  "体验课流水",
  "正课流水",
  "转化漏斗",
  "经营重点"
];
const DETAIL_SHEETS = ["门店明细", "教练档案", "教练门店关系", "体验课流水", "正课流水"];
const SHEET_COLUMN_LIMITS = {
  "门店明细": "M",
  "教练档案": "K",
  "教练门店关系": "H",
  "体验课流水": "Q",
  "正课流水": "Q"
};
const SHEET_ALIASES = {
  "正课流水": ["续课流水", "正课订单", "正课数据", "续课数据"],
  "六项目OKR": ["项目进度", "六项目", "项目OKR"],
  "六部门OKR": ["总部运营中心OKR", "部门OKR", "六部门"],
  "经营重点": ["运营提醒", "经营提醒", "风险预警"]
};
const MONEY_KEYS = ["金额", "实付金额", "支付金额", "订单金额", "营收", "收入", "体验课金额", "正课金额"];
const TRIAL_COUNT_KEYS = ["下单数", "体验课数", "体验课下单数", "订单数"];
const DEAL_KEYS = ["转化数", "成交数", "成交", "体验课成交数", "正课成交数"];
const RENEWAL_KEYS = ["续约数", "续课数", "正课数", "购买正课数", "成交数"];

module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  const startedAt = Date.now();
  const deadline = startedAt + clampInt(process.env.DINGTALK_FUNCTION_BUDGET_MS, 3000, 26000, 7500);
  try {
    const sheets = await fetchAllSheets(deadline);
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

async function fetchAllSheets(deadline) {
  const token = await getDingTalkAccessToken(deadline);
  const { mapping, liveKnown } = await resolveWorkbookSheetMapping(token, deadline);
  const sheetNames = requiredSheetNames(mapping, liveKnown);
  const concurrency = clampInt(process.env.DINGTALK_CONCURRENCY, 2, 4, 2);
  const warnings = [];
  const entries = await mapLimit(sheetNames, concurrency, async (name) => {
    if (!hasTime(deadline, 900)) {
      warnings.push(syncWarning(name, "", "同步时间预算已到，跳过剩余Sheet，避免Vercel 504"));
      return [name, []];
    }
    const sheetId = resolveSheetId(name, mapping, liveKnown);
    if (!sheetId) return [name, []];
    try {
      const result = await fetchSheetValues(sheetId, token, name, deadline);
      if (result.warnings.length) warnings.push(...result.warnings);
      return [name, result.values];
    } catch (error) {
      warnings.push(syncWarning(name, "", error.message));
      return [name, []];
    }
  });
  const sheets = Object.fromEntries(entries);
  sheets.__syncWarnings = warnings;
  sheets.__syncInfo = {
    apiVersion: API_VERSION,
    requestedSheets: sheetNames,
    warningCount: warnings.length
  };
  return sheets;
}

async function resolveWorkbookSheetMapping(token, deadline) {
  const liveMapping = await fetchWorkbookSheetMapping(token, deadline).catch(() => ({}));
  if (Object.keys(liveMapping).length) {
    return { mapping: liveMapping, liveKnown: true };
  }

  const envMapping = process.env.DINGTALK_USE_ENV_SHEETS === "true"
    ? parseOptionalJsonEnv("DINGTALK_SHEETS", {})
    : {};
  if (Object.keys(envMapping).length) {
    return { mapping: envMapping, liveKnown: false };
  }

  return {
    mapping: Object.fromEntries(allKnownSheetNames().map((name) => [name, name])),
    liveKnown: false
  };
}

async function fetchWorkbookSheetMapping(token, deadline) {
  const workbookId = requireEnv("DINGTALK_WORKBOOK_ID");
  const operatorId = requireEnv("DINGTALK_OPERATOR_ID");
  const templates = process.env.DINGTALK_LIST_SHEETS_URL_TEMPLATE
    ? [process.env.DINGTALK_LIST_SHEETS_URL_TEMPLATE]
    : [
      "https://api.dingtalk.com/v1.0/doc/workbooks/{workbookId}/sheets",
      "https://api.dingtalk.io/v1.0/doc/workbooks/{workbookId}/sheets"
    ];
  let lastError = null;
  for (const template of templates) {
    try {
      const url = appendQuery(template.replace("{workbookId}", encodeURIComponent(workbookId)), { operatorId });
      const json = await requestJson(url, {
        method: "GET",
        headers: { "x-acs-dingtalk-access-token": token },
        timeoutMs: requestTimeoutMs(deadline),
        deadline
      }, "获取钉钉工作表列表失败");
      return Object.fromEntries(extractSheetList(json)
        .map((sheet) => [text(sheet.name || sheet.sheetName || sheet.title || sheet.id), text(sheet.id || sheet.sheetId || sheet.name || sheet.title)])
        .filter(([name, id]) => name && id));
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("获取钉钉工作表列表失败");
}

function extractSheetList(payload) {
  if (Array.isArray(payload)) return payload;
  const candidates = [
    payload.sheets,
    payload.sheetList,
    payload.value,
    payload.data,
    payload.data?.sheets,
    payload.data?.sheetList,
    payload.data?.value,
    payload.data?.items,
    payload.result,
    payload.result?.sheets,
    payload.result?.sheetList,
    payload.result?.value,
    payload.result?.items
  ];
  for (const item of candidates) {
    if (Array.isArray(item)) return item;
  }
  throw new Error(`无法识别钉钉工作表列表返回结构: ${JSON.stringify(payload).slice(0, 500)}`);
}

function allKnownSheetNames() {
  return Array.from(new Set(DEFAULT_REQUIRED_SHEETS.flatMap((name) => [name, ...(SHEET_ALIASES[name] || [])])));
}

function resolveSheetId(name, mapping, liveKnown) {
  const aliases = [name, ...(SHEET_ALIASES[name] || [])];
  for (const alias of aliases) {
    if (mapping[alias]) return mapping[alias];
  }
  return liveKnown ? "" : name;
}

function requiredSheetNames(mapping, liveKnown) {
  const raw = process.env.DINGTALK_USE_ENV_REQUIRED_SHEETS === "true"
    ? process.env.DINGTALK_REQUIRED_SHEETS
    : "";
  if (raw) {
    const names = parseSheetNameList(raw).filter((name) => resolveSheetId(name, mapping, liveKnown));
    if (names.length) return names;
  }
  return DEFAULT_REQUIRED_SHEETS
    .filter((name) => resolveSheetId(name, mapping, liveKnown));
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

async function fetchSheetValues(sheetId, token, sheetName, deadline) {
  const range = rangeForSheet(sheetName);
  if (shouldChunkRange(sheetName, range)) {
    return fetchSheetValuesChunked(sheetId, token, sheetName, range, deadline);
  }
  return {
    values: await fetchSheetRange(sheetId, token, sheetName, range, deadline),
    warnings: []
  };
}

async function fetchSheetValuesChunked(sheetId, token, sheetName, range, deadline) {
  const parsed = parseA1Range(range);
  if (!parsed) {
    return {
      values: await fetchSheetRange(sheetId, token, sheetName, range, deadline),
      warnings: []
    };
  }

  const warnings = [];
  const headerRange = `${parsed.startCol}${parsed.startRow}:${parsed.endCol}${parsed.startRow}`;
  let header = [];
  try {
    header = await fetchSheetRange(sheetId, token, sheetName, headerRange, deadline);
  } catch (error) {
    warnings.push(syncWarning(sheetName, headerRange, error.message));
  }

  const chunkRows = clampInt(process.env.DINGTALK_CHUNK_ROWS, 200, 350, 260);
  const chunks = [];
  for (let row = parsed.startRow + 1; row <= parsed.endRow; row += chunkRows) {
    const endRow = Math.min(row + chunkRows - 1, parsed.endRow);
    chunks.push(`${parsed.startCol}${row}:${parsed.endCol}${endRow}`);
  }

  const matrices = [];
  let consecutiveBlankChunks = 0;
  for (const chunkRange of chunks) {
    if (!hasTime(deadline, 900)) {
      warnings.push(syncWarning(sheetName, chunkRange, "同步时间预算已到，停止读取该Sheet剩余分段"));
      break;
    }
    const matrix = await fetchChunkWithSplit(sheetId, token, sheetName, chunkRange, warnings, deadline);
    if (isBlankMatrix(matrix)) {
      consecutiveBlankChunks += 1;
      if (consecutiveBlankChunks >= 1) break;
      continue;
    }
    consecutiveBlankChunks = 0;
    if (matrix.length) matrices.push(matrix);
  }

  const values = [
    ...(header.length ? header : []),
    ...matrices.flat()
  ];
  return { values, warnings };
}

async function fetchChunkWithSplit(sheetId, token, sheetName, range, warnings, deadline) {
  try {
    return await fetchSheetRange(sheetId, token, sheetName, range, deadline);
  } catch (error) {
    const parsed = parseA1Range(range);
    const minRows = clampInt(process.env.DINGTALK_MIN_CHUNK_ROWS, 20, 80, 40);
    if (!parsed || parsed.rowCount <= minRows || !isRetryableDingTalkError(error)) {
      warnings.push(syncWarning(sheetName, range, error.message));
      return [];
    }
    const middle = parsed.startRow + Math.floor(parsed.rowCount / 2) - 1;
    const first = `${parsed.startCol}${parsed.startRow}:${parsed.endCol}${middle}`;
    const second = `${parsed.startCol}${middle + 1}:${parsed.endCol}${parsed.endRow}`;
    const firstRows = await fetchChunkWithSplit(sheetId, token, sheetName, first, warnings, deadline);
    if (!hasTime(deadline, 900)) {
      warnings.push(syncWarning(sheetName, second, "同步时间预算已到，停止读取拆分后的剩余分段"));
      return firstRows;
    }
    const secondRows = await fetchChunkWithSplit(sheetId, token, sheetName, second, warnings, deadline);
    return [...firstRows, ...secondRows];
  }
}

async function fetchSheetRange(sheetId, token, sheetName, rangeText, deadline) {
  ensureTime(deadline, `读取钉钉表格失败 sheet=${sheetName} range=${rangeText}`);
  const workbookId = requireEnv("DINGTALK_WORKBOOK_ID");
  const operatorId = requireEnv("DINGTALK_OPERATOR_ID");
  const range = encodeURIComponent(rangeText);
  const template = process.env.DINGTALK_READ_URL_TEMPLATE ||
    "https://api.dingtalk.com/v1.0/doc/workbooks/{workbookId}/sheets/{sheetId}/ranges/{range}";
  const baseUrl = template
    .replace("{workbookId}", encodeURIComponent(workbookId))
    .replace("{sheetId}", encodeURIComponent(sheetId))
    .replace("{range}", range);
  const url = appendQuery(baseUrl, { operatorId });

  const json = await requestJsonWithRetry(url, {
    method: "GET",
    headers: { "x-acs-dingtalk-access-token": token },
    timeoutMs: requestTimeoutMs(deadline),
    deadline
  }, `读取钉钉表格失败 sheet=${sheetName} sheetId=${sheetId} range=${rangeText}`);
  return extractMatrix(json);
}

async function requestJsonWithRetry(url, options, label) {
  const attempts = clampInt(process.env.DINGTALK_RETRY_ATTEMPTS, 1, 2, 2);
  let lastError = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    if (options?.deadline) ensureTime(options.deadline, label);
    try {
      return await requestJson(url, options, label);
    } catch (error) {
      lastError = error;
      if (!isRetryableDingTalkError(error) || attempt === attempts) {
        throw error;
      }
      await delay(400 * attempt);
    }
  }
  throw lastError;
}

function isRetryableDingTalkError(error) {
  return /HTTP 429|HTTP 500|HTTP 502|HTTP 503|HTTP 504|请求超过|ECONNRESET|ETIMEDOUT|socket hang up/i.test(error.message || "");
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function hasTime(deadline, reserve = 500) {
  return !deadline || Date.now() + reserve < deadline;
}

function ensureTime(deadline, label) {
  if (!hasTime(deadline, 500)) {
    throw new Error(`${label}: 同步时间预算已到，已停止继续请求以避免 Vercel 504`);
  }
}

function requestTimeoutMs(deadline) {
  const configured = clampInt(process.env.DINGTALK_HTTP_TIMEOUT_MS, 800, 2500, 1800);
  if (!deadline) return configured;
  const remaining = Math.max(500, deadline - Date.now() - 500);
  return Math.min(configured, remaining);
}

function rangeForSheet(sheetName) {
  const ranges = parseOptionalJsonEnv("DINGTALK_RANGES", {});
  if (ranges[sheetName]) return clampRangeCells(ranges[sheetName]);
  if (sheetName === "双城经营") return "A1:Z20";
  if (DETAIL_SHEETS.includes(sheetName)) {
    return detailRangeForSheet(sheetName);
  }
  return clampRangeCells(process.env.DINGTALK_RANGE || "A1:Z80");
}

function detailRangeForSheet(sheetName) {
  const base = parseA1Range(process.env.DINGTALK_DETAIL_RANGE || "A1:Z700");
  const endRow = base?.endRow || 700;
  const endCol = SHEET_COLUMN_LIMITS[sheetName] || base?.endCol || "Z";
  return clampRangeCells(`A1:${endCol}${endRow}`);
}

function shouldChunkRange(sheetName, range) {
  if (!DETAIL_SHEETS.includes(sheetName)) return false;
  const parsed = parseA1Range(range);
  return Boolean(parsed && parsed.rowCount > clampInt(process.env.DINGTALK_CHUNK_ROWS, 200, 350, 260));
}

function parseA1Range(range) {
  const match = String(range || "").trim().match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);
  if (!match) return null;
  const [, startColRaw, startRowRaw, endColRaw, endRowRaw] = match;
  const startRow = Number(startRowRaw);
  const endRow = Number(endRowRaw);
  if (!Number.isFinite(startRow) || !Number.isFinite(endRow)) return null;
  const safeStart = Math.min(startRow, endRow);
  const safeEnd = Math.max(startRow, endRow);
  return {
    startCol: startColRaw.toUpperCase(),
    endCol: endColRaw.toUpperCase(),
    startRow: safeStart,
    endRow: safeEnd,
    rowCount: safeEnd - safeStart + 1
  };
}

function isBlankMatrix(matrix) {
  return !Array.isArray(matrix) || matrix.length === 0 || matrix.every((row) => (
    !Array.isArray(row) || row.every((cell) => text(cell) === "")
  ));
}

function clampRangeCells(range) {
  const raw = String(range || "A1:Z500").trim();
  const match = raw.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/i);
  if (!match) return raw;

  const [, startColRaw, startRowRaw, endColRaw, endRowRaw] = match;
  const startCol = columnIndex(startColRaw);
  const endCol = columnIndex(endColRaw);
  const startRow = Number(startRowRaw);
  const endRow = Number(endRowRaw);
  const columns = Math.max(1, Math.abs(endCol - startCol) + 1);
  const rows = Math.max(1, Math.abs(endRow - startRow) + 1);
  const maxRows = Math.floor(30000 / columns);
  if (rows <= maxRows) return raw.toUpperCase();
  const safeEndRow = startRow + maxRows - 1;
  return `${startColRaw.toUpperCase()}${startRow}:${endColRaw.toUpperCase()}${safeEndRow}`;
}

function syncWarning(sheet, range, message) {
  return {
    sheet,
    range,
    message: String(message || "").replace(/\s+/g, " ").slice(0, 260)
  };
}

function columnIndex(label) {
  return String(label).toUpperCase().split("").reduce((sum, char) => (
    sum * 26 + char.charCodeAt(0) - 64
  ), 0);
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

async function getDingTalkAccessToken(deadline) {
  const appKey = requireEnv("DINGTALK_APP_KEY");
  const appSecret = requireEnv("DINGTALK_APP_SECRET");
  ensureTime(deadline, "获取钉钉 accessToken 失败");
  const json = await requestJson("https://api.dingtalk.com/v1.0/oauth2/accessToken", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ appKey, appSecret }),
    timeoutMs: requestTimeoutMs(deadline),
    deadline
  }, "获取钉钉 accessToken 失败");
  if (!json.accessToken) throw new Error(`钉钉 token 响应缺少 accessToken: ${JSON.stringify(json)}`);
  return json.accessToken;
}

function requestJson(url, options, label) {
  return new Promise((resolve, reject) => {
    const { timeoutMs: explicitTimeoutMs, deadline, ...requestOptions } = options || {};
    const timeoutMs = explicitTimeoutMs || requestTimeoutMs(deadline);
    const req = https.request(url, requestOptions, (res) => {
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
    if (requestOptions.body) req.write(requestOptions.body);
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
  const storeRows = rowsFromMatrix(sheets["门店明细"]);
  const coachProfileRows = rowsFromMatrix(sheets["教练档案"]);
  const relationRows = rowsFromMatrix(sheets["教练门店关系"]);
  const trialRows = rowsFromMatrix(sheets["体验课流水"]);
  const renewalRows = rowsFromMatrix(sheets["正课流水"] || sheets["续课流水"]);
  const meta = Object.fromEntries(metaRows.map((r) => [r.key, r.value]));
  const autoModel = buildAutoOperatingModel({
    meta,
    stores: storeRows,
    coaches: coachProfileRows,
    relations: relationRows,
    trials: trialRows,
    renewals: renewalRows
  });
  const views = {};

  for (const view of ["month", "week", "day"]) {
    const scopedCityRows = cityRows.filter((r) => r.period_type === view);
    const rowsForView = scopedCityRows.length ? scopedCityRows : fallbackCityRows(view, autoModel[view]);
    const cities = rowsForView
      .filter((r) => r.period_type === view)
      .map((r) => buildCityViewRow(r, view, autoModel[view]?.[text(r["城市"])], coachRows, districtRows));

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
      syncMode: (sheets.__syncWarnings || []).length ? "钉钉实时数据（部分Sheet跳过）" : "钉钉实时数据",
      syncWarnings: sheets.__syncWarnings || [],
      syncWarningCount: (sheets.__syncWarnings || []).length,
      apiVersion: sheets.__syncInfo?.apiVersion || API_VERSION
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

function buildCityViewRow(r, view, auto, coachRows, districtRows) {
  const cityName = text(r["城市"]);
  const monthlyGoal = num(firstValue(r, ["月度目标_万元", "月度目标 万元", "月度目标", "目标营收_万元"]));
  const monthlyCompleted = num(firstValue(r, ["月度完成_万元", "月度完成 万元", "月度完成", "实际完成_万元"]));
  const monthlyRate = num(firstValue(r, ["月完成率", "月完成率_%", "月度完成率", "完成率_%"]), monthlyGoal ? round((monthlyCompleted / monthlyGoal) * 100, 1) : 0);
  const weekGoal = num(firstValue(r, ["周目标_万元", "周目标 万元", "周目标"]), monthlyGoal ? round(monthlyGoal / 4, 2) : 0);
  const weekCompleted = num(firstValue(r, ["周完成_万元", "周完成 万元", "周完成"]));
  const weekRate = num(firstValue(r, ["周完成率", "周完成率_%"]), weekGoal ? round((weekCompleted / weekGoal) * 100, 1) : 0);
  const yesterdayCompleted = num(firstValue(r, ["昨日完成_万元", "昨日完成 万元", "昨日完成"]));
  return {
    key: cityName === "深圳" ? "shenzhen" : "guangzhou",
    name: cityName,
    color: CITY_COLORS[cityName] || "#1aa7ff",
    goal: monthlyGoal,
    completed: monthlyCompleted,
    rate: monthlyRate,
    time: view === "month" ? monthProgressPercent() : num(r["时间进度_%"], view === "day" ? 100 : 100),
    gap: num(r["差距_万元"], round(monthlyCompleted - monthlyGoal, 2)),
    forecast: num(r["预计月底_万元"]),
    needed: num(r["还需完成_万元"], Math.max(round(monthlyGoal - monthlyCompleted, 2), 0)),
    status: text(r["状态"], "预警"),
    monthlyGoal,
    monthlyCompleted,
    weekGoal,
    weekCompleted,
    weekRate,
    yesterdayCompleted,
    courseUsersTotal: auto?.users ?? num(r["正课总用户数"]),
    courseUsersExpiring: num(r["到期用户数"]),
    courseUsersExpiringMonth: num(r["本月到期用户数"]),
    trialLessonsTotal: auto?.cumulativeTrialLessons ?? num(r["总体验课数"]),
    trialLessonsMonth: auto?.monthTrialLessons ?? num(r["本月体验课数"]),
    trialDeals: auto?.monthDeals ?? num(r["体验课成交数"]),
    coachesTotal: auto?.coachesTotal ?? num(r["总教练数"]),
    coachesNew: auto?.coachesNewMonth ?? num(r["新增教练数"]),
    coachesNewMonth: auto?.coachesNewMonth ?? num(r["月度新增教练数"], num(r["新增教练数"])),
    coachesNewYesterday: auto?.coachesNewYesterday ?? num(r["昨日新增教练数"]),
    coachesNewMonthNames: auto?.coachesNewMonthNames ?? splitNames(r["月度新增教练名字"] || r["月度新增教练名称"] || r["本月新增教练名字"] || r["本月新增教练"]),
    coachesNewYesterdayNames: auto?.coachesNewYesterdayNames ?? splitNames(r["昨日新增教练名字"] || r["昨日新增教练名称"] || r["昨天新增教练名字"] || r["昨日新增教练"]),
    storesTotal: auto?.storesTotal ?? num(r["入驻门店数"]),
    storesPaidTotal: auto?.storesPaidTotal ?? num(r["付费入驻门店数"]),
    storesFreeTotal: auto?.storesFreeTotal ?? num(r["免费入驻门店数"]),
    storesNew: auto?.storesNewMonth ?? num(r["新增门店数"]),
    storesNewPaid: auto?.storesNewPaidMonth ?? num(r["月度新签付费门店数"] || r["新签付费门店数"]),
    storesNewFree: auto?.storesNewFreeMonth ?? num(r["月度新签免费门店数"] || r["新签免费门店数"]),
    storesNewMonth: auto?.storesNewMonth ?? num(r["月度新增门店数"], num(r["新增门店数"])),
    storesNewYesterday: auto?.storesNewYesterday ?? num(r["昨日新增门店数"]),
    storesNewMonthList: auto?.storesNewMonthList ?? splitStoreItems(r["月度新增门店所在区及名字"] || r["月度新增门店"] || r["本月新增门店所在区及名字"] || r["本月新增门店"]),
    storesNewYesterdayList: auto?.storesNewYesterdayList ?? splitStoreItems(r["昨日新增门店所在区及名字"] || r["昨日新增门店"] || r["昨天新增门店所在区及名字"]),
    newSignedStores: auto?.storesNewMonth ?? num(r["新签门店数"], num(r["新增门店数"])),
    formulaLogic: auto?.formulaLogic || formulaLogic(),
    channels: auto?.channels || {
      user: channelMetrics(r, "用户端"),
      coach: channelMetrics(r, "教练端"),
      store: channelMetrics(r, "门店端")
    },
    coaches: auto?.coaches || coachRows
      .filter((coach) => text(coach.period_type, view) === view && text(coach["城市"]) === cityName)
      .map(coachSummaryFromRow),
    districts: auto?.districts || districtRows
      .filter((district) => text(district.period_type, view) === view && text(district["城市"]) === cityName)
      .map(districtSummaryFromRow)
  };
}

function fallbackCityRows(view, autoView = {}) {
  const names = Object.keys(autoView).length ? Object.keys(autoView) : ["深圳", "广州"];
  return names.map((city) => ({
    period_type: view,
    "城市": city,
    "目标营收_万元": 0,
    "月度目标_万元": 0,
    "周目标_万元": 0,
    "时间进度_%": view === "day" ? 100 : view === "week" ? 100 : monthProgressPercent(),
    "状态": "待设目标"
  }));
}

function monthProgressPercent() {
  const now = shanghaiDateParts();
  const days = new Date(Date.UTC(now.year, now.month, 0)).getUTCDate();
  return round((Math.max(now.day - 1, 0) / days) * 100, 1);
}

function coachSummaryFromRow(coach) {
  return {
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
  };
}

function districtSummaryFromRow(district) {
  return {
    name: text(district["区域"]),
    coaches: num(district["教练数"]),
    coachNames: splitNames(district["教练名字"] || district["教练名称"] || district["教练名单"]),
    stores: num(district["门店数"]),
    storeNames: splitNames(district["门店名字"] || district["门店名称"] || district["门店名单"])
  };
}

function buildAutoOperatingModel(source) {
  if (!source.stores.length && !source.coaches.length && !source.trials.length && !source.renewals.length) return {};
  const periods = operatingPeriods();
  const cities = Array.from(new Set([
    ...source.stores.map((row) => text(row["城市"])),
    ...source.coaches.map((row) => text(row["城市"])),
    ...source.trials.map((row) => text(row["城市"])),
    ...source.renewals.map((row) => text(row["城市"]))
  ].filter(Boolean)));
  const relationsByCoach = groupRelationsByCoach(source.relations);
  const model = {};
  for (const [view, period] of Object.entries(periods)) {
    model[view] = {};
    for (const city of cities) {
      model[view][city] = buildAutoCity(city, period, periods, source, relationsByCoach);
    }
  }
  return model;
}

function buildAutoCity(city, period, periods, source, relationsByCoach) {
  const cityStores = source.stores.filter((row) => text(row["城市"]) === city);
  const cityCoaches = source.coaches.filter((row) => text(row["城市"]) === city);
  const cityTrials = source.trials.filter((row) => text(row["城市"]) === city);
  const cityRenewals = source.renewals.filter((row) => text(row["城市"]) === city);
  const scopedTrials = cityTrials.filter((row) => dateInPeriod(rowDate(row), period));
  const scopedRenewals = cityRenewals.filter((row) => dateInPeriod(rowDate(row), period));
  const monthTrials = cityTrials.filter((row) => dateInPeriod(rowDate(row), periods.month));
  const weekTrials = cityTrials.filter((row) => dateInPeriod(rowDate(row), periods.week));
  const yesterdayTrials = cityTrials.filter((row) => dateInPeriod(rowDate(row), periods.day));
  const monthRenewals = cityRenewals.filter((row) => dateInPeriod(rowDate(row), periods.month));
  const weekRenewals = cityRenewals.filter((row) => dateInPeriod(rowDate(row), periods.week));
  const yesterdayRenewals = cityRenewals.filter((row) => dateInPeriod(rowDate(row), periods.day));
  const monthStores = cityStores.filter((row) => isNewRowInPeriod(row, "入驻日期", periods.month, "month"));
  const yesterdayStores = cityStores.filter((row) => isNewRowInPeriod(row, "入驻日期", periods.day, "day"));
  const monthCoaches = cityCoaches.filter((row) => isNewRowInPeriod(row, "入职日期", periods.month, "month"));
  const yesterdayCoaches = cityCoaches.filter((row) => isNewRowInPeriod(row, "入职日期", periods.day, "day"));
  const revenueWan = round((sumMetricAny(scopedTrials, MONEY_KEYS) + sumMetricAny(scopedRenewals, MONEY_KEYS)) / 10000, 2);
  return {
    revenueWan,
    monthRevenueWan: round((sumMetricAny(monthTrials, MONEY_KEYS) + sumMetricAny(monthRenewals, MONEY_KEYS)) / 10000, 2),
    weekRevenueWan: round((sumMetricAny(weekTrials, MONEY_KEYS) + sumMetricAny(weekRenewals, MONEY_KEYS)) / 10000, 2),
    yesterdayRevenueWan: round((sumMetricAny(yesterdayTrials, MONEY_KEYS) + sumMetricAny(yesterdayRenewals, MONEY_KEYS)) / 10000, 2),
    cumulativeTrialLessons: sumMetricAny(cityTrials, TRIAL_COUNT_KEYS, 1),
    monthTrialLessons: sumMetricAny(monthTrials, TRIAL_COUNT_KEYS, 1),
    monthDeals: sumMetricAny(monthTrials, DEAL_KEYS),
    users: sumMetricAny(cityTrials, DEAL_KEYS) + sumMetricAny(cityRenewals, RENEWAL_KEYS, 1),
    coachesTotal: cityCoaches.filter((row) => text(row["在职状态"], "在职") !== "离职").length,
    coachesNewMonth: monthCoaches.length,
    coachesNewYesterday: yesterdayCoaches.length,
    coachesNewMonthNames: monthCoaches.map(coachNameFromRow).filter(Boolean),
    coachesNewYesterdayNames: yesterdayCoaches.map(coachNameFromRow).filter(Boolean),
    storesTotal: cityStores.length,
    storesPaidTotal: cityStores.filter(isPaidStore).length,
    storesFreeTotal: cityStores.filter((row) => !isPaidStore(row)).length,
    storesNewMonth: monthStores.length,
    storesNewPaidMonth: monthStores.filter(isPaidStore).length,
    storesNewFreeMonth: monthStores.filter((row) => !isPaidStore(row)).length,
    storesNewYesterday: yesterdayStores.length,
    storesNewMonthList: monthStores.map(storeItem),
    storesNewYesterdayList: yesterdayStores.map(storeItem),
    channels: {
      user: aggregateChannel(monthTrials, monthRenewals, yesterdayTrials, yesterdayRenewals),
      coach: aggregateChannel(monthTrials, monthRenewals, yesterdayTrials, yesterdayRenewals),
      store: aggregateChannel(monthTrials, monthRenewals, yesterdayTrials, yesterdayRenewals)
    },
    coaches: cityCoaches.map((coach) => aggregateCoach(coach, cityTrials, cityRenewals, relationsByCoach, periods)),
    districts: aggregateDistricts(city, cityStores, cityCoaches),
    formulaLogic: formulaLogic()
  };
}

function aggregateCoach(coach, trials, renewals, relationsByCoach, periods) {
  const coachId = text(coach["教练ID"]);
  const coachName = coachNameFromRow(coach);
  const ownTrial = trials.filter((row) => sameCoach(row, coachId, coachName));
  const ownRenewal = renewals.filter((row) => sameCoach(row, coachId, coachName));
  const monthTrial = ownTrial.filter((row) => dateInPeriod(rowDate(row), periods.month));
  const yesterdayTrial = ownTrial.filter((row) => dateInPeriod(rowDate(row), periods.day));
  const renewalCount = sumMetricAny(ownRenewal, RENEWAL_KEYS, 1);
  const cumulativeTrial = sumMetricAny(ownTrial, TRIAL_COUNT_KEYS, 1);
  const cumulativeDeals = sumMetricAny(ownTrial, DEAL_KEYS);
  const monthTrialCount = sumMetricAny(monthTrial, TRIAL_COUNT_KEYS, 1);
  const monthDeals = sumMetricAny(monthTrial, DEAL_KEYS);
  const yesterdayTrialCount = sumMetricAny(yesterdayTrial, TRIAL_COUNT_KEYS, 1);
  const yesterdayDeals = sumMetricAny(yesterdayTrial, DEAL_KEYS);
  return {
    name: coachName,
    level: text(coach["教练等级"], "未定级"),
    district: text(coach["区域"]),
    storeNames: relationsByCoach.get(coachId)?.length ? relationsByCoach.get(coachId) : splitNames(coach["服务门店"] || coach["门店名称"]),
    cumulativeTrialLessons: cumulativeTrial,
    cumulativeDeals,
    cumulativeConversionRate: percentValue(cumulativeDeals, cumulativeTrial),
    monthTrialLessons: monthTrialCount,
    monthDeals,
    monthConversionRate: percentValue(monthDeals, monthTrialCount),
    yesterdayTrialLessons: yesterdayTrialCount,
    yesterdayDeals,
    yesterdayConversionRate: percentValue(yesterdayDeals, yesterdayTrialCount),
    trialLessons: monthTrialCount,
    trialDeals: monthDeals,
    conversionRate: percentValue(monthDeals, monthTrialCount),
    users: cumulativeDeals,
    renewals: renewalCount,
    renewalRate: percentValue(renewalCount, cumulativeDeals)
  };
}

function aggregateDistricts(city, stores, coaches) {
  const districts = Array.from(new Set([
    ...stores.flatMap((row) => splitDistricts(row["区域"])),
    ...coaches.flatMap((row) => splitDistricts(row["区域"]))
  ].filter(Boolean)));
  return districts.map((district) => {
    const districtStores = stores.filter((row) => rowHasDistrict(row, district));
    const districtCoaches = coaches.filter((row) => rowHasDistrict(row, district));
    return {
      name: district,
      coaches: districtCoaches.length,
      coachNames: districtCoaches.map((row) => text(row["教练"])).filter(Boolean),
      stores: districtStores.length,
      storeNames: districtStores.map((row) => text(row["门店名称"])).filter(Boolean)
    };
  });
}

function splitDistricts(value) {
  return splitNames(value).map(normalizeDistrict).filter(Boolean);
}

function rowHasDistrict(row, district) {
  return splitDistricts(row["区域"]).includes(normalizeDistrict(district));
}

function normalizeDistrict(value) {
  return text(value).replace(/行政区$/, "区");
}

function aggregateChannel(monthTrials, monthRenewals, yesterdayTrials, yesterdayRenewals) {
  const monthTrialLessons = sumMetricAny(monthTrials, TRIAL_COUNT_KEYS, 1);
  const monthDeals = sumMetricAny(monthTrials, DEAL_KEYS);
  const yesterdayTrialLessons = sumMetricAny(yesterdayTrials, TRIAL_COUNT_KEYS, 1);
  const yesterdayDeals = sumMetricAny(yesterdayTrials, DEAL_KEYS);
  return {
    monthTrialLessons,
    monthDeals,
    monthConversionRate: percentValue(monthDeals, monthTrialLessons),
    monthRenewals: sumMetricAny(monthRenewals, RENEWAL_KEYS, 1),
    yesterdayTrialLessons,
    yesterdayDeals,
    yesterdayConversionRate: percentValue(yesterdayDeals, yesterdayTrialLessons),
    yesterdayRenewals: sumMetricAny(yesterdayRenewals, RENEWAL_KEYS, 1)
  };
}

function groupRelationsByCoach(rows) {
  const map = new Map();
  for (const row of rows) {
    const coachId = text(row["教练ID"]);
    const storeName = text(row["门店名称"]);
    if (!coachId || !storeName) continue;
    if (!map.has(coachId)) map.set(coachId, []);
    if (!map.get(coachId).includes(storeName)) map.get(coachId).push(storeName);
  }
  return map;
}

function operatingPeriods() {
  const today = shanghaiDateParts();
  const monthStart = shanghaiDate(today.year, today.month - 1, 1);
  const monthEnd = shanghaiDate(today.year, today.month, 0, 23, 59, 59, 999);
  const todayStart = shanghaiDate(today.year, today.month - 1, today.day);
  const yesterdayStart = shanghaiDate(today.year, today.month - 1, today.day - 1);
  const yesterdayEnd = new Date(yesterdayStart.getTime() + 86400000 - 1);
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 6);
  return {
    month: { start: monthStart, end: monthEnd },
    week: { start: weekStart, end: new Date(todayStart.getTime() + 86400000 - 1) },
    day: { start: yesterdayStart, end: yesterdayEnd }
  };
}

function dateKeysFor(key) {
  if (key === "入驻日期") {
    return ["入驻日期", "入驻时间", "新签日期", "新签时间", "签约日期", "签约时间", "门店入驻日期", "门店入驻时间"];
  }
  if (key === "入职日期") {
    return ["入职日期", "入职时间", "加入日期", "加入时间", "教练入职日期", "教练入职时间"];
  }
  return [
    key,
    "日期",
    "下单日期",
    "成交日期",
    "支付日期",
    "创建日期",
    "创建时间",
    "支付时间",
    "时间"
  ];
}

function rowDate(row, key = "日期") {
  const value = firstValue(row, dateKeysFor(key));
  if (value instanceof Date) return value;
  if (typeof value === "number") return new Date(Math.round((value - 25569) * 86400 * 1000));
  const raw = text(value);
  if (!raw) return null;
  const normalized = raw.replace(/[年月.]/g, "-").replace(/日/g, "").replace(/\//g, "-");
  const localMatch = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?)?$/);
  if (localMatch) {
    const [, year, month, day, hour = "0", minute = "0", second = "0"] = localMatch;
    return shanghaiDate(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
  }
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function dateInPeriod(date, period) {
  return date && date >= period.start && date <= period.end;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function endOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

function shanghaiDate(year, monthIndex, day, hour = 0, minute = 0, second = 0, millisecond = 0) {
  return new Date(Date.UTC(year, monthIndex, day, hour - 8, minute, second, millisecond));
}

function shanghaiDateParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    year: Number(value.year),
    month: Number(value.month),
    day: Number(value.day)
  };
}

function sumMetric(rows, key) {
  return rows.reduce((sum, row) => sum + num(row[key], key === "下单数" || key === "已消课数" ? 1 : 0), 0);
}

function sumMetricAny(rows, keys, fallbackPerRow = 0) {
  return rows.reduce((sum, row) => {
    for (const key of keys) {
      if (text(row[key]) !== "") return sum + num(row[key]);
    }
    return sum + fallbackPerRow;
  }, 0);
}

function firstValue(row, keys) {
  for (const key of keys) {
    if (text(row[key]) !== "") return row[key];
  }
  return "";
}

function coachNameFromRow(row) {
  return text(row["教练"] || row["教练姓名"] || row["姓名"] || row["负责人"]);
}

function sameCoach(row, coachId, coachName) {
  const rowCoachName = coachNameFromRow(row);
  return (coachId && text(row["教练ID"]) === coachId) || (coachName && rowCoachName === coachName);
}

function isPaidStore(row) {
  return text(row["入驻类型"]).includes("付费") || num(row["是否付费"]) > 0;
}

function isNewRowInPeriod(row, dateKey, period, scope) {
  if (isStockRow(row)) return false;
  if (scope === "day" && isTruthy(row["昨日新增"])) return true;
  if (scope === "month" && isExplicitMonthNew(row)) return true;
  return dateInPeriod(rowDate(row, dateKey), period);
}

function isStockRow(row) {
  return /存量|历史|已有|老数据|非新增/.test(text(row["新增类型"] || row["新增状态"] || row["数据类型"]));
}

function isExplicitMonthNew(row) {
  return /本月新增|本月新签|月度新增|月度新签|新签|新增/.test(text(row["新增类型"] || row["新增状态"] || row["数据类型"])) ||
    isTruthy(row["本月新增"]) ||
    isTruthy(row["本月新签"]);
}

function isTruthy(value) {
  return ["1", "是", "true", "TRUE", "本月新增", "本月新签", "昨日新增"].includes(text(value));
}

function storeItem(row) {
  return { district: text(row["区域"]), name: text(row["门店名称"]) };
}

function formulaLogic() {
  return [
    "本月=系统北京时间当前自然月；昨日=系统北京时间当前日期前一天；本周=最近7天。",
    "教练体验课数=体验课流水.下单数求和；转化数=体验课流水.转化数求和；转化率=转化数/体验课数。",
    "业绩目标/完成=双城经营Sheet；体验课=体验课流水Sheet；正课/续课=正课流水Sheet。",
    "城区教练/门店=教练档案、门店明细按城市+区域分组；服务门店=教练门店关系按教练ID聚合。"
  ];
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
  return ["period_type", "城市", "KR编号", "项目", "姓名", "部门", "key", "动作ID", "教练", "教练ID", "门店ID", "负责人", "区域", "日期", "类型", "排序"].includes(text(value).trim());
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

function parseOptionalJsonEnv(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
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
