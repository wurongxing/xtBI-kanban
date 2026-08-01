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
  ],
  conversionFunnel: [
    { name: "小程序日活", value: "8,600", note: "浏览转体验转化率 6.3%" },
    {
      name: "体验课下单数",
      value: "540",
      note: "退款数 42",
      channels: [
        { name: "美团", value: "168" },
        { name: "抖音", value: "146" },
        { name: "私域", value: "174" },
        { name: "其他", value: "52" }
      ]
    },
    { name: "未退款数", value: "498", note: "下单未预约数 64 / 预约未上课数 48" },
    { name: "已消课数", value: "386", note: "有效下单消课率 77.5%" },
    { name: "转化数", value: "118", note: "转化率 30.6%" },
    { name: "续约数", value: "46", note: "续约率 39.0%" }
  ]
};

const AUTO_SYNC_INTERVAL_MS = 30000;
const ENTITY_CITY_KEYS = [
  "coachesTotal",
  "coachesNew",
  "coachesNewMonth",
  "coachesNewYesterday",
  "coachesNewMonthNames",
  "coachesNewYesterdayNames",
  "storesTotal",
  "storesPaidTotal",
  "storesFreeTotal",
  "storesNew",
  "storesNewPaid",
  "storesNewFree",
  "storesNewMonth",
  "storesNewYesterday",
  "storesNewMonthList",
  "storesNewYesterdayList",
  "newSignedStores",
  "coaches",
  "districts",
  "formulaLogic"
];
let activeView = "month";
let cockpitData = fallbackData;
let localEntitySnapshot = null;
const coachTableState = {};

const els = {
  period: document.querySelector("#periodText"),
  updated: document.querySelector("#updatedText"),
  sync: document.querySelector("#syncText"),
  totalGoal: document.querySelector("#totalGoal"),
  totalCompleted: document.querySelector("#totalCompleted"),
  timeProgress: document.querySelector("#timeProgress"),
  cityGrid: document.querySelector(".city-grid"),
  detailGrid: document.querySelector(".detail-grid"),
  dockMenu: document.querySelector("#dockMenu"),
  dialog: document.querySelector("#syncDialog"),
  endpointInput: document.querySelector("#endpointInput")
};

const OPERATING_DEFAULTS = {
  shenzhen: {
    courseUsersTotal: 428,
    courseUsersExpiring: 76,
    courseUsersExpiringMonth: 31,
    trialLessonsTotal: 920,
    trialLessonsMonth: 210,
    trialDeals: 58,
    coachesTotal: 22,
    coachesNew: 4,
    storesTotal: 38,
    storesPaidTotal: 10,
    storesFreeTotal: 28,
    storesNew: 6,
    storesNewPaid: 2,
    storesNewFree: 4,
    newSignedStores: 6,
    coachesNewMonth: 4,
    coachesNewYesterday: 1,
    storesNewMonth: 6,
    storesNewYesterday: 1,
    coachesNewMonthNames: ["阿宇", "林晓", "大川", "周辰"],
    coachesNewYesterdayNames: ["周辰"],
    storesNewMonthList: [
      { district: "南山", name: "科技园店" },
      { district: "南山", name: "后海店" },
      { district: "福田", name: "车公庙店" },
      { district: "宝安", name: "西乡店" },
      { district: "龙岗", name: "坂田店" },
      { district: "龙华", name: "民治店" }
    ],
    storesNewYesterdayList: [{ district: "龙华", name: "民治店" }],
    monthlyGoal: 35,
    monthlyCompleted: 8.65,
    weekGoal: 8.75,
    weekCompleted: 4.05,
    yesterdayCompleted: 0.79,
    channels: {
      user: { monthTrialLessons: 118, monthDeals: 36, monthConversionRate: 30.5, monthRenewals: 42, yesterdayTrialLessons: 9, yesterdayDeals: 3, yesterdayConversionRate: 33.3, yesterdayRenewals: 4 },
      coach: { monthTrialLessons: 72, monthDeals: 22, monthConversionRate: 30.6, monthRenewals: 28, yesterdayTrialLessons: 6, yesterdayDeals: 2, yesterdayConversionRate: 33.3, yesterdayRenewals: 3 },
      store: { monthTrialLessons: 20, monthDeals: 8, monthConversionRate: 40, monthRenewals: 11, yesterdayTrialLessons: 2, yesterdayDeals: 1, yesterdayConversionRate: 50, yesterdayRenewals: 1 }
    },
    coaches: [
      { name: "小北", level: "高级", district: "南山", storeNames: ["南山旗舰店", "科技园店"], cumulativeTrialLessons: 186, cumulativeDeals: 78, cumulativeConversionRate: 41.9, monthTrialLessons: 36, monthDeals: 14, monthConversionRate: 38.9, yesterdayTrialLessons: 4, yesterdayDeals: 2, yesterdayConversionRate: 50, users: 86, renewals: 18, renewalRate: 76 },
      { name: "雯静", level: "高级", district: "福田", storeNames: ["福田中心店", "车公庙店"], cumulativeTrialLessons: 158, cumulativeDeals: 61, cumulativeConversionRate: 38.6, monthTrialLessons: 32, monthDeals: 12, monthConversionRate: 37.5, yesterdayTrialLessons: 3, yesterdayDeals: 1, yesterdayConversionRate: 33.3, users: 74, renewals: 15, renewalRate: 72 },
      { name: "子墨", level: "中级", district: "宝安", storeNames: ["宝安中心店", "西乡店"], cumulativeTrialLessons: 129, cumulativeDeals: 44, cumulativeConversionRate: 34.1, monthTrialLessons: 29, monthDeals: 10, monthConversionRate: 34.5, yesterdayTrialLessons: 3, yesterdayDeals: 1, yesterdayConversionRate: 33.3, users: 63, renewals: 12, renewalRate: 68 },
      { name: "南溪", level: "中级", district: "龙岗", storeNames: ["龙岗万科店", "坂田店"], cumulativeTrialLessons: 113, cumulativeDeals: 35, cumulativeConversionRate: 31, monthTrialLessons: 26, monthDeals: 8, monthConversionRate: 30.8, yesterdayTrialLessons: 2, yesterdayDeals: 1, yesterdayConversionRate: 50, users: 51, renewals: 9, renewalRate: 63 }
    ],
    districts: [
      { name: "南山", coaches: 6, coachNames: ["小北", "阿宇", "林晓", "大川", "周辰", "可乐"], stores: 10, storeNames: ["南山旗舰店", "科技园店", "后海店", "蛇口店"] },
      { name: "福田", coaches: 5, coachNames: ["雯静", "阿森", "洛洛", "启航", "小满"], stores: 8, storeNames: ["福田中心店", "车公庙店", "梅林店"] },
      { name: "宝安", coaches: 5, coachNames: ["子墨", "阿哲", "小白", "海川", "星河"], stores: 9, storeNames: ["宝安中心店", "西乡店", "沙井店"] },
      { name: "龙岗", coaches: 4, coachNames: ["南溪", "远航", "小唐", "嘉木"], stores: 7, storeNames: ["龙岗万科店", "坂田店", "布吉店"] },
      { name: "龙华", coaches: 2, coachNames: ["阿洛", "景程"], stores: 4, storeNames: ["龙华壹方店", "民治店"] }
    ]
  },
  guangzhou: {
    courseUsersTotal: 186,
    courseUsersExpiring: 42,
    courseUsersExpiringMonth: 19,
    trialLessonsTotal: 410,
    trialLessonsMonth: 128,
    trialDeals: 21,
    coachesTotal: 11,
    coachesNew: 3,
    storesTotal: 16,
    storesPaidTotal: 4,
    storesFreeTotal: 12,
    storesNew: 5,
    storesNewPaid: 1,
    storesNewFree: 4,
    newSignedStores: 5,
    coachesNewMonth: 3,
    coachesNewYesterday: 1,
    storesNewMonth: 5,
    storesNewYesterday: 1,
    coachesNewMonthNames: ["小梁", "小程", "阿宁"],
    coachesNewYesterdayNames: ["阿宁"],
    storesNewMonthList: [
      { district: "天河", name: "珠江新城店" },
      { district: "天河", name: "员村店" },
      { district: "番禺", name: "大学城店" },
      { district: "白云", name: "嘉禾店" },
      { district: "越秀", name: "东山口店" }
    ],
    storesNewYesterdayList: [{ district: "越秀", name: "东山口店" }],
    monthlyGoal: 25,
    monthlyCompleted: 1.7,
    weekGoal: 6.25,
    weekCompleted: 1.93,
    yesterdayCompleted: 0.25,
    channels: {
      user: { monthTrialLessons: 68, monthDeals: 14, monthConversionRate: 20.6, monthRenewals: 16, yesterdayTrialLessons: 5, yesterdayDeals: 1, yesterdayConversionRate: 20, yesterdayRenewals: 2 },
      coach: { monthTrialLessons: 43, monthDeals: 9, monthConversionRate: 20.9, monthRenewals: 10, yesterdayTrialLessons: 3, yesterdayDeals: 1, yesterdayConversionRate: 33.3, yesterdayRenewals: 1 },
      store: { monthTrialLessons: 17, monthDeals: 4, monthConversionRate: 23.5, monthRenewals: 5, yesterdayTrialLessons: 2, yesterdayDeals: 0, yesterdayConversionRate: 0, yesterdayRenewals: 1 }
    },
    coaches: [
      { name: "阿哲", level: "中级", district: "天河", storeNames: ["天河旗舰店", "珠江新城店"], cumulativeTrialLessons: 82, cumulativeDeals: 24, cumulativeConversionRate: 29.3, monthTrialLessons: 24, monthDeals: 7, monthConversionRate: 29.2, yesterdayTrialLessons: 2, yesterdayDeals: 1, yesterdayConversionRate: 50, users: 39, renewals: 6, renewalRate: 58 },
      { name: "可晴", level: "高级", district: "番禺", storeNames: ["番禺广场店", "大学城店"], cumulativeTrialLessons: 77, cumulativeDeals: 21, cumulativeConversionRate: 27.3, monthTrialLessons: 22, monthDeals: 6, monthConversionRate: 27.3, yesterdayTrialLessons: 2, yesterdayDeals: 1, yesterdayConversionRate: 50, users: 35, renewals: 5, renewalRate: 56 },
      { name: "姚锦", level: "初级", district: "白云", storeNames: ["白云新城店", "嘉禾店"], cumulativeTrialLessons: 68, cumulativeDeals: 16, cumulativeConversionRate: 23.5, monthTrialLessons: 21, monthDeals: 5, monthConversionRate: 23.8, yesterdayTrialLessons: 2, yesterdayDeals: 0, yesterdayConversionRate: 0, users: 31, renewals: 4, renewalRate: 51 },
      { name: "遥湖", level: "初级", district: "海珠", storeNames: ["海珠广场店", "琶洲店"], cumulativeTrialLessons: 51, cumulativeDeals: 11, cumulativeConversionRate: 21.6, monthTrialLessons: 14, monthDeals: 3, monthConversionRate: 21.4, yesterdayTrialLessons: 1, yesterdayDeals: 0, yesterdayConversionRate: 0, users: 22, renewals: 3, renewalRate: 48 }
    ],
    districts: [
      { name: "天河", coaches: 3, coachNames: ["阿哲", "小梁", "阿凯"], stores: 5, storeNames: ["天河旗舰店", "珠江新城店", "员村店"] },
      { name: "番禺", coaches: 3, coachNames: ["可晴", "小程", "阿宁"], stores: 4, storeNames: ["番禺广场店", "大学城店"] },
      { name: "白云", coaches: 2, coachNames: ["姚锦", "阿鸣"], stores: 3, storeNames: ["白云新城店", "嘉禾店"] },
      { name: "海珠", coaches: 2, coachNames: ["遥湖", "小源"], stores: 2, storeNames: ["海珠广场店", "琶洲店"] },
      { name: "越秀", coaches: 1, coachNames: ["阿柯"], stores: 2, storeNames: ["越秀公园店", "东山口店"] }
    ]
  }
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
  els.totalCompleted.textContent = money(view.mission.completed);
  els.timeProgress.textContent = `${view.mission.time}%`;

  if (activeView === "week") {
    renderHeadquartersOkr(view);
    return;
  }

  if (activeView === "day") {
    renderProjectProgress();
    return;
  }

  renderCityCenter(view);
}

