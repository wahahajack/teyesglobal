# TEYES About 与 News 文案、SEO、GEO 修改方案

日期：2026-09-09。状态：已在隔离分支实施并完成本地构建验证；线上尚未发布。

## 1. 判断与范围

当前版本提供了基本完整的栏目结构，也有展会现场和产品照片。主要问题是：文字经常用内部营销概念代替客户能理解的信息，用参数堆叠代替产品说明，用宣传推断代替证据。About 太像为搜索摘要编写的公司资料集合；News 太像产品目录与展会照片说明的拼接。

本轮目标：让海外经销商、安装商和潜在合作伙伴读得懂、能核实、知道下一步做什么，同时让搜索系统准确识别公司、产品和新闻事件。

核查基线：GitHub main 提交 `da1cbbdea3d2369c63a4d8a625232655b94e3fe2`，提交信息为合并 PR #28。上一轮已确认本地 HEAD 与该提交的文件树无差异；本轮再次查询 main，提交未变。现有未提交修改 `src/test/tracking-loading.test.ts` 与本任务无关，保持不动。

本方案覆盖 About、News 列表、两篇新闻、共用新闻模板、相关导航、站点地图与预渲染验证。首页只列出公司事实与组织标记的一致性依赖，不借本轮重写首页、产品页、广告落地页或追踪系统。

线上页面在上一轮被工具安全审查拦截。本方案依据仓库，不代表线上视觉、HTTP 状态、收录、爬虫访问或 AI 引用已经验证。本轮代码改动在隔离分支完成，未发布线上。

## 2. 文案统一标准

1. 用国际读者容易理解的商务英语。正式、自然、具体，不刻意口语化，不改成消费者广告。
2. 每段表达一个主要意思。先说明产品或业务，再补必要细节。不能为了 SEO 凑词数或关键词密度。
3. About 首句明确 TEYES 的主营业务，随后可使用 we/our；新闻采用 TEYES/its 的第三人称报道口吻，CTA 可以直接对读者说话。
4. “head units”“amplifiers”“OEM/ODM”等必要术语保留。OEM/ODM 首次出现时用一句话说明实际服务范围；不为减少术语而改变技术含义。
5. 删除没有具体含义的修饰：complete ecosystem、system-level sound、market entry 等只有在上下文解释了实际内容时才使用。
6. 技术参数只说明参数能证明的事。碳纤维、钕磁铁、散热孔等不能单独证明低失真、音质更清晰或持续输出温度表现。
7. 照片说明回答“是什么、在哪里、为何值得看”。不把 alt 写成促销文案，不逐图重复完整活动名称、年份和展位号。
8. 问题式标题可以保留，但不把全页改成问答模板。禁止为了 AI 摘录而堆重复定义或固定长度的答案块。
9. 排版符号、标题大小写不是判断内容质量的依据。重点审查意义、准确性和阅读负担。
10. 以下英文示例是拟用文案。沿用的公司与产品信息仍需完成第 4 节核实；不把润色后的句子当成新增事实证据。

## 3. 逐项修改清单

### 3.1 About

源码依据：`src/pages/about/About.tsx`。

