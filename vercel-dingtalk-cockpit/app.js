const fallbackData = {
  meta: {
    company: "小铁台球教培",
    period: "2026年7月1日 - 7月31日",
    updatedAt: "2026-07-14 17:50",
    totalGoal: 85,
    syncMode: "内置示例数据"
  },
  views: {
    month: {
      label: "月",
      mission: { time: 42, goal: 85, completed: 23.68, rate: 27.8, status: "滞后", gap: -15 },
      cities: [
        { key: "shenzhen", name: "深圳", color: "#28e681", rate: 24.7, goal: 35, completed: 8.65, time: 42, gap: -17.35, forecast: 31.2, needed: 26.55, status: "滞后" },
        { key: "guangzhou", name: "广州", color: "#1aa7ff", rate: 6.8, goal: 25, completed: 1.7, time: 42, gap: -23.3, forecast: 8.8, needed: 23.3, status: "滞后" }
      ],
      companyKr: [
        { code: "KR1", title: "公司营收目标85万", target: "850,000", done: "236,810", rate: 27.8, owner: "亚饰", support: "C端 / 小B / 大B", risk: "广州收入不足", action: "增加直播获客，提升转化", color: "#ff4d5e" },
        { code: "KR2", title: "有效体验课线索1400个", target: "1,400", done: "540", rate: 38.6, owner: "夏目", support: "流量铺 / C端", risk: "线索成本偏高", action: "优化投放ROI，提升短视频质量", color: "#ffb11a" },
        { code: "KR3", title: "成交率提升至30%", target: "30%", done: "26.7%", rate: 26.7, owner: "可可", support: "C端 / 小B / 大B", risk: "广州团队经验不足", action: "强化销售话术与跟进SOP", color: "#ff4d5e" },
        { code: "KR4", title: "广州复制模型完成60%", target: "60%", done: "40%", rate: 40, owner: "可晴", support: "C端 / 开发 / 大B", risk: "广州团队磨合不足", action: "完善培训体系，加快岗位SOP", color: "#ffb11a" }
      ]
    },
    week: {
      label: "周",
      mission: { time: 57, goal: 21.25, completed: 7.9, rate: 37.2, status: "预警", gap: -4.2 },
      cities: [
        { key: "shenzhen", name: "深圳", color: "#28e681", rate: 46.3, goal: 8.75, completed: 4.05, time: 57, gap: -0.94, forecast: 9.1, needed: 4.7, status: "预警" },
        { key: "guangzhou", name: "广州", color: "#1aa7ff", rate: 30.8, goal: 6.25, completed: 1.93, time: 57, gap: -1.62, forecast: 5.4, needed: 4.32, status: "滞后" }
      ],
      companyKr: [
        { code: "KR1", title: "本周营收目标21.25万", target: "212,500", done: "79,000", rate: 37.2, owner: "亚饰", support: "双城销售", risk: "广州低于周节奏", action: "每日复盘成交漏斗", color: "#ffb11a" },
        { code: "KR2", title: "体验课线索350个", target: "350", done: "151", rate: 43.1, owner: "夏目", support: "内容 / 投放", risk: "投放时段不稳定", action: "加大晚间高转化素材", color: "#ffb11a" },
        { code: "KR3", title: "成交率周均30%", target: "30%", done: "27.9%", rate: 48, owner: "可可", support: "销售组", risk: "跟进时效低", action: "2小时内二次触达", color: "#1aa7ff" },
        { code: "KR4", title: "广州SOP本周完成15%", target: "15%", done: "9%", rate: 60, owner: "可晴", support: "教研 / 运营", risk: "培训排期挤压", action: "固定晨会演练", color: "#28e681" }
      ]
    },
    day: {
      label: "日",
      mission: { time: 70, goal: 3.05, completed: 1.36, rate: 44.6, status: "预警", gap: -0.78 },
      cities: [
        { key: "shenzhen", name: "深圳", color: "#28e681", rate: 62.9, goal: 1.25, completed: 0.79, time: 70, gap: -0.08, forecast: 1.32, needed: 0.46, status: "良好" },
        { key: "guangzhou", name: "广州", color: "#1aa7ff", rate: 28, goal: 0.9, completed: 0.25, time: 70, gap: -0.38, forecast: 0.62, needed: 0.65, status: "滞后" }
      ],
      companyKr: [
        { code: "KR1", title: "今日营收目标3.05万", target: "30,500", done: "13,600", rate: 44.6, owner: "亚饰", support: "门店 / 销售", risk: "晚高峰未释放", action: "盯紧20:00前转化", color: "#ffb11a" },
        { code: "KR2", title: "今日体验课线索50个", target: "50", done: "23", rate: 46, owner: "夏目", support: "流量组", risk: "自然流量偏低", action: "补2条短视频切片", color: "#ffb11a" },
        { code: "KR3", title: "今日成交率30%", target: "30%", done: "25%", rate: 41, owner: "可可", support: "销售组", risk: "邀约到店率低", action: "重点跟进高意向名单", color: "#ffb11a" },
        { code: "KR4", title: "今日广州复制动作", target: "4项", done: "2项", rate: 50, owner: "可晴", support: "运营", risk: "教练排班冲突", action: "完成闭店复盘", color: "#1aa7ff" }
      ]
    }
  },
  departments: [
    { name: "流量铺", rate: 38, owner: "夏目", objective: "稳定有效体验课线索", target: "1,400", done: "540", unit: "条", action: "每日复盘素材ROI，淘汰低转化投放组", krs: ["有效线索1400条", "线索成本控制在38元内", "短视频日更12条"] },
    { name: "C端销售", rate: 28, owner: "可可", objective: "提升成交率与回款", target: "30%", done: "26.7%", unit: "成交率", action: "高意向名单2小时内二次触达，晚间集中逼单", krs: ["成交率30%", "回款35万", "到店体验转化45%"] },
    { name: "小B铺", rate: 42, owner: "渝锦", objective: "复制合作渠道", target: "20", done: "8", unit: "家", action: "锁定球房老板样板案例，形成招商话术包", krs: ["签约合作球房20家", "渠道营收12万", "样板店SOP完成100%"] },
    { name: "大B端", rate: 25, owner: "逸凡", objective: "签约校区与机构", target: "6", done: "1.5", unit: "个", action: "重点推进学校与青训机构联名课程", krs: ["签约机构6个", "机构体验课180人", "联名课包上线2套"] },
    { name: "课程开发", rate: 40, owner: "亚饰", objective: "打磨标准课包", target: "5", done: "2", unit: "套", action: "优先完成广州可复制的私教课包与教案", krs: ["标准课包5套", "教案视频60条", "考核题库完成80%"] },
    { name: "培训端", rate: 30, owner: "雯静", objective: "提升教练交付一致性", target: "15", done: "5", unit: "人", action: "建立教练周考核，低分项安排一对一陪跑", krs: ["认证教练15人", "交付评分90分", "新人训练营完成3期"] }
  ],
  projects: [
    { name: "暑假班", rate: 62, owner: "可可", objective: "暑期招生与转介绍", target: "300", done: "186", unit: "人", action: "用老学员转介绍和亲子体验日补齐后半程招生", krs: ["报名300人", "营收28万", "转介绍占比35%"] },
    { name: "赛事活动", rate: 45, owner: "逸凡", objective: "活动获客与品牌曝光", target: "8", done: "3.6", unit: "场", action: "把赛事报名页与体验课预约打通", krs: ["举办8场", "新增线索260条", "到店体验80人"] },
    { name: "等级考试", rate: 30, owner: "遥湖", objective: "考级产品转化", target: "120", done: "36", unit: "人", action: "推出考前冲刺包，联动教练做班级推荐", krs: ["考级报名120人", "通过率85%", "考前课包转化40%"] },
    { name: "线上课", rate: 40, owner: "亚饰", objective: "线上训练营营收", target: "10", done: "4", unit: "万", action: "增加直播诊断课，把线上课承接到私教转化", krs: ["线上营收10万", "训练营学员200人", "私教转化25%"] },
    { name: "台球学校招生", rate: 28, owner: "姚锦", objective: "广州模型验证", target: "80", done: "22", unit: "人", action: "广州校区先跑通体验课到报名的完整链路", krs: ["广州招生80人", "到店体验160人", "首月留存75%"] },
    { name: "自媒体矩阵", rate: 48, owner: "夏目", objective: "内容矩阵稳定产出", target: "360", done: "173", unit: "条", action: "统一脚本模板，优先放大高完播选题", krs: ["发布360条", "有效线索500条", "爆款视频12条"] }
  ],
  people: [
    { department: "课程开发", name: "亚饰", role: "课程总监", objective: "完成标准课包复制", target: "5套", done: "2套", personal: 65, weekly: 72, status: "良好", action: "本周完成广州私教课包验收" },
    { department: "流量铺", name: "夏目", role: "流量负责人", objective: "稳定有效线索供给", target: "1,400条", done: "540条", personal: 58, weekly: 63, status: "良好", action: "放大高完播素材投放" },
    { department: "C端销售", name: "可可", role: "C端销售负责人", objective: "提升体验课成交率", target: "30%", done: "26.7%", personal: 60, weekly: 65, status: "良好", action: "晚间集中跟进高意向名单" },
    { department: "小B铺", name: "潘微", role: "小B端负责人", objective: "跑通渠道合作成交", target: "12万", done: "6.6万", personal: 55, weekly: 60, status: "良好", action: "输出球房合作案例" },
    { department: "大B端", name: "逸凡", role: "大B端负责人", objective: "签约机构与校区", target: "6个", done: "1.5个", personal: 45, weekly: 50, status: "预警", action: "推进学校联名课程谈判" },
    { department: "培训端", name: "可晴", role: "广州运营", objective: "广州复制模型落地", target: "60%", done: "40%", personal: 52, weekly: 58, status: "预警", action: "完成岗位SOP演练" },
    { department: "小B铺", name: "渝锦", role: "渠道拓展", objective: "新增合作球房", target: "20家", done: "8家", personal: 49, weekly: 54, status: "预警", action: "约访重点球房老板" },
    { department: "项目组", name: "遥湖", role: "考级项目", objective: "考级产品转化", target: "120人", done: "36人", personal: 41, weekly: 47, status: "滞后", action: "推出考前冲刺包" },
    { department: "项目组", name: "姚锦", role: "招生运营", objective: "广州招生模型验证", target: "80人", done: "22人", personal: 36, weekly: 44, status: "滞后", action: "补齐体验课到报名链路" },
    { department: "培训端", name: "雯静", role: "培训主管", objective: "教练交付一致性", target: "15人", done: "5人", personal: 61, weekly: 67, status: "良好", action: "组织教练周考核" },
    { department: "培训端", name: "小北", role: "深圳教练", objective: "提升私教续费", target: "90%", done: "83%", personal: 70, weekly: 74, status: "良好", action: "沉淀高续费课堂案例" },
    { department: "培训端", name: "阿哲", role: "广州教练", objective: "广州交付稳定", target: "90分", done: "78分", personal: 43, weekly: 51, status: "预警", action: "跟练标准课SOP" },
    { department: "流量铺", name: "南溪", role: "社群运营", objective: "提升社群转介绍", target: "120条", done: "68条", personal: 57, weekly: 62, status: "良好", action: "推动老学员裂变活动" },
    { department: "流量铺", name: "子墨", role: "短视频剪辑", objective: "提高内容产能", target: "180条", done: "119条", personal: 66, weekly: 69, status: "良好", action: "批量剪辑高转化切片" },
    { department: "C端销售", name: "阿星", role: "客服邀约", objective: "提升邀约到店率", target: "45%", done: "32%", personal: 48, weekly: 55, status: "预警", action: "高意向线索优先电话跟进" }
  ]
};

