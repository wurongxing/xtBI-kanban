# 小铁台球教培经营看板 - Vercel 实时同步版

这个版本用 Vercel 部署：

- `index.html` / `styles.css` / `app.js`：看板页面
- `api/dingtalk-data.js`：服务端读取钉钉表格并返回看板 JSON
- `data.json`：本地兜底数据

## Vercel 环境变量

在 Vercel 项目 Settings -> Environment Variables 填：

```text
DINGTALK_APP_KEY=你的钉钉应用 AppKey
DINGTALK_APP_SECRET=你的钉钉应用 AppSecret
DINGTALK_WORKBOOK_ID=NkDwLng8ZLO232N1SNZKoE41VKMEvZBY
DINGTALK_OPERATOR_ID=PFArDJd84HcyNlj3iSBvkrwiEiE
DINGTALK_RANGE=A1:Z300
```

你上一个项目里的这些变量可以作为参考：

```text
DINGTALK_SYNC=true
DINGTALK_DOC_URL=https://alidocs.dingtalk.com/i/nodes/NkDwLng8ZLO232N1SNZKoE41VKMEvZBY?utm_scene=person_space&iframeQuery=sheet_range%3Dst-d3ac7018-8259_5_1_1_1
DINGTALK_WORKBOOK_ID=NkDwLng8ZLO232N1SNZKoE41VKMEvZBY
DINGTALK_OPERATOR_ID=PFArDJd84HcyNlj3iSBvkrwiEiE
```

`VIEW_PASSWORD` 和 `SESSION_TOKEN` 是旧项目的访问密码逻辑；当前这个看板还没有启用密码页，所以暂时不用填。

`DINGTALK_SHEETS` 填 JSON，一开始可以先用中文表名测试：

```json
{
  "基础配置": "基础配置",
  "双城经营": "双城经营",
  "双城对比": "双城对比",
  "公司KR": "公司KR",
  "六部门OKR": "六部门OKR",
  "六项目OKR": "六项目OKR",
  "个人OKR": "个人OKR",
  "动作追踪": "动作追踪"
}
```

如果接口报 sheetId 找不到，就需要把这些值替换为钉钉表格真实 sheetId。

## 双城经营新增字段

组织架构调整为城市经营中心后，`双城经营` sheet 建议保留原有列，并追加这些中文列：

```text
正课总用户数
到期用户数
本月到期用户数
总体验课数
本月体验课数
体验课成交数
总教练数
新增教练数
入驻门店数
新增门店数
```

每个城市、每个周期各一行，例如：

```text
period_type = month / week / day
城市 = 深圳 / 广州
目标营收_万元
实际完成_万元
完成率_%
时间进度_%
正课总用户数
...
```

## 部署后测试

打开：

```text
https://你的域名.vercel.app/api/dingtalk-data
```

返回 JSON 就说明同步成功。
