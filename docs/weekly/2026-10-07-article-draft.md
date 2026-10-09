# Industry Insights 文章草稿 — 2026-10-07

- 选题来源：本周简报头条（Sony 退出北美售后车机市场，2026-09-30 邮件通知）。依据 topic-backlog 规则，时效性事件优先于 backlog，故本周不取 backlog 题目。
- 状态：**已合入 `src/data/news.ts`（2026-10-08）**。合入时使用模板的结构化字段：`reviewedBy: "Chris Peng, TEYES Engineering"`（页面署名与 schema 自动生成）、`faq: [...]`（可见 FAQ 与 FAQPage JSON-LD 共用同一数据源），blocks 中的手写 FAQ 段和署名段已移除。`tsc`、166 项测试、sitemap 全部通过；新 URL：`/news/industry/sony-exit-north-america-head-unit-supplier-checklist/`。
- 正文词数：约 1,050 词（不含 FAQ 与署名）。
- 已完成：① 署名块技术审核人填写为 Chris Peng（公司核心人员，负责技术与工程）；② 第一手事实段落已写入，含全系 OTA 固件更新（所有者 2026-10-08 确认全系支持）、CC4 PRO 360/ADAS 与按 SKU 认证文件；③ 主图已定为新素材 `public/assets/news/automechanika-2026-cc4-pro-counter-large.webp`（1280×720，来自 2026-10-08 提供的展会陈列原图，CC4 PRO 车机+摄像头/麦克风陈列台；方形原图另存为 `automechanika-2026-cc4-pro-counter.webp` 备用）。
- 待人工处理：① RMA 流程细节所有者表示稍后补充，到位后可再加一句质保/售后流程事实（非阻塞项）；② 建议 Chris Peng 对新增 OTA 一句做技术复核会签（见核对清单第 15 条）；③ 合入时恢复 Industry 分类的导航展示与索引（方案第 7.4 节），og:image 转绝对 URL；④ FAQ schema 已附于文末，仅在 FAQ 问答真实渲染在页面时启用。

---

## NewsArticle 条目草稿（`src/data/news.ts` 格式）