function renderCityCenter(view) {
  els.cityGrid.className = "city-grid city-first";
  els.cityGrid.innerHTML = `
    <article class="panel city-card" id="shenzhenCard"></article>
    <article class="panel city-card" id="guangzhouCard"></article>
  `;
  els.detailGrid.className = "detail-grid coach-detail-grid";
  els.detailGrid.innerHTML = `
    <article class="panel">
      <div class="panel-head">
        <h2>全城教练经营排名</h2>
        <span>累计 / 月度 / 昨日 / 续客</span>
      </div>
      <div id="coachBoard" class="coach-board"></div>
    </article>
    <article class="panel ai-panel city-insights-panel">
      <div class="panel-head">
        <h2>经营重点提醒</h2>
        <span>城市负责人每日看</span>
      </div>
      <div class="city-insights" id="aiInsights"></div>
    </article>
  `;
  const centers = view.cities.map(enrichCityCenter);
  renderCity(centers[0], "#shenzhenCard");
  renderCity(centers[1], "#guangzhouCard");

  document.querySelector("#coachBoard").innerHTML = centers.map(coachRankingBoard).join("");

  document.querySelector("#aiInsights").innerHTML = `
    <section class="insight-group">
      <h3 class="bad">风险预警</h3>
      <ul><li>广州体验课成交率低于深圳，需按教练拆成交漏斗。</li><li>本月到期用户要单独盯续客动作，避免集中流失。</li></ul>
    </section>
    <section class="insight-group">
      <h3 class="good">亮点分析</h3>
      <ul><li>深圳门店和教练密度更高，可作为广州城区扩张样板。</li><li>新增门店数能直接牵引体验课供给，需要和教练新增配平。</li></ul>
    </section>
    <section class="insight-group">
      <h3 class="blue">经营建议</h3>
      <ul><li>城市负责人每日看用户数、体验课成交率、教练成交率、续客率四张表。</li><li>城区图按门店/教练密度找空白区，新增门店优先补高需求低覆盖区域。</li></ul>
    </section>
    <section class="insight-group">
      <h3 class="blue">公式口径</h3>
      <ul>${formulaLogicItems(centers).map(item => `<li>${item}</li>`).join("")}</ul>
    </section>
  `;
}

function formulaLogicItems(cities) {
  const logic = cities.flatMap(city => Array.isArray(city.formulaLogic) ? city.formulaLogic : []);
  return [...new Set(logic)].slice(0, 4);
}

function renderHeadquartersOkr(view) {
  els.cityGrid.className = "city-grid hq-grid";
  els.cityGrid.innerHTML = `
    <article class="panel hq-main">
      <div class="panel-head">
        <h2>总部运营中心OKR</h2>
        <span>公司级KR</span>
      </div>
      <div class="mission-metrics hq-metrics">
        ${metric("经营目标", money(view.mission.goal))}
        ${metric("当前完成", money(view.mission.completed))}
        ${metric("完成率", `${view.mission.rate}%`, statusClass(view.mission.status))}
        ${metric("时间进度", `${view.mission.time}%`, "blue")}
      </div>
      <div class="kr-detail-grid hq-kr-grid">
        ${view.companyKr.map(kr => `
          <section class="kr-card">
            <h3>${kr.code} ${kr.title}</h3>
            <div class="kr-pair"><span>目标</span><strong>${kr.target}</strong></div>
            <div class="kr-pair"><span>完成</span><strong>${kr.done}</strong></div>
            <div class="kr-pair"><span>完成率</span><strong style="color:${kr.color}">${kr.rate}%</strong></div>
            <div class="okr-progress" style="--value:${kr.rate}"><i></i></div>
            <p>负责人：${kr.owner}</p>
            <p>动作：${kr.action}</p>
          </section>
        `).join("")}
      </div>
    </article>
    <article class="panel hq-funnel-panel">
      <div class="panel-head">
        <h2>流量到转化漏斗</h2>
        <span>小程序到续约</span>
      </div>
      ${conversionFunnel()}
    </article>
  `;

  els.detailGrid.className = "detail-grid hq-alert-grid";
  els.detailGrid.innerHTML = `
    <article class="panel">
      <div class="panel-head">
        <h2>运营部门OKR</h2>
        <span>总部协同</span>
      </div>
      <div class="okr-cards">${cockpitData.departments.map(okrCard).join("")}</div>
    </article>
    <article class="panel ai-panel hq-alert-panel">
      <div class="panel-head">
        <h2>总部运营提醒</h2>
        <span>OKR复盘</span>
      </div>
      <div>
        <section class="insight-group"><h3 class="bad">卡点</h3><ul><li>低于时间进度的KR要拆到城市和负责人日动作。</li><li>总部要重点盯用户、教练、门店三端数据口径统一。</li></ul></section>
        <section class="insight-group"><h3 class="blue">建议</h3><ul><li>每周固定复盘公司KR、城市经营和项目进度三张表。</li></ul></section>
      </div>
    </article>
  `;
}

function renderProjectProgress() {
  els.cityGrid.className = "city-grid project-grid";
  els.cityGrid.innerHTML = `
    <article class="panel project-main">
      <div class="panel-head">
        <h2>项目进度</h2>
        <span>六项目总览</span>
      </div>
      <div class="okr-cards project-cards">${cockpitData.projects.map(projectProgressCard).join("")}</div>
    </article>
  `;
  els.detailGrid.className = "detail-grid";
  els.detailGrid.innerHTML = `
    <article class="panel">
      <div class="panel-head">
        <h2>项目推进优先级</h2>
        <span>按完成率排序</span>
      </div>
      <div class="project-rank">
        ${[...cockpitData.projects].sort((a, b) => a.rate - b.rate).map((project, index) => `
          <section class="project-rank-row">
            <b>${index + 1}</b>
            <strong>${project.name}</strong>
            <span>${project.owner}</span>
            <em class="${project.rate < 35 ? "bad" : project.rate < 55 ? "warn" : "good"}">${project.rate}%</em>
          </section>
        `).join("")}
      </div>
    </article>
    <article class="panel ai-panel">
      <div class="panel-head">
        <h2>项目经营提醒</h2>
        <span>每日推进</span>
      </div>
      <div>
        <section class="insight-group"><h3 class="bad">滞后项目</h3><ul><li>低于35%的项目需要明确今日补救动作和负责人。</li></ul></section>
        <section class="insight-group"><h3 class="good">推进方式</h3><ul><li>按项目目标、完成值、KR、下一步动作做日清。</li></ul></section>
      </div>
    </article>
  `;
}

function metric(label, value, cls = "", note = "") {
  return `<div class="metric"><span>${label}</span><strong class="${cls}">${value}</strong>${note ? `<em>${note}</em>` : ""}</div>`;
}

function weeklyGoalFromMonth(value) {
  return Math.round((Number(value || 0) / 4) * 100) / 100;
}

function weeklyRate(city) {
  const goal = Number(city.weekGoal || weeklyGoalFromMonth(city.monthlyGoal || city.goal));
  const done = Number(city.weekCompleted || 0);
  return goal ? Math.round((done / goal) * 1000) / 10 : 0;
}

function metricRing(label, value, color) {
  return `<div class="metric"><span>${label}</span><div class="ring" style="--value:${value}; --ring-color:${color}" data-value="${value}%"></div></div>`;
}

function renderCity(city, selector) {
  document.querySelector(selector).style.setProperty("--city-color", city.color);
  document.querySelector(selector).innerHTML = `
    <h2>${city.name}经营中心</h2>
    <div class="performance-strip">
      ${metric("月度目标", money(city.monthlyGoal || city.goal))}
      ${metric("月度完成", money(city.monthlyCompleted || city.completed))}
      ${metric("完成率", `${city.rate}%`, city.rate < 30 ? "warn" : "good")}
      ${metric("周目标", money(city.weekGoal || weeklyGoalFromMonth(city.monthlyGoal || city.goal)))}
      ${metric("周完成", money(city.weekCompleted || city.completed))}
      ${metric("周完成率", `${weeklyRate(city)}%`, weeklyRate(city) < 35 ? "warn" : "good")}
      ${metric("昨日完成", money(city.yesterdayCompleted || city.completed))}
    </div>
    <div class="channel-board">
      ${channelCard("用户端", city.channels.user)}
      ${newCoachCard(city)}
      ${newStoreCard(city)}
    </div>
    <div class="city-map-head">
      <strong>城市地图</strong>
      <span>${count(city.coachesTotal)}名教练 / ${count(city.storesTotal)}家门店 / 本月新签${count(city.newSignedStores)}家</span>
    </div>
    <div class="city-district-map">
      ${city.districts.map(districtTile).join("")}
    </div>
  `;
}

function enrichCityCenter(city) {
  const key = city.key === "shenzhen" || city.name === "深圳" ? "shenzhen" : "guangzhou";
  const defaults = OPERATING_DEFAULTS[key];
  const merged = {
    ...defaults,
    ...city,
    channels: mergeChannels(defaults.channels, city.channels),
    coaches: Array.isArray(city.coaches) ? city.coaches : defaults.coaches,
    districts: Array.isArray(city.districts) ? city.districts : defaults.districts
  };
  merged.trialConversionRate = percent(merged.trialDeals, merged.trialLessonsMonth || merged.trialLessonsTotal);
  merged.avgCoachConversionRate = average(merged.coaches.map(coach => Number(coach.cumulativeConversionRate ?? coach.conversionRate)));
  merged.avgRenewalRate = average(merged.coaches.map(coach => Number(coach.renewalRate)));
  return merged;
}

function mergeChannels(defaults, current) {
  const source = current || {};
  return {
    user: { ...defaults.user, ...(source.user || {}) },
    coach: { ...defaults.coach, ...(source.coach || {}) },
    store: { ...defaults.store, ...(source.store || {}) }
  };
}

function count(value) {
  return Number(value || 0).toLocaleString("zh-CN");
}

function percent(done, total) {
  const value = total ? (Number(done || 0) / Number(total)) * 100 : 0;
  return Math.round(value * 10) / 10;
}

function average(values) {
  const nums = values.filter(Number.isFinite);
  if (!nums.length) return 0;
  return Math.round((nums.reduce((sum, value) => sum + value, 0) / nums.length) * 10) / 10;
}

function opsGroup(title, items) {
  return `
    <section class="ops-group">
      <h3>${title}</h3>
      <div>
        ${items.map(([label, value]) => `<span>${label}<b>${value}</b></span>`).join("")}
      </div>
    </section>
  `;
}

function channelCard(title, data, extra = []) {
  return `
    <section class="channel-card">
      <h3>${title}</h3>
      <div class="channel-periods">
        ${channelPeriod("月度", data, "month")}
        ${channelPeriod("昨日", data, "yesterday")}
      </div>
      ${extra.length ? `<div class="channel-extra">${extra.map(([label, value]) => `<span>${label}<b>${value}</b></span>`).join("")}</div>` : ""}
    </section>
  `;
}

function channelPeriod(label, data, prefix) {
  const key = prefix === "month" ? "month" : "yesterday";
  return `
    <div class="channel-period">
      <strong>${label}</strong>
      <span>体验课 <b>${count(data[`${key}TrialLessons`])}</b></span>
      <span>成交 <b>${count(data[`${key}Deals`])}</b></span>
      <span>转化率 <b>${data[`${key}ConversionRate`]}%</b></span>
      <span>续课 <b>${count(data[`${key}Renewals`])}</b></span>
    </div>
  `;
}