let activeView = "month";
let cockpitData = fallbackData;

const els = {
  period: document.querySelector("#periodText"),
  updated: document.querySelector("#updatedText"),
  sync: document.querySelector("#syncText"),
  totalGoal: document.querySelector("#totalGoal"),
  mission: document.querySelector("#missionMetrics"),
  krList: document.querySelector("#companyKrList"),
  krDetails: document.querySelector("#krDetails"),
  departments: document.querySelector("#departmentOkr"),
  projects: document.querySelector("#projectOkr"),
  people: document.querySelector("#peopleOkr"),
  insights: document.querySelector("#aiInsights"),
  dockMenu: document.querySelector("#dockMenu"),
  dialog: document.querySelector("#syncDialog"),
  endpointInput: document.querySelector("#endpointInput")
};

function money(value) {
  return `${Number(value).toFixed(value >= 10 ? 1 : 2)}万`;
}

function statusClass(status) {
  if (status === "良好") return "good";
  if (status === "预警") return "warn";
  return "bad";
}

function render() {
  const view = cockpitData.views[activeView];
  els.period.textContent = `数据周期：${cockpitData.meta.period}`;
  els.updated.textContent = `更新于：${cockpitData.meta.updatedAt}`;
  els.sync.textContent = `钉钉同步：${cockpitData.meta.syncMode}`;
  els.totalGoal.textContent = `${cockpitData.meta.totalGoal}万`;

  els.mission.innerHTML = [
    metricRing("时间进度", view.mission.time, "#1aa7ff"),
    metric("经营目标", money(view.mission.goal), ""),
    metric("当前完成", money(view.mission.completed), ""),
    metric("完成率", `${view.mission.rate}%`, "warn"),
    metric("状态", view.mission.status, statusClass(view.mission.status), `较计划滞后 ${Math.abs(view.mission.gap)}%`)
  ].join("");

  els.krList.innerHTML = view.companyKr.map(kr => `
    <div class="kr-row">
      <strong>${kr.code}</strong>
      <div>
        <span>${kr.title}</span>
        <div class="bar" style="--value:${kr.rate}; --bar-color:${kr.color}"><i></i></div>
      </div>
      <b style="color:${kr.color}">${kr.rate}%</b>
    </div>
  `).join("");

  renderCity(view.cities[0], "#shenzhenCard");
  renderCity(view.cities[1], "#guangzhouCard");
  document.querySelector("#pkViewLabel").textContent = view.label;
  document.querySelector("#szRevenue").textContent = money(view.cities[0].goal);
  document.querySelector("#szDone").textContent = money(view.cities[0].completed);
  document.querySelector("#gzRevenue").textContent = money(view.cities[1].goal);
  document.querySelector("#gzDone").textContent = money(view.cities[1].completed);

  els.krDetails.innerHTML = view.companyKr.map(kr => `
    <section class="kr-card">
      <h3>${kr.code} ${kr.title}</h3>
      <div class="kr-pair"><span>目标</span><strong>${kr.target}</strong></div>
      <div class="kr-pair"><span>完成率</span><strong style="color:${kr.color}">${kr.rate}%</strong></div>
      <div class="kr-pair"><span>负责人</span><strong>${kr.owner}</strong></div>
      <div class="kr-pair"><span>支持部门</span><strong>${kr.support}</strong></div>
      <p>风险：${kr.risk}</p>
      <p>关键行动：${kr.action}</p>
    </section>
  `).join("");

  els.departments.innerHTML = cockpitData.departments.map(okrCard).join("");
  els.projects.innerHTML = cockpitData.projects.map(okrCard).join("");
  const people = cockpitData.people.map(normalizePerson);
  const groupedPeople = people.reduce((groups, person) => {
    const department = person.department || "未分部门";
    if (!groups[department]) groups[department] = [];
    groups[department].push(person);
    return groups;
  }, {});
  els.people.innerHTML = Object.entries(groupedPeople).map(([department, members]) => `
    <section class="people-group">
      <div class="people-group-head">
        <h3>${department}</h3>
        <span>${members.length}人</span>
      </div>
      <div class="people-group-list">
        ${members.map(personCard).join("")}
      </div>
    </section>
  `).join("");

  els.insights.innerHTML = `
    <section class="insight-group">
      <h3 class="bad">风险预警</h3>
      <ul><li>广州营收低于时间进度，需加大渠道线索与高意向跟进。</li><li>成交率未达30%，销售SOP和复盘频率需要拉满。</li></ul>
    </section>
    <section class="insight-group">
      <h3 class="good">亮点分析</h3>
      <ul><li>深圳经营基本盘稳定，日维度已经接近节奏线。</li><li>暑假班项目推进最快，可沉淀为广州复制样板。</li></ul>
    </section>
    <section class="insight-group">
      <h3 class="blue">经营建议</h3>
      <ul><li>按日盯线索、到店、成交、回款四段漏斗。</li><li>每周拆解双城PK，给低于节奏的负责人设补救动作。</li></ul>
    </section>
  `;
}