| 现有表述 | 问题 | 处理及英文替换方向 |
|---|---|---|
| 开头一段连续列出公司、成立年、五个车机型号、配件、新音响、市场、用户和合作模式 | 信息密度过高，像数据库摘要 | 首段只说业务与客户；型号移到产品区，规模移到事实表。拟用：TEYES develops Android car stereos, car audio products and accessories. We work with distributors, retailers and businesses seeking customized products. |
| complete product ladder | 内部产品规划术语，客户不容易理解 | Our range includes models for different budgets and installation needs. |
| not a relabeled generic board | 突兀的防御性表述，含不必要的隐性比较 | 删除。研发内容有依据后写：Our team develops software and vehicle integration features for TEYES head units. 不暗示芯片或 Android 系统完全自研。 |
| Custom thermal design, optimized ... engineered to work together | 优势密集，缺少具体边界 | 分为软件、适配、附件支持；只保留有资料的能力，并链接对应说明。 |
| TEYES reports a 0.4% defect rate across shipped units | “公司报告”不能代替统计口径；无法知道是出厂不良还是售后返修 | 有期间、分母、覆盖产品与定义才保留；资料未齐时撤下数字，不换成“行业领先品质”。 |
| regional languages, market-specific accessories, vehicle-fitment scenarios, and selling strategies | 四类不同层面的能力硬拼成一句 | 写明客户能询问什么：Contact our team to check language options, vehicle compatibility and accessory requirements for your market. |
| Renault/Dacia、Japan/Toyota、Lada 等市场例子 | 容易把适配车型误读成车厂合作或官方认可 | 只在适配材料中列经核实的车型和年份，不用品牌名单证明公司国际影响力。 |
| Essential smart features ... for price-sensitive markets | “price-sensitive”像内部客户分层，有距离感 | 标签改为 Essential features；说明可写：CarPlay and Android Auto in the entry-level range. 具体无线能力另核实。 |
| Every unit supports wireless Apple CarPlay and Android Auto | 对全部型号作绝对承诺；仓库部分型号仅写 Yes | 去掉全称断言。先用：Check each model’s specifications for CarPlay and Android Auto support. 核实后再准确说明无线/有线区别。 |
| from screens and software into complete in-car sound | 比喻反复出现，没告诉读者实际增加了什么 | In 2026, TEYES introduced speakers, amplifiers and subwoofers alongside its car stereo range. |
| distributors gain a higher-margin category | 没有成本、售价或渠道数据 | Distributors can add speakers, amplifiers and subwoofers alongside TEYES head units. |
| Where Is TEYES Active? | 标题含义宽泛，段落把地域、车型和参展混在一起 | 改为 International distribution；只写经核实的销售范围、支持方式，展会作为相关报道链接。 |
| TEYES is a B2B-first manufacturer | 内部定位直接变成客户文案 | We work with distributors, retailers and businesses developing customized car electronics. |
| auto brands / white-label / co-branded programs | 容易被理解为已与汽车主机厂合作 | 用可提供的定制服务解释，不把潜在客户类型写成既有客户背书。 |
| Get in Touch / Explore Partnership Models | 语义偏泛 | 主按钮 Discuss distribution；次按钮 Explore OEM/ODM services。与现有目的页内容一致。 |
| 表格 Product Lines 塞入所有系列和型号 | 表格失去速读作用 | 改为 Android head units; car audio; accessories。具体型号留在产品卡片。 |

### 3.2 新品发布文章

源码依据：`src/data/news.ts`，slug 为 `teyes-car-audio-series-launch`。

| 现有表述 | 问题 | 处理及英文替换方向 |
|---|---|---|
| 超长标题，末尾 for Complete In-Car Sound | 重复、抽象，新闻主体被稀释 | H1：TEYES launches speakers, amplifiers and subwoofers at Automechanika 2026 |
| Building on a decade-plus of infotainment engineering | 模板式“历史积淀”开场，不增加新闻事实 | 删除，首段直接交代发布产品、地点与日期。 |
| Across the series, the engineering brief is consistent | 产品开发会议语言，读者无需知道 engineering brief | 删除，直接区分 component / coaxial，并选择有代表性的型号。 |
| carbon-fiber cones for low-distortion mid-bass | 材料直接推导听感和失真 | 保留经确认的 cone material；没有测试就不写低失真结论。 |
| fast, clear mid-highs | 主观音质形容，且 mid-highs 表意含混 | 删除；如有频响或失真测试，解释测试对象和条件。 |
| quick-connect terminals that cut installation time | 暗含对比和效果结论 | 可保留 quick-connect terminals，具体适用型号由产品资料核实。 |
| specifications in line with tier-one international brands, at aftermarket-accessible pricing | 未命名比较对象，“aftermarket-accessible”也不是自然表达 | 整句删除。用参数表及具体型号链接替代。 |
| 一段内混入六个型号、材料、频响、灵敏度、功率与比价 | 像规格表拼接，难以扫描 | 正文介绍类别与选择差别；新闻仅保留少量代表参数，完整参数去产品页。 |
| Above them, the DSP-controlled TP series ... tuned, system-level sound | Above them 无明确参照，system-level sound 空泛 | The TP800/4 and TP1200/1 add DSP control. 配置与调音能力须按资料说明。 |
| straightforward to match with any speaker layout | any 夸大兼容范围 | 删除；配接应按通道数、阻抗与功率要求核实。 |
| From 77 mm ... to 16 mm X-MAX Drivers | 标题并列两个不同维度，普通读者难理解 | 改为 Subwoofer options；正文区分座椅下箱体和需搭配箱体的独立单元。 |
| vented motor structure keeps the coil cool at sustained output | 从外观推导持续散热表现 | 图注写：Rear view of the TEYES 10V8-V4 subwoofer driver. 测试结论单独取证。 |
| with one support channel | 售后安排未经核实，可能随渠道而异 | 删除，或在确认售后责任后写明适用地区与购买渠道。 |
| higher-margin accessory category | 未证实利润优势，且音响产品未必应全部叫 accessory | 改为 adds car audio products to the existing head unit range。 |
| debuted ... throughout Automechanika | debut 是首次亮相事件，throughout 是持续状态，两者搭配别扭 | 分成发布与展示两句；展期内写 will be on display until ...，结束后如实更新。 |
| TS 与 BX、10V8 同一段统一链接 enclosed-subwoofers | 箱体与独立单元混淆 | 分两个产品入口，10V8 指向 `/car-audio/speakers/#standalone-subwoofer-drivers`。 |