function newCoachCard(city) {
  const monthNames = pickNames(city.coachesNewMonthNames, city.coaches, city.coachesNewMonth || city.coachesNew);
  const yesterdayNames = pickNames(city.coachesNewYesterdayNames, city.coaches, city.coachesNewYesterday);
  return `
    <section class="channel-card roster-card">
      <h3>教练端</h3>
      <div class="roster-periods">
        ${rosterPeriod("月度新增教练", monthNames.map((name) => ({ title: name })), `${count(monthNames.length)}人`)}
        ${rosterPeriod("昨日新增教练", yesterdayNames.map((name) => ({ title: name })), `${count(yesterdayNames.length)}人`)}
      </div>
    </section>
  `;
}

function newStoreCard(city) {
  const monthStores = pickStores(city.storesNewMonthList, city.districts, city.storesNewMonth || city.storesNew);
  const yesterdayStores = pickStores(city.storesNewYesterdayList, city.districts, city.storesNewYesterday);
  return `
    <section class="channel-card roster-card">
      <h3>门店端</h3>
      <div class="store-summary">
        ${storeSummaryBlock("入驻门店", city.storesTotal, city.storesPaidTotal, city.storesFreeTotal)}
        ${storeSummaryBlock("本月新签", city.storesNewMonth || city.storesNew, city.storesNewPaid, city.storesNewFree)}
      </div>
      <div class="roster-periods">
        ${rosterPeriod("月度新增门店", monthStores, `${count(monthStores.length)}家`)}
        ${rosterPeriod("昨日新增门店", yesterdayStores, `${count(yesterdayStores.length)}家`)}
      </div>
    </section>
  `;
}

function storeSummaryBlock(label, total, paid, free) {
  const totalCount = Number(total || 0);
  const paidCount = Number(paid || 0);
  const freeCount = Number(free || Math.max(totalCount - paidCount, 0));
  return `
    <section class="store-summary-line">
      <strong>${label}</strong>
      <b>${count(totalCount)}家</b>
      <span class="paid">付费 ${count(paidCount)}家</span>
      <span class="free">免费 ${count(freeCount)}家</span>
    </section>
  `;
}

function rosterPeriod(label, items, total) {
  return `
    <div class="roster-period">
      <strong>${label}<em>${total}</em></strong>
      <div class="roster-list">
        ${items.length ? items.map(rosterItem).join("") : "<span>待补充</span>"}
      </div>
    </div>
  `;
}

function rosterItem(item) {
  const title = typeof item === "string" ? item : item.title || item.name || "待补充";
  const meta = typeof item === "object" && item.district ? `<i>${item.district}</i>` : "";
  return `<span>${meta}<b>${title}</b></span>`;
}

function pickNames(names, coaches, limit) {
  const source = Array.isArray(names) && names.length ? names : (coaches || []).map((coach) => coach.name);
  return source.filter(Boolean).slice(0, Math.max(Number(limit || source.length), 0));
}

function pickStores(stores, districts, limit) {
  const source = Array.isArray(stores) && stores.length ? stores : flattenDistrictStores(districts);
  return source.slice(0, Math.max(Number(limit || source.length), 0));
}

function flattenDistrictStores(districts) {
  return (districts || []).flatMap((district) => {
    const names = Array.isArray(district.storeNames) ? district.storeNames : [];
    return names.map((name) => ({ district: district.name, name }));
  });
}

function coachRankingBoard(city) {
  const columns = coachTableColumns();
  const state = coachTableState[city.key] || { sortKey: "cumulativeConversionRate", sortDir: "desc", filters: {} };
  coachTableState[city.key] = state;
  const sourceCoaches = [...city.coaches].map(normalizeCoach);
  const coaches = applyCoachTableState(sourceCoaches, state, columns);
  return `
    <section class="coach-city" style="--city-color:${city.color}">
      <div class="coach-city-head">
        <h3>${city.name}教练排名</h3>
        <span>${coaches.length}/${city.coaches.length}人</span>
      </div>
      <div class="coach-table-wrap">
        <div class="coach-table">
          <div class="coach-table-row coach-table-head">
            ${columns.map((column) => coachHeadCell(city.key, column, state, sourceCoaches)).join("")}
          </div>
        ${coaches.map((coach, index) => `
          <div class="coach-table-row">
            <b>${index + 1}</b>
            <strong>${coach.name}</strong>
            <span>${coach.level}</span>
            <span>${coach.district}</span>
            <span class="store-cell">${nameList(coach.storeNames)}</span>
            <span>${count(coach.cumulativeTrialLessons)}</span>
            <span>${count(coach.cumulativeDeals)}</span>
            <span class="${rateClass(coach.cumulativeConversionRate)}">${coach.cumulativeConversionRate}%</span>
            <span>${count(coach.monthTrialLessons)}</span>
            <span>${count(coach.monthDeals)}</span>
            <span class="${rateClass(coach.monthConversionRate)}">${coach.monthConversionRate}%</span>
            <span>${count(coach.yesterdayTrialLessons)}</span>
            <span>${count(coach.yesterdayDeals)}</span>
            <span class="${rateClass(coach.yesterdayConversionRate)}">${coach.yesterdayConversionRate}%</span>
            <span>${count(coach.users)}</span>
            <span>${count(coach.renewals)}</span>
            <span class="${coach.renewalRate < 55 ? "bad" : coach.renewalRate < 66 ? "warn" : "good"}">${coach.renewalRate}%</span>
          </div>
        `).join("")}
        </div>
      </div>
    </section>
  `;
}

function coachTableColumns() {
  return [
    { key: "rank", label: "排名", type: "number" },
    { key: "coachName", label: "教练", type: "text" },
    { key: "level", label: "等级", type: "text" },
    { key: "district", label: "区域", type: "text" },
    { key: "stores", label: "服务门店", type: "text" },
    { key: "cumulativeTrialLessons", label: "累计体验课", type: "number" },
    { key: "cumulativeDeals", label: "累计转化", type: "number" },
    { key: "cumulativeConversionRate", label: "转化率", type: "number" },
    { key: "monthTrialLessons", label: "月度体验课", type: "number" },
    { key: "monthDeals", label: "月度转化", type: "number" },
    { key: "monthConversionRate", label: "月度转化率", type: "number" },
    { key: "yesterdayTrialLessons", label: "昨日体验课", type: "number" },
    { key: "yesterdayDeals", label: "昨日成交", type: "number" },
    { key: "yesterdayConversionRate", label: "昨日转化率", type: "number" },
    { key: "users", label: "用户数", type: "number" },
    { key: "renewals", label: "续课数", type: "number" },
    { key: "renewalRate", label: "续客率", type: "number" }
  ];
}

function coachHeadCell(cityKey, column, state, coaches) {
  const active = state.sortKey === column.key;
  const arrow = active ? (state.sortDir === "asc" ? "↑" : "↓") : "↕";
  const options = coachFilterOptions(coaches, column);
  const selected = Array.isArray(state.filters[column.key]) ? state.filters[column.key] : [];
  const noneSelected = selected.includes("__NONE__");
  const activeFilter = noneSelected || (selected.length && selected.length < options.length);
  const filterCount = noneSelected ? 0 : selected.length;
  return `
    <span class="coach-head-cell">
      <button type="button" data-coach-sort="${column.key}" data-city="${cityKey}" title="点击排序">${column.label}<i>${arrow}</i></button>
      <details class="coach-filter">
        <summary class="${activeFilter ? "active" : ""}">筛选${activeFilter ? `(${filterCount})` : ""}</summary>
        <div class="coach-filter-menu">
          <div class="coach-filter-sort">
            <button type="button" data-coach-sort="${column.key}" data-city="${cityKey}" data-sort-dir="asc">升序排序</button>
            <button type="button" data-coach-sort="${column.key}" data-city="${cityKey}" data-sort-dir="desc">降序排序</button>
          </div>
          <input data-coach-filter-search type="search" placeholder="搜索" />
          <div class="coach-filter-actions">
            <button type="button" data-coach-filter-all="${column.key}" data-city="${cityKey}">全选</button>
            <button type="button" data-coach-filter-none="${column.key}" data-city="${cityKey}">全不选</button>
          </div>
          <div class="coach-filter-options">
            ${options.map((option) => `
              <label>
                <input type="checkbox" data-coach-filter-option="${column.key}" data-city="${cityKey}" value="${escapeAttr(option)}" ${!noneSelected && (!activeFilter || selected.includes(option)) ? "checked" : ""} />
                <span>${option}</span>
              </label>
            `).join("")}
          </div>
          <div class="coach-filter-confirm">
            <button type="button" data-coach-filter-cancel>取消</button>
            <button type="button" data-coach-filter-apply="${column.key}" data-city="${cityKey}">确认</button>
          </div>
        </div>
      </details>
    </span>
  `;
}

function coachFilterOptions(coaches, column) {
  const values = coaches.flatMap((coach, index) => {
    if (column.key === "stores") return coach.storeNames && coach.storeNames.length ? coach.storeNames : [coachFieldValue(coach, column.key, index)];
    return [coachFieldValue(coach, column.key, index)];
  }).filter((value) => value !== "");
  return [...new Set(values.map(String))].sort((a, b) => {
    if (column.type === "number") return Number(a) - Number(b);
    return a.localeCompare(b, "zh-Hans-CN");
  });
}

function applyCoachTableState(coaches, state, columns) {
  const filters = state.filters || {};
  const filtered = coaches.filter((coach, index) => columns.every((column) => {
    const selected = Array.isArray(filters[column.key]) ? filters[column.key] : [];
    if (!selected.length) return true;
    if (selected.includes("__NONE__")) return false;
    const values = column.key === "stores"
      ? (coach.storeNames && coach.storeNames.length ? coach.storeNames : [coachFieldValue(coach, column.key, index)])
      : [coachFieldValue(coach, column.key, index)];
    return values.map(String).some((value) => selected.includes(value));
  }));
  const sortColumn = columns.find((column) => column.key === state.sortKey) || columns[5];
  const dir = state.sortDir === "asc" ? 1 : -1;
  return filtered.sort((a, b) => {
    const left = coachFieldValue(a, sortColumn.key, coaches.indexOf(a));
    const right = coachFieldValue(b, sortColumn.key, coaches.indexOf(b));
    if (sortColumn.type === "number") return (Number(left) - Number(right)) * dir;
    return String(left).localeCompare(String(right), "zh-Hans-CN") * dir;
  });
}

function coachFieldValue(coach, key, index = 0) {
  const values = {
    rank: index + 1,
    coachName: coach.name,
    level: coach.level,
    district: coach.district,
    stores: nameList(coach.storeNames),
    cumulativeTrialLessons: coach.cumulativeTrialLessons,
    cumulativeDeals: coach.cumulativeDeals,
    cumulativeConversionRate: coach.cumulativeConversionRate,
    monthTrialLessons: coach.monthTrialLessons,
    monthDeals: coach.monthDeals,
    monthConversionRate: coach.monthConversionRate,
    yesterdayTrialLessons: coach.yesterdayTrialLessons,
    yesterdayDeals: coach.yesterdayDeals,
    yesterdayConversionRate: coach.yesterdayConversionRate,
    users: coach.users,
    renewals: coach.renewals,
    renewalRate: coach.renewalRate
  };
  return values[key] ?? "";
}