function metric(label, value, cls = "", note = "") {
  return `<div class="metric"><span>${label}</span><strong class="${cls}">${value}</strong>${note ? `<em>${note}</em>` : ""}</div>`;
}

function metricRing(label, value, color) {
  return `<div class="metric"><span>${label}</span><div class="ring" style="--value:${value}; --ring-color:${color}" data-value="${value}%"></div></div>`;
}

function renderCity(city, selector) {
  document.querySelector(selector).style.setProperty("--city-color", city.color);
  document.querySelector(selector).innerHTML = `
    <h2>${city.name}经营看板</h2>
    <div class="city-main">
      <div class="ring" style="--value:${city.rate}; --ring-color:${city.color}" data-value="${city.rate}%"></div>
      <div class="city-stats">
        ${metric("目标营收", money(city.goal))}
        ${metric("实际完成", money(city.completed))}
        ${metric("完成率", `${city.rate}%`, city.rate < 30 ? "warn" : "good")}
        ${metric("时间进度", `${city.time}%`, "blue")}
      </div>
    </div>
    <div class="city-bottom">
      ${smallStat("差距", money(city.gap), "bad")}
      ${smallStat("预计月底", money(city.forecast), city.forecast >= city.goal ? "good" : "warn")}
      ${smallStat("还需完成", money(city.needed), "warn")}
      ${smallStat("状态", city.status, statusClass(city.status))}
    </div>
  `;
}