```ts
{
  slug: "sony-exit-north-america-head-unit-supplier-checklist",
  category: "industry",
  title: "Sony Exits North American Car Audio: A Supplier Checklist for Head Unit Buyers",
  date: "2026-10-07",
  excerpt:
    "Sony has notified the industry that it is leaving the North American aftermarket car audio business, after exiting Europe in 2025. For distributors, retailers and installers, the practical question is not why Sony left — it is how to evaluate the supplier who takes its place on the shelf.",
  image: "/assets/news/automechanika-2026-cc4-pro-counter-large.webp",
  blocks: [
    {
      type: "paragraph",
      text: "Sony has told the car audio industry that it is stepping back from the aftermarket car audio business in North America. According to trade publication CEoutlook, the notice was sent to industry members by email on September 30, 2026. It follows Sony's exit from the European aftermarket, where the company stopped taking orders at the end of 2024 and ended shipments in March 2025, stating at the time that warranties would remain in place according to the laws of each region."
    },
    {
      type: "paragraph",
      text: "Dealer reactions appeared within days. SCR Distribution in the UK summarized the situation bluntly on Facebook: Sony is leaving the US market after already leaving Europe, leaving Alpine, Pioneer and Kenwood as the remaining tier-one head unit brands. Other dealers described themselves as heartbroken. In its October 2 follow-up, CEoutlook reported that industry members speculating on the reasons for the departure noted Sony's sales were heavily concentrated in head units — a category under pressure. That explanation is industry speculation, not a statement from Sony."
    },
    {
      type: "paragraph",
      text: "For distributors, importers, retailers and installers outside the tier-one brand system, the why matters less than the what now. Shelf space, installer recommendations and customer trust that Sony occupied do not disappear; they get reallocated. This article looks at what the exit changes for the trade, and offers a checklist for evaluating whichever supplier takes that place."
    },
    {
      type: "heading",
      text: "What actually changed"
    },
    {
      type: "paragraph",
      text: "The exit itself was telegraphed in the channel. By August 2026, parts specialist Auto Harness House reported that Sony's previous receiver generation — the XAV-AX5000, AX5600, AX7000 and AX8100 — had been discontinued, that remaining units were available only in small numbers from third-party sellers, and that leftover XAV-AX7000 stock was selling above its original price. When discontinued models trade at a premium, it usually means demand for the product still exists while the supply line has already been wound down."
    },
    {
      type: "paragraph",
      text: "The demand side has not changed. Consumers continue to report problems with factory infotainment systems — infotainment accounts for roughly 25% of all new-vehicle problems, according to a JD Power finding reported by CEoutlook on September 20, 2026. Vehicles on the road keep aging, and drivers keep upgrading. What changed is the supply side: one of the most recognized names in the category has left its second major region within two years."
    },
    {
      type: "paragraph",
      text: "Meanwhile, the remaining tier-one brands are redirecting their energy. Alpine used the weeks before SEMA 2026 to promote an all-new marine audio line — head units, amplifiers, speakers and subwoofers for boats — after announcing its return to the marine market earlier in 2026. Pioneer Electronics AsiaCentre introduced two new large-screen A Series multimedia receivers in the Philippines in late September, and followed with the 9-inch DMH-AP6850BT with wireless Apple CarPlay in early October. The pattern is visible: incumbents are diversifying into adjacent categories and concentrating head unit investment on large-screen, smartphone-centric models in growth markets."
    },
    {
      type: "heading",
      text: "A checklist for evaluating a replacement supplier"
    },
    {
      type: "paragraph",
      text: "Whether the replacement for a departed brand is another tier-one line or an Android head unit specialist, the evaluation questions are the same. They are also the questions dealers are most likely to ask in the coming months, based on what the channel itself has been discussing this week."
    },
    {
      type: "list",
      items: [
        "Supply continuity. How long has the current product generation been shipping, and how does the supplier communicate end-of-life? Sony's channel wound down for months before the exit was announced; buyers who watched stock levels and discontinued SKUs had early warning.",
        "Warranty terms in writing. How many years, honored by whom, in which markets, and through which process? When Sony left Europe, it stated that warranties would remain in place according to regional law — a reminder that exit terms matter as much as warranty length. Some retailers now warn consumers that products bought from unauthorized sellers may not be covered at all, so ask how the supplier defines and polices its authorized channel.",
        "Software and firmware support. How are updates delivered, and what happens when an update fails? To take one current example from the Android segment: some suppliers require a Windows PC for system updates, and a failed or mismatched update can disable CarPlay/Android Auto until a paid reactivation. Multiply that by an installer's labor rate and it becomes a real cost line.",
        "Verifiable specifications. US installers have publicly criticized low-cost Android head units this month for inflated hardware specifications, laggy software and absent support. Ask for the chipset model, RAM and storage configuration by SKU, and check them against the delivered unit. A supplier who publishes verifiable specifications is easier to stand behind than one who leads with adjectives.",
        "Fitment and integration depth. As tier-one brands concentrate on large-screen CarPlay receivers, differentiation moves to vehicle integration: CAN bus decoders, steering-wheel control retention, factory camera retention, 360-degree camera support and ADAS (advanced driver assistance systems) camera inputs. Confirm these per vehicle model and year, not as a blanket claim.",
        "Certifications for your market. E-mark for European-type-approval markets, CE for the EU, FCC for the US. Ask which documents the supplier can provide for the specific SKU you are buying, not the brand in general."
      ]
    },
    {
      type: "paragraph",
      text: "Among Android head unit specialists, TEYES publishes per-model specifications and vehicle-specific integration lists rather than generic compatibility claims. Firmware updates for its current Android head unit range are delivered over the air (OTA) — updates download and install directly on the device, with no PC or service visit required. Its CC4 PRO model supports 360-degree camera systems and ADAS camera inputs, and TEYES provides CE, FCC and E-mark documentation per SKU on request — the same verification points this checklist asks buyers to confirm before placing volume orders."
    },
    {
      type: "heading",
      text: "The bottom line"
    },
    {
      type: "paragraph",
      text: "Sony's North American exit is the largest single-brand event in the aftermarket head unit category this year. It does not signal the end of the category — the demand drivers are intact, and the same week brought new large-screen receivers from Pioneer and a diversified marine line from Alpine. It does signal that the supplier list buyers trusted for two decades is being rewritten, and that the evaluation criteria above will decide who inherits the shelf."
    },
    {
      type: "paragraph",
      text: "TEYES develops Android car stereos, car audio products and accessories, and works with distributors, retailers and businesses seeking customized products. Distributors evaluating their head unit lineup for 2027 can contact the TEYES team to discuss model ranges, warranty terms and market requirements."
    },
    {
      type: "heading",
      text: "FAQ"
    },
    {
      type: "paragraph",
      text: "Did Sony stop making car stereos? Sony has announced its exit from the aftermarket car audio business in North America, following its earlier exit from the European aftermarket, where shipments ended in March 2025. Sony continues other consumer electronics businesses; this decision concerns aftermarket car audio."
    },
    {
      type: "paragraph",
      text: "Will existing Sony car audio warranties still be honored? When Sony exited Europe, it stated that warranties would remain in place according to the laws of each region. For North America, buyers should confirm warranty handling with their place of purchase and Sony's regional support channels, as detailed exit terms had not been published at the time of writing."
    },
    {
      type: "paragraph",
      text: "Which tier-one brands remain in aftermarket head units? Following Sony's departure, dealers name Alpine, Pioneer and Kenwood as the remaining tier-one brands in the category."
    },
    {
      type: "paragraph",
      text: "Does Sony's exit mean the aftermarket head unit category is shrinking? The exit reflects one company's portfolio decision. Demand indicators remain: infotainment systems account for roughly 25% of new-vehicle problems according to a JD Power finding reported in September 2026, and competitors launched new large-screen receivers in the same week."
    },
    {
      type: "paragraph",
      text: "What should a distributor ask a new head unit supplier first? Start with supply continuity and warranty terms in writing — how long the current generation ships, how end-of-life is communicated, and exactly who honors warranty claims in your market. Then verify software update processes and per-SKU specifications before placing volume orders."
    },
    {
      type: "paragraph",
      text: "Written by TEYES Editorial · Technically reviewed by Chris Peng, TEYES Engineering"
    }
  ]
}
```