### 3.3 展会文章与列表

源码依据：`src/data/news.ts`、`src/pages/news/News.tsx`。

| 现有表述/结构 | 问题 | 处理 |
|---|---|---|
| 展会标题也把 launches new car audio series 当重点 | 两篇选题重叠，但不能据此断言已有关键词内耗 | 标题改为 TEYES at Automechanika Frankfurt 2026；展会篇侧重展位、展示内容、会面安排。 |
| 首段铺陈 4,400 展商、80 国家、300,000 平方米 | 抢走 TEYES 主体，统计值还需当届来源 | 删除这组数字；若确有必要，仅在末尾背景介绍中引用主办方。 |
| Head Units on Display: From Flagship to Entry | 分级对经销商有意义，但标题可更直接 | Head units on display；用少量文字解释展出系列，不机械重复参数。 |
| 每张图都“island”，重复完整会展信息 | 场景描述像素材整理笔记 | display / demo station；只在必要的图注出现活动地点。 |
| Headline News: ... / world debut | 编辑指令式标题与未核实的世界首发 | New car audio products；仅在有发布证据时写 introduced/launched，不泛用 world debut。 |
| rear ADAS camera、clear in-car voice control 等 | 由标签推导功能，具体支持条件不明 | 保留经确认的产品名称；ADAS 能力、数字接口与适配型号按文档核实。 |
| Why Automechanika Matters 长篇展会历史 | 与本次客户访问任务关联弱 | 压缩到一两句必要背景或删除。保留官方活动链接即可。 |
| Meet the TEYES Team 与 Visit Us 分散 | 会面信息和行动入口隔得太远 | 合并为 Visit TEYES；先展示日期、展位、地点，再给按钮。 |
| “Contact us through our contact page”只是句子 | 让读者自行找入口 | 直接提供 Arrange a meeting 按钮；沿用现有联系路径。 |
| News 栏目描述承诺 industry insights，但该类为空 | 页面承诺超过已有内容 | 暂时写 Product announcements and exhibition updates from TEYES. |
| Previous / Next | 相同发布日期时缺少阅读理由 | 在适当位置使用 Related news，并用明确文章标题导航；不强行制造时间先后。 |

## 4. 事实与证据清单

以下内容在网站中出现，不等于已经独立证实。本轮不认定其为假，也不凭润色替它背书。

