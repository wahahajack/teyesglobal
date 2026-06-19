# TEYES Global 网站 SEO / GEO / 转化优化分阶段计划

> 目标：在不破坏已收录页面、不影响正在投放的 Google Ads 落地页、不直接改 main、不自动发布的前提下，把 teyesglobal.com 从“B2B 展示型官网”升级为“全球分销商选品、试单、OEM/ODM 咨询、售后支持资料的获客系统”。

---

## 0. 当前约束与硬性规则

### 0.1 GitHub 工作规则

- 仓库：`wahahajack/teyesglobal`
- 默认分支：`main`
- 当前计划分支：`plan/seo-geo-conversion-roadmap`
- 所有正式改动必须新建功能分支，例如：
  - `feature/phase-1-safe-seo-conversion-fixes`
  - `feature/phase-2-distributor-conversion-upgrade`
  - `feature/phase-3-resources-knowledge-base`
  - `feature/phase-4-cases-compliance-proof`
- 不允许直接 commit 到 `main`。
- 不允许直接 merge。
- 不允许自动发布。
- 每个阶段必须走 Pull Request / Review / 人工确认 / 人工发布。
- 如果 Lovable、Netlify 或其他平台有自动发布逻辑，必须先确认预览分支和生产分支的关系，避免分支提交直接影响线上。

### 0.2 已收录或有流量页面保护规则

用户提供截图显示以下页面已经有收录或流量，必须优先保护：

| URL | 页面类型 | 处理原则 |
|---|---|---|
| `/` | 首页 | 可以优化文案和模块，但不能大幅改变主题定位，不能删除现有内容 |
| `/oem-odm/cases` | 案例页 | 不改 URL，不删现有案例，只做扩展、证据化、结构化 |
| `/accessories` | 配件页 | 不改 URL，不删内容，后期可补充内部链接和 SEO 模块 |
| `/solutions/distributors` | 分销商页 | 重点优化，但必须保留原有内容并增强转化 |
| `/solutions/market-needs` | 市场需求页 | 重点优化，升级为市场选品指南 |

保护原则：

- URL 不变。
- canonical 不变。
- 页面主题不变。
- 不删除原有文字，只能重排、扩展、补充。
- H1 尽量稳定；如果要改，先评估当前关键词和 GSC 表现。
- Title / Description 可以优化，但不能完全换成另一个意图。
- 内链结构只能增强，不得切断原有入口。
- Sitemap 中保留这些页面。

### 0.3 Google Ads 落地页保护规则

当前代码里已有 3 个落地页路由：

| 路径 | 页面 |
|---|---|
| `/landing/oem` | OEM 落地页 |
| `/landing/market-entry` | 市场进入落地页 |
| `/landing/distributor` | 分销商广告落地页 |

处理原则：

- Phase 1–3 不动这三个落地页的页面结构、CTA、表单、埋点、跳转。
- 不改路径。
- 不改表单字段。
- 不改广告承接文案。
- 不改 thank-you 页面和转化事件。
- 若后期要优化，必须单独建 `feature/ads-landing-test-*` 分支，先复制出 A/B 测试版本，不直接覆盖原页。

### 0.4 现有内容处理规则

- 现有内容不得删除。
- 可以移动到更合适的位置。
- 可以补充解释、表格、FAQ、案例细节。
- 如果内容缺失，先做“内容待补充表”，不要瞎编。
- 能从澳洲站获取的技术资料、FAQ、产品对比、安装支持内容，可以重构、改写为全球 B2B 版本，但不能原样搬运成零售语气。

---

## 1. 核心战略判断

### 1.1 目前网站的问题

当前 teyesglobal.com 已经有 B2B 方向，包括：

- 首页：`Built for Global Markets`
- 产品矩阵：CC4 Pro / CC3 2K / X1 Pro 等
- Solutions：Distributors / Auto Brands / System Integrators / Market Needs
- OEM/ODM：Capabilities / Certifications / Project Cases
- Contact / WhatsApp 入口

但目前还偏“B2B 官网框架”，还没有形成真正的获客系统。主要短板：