function escapeAttr(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function conversionFunnel() {
  const steps = Array.isArray(cockpitData.conversionFunnel) && cockpitData.conversionFunnel.length
    ? cockpitData.conversionFunnel
    : fallbackData.conversionFunnel;
  return `
    <section class="conversion-funnel">
      <div class="funnel-title">
        <h3>流量到转化漏斗</h3>
        <span>小程序到续约</span>
      </div>
      <div class="funnel-steps">
        ${steps.map((step, index) => `
          <article class="funnel-step" style="--step:${index}">
            <div class="funnel-step-content">
              <strong>${step.name}</strong>
              <b>${step.value}</b>
              <em>${step.note || ""}</em>
              ${Array.isArray(step.channels) && step.channels.length ? `
                <div class="funnel-channels">
                  ${step.channels.map((channel) => `<span>${channel.name}<b>${channel.value}</b></span>`).join("")}
                </div>
              ` : ""}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function normalizeCoach(coach) {
  const monthTrialLessons = Number(coach.monthTrialLessons ?? coach.trialLessons ?? 0);
  const monthDeals = Number(coach.monthDeals ?? coach.trialDeals ?? 0);
  const cumulativeTrialLessons = Number(coach.cumulativeTrialLessons ?? coach.totalTrialLessons ?? monthTrialLessons);
  const cumulativeDeals = Number(coach.cumulativeDeals ?? coach.totalDeals ?? monthDeals);
  const yesterdayTrialLessons = Number(coach.yesterdayTrialLessons ?? 0);
  const yesterdayDeals = Number(coach.yesterdayDeals ?? 0);
  return {
    ...coach,
    level: coach.level || "未定级",
    storeNames: Array.isArray(coach.storeNames) ? coach.storeNames : splitList(coach.stores || coach.store || coach.storeName),
    cumulativeTrialLessons,
    cumulativeDeals,
    cumulativeConversionRate: Number(coach.cumulativeConversionRate ?? coach.conversionRate ?? percent(cumulativeDeals, cumulativeTrialLessons)),
    monthTrialLessons,
    monthDeals,
    monthConversionRate: Number(coach.monthConversionRate ?? percent(monthDeals, monthTrialLessons)),
    yesterdayTrialLessons,
    yesterdayDeals,
    yesterdayConversionRate: Number(coach.yesterdayConversionRate ?? percent(yesterdayDeals, yesterdayTrialLessons))
  };
}

function rateClass(rate) {
  return rate < 25 ? "bad" : rate < 35 ? "warn" : "good";
}

function districtTile(item) {
  return `
    <article class="district-tile">
      <div class="district-title">
        <strong>${item.name}</strong>
        <span>${count(item.coaches)}教练 / ${count(item.stores)}门店</span>
      </div>
      <p><b>教练</b>${nameList(item.coachNames)}</p>
      <p><b>门店</b>${nameList(item.storeNames)}</p>
    </article>
  `;
}

function nameList(names) {
  const items = Array.isArray(names) ? names : [];
  return items.length ? items.join("、") : "待补充";
}

function splitList(value) {
  if (Array.isArray(value)) return value;
  return String(value || "").split(/[、,，；;|\n]+/).map((item) => item.trim()).filter(Boolean);
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
    <section class="okr-card" style="--okr-accent:${accentFor(item.name)}">
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

function projectProgressCard(item) {
  const valueLabel = item.unit ? `${item.target}${item.unit}` : item.target;
  const doneLabel = item.unit ? `${item.done}${item.unit}` : item.done;
  const krs = Array.isArray(item.krs) ? item.krs : [];
  return `
    <section class="okr-card project-progress-card" style="--okr-accent:${accentFor(item.name)}">
      <div class="okr-card-head">
        <div>
          <h3>${item.name}</h3>
          <span class="okr-owner">负责人：${item.owner}</span>
        </div>
        <strong class="${item.rate < 35 ? "bad" : item.rate < 55 ? "warn" : "good"}">${item.rate}%</strong>
      </div>
      <div class="okr-values">
        <div><span>目标</span><b>${valueLabel}</b></div>
        <div><span>完成</span><b>${doneLabel}</b></div>
      </div>
      <div class="okr-progress" style="--value:${item.rate}"><i></i></div>
      <p class="okr-objective">O：${item.objective}</p>
      <ul class="okr-kr-list">${krs.map((kr, index) => `<li><b>KR${index + 1}</b><span>${kr}</span></li>`).join("")}</ul>
      <p class="okr-action">下一步：${item.action || "待补充"}</p>
    </section>
  `;
}

function accentFor(name = "") {
  const palette = {
    "流量铺": "#34e7e4",
    "C端销售": "#ffb11a",
    "小B铺": "#28e681",
    "大B端": "#ff4d5e",
    "课程开发": "#8b5cf6",
    "培训端": "#1aa7ff",
    "暑假班": "#28e681",
    "赛事活动": "#ffb11a",
    "等级考试": "#ff4d5e",
    "线上课": "#34e7e4",
    "台球学校招生": "#8b5cf6",
    "自媒体矩阵": "#1aa7ff"
  };
  return palette[name] || "#34e7e4";
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
    const remoteData = await response.json();
    cockpitData = localEntitySnapshot ? mergeEntitySnapshot(remoteData, localEntitySnapshot) : remoteData;
    cockpitData.meta = cockpitData.meta || {};
    if (!cockpitData.meta.syncMode) {
      cockpitData.meta.syncMode = endpoint === "./data.json" ? "静态JSON数据" : "钉钉实时数据";
    }
    if (localEntitySnapshot && endpoint !== "./data.json") {
      cockpitData.meta.syncMode = "钉钉实时数据 + 本地JSON教练/门店";
    }
    render();
  } catch (error) {
    cockpitData.meta.syncMode = endpoint === "./data.json" ? "内置示例数据" : `同步失败：${error.message}`;
    render();
    if (manual) alert(`读取数据失败：${error.message}`);
  }
}

function createEntitySnapshot(data) {
  return {
    updatedAt: data?.meta?.updatedAt || new Date().toLocaleString("zh-CN", { hour12: false }),
    views: Object.fromEntries(["month", "week", "day"].map((view) => [
      view,
      (data?.views?.[view]?.cities || []).map((city) => ({
        name: city.name,
        values: Object.fromEntries(ENTITY_CITY_KEYS
          .filter((key) => city[key] !== undefined)
          .map((key) => [key, structuredCloneSafe(city[key])]))
      }))
    ]))
  };
}

function mergeEntitySnapshot(data, snapshot) {
  for (const view of ["month", "week", "day"]) {
    const cities = data?.views?.[view]?.cities || [];
    const snapshotCities = snapshot?.views?.[view] || [];
    for (const city of cities) {
      const source = snapshotCities.find((item) => item.name === city.name);
      if (!source) continue;
      Object.assign(city, structuredCloneSafe(source.values));
    }
  }
  data.meta = data.meta || {};
  data.meta.entitySource = "local_json";
  data.meta.entityUpdatedAt = snapshot?.updatedAt || "";
  return data;
}

function structuredCloneSafe(value) {
  if (window.structuredClone) return window.structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function downloadFile(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function timestampName(prefix, ext) {
  const stamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-");
  return `${prefix}-${stamp}.${ext}`;
}

async function captureCurrentPageCanvas() {
  document.body.classList.add("exporting");
  window.scrollTo(0, 0);
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const width = Math.ceil(Math.max(
    document.body.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.clientWidth,
    document.documentElement.scrollWidth,
    document.documentElement.offsetWidth,
    window.innerWidth
  ));
  const height = Math.ceil(Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
    window.innerHeight
  ));
  return html2canvas(document.body, {
    backgroundColor: "#020814",
    scale: Math.min(window.devicePixelRatio || 1, 2),
    useCORS: true,
    width,
    height,
    windowWidth: width,
    windowHeight: height,
    scrollX: 0,
    scrollY: 0
  });
}

async function uploadExcelData() {
  if (!window.XLSX) {
    alert("Excel解析组件还没加载完成，请刷新页面后再试。");
    return;
  }
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".xlsx,.xls";
  input.addEventListener("change", async () => {
    const file = input.files && input.files[0];
    if (!file) return;
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
      cockpitData = transformExcelWorkbook(workbook);
      cockpitData.meta.syncMode = `本地Excel上传：${file.name}`;
      cockpitData.meta.updatedAt = new Date().toLocaleString("zh-CN", { hour12: false });
      localStorage.removeItem("dingtalkEndpoint");
      render();
      alert("Excel数据已读取并刷新看板。注意：这是当前浏览器本地预览；要让所有人实时看到，请继续配置钉钉同步。");
    } catch (error) {
      alert(`Excel读取失败：${error.message}`);
    }
  }, { once: true });
  input.click();
}

function transformExcelWorkbook(workbook) {
  const sheets = Object.fromEntries(workbook.SheetNames.map((name) => {
    const matrix = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, raw: false, defval: "" });
    return [name, matrix];
  }));
  return transformExcelSheets(sheets, "本地Excel上传");
}

async function uploadJsonData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json";
  input.multiple = true;
  input.addEventListener("change", async () => {
    const files = Array.from(input.files || []);
    if (!files.length) return;
    try {
      const payloads = await Promise.all(files.map(async (file) => ({
        name: file.name,
        data: JSON.parse(await file.text())
      })));
      const direct = payloads.find((item) => item.data && item.data.views && item.data.meta);
      if (direct) {
        cockpitData = direct.data;
        cockpitData.meta.syncMode = `本地JSON上传：${direct.name}`;
      } else {
        const sheets = jsonPayloadsToSheets(payloads);
        cockpitData = transformExcelSheets(sheets, `本地JSON上传：${files.map((file) => file.name).join("、")}`);
      }
      cockpitData.meta.updatedAt = new Date().toLocaleString("zh-CN", { hour12: false });
      localEntitySnapshot = createEntitySnapshot(cockpitData);
      localStorage.removeItem("dingtalkEndpoint");
      render();
      alert("JSON数据已读取并刷新看板。系统会按本月、最近7天、昨日自动重新汇总。");
    } catch (error) {
      alert(`JSON读取失败：${error.message}`);
    }
  }, { once: true });
  input.click();
}

function transformExcelSheets(sheets, syncMode = "本地Excel上传") {
  const metaRows = excelRows(sheets["基础配置"]);
  const cityRows = excelRows(sheets["双城经营"]);
  const krRows = excelRows(sheets["公司KR"]);
  const departmentRows = excelRows(sheets["六部门OKR"]);
  const projectRows = excelRows(sheets["六项目OKR"]);
  const personRows = excelRows(sheets["个人OKR"]);
  const coachRows = excelRows(sheets["教练经营"]);
  const districtRows = excelRows(sheets["城区分布"]);
  const funnelRows = excelRows(sheets["转化漏斗"]);
  const storeRows = excelRows(sheets["门店明细"]);
  const coachProfileRows = excelRows(sheets["教练档案"]);
  const relationRows = excelRows(sheets["教练门店关系"]);
  const trialRows = excelRows(sheets["体验课流水"]);
  const renewalRows = excelRows(sheets["续课流水"]);
  const meta = Object.fromEntries(metaRows.map((r) => [r.key, r.value]));
  const autoModel = excelAutoOperatingModel({
    meta,
    stores: storeRows,
    coaches: coachProfileRows,
    relations: relationRows,
    trials: trialRows,
    renewals: renewalRows
  });
  const views = {};

  for (const view of ["month", "week", "day"]) {
    const cities = cityRows
      .filter((r) => excelText(r.period_type) === view)
      .map((r) => excelCityViewRow(r, view, autoModel[view]?.[excelText(r["城市"])], coachRows, districtRows));
    const companyKr = krRows
      .filter((r) => excelText(r.period_type) === view)
      .map((r) => ({
        code: excelText(r["KR编号"]),
        title: excelText(r["KR名称"]),
        target: excelText(r["目标"]),
        done: excelText(r["完成"]),
        rate: excelNum(r["完成率_%"]),
        owner: excelText(r["负责人"]),
        support: excelText(r["支持部门"]),
        risk: excelText(r["风险"]),
        action: excelText(r["关键行动"]),
        color: excelText(r["颜色"], excelColorByRate(excelNum(r["完成率_%"])))
      }));
    const goal = cities.reduce((sum, city) => sum + city.goal, 0);
    const completed = cities.reduce((sum, city) => sum + city.completed, 0);
    const time = cities.length ? average(cities.map((city) => city.time)) : 0;
    const rate = goal ? percent(completed, goal) : 0;
    views[view] = {
      label: { month: "月", week: "周", day: "日" }[view],
      mission: {
        time,
        goal: Math.round(goal * 100) / 100,
        completed: Math.round(completed * 100) / 100,
        rate,
        status: rate >= time ? "良好" : rate >= time - 10 ? "预警" : "滞后",
        gap: Math.round((rate - time) * 10) / 10
      },
      cities,
      companyKr
    };
  }

  return {
    meta: {
      company: excelText(meta.company, "小铁台球教培"),
      period: excelText(meta.period, currentMonthPeriodText()),
      updatedAt: new Date().toLocaleString("zh-CN", { hour12: false }),
      totalGoal: excelNum(meta.totalGoal, 85),
      syncMode
    },
    views,
    departments: departmentRows.map(excelOkrRow("部门")),
    projects: projectRows.map(excelOkrRow("项目")),
    people: [],
    peopleDetails: personRows,
    conversionFunnel: excelFunnel(funnelRows)
  };
}