| 待核实信息 | 最小依据 | 未拿到资料时如何处理 |
|---|---|---|
| 法定公司名称、品牌归属、2011 成立 | 经确认的企业登记/品牌介绍资料，并区分公司注册和品牌创立 | 不引入更强主张；有分歧的年份先不写入标题与 schema |
| 500+ 员工 | 截至日期、公司/集团范围 | 从可见数字与结构化数据同步撤下 |
| 5M+ users/drivers | 累计用户、装机或销售量的定义及时间 | 不能互相替代，暂不引用 |
| 100+ markets/countries | 覆盖清单或内部口径与时间 | 统一核实后的用词；资料不足时仅说 international distribution |
| 0.4% 不良率 | 周期、分母、产品范围、出厂/返修定义 | 删除数值，不改写为“极低不良率” |
| best-selling / global leader / world debut | 销售范围与周期、可用比较依据或正式发布记录 | 改为型号名或中性事件描述 |
| 全型号无线 CarPlay/Android Auto | 按型号、版本、连接方式的规格表 | 逐型号描述，不写 Every unit |
| 功率、阻抗、灵敏度、频响、X-MAX | 已批准规格书版本与测试条件 | 不把 Rated Power 擅自升级为 RMS；不把最大功率写成额定功率 |
| 音质、失真、散热、安装时间改善 | 对应试验或技术文档 | 保留构造事实，删除效果推断 |
| 工厂、自研范围、OEM/ODM 支持 | 实际流程资料、可公开的项目支持范围 | 不宣称全部自制或已有汽车主机厂合作 |
| 售后统一支持、高利润、供货地区、MOQ | 真实渠道政策、价格/服务条件 | 不作承诺；邀请询问当前条件 |
| 参展日期、展位、发布状态 | 主办方记录和 TEYES 经批准资料 | 上线前核实；不制造会谈成果、客户数量或成功案例 |
| 社交账号 sameAs | 账号实际归属、官网互链 | 不能仅因用户名包含 TEYES 就写成官方账号 |

证据工作直接放入现有审稿流程，无需建设新的内容管理系统。每条关键主张记录来源、版本/日期、核实人即可。对外只显示对读者有意义的来源与日期，内部审稿标记不进入页面。

## 5. About 页面方案

建议顺序：

1. H1：About TEYES。首屏用两三句介绍业务、所在地、客户，避免列完所有型号。
2. Company overview：精简事实表。公司名称、地点、主营产品、合作方式；年份和规模仅在核实后显示。
3. Our products：Android head units / Car audio / Accessories 三个入口。必要时保留车机型号，但直接链接真实详情页。
4. Development and quality：研发或测试实景照片配具体过程说明。没有资料时缩短该模块，不放图库制造工厂或团队证明。
5. Working with TEYES：经销合作与定制项目各一段，解释可讨论的具体事项。
6. Recent news：链接两篇现有新闻。展会在进行时可显示会面入口；结束后调整为报道入口。
7. 行动区：Discuss distribution；Explore OEM/ODM services。

拟用首段（公司资料核实后定稿）：

> TEYES develops Android car stereos, car audio products and accessories. Based in Shenzhen, China, we work with distributors, retailers and businesses seeking customized car electronics.

拟用合作段落：

> Interested in selling TEYES products? Tell us where you operate and which products you are considering. Our team can discuss distribution options with you.
>
> For customized products, contact us with your requirements for branding, software and vehicle compatibility.

以上示例不新增独家代理、利润、交期或免费支持承诺。成立时间核实后可以自然加一句，不必反复出现在标题、首段、每个资料模块中。

重要链接修正：当前四张卡片的 `/products/lines/#...` 会被解释为产品 ID `lines`，源码会呈现 Product Not Found。改为 CC4 Pro → `/products/cc4-pro/`，CC3 2K → `/products/cc3-2k/`，CC4 → `/products/cc4/`；X1 Pro 与 CC4L 拆成两个有效链接。这里只能确认代码行为，未将其称为线上 HTTP 404。

## 6. 两篇 News 页面方案

### 6.1 新品篇

阅读任务：了解 TEYES 发布了什么，哪些类别可选，在哪里查规格，如何询问供货。

顺序：标题 → 发布信息与导语 → 一张横向主图 → 三类产品概览 → 代表型号与必要参数 → 产品详情入口 → 合作咨询 → 相关展会报道。

拟用导语：

> TEYES introduced a new car audio range at Automechanika Frankfurt 2026. The lineup includes speakers, amplifiers and subwoofers, adding car audio products to the company’s existing head unit range.

三个产品小节分别解释：

- Speakers：区分分体套装和同轴扬声器。选 T3-652 / T6-652 等代表型号，说明差别，不在一段塞全部系列。
- Amplifiers：说明四通道与单声道应用；TD 与 TP 的 DSP 区别按资料保留。TD500/4 等参数清楚附上负载阻抗。
- Subwoofers：区分座椅下有箱体产品、其他箱体产品与独立单元。TS-08 的 77 mm 高度不能写成适合所有车辆座椅下空间。