1. 首页转化钩子不够强。
2. 分销商页面还像普通介绍页，不像高转化销售页。
3. Market Needs 页面方向好，但还没做成市场选品工具。
4. Compare Models 有参数，但缺少商业选型结论。
5. 认证和案例页面缺少可验证证据。
6. 缺少 Resources / Knowledge Base。
7. 缺少 Fitment、CANBUS、Installation、Firmware、Troubleshooting 等资料层。
8. GEO 需要的结构化内容、FAQ、表格、定义、选型结论不够。
9. 现有页面里部分数字动画在抓取文本中可能显示为 `0+ / 0M+ / 0.0% / 0%`，这会影响搜索引擎和 AI 抓取理解。

### 1.2 应该学习 3ERP 什么

3ERP 的核心不是页面好看，而是内容矩阵完整：

- 服务页承接商业词。
- 行业页承接场景词。
- 材料/工艺/质量页面承接工程师问题。
- 案例页建立信任。
- Blog 承接长尾搜索。
- 所有页面最终导向报价。

TEYES 应该对应改成：

- 产品页承接产品词。
- 分销商页承接 wholesale / distributor / dealer 词。
- 市场页承接区域和市场进入词。
- 技术资料页承接 CANBUS / fitment / installation / firmware / 360 camera / DSP 等问题。
- 案例页承接信任。
- 所有页面最终导向 wholesale pricing / trial order / OEM project。

### 1.3 应该学习 Protolabs 什么

Protolabs 的核心是把网站做成“报价前决策工具”。

TEYES 不一定能做即时报价系统，但可以做低配版本：

> Market Fit & Product Mix Advisor

客户提交：国家、渠道、现有品牌、月销量、目标价格段、是否做高端、是否需要 360、是否做 OEM。

网站返回或业务员跟进：

- 推荐型号组合。
- 首单建议。
- 高中低价格带策略。
- 主要适配风险。
- 所需支持材料。
- WhatsApp / Email 跟进。

TEYES 网站应从“看产品”升级为“帮分销商判断怎么卖”。

---

## 2. 总体优化目标

### 2.1 转化目标

优先转化目标：

1. 分销商询盘。
2. 批发价格申请。
3. 首单试单咨询。
4. OEM/ODM 项目咨询。
5. 市场进入方案咨询。
6. WhatsApp 有效对话。

主 CTA 建议统一为：

- `Get Wholesale Pricing & Trial Plan`
- `Get Product Mix Recommendation`
- `Apply for Distributor Program`
- `Start an OEM/ODM Project`
- `Discuss Your Market`

### 2.2 SEO 目标

优先关键词方向：

| 关键词类型 | 示例 | 对应页面 |
|---|---|---|
| 批发商业词 | android head unit wholesale, car stereo distributor, car infotainment supplier | `/solutions/distributors` |
| 产品高端词 | premium Android head unit, 2K Android car stereo, Android head unit with DSP | 产品页 / 对比页 |
| 选型对比词 | CC4 Pro vs CC3 2K, Android head unit model comparison | `/products/compare` |
| 技术问题词 | CANBUS Android head unit guide, firmware update, 360 camera calibration | Resources |
| 市场进入词 | Android head unit distributor Europe, car infotainment supplier Middle East | Market Needs / Market Guides |
| OEM/ODM 词 | white label Android head unit, custom car infotainment OEM | OEM/ODM 页面 |

### 2.3 GEO 目标

AI 搜索更容易引用：

- 清晰定义。
- 对比表。
- FAQ。
- How-to 步骤。
- 选型结论。
- 案例结构。
- 证据化认证。
- 资料中心。

因此每个重点页面都要补：

- TL;DR Summary。
- Comparison Table。
- FAQ。
- Breadcrumb。
- Schema。
- 具体适用场景。
- 明确 CTA。

---

## 3. 分阶段实施计划

## Phase 0：安全基线与数据保护

周期：1–2 天  
目标：先保护，不急着改。

### 任务 0.1：建立保护清单

建立文件：`docs/protected-pages-and-ad-landing-pages.md`

内容包括：

