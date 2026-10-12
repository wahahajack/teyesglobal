# Industry Insights 文章草稿 — 2026-10-12

- 选题来源：本周简报头条（Sony 退出确认为全球退出，澳洲零售商被书面通知，发货截止 2026-12-31）。依据 topic-backlog 规则，时效性事件优先于 backlog，本周不取 backlog 题目。本篇为 2026-10-07 已发布文章《Sony Exits North American Car Audio: A Supplier Checklist for Head Unit Buyers》的后续报道，视角从"评估替代供应商"转为"过渡时间表与库存/质保管理"，不重复上周内容。
- 状态：**已合入 `src/data/news.ts`（2026-10-12）**。技术审核人 Chris Peng 已确认核对清单全部通过，`reviewedBy: "Chris Peng, TEYES Engineering"`；`faq` 结构化字段同时渲染可见 FAQ 与 FAQPage JSON-LD。验证结果：`tsc --noEmit` 无输出（无错误）；`npm test` 175/175 通过（首次运行有 1 项偶发失败，两次重跑均全通过）；`npm run lint` 0 错误（7 个警告为仓库既有）；sitemap 已重新生成，仅新增本期文章 URL。新 URL：`/news/industry/sony-car-audio-global-exit-transition-timeline/`。
- 正文词数：约 1,100 词（不含 FAQ 与署名）。
- 已完成：① 署名块技术审核人 Chris Peng 已确认；② 第一手事实段落沿用 2026-10-08 所有者确认信息（全系 OTA、CC4 PRO 360/ADAS、按 SKU 认证文件），Chris Peng 审稿通过；③ 正文已加内链至上周文章 `/news/industry/sony-exit-north-america-head-unit-supplier-checklist/`；④ 主图最终定为 `automechanika-2026-cc4-pro-navigation.webp`（1200×675，CC4 PRO 车机陈列图）。说明：合入时曾用所有者提供的 ADAS 摄像头特写（`teyes-front-adas-camera.webp`），所有者反馈"图文关联弱"，经 PR #34 更换为车机主题图并改写 alt/图注，更贴合"车机品类供应商更替"的文章主题。换图后测试 180/180 通过（偶发失败项重跑通过，与本次改动无关）。
- 遗留说明：当前 `public/assets/news/` 素材库全部为 Automechanika 展会照片，长期建议补充非展会素材（实车安装、工作台、仓储/出货场景），行业分析类文章会更贴切。

---

## NewsArticle 条目草稿（`src/data/news.ts` 格式）

