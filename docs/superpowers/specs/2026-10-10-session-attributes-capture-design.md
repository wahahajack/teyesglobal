# TEYES Global session_attributes 捕获与回传设计（2026-10-10 方案；2026-10-11 实现版）

## 背景

Google 自 2026-02-02 起不再接受新的 Google Ads API 离线转化导入，新集成必须使用 Data Manager API；
拿不到 gclid/gbraid/wbraid 的流量，官方推荐抓取会话属性并随离线回传提交。

## 现状与关键约束（2026-10-11 实测确认）

- Ads 落地页报告（9/10–10/9，167 次点击）：gclid 0 次、gbraid 134 次、仅有 `gad_source/gad_campaignid` 33 次。
- 端到端受控测试（真实浏览器两轮，测试线索已删除）：现有捕获 → Zoho 链路工作正常；`www`→主域 301 保留参数。
- 回传工具已支持三种标识路径并通过官方 `validateOnly`：gclid/gbraid/wbraid；`sessionAttributes`（编码串）；
  gad_* 备选路径（`experimentalFields` + `landingPageDeviceInfo.userAgent`）。
- **Zoho 限制：Leads 的 text 与 textarea 自定义字段额度均已用满，无法新增字段；rich_text 需企业版。**
  因此会话属性改为写入 **Description 的 Attribution 段**（与 Form Entry Page / Page Journey 同一格式），
  回传工具从 Description 自动解析。

## 实现（本分支 codex/session-attributes-capture）

### 1) 捕获（`src/lib/tracking.ts` 与 `public/lead-capture.js`）

- 依据官方脚本（https://support.google.com/google-ads/answer/16194756）：URL 含 `gad_*` 或 `gclid`/`gbraid` 时，
  收集全部 `gad_*` 参数 + `session_start_time_usec` + `landing_page_url` + `landing_page_referrer` + `landing_page_user_agent`，
  base64url 编码后写入 sessionStorage 与 90 天 localStorage（key `teyes_session_attributes_v1`）。
- 在 `persistAdParams()` 入口与静态客户端初始化处调用；读取时 session 优先、durable 兜底。
- `getStoredSessionAttributeComponents()` 解码并产出四个组件：`gad_source` / `gad_campaignid` / `session_start_time_usec` / `landing_user_agent`。

### 2) 提交（`src/lib/leadCapture.ts` 与 `public/lead-capture.js`）

- `payload.attribution` 增加四个组件字段；无值时为空字符串；网页端仅做长度截断，不阻断提交。

### 3) 入库（`netlify/functions/create-zoho-lead.ts`）

- 校验：gad 数值为数字串、UA 为可打印 ASCII ≤255；非法值忽略（不拒绝整单）。
- `toZohoLead` 将四行追加进 Description 的 Attribution 段：

```
GAD Source: …
GAD Campaign ID: …
Session Start Time Usec: …
Landing User Agent: …
```

### 4) 回传（`zoho-qualified-upload`，工作区）

- 新增 `--zoho-export` 模式：直读 Zoho 原始线索（`id`/`Last_Name`/`Email`/`Modified_Time`/`Description`），
  自动解析 Description 中的会话属性并走 `experimentalFields` 路径（已通过 validateOnly，requestId `v-7cc587fe-…`）。

### 5) 测试

- 14 个测试文件、**180 项全部通过**；lint 0 error（7 个既有 warning）。
- 覆盖：捕获写入与过期、组件解码、静态客户端 URL 捕获、Netlify 映射与非法值忽略、Description 行顺序。

## 发布与验收

1. 推送 `codex/session-attributes-capture` → Deploy Preview → 访问 `/?gad_source=1&gad_campaignid=23457354672&gclid=E2E-PREVIEW`
   提交测试表单 → 校验 Zoho 线索 Description 含四行 → 删除测试线索。
2. 生产发布后复测一轮（`www` + gbraid + gad_*）。
3. 用 `--zoho-export` + `--execute` 对一条真实合格线索完成回传验证。

## 风险与边界

- 捕获时机沿用 `persistAdParams()`（已证实可捕获当前参数）；所有失败 fail-open，不影响表单/EmailJS。
- 未新增 Zoho 字段（额度已满）；若后续释放额度或升级版本，可平滑迁移到 `Session_Attributes` 单字段（工具已支持该路径）。
- 隐私：会话属性仅含广告参数、时间戳、落地 URL/UA；与 ECL 邮箱上传一并在隐私说明中披露。