| 类型 | URL | 状态 | 是否可改 | 备注 |
|---|---|---|---|---|
| 已收录/有流量 | `/` | 保护 | 可小改 | 保持主题和 URL |
| 已收录/有流量 | `/oem-odm/cases` | 保护 | 可扩展 | 不删案例 |
| 已收录/有流量 | `/accessories` | 保护 | 可扩展 | 保留原内容 |
| 已收录/有流量 | `/solutions/distributors` | 保护 | 可增强 | 重点转化页 |
| 已收录/有流量 | `/solutions/market-needs` | 保护 | 可增强 | 做成选型指南 |
| 广告落地页 | `/landing/oem` | 冻结 | Phase 1–3 不动 | 广告正在跑 |
| 广告落地页 | `/landing/market-entry` | 冻结 | Phase 1–3 不动 | 广告正在跑 |
| 广告落地页 | `/landing/distributor` | 冻结 | Phase 1–3 不动 | 广告正在跑 |

### 任务 0.2：导出基础数据

发布任何改动前，先导出：

- GSC 页面流量。
- GSC 查询词。
- GA4 页面访问。
- Google Ads 落地页转化。
- 当前 sitemap。
- 当前 robots。
- 当前 title / description。
- 当前页面截图。

### 任务 0.3：确认构建和发布链路

当前项目为 Vite + React + TypeScript，`package.json` 中 build 会先后执行 sitemap 生成、Vite build、CSS inline、部署资产清理。

需要确认：

- 哪个分支会触发生产发布。
- Lovable 是否会自动同步 main。
- GitHub PR 是否触发 preview。
- 是否有 Netlify / Vercel / Lovable 预览链接。

### Phase 0 验收标准

- 已有保护清单。
- 已备份当前流量和转化数据。
- 确认广告落地页不受影响。
- 确认所有改动只在 feature branch。

---

## Phase 1：低风险 SEO / GEO / 转化快速修复

周期：3–5 天  
目标：不动广告落地页，不改 URL，先修影响信任和转化的明显问题。

### 任务 1.1：首页数字抓取问题

当前首页抓取文本中出现：

- `0+ Countries Sold`
- `0M+ Million Users`
- `0.0% Defect Rate`
- `0% Margin Protection`

风险：

- 搜索引擎和 AI 可能抓到 0。
- 客户看到会觉得页面未完成。
- `0.0% Defect Rate` 过度承诺，不建议使用。

处理：

- 数字不要完全依赖 JS 动画。
- HTML 初始文本直接写真实、保守、可承受的表达。
- 如果没有可证明的缺陷率，不写具体 defect rate。

建议替换：

| 当前 | 建议 |
|---|---|
| 0+ Countries Sold | 100+ Markets Reached |
| 0M+ Million Users | Global User Base |
| 0.0% Defect Rate | QC Before Shipment |
| 0% Margin Protection | Channel-friendly Pricing |

### 任务 1.2：首页首屏 CTA 优化

当前 CTA：

- Explore Products
- Contact Us

建议改为：

- Get Wholesale Pricing & Trial Plan
- Compare Models for Your Market

保留 `Explore Products` 入口，但降为次级入口。

### 任务 1.3：Meta 信息优化

优先优化这些页面：

- `/`
- `/solutions/distributors`
- `/solutions/market-needs`
- `/products/compare`
- `/oem-odm/cases`
- `/accessories`

要求：

- Title 包含商业意图。
- Description 清晰说明适合谁、解决什么问题。
- Canonical 不变。
- 加 Breadcrumb schema。
- 重点页面加 FAQ schema。

### 任务 1.4：内部链接增强

首页增加清晰入口：

- Distributor Program
- Product Comparison
- Market Needs
- OEM/ODM Capabilities
- Project Cases
- Accessories

`/solutions/distributors` 增加链接到：

- `/products/compare`
- `/solutions/market-needs`
- `/oem-odm/cases`
- `/contact`

`/solutions/market-needs` 增加链接到：

- `/products/compare`
- `/solutions/distributors`
- `/products`
- `/contact`

### 任务 1.5：表单与 CTA 文案统一

不要所有地方都叫 Contact。

建议按客户意图分：

| 场景 | CTA |
|---|---|
| 分销商 | Apply for Wholesale Pricing |
| 试单 | Get Trial Order Plan |
| 市场选品 | Get Product Mix Recommendation |
| OEM/ODM | Start OEM Project |
| 技术客户 | Talk to Technical Support |

### Phase 1 验收标准