function smallStat(label, value, cls) {
  return `<div class="mini-stat"><span>${label}</span><strong class="${cls}">${value}</strong></div>`;
}

function normalizePerson(person) {
  if (!Array.isArray(person)) return person;
  const [name, role, personal, weekly, status] = person;
  return {
    department: "未分部门",
    name,
    role,
    objective: "个人OKR待补充",
    target: "--",
    done: "--",
    personal,
    weekly,
    status,
    action: "待补充"
  };
}

function personCard(person) {
  const personalClass = person.personal < 45 ? "bad" : person.personal < 56 ? "warn" : "good";
  const weeklyClass = person.weekly < 52 ? "bad" : person.weekly < 60 ? "warn" : "good";
  return `
    <article class="person-card">
      <div class="person-card-top">
        <div>
          <strong>${person.name}</strong>
          <span>${person.role}</span>
        </div>
        <span class="status-dot ${statusClass(person.status)}">${person.status}</span>
      </div>
      <p>O：${person.objective}</p>
      <div class="person-values">
        <span>目标 <b>${person.target}</b></span>
        <span>完成 <b>${person.done}</b></span>
      </div>
      <div class="person-rates">
        <span>个人 <b class="${personalClass}">${person.personal}%</b></span>
        <span>周节奏 <b class="${weeklyClass}">${person.weekly}%</b></span>
      </div>
      <em>动作：${person.action}</em>
    </article>
  `;
}