## 来源与日期（正文已注明，供审稿核对）

- CEoutlook, "Sony Car Audio Exits the North American Market", 2026-09-30/10-01 — https://www.ceoutlook.com/2026/09/30/sony-car-audio-exits-the-north-american-market/
- CEoutlook, "12V Reacts to Sony's North American Exit", 2026-10-02 — https://www.ceoutlook.com/2026/10/02/12v-reacts-to-sonys-north-american-exit/
- CEoutlook, "Sony Exits European Car Audio Aftermarket", 2024-12-09 — https://www.ceoutlook.com/2024/12/09/sony-exits-european-car-audio-aftermarket/
- CEoutlook, "See Alpine at SEMA 2026", 2026-10-02 — https://www.ceoutlook.com/2026/10/02/see-alpine-at-sema-2026/
- CEoutlook, "Consumers are Complaining About OEM Infotainment Systems"（援引 JD Power）, 2026-09-20 — https://www.ceoutlook.com/
- Auto Harness House, Sony XAV 系列选购页（停产与库存溢价观察）, 2026-08 更新 — https://www.autoharnesshouse.com/sonyXAV.html
- Daily Tribune, "Pioneer rolls out new A Series multimedia receivers", 2026-09-27 — https://tribune.net.ph/2026/09/27/pioneer-rolls-out-new-a-series-multimedia-receivers
- Pioneer 官方 Instagram, DMH-AP6850BT 发布, 2026-10-05 — https://www.instagram.com/reel/DeIyfTuB1li/
- SCR Distribution UK（Facebook 经销商反应）、Soundz Good 2 Me（非授权渠道质保警示）、HITECHCARAUDIO（虚标/卡顿批评）、Joying 官方支持博客（固件更新与重新激活费用）——均为窗口期内公开内容，正文以一般化表述引用。

---

# 产出 3：技术事实核对清单（供工程师逐条标 ✅ / ❌ / 改）