- 保护页面 URL 不变。
- 三个广告落地页未修改。
- build 通过。
- sitemap 正常生成。
- 核心页面 title / description / H1 / canonical 检查通过。
- 首页抓取不再出现误导性 `0+ / 0M+ / 0.0%`。

---

## Phase 2：重点转化页升级

周期：1–2 周  
目标：把最有商业价值的页面做成真正的销售页。

## 2.1 `/solutions/distributors` 页面升级

### 新定位

从普通介绍页升级为：

> Distributor Program for Premium Android Head Units

页面核心主张：

> Sell higher, reduce return pressure, and test TEYES in your market without heavy inventory.

### 建议页面结构

1. Hero：明确适合 distributors / installers / retail chains / online sellers。
2. 三个核心利益：
   - Higher Retail Positioning
   - Mixed-model Trial Order
   - Dealer Support Package
3. Who It Is For：分销商、安装店、连锁门店、线上卖家。
4. Product Ladder：旗舰 / 主销 / 入门。
5. Trial Order Strategy：如何首单测试。
6. Dealer Support：图片、视频、参数、安装资料、FAQ、故障排查。
7. Partnership Levels：保留原来的 Authorized / Preferred / Strategic，但重写得更具体。
8. FAQ：MOQ、混批、质保、售后、市场保护、营销素材。
9. CTA：Apply for Wholesale Pricing / Get Product Mix Recommendation。

### 需要用户补充的内容表

| 字段 | 需要用户确认 |
|---|---|
| 首单 MOQ | 是否写 10 台 / 15 台 / 其他 |
| 是否允许混型 | 是 / 否 / 条件 |
| 质保周期 | 12 个月 / 24 个月 / 按市场 |
| 是否市场保护 | 哪些条件下支持 |
| 是否提供素材包 | 图片 / 视频 / listing / 目录 / 展示图 |
| 是否提供培训资料 | PDF / 视频 / 安装指导 |
| 售后边界 | 退换货 / 备件 / 固件 / 远程支持 |

---

## 2.2 `/solutions/market-needs` 页面升级

### 新定位

从市场类型介绍页升级为：

> Android Head Unit Product Mix Guide by Market Type

### 页面结构

1. Hero：Different markets need different product ladders.
2. Market Type Selector：
   - Price-sensitive markets
   - Premium upgrade markets
   - Emerging markets
   - Mature markets
   - Installer-driven markets
   - Online marketplace markets
3. 每个市场类型包括：
   - Market pain point
   - Recommended models
   - First-order mix
   - Main sales message
   - Risk notes
   - Required support assets
4. Product Mix Table。
5. CTA：Get Market Entry Recommendation。

### 建议表格

| Market Type | Recommended Models | Why | Main Risk | Support Needed |
|---|---|---|---|---|
| Premium installers | CC4 Pro / CC3 2K | 高性能、音频、360、2K | 安装复杂度 | 安装视频、CANBUS 指南 |
| Price-sensitive markets | X1 Pro / CC4L | 入门价格低 | 价格战 | 清晰卖点和售后边界 |
| Emerging markets | CC3 2K / CC4 / X1 Pro | 覆盖多价格段 | 库存判断 | 混批首单 |
| Mature markets | CC4 Pro / CC3 2K | 客户愿意为体验买单 | 竞品对比 | 对比资料、展示视频 |

---

## 2.3 `/products/compare` 页面升级

当前规格表有价值，但需要增加商业决策层。

新增模块：

1. Which model should you choose?
2. Recommended by market type。
3. Recommended by channel type。
4. Recommended starter mix。
5. FAQ：CC4 Pro vs CC3 2K / CC4 vs CC4L / X1 Pro 适合谁。

### 需要补充表

| 车型 / 产品 | 目标市场 | 建议渠道 | 核心卖点 | 风险点 | 推荐配件 |
|---|---|---|---|---|---|
| CC4 Pro | 高端安装店 / 高端零售 | 线下展示、视频种草 | 6nm、2K、DTS、360 | 价格高、安装要求高 | 360、摄像头、OBD |
| CC3 2K | 主流中高端 | 分销、安装店 | 性价比、2K、稳定 | 需要讲清楚与 CC4 Pro 区别 | 摄像头、DVR |
| X1 Pro | 入门市场 | 批发、线上 | CarPlay / Android Auto 入门 | 容易价格战 | 基础摄像头 |

