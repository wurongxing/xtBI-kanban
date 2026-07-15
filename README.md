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
DINGTALK_WORKBOOK_ID=ndMj49yWjX2wvw61sRz5a1mQJ3pmz5aA
DINGTALK_RANGE=A1:Z300
```

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

## 部署后测试

打开：

```text
https://你的域名.vercel.app/api/dingtalk-data
```

返回 JSON 就说明同步成功。