```ts
{
  slug: "sony-car-audio-global-exit-transition-timeline",
  category: "industry",
  title:
    "Sony's Car Audio Exit Goes Global: A Transition Timeline for Head Unit Buyers",
  date: "2026-10-12",
  excerpt:
    "Sony's exit from aftermarket car audio is now confirmed as worldwide. Australian retailers were notified in writing in the week of October 7, shipments run until December 31, 2026, and dealer support continues into 2027. For distributors and retailers, the transition is now a dated planning exercise.",
  image: "/assets/news/automechanika-2026-cc4-pro-counter.webp", // 占位：待确认主图，避免与上周文章重复
  imageAlt: "TEYES CC4 PRO head unit display at Automechanika Frankfurt 2026",
  imageWidth: 1080,
  imageHeight: 1080,
  imageCaption:
    "The CC4 PRO display on the TEYES stand at Automechanika Frankfurt 2026.",
  cta: {
    title: "Reviewing your head unit lineup this quarter?",
    description:
      "Tell the TEYES team where you operate and which models you are considering to discuss specifications, warranty terms and distribution options.",
    label: "Discuss distribution",
    href: "/contact/",
  },
  // reviewedBy: 工程师姓名占位待填，合入时填写
  faq: [
    {
      question: "Is Sony leaving the car audio business worldwide?",
      answer:
        "Yes. Trade publications in Australia, the US and the UK reported in the week of October 5, 2026 that Sony is exiting the aftermarket car audio business globally, including its marine audio line. Shipments of existing products continue until December 31, 2026. Sony had already exited the European aftermarket earlier: it stopped taking orders at the end of 2024 and ended shipments in March 2025.",
    },
    {
      question: "How long will Sony support car audio dealers after the exit?",
      answer:
        "According to trade reports, Sony's dealer-facing field, sales and technical support continues into early 2027 — one outlet reports spring 2027. After that point, product owners needing support will have to contact Sony directly rather than through the dealer channel.",
    },
    {
      question: "Which retailers were notified in Australia?",
      answer:
        "ChannelNews, which first reported the Australian dealer letter on October 7, 2026, named Super Cheap Auto, Autobarn, Strathfield Car Radios, Ryda, Audio Emporium, Street Sound & Vision and Pulse Car Audio among the notified retailers.",
    },
    {
      question: "Should dealers place final orders before December 31, 2026?",
      answer:
        "Trade coverage advises placing final orders before the shipment cutoff while avoiding overstock: remaining inventory is widely expected to be cleared through year-end sales, which can reset street prices. Confirm order deadlines, return rights and warranty handling with Sony's regional channel in writing before committing volume.",
    },
    {
      question: "What should buyers verify in a replacement supplier?",
      answer:
        "Focus on what an exit makes visible: supply continuity and end-of-life notice policy, written warranty terms including who honors claims in your market, the software and firmware update process, and verifiable per-model specifications. TEYES published a detailed supplier checklist when the North American exit was first announced.",
    },
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Sony's departure from aftermarket car audio is larger than first reported. When the company notified US industry members by email on September 30, 2026, the announcement was understood as a North American exit. Within a week, trade publications confirmed the decision is global. ChannelNews in Australia reported on October 7 that Sony Australia had notified retailers in writing, naming Super Cheap Auto, Autobarn, Strathfield Car Radios, Ryda, Audio Emporium, Street Sound & Vision and Pulse Car Audio among them. StereoNET independently confirmed the US dealer letter on October 8 and reported that the exit also covers the UK, completing a withdrawal that began when Sony stopped taking European orders at the end of 2024. The company's marine audio line is being discontinued alongside car audio.",
    },
    {
      type: "paragraph",
      text: "When the North American exit was announced, this publication outlined a checklist for evaluating a replacement supplier. The confirmed details this week change the question from how to evaluate to when to act. The exit now has public dates, and those dates define a transition window that distributors, retailers and installers can plan around. [编辑注：合入时此处加内链至 /news/industry/sony-exit-north-america-head-unit-supplier-checklist/]",
    },
    {
      type: "heading",
      text: "The dates that matter",
    },
    {
      type: "paragraph",
      text: "Three dates structure the transition. First, shipments: existing Sony car and marine audio products continue to ship to dealers until December 31, 2026, according to ChannelNews and StereoNET. Second, support: Sony's local and regional teams keep providing field, sales and technical support to dealers into early 2027 — Best of High End reports spring 2027 — after which factory-direct support for the category ends and product owners contact Sony directly. Third, the European precedent: when Sony left Europe, it stated that warranties would remain in place according to the laws of each region. Buyers in other markets should confirm the equivalent terms with their regional Sony channel in writing rather than assume the same arrangement.",
    },
    {
      type: "paragraph",
      text: "What these dates mean in practice is a planning exercise of roughly eighty days for ordering and about six months for support. Retailers are widely expected to use year-end sales to clear remaining Sony stock, according to Best of High End. For competing brands and for the retailers who carry them, a clearance window of that scale can temporarily reset street prices in the receiver category — a short-term pricing effect worth factoring into buying decisions, even though no clearance pricing had been publicly observed at major US retailers at the time of writing.",
    },
    {
      type: "heading",
      text: "What the channel is saying",
    },
    {
      type: "paragraph",
      text: "Dealer reaction has been blunt. Jim Warren, president of Sound Distributions, which operates twenty former Car Toys stores in Washington state, told StereoNET: \"Sony's exit from our industry saddens me — but is yet understandable. Our niche is very small, and likely a rounding error for a company the size of Sony.\" Dealers speaking to StereoNET suggested that head units, Sony's largest car audio category, are in double-digit decline; that figure is dealer speculation, not company or third-party data. The exit also sits within a broader reshaping of Sony's hardware business: the company sold a 51% stake in its TV and home audio business to TCL earlier in 2026 and plans to skip CES 2027, according to the same reports.",
    },
    {
      type: "paragraph",
      text: "The timing surprised parts of the trade for one specific reason: Sony's European XAV-9550ES receiver launched only in 2023 and won a 2024–25 EISA Award. A product line young enough to be winning awards is not obviously a product line being wound down — a reminder that portfolio decisions at this scale are made above the category level, and that buyers should not read a supplier's product quality as a guarantee of its commitment to the category.",
    },
    {
      type: "heading",
      text: "Managing the transition",
    },
    {
      type: "paragraph",
      text: "For distributors, retailers and installers carrying Sony, the practical steps follow directly from the published dates:",
    },
    {
      type: "list",
      items: [
        "Plan final orders against the December 31, 2026 shipment cutoff, and resist over-ordering. Stock bought at full wholesale price competes with clearance pricing within the same quarter.",
        "Get warranty handling in writing: who honors claims in your market, through which process, and until when. Sony's European exit stated that warranties would remain in place under regional law; confirm the equivalent terms for your market rather than assuming them.",
        "Map the support window against your own service promises. Dealer-facing support ends in early 2027; if your store offers longer service commitments to customers, the difference becomes your cost.",
        "Apply the same diligence to the replacement supplier: supply continuity and end-of-life notice policy, written warranty terms, the firmware update process, and verifiable per-model specifications. The supplier checklist published with the North American announcement covers these questions in detail.",
      ],
    },
    {
      type: "paragraph",
      text: "The demand side of the category has not moved with the supply side. Infotainment systems account for 25% of all problems reported by new-vehicle owners and are the only problem category to worsen year over year, according to JD Power's 2026 U.S. Multimedia Quality and Satisfaction Study published on September 9, 2026. JD Power's 2026 Initial Quality Study, published June 25, 2026, adds detail: connectivity problems with Android Auto and Apple CarPlay were the largest single contributor to the infotainment category's decline. Factory systems that frustrate owners are the aftermarket's demand engine, and that engine is running.",
    },
    {
      type: "paragraph",
      text: "Among Android head unit specialists, TEYES publishes per-model specifications and vehicle-specific integration lists rather than generic compatibility claims. Firmware updates for its current Android head unit range are delivered over the air (OTA) — updates install directly on the device, without a PC or a service visit. The CC4 PRO supports 360-degree camera systems and ADAS (advanced driver assistance systems) camera inputs, and TEYES provides CE, FCC and E-mark documentation per SKU on request. These are the same verification points a transition checklist asks buyers to confirm — and they are most useful when a supplier states them before being asked. [编辑注：本段为沿用 2026-10-08 所有者确认事实的第一手段落，合入前请工程师复核，见文末核对清单]",
    },
    {
      type: "heading",
      text: "The bottom line",
    },
    {
      type: "paragraph",
      text: "Sony's exit is no longer a regional story with an open ending. It is a worldwide withdrawal with a shipment deadline, a support deadline and a named list of retailers who now need replacement suppliers. For the trade, the work between now and December 31 is concrete: order deliberately, document warranty terms, and choose suppliers on what they can put in writing. The shelf space Sony occupied does not disappear; it gets reallocated to whoever passes that checklist.",
    },
  ],
}
```