1. 文中称 Sony 于 2026-09-30 以邮件通知行业退出北美售后车机业务 —— 依据 CEoutlook 报道，请确认我司对事件表述无异议。
2. 文中称 Sony 欧洲于 2024 年底停止接单、2025 年 3 月底停止发货、质保按地区法律维持 —— 依据 Sony Europe 信件（CEoutlook 2024-12 转述）。
3. 文中称 Sony 退出原因"销售集中于 head unit 品类"为行业成员推测、非 Sony 官方解释 —— 已按推断处理，请确认措辞。
4. 文中称 XAV-AX5000/AX5600/AX7000/AX8100 已停产且 AX7000 库存溢价 —— 依据第三方零售网站 2026-08 观察，非官方数据。
5. 文中称信息娱乐系统约占新车问题的 25%（JD Power，CEoutlook 2026-09-20 转述）—— 建议审稿时核对 JD Power 原始报告口径（是"问题占比"还是"投诉类别占比"）。
6. 文中称 Alpine 2026 年重返船用音频市场并将在 SEMA 2026 展出全线产品 —— 依据 CEoutlook 2026-02 与 2026-10-02 报道。
7. 文中称 Pioneer 9 月底在菲律宾发布两款 A 系列大屏接收机、10 月 5 日发布 9 英寸 DMH-AP6850BT（无线 CarPlay）—— 依据 Daily Tribune 与 Pioneer 官方 Instagram。
8. 文中称"部分安卓车机供应商要求 Windows 电脑刷机、刷错版本会使 CarPlay/Android Auto 失效并需付费重新激活" —— 依据 Joying 官方支持页（$10 重激活条款），正文已一般化处理，请确认是否保留具体指向。
9. 文中称"美国安装商本月公开批评低价安卓车机虚标硬件参数、软件卡顿、缺售后" —— 依据 HITECHCARAUDIO 公开视频，为经销商观察，非实测。
10. 清单中"CAN bus 解码器、方向盘按键保留、原厂摄像头保留、360 影像支持、ADAS 摄像头输入"作为车辆集成差异点 —— 请确认这些能力与 TEYES 在售型号（尤其 CC4 PRO）的实际支持范围一致，避免读者按清单反问时我司无法逐项应答。
11. 清单中 E-mark / CE / FCC 认证表述 —— 请确认我司可提供的认证文件按 SKU 的实际覆盖范围。
12. 结尾段"TEYES develops Android car stereos, car audio products and accessories, and works with distributors, retailers and businesses seeking customized products" —— 沿用 About 页拟用表述，请确认与公司事实口径一致。
13. FAQ 中称"经销商点名 Alpine、Pioneer、Kenwood 为剩余一线品牌" —— 依据英国经销商社媒发言，为渠道说法，请确认是否需要补充 JVCKENWOOD 全称。
14. ~~全文未使用任何 TEYES 产品参数、不良率、市场份额数据~~ **已处理（2026-10-08）**：第一手事实段落已补入，内容仅使用核对清单第 10、11 条已确认事实（CC4 PRO 的 360/ADAS 支持与按 SKU 提供认证文件），未引入任何未经核实的参数或不良率数据。
15. **新增（2026-10-08，14 条通过后补入）**：第一手事实段落新增"TEYES 现有安卓车机全系支持 OTA 固件更新，设备端直接下载安装，无需电脑或到店"——依据所有者当日确认（"OTA 全系都可以升级"）。✅ 所有者已确认；建议 Chris Peng 会签时复核两点：①"current Android head unit range"的覆盖范围是否与在售型号一致；② OTA 是否含 MCU 固件还是仅系统固件，如仅系统固件请把 "Firmware updates" 改为 "System firmware updates"。

---

# 附：FAQ schema（JSON-LD）草稿

**启用前提**（对应 SEO 方案第 7.3 节第 9 条）：FAQ 结构化数据只在 FAQ 问答真实渲染在页面可见正文时输出；若合入时删改任何问答，schema 必须与可见正文逐字一致，不一致即撤下。Google 目前仅对权威政府/健康网站展示 FAQ 富结果，本 schema 的定位是语义标注，不承诺富摘要展示。

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Did Sony stop making car stereos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sony has announced its exit from the aftermarket car audio business in North America, following its earlier exit from the European aftermarket, where shipments ended in March 2025. Sony continues other consumer electronics businesses; this decision concerns aftermarket car audio."
      }
    },
    {
      "@type": "Question",
      "name": "Will existing Sony car audio warranties still be honored?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When Sony exited Europe, it stated that warranties would remain in place according to the laws of each region. For North America, buyers should confirm warranty handling with their place of purchase and Sony's regional support channels, as detailed exit terms had not been published at the time of writing."
      }
    },
    {
      "@type": "Question",
      "name": "Which tier-one brands remain in aftermarket head units?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Following Sony's departure, dealers name Alpine, Pioneer and Kenwood as the remaining tier-one brands in the category."
      }
    },
    {
      "@type": "Question",
      "name": "Does Sony's exit mean the aftermarket head unit category is shrinking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The exit reflects one company's portfolio decision. Demand indicators remain: infotainment systems account for roughly 25% of new-vehicle problems according to a JD Power finding reported in September 2026, and competitors launched new large-screen receivers in the same week."
      }
    },
    {
      "@type": "Question",
      "name": "What should a distributor ask a new head unit supplier first?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start with supply continuity and warranty terms in writing — how long the current generation ships, how end-of-life is communicated, and exactly who honors warranty claims in your market. Then verify software update processes and per-SKU specifications before placing volume orders."
      }
    }
  ]
}
```

实现提示（供前端合入时参考）：

- 该 JSON-LD 与文章主体 NewsArticle schema 并列输出即可，不要嵌套进 NewsArticle。
- `name` / `text` 必须与页面可见问答逐字一致；正文走 `blocks` 渲染，schema 需单独维护一份字符串，合入时建议把 FAQ 内容抽成结构化字段（如 `faq: { question, answer }[]`），让正文渲染与 schema 共用同一数据源，避免日后改正文忘改 schema（对应方案第 7.3 节第 5 条"可见内容与 JSON-LD 一致"的检查项）。
- 若审稿时删掉任一问答或修改措辞，两处同步更新；若整段 FAQ 撤下，schema 一并撤下。