function okrCard(item) {
  const valueLabel = item.unit ? `${item.target}${item.unit}` : item.target;
  const doneLabel = item.unit ? `${item.done}${item.unit}` : item.done;
  const krs = Array.isArray(item.krs) ? item.krs : [];
  return `
    <section class="okr-card">
      <div class="okr-card-head">
        <div>
          <h3>${item.name}</h3>
          <span class="okr-owner">负责人：${item.owner}</span>
        </div>
        <strong class="${item.rate < 35 ? "bad" : item.rate < 55 ? "warn" : "good"}">${item.rate}%</strong>
      </div>
      <p class="okr-objective">O：${item.objective}</p>
      <div class="okr-values">
        <div><span>目标值</span><b>${valueLabel}</b></div>
        <div><span>完成值</span><b>${doneLabel}</b></div>
      </div>
      <div class="okr-progress" style="--value:${item.rate}"><i></i></div>
      <ul class="okr-kr-list">
        ${krs.map((kr, index) => `<li><b>KR${index + 1}</b><span>${kr}</span></li>`).join("")}
      </ul>
      <p class="okr-action">动作：${item.action || "待补充"}</p>
    </section>
  `;
}

async function loadRemoteData(manual = false) {
  const defaultEndpoint = window.location.protocol === "file:" ? "./data.json" : "/api/dingtalk-data";
  const endpoint = localStorage.getItem("dingtalkEndpoint") || defaultEndpoint;
  if (!endpoint) {
    if (manual) alert("还没有配置数据接口。");
    return;
  }
  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    cockpitData = await response.json();
    cockpitData.meta.syncMode = endpoint === "./data.json" ? "静态JSON数据" : "钉钉实时数据";
    render();
  } catch (error) {
    cockpitData.meta.syncMode = endpoint === "./data.json" ? "内置示例数据" : `同步失败：${error.message}`;
    render();
    if (manual) alert(`读取数据失败：${error.message}`);
  }
}

