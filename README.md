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
  "教练经营": "教练经营",
  "城区分布": "城区分布",
  "转化漏斗": "转化漏斗"
}
```

如果接口报 sheetId 找不到，就需要把这些值替换为钉钉表格真实 sheetId。

## 双城经营新增字段

组织架构调整为城市经营中心后，首页按 `深圳经营中心`、`广州经营中心` 展示。`双城经营` sheet 建议保留原有列，并追加这些中文列：

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
付费入驻门店数
免费入驻门店数
新增门店数
新签门店数
```

每个城市、每个周期各一行，例如：

```text
period_type = month / week / day
城市 = 深圳 / 广州
目标营收_万元
实际完成_万元
完成率_%
时间进度_%
月度目标_万元
月度完成_万元
周目标_万元
周完成_万元
昨日完成_万元
月度新增教练数
昨日新增教练数
月度新增教练名字
昨日新增教练名字
月度新增门店数
月度新签付费门店数
月度新签免费门店数
昨日新增门店数
月度新增门店所在区及名字
昨日新增门店所在区及名字
用户端月度体验课数
用户端月度成交数
用户端月度转化率_%
用户端月度续课数
用户端昨日体验课数
用户端昨日成交数
用户端昨日转化率_%
用户端昨日续课数
正课总用户数
...
```

门店名称可以写成 `南山-科技园店、福田:车公庙店、龙华｜民治店`，一个单元格内多个值用顿号、逗号或分号分隔。

## 教练经营 sheet

如需同步“每个教练的成交率看板及续客率看板”，新增 `教练经营` sheet：

```text
period_type
城市
区域
教练
教练等级
服务门店
累计体验课
累计转化
累计转化率_%
月度体验课
月度转化
月度转化率_%
昨日体验课
昨日成交
昨日转化率_%
用户数
续课数
续客率_%
```

`服务门店` 支持一个教练多个门店，例如：`南山旗舰店、科技园店、后海店`。

## 转化漏斗 sheet

总部运营中心 OKR 页会读取 `转化漏斗` sheet：

```text
排序
环节
数值
副标题
美团
抖音
私域
其他
```

建议环节按顺序填写：`小程序日活`、`体验课下单数`、`未退款数`、`已消课数`、`转化数`、`续约数`。第二层 `体验课下单数` 可在 `美团 / 抖音 / 私域 / 其他` 四列填写渠道拆分；`副标题` 可填写浏览转体验转化率、退款数、下单未预约数、有效下单消课率、转化率、续约率等补充指标。

## 城区分布 sheet

如需同步“城市各个区一览图”，新增 `城区分布` sheet：

```text
period_type
城市
区域
教练数
教练名字
门店数
门店名字
```

## 部署后测试

打开：

```text
https://你的域名.vercel.app/api/dingtalk-data
```

返回 JSON 就说明同步成功。