---

## 2.4 `/accessories` 页面保护性增强

不改变原有内容，补充：

- Accessory Categories。
- Recommended Bundles for Distributors。
- Which accessories should be included in a trial order?
- Accessories for 360 Camera / DVR / TPMS / OBD / Reverse Camera。
- Internal links to Compare / Distributor / Contact。

---

## Phase 3：Resources / Knowledge Base 建设

周期：2–4 周  
目标：补齐 3ERP / Protolabs 式内容矩阵，提升 SEO / GEO / 转化质量。

### 3.1 新增一级栏目：Resources

建议路由：

- `/resources`
- `/resources/buyer-guides`
- `/resources/fitment-guides`
- `/resources/technical-guides`
- `/resources/troubleshooting`
- `/resources/dealer-assets`
- `/resources/faq`

### 3.2 第一批 12 个核心页面

优先做少而深，不要一下子铺很多浅文章。

| 优先级 | 页面 | 搜索意图 | 转化目标 |
|---|---|---|---|
| P1 | Android Head Unit Wholesale Buying Guide | 批发采购 | 分销商询盘 |
| P1 | How to Choose TEYES Models for Your Market | 市场选型 | Product Mix 表单 |
| P1 | CC4 Pro vs CC3 2K vs X1 Pro | 产品对比 | 产品咨询 |
| P1 | CANBUS Compatibility Guide | 技术疑虑 | 降低售后焦虑 |
| P1 | Vehicle Fitment Guide | 适配疑虑 | 高质量询盘 |
| P1 | Distributor Trial Order Guide | 首单决策 | 试单询盘 |
| P2 | 360 Camera System Guide | 功能决策 | 高端型号转化 |
| P2 | DSP Audio Guide | 音频卖点 | 高端型号转化 |
| P2 | Firmware Update Guide | 售后支持 | 建信任 |
| P2 | Common Installation Problems | 售后问题 | 减少退货压力 |
| P2 | Premium Android Head Unit Positioning Guide | 销售话术 | 分销商转化 |
| P2 | TEYES Dealer FAQ | 异议处理 | 表单转化 |

### 3.3 从澳洲站可借鉴的资料方向

澳洲站已有丰富资源入口，包括：

- Videos
- FAQs
- Tech Portal
- Blogs
- Reviews
- Forum
- Brochures
- Comparison Specification Chart
- CC4 Pro vs CC3 2K
- CC4L vs CC4 vs CC4 Pro
- 车型分类：Toyota / Nissan / Subaru / Mitsubishi / Honda / Lexus / Volkswagen / Mercedes / BMW / Audi / Ford / Jeep / Hyundai / Kia 等

重构原则：

- 不照搬零售语气。
- 转成 B2B 分销商 / 安装店 / 代理商语气。
- 不把澳洲本地政策、价格、配送承诺直接搬到全球站。
- 可复用技术结构：FAQ、对比、安装、CANBUS、车型分类、故障排查。
- 所有来自澳洲站的信息都要二次确认是否适用于全球。

### 3.4 Resources 内容模板

每篇资源页统一结构：

1. Summary。
2. Who this guide is for。
3. Problem / Decision Context。
4. Main explanation。
5. Comparison table。
6. Common mistakes。
7. Recommended TEYES models / accessories。
8. FAQ。
9. CTA。
10. Internal links。

---

## Phase 4：案例、认证、证据层升级

周期：1–2 周  
目标：把“看起来像模板”的信任内容改成可用于销售的证据内容。

## 4.1 `/oem-odm/cases` 案例页升级

不删原有案例，只扩展。

每个案例改成：

| 模块 | 内容 |
|---|---|
| Client Type | Distributor / Auto Brand / Retail Chain / Fleet Company |
| Region | Europe / Middle East / North America 等 |
| Product Platform | CC4 Pro / CC3 2K / X1 Pro / White-label platform |
| Project Goal | 上市、扩品、降退货、品牌化 |
| Requirements | 语言、UI、包装、CANBUS、认证、售后 |
| TEYES Solution | 产品组合、定制范围、资料支持、QC |
| Challenge | 适配、安装、固件、市场定价、库存 |
| Result | 销量、SKU、复购、门店数、时间 |
| Proof Assets | 图片、截图、匿名项目资料、客户反馈 |
| CTA | Discuss a similar project |

