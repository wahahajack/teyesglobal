# teyesglobal 追踪修复 · Kimi Work 实施指令（v3.1，整份粘贴给 Kimi Work）

> v3.1 变更：2.0 新增「本地优先原则 + push 前文件清单闸口」，明确禁止 GitHub 网页/API 直接改代码。

> 这是一份自包含任务书。你没有参与前期审计，**不要自由发挥，严格按本文执行**。本文所有结论已在前期会话中核实到代码行级和 GTM 容器规则级。
> 任务分两大部分：**A. 代码修复（本地项目）** 和 **B. 广告后台配置（WebBridge 操作浏览器）**。A 完成并经用户确认 PR 后，才进入 B。

---

## 0. 已核实事实（不要重新怀疑，直接用）

- 仓库：`wahahajack/teyesglobal`，默认分支 `main`，Vite + React + TS，三个静态落地页在 `public/` 下
- GTM：`GTM-MSPH5TMK`（线上容器 v27）；GA4：`G-VBNCN089DG`；Google Ads：`AW-17816659109`
- 容器实测：Ads 转化只挂在 `form_submit_success` + 页面路径的三条规则上（批发 jdXl…、OEM f-2Y…、经销商 TA1D…）；`lead_submitted` 在容器中零引用（死事件）；全仓库无 Meta Pixel 加载代码
- `7bNDCJ3LougbEKXJ0q9C` 是 **WhatsApp 点击转化**（GTM wa.me 链接点击自动触发），不是表单 Lead 标签
- **主站 `/contact` 提交 `form_submit_success` 后，三条规则一条都不命中——主站当前没有任何 Ads 转化、没有 generate_lead。这是本次修复的最高优先级缺口**
- 主站代码（`src/lib/tracking.ts`、`src/main.tsx`、`src/pages/Contact.tsx`、根 `index.html`）经审计是**正确的，不需要改**

## 1. 铁律（违反任何一条即为任务失败）

1. **禁止重命名任何现有字段**：主站保持 `form_name: 'contact_page'`，经销商保持 `form_name: 'distributor_application'`，所有 `form_location` / `lead_type` 现值不变
2. **禁止新建公共/共享工具文件**——三个落地页各自就地修改
3. **禁止修改** `src/lib/tracking.ts`、`src/main.tsx`、`src/pages/Contact.tsx`、根 `index.html`
4. **禁止修改任何 EmailJS 配置**
5. **禁止把真实 Google Ads Conversion Label 写进网站代码**（Label 只存在于 GTM 后台）
6. **不做无关重构**：不改样式、文案、表单逻辑、GTM 加载策略，不加 session 级去重
7. 代码改动走分支 + Draft PR，**禁止直接推 main**
8. WebBridge 部分：**禁止点击 GTM 的「提交/发布/Submit」、禁止修改 Ads 出价与预算、禁止删除或暂停任何现有规则/转化操作**。所有后台改动只停留在草稿态，最终发布由用户人工执行
9. WebBridge 每完成一个子步骤**截图存档**，放入 `handover-evidence/` 文件夹（不入库，加进 .gitignore 或放仓库外）

---

## 2. Part A：代码修复（本地项目，共 4 个文件）

### 2.0 工作方式

**本地优先原则**：代码的产生和验证全部在本地完成；GitHub 只做三件事——存分支、开 Draft PR 评审、合并触发部署。**禁止用 GitHub 网页编辑器或 API 直接改代码**（跑不了测试和构建，等于裸改投放中的页面）。

1. 把 teyesglobal 本地文件夹挂为项目目录，`git status` 确认工作区干净，从 `main` 拉最新
2. 建分支：`fix/tracking-conversion-dedup`
3. 改完后依次跑通：`npm ci`、`npm run lint`、`npm test`、`npm run build`、`git diff --check`
4. 可本地起 `vite` 预览四个页面（批发 / OEM / 经销商 / 主站），确认表单交互无异常
5. **push 前闸口**：先输出「修改文件清单」给用户过目，**用户确认后才 push**——清单中若出现本文 2.1–2.5 之外的任何文件（如 `tracking.ts`、`Contact.tsx`、`shared/` 等），视为跑偏，停止并报告
6. 开 **Draft PR**，PR 描述附第 4 节验收等式