建议小表的列为 Category / Example models / Main specification / Full details。每类 1–2 个代表参数即可，避免创建完整规格的第二份来源。产品规格本身仍由现有产品资料核实。

独立单元 10V8-V4 链接到 `/car-audio/speakers/#standalone-subwoofer-drivers`，TS/BX 链接到 `/car-audio/enclosed-subwoofers/`。不为修正文案另建重复分类或改动已存在 URL。

主 CTA 建议 Ask about the car audio range。只有确认存在可提供的目录时才改成 Request the car audio catalog；按钮不得承诺不存在的即时下载。

图片：删除首图与第一张正文图的重复；每类选能增加信息的照片，重复角度放到图库或移除。竖图不要占满文章首屏，主图优先合适的横图。照片里的型号标签按原样核实，不能靠照片猜内部结构或听感。

### 6.2 展会篇

阅读任务：知道 TEYES 在哪里、展出什么、如何联系或见面。

顺序：标题 → TEYES 参展导语 → 日期与展位信息 → 展位全景 → 车机/音响/附件展示 → 会面入口 → 相关新品文章。

展期内拟用导语（按当前 2026-09-09 时点；活动信息须核实）：

> TEYES is exhibiting at Automechanika Frankfurt from September 8 to 12, 2026. Visit Hall 3.1, Booth G85 to see its head units, car audio products and accessories.

会面入口拟用：

> To arrange a meeting, contact the TEYES team and include your preferred date and the products you would like to discuss.

展会结束后：把邀请语改为历史报道，按钮改为 Contact the TEYES team。不回写虚构的会谈数量、现场反馈或合作成果；首次发布日期保留，实质更新时记录修改日期。

About 的展会模块同步调整，避免永久保留 Meet TEYES at ...。这是内容维护规则，不在本次创建自动提醒。

## 7. SEO 与 GEO 的落地方式

### 7.1 页面分工

以下是页面意图设计，不是已验证的搜索量或关键词表现。

| 页面 | 主任务/搜索意图 | 拟用 title |
|---|---|---|
| About | TEYES 是谁、公司业务与合作方式 | About TEYES \| Car Stereos and Car Audio |
| News 首页 | TEYES 最新发布和展会消息 | TEYES News \| Product and Exhibition Updates |
| Company 分类 | 官方产品与公司公告 | TEYES Company News |
| Exhibitions 分类 | 参展与现场报道 | TEYES Exhibitions and Events |
| 新品篇 | 新音响系列发布、类别与型号入口 | TEYES Car Audio Launch at Automechanika 2026 |
| 展会篇 | 当届活动、展位和会面信息 | TEYES at Automechanika Frankfurt 2026 |

H1 可比 title 更具描述性，不要求完全一致。保留现有文章 URL 与自引用 canonical。两篇文章互链并各自 canonical，不因同一活动就合并 canonical。

拟用 meta description：

- About：Learn about TEYES, its car stereos, car audio products and accessories, and opportunities for distribution and customized products.
- News：Read TEYES product announcements and exhibition updates, including its car audio launch at Automechanika Frankfurt 2026.
- 新品篇：Explore the speakers, amplifiers and subwoofers introduced by TEYES at Automechanika Frankfurt 2026, with links to product specifications.
- 展会篇（展期内）：Visit TEYES at Automechanika Frankfurt 2026, September 8–12, Hall 3.1, Booth G85. See head units, car audio and accessories.

这些是编辑初稿；核实事实并预览展示后定稿。不给字数上限或关键词密度设为排名指标，不把 meta keywords 作为优化重点。

### 7.2 GEO 内容原则