function jsonPayloadsToSheets(payloads) {
  const buckets = {
    stores: [],
    coaches: [],
    orders: [],
    relations: [],
    renewals: []
  };
  payloads.forEach((payload) => {
    const rows = extractJsonRows(payload.data);
    const type = inferJsonType(payload.name, rows);
    if (type === "stores") buckets.stores.push(...rows);
    else if (type === "coaches") buckets.coaches.push(...rows);
    else if (type === "relations") buckets.relations.push(...rows);
    else if (type === "renewals") buckets.renewals.push(...rows);
    else buckets.orders.push(...rows);
  });

  const storeRows = buckets.stores.map(jsonStoreRow);
  const coachRows = buckets.coaches.map(jsonCoachRow);
  const relationRows = buckets.relations.map(jsonRelationRow).filter((row) => row["教练ID"] && row["门店名称"]);
  const orderRows = buckets.orders.map(jsonTrialRow);
  const renewalRows = buckets.renewals.map(jsonRenewalRow);
  const splitRenewals = orderRows.filter((row) => isRenewalCourse(row["课程名称"]));
  const trialRows = orderRows.filter((row) => !isRenewalCourse(row["课程名称"]));

  return {
    "基础配置": matrixFromRows([
      { key: "company", value: "小铁台球教培" },
      { key: "period", value: currentMonthPeriodText() },
      { key: "totalGoal", value: cockpitData?.meta?.totalGoal || 85 }
    ], ["key", "value"]),
    "双城经营": defaultCityRows(),
    "公司KR": currentKrRows(),
    "六部门OKR": currentOkrRows("部门", cockpitData?.departments || []),
    "六项目OKR": currentOkrRows("项目", cockpitData?.projects || []),
    "个人OKR": [],
    "门店明细": matrixFromRows(storeRows, ["门店ID", "城市", "区域", "门店名称", "地址", "关联教练数", "门店状态", "门店类型", "球房类型", "上下架", "驻场教练", "入驻类型", "是否付费", "入驻日期", "新增类型", "昨日新增"]),
    "教练档案": matrixFromRows(coachRows, ["教练ID", "城市", "区域", "教练", "教练等级", "在职状态", "入职日期", "新增类型", "昨日新增", "服务门店"]),
    "教练门店关系": matrixFromRows(relationRows, ["教练ID", "教练", "门店ID", "门店名称"]),
    "体验课流水": matrixFromRows(trialRows, ["日期", "订单ID", "城市", "区域", "教练ID", "教练", "门店ID", "门店名称", "课程名称", "下单数", "转化数", "已消课数", "金额", "渠道", "状态"]),
    "续课流水": matrixFromRows([...renewalRows, ...splitRenewals.map(jsonRenewalFromTrial)], ["日期", "订单ID", "城市", "区域", "教练ID", "教练", "门店ID", "门店名称", "课程名称", "续约数", "金额", "渠道", "状态"]),
    "教练经营": [],
    "城区分布": [],
    "转化漏斗": currentFunnelRows(),
    "经营重点": matrixFromRows([
      { "类型": "经营建议", "内容": "已使用后台 JSON 自动汇总，请重点检查订单状态、退款、转化字段是否与后台口径一致。" }
    ], ["类型", "内容"])
  };
}

function extractJsonRows(payload) {
  if (Array.isArray(payload)) return payload;
  const candidates = [
    payload?.data?.items,
    payload?.data?.records,
    payload?.data?.list,
    payload?.data?.rows,
    payload?.data,
    payload?.items,
    payload?.records,
    payload?.list,
    payload?.rows
  ];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }
  if (payload && typeof payload === "object") {
    for (const value of Object.values(payload)) {
      if (Array.isArray(value)) return value;
      if (value && typeof value === "object") {
        const nested = extractJsonRows(value);
        if (nested.length) return nested;
      }
    }
  }
  return [];
}

function inferJsonType(filename, rows) {
  const name = filename.toLowerCase();
  const sample = rows[0] || {};
  const keys = Object.keys(sample).join("|").toLowerCase();
  if (/门店|store|site/.test(name) || /site_name|store_name|门店名称|关联教练|coach_count|room_type|is_value_added|has_onsite_coach/.test(keys)) return "stores";
  if (/教练门店|关联/.test(name) || (/coach_id|教练id/.test(keys) && /site_id|store_id|门店id/.test(keys) && /site_name|store_name|门店名称/.test(keys))) return "relations";
  if (/教练|coach/.test(name) || /coach_id|教练id|coach_name|教练等级|level/.test(keys)) return "coaches";
  if (/续课|续约|renew/.test(name)) return "renewals";
  return "orders";
}

function jsonStoreRow(row) {
  const city = normalizeCity(jsonValue(row, ["城市", "city", "city_name", "belong_city"]));
  const created = jsonDate(row, ["入驻日期", "创建时间", "created_at", "createTime", "createdAt"]);
  return {
    "门店ID": jsonValue(row, ["门店ID", "site_id", "store_id", "id"]),
    "城市": city,
    "区域": jsonValue(row, ["区域", "area", "area_name", "district", "region"]),
    "门店名称": jsonValue(row, ["门店名称", "site_name", "store_name", "name"]),
    "地址": jsonValue(row, ["地址", "address"]),
    "关联教练数": jsonNumber(row, ["关联教练", "关联教练数", "coach_count", "coaches_count"]),
    "门店状态": storeStatusLabel(jsonValue(row, ["状态", "status_name", "status"])),
    "门店类型": storeSourceLabel(jsonValue(row, ["门店类型", "source_name", "source", "type_name", "type"])),
    "球房类型": roomTypeLabel(jsonValue(row, ["球房类型", "room_type", "roomType"])),
    "上下架": showStatusLabel(jsonValue(row, ["上下架", "show_status", "showStatus"])),
    "驻场教练": jsonBoolean(row, ["has_onsite_coach", "驻场教练", "是否驻场"]) ? "是" : "否",
    "入驻类型": jsonPaid(row) ? "付费入驻" : "免费入驻",
    "是否付费": jsonPaid(row) ? 1 : 0,
    "入驻日期": created,
    "新增类型": dateInCurrentMonthText(created) ? "本月新增" : "",
    "昨日新增": dateIsYesterdayText(created) ? "昨日新增" : ""
  };
}

function jsonCoachRow(row) {
  const created = jsonDate(row, ["入职日期", "创建时间", "created_at", "createTime", "createdAt"]);
  const cities = jsonArrayValue(row, ["城市", "city", "city_name", "belong_city"]).map(normalizeCity).filter(Boolean);
  const areas = jsonArrayValue(row, ["区域", "area", "area_name", "district", "residence_area"]).filter(Boolean);
  const cityList = cities.length ? cities : [normalizeCity(jsonValue(row, ["城市", "city", "city_name", "belong_city"]))].filter(Boolean);
  const areaList = areas.length ? areas : [jsonValue(row, ["区域", "area", "area_name", "district", "residence_area"])].filter(Boolean);
  return {
    "教练ID": jsonValue(row, ["教练ID", "coach_id", "id"]),
    "城市": cityList.join("、"),
    "区域": areaList.join("、"),
    "教练": jsonValue(row, ["教练", "coach_name", "name", "show_name"]),
    "教练等级": coachLevelLabel(jsonValue(row, ["教练等级", "level", "coach_level"])),
    "在职状态": coachStatusLabel(jsonValue(row, ["在职状态", "status_name", "status"])),
    "入职日期": created,
    "新增类型": dateInCurrentMonthText(created) ? "本月新增" : "",
    "昨日新增": dateIsYesterdayText(created) ? "昨日新增" : "",
    "服务门店": jsonValue(row, ["服务门店", "site_names", "store_names"]) || serviceStoreCountLabel(jsonValue(row, ["site_count", "门店数", "服务门店数"]))
  };
}

function jsonRelationRow(row) {
  return {
    "教练ID": jsonValue(row, ["教练ID", "coach_id", "id"]),
    "教练": jsonValue(row, ["教练", "coach_name", "name"]),
    "门店ID": jsonValue(row, ["门店ID", "site_id", "store_id"]),
    "门店名称": jsonValue(row, ["门店名称", "site_name", "store_name", "name"])
  };
}

function jsonTrialRow(row) {
  const status = jsonValue(row, ["状态", "status_name", "order_status_name", "status"]);
  const refunded = /退款|已退|取消/.test(status);
  const converted = jsonBoolean(row, ["已转化", "是否转化", "converted", "is_converted"]) || /转化|成交|续约/.test(status);
  return {
    "日期": jsonDate(row, ["日期", "下单时间", "支付时间", "created_at", "createTime", "createdAt", "paid_at"]),
    "订单ID": jsonValue(row, ["订单ID", "order_id", "id"]),
    "城市": normalizeCity(jsonValue(row, ["城市", "city", "city_name"])),
    "区域": jsonValue(row, ["区域", "area", "area_name", "district"]),
    "教练ID": jsonValue(row, ["教练ID", "coach_id"]),
    "教练": jsonValue(row, ["教练", "coach_name"]),
    "门店ID": jsonValue(row, ["门店ID", "site_id", "store_id"]),
    "门店名称": jsonValue(row, ["门店名称", "site_name", "store_name"]),
    "课程名称": jsonValue(row, ["课程名称", "course_name", "product_name", "name"]),
    "下单数": refunded ? 0 : 1,
    "转化数": converted && !refunded ? 1 : 0,
    "已消课数": /已上课|已消课|完成/.test(status) ? 1 : 0,
    "金额": refunded ? 0 : jsonNumber(row, ["金额", "实付金额", "pay_amount", "amount", "price", "total_amount"]),
    "渠道": jsonValue(row, ["渠道", "channel", "source_name", "source"]),
    "状态": status
  };
}

function jsonRenewalRow(row) {
  const status = jsonValue(row, ["状态", "status_name", "order_status_name", "status"]);
  const refunded = /退款|已退|取消/.test(status);
  return {
    "日期": jsonDate(row, ["日期", "续课日期", "下单时间", "支付时间", "created_at", "createTime", "createdAt", "paid_at"]),
    "订单ID": jsonValue(row, ["订单ID", "order_id", "id"]),
    "城市": normalizeCity(jsonValue(row, ["城市", "city", "city_name"])),
    "区域": jsonValue(row, ["区域", "area", "area_name", "district"]),
    "教练ID": jsonValue(row, ["教练ID", "coach_id"]),
    "教练": jsonValue(row, ["教练", "coach_name"]),
    "门店ID": jsonValue(row, ["门店ID", "site_id", "store_id"]),
    "门店名称": jsonValue(row, ["门店名称", "site_name", "store_name"]),
    "课程名称": jsonValue(row, ["课程名称", "course_name", "product_name", "name"]),
    "续约数": refunded ? 0 : 1,
    "金额": refunded ? 0 : jsonNumber(row, ["金额", "实付金额", "pay_amount", "amount", "price", "total_amount"]),
    "渠道": jsonValue(row, ["渠道", "channel", "source_name", "source"]),
    "状态": status
  };
}