### 2.1 `public/android-car-stereo-wholesale/script.js`

**A. 删除整段直接 generate_lead 调用**：

```js
// 删除：
if (typeof window.gtag === 'function') {
  window.gtag('event', 'generate_lead', {
    form_name: 'wholesale_quote',
    form_location: 'wholesale_landing_page',
    lead_type: 'wholesale_inquiry'
  });
}
```

**B. 参数数组补 gbraid / wbraid**：

```js
// 改前
['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']
// 改后
['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid']
```

保留：`form_submit_success` 推送（字段原样）、600ms 跳转、EmailJS 逻辑。

### 2.2 `public/android-car-stereo-wholesale/thank-you.html`

删除底部整个 `<script>` 内联块（lead_submitted 死事件 + 假 `AW-XXXXXXX` + fbq）。

### 2.3 `public/android-car-stereo-oem-manufacturer/script.js`

⚠️ 此文件是**压缩单行代码**：先格式化 → 修改 → 保持格式化版本入库（更利于以后维护），不要重新压缩。

```js
// A. 成功处只保留一次 form_submit_success，删除其后两句：
window.gtag && (gtag("event","generate_lead",{...}), gtag("event","form_submission",{...}));
window.dataLayer && dataLayer.push({ event: "form_submit", value: 1, event_category: "conversion" });

// B. 提交尝试处删 gtag 直调，保留 dataLayer 推送：
// 删除：
window.gtag && gtag("event", "form_submit_attempt", {...});
// 保留：
window.dataLayer && dataLayer.push({ event: "form_submit_attempt", ... });

// C. form_start 的 dataLayer 推送保留不动
// D. 参数数组补 'gbraid', 'wbraid'（在压缩代码里搜 "fbclid" 定位）
```

### 2.4 `public/teyes-android-car-stereo-distributor/index.html`

**A. catalog 跳对感谢页**：

```js
// 改前
setTimeout(() => {
    window.location.href = `thank-you.html${query ? '?' + query : ''}`;
}, 600);

// 改后
const isCatalog = form.intent?.value === 'catalog';
const thankYouPage = isCatalog ? 'thank-you-catalog.html' : 'thank-you.html';
setTimeout(() => {
    window.location.href = `${thankYouPage}${query ? '?' + query : ''}`;
}, 600);
```

**B. 删除表单成功后的直接 generate_lead 整段。**

**C. 整个删除 `trackWhatsAppClick()` 函数**（内含假 `AW-XXXXXXXXX`、重复 whatsapp_click、旧版 `ga('send',...)`），**并删除按钮上的 `onclick="trackWhatsAppClick()"`**。删除后 wa.me 链接由 GTM Link Click 规则记录，转化数据不受影响。

**D. 参数数组补 `'gbraid', 'wbraid'`。**

**E. 两个感谢页（thank-you.html / thank-you-catalog.html）不改。**

### 2.5 测试

- `src/lib/tracking.test.ts` 保持全绿（tracking.ts 未改）
- 新增静态契约测试（排除 `.history/`、`*.bak`、`raw_html.html`、`script.js.bak`），断言正式文件**不含**：

```text
AW-XXXX
__AW_CONVERSION_SEND_TO
ga('send'
fbq('track'
gtag('event', 'generate_lead'
gtag('event', 'conversion'
lead_submitted
trackWhatsAppClick
```

- 同时断言：三个落地页参数数组均含 `gbraid` 和 `wbraid`；经销商文件含 `thank-you-catalog.html`

---

## 3. Part A 完成门槛

输出：① 修改文件清单 + 每文件 diff 摘要；② lint/test/build 结果；③ Draft PR 链接。
**停下来等用户确认 PR，用户确认后才进入 Part B。**

---

## 4. 验收等式（写进 PR 描述）

```text
四类表单：一次 EmailJS 成功 = 一个 form_submit_success = GA4 一个 generate_lead = Ads 一个转化（容器侧保证）
感谢页刷新：form_submit_success = 0；generate_lead = 0
数据中无 PII（姓名/邮箱明文/电话/留言）
```

---

## 5. Part B：广告后台配置（WebBridge 操作用户本地浏览器）

⚠️ 总则：界面语言以用户账号为准，中英关键词都给出。**所有改动只到草稿态，禁止点「提交/发布/Submit/Publish」**。每个子步骤完成后截图存 `handover-evidence/`。