### 需要用户补充表

| Case | 客户类型 | 地区 | 产品 | 定制内容 | 结果数据 | 可公开证据 | 是否匿名 |
|---|---|---|---|---|---|---|---|
| European Brand |  |  |  |  |  |  |  |
| Middle East Distributor |  |  |  |  |  |  |  |
| Fleet Project |  |  |  |  |  |  |  |
| North America Retail Chain |  |  |  |  |  |  |  |

## 4.2 Certifications 页面升级

认证页要从“列证书名”升级为“市场准入与合规支持”。

建议表格：

| Certification | Market | Applies To | Certificate Holder | Validity | Document Available |
|---|---|---|---|---|---|
| ISO 9001 | Global | Quality management | 待补充 | 待补充 | On request |
| IATF 16949 | Automotive | Manufacturing system | 待补充 | 待补充 | On request |
| CE / RED / RoHS | EU | Product compliance | 待补充 | 待补充 | Model-specific |
| FCC | US | Wireless / EMC | 待补充 | 待补充 | Model-specific |
| EAC | CIS | Regional compliance | 待补充 | 待补充 | On request |
| NBTC | Thailand | Telecom | 待补充 | 待补充 | On request |
| BIS / WPC | India | Market entry | 待补充 | 待补充 | On request |

注意：IATF 16949 必须非常谨慎。必须确认主体、证书编号、范围、有效期。

---

## Phase 5：Market Fit & Product Mix Advisor

周期：2–4 周  
目标：做 TEYES 版 Protolabs 决策工具，不一定自动报价，但要让客户进入高质量线索流程。

### 5.1 表单字段建议

| 字段 | 类型 | 目的 |
|---|---|---|
| Country / Region | 必填 | 判断市场 |
| Company Name | 必填 | 背调 |
| Website / Store Link | 必填 | 判断真实度 |
| Business Type | 单选 | Distributor / Installer / Retail Chain / Online Seller / Auto Brand |
| Current Brands Sold | 文本 | 判断渠道和价位 |
| Monthly Unit Sales | 区间 | 判断规模 |
| Target Price Band | 多选 | Entry / Mid / Premium |
| Interested Models | 多选 | CC4 Pro / CC3 2K / CC4 / X1 Pro / Mixed Trial |
| Need OEM/White-label | 是/否 | 分流 OEM |
| Need Territory Discussion | 是/否 | 分流战略客户 |
| WhatsApp | 必填 | 快速跟进 |
| Email | 必填 | 邮件跟进 |

### 5.2 提交后处理

- Thank-you 页面提示 24–48 小时内回复。
- GA4 / Ads / GTM 事件分开：`wholesale_apply_submit`、`product_mix_submit`、`oem_project_submit`。
- 自动邮件给客户：收到需求 + 需要准备哪些资料。
- 自动通知业务员：带上客户类型和推荐跟进方向。

### 5.3 不影响广告落地页

这个工具先放在常规页面，不接管现有三个广告落地页。等数据稳定后，再考虑把广告页引导到工具。

---

## Phase 6：技术与结构化 SEO 优化

周期：持续执行

### 6.1 Sitemap

当前 sitemap 脚本会读取静态页面和产品数据生成 URL。新增 Resources 后必须同步更新 sitemap。

要求：

- 新增资源页进入 sitemap。
- `/thank-you` 继续不进 sitemap。
- 广告落地页是否进 sitemap 暂时不改，避免影响当前广告和收录状态；后续单独评估。

### 6.2 Schema

当前已有 SEO 组件支持：

- Product JSON-LD
- BreadcrumbList JSON-LD
- FAQPage JSON-LD
- HowTo JSON-LD
- Raw JSON-LD

后续页面应系统使用：

| 页面类型 | Schema |
|---|---|
| 产品页 | Product + Breadcrumb |
| 对比页 | FAQ + Breadcrumb |
| 指南页 | Article + FAQ + Breadcrumb |
| 故障排查 | HowTo + FAQ + Breadcrumb |
| 案例页 | Article / Organization + Breadcrumb |
| 分销商页 | FAQ + Breadcrumb |

### 6.3 页面性能

当前路由已 lazy load 非关键页面。继续保持。

