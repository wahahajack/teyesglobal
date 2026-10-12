// News articles for the TEYES Newsroom (/news/).
// Add a new article by appending an entry — listing pages, category pages,
// the article renderer, sitemap and prerender all pick it up automatically.

export type NewsCategory = "company" | "exhibitions" | "industry";

export interface NewsArticleBlock {
  type: "paragraph" | "heading" | "list" | "image";
  text?: string;
  items?: string[];
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface NewsArticle {
  slug: string;
  category: NewsCategory;
  title: string;
  date: string; // ISO date, e.g. "2026-09-08"
  updatedAt?: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageCaption?: string;
  location?: string;
  eventDates?: string;
  booth?: string;
  cta: {
    title: string;
    description: string;
    label: string;
    href: string;
  };
  // Name of the engineer who technically reviewed the article. Omit until the
  // reviewer's name is confirmed for publication; bylines and schema adapt.
  reviewedBy?: string;
  // Optional FAQ section rendered visibly at the end of the article and
  // emitted as FAQPage JSON-LD.
  faq?: { question: string; answer: string }[];
  blocks: NewsArticleBlock[];
}

// Editorial identity shared by article bylines and the /about/editorial/ page.
export const editorialByline = {
  writerName: "TEYES Editorial",
  profilePath: "/about/editorial/",
};

export const newsCategories: {
  id: NewsCategory;
  name: string;
  description: string;
}[] = [
  {
    id: "company",
    name: "Company News",
    description: "Product announcements from TEYES, including new additions to its car audio range.",
  },
  {
    id: "exhibitions",
    name: "Exhibitions & Events",
    description: "TEYES exhibition updates, with details of the products on display and where to meet the team.",
  },
  {
    id: "industry",
    name: "Industry Insights",
    description: "Analysis and trends shaping the automotive infotainment and aftermarket industry.",
  },
];

export const newsArticles: NewsArticle[] = [
  {
    slug: "sony-car-audio-global-exit-transition-timeline",
    category: "industry",
    title:
      "Sony's Car Audio Exit Goes Global: A Transition Timeline for Head Unit Buyers",
    date: "2026-10-12",
    updatedAt: "2026-10-12",
    excerpt:
      "Sony's exit from aftermarket car audio is now confirmed as worldwide. Australian retailers were notified in writing in the week of October 7, shipments run until December 31, 2026, and dealer support continues into 2027. For distributors and retailers, the transition is now a dated planning exercise.",
    image: "/assets/news/automechanika-2026-cc4-pro-navigation.webp",
    imageAlt:
      "TEYES CC4 PRO head unit display with navigation screen and camera accessories",
    imageWidth: 1200,
    imageHeight: 675,
    imageCaption:
      "TEYES head units on display. Head units are the category most directly affected by Sony's withdrawal from the aftermarket.",
    cta: {
      title: "Reviewing your head unit lineup this quarter?",
      description:
        "Tell the TEYES team where you operate and which models you are considering to discuss specifications, warranty terms and distribution options.",
      label: "Discuss distribution",
      href: "/contact/",
    },
    reviewedBy: "Chris Peng, TEYES Engineering",
    faq: [
      {
        question: "Is Sony leaving the car audio business worldwide?",
        answer:
          "Yes. Trade publications in Australia, the US and the UK reported in the week of October 5, 2026 that Sony is exiting the aftermarket car audio business globally, including its marine audio line. Shipments of existing products continue until December 31, 2026. Sony had already exited the European aftermarket earlier: it stopped taking orders at the end of 2024 and ended shipments in March 2025.",
      },
      {
        question:
          "How long will Sony support car audio dealers after the exit?",
        answer:
          "According to trade reports, Sony's dealer-facing field, sales and technical support continues into early 2027 — one outlet reports spring 2027. After that point, product owners needing support will have to contact Sony directly rather than through the dealer channel.",
      },
      {
        question: "Which retailers were notified in Australia?",
        answer:
          "ChannelNews, which first reported the Australian dealer letter on October 7, 2026, named Super Cheap Auto, Autobarn, Strathfield Car Radios, Ryda, Audio Emporium, Street Sound & Vision and Pulse Car Audio among the notified retailers.",
      },
      {
        question:
          "Should dealers place final orders before December 31, 2026?",
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
        text: "When the North American exit was announced, this publication outlined <a href=\"/news/industry/sony-exit-north-america-head-unit-supplier-checklist/\">a checklist for evaluating a replacement supplier</a>. The confirmed details this week change the question from how to evaluate to when to act. The exit now has public dates, and those dates define a transition window that distributors, retailers and installers can plan around.",
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
        text: "Among Android head unit specialists, TEYES publishes per-model specifications and vehicle-specific integration lists rather than generic compatibility claims. Firmware updates for its current Android head unit range are delivered over the air (OTA) — updates install directly on the device, without a PC or a service visit. The CC4 PRO supports 360-degree camera systems and ADAS (advanced driver assistance systems) camera inputs, and TEYES provides CE, FCC and E-mark documentation per SKU on request. These are the same verification points a transition checklist asks buyers to confirm — and they are most useful when a supplier states them before being asked.",
      },
      {
        type: "heading",
        text: "The bottom line",
      },
      {
        type: "paragraph",
        text: "Sony's exit is no longer a regional story with an open ending. It is a worldwide withdrawal with a shipment deadline, a support deadline and a named list of retailers who now need replacement suppliers. For the trade, the work between now and December 31 is concrete: order deliberately, document warranty terms, and choose suppliers on what they can put in writing. The shelf space Sony occupied does not disappear; it gets reallocated to whoever passes that checklist.",
      },
      {
        type: "paragraph",
        text: "TEYES develops Android car stereos, car audio products and accessories, and works with distributors, retailers and businesses seeking customized products. Distributors evaluating their head unit lineup for 2027 can contact the TEYES team to discuss model ranges, warranty terms and market requirements.",
      },
    ],
  },
  {
    slug: "sony-exit-north-america-head-unit-supplier-checklist",
    category: "industry",
    title:
      "Sony Exits North American Car Audio: A Supplier Checklist for Head Unit Buyers",
    date: "2026-10-07",
    updatedAt: "2026-10-07",
    excerpt:
      "Sony has notified the industry that it is leaving the North American aftermarket car audio business, after exiting Europe in 2025. For distributors, retailers and installers, the practical question is not why Sony left — it is how to evaluate the supplier who takes its place on the shelf.",
    image: "/assets/news/automechanika-2026-cc4-pro-counter-large.webp",
    imageAlt:
      "TEYES CC4 PRO head unit with camera and microphone accessories on display at Automechanika Frankfurt 2026",
    imageWidth: 1280,
    imageHeight: 720,
    imageCaption:
      "The CC4 PRO head unit and camera accessories on the TEYES stand at Automechanika Frankfurt 2026.",
    cta: {
      title: "Evaluating your head unit lineup?",
      description:
        "Tell the TEYES team where you operate and which models you are considering to discuss specifications, warranty terms and distribution options.",
      label: "Discuss distribution",
      href: "/contact/",
    },
    reviewedBy: "Chris Peng, TEYES Engineering",
    faq: [
      {
        question: "Did Sony stop making car stereos?",
        answer:
          "Sony has announced its exit from the aftermarket car audio business in North America, following its earlier exit from the European aftermarket, where shipments ended in March 2025. Sony continues other consumer electronics businesses; this decision concerns aftermarket car audio.",
      },
      {
        question: "Will existing Sony car audio warranties still be honored?",
        answer:
          "When Sony exited Europe, it stated that warranties would remain in place according to the laws of each region. For North America, buyers should confirm warranty handling with their place of purchase and Sony's regional support channels, as detailed exit terms had not been published at the time of writing.",
      },
      {
        question: "Which tier-one brands remain in aftermarket head units?",
        answer:
          "Following Sony's departure, dealers name Alpine, Pioneer and Kenwood as the remaining tier-one brands in the category.",
      },
      {
        question:
          "Does Sony's exit mean the aftermarket head unit category is shrinking?",
        answer:
          "The exit reflects one company's portfolio decision. Demand indicators remain: infotainment systems account for roughly 25% of new-vehicle problems according to a JD Power finding reported in September 2026, and competitors launched new large-screen receivers in the same week.",
      },
      {
        question: "What should a distributor ask a new head unit supplier first?",
        answer:
          "Start with supply continuity and warranty terms in writing — how long the current generation ships, how end-of-life is communicated, and exactly who honors warranty claims in your market. Then verify software update processes and per-SKU specifications before placing volume orders.",
      },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Sony has told the car audio industry that it is stepping back from the aftermarket car audio business in North America. According to trade publication CEoutlook, the notice was sent to industry members by email on September 30, 2026. It follows Sony's exit from the European aftermarket, where the company stopped taking orders at the end of 2024 and ended shipments in March 2025, stating at the time that warranties would remain in place according to the laws of each region.",
      },
      {
        type: "paragraph",
        text: "Dealer reactions appeared within days. SCR Distribution in the UK summarized the situation bluntly on Facebook: Sony is leaving the US market after already leaving Europe, leaving Alpine, Pioneer and Kenwood as the remaining tier-one head unit brands. Other dealers described themselves as heartbroken. In its October 2 follow-up, CEoutlook reported that industry members speculating on the reasons for the departure noted Sony's sales were heavily concentrated in head units — a category under pressure. That explanation is industry speculation, not a statement from Sony.",
      },
      {
        type: "paragraph",
        text: "For distributors, importers, retailers and installers outside the tier-one brand system, the why matters less than the what now. Shelf space, installer recommendations and customer trust that Sony occupied do not disappear; they get reallocated. This article looks at what the exit changes for the trade, and offers a checklist for evaluating whichever supplier takes that place.",
      },
      {
        type: "heading",
        text: "What actually changed",
      },
      {
        type: "paragraph",
        text: "The exit itself was telegraphed in the channel. By August 2026, parts specialist Auto Harness House reported that Sony's previous receiver generation — the XAV-AX5000, AX5600, AX7000 and AX8100 — had been discontinued, that remaining units were available only in small numbers from third-party sellers, and that leftover XAV-AX7000 stock was selling above its original price. When discontinued models trade at a premium, it usually means demand for the product still exists while the supply line has already been wound down.",
      },
      {
        type: "paragraph",
        text: "The demand side has not changed. Consumers continue to report problems with factory infotainment systems — infotainment accounts for roughly 25% of all new-vehicle problems, according to a JD Power finding reported by CEoutlook on September 20, 2026. Vehicles on the road keep aging, and drivers keep upgrading. What changed is the supply side: one of the most recognized names in the category has left its second major region within two years.",
      },
      {
        type: "paragraph",
        text: "Meanwhile, the remaining tier-one brands are redirecting their energy. Alpine used the weeks before SEMA 2026 to promote an all-new marine audio line — head units, amplifiers, speakers and subwoofers for boats — after announcing its return to the marine market earlier in 2026. Pioneer Electronics AsiaCentre introduced two new large-screen A Series multimedia receivers in the Philippines in late September, and followed with the 9-inch DMH-AP6850BT with wireless Apple CarPlay in early October. The pattern is visible: incumbents are diversifying into adjacent categories and concentrating head unit investment on large-screen, smartphone-centric models in growth markets.",
      },
      {
        type: "heading",
        text: "A checklist for evaluating a replacement supplier",
      },
      {
        type: "paragraph",
        text: "Whether the replacement for a departed brand is another tier-one line or an Android head unit specialist, the evaluation questions are the same. They are also the questions dealers are most likely to ask in the coming months, based on what the channel itself has been discussing this week.",
      },
      {
        type: "list",
        items: [
          "Supply continuity. How long has the current product generation been shipping, and how does the supplier communicate end-of-life? Sony's channel wound down for months before the exit was announced; buyers who watched stock levels and discontinued SKUs had early warning.",
          "Warranty terms in writing. How many years, honored by whom, in which markets, and through which process? When Sony left Europe, it stated that warranties would remain in place according to regional law — a reminder that exit terms matter as much as warranty length. Some retailers now warn consumers that products bought from unauthorized sellers may not be covered at all, so ask how the supplier defines and polices its authorized channel.",
          "Software and firmware support. How are updates delivered, and what happens when an update fails? To take one current example from the Android segment: some suppliers require a Windows PC for system updates, and a failed or mismatched update can disable CarPlay/Android Auto until a paid reactivation. Multiply that by an installer's labor rate and it becomes a real cost line.",
          "Verifiable specifications. US installers have publicly criticized low-cost Android head units this month for inflated hardware specifications, laggy software and absent support. Ask for the chipset model, RAM and storage configuration by SKU, and check them against the delivered unit. A supplier who publishes verifiable specifications is easier to stand behind than one who leads with adjectives.",
          "Fitment and integration depth. As tier-one brands concentrate on large-screen CarPlay receivers, differentiation moves to vehicle integration: CAN bus decoders, steering-wheel control retention, factory camera retention, 360-degree camera support and ADAS (advanced driver assistance systems) camera inputs. Confirm these per vehicle model and year, not as a blanket claim.",
          "Certifications for your market. E-mark for European-type-approval markets, CE for the EU, FCC for the US. Ask which documents the supplier can provide for the specific SKU you are buying, not the brand in general.",
        ],
      },
      {
        type: "paragraph",
        text: "Among Android head unit specialists, TEYES publishes per-model specifications and vehicle-specific integration lists rather than generic compatibility claims. Firmware updates for its current Android head unit range are delivered over the air (OTA) — updates download and install directly on the device, with no PC or service visit required. Its CC4 PRO model supports 360-degree camera systems and ADAS camera inputs, and TEYES provides CE, FCC and E-mark documentation per SKU on request — the same verification points this checklist asks buyers to confirm before placing volume orders.",
      },
      {
        type: "heading",
        text: "The bottom line",
      },
      {
        type: "paragraph",
        text: "Sony's North American exit is the largest single-brand event in the aftermarket head unit category this year. It does not signal the end of the category — the demand drivers are intact, and the same week brought new large-screen receivers from Pioneer and a diversified marine line from Alpine. It does signal that the supplier list buyers trusted for two decades is being rewritten, and that the evaluation criteria above will decide who inherits the shelf.",
      },
      {
        type: "paragraph",
        text: "TEYES develops Android car stereos, car audio products and accessories, and works with distributors, retailers and businesses seeking customized products. Distributors evaluating their head unit lineup for 2027 can contact the TEYES team to discuss model ranges, warranty terms and market requirements.",
      },
    ],
  },
  {
    slug: "teyes-car-audio-series-launch",
    category: "company",
    title: "TEYES launches speakers, amplifiers and subwoofers at Automechanika 2026",
    date: "2026-09-08",
    updatedAt: "2026-09-09",
    excerpt: "Explore the speakers, amplifiers and subwoofers introduced by TEYES at Automechanika Frankfurt 2026, with links to product specifications.",
    image: "/assets/news/automechanika-2026-audio-demo-large.webp",
    imageAlt: "TEYES car audio demonstration display with speakers, a head unit and a subwoofer",
    imageWidth: 1600,
    imageHeight: 900,
    imageCaption: "The car audio demonstration display at the TEYES booth in Frankfurt.",
    cta: {
      title: "Interested in the car audio range?",
      description: "Tell the TEYES team which products you are considering and where you operate to discuss availability and distribution options.",
      label: "Ask about the car audio range",
      href: "/contact/",
    },
    blocks: [
      {
        type: "paragraph",
        text: "TEYES introduced a new car audio range at Automechanika Frankfurt 2026, which runs from September 8 to 12 at Messe Frankfurt, Germany. The lineup includes speakers, amplifiers and subwoofers, adding car audio products to the company's existing head unit range.",
      },
      {
        type: "heading",
        text: "Component and coaxial speakers",
      },
      {
        type: "paragraph",
        text: "The speaker range includes component sets with separate speaker units and coaxial models that combine the drivers in one assembly. The T3-652 and T6-652 are 6.5-inch two-way passive component models; the T3-65X and T6-65X are coaxial options.",
      },
      {
        type: "list",
        items: [
          "T3-652: 100 W rated power and 71 mm mounting depth.",
          "T6-652: 120 W rated power and 77.5 mm mounting depth.",
        ],
      },
      {
        type: "paragraph",
        text: "Both component models have a nominal impedance of 4 Ω. Installers can compare dimensions and electrical requirements on the <a href=\"/car-audio/speakers/\">speakers page</a> before selecting a model for a vehicle installation.",
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-t3-652-component-set.webp",
        alt: "TEYES T3-652 component set with woofers, crossovers and tweeters",
        caption: "The T3-652 display shows the separate parts of the component speaker set.",
        width: 1200,
        height: 675,
      },
      {
        type: "heading",
        text: "Four-channel and mono amplifiers",
      },
      {
        type: "paragraph",
        text: "The TD amplifier series includes the four-channel TD500/4 and mono TD1000/1. The TD500/4 is specified at 75 W × 4 RMS into 4 Ω, while the TD1000/1 is specified at 350 W × 1 RMS into 4 Ω. The TP800/4 and TP1200/1 add DSP control in four-channel and mono formats respectively.",
      },
      {
        type: "paragraph",
        text: "Choose an amplifier according to the intended channel layout, speaker impedance and power requirements. The <a href=\"/car-audio/amplifiers/\">amplifier comparison</a> lists output at different loads, along with dimensions for installation planning.",
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-td-amplifier.webp",
        alt: "TEYES TD-series amplifier on the exhibition display",
        caption: "A TD-series amplifier on display alongside the new car audio products.",
        width: 1200,
        height: 675,
      },
      {
        type: "heading",
        text: "Enclosed subwoofers and standalone drivers",
      },
      {
        type: "paragraph",
        text: "The TS range includes under-seat enclosed subwoofers. The 8-inch TS-08 measures 284 × 210 × 77 mm; available space and mounting clearance still need to be checked in the intended vehicle. BX models offer other enclosed options, including active sealed, passive sealed and passive ported designs. Compare the <a href=\"/car-audio/enclosed-subwoofers/\">TS and BX enclosed subwoofers</a> for dimensions and configurations.",
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-ts-08-subwoofer.webp",
        alt: "TEYES TS-08 under-seat enclosed subwoofer on display",
        caption: "The TS-08 is an enclosed subwoofer with a specified height of 77 mm.",
        width: 1200,
        height: 675,
      },
      {
        type: "paragraph",
        text: "Standalone drivers are a separate option for installations with a suitable enclosure. The 10-inch 10V8-V4 has 600 W rated power and a nominal impedance of 4 Ω + 4 Ω. Its full specifications are listed with the <a href=\"/car-audio/speakers/#standalone-subwoofer-drivers\">standalone subwoofer drivers</a>.",
      },
      {
        type: "heading",
        text: "See the range in Frankfurt",
      },
      {
        type: "paragraph",
        text: "The car audio range will be on display at Hall 3.1, Booth G85 until September 12. Read <a href=\"/news/exhibitions/automechanika-frankfurt-2026/\">TEYES at Automechanika Frankfurt 2026</a> for the exhibition location and meeting details.",
      },
    ],
  },
  {
    slug: "automechanika-frankfurt-2026",
    category: "exhibitions",
    title: "TEYES at Automechanika Frankfurt 2026",
    date: "2026-09-08",
    updatedAt: "2026-09-09",
    excerpt: "Visit TEYES at Automechanika Frankfurt 2026, September 8–12, Hall 3.1, Booth G85. See head units, car audio and accessories.",
    location: "Messe Frankfurt, Frankfurt am Main, Germany",
    eventDates: "September 8–12, 2026",
    booth: "Hall 3.1, Booth G85",
    image: "/assets/news/automechanika-2026-booth-panorama.webp",
    imageAlt: "TEYES booth with a hanging logo, head unit displays and a speaker driver tower",
    imageWidth: 1200,
    imageHeight: 1200,
    imageCaption: "The TEYES booth at Automechanika Frankfurt, Hall 3.1, Booth G85.",
    cta: {
      title: "Meet TEYES at the show",
      description: "Contact the team with your preferred meeting date and the products you would like to discuss. The exhibition runs until September 12.",
      label: "Arrange a meeting",
      href: "/contact/",
    },
    blocks: [
      {
        type: "paragraph",
        text: "TEYES is exhibiting at Automechanika Frankfurt from September 8 to 12, 2026. Visitors can see its head units, car audio products and accessories at Hall 3.1, Booth G85, and discuss their product requirements with the team.",
      },
      {
        type: "heading",
        text: "Head units on display",
      },
      {
        type: "paragraph",
        text: "The booth has dedicated displays for head unit families including CC4 Pro, CC4 and CC4L. Distributors, retailers and installers can explore the products and discuss vehicle compatibility, accessory requirements and model selection for their market. Model details are available in the <a href=\"/products/\">TEYES head unit range</a>.",
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-cc4-pro-display.webp",
        alt: "TEYES CC4 Pro head unit display with camera accessories",
        caption: "The CC4 Pro demonstration display pairs a head unit with camera accessories.",
        width: 1200,
        height: 675,
      },
      {
        type: "heading",
        text: "New car audio products",
      },
      {
        type: "paragraph",
        text: "The car audio demonstration area brings component and coaxial speakers, TD and TP amplifiers, enclosed subwoofers and TEYES head units together in one display. Visitors can see how the product categories fit into a complete in-car system and discuss model selection with the team. Representative models and specification links are also available in the <a href=\"/news/company/teyes-car-audio-series-launch/\">car audio launch announcement</a>.",
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-audio-demo-large.webp",
        alt: "TEYES car audio demonstration display with speakers, amplifiers, head units and a subwoofer",
        caption: "The Frankfurt display brings speakers, amplifiers, head units and subwoofers together for a complete view of the car audio range.",
        width: 1600,
        height: 900,
      },
      {
        type: "heading",
        text: "Cameras and accessories",
      },
      {
        type: "paragraph",
        text: "The accessory display includes cameras and microphones. Visitors can discuss which accessories are appropriate for their chosen head unit and vehicle, including any installation requirements. Browse the <a href=\"/accessories/\">accessories range</a> before visiting.",
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-accessory-wall.webp",
        alt: "TEYES cameras and microphones arranged on the accessory display wall",
        caption: "The accessory wall brings camera and microphone products together for visitors to compare.",
        width: 1200,
        height: 1200,
      },
      {
        type: "heading",
        text: "Visit TEYES",
      },
      {
        type: "list",
        items: [
          "Event: Automechanika Frankfurt 2026",
          "Dates: September 8–12, 2026",
          "Venue: Messe Frankfurt, Ludwig-Erhard-Anlage 1, 60327 Frankfurt am Main, Germany",
          "TEYES booth: Hall 3.1, Booth G85",
        ],
      },
      {
        type: "paragraph",
        text: "The team is available during the fair to discuss distribution and product requirements with visitors. To arrange a meeting, include your preferred date and the products you would like to discuss when contacting TEYES.",
      },
    ],
  },
];

export const getPopulatedNewsCategories = () =>
  newsCategories.filter((category) => newsArticles.some((article) => article.category === category.id));

export const getArticlesByCategory = (category: NewsCategory) =>
  newsArticles
    .filter((a) => a.category === category)
    .sort((a, b) => b.date.localeCompare(a.date));

export const getArticleBySlug = (slug: string) =>
  newsArticles.find((a) => a.slug === slug);

export const getSortedArticles = () =>
  [...newsArticles].sort((a, b) => b.date.localeCompare(a.date));