### 5.1 Google Ads（只报告 + 新建一个转化，其他不碰）

1. 打开 ads.google.com → 目标（Goals）→ 转化（Conversions）→ 摘要（Summary），截图记录现有转化操作列表
2. **只报告不修改**：找到经销商转化（TA1D…对应的操作），记录它是「主要操作 Primary」还是「次要操作 Secondary」、计数方式是「一次/每一次」→ **写入报告后暂停，等用户决策 Catalog 是否剥离，不自动执行任何剥离动作**
3. 新建转化操作：
   - 新建转化（New conversion action）→ 网站（Website）→ 手动（Manual）
   - 类别（Category）：**提交潜在客户表单（Submit lead form）**
   - 名称：`主站联系表单提交`
   - 计数（Count）：**一次（One）**
   - 点击后转化时间范围：30 天
   - 保存后记录完整转化 ID 和 Label（`AW-17816659109/XXXX`），写入报告
4. **禁止**改动出价、预算、任何现有转化操作的设置

### 5.2 GTM（只建草稿，禁止发布）

0. 先做备份：管理（Admin）→ 导出容器（Export Container），保存导出文件到 `handover-evidence/`
1. 新建工作区（Workspace），命名：`主站转化-v28`
2. 新建触发器（Trigger）：
   - 类型：自定义事件（Custom Event），事件名：`form_submit_success`
   - 条件（Some Events，3 条 AND）：
     - Page Path 不包含（does not contain）`/android-car-stereo-wholesale/`
     - Page Path 不包含 `/android-car-stereo-oem-manufacturer/`
     - Page Path 不包含 `/teyes-android-car-stereo-distributor/`
   - 命名：`CE - form_submit_success - 主站`
3. 新建标签（Tag）：
   - 类型：Google Ads 转化（Google Ads Conversion）
   - 转化 ID：`17816659109`，转化 Label：5.1 第 3 步新建的 Label
   - 触发器：`CE - form_submit_success - 主站`
4. 找到现有 **GA4 事件标签 `generate_lead`**（事件名 generate_lead、Measurement ID G-VBNCN089DG），给它**加挂**触发器 `CE - form_submit_success - 主站`（现有 3 个触发器保留不动）
5. 新建触发器 `CE - contact_email_click`（自定义事件 contact_email_click）+ GA4 事件标签 `contact_email_click`（Measurement ID G-VBNCN089DG）
6. 增强转化：4 个表单 Ads 转化标签（TA1D / jdXl / f-2Y / 新建主站标签）逐一编辑 → 勾选 **增强转化（Enhanced Conversions）** → 方式选**自动收集（Automatic collection）**
7. **不要触碰**现有三条落地页路径规则、WhatsApp（wa.me）规则、电话（tel:）规则、GA4 配置标签
8. **不要点击「提交（Submit）」**。完成后截图 Workspace 状态，输出改动清单供用户人工发布

### 5.3 GA4（只查不改）

1. 管理（Admin）→ 数据流（Data Streams）→ 网站数据流 → 增强型衡量（Enhanced measurement）→ 页面浏览（Page views）
2. 截图记录「**基于浏览器历史记录的页面更改（Page changes based on browser history events）**」的开关状态，写入报告
3. **不修改任何设置**

---

## 6. Part B 完成门槛

输出一份报告，包含：
1. Ads 现有转化操作清单截图 + TA1D 的 Primary/Secondary 与计数方式（等用户决策 Catalog）
2. 新建主站转化操作的完整 ID + Label
3. GTM Workspace 草稿截图 + 逐项改动清单（未发布状态）
4. GA4 增强型衡量开关截图
5. 给用户的「人工发布检查单」：发布前需要在 GTM Preview 验证的 4 项（主站表单、批发表单、OEM 表单、经销商表单 + catalog 跳转）

**到此全部停止，发布和 Preview 验证由用户执行或另行指令。**

---

## 7. 范围外（不要做）

- SPA page_view 是否缺失：5.3 只负责取证，**不做任何修改**；后续处理等用户指令
- Meta Pixel：确认未安装，不加不删
- Catalog 从 Ads 转化剥离：等用户对 5.1 第 2 步报告的决策
- 任何 SEO、内容、样式、性能优化：均不在本次范围