function jsonRenewalFromTrial(row) {
  return {
    "日期": row["日期"],
    "订单ID": row["订单ID"],
    "城市": row["城市"],
    "区域": row["区域"],
    "教练ID": row["教练ID"],
    "教练": row["教练"],
    "门店ID": row["门店ID"],
    "门店名称": row["门店名称"],
    "课程名称": row["课程名称"],
    "续约数": row["下单数"],
    "金额": row["金额"],
    "渠道": row["渠道"],
    "状态": row["状态"]
  };
}

function matrixFromRows(rows, headers) {
  return [headers, ...rows.map((row) => headers.map((header) => row[header] ?? ""))];
}

function defaultCityRows() {
  const headers = ["period_type", "城市", "目标营收_万元", "时间进度_%"];
  return [headers, ...["month", "week", "day"].flatMap((period) => [
    [period, "深圳", currentCityGoal(period, "深圳"), monthProgress()],
    [period, "广州", currentCityGoal(period, "广州"), monthProgress()]
  ])];
}

function currentCityGoal(period, cityName) {
  const city = cockpitData?.views?.[period]?.cities?.find((item) => item.name === cityName);
  return city?.goal || city?.monthlyGoal || 0;
}

function currentKrRows() {
  const headers = ["period_type", "KR编号", "KR名称", "目标", "完成", "完成率_%", "负责人", "支持部门", "风险", "关键行动", "颜色"];
  const rows = Object.entries(cockpitData?.views || {}).flatMap(([period, view]) => (view.companyKr || []).map((kr) => ({
    "period_type": period,
    "KR编号": kr.code,
    "KR名称": kr.title,
    "目标": kr.target,
    "完成": kr.done,
    "完成率_%": kr.rate,
    "负责人": kr.owner,
    "支持部门": kr.support,
    "风险": kr.risk,
    "关键行动": kr.action,
    "颜色": kr.color
  })));
  return matrixFromRows(rows, headers);
}

function currentOkrRows(typeName, items) {
  const headers = [typeName, "Objective", "负责人", "目标值", "实际完成", "单位", "完成率_%", "风险/卡点", "下一步具体动作", "截止日期", "关键KR"];
  const rows = items.map((item) => ({
    [typeName]: item.name,
    "Objective": item.objective,
    "负责人": item.owner,
    "目标值": item.target,
    "实际完成": item.done,
    "单位": item.unit,
    "完成率_%": item.rate,
    "风险/卡点": item.risk,
    "下一步具体动作": item.action,
    "截止日期": item.dueDate,
    "关键KR": Array.isArray(item.krs) ? item.krs.join("；") : item.krs
  }));
  return matrixFromRows(rows, headers);
}

function currentFunnelRows() {
  const headers = ["排序", "环节", "数值", "副标题", "美团", "抖音", "私域", "其他"];
  const rows = (cockpitData?.conversionFunnel || []).map((item, index) => {
    const channels = Object.fromEntries((item.channels || []).map((channel) => [channel.name, channel.value]));
    return {
      "排序": index + 1,
      "环节": item.name,
      "数值": item.value,
      "副标题": item.note,
      "美团": channels["美团"],
      "抖音": channels["抖音"],
      "私域": channels["私域"],
      "其他": channels["其他"]
    };
  });
  return matrixFromRows(rows, headers);
}

function jsonValue(row, keys, fallback = "") {
  for (const key of keys) {
    const value = deepJsonValue(row, key);
    if (value == null || value === "") continue;
    if (Array.isArray(value)) return value.map((item) => jsonPrimitive(item)).filter(Boolean).join("、");
    return jsonPrimitive(value);
  }
  return fallback;
}