**署名块（页面渲染格式，合入时由模板根据 `reviewedBy` 字段生成）：**

Written by TEYES Editorial · Technically reviewed by [工程师姓名，占位待填]

---

## FAQPage JSON-LD 草稿（仅在 FAQ 真实渲染时启用）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Sony leaving the car audio business worldwide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Trade publications in Australia, the US and the UK reported in the week of October 5, 2026 that Sony is exiting the aftermarket car audio business globally, including its marine audio line. Shipments of existing products continue until December 31, 2026. Sony had already exited the European aftermarket earlier: it stopped taking orders at the end of 2024 and ended shipments in March 2025."
      }
    },
    {
      "@type": "Question",
      "name": "How long will Sony support car audio dealers after the exit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "According to trade reports, Sony's dealer-facing field, sales and technical support continues into early 2027 — one outlet reports spring 2027. After that point, product owners needing support will have to contact Sony directly rather than through the dealer channel."
      }
    },
    {
      "@type": "Question",
      "name": "Which retailers were notified in Australia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ChannelNews, which first reported the Australian dealer letter on October 7, 2026, named Super Cheap Auto, Autobarn, Strathfield Car Radios, Ryda, Audio Emporium, Street Sound & Vision and Pulse Car Audio among the notified retailers."
      }
    },
    {
      "@type": "Question",
      "name": "Should dealers place final orders before December 31, 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trade coverage advises placing final orders before the shipment cutoff while avoiding overstock: remaining inventory is widely expected to be cleared through year-end sales, which can reset street prices. Confirm order deadlines, return rights and warranty handling with Sony's regional channel in writing before committing volume."
      }
    },
    {
      "@type": "Question",
      "name": "What should buyers verify in a replacement supplier?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Focus on what an exit makes visible: supply continuity and end-of-life notice policy, written warranty terms including who honors claims in your market, the software and firmware update process, and verifiable per-model specifications. TEYES published a detailed supplier checklist when the North American exit was first announced."
      }
    }
  ]
}
```

---

## 附：中文技术事实核对清单（供工程师逐条标 ✅/❌/改）

**A. 外部事实（行业事件与数据）**

1. Sony 于 2026-09-30 通过电子邮件通知美国行业成员退出售后车机业务；本周经 ChannelNews（2026-10-07，澳大利亚）、StereoNET（2026-10-08，美国/英国）等确认退出为全球范围。
2. Sony Australia 于 2026-10-07 当周书面通知的零售商包括 Super Cheap Auto、Autobarn、Strathfield Car Radios、Ryda、Audio Emporium、Street Sound & Vision、Pulse Car Audio（ChannelNews 报道）。
3. Sony 售后车机与船用音频产品发货截止 2026-12-31；船用音频线同步停产。
4. Sony 对经销商的现场、销售与技术支持持续至 2027 年初；Best of High End 写"2027 年春"；此后终端用户直接联系 Sony（StereoNET）。
5. Sony 退出欧洲时承诺质保按各地区法律继续有效（2024-12 欧洲信件）；其他区域条款需经销商与 Sony 区域渠道书面确认——文章未断言各区域适用同一条款。
6. "零售商预计用年末销售季清理库存"为 Best of High End（2026-10-08）报道的预期，非 Sony 官方政策；截至发稿未在美国主要零售商观察到公开清仓价。
7. Jim Warren（Sound Distributions 总裁，运营华盛顿州 20 家原 Car Toys 门店）引语逐字引自 StereoNET（2026-10-08）。
8. "head unit 品类双位数下滑"在文中明确标注为经销商推测，非 Sony 或第三方数据。
9. Sony 于 2026 年将电视与家庭音响业务 51% 股权售予 TCL、计划跳过 CES 2027（StereoNET/Best of High End 报道，作为背景引用）。
10. XAV-9550ES 接收机 2023 年发布、获 2024–25 EISA 奖（StereoNET）。
11. 信息娱乐系统占新车问题投诉 25% 且是唯一同比恶化类别：JD Power 2026 U.S. Multimedia Quality and Satisfaction Study，2026-09-09 发布（Business Wire 通稿）。
12. Android Auto/Apple CarPlay 连接问题是信息娱乐质量恶化的最大单一因素（+1.4 PP100）：JD Power 2026 U.S. Initial Quality Study，2026-06-25 发布。
13. "约 80 天下单窗口 / 约 6 个月支持窗口"系由公开日期（2026-12-31、2027 年初）相对发稿日推算的算术表述，非来源原话。

**B. TEYES 事实（沿用 2026-10-08 所有者确认，合入前请复核是否仍有效）**

14. TEYES 按型号公布规格与车型适配清单，而非通用兼容性宣称。
15. TEYES 当前在售安卓车机全系固件更新支持 OTA（空中下载，设备端直接安装，无需 PC 或到店）。
16. CC4 PRO 支持 360 度全景影像系统与 ADAS（高级驾驶辅助系统）摄像头输入。
17. TEYES 可按 SKU 提供 CE、FCC、E-mark 认证文件（on request）。

**C. 表述纪律自查**

18. 全文未宣称 TEYES"替代 Sony"，未引用未经证实的份额或出货量数据。
19. 全文无效果类断言（音质、散热、流畅度）；无"best/leading"类比较级；无无法核实的承诺。
20. 术语首次出现已解释：OTA（over the air，空中下载更新）、ADAS（advanced driver assistance systems，高级驾驶辅助系统）、EISA（文中仅作奖项名称出现，如需可在合入时展开为 European Imaging and Sound Association）。