Google 明确：AI Overviews / AI Mode 沿用 SEO 基础要求，没有专门的 AI schema 或额外文件门槛。方案聚焦清楚、可信、可抓取的正文，不追求“AI 专用文风”。[Google 官方说明](https://developers.google.com/search/docs/appearance/ai-features)

- 公司名称、品牌、产品型号、活动名称与日期保持一致，帮助读者及检索系统区分实体。
- 数字与结论要有来源和适用范围。正文、资料表、元数据、schema 同步。
- 每段在必要范围内说明主语与对象，但不重复 TEYES、Android head unit 等词来机械强化关键词。
- 原创展会照片、真实产品规格和可验证过程比泛泛的“行业洞察”更有内容价值。
- 作者可使用真实的 TEYES 组织署名，不编造工程师或专家履历。谁审核过就记录谁，不给未经审核的内容加工程师背书。
- 用真实渠道发布有用内容、链接官网资料；不把论坛刷提及、虚构评论或建百科词条列为本轮任务。
- 不设置“每段 134–167 词”“必须 FAQ”“必须 llms.txt”之类验收条件。也不承诺发布后一定被 AI 引用。

Google 的以人为本指南强调原创信息、清晰来源和读者价值。本次去掉营销空话、保留可验证细节，是内容判断，不是对“AI 写作”的来源鉴定。[Google 内容指南](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

### 7.3 结构化数据与元信息

1. 继续使用与文章性质匹配的 NewsArticle。Article/NewsArticle 不是保证进入 Google News 或 AI 引用的通行证。
2. 新闻模板传入文章专属分享图，确保 og:image / twitter:image 为完整 HTTPS URL。
3. NewsArticle.image 当前为相对路径，统一转绝对 URL；核对真实图像、尺寸与可访问性，不声称相对路径必然导致索引失败。
4. 增加独立 updatedAt 字段。没有实质更新可省略 dateModified，或保持与真实发布日期一致；实质更新后使用真实修改时间。需要时间时用可核实的带时区值，不编造原始发布时刻。
5. 页面显示真实署名、发布时间及必要的更新时间，保持与 schema 一致。Google 接受组织作为文章作者。[Article 标记指南](https://developers.google.com/search/docs/appearance/structured-data/article)
6. 首页与 About 的组织数据共用同一经核实事实来源与稳定 `@id`，例如 `https://teyesglobal.com/#organization`；组织 url 指向官网，About 页面有自己的页面 URL。是否增加 AboutPage 仅按实现需要，不把它当排名技巧。
7. 同步检查首页 global leader、人员数和覆盖市场，避免 About 更新后 schema 继续输出旧主张。
8. sameAs 仅指向已核实官方账号，不能收集所有同名经销商账号。
9. 不为了新闻涉及展会就加入不适用的 Event、Product 或 FAQ 标记；只有页面真实描述和官方字段要求支持时另行考虑。

### 7.4 可抓取性、空分类和验证脚本

- 仓库 robots.txt 的通配规则允许 `/about/`、`/news/`；这只能证明文件规则，不能证明线上 CDN、防火墙和搜索爬虫请求成功。
- 保留现有预渲染架构，检查构建出的 HTML 包含该页正文、标题和元信息。仅有 React 路由或浏览器渲染成功不够；也不能把所有 AI 爬虫一概说成不能执行 JavaScript。
- OpenAI 的 OAI-SearchBot 用于搜索，GPTBot 用于可能的训练抓取，两者独立。不得以提高搜索可见性为由顺带改变训练抓取政策。[OpenAI 爬虫说明](https://developers.openai.com/api/docs/bots)
- Industry Insights 暂时从导航、列表标签和页脚隐藏；保留 URL 可访问，显示简短说明并链接已有新闻，设为 `noindex, follow`，从 sitemap 移除。待有实质文章再恢复展示、收录及 sitemap。
- 当前 SEO 组件 noindex 会输出 `noindex, nofollow`。若采用以上临时策略，应增加受控选项，仅用于该类页面，并保留其他页面原有行为。
- 不以 robots.txt 禁止空分类抓取，否则搜索系统可能无法读取 noindex。
- 当前 `verify-seo-dist.mjs` 要求所有预渲染路由与 sitemap 完全一致。保留空分类预渲染但移出 sitemap 时，需明确区分“所有预渲染路由”和“可索引路由”；不能靠删掉检查或放宽全站要求解决。
- 当前正文检查统计整个 body，可能被导航、页脚文字满足。针对本轮页面增加 main/article 主体的特定文本与结构检查，避免“空正文也通过”。
- sitemap 的 lastmod 当前来自文件 mtime，新闻共用一个数据文件会导致无关文章一起变新。新闻应按文章真实日期输出，不用构建时间伪装更新；全站时间策略另列后续，不在本轮扩大重构。

## 8. 代码改动清单

以下列出本轮实现涉及的主要文件与边界，便于审查改动。

| 文件 | 计划修改 |
|---|---|
| `src/pages/about/About.tsx` | 重写文案、减少型号堆积、修正卡片链接、整理事实表、调整合作与新闻入口 |
| `src/data/news.ts` | 两篇正文、title、excerpt、图注与链接；增加必要的 updatedAt、主图 alt/尺寸/图注、专属 CTA 字段 |
| `src/pages/news/News.tsx` | 栏目介绍、隐藏空分类标签、空分类索引策略；使用简洁图片 alt |
| `src/pages/news/NewsArticle.tsx` | 主图字段化、专属分享图、日期/署名、文章 CTA、语义化正文；需要规格摘要表时只加一个简单 table block |
| `src/components/SEO.tsx` | 仅在采用空分类方案时增加 noindex-follow 的受控支持，保持其他调用默认行为 |
| `src/components/layout/Header.tsx`、`Footer.tsx` | 隐藏没有内容的行业分类入口 |
| `scripts/routes.mjs`、`generate-sitemap.js`、`verify-seo-dist.mjs` | 区分可索引与预渲染路由、按文章日期写 lastmod、检查主体与文章关键元信息 |
| `public/sitemap.xml` | 按脚本重新生成，避免手改后被覆盖 |
| `src/pages/Index.tsx` 与必要的共享公司事实模块 | 仅同步经核实组织信息与稳定标识；若删除已否决规模/不良率，同步对应首页和页脚位置，不重做首页 |
| 与 About/News 行为相关的针对性测试 | 检查链接、图像、日期、空分类策略与 HTML 主体；不为每句文案写快照测试 |

不需要新 CMS、搜索功能、分页系统、自动文章生成器或更换框架。现有数据结构加少量字段即可。方案实施时保留不相关工作，使用隔离工作区承载代码改动。

## 9. 执行次序与阶段交付

| 阶段 | 内容 | 完成标准 |
|---|---|---|
| A 事实核实 | 第 4 节材料审查；无需依赖材料的病句、重复和坏链接先整理 | 每条重要主张有可保留/需改/暂删决定，没有用润色掩盖未知 |
| B 英文定稿 | About、栏目介绍、两篇 News、标题/描述/按钮/图注 | 全文读起来一致自然；无未核实的效果或合作承诺；交付完整英文稿 |
| C 页面与模板实现 | 链接、主图、署名日期、CTA、空分类、schema 与 sitemap | 本地构建与针对性验证通过；本轮改动范围清楚 |
| D Preview 验收 | 手机、平板、桌面阅读和点击；直接打开路由与分享元数据 | 无裁切错误、横向溢出、重复图片和找不到产品；读者能找到规格与询盘入口 |
| E 发布后验证 | 发布须按项目流程授权；核查真实 HTML、响应与索引资格 | 线上证据与本地结果分开记录；提交 sitemap 不等于已收录 |
| F 效果观察 | 以发布日为基线，约 2–4 周初查、6–8 周复查；低样本适当延长 | 记录搜索表现、有效访问与询盘，不以几次 AI 问答判断成功 |

事实材料不足时，可以完成语言、链接和模板修正，并撤下缺依据主张，不需要让整轮优化停住。必要公司身份信息仍需业务方核实，不能杜撰。

## 10. 验收清单

### 内容

- 海外经销商可以快速复述：TEYES 做什么、新闻发生了什么、到哪里看详情、怎样联系。
- 检查所有“all/every/any”“best/leading”“higher/clearer/faster”等全称或比较词，逐条有范围与依据；不是简单全文禁用。
- 展会新闻没有替主办方写长篇背景；新品新闻没有复制整张产品规格表。
- 型号、连接方式、额定/最大功率、箱体/单元概念准确。
- 逐段朗读，检查空泛词、过长句、代词指代和生硬翻译；无需追求 AI 检测分数。

### 页面与技术

- 四张车机卡片全部进入真实目标；10V8 链接命中独立单元区域。
- 每篇文章的头图、图注、alt、真实尺寸和分享图对应；主图不在紧邻正文重复。
- 360/768/1440 像素宽度检查正文、表格、卡片、CTA；参数表可在自身容器滚动，不让全页横向溢出。
- 关键正文存在于预渲染 HTML；每页仅一个正确 title、canonical、description，article 主体不是空壳。
- 标题、可见署名/日期与 JSON-LD 一致；正文不能删除某个数据而 schema 仍保留。
- Industry 空分类可抓取并 noindex-follow，不在 sitemap；有内容分类维持索引和自引用 canonical。
- 构建、现有 SEO 检查及相关回归通过；完整构建会生成文件并涉及浏览器依赖，留在实施阶段执行。
- 现有 GTM/表单/Zoho/WhatsApp 路径不改；共享布局涉及的既有追踪检查仍须通过。不要用真实表单提交做未经授权的验收。

### 搜索与业务

- Google Search Console：核对索引/所选 canonical、页面与查询表现；没有访问权限时标记未验证。
- Google 将 AI 功能流量计入 Search Console 的 Web 搜索表现，不能把所有自然流量增量都算成 GEO 效果。[官方测量说明](https://developers.google.com/search/docs/appearance/ai-features)
- AI 抽查使用固定问题：What does TEYES make? / Where is TEYES based? / What car audio products did TEYES launch at Automechanika 2026? / Where was the TEYES booth at Automechanika Frankfurt 2026?
- 记录平台、日期、语言/地区、是否启用搜索、是否提及 TEYES、是否引用目标 URL、事实是否正确。提及和引用分开计数，单次出现不叫稳定排名。
- 业务观察：新闻到产品页、新闻到联系页的访问，以及可确认的有效询盘；优先用现有分析能力，若缺少事件追踪另行定义需求，不擅自新增标签。
- 当前没有搜索量、排名、AI 引用或询盘基线，因此不提供虚构的 GEO 分数、预计增长率或保证见效日期。

## 11. 后续内容方向

先完成现有三页，再考虑有资料支持的内容：真实安装案例、不同音响配置的选择说明、型号兼容条件、经销商常见问题。每篇应有产品人员或实际项目材料支撑。

不要为了填满 Industry Insights 批量生成泛泛行业趋势；也不要把“近期更新”当成每周必须发文的理由。两篇可信、完整的新闻比多个空栏目更合适当前阶段。

## 12. 核查来源

- [GitHub 审核基线](https://github.com/wahahajack/teyesglobal/tree/da1cbbdea3d2369c63a4d8a625232655b94e3fe2)
- [About](https://github.com/wahahajack/teyesglobal/blob/da1cbbdea3d2369c63a4d8a625232655b94e3fe2/src/pages/about/About.tsx)
- [News 数据](https://github.com/wahahajack/teyesglobal/blob/da1cbbdea3d2369c63a4d8a625232655b94e3fe2/src/data/news.ts)
- [News 模板](https://github.com/wahahajack/teyesglobal/blob/da1cbbdea3d2369c63a4d8a625232655b94e3fe2/src/pages/news/NewsArticle.tsx)
- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)
- [Google helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [OpenAI crawlers](https://developers.openai.com/api/docs/bots)

官方指南已在本轮读取。公司经营事实、展会外部记录和各型号完整规格仍按第 4 节核实，不能以仓库已有表述替代业务证据。

## 13. 本轮实现记录

- 分支：`codex/about-news-content-seo`；实现放在隔离 worktree，未推送、合并或发布。
- About：重写首屏、产品入口、合作说明和新闻入口；统一稳定的 Organization 标识；删除未有口径支持的规模、用户量和不良率字段。
- News：重写列表、两篇文章、图片 alt/尺寸/图注、CTA、作者和日期；空的 Industry 分类保留可访问页面，使用 `noindex, follow` 并从导航和 sitemap 移除。
- SEO/GEO：为文章输出绝对分享图和 NewsArticle 日期；按新闻真实日期写入 sitemap；预渲染检查区分全部路由和可索引路由。
- 共用文案：同步首页 FAQ、产品卡片、合作入口和经销商解决方案中的明显内部术语、排名、利润和覆盖范围断言，改为访客可理解且可询问的表达。
- 本地结果：`npm test -- --maxWorkers=2` 通过 14 个测试文件、172 个测试；`npm run lint` 无错误；生产构建和 `verify-seo-dist.mjs` 通过（33 个预渲染路由、32 个可索引路由）。TypeScript 检查仍受仓库原有 `src/test/static-lead-client.test.ts` 类型断言错误影响。