function jsonArrayValue(row, keys) {
  for (const key of keys) {
    const value = deepJsonValue(row, key);
    if (Array.isArray(value)) return value.map((item) => jsonPrimitive(item)).filter(Boolean);
    if (value != null && value !== "") return String(value).split(/[、,，；;|\n]+/).map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function deepJsonValue(row, key) {
  if (!row || typeof row !== "object") return undefined;
  if (Object.prototype.hasOwnProperty.call(row, key)) return row[key];
  const snake = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  if (Object.prototype.hasOwnProperty.call(row, snake)) return row[snake];
  for (const value of Object.values(row)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const found = deepJsonValue(value, key);
      if (found != null && found !== "") return found;
    }
  }
  return undefined;
}

function jsonPrimitive(value) {
  if (value == null) return "";
  if (typeof value === "object") return value.name || value.title || value.text || value.label || value.id || "";
  return String(value).trim();
}

function jsonNumber(row, keys, fallback = 0) {
  const raw = jsonValue(row, keys);
  const number = Number(String(raw).replace(/,/g, "").replace("%", ""));
  return Number.isFinite(number) ? number : fallback;
}

function jsonBoolean(row, keys) {
  return ["1", "true", "TRUE", "是", "已", "yes"].includes(jsonValue(row, keys));
}

function jsonDate(row, keys) {
  const raw = jsonValue(row, keys);
  if (!raw) return "";
  const date = parseBeijingDate(raw);
  if (Number.isNaN(date.getTime())) return raw;
  const parts = beijingDateParts(date);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

function normalizeCity(value) {
  const raw = Array.isArray(value) ? value.join("") : String(value || "");
  if (raw.includes("深圳")) return "深圳";
  if (raw.includes("广州")) return "广州";
  return raw.replace(/市$/, "");
}

function coachLevelLabel(value) {
  const raw = String(value || "").trim();
  const map = { 1: "L1", 2: "L2", 3: "L3", 4: "L4", 5: "L5" };
  return map[raw] || raw || "未定级";
}

function coachStatusLabel(value) {
  const raw = String(value || "").trim();
  if (!raw || raw === "1" || raw === "在职" || raw === "启用") return "在职";
  if (raw === "2" || raw === "停用" || raw === "禁用") return "停用";
  if (raw === "3" || raw === "离职") return "离职";
  return raw;
}

function serviceStoreCountLabel(value) {
  const count = Number(value);
  return Number.isFinite(count) && count > 0 ? `已关联${count}家门店` : "";
}

function jsonPaid(row) {
  const raw = jsonValue(row, ["增值门店", "是否付费", "is_value_added", "value_added", "paid", "付费入驻", "入驻类型"]);
  return ["1", "true", "TRUE", "是", "付费", "付费入驻"].some((item) => String(raw).includes(item));
}

function storeStatusLabel(value) {
  const raw = String(value || "").trim();
  const map = {
    1: "营业中",
    2: "暂停营业",
    3: "闭店",
    4: "装修中",
    5: "删除",
    6: "测试"
  };
  return map[raw] || raw || "未知";
}

function showStatusLabel(value) {
  const raw = String(value || "").trim();
  const map = { 1: "上架", 2: "下架" };
  return map[raw] || raw || "未知";
}

function storeSourceLabel(value) {
  const raw = String(value || "").trim();
  const map = { 1: "其他门店", 2: "小铁门店" };
  return map[raw] || raw || "未知";
}

function roomTypeLabel(value) {
  const raw = String(value || "").trim();
  const map = { 1: "自助球房", 2: "商务球房", 3: "竞技球房" };
  return map[raw] || raw || "";
}

function isRenewalCourse(name) {
  return /续课|续费|续约|正课/.test(String(name || ""));
}

function currentMonthPeriodText() {
  const now = beijingDateParts();
  return `${now.year}年${now.month}月`;
}

function monthProgress() {
  const now = beijingDateParts();
  const days = new Date(Date.UTC(now.year, now.month, 0)).getUTCDate();
  return Math.round((now.day / days) * 1000) / 10;
}

function dateInCurrentMonthText(value) {
  const date = excelRowDate({ 日期: value });
  if (!date) return false;
  const current = beijingDateParts();
  const row = beijingDateParts(date);
  return row.year === current.year && row.month === current.month;
}

function dateIsYesterdayText(value) {
  const date = excelRowDate({ 日期: value });
  if (!date) return false;
  const today = beijingDateParts();
  const yesterday = beijingDate(today.year, today.month - 1, today.day - 1);
  return date >= yesterday && date <= new Date(yesterday.getTime() + 86400000 - 1);
}

function excelCityViewRow(r, view, auto, coachRows, districtRows) {
  const cityName = excelText(r["城市"]);
  const goal = excelNum(r["目标营收_万元"]);
  const completed = auto?.revenueWan ?? excelNum(r["实际完成_万元"]);
  return {
    key: cityName === "深圳" ? "shenzhen" : "guangzhou",
    name: cityName,
    color: cityName === "深圳" ? "#0066ff" : "#1aa7ff",
    goal,
    completed,
    rate: goal ? percent(completed, goal) : excelNum(r["完成率_%"]),
    time: excelNum(r["时间进度_%"]),
    gap: excelNum(r["差距_万元"], completed - goal),
    forecast: excelNum(r["预计月底_万元"]),
    needed: excelNum(r["还需完成_万元"], Math.max(goal - completed, 0)),
    status: excelText(r["状态"], "预警"),
    monthlyGoal: excelNum(r["月度目标_万元"], goal),
    monthlyCompleted: auto?.monthRevenueWan ?? excelNum(r["月度完成_万元"], excelNum(r["实际完成_万元"])),
    weekGoal: excelNum(r["周目标_万元"], goal / 4),
    weekCompleted: auto?.weekRevenueWan ?? excelNum(r["周完成_万元"]),
    yesterdayCompleted: auto?.yesterdayRevenueWan ?? excelNum(r["昨日完成_万元"]),
    courseUsersTotal: auto?.users ?? excelNum(r["正课总用户数"]),
    courseUsersExpiring: excelNum(r["到期用户数"]),
    courseUsersExpiringMonth: excelNum(r["本月到期用户数"]),
    trialLessonsTotal: auto?.cumulativeTrialLessons ?? excelNum(r["总体验课数"]),
    trialLessonsMonth: auto?.monthTrialLessons ?? excelNum(r["本月体验课数"]),
    trialDeals: auto?.monthDeals ?? excelNum(r["体验课成交数"]),
    coachesTotal: auto?.coachesTotal ?? excelNum(r["总教练数"]),
    coachesNew: auto?.coachesNewMonth ?? excelNum(r["新增教练数"]),
    coachesNewMonth: auto?.coachesNewMonth ?? excelNum(r["月度新增教练数"], excelNum(r["新增教练数"])),
    coachesNewYesterday: auto?.coachesNewYesterday ?? excelNum(r["昨日新增教练数"]),
    coachesNewMonthNames: auto?.coachesNewMonthNames ?? excelSplit(r["月度新增教练名字"] || r["本月新增教练名字"] || r["本月新增教练"]),
    coachesNewYesterdayNames: auto?.coachesNewYesterdayNames ?? excelSplit(r["昨日新增教练名字"] || r["昨天新增教练名字"] || r["昨日新增教练"]),
    storesTotal: auto?.storesTotal ?? excelNum(r["入驻门店数"]),
    storesPaidTotal: auto?.storesPaidTotal ?? excelNum(r["付费入驻门店数"]),
    storesFreeTotal: auto?.storesFreeTotal ?? excelNum(r["免费入驻门店数"]),
    storesNew: auto?.storesNewMonth ?? excelNum(r["新增门店数"]),
    storesNewPaid: auto?.storesNewPaidMonth ?? excelNum(r["月度新签付费门店数"] || r["新签付费门店数"]),
    storesNewFree: auto?.storesNewFreeMonth ?? excelNum(r["月度新签免费门店数"] || r["新签免费门店数"]),
    storesNewMonth: auto?.storesNewMonth ?? excelNum(r["月度新增门店数"], excelNum(r["新增门店数"])),
    storesNewYesterday: auto?.storesNewYesterday ?? excelNum(r["昨日新增门店数"]),
    storesNewMonthList: auto?.storesNewMonthList ?? excelStoreItems(r["月度新增门店所在区及名字"] || r["月度新增门店"] || r["本月新增门店"]),
    storesNewYesterdayList: auto?.storesNewYesterdayList ?? excelStoreItems(r["昨日新增门店所在区及名字"] || r["昨日新增门店"]),
    newSignedStores: auto?.storesNewMonth ?? excelNum(r["新签门店数"], excelNum(r["新增门店数"])),
    formulaLogic: auto?.formulaLogic || excelFormulaLogic(),
    channels: auto?.channels || {
      user: excelChannelMetrics(r, "用户端"),
      coach: excelChannelMetrics(r, "教练端"),
      store: excelChannelMetrics(r, "门店端")
    },
    coaches: auto?.coaches || coachRows
      .filter((coach) => excelText(coach.period_type, view) === view && excelText(coach["城市"]) === cityName)
      .map(excelCoach),
    districts: auto?.districts || districtRows
      .filter((district) => excelText(district.period_type, view) === view && excelText(district["城市"]) === cityName)
      .map(excelDistrict)
  };
}

function excelAutoOperatingModel(source) {
  if (!source.stores.length && !source.coaches.length && !source.trials.length && !source.renewals.length) return {};
  const periods = excelOperatingPeriods(source.meta.period);
  const cities = [...new Set([
    ...source.stores.flatMap(row => excelSplit(row["城市"]).map(normalizeCity)),
    ...source.coaches.flatMap(row => excelSplit(row["城市"]).map(normalizeCity)),
    ...source.trials.flatMap(row => excelSplit(row["城市"]).map(normalizeCity)),
    ...source.renewals.flatMap(row => excelSplit(row["城市"]).map(normalizeCity))
  ].filter(Boolean))];
  const relations = excelRelationsByCoach(source.relations);
  const model = {};
  for (const [view, period] of Object.entries(periods)) {
    model[view] = {};
    for (const city of cities) {
      model[view][city] = excelAutoCity(city, period, periods, source, relations);
    }
  }
  return model;
}

function excelAutoCity(city, period, periods, source, relations) {
  const stores = source.stores.filter(row => excelFieldIncludes(row["城市"], city));
  const coaches = source.coaches.filter(row => excelFieldIncludes(row["城市"], city));
  const trials = source.trials.filter(row => excelFieldIncludes(row["城市"], city));
  const renewals = source.renewals.filter(row => excelFieldIncludes(row["城市"], city));
  const scopedTrials = trials.filter(row => excelDateInPeriod(excelRowDate(row), period));
  const scopedRenewals = renewals.filter(row => excelDateInPeriod(excelRowDate(row), period));
  const monthTrials = trials.filter(row => excelDateInPeriod(excelRowDate(row), periods.month));
  const weekTrials = trials.filter(row => excelDateInPeriod(excelRowDate(row), periods.week));
  const yesterdayTrials = trials.filter(row => excelDateInPeriod(excelRowDate(row), periods.day));
  const monthRenewals = renewals.filter(row => excelDateInPeriod(excelRowDate(row), periods.month));
  const weekRenewals = renewals.filter(row => excelDateInPeriod(excelRowDate(row), periods.week));
  const yesterdayRenewals = renewals.filter(row => excelDateInPeriod(excelRowDate(row), periods.day));
  const monthStores = stores.filter(row => excelDateInPeriod(excelRowDate(row, "入驻日期"), periods.month) || excelTruthy(row["新增类型"]));
  const yesterdayStores = stores.filter(row => excelDateInPeriod(excelRowDate(row, "入驻日期"), periods.day) || excelTruthy(row["昨日新增"]));
  const monthCoaches = coaches.filter(row => excelDateInPeriod(excelRowDate(row, "入职日期"), periods.month) || excelTruthy(row["新增类型"]));
  const yesterdayCoaches = coaches.filter(row => excelDateInPeriod(excelRowDate(row, "入职日期"), periods.day) || excelTruthy(row["昨日新增"]));
  return {
    revenueWan: Math.round((excelSum(scopedTrials, "金额") + excelSum(scopedRenewals, "金额")) / 100) / 100,
    monthRevenueWan: Math.round((excelSum(monthTrials, "金额") + excelSum(monthRenewals, "金额")) / 100) / 100,
    weekRevenueWan: Math.round((excelSum(weekTrials, "金额") + excelSum(weekRenewals, "金额")) / 100) / 100,
    yesterdayRevenueWan: Math.round((excelSum(yesterdayTrials, "金额") + excelSum(yesterdayRenewals, "金额")) / 100) / 100,
    cumulativeTrialLessons: excelSum(trials, "下单数"),
    monthTrialLessons: excelSum(monthTrials, "下单数"),
    monthDeals: excelSum(monthTrials, "转化数"),
    users: excelSum(trials, "转化数") + excelSum(renewals, "续约数"),
    coachesTotal: coaches.filter(row => excelText(row["在职状态"], "在职") !== "离职").length,
    coachesNewMonth: monthCoaches.length,
    coachesNewYesterday: yesterdayCoaches.length,
    coachesNewMonthNames: monthCoaches.map(row => excelText(row["教练"])).filter(Boolean),
    coachesNewYesterdayNames: yesterdayCoaches.map(row => excelText(row["教练"])).filter(Boolean),
    storesTotal: stores.length,
    storesPaidTotal: stores.filter(excelPaidStore).length,
    storesFreeTotal: stores.filter(row => !excelPaidStore(row)).length,
    storesNewMonth: monthStores.length,
    storesNewPaidMonth: monthStores.filter(excelPaidStore).length,
    storesNewFreeMonth: monthStores.filter(row => !excelPaidStore(row)).length,
    storesNewYesterday: yesterdayStores.length,
    storesNewMonthList: monthStores.map(excelStoreItem),
    storesNewYesterdayList: yesterdayStores.map(excelStoreItem),
    channels: {
      user: excelAggregateChannel(monthTrials, monthRenewals, yesterdayTrials, yesterdayRenewals),
      coach: excelAggregateChannel(monthTrials, monthRenewals, yesterdayTrials, yesterdayRenewals),
      store: excelAggregateChannel(monthTrials, monthRenewals, yesterdayTrials, yesterdayRenewals)
    },
    coaches: coaches.map(coach => excelAggregateCoach(coach, trials, renewals, relations, periods)),
    districts: excelAggregateDistricts(stores, coaches),
    formulaLogic: excelFormulaLogic()
  };
}

function excelAggregateCoach(coach, trials, renewals, relations, periods) {
  const coachId = excelText(coach["教练ID"]);
  const coachName = excelText(coach["教练"]);
  const ownTrials = trials.filter(row => excelSameCoach(row, coachId, coachName));
  const ownRenewals = renewals.filter(row => excelSameCoach(row, coachId, coachName));
  const monthTrials = ownTrials.filter(row => excelDateInPeriod(excelRowDate(row), periods.month));
  const yesterdayTrials = ownTrials.filter(row => excelDateInPeriod(excelRowDate(row), periods.day));
  const cumulativeTrialLessons = excelSum(ownTrials, "下单数");
  const cumulativeDeals = excelSum(ownTrials, "转化数");
  const monthTrialLessons = excelSum(monthTrials, "下单数");
  const monthDeals = excelSum(monthTrials, "转化数");
  const yesterdayTrialLessons = excelSum(yesterdayTrials, "下单数");
  const yesterdayDeals = excelSum(yesterdayTrials, "转化数");
  const renewalsCount = excelSum(ownRenewals, "续约数") || ownRenewals.length;
  return {
    name: coachName,
    level: excelText(coach["教练等级"], "未定级"),
    district: excelText(coach["区域"]),
    storeNames: relations.get(coachId)?.length ? relations.get(coachId) : excelSplit(coach["服务门店"] || coach["门店名称"]),
    cumulativeTrialLessons,
    cumulativeDeals,
    cumulativeConversionRate: percent(cumulativeDeals, cumulativeTrialLessons),
    monthTrialLessons,
    monthDeals,
    monthConversionRate: percent(monthDeals, monthTrialLessons),
    yesterdayTrialLessons,
    yesterdayDeals,
    yesterdayConversionRate: percent(yesterdayDeals, yesterdayTrialLessons),
    trialLessons: monthTrialLessons,
    trialDeals: monthDeals,
    conversionRate: percent(monthDeals, monthTrialLessons),
    users: cumulativeDeals,
    renewals: renewalsCount,
    renewalRate: percent(renewalsCount, cumulativeDeals)
  };
}

function excelAggregateDistricts(stores, coaches) {
  const districts = [...new Set([
    ...stores.flatMap(row => excelSplit(row["区域"])),
    ...coaches.flatMap(row => excelSplit(row["区域"]))
  ].filter(Boolean))];
  return districts.map((district) => {
    const districtStores = stores.filter(row => excelFieldIncludes(row["区域"], district));
    const districtCoaches = coaches.filter(row => excelFieldIncludes(row["区域"], district));
    return {
      name: district,
      coaches: districtCoaches.length,
      coachNames: districtCoaches.map(row => excelText(row["教练"])).filter(Boolean),
      stores: districtStores.length,
      storeNames: districtStores.map(row => excelText(row["门店名称"])).filter(Boolean)
    };
  });
}

function excelDistrict(row) {
  return {
    name: excelText(row["区域"]),
    coaches: excelNum(row["教练数"]),
    coachNames: excelSplit(row["教练名字"] || row["教练名称"] || row["教练名单"]),
    stores: excelNum(row["门店数"]),
    storeNames: excelSplit(row["门店名字"] || row["门店名称"] || row["门店名单"])
  };
}

function excelRows(matrix) {
  if (!Array.isArray(matrix)) return [];
  const headerIndex = matrix.findIndex((row) => row && row.some((cell) => excelIsHeader(cell)));
  if (headerIndex < 0) return [];
  const headers = matrix[headerIndex].map((value) => excelText(value));
  return matrix.slice(headerIndex + 1)
    .filter((row) => row && row.some((cell) => excelText(cell) !== ""))
    .map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index]]).filter(([header]) => header)));
}

function excelIsHeader(value) {
  return ["period_type", "城市", "KR编号", "项目", "姓名", "部门", "key", "动作ID", "教练", "区域"].includes(excelText(value));
}

function excelText(value, fallback = "") {
  if (value == null) return fallback;
  return String(value).trim() || fallback;
}

function excelFieldIncludes(value, expected) {
  const raw = excelText(value);
  const target = excelText(expected);
  if (!raw || !target) return false;
  return excelSplit(raw).some((item) => item === target || normalizeCity(item) === normalizeCity(target));
}

function excelNum(value, fallback = 0) {
  if (value == null || value === "") return fallback;
  const numeric = Number(String(value).replace(/,/g, "").replace("%", ""));
  return Number.isFinite(numeric) ? numeric : fallback;
}

function excelSum(rows, key) {
  return rows.reduce((sum, row) => sum + excelNum(row[key], key === "下单数" || key === "已消课数" ? 1 : 0), 0);
}

function excelRelationsByCoach(rows) {
  const map = new Map();
  rows.forEach((row) => {
    const coachId = excelText(row["教练ID"]);
    const storeName = excelText(row["门店名称"]);
    if (!coachId || !storeName) return;
    if (!map.has(coachId)) map.set(coachId, []);
    if (!map.get(coachId).includes(storeName)) map.get(coachId).push(storeName);
  });
  return map;
}

function excelAggregateChannel(monthTrials, monthRenewals, yesterdayTrials, yesterdayRenewals) {
  const monthTrialLessons = excelSum(monthTrials, "下单数");
  const monthDeals = excelSum(monthTrials, "转化数");
  const yesterdayTrialLessons = excelSum(yesterdayTrials, "下单数");
  const yesterdayDeals = excelSum(yesterdayTrials, "转化数");
  return {
    monthTrialLessons,
    monthDeals,
    monthConversionRate: percent(monthDeals, monthTrialLessons),
    monthRenewals: excelSum(monthRenewals, "续约数") || monthRenewals.length,
    yesterdayTrialLessons,
    yesterdayDeals,
    yesterdayConversionRate: percent(yesterdayDeals, yesterdayTrialLessons),
    yesterdayRenewals: excelSum(yesterdayRenewals, "续约数") || yesterdayRenewals.length
  };
}