优化方向：

- 图片压缩为 WebP / AVIF。
- 首屏图片设定明确尺寸。
- 关键 CTA 不依赖 JS 后加载。
- 数字和核心卖点服务端/静态可读。
- 移动端首屏减少动画干扰。

---

## 4. 建议开发顺序

### 第一批 PR：安全修复

分支：`feature/phase-1-safe-seo-conversion-fixes`

范围：

- 首页数字抓取修复。
- 首页 CTA 文案优化。
- 重点页面 meta 优化。
- 内链增强。
- 不动广告落地页。

### 第二批 PR：分销商页升级

分支：`feature/phase-2-distributor-page-upgrade`

范围：

- `/solutions/distributors` 页面重构。
- 保留原有内容。
- 增加试单、混批、支持包、FAQ。
- 增强 CTA。

### 第三批 PR：市场需求和对比页升级

分支：`feature/phase-2-market-needs-compare-upgrade`

范围：

- `/solutions/market-needs` 做成市场选型指南。
- `/products/compare` 增加商业选型结论。

### 第四批 PR：Resources 框架

分支：`feature/phase-3-resources-framework`

范围：

- 新增 Resources 路由和导航。
- 新增 3–5 个核心页面。
- 更新 sitemap。
- 不一次性上线 20 篇空页面。

### 第五批 PR：案例和认证证据层

分支：`feature/phase-4-proof-layer-upgrade`

范围：

- `/oem-odm/cases` 案例证据化。
- certifications 页面表格化。
- 新增证据待补充表。

### 第六批 PR：Product Mix Advisor

分支：`feature/phase-5-product-mix-advisor`

范围：

- 新增表单工具。
- 新增事件。
- 新增 thank-you 分流。
- 与广告落地页隔离。

---

## 5. 发布前检查清单

每次 PR 合并前必须检查：

- [ ] 没有直接改 main。
- [ ] 没有改 `/landing/oem`。
- [ ] 没有改 `/landing/market-entry`。
- [ ] 没有改 `/landing/distributor`。
- [ ] 已收录页面 URL 不变。
- [ ] canonical 正确。
- [ ] title / description 无重复或严重跑题。
- [ ] H1 只有一个。
- [ ] 现有内容没有删除。
- [ ] sitemap 正常生成。
- [ ] npm build 通过。
- [ ] 表单可提交。
- [ ] WhatsApp 链接正常。
- [ ] GTM / GA4 / Ads 转化事件不受影响。
- [ ] 移动端首屏正常。
- [ ] 主要页面 Lighthouse 无明显灾难性问题。

---

## 6. 内容待补充总表

| 模块 | 需要补充内容 | 优先级 |
|---|---|---|
| Distributor | MOQ、混批、质保、市场保护、素材包 | P0 |
| Product Compare | 各型号目标市场、销售话术、推荐配件 | P0 |
| Market Needs | 目标国家/区域、价格带、推荐组合 | P1 |
| Certifications | 证书编号、主体、有效期、适用型号 | P1 |
| Cases | 客户类型、地区、产品、结果、证据 | P1 |
| CANBUS Guide | 常见车型、适配逻辑、问题排查 | P1 |
| Fitment Guide | 车型分类、安装框架、线束注意事项 | P1 |
| Firmware Guide | 固件更新流程、风险、售后边界 | P2 |
| Troubleshooting | 常见问题、排查步骤、售后资料 | P2 |
| Dealer Assets | 图片、视频、目录、listing 文案 | P2 |

---

## 7. 最终判断

teyesglobal.com 的方向是对的，但现在还没有把 B2B 客户的决策链条吃透。下一阶段不是简单加页面，而是要把网站做成：

> 分销商能判断产品怎么卖，品牌客户能判断 OEM 怎么做，安装店能判断售后怎么控，搜索引擎和 AI 能理解 TEYES 为什么是专业供应商。

核心顺序：

1. 先保流量和广告页。
2. 再修首页和 CTA。
3. 重点增强分销商页面。
4. 把 Market Needs 和 Compare 做成选型工具。
5. 建 Resources 资料库。
6. 做案例和认证证据层。
7. 最后做 Product Mix Advisor。

不要一上来大改全站。先低风险增强，再分阶段发布，每次只解决一个核心问题。