document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () => {
    activeView = button.dataset.view;
    document.querySelectorAll("[data-view]").forEach(item => item.classList.toggle("active", item === button));
    render();
  });
});

document.querySelector("#dockToggle").addEventListener("click", () => els.dockMenu.classList.toggle("open"));
document.querySelector("#settingsButton").addEventListener("click", () => {
  els.endpointInput.value = localStorage.getItem("dingtalkEndpoint") || "";
  els.dialog.showModal();
});
document.querySelector("#syncButton").addEventListener("click", () => loadRemoteData(true));
document.querySelector("#refreshButton").addEventListener("click", () => loadRemoteData(true));
document.querySelector("#saveEndpoint").addEventListener("click", () => {
  const value = els.endpointInput.value.trim();
  if (value) {
    localStorage.setItem("dingtalkEndpoint", value);
  } else {
    localStorage.removeItem("dingtalkEndpoint");
  }
  loadRemoteData(true);
});
document.querySelector("#pngButton").addEventListener("click", () => alert("浏览器可用系统截图导出。线上版建议接入 html2canvas 生成PNG。"));
document.querySelector("#pdfButton").addEventListener("click", () => window.print());
document.querySelector("#templateButton").addEventListener("click", () => alert("模板字段见 README.md：公司KR、城市经营、部门OKR、项目OKR、个人OKR。"));
document.querySelector("#uploadButton").addEventListener("click", () => alert("Vercel实时版通过 /api/dingtalk-data 同步钉钉表格。Excel模板可用于整理钉钉表格字段。"));

render();
loadRemoteData(false);
setInterval(() => loadRemoteData(false), 60000);