function excelOperatingPeriods(periodText) {
  const parsed = excelParseMonthPeriod(periodText);
  const now = beijingDateParts();
  const today = beijingDate(now.year, now.month - 1, now.day);
  const yesterday = beijingDate(now.year, now.month - 1, now.day - 1);
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - 6);
  return {
    month: parsed || {
      start: beijingDate(now.year, now.month - 1, 1),
      end: beijingDate(now.year, now.month, 0, 23, 59, 59, 999)
    },
    week: { start: weekStart, end: new Date(today.getTime() + 86400000 - 1) },
    day: { start: yesterday, end: new Date(yesterday.getTime() + 86400000 - 1) }
  };
}

function excelParseMonthPeriod(value) {
  const match = excelText(value).match(/(\d{4})年(\d{1,2})月/);
  if (!match) return null;
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  return {
    start: beijingDate(year, monthIndex, 1),
    end: beijingDate(year, monthIndex + 1, 0, 23, 59, 59, 999)
  };
}

function excelRowDate(row, key = "日期") {
  const value = row[key];
  if (value instanceof Date) return value;
  if (typeof value === "number") return new Date(Math.round((value - 25569) * 86400 * 1000));
  const raw = excelText(value);
  if (!raw) return null;
  const date = parseBeijingDate(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

function excelDateInPeriod(date, period) {
  return date && date >= period.start && date <= period.end;
}

function parseBeijingDate(value) {
  const normalized = String(value).trim().replace(/[年月.]/g, "-").replace(/日/g, "").replace(/\//g, "-");
  const localMatch = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?)?$/);
  if (localMatch) {
    const [, year, month, day, hour = "0", minute = "0", second = "0"] = localMatch;
    return beijingDate(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
  }
  return new Date(normalized);
}

function beijingDate(year, monthIndex, day, hour = 0, minute = 0, second = 0, millisecond = 0) {
  return new Date(Date.UTC(year, monthIndex, day, hour - 8, minute, second, millisecond));
}

function beijingDateParts(date = new Date()) {
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

function excelTruthy(value) {
  return ["1", "是", "true", "TRUE", "本月新增", "本月新签", "昨日新增"].includes(excelText(value));
}

function excelPaidStore(row) {
  return excelText(row["入驻类型"]).includes("付费") || excelNum(row["是否付费"]) > 0;
}

function excelStoreItem(row) {
  return { district: excelText(row["区域"]), name: excelText(row["门店名称"]) };
}

function excelSameCoach(row, coachId, coachName) {
  return (coachId && excelText(row["教练ID"]) === coachId) || (coachName && excelText(row["教练"]) === coachName);
}

function excelFormulaLogic() {
  return [
    "本月=日期落在基础配置 period 所在自然月的数据；昨日=当前日期前一天的数据；本周=最近7天。",
    "教练体验课数=体验课流水.下单数求和；转化数=体验课流水.转化数求和；转化率=转化数/体验课数。",
    "营收完成=体验课流水.金额+续课流水.金额；续课数=续课流水.续约数求和。",
    "城区教练/门店=教练档案、门店明细按城市+区域分组；服务门店=教练门店关系按教练ID聚合。"
  ];
}

function excelSplit(value) {
  return excelText(value).split(/[、,，；;|\n]+/).map((item) => item.trim()).filter(Boolean);
}

function excelStoreItems(value) {
  return excelSplit(value).map((item) => {
    const parts = item.split(/[:：｜|/／-]/).map((part) => part.trim()).filter(Boolean);
    return parts.length >= 2 ? { district: parts[0], name: parts.slice(1).join("-") } : { district: "", name: item };
  });
}

function excelChannelMetrics(row, prefix) {
  const monthTrialLessons = excelNum(row[`${prefix}月度体验课数`] || row[`${prefix}_月度体验课数`]);
  const monthDeals = excelNum(row[`${prefix}月度成交数`] || row[`${prefix}_月度成交数`]);
  const yesterdayTrialLessons = excelNum(row[`${prefix}昨日体验课数`] || row[`${prefix}_昨日体验课数`]);
  const yesterdayDeals = excelNum(row[`${prefix}昨日成交数`] || row[`${prefix}_昨日成交数`]);
  return {
    monthTrialLessons,
    monthDeals,
    monthConversionRate: excelNum(row[`${prefix}月度转化率_%`] || row[`${prefix}_月度转化率_%`], percent(monthDeals, monthTrialLessons)),
    monthRenewals: excelNum(row[`${prefix}月度续课数`] || row[`${prefix}_月度续课数`]),
    yesterdayTrialLessons,
    yesterdayDeals,
    yesterdayConversionRate: excelNum(row[`${prefix}昨日转化率_%`] || row[`${prefix}_昨日转化率_%`], percent(yesterdayDeals, yesterdayTrialLessons)),
    yesterdayRenewals: excelNum(row[`${prefix}昨日续课数`] || row[`${prefix}_昨日续课数`])
  };
}

function excelCoach(row) {
  return {
    name: excelText(row["教练"]),
    level: excelText(row["教练等级"], "未定级"),
    district: excelText(row["区域"]),
    storeNames: excelSplit(row["服务门店"] || row["门店名字"] || row["门店名称"] || row["门店名单"]),
    cumulativeTrialLessons: excelNum(row["累计体验课"] || row["累计体验课数"] || row["体验课数"]),
    cumulativeDeals: excelNum(row["累计转化"] || row["累计成交"] || row["累计成交数"] || row["体验课成交数"]),
    cumulativeConversionRate: excelNum(row["累计转化率_%"] || row["累计成交率_%"] || row["成交率_%"]),
    monthTrialLessons: excelNum(row["月度体验课"] || row["月度体验课数"] || row["本月体验课数"]),
    monthDeals: excelNum(row["月度转化"] || row["月度成交"] || row["月度成交数"] || row["本月成交数"]),
    monthConversionRate: excelNum(row["月度转化率_%"] || row["月度成交率_%"] || row["本月转化率_%"]),
    yesterdayTrialLessons: excelNum(row["昨日体验课"] || row["昨日体验课数"]),
    yesterdayDeals: excelNum(row["昨日成交"] || row["昨日成交数"] || row["昨日转化"]),
    yesterdayConversionRate: excelNum(row["昨日转化率_%"] || row["昨日成交率_%"]),
    users: excelNum(row["用户数"]),
    renewals: excelNum(row["续课数"]),
    renewalRate: excelNum(row["续客率_%"])
  };
}

function excelOkrRow(nameKey) {
  return (row) => ({
    name: excelText(row[nameKey]),
    objective: excelText(row["Objective"]),
    owner: excelText(row["负责人"]),
    target: excelText(row["目标值"]),
    done: excelText(row["实际完成"]),
    unit: excelText(row["单位"]),
    rate: excelNum(row["完成率_%"]),
    risk: excelText(row["风险/卡点"]),
    action: excelText(row["下一步具体动作"]),
    dueDate: excelText(row["截止日期"]),
    krs: excelText(row["关键KR"]).split(/[；;|\n]+/).map((item) => item.trim()).filter(Boolean)
  });
}

function excelFunnel(rows) {
  return rows
    .filter((row) => excelText(row["环节"]))
    .sort((a, b) => excelNum(a["排序"], 999) - excelNum(b["排序"], 999))
    .map((row) => ({
      name: excelText(row["环节"]),
      value: excelText(row["数值"]),
      note: excelText(row["副标题"] || row["说明"] || row["备注"] || row["辅助指标"]),
      channels: [
        ["美团", row["美团"]],
        ["抖音", row["抖音"]],
        ["私域", row["私域"]],
        ["其他", row["其他"]]
      ].filter(([, value]) => excelText(value)).map(([name, value]) => ({ name, value: excelText(value) }))
    }));
}

function excelColorByRate(rate) {
  if (rate < 35) return "#ff4d5e";
  if (rate < 55) return "#ffb11a";
  return "#28e681";
}

async function exportPng() {
  if (!window.html2canvas) {
    alert("PNG导出组件还没加载完成，请刷新页面后再试。");
    return;
  }
  els.dockMenu.classList.remove("open");
  try {
    const canvas = await captureCurrentPageCanvas();
    downloadFile(canvas.toDataURL("image/png"), timestampName("小铁台球经营看板", "png"));
  } catch (error) {
    alert(`PNG导出失败：${error.message}`);
  } finally {
    document.body.classList.remove("exporting");
  }
}

async function exportPdf() {
  if (!window.html2canvas || !window.jspdf?.jsPDF) {
    window.print();
    return;
  }
  els.dockMenu.classList.remove("open");
  try {
    const canvas = await captureCurrentPageCanvas();
    const image = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jspdf.jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(image, "JPEG", 0, 0, canvas.width, canvas.height);
    pdf.save(timestampName("小铁台球经营报告", "pdf"));
  } catch (error) {
    alert(`PDF导出失败：${error.message}`);
  } finally {
    document.body.classList.remove("exporting");
  }
}

document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () => {
    activeView = button.dataset.view;
    document.querySelectorAll("[data-view]").forEach(item => item.classList.toggle("active", item === button));
    render();
  });
});

document.addEventListener("click", (event) => {
  const allButton = event.target.closest("[data-coach-filter-all]");
  if (allButton) {
    allButton.closest(".coach-filter-menu").querySelectorAll("[data-coach-filter-option]").forEach((box) => {
      box.checked = true;
    });
    return;
  }

  const noneButton = event.target.closest("[data-coach-filter-none]");
  if (noneButton) {
    noneButton.closest(".coach-filter-menu").querySelectorAll("[data-coach-filter-option]").forEach((box) => {
      box.checked = false;
    });
    return;
  }

  const applyButton = event.target.closest("[data-coach-filter-apply]");
  if (applyButton) {
    const cityKey = applyButton.dataset.city;
    const key = applyButton.dataset.coachFilterApply;
    const menu = applyButton.closest(".coach-filter-menu");
    const boxes = [...menu.querySelectorAll(`[data-coach-filter-option="${key}"]`)];
    const checked = boxes.filter((box) => box.checked).map((box) => box.value);
    const state = coachTableState[cityKey] || { sortKey: "cumulativeConversionRate", sortDir: "desc", filters: {} };
    state.filters[key] = checked.length === 0 ? ["__NONE__"] : checked.length === boxes.length ? [] : checked;
    coachTableState[cityKey] = state;
    render();
    return;
  }

  const cancelButton = event.target.closest("[data-coach-filter-cancel]");
  if (cancelButton) {
    cancelButton.closest("details").open = false;
    return;
  }

  const button = event.target.closest("[data-coach-sort]");
  if (!button) return;
  const cityKey = button.dataset.city;
  const key = button.dataset.coachSort;
  const state = coachTableState[cityKey] || { sortKey: "cumulativeConversionRate", sortDir: "desc", filters: {} };
  state.sortDir = button.dataset.sortDir || (state.sortKey === key && state.sortDir === "desc" ? "asc" : "desc");
  state.sortKey = key;
  coachTableState[cityKey] = state;
  render();
});

document.addEventListener("change", (event) => {
  if (!event.target.closest("[data-coach-filter-option]")) return;
});

document.addEventListener("input", (event) => {
  const input = event.target.closest("[data-coach-filter-search]");
  if (!input) return;
  const query = input.value.trim().toLowerCase();
  input.closest(".coach-filter-menu").querySelectorAll("label").forEach((label) => {
    label.hidden = query && !label.innerText.toLowerCase().includes(query);
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
document.querySelector("#pngButton").addEventListener("click", exportPng);
document.querySelector("#pdfButton").addEventListener("click", exportPdf);
document.querySelector("#templateButton").addEventListener("click", () => {
  downloadFile("./小铁台球经营仓数据模板.xlsx", "小铁台球经营仓数据模板.xlsx");
});
document.querySelector("#uploadButton").addEventListener("click", uploadExcelData);
document.querySelector("#jsonUploadButton").addEventListener("click", uploadJsonData);

render();
loadRemoteData(false);
setInterval(() => loadRemoteData(false), AUTO_SYNC_INTERVAL_MS);
