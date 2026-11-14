// News articles for the TEYES Newsroom (/news/).
// Add a new article by appending an entry — listing pages, category pages,
// the article renderer, sitemap and prerender all pick it up automatically.

export type NewsCategory = "company" | "exhibitions" | "industry";

export interface NewsArticleBlock {
  type: "paragraph" | "heading" | "subheading" | "list" | "image" | "table";
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
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
  imageFit?: "contain" | "cover";
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
  slug: "keep-factory-radio-or-replace-head-unit",
  category: "industry",
  title: "Keep the Factory Radio or Replace the Head Unit? A Car Audio Dealer’s Decision Guide",
  date: "2026-11-14",
  updatedAt: "2026-11-14",
  excerpt: "Compare factory-radio retention, a replacement head unit and combined audio upgrades. A practical guide for car audio dealers quoting a customer’s next installation.",
  image: "/assets/news/head-unit-system-routes.svg",
imageFit: "contain",
  imageAlt: "Three planning routes: keep the factory radio, replace the head unit, or plan the interface and audio together",
  imageWidth: 1280,
  imageHeight: 720,
  imageCaption: "Three system-planning routes. This illustration is a decision aid, not a vehicle compatibility diagram.",
  cta: {
    title: "Planning a replacement-head-unit offer?",
    description: "Identify the model and vehicle requirements before discussing availability and commercial terms for your market.",
    label: "Explore TEYES models",
    href: "/products/"
  },
  blocks: [
    {
      type: "paragraph",
      text: "A customer asks for “better car audio.” Before choosing a head unit, find out whether they want better sound, a different dashboard experience, or both. Those are different jobs, and they do not always require the same purchase."
    },
    {
      type: "paragraph",
      text: "<strong>If the customer likes the original radio and wants an audio upgrade, start by looking at ways to keep it. If the screen, controls or connectivity are the problem, assess a replacement head unit. When both need attention, plan the interface and audio upgrades together.</strong> The vehicle’s existing equipment will help determine which route is practical."
    },
    {
      type: "heading",
      text: "Start with the change the customer actually wants"
    },
    {
      type: "paragraph",
      text: "Ask the customer to describe one thing they cannot do today. “I want more bass” is not the same request as “I want to use CarPlay or Android Auto without connecting my phone by cable.” A larger display is not evidence that the speakers need replacing. Equally, a customer happy with the original dashboard may still want a different audio system."
    },
    {
      type: "paragraph",
      text: "Turn that answer into a short job description before presenting products:"
    },
    {
      type: "table",
      headers: [
        "Customer’s priority",
        "Route worth evaluating",
        "Question to settle first"
      ],
      rows: [
        [
          "Audio upgrade while keeping the original interface",
          "Retain the radio and assess the audio integration",
          "Where will the amplifier or processor receive its signal?"
        ],
        [
          "New screen, interface or connectivity",
          "Replacement head unit",
          "Can the proposed installation preserve the functions the customer needs?"
        ],
        [
          "New interface and a broader audio upgrade",
          "Plan both together",
          "What is the complete signal path, and what equipment remains?"
        ]
      ]
    },
    {
      type: "paragraph",
      text: "Use the table to narrow the conversation, then inspect the vehicle. A customer who likes the dashboard should not have to buy a new radio simply because an audio upgrade is being discussed."
    },
    {
      type: "heading",
      text: "When keeping the factory radio makes sense"
    },
    {
      type: "paragraph",
      text: "Retaining the radio does not mean leaving every part of the audio system untouched. A line output converter, often shortened to <strong>LOC</strong>, provides one way to connect a suitable factory speaker-level signal to aftermarket amplification."
    },
    {
      type: "paragraph",
      text: "For example, AudioControl describes its LC2i PRO as a factory-system integration device with speaker-level inputs and preamp outputs. Its manual shows a path from the factory head unit or amplifier through the converter to an aftermarket amplifier. The original radio remains the source; the converter provides a connection to the added amplification. <a href=\"https://audiocontrol.com/products/lc2i-pro-2-channel-line-output-converter-accubass\">AudioControl product information</a> · <a href=\"https://audiocontrol.com/downloads/car/current/lc2i-pro/lc2i-pro-user-manual.pdf\">LC2i PRO manual</a>"
    },
    {
      type: "paragraph",
      text: "Before quoting this route, identify the original system and where the new equipment will receive its signal. The manual’s separate trigger and level settings show why the installer needs to select and configure the connection for the job."
    },
    {
      type: "paragraph",
      text: "On the quote, make “retain the original radio” a clear scope item, then list the functions to check. That gives the customer something more useful than a parts list: an explanation of what stays, what changes and what the installer will verify."
    },
    {
      type: "heading",
      text: "When a replacement head unit answers a different need"
    },
    {
      type: "paragraph",
      text: "If the customer wants a new dashboard interface, the replacement-radio route deserves its own assessment. Adding amplification alone does not install a new head unit or give the existing radio a different operating interface."
    },
    {
      type: "paragraph",
      text: "The <a href=\"https://teyesglobal.com/products/cc4-pro/\">TEYES CC4 Pro product page</a> positions it as a premium Android head unit and lists wireless Apple CarPlay and Android Auto. For a customer specifically seeking those phone connections in a new dashboard unit, that makes CC4 Pro worth evaluating. It answers an interface request, rather than assuming that a new radio alone will deliver the customer’s preferred sound."
    },
    {
      type: "paragraph",
      text: "Check the exact model and configuration, then work through the vehicle’s frame, wiring interface, amplifier, cameras and controls. Ask which functions the customer uses every day and include those in the installation checks. A feature list helps shortlist a product; this vehicle-level assessment turns it into a proposal."
    },
    {
      type: "paragraph",
      text: "For a shop already offering factory-radio retention, replacement head units can serve a different customer request rather than displace that service. Keep both routes available when the business and its installation capabilities justify them."
    },
    {
      type: "heading",
      text: "If the customer wants both, quote one coherent system"
    },
    {
      type: "paragraph",
      text: "Here is a hypothetical showroom conversation:"
    },
    {
      type: "paragraph",
      text: "“I want wireless CarPlay, more bass and to keep the amplifier I already paid for.”"
    },
    {
      type: "paragraph",
      text: "Break that into three requirements rather than immediately quoting a radio-and-subwoofer bundle:"
    },
    {
      type: "list",
      items: [
        "A new interface: assess a head unit offering the requested connection, then check the vehicle installation.",
        "A bass upgrade: ask what the customer wants to change about the present sound and assess the existing audio equipment.",
        "Retain the amplifier: record its exact model and check the proposed signal connection before including retention in the quote."
      ]
    },
    {
      type: "paragraph",
      text: "Give the customer two clearly scoped options if the work is to happen in stages: an interface upgrade now, and a combined interface/audio proposal. For each, show what is included and what still needs inspection. If amplifier retention has not been confirmed, label it “pending compatibility check” rather than silently replacing it or promising it will work."
    },
    {
      type: "paragraph",
      text: "The useful comparison is not just the price of two boxes. It is what each option accomplishes now, what equipment stays and how a later upgrade would fit the plan."
    },
    {
      type: "heading",
      text: "Make the quote easy to understand and the result easy to check"
    },
    {
      type: "paragraph",
      text: "Before ordering, give the customer a concise scope:"
    },
    {
      type: "list",
      items: [
        "Outcome: the interface or audio change being purchased.",
        "Vehicle: model, year, trim and relevant original equipment.",
        "Included items: exact head unit, interfaces, accessories and audio equipment.",
        "Retained functions: what will be checked, rather than assumed.",
        "Acceptance: how the requested features will be demonstrated after installation."
      ]
    },
    {
      type: "paragraph",
      text: "At handover, demonstrate the features the customer bought the upgrade for. For the example above, that includes the requested phone connection and the agreed audio checks, not simply showing that the new screen powers on. Record anything not tested, and keep the exact model and configuration with the job. Installation should be carried out by a qualified installer using the vehicle and equipment instructions."
    },
    {
      type: "heading",
      text: "Common questions"
    },
    {
      type: "subheading",
      text: "Do I need a new head unit to add an amplifier?"
    },
    {
      type: "paragraph",
      text: "Not necessarily. Factory-system integration is one possible route. The correct connection method depends on the vehicle and the equipment; it should be assessed rather than assumed."
    },
    {
      type: "subheading",
      text: "Does a premium head unit guarantee better sound?"
    },
    {
      type: "paragraph",
      text: "No universal outcome follows from a model’s positioning. Evaluate the whole system and the customer’s stated goal, not the head unit in isolation."
    },
    {
      type: "subheading",
      text: "Where does TEYES fit in this decision?"
    },
    {
      type: "paragraph",
      text: "Evaluate TEYES when the job calls for a replacement Android head unit. Review the <a href=\"https://teyesglobal.com/products/\">product range</a> and bring the exact vehicle and required functions into the discussion. Dealers can use the <a href=\"https://teyesglobal.com/contact/\">business enquiry page</a> to discuss models and commercial terms; availability and cooperation arrangements must be confirmed for the relevant market."
    }
  ]
},
  {
    slug: "sony-car-audio-global-exit-transition-timeline",
    category: "industry",
    title: "Sony Car Audio Exit Reports: A Regional Transition Timeline for Head Unit Buyers",
    date: "2026-10-12",
    updatedAt: "2026-11-14",
    excerpt: "Trade reports describe Sony’s withdrawal from aftermarket car audio. Separate regional sales deadlines, dealer support and warranty responsibilities before changing orders or choosing another supplier.",
    image: "/assets/news/automechanika-2026-cc4-pro-navigation.webp",
    imageAlt: "TEYES CC4 PRO head unit display with navigation screen and camera accessories",
    imageWidth: 1200,
    imageHeight: 675,
    imageCaption: "TEYES head units on display. Evaluate any proposed alternative against the customer jobs your business handles.",
    cta: {
      title: "Reviewing your head unit lineup this quarter?",
      description: "Tell the TEYES team where you operate and which models you are considering to discuss specifications, warranty terms and distribution options.",
      label: "Discuss distribution",
      href: "/contact/"
    },
    faq: [
      {
        question: "Is Sony leaving aftermarket car audio worldwide?",
        answer: "ChannelNews reported a worldwide car and marine audio withdrawal. This article distinguishes that trade report from the regional dates reported for North America and Australia; buyers should obtain the notice applicable to their own channel."
      },
      {
        question: "Is a dealer-support cutoff also a warranty expiry date?",
        answer: "No. Sales deadlines, dealer-facing assistance and warranty responsibilities are different matters. Check the written warranty and the relevant regional support arrangements before making promises to a customer."
      },
      {
        question: "Should a dealer place a final order now?",
        answer: "Base the decision on confirmed orders, current stock, the channel’s actual deadline and return terms. A withdrawal announcement alone is not a reason to increase inventory."
      },
      {
        question: "What should buyers verify in another supplier?",
        answer: "Review product lifecycle communication, written support and warranty terms, the update procedure and the exact model’s documentation. Then evaluate a sample against a customer job before committing volume."
      }
    ],
    blocks: [
      {
        type: "paragraph",
        text: "<a href=\"https://www.channelnews.com.au/exclusive-sony-quits-car-audio-big-shock-for-retailers/\">ChannelNews’s October 7 report</a> describes Sony’s aftermarket car and marine audio withdrawal as worldwide and reports that Australian retailers received a written notice. The practical task for a buyer is regional: identify which notice applies to the products and channel you use."
      },
      {
        type: "paragraph",
        text: "Our <a href=\"/news/industry/sony-exit-north-america-head-unit-supplier-checklist/\">supplier checklist</a> covers how to evaluate another line. This timeline focuses on managing existing orders and support commitments without confusing the two decisions."
      },
      {
        type: "heading",
        text: "Separate sales, dealer support and warranty"
      },
      {
        type: "paragraph",
        text: "For North America, <a href=\"https://www.ceoutlook.com/2026/09/30/sony-car-audio-exits-the-north-american-market/\">CEoutlook’s September 30 report</a> reports sales through December 31, 2026 and field, sales and technical support for industry partners through March 2027. It also says end-users can contact Sony directly from January 2027. That is a contact arrangement, not a statement that support only begins then."
      },
      {
        type: "paragraph",
        text: "For Australia, <a href=\"https://www.channelnews.com.au/exclusive-sony-quits-car-audio-big-shock-for-retailers/\">ChannelNews’s October 7 report</a> reports shipments through December 31, 2026 and describes local dealer assistance as continuing until spring 2027. Obtain an exact regional support date rather than converting that seasonal wording into a global deadline. Neither report establishes when every retailer will sell its remaining stock."
      },
      {
        type: "heading",
        text: "Turn the dates into an order and service plan"
      },
      {
        type: "list",
        items: [
          "List confirmed customer orders, unsold units and proposed purchases separately. Check which orders the channel will accept and deliver before committing stock.",
          "Record warranty responsibility, claim procedure and return rights for the products you buy. A dealer-support cutoff is not itself a warranty expiry.",
          "Identify the service promises your shop has already made. Keep the support contact and required documents with those jobs, including the path for assistance after channel arrangements change.",
          "If another line is worth evaluating, start with the installation jobs you expect to handle. Compare a sample and its support package before placing a larger order."
        ]
      },
      {
        type: "paragraph",
        text: "A withdrawal can prompt a supplier review without proving that a particular shop is short of stock or wants another brand. Your enquiries, inventory and installation capacity should determine the next step. Avoid forecasting clearance prices as if they were already observed."
      },
      {
        type: "heading",
        text: "Evaluate the proposed replacement on its own merits"
      },
      {
        type: "paragraph",
        text: "For a TEYES proposal, start with the exact model and installation package. The <a href=\"https://www.teyes.uk/pages/firmwares\">TEYES UK firmware page</a> identifies the CC4 range as OTA-only and lists separate resources for other models. Confirm the update and recovery procedure for the unit being ordered. Bring the intended vehicle, accessories and destination market into the discussion, rather than treating a series name as proof of integration or compliance."
      },
      {
        type: "paragraph",
        text: "A product shortlist is only the beginning. Use the <a href=\"/news/industry/sony-exit-north-america-head-unit-supplier-checklist/\">sample-evaluation method and blank record</a> to distinguish supplier statements from what your shop has actually checked. That record is more useful for the next order than a broad claim that one brand replaces another."
      },
      {
        type: "heading",
        text: "The next decision"
      },
      {
        type: "paragraph",
        text: "Keep the existing-customer service plan separate from the new-supplier decision. Order against known commitments, document the support route and evaluate an alternative only where it fits your business."
      },
      {
        type: "paragraph",
        text: "Contact the TEYESGLOBAL team to discuss the proposed model, intended market and cooperation terms. Record the agreed availability, installation requirements and support responsibilities with the proposed order."
      }
    ]
  },
  {
    slug: "sony-exit-north-america-head-unit-supplier-checklist",
    category: "industry",
    title: "Sony Exits North American Car Audio: A Supplier Checklist for Head Unit Buyers",
    date: "2026-10-07",
    updatedAt: "2026-11-14",
    excerpt: "CEoutlook reports Sony’s North American aftermarket car audio withdrawal. A practical checklist for evaluating supply, support, specifications and an Android head unit sample before stocking it.",
    image: "/assets/news/automechanika-2026-cc4-pro-counter-large.webp",
    imageAlt: "TEYES CC4 PRO head unit with camera and microphone accessories on display at Automechanika Frankfurt 2026",
    imageWidth: 1280,
    imageHeight: 720,
    imageCaption: "The CC4 PRO head unit and camera accessories on the TEYES stand at Automechanika Frankfurt 2026.",
    cta: {
      title: "Evaluating your head unit lineup?",
      description: "Tell the TEYES team where you operate and which models you are considering to discuss specifications, warranty terms and distribution options.",
      label: "Discuss distribution",
      href: "/contact/"
    },
    faq: [
      {
        question: "Has Sony announced a North American aftermarket car audio exit?",
        answer: "CEoutlook reported the withdrawal on September 30, 2026, citing an industry email. Buyers should confirm the notice and order arrangements with their regional channel."
      },
      {
        question: "Does the reported dealer-support deadline end existing warranties?",
        answer: "Do not treat it as a warranty expiry. Check who handles claims, the applicable written terms and the regional contact route. Sales deadlines and dealer-facing assistance are separate from warranty responsibilities."
      },
      {
        question: "Does this mean every dealer needs another supplier?",
        answer: "No. Review actual enquiries, current inventory and installation capabilities. A supplier review may be worthwhile, but an exit announcement does not establish demand at a particular shop."
      },
      {
        question: "What should a distributor ask a new head unit supplier first?",
        answer: "Start with lifecycle and supply information, written support and warranty terms, and the exact model’s documentation. Then evaluate the proposed installation with a sample and record what was actually demonstrated."
      }
    ],
    blocks: [
      {
        type: "paragraph",
        text: "<a href=\"https://www.ceoutlook.com/2026/09/30/sony-car-audio-exits-the-north-american-market/\">CEoutlook’s September 30 report</a> says Sony is leaving North American aftermarket car audio. It reports sales through December 31, 2026, field, sales and technical support for industry partners through March 2027, and a direct end-user contact route from January 2027. Confirm the arrangements for your channel, including warranty handling, before changing orders."
      },
      {
        type: "paragraph",
        text: "For a distributor or installer, the useful question is which customer jobs a proposed supplier can help you serve. Start with your existing stock, enquiries and installation capabilities. Another brand is worth considering when it fills a concrete role, not simply because a familiar name is leaving."
      },
      {
        type: "heading",
        text: "A checklist for evaluating a replacement supplier"
      },
      {
        type: "paragraph",
        text: "Use these questions to shortlist a line. Then test the proposed package against an installation your business expects to handle."
      },
      {
        type: "list",
        items: [
          "Supply continuity. How are lifecycle changes, final-order dates and replacement models communicated? Obtain the terms for the product you intend to stock.",
          "Warranty and support. Who handles a claim in your market, what documents are needed, and which costs or exclusions apply? Keep the written terms with the order.",
          "Software and firmware. Ask how updates are delivered for the exact model, what recovery procedure is available if an update fails, who assists and whether any charges apply.",
          "Verifiable specifications. Record the chipset, RAM and storage for the proposed SKU, then compare the supplied documentation with the sample received. Resolve discrepancies before quoting the product.",
          "Fitment and integration. Identify the vehicle, year, trim, interfaces and functions to retain. Assess the exact package rather than assuming that every configuration supports the same cameras, controls or audio equipment.",
          "Market documentation. Establish which requirements apply to the product and destination, then request documents identifying the proposed model and configuration. Have the responsible compliance specialist assess their applicability before import or sale."
        ]
      },
      {
        type: "paragraph",
        text: "For a TEYES proposal, start with the exact model and installation package. The <a href=\"https://www.teyes.uk/pages/firmwares\">TEYES UK firmware page</a> identifies the CC4 range as OTA-only and lists separate resources for other models. Confirm the update and recovery procedure for the unit being ordered. Bring the intended vehicle, accessories and destination market into the discussion, rather than treating a series name as proof of integration or compliance."
      },
      {
        type: "heading",
        text: "How to evaluate an Android head unit sample before stocking it"
      },
      {
        type: "paragraph",
        text: "A supplier’s answers help you decide what to investigate. A sample evaluation helps you decide what you can confidently offer customers. Keep the two separate: a specification sheet describes the proposed product; your record shows what happened with the particular unit and installation you checked."
      },
      {
        type: "paragraph",
        text: "Start with one customer job your shop expects to handle. Write down the requested outcome, the vehicle and the equipment that must stay. Then evaluate that job, rather than trying to prove every feature on the box in one sitting."
      },
      {
        type: "subheading",
        text: "Define the sample, not just the brand"
      },
      {
        type: "paragraph",
        text: "Record the exact model, configuration and software version, along with the accessories supplied for the proposed installation. Include the vehicle’s model year, trim and relevant original equipment. If you are comparing two samples, use the same requested outcome and record any differences in the test setup."
      },
      {
        type: "paragraph",
        text: "For a TEYES enquiry, identify the model from the <a href=\"/products/\">product range</a> before asking about the package. A familiar series name is not a substitute for the configuration you intend to order."
      },
      {
        type: "subheading",
        text: "Use a result sheet that separates claims from observations"
      },
      {
        type: "paragraph",
        text: "Copy this structure into your sample record. The prompts below are things to check, not claims that a given unit supports them."
      },
      {
        type: "table",
        headers: [
          "Check",
          "Record before evaluation",
          "Record after evaluation"
        ],
        rows: [
          [
            "Requested phone connection",
            "Phone, software version and wired or wireless connection required",
            "What connected, under which setup, and any unresolved behaviour"
          ],
          [
            "Functions the customer wants to retain",
            "Named controls, camera or original audio equipment",
            "Which were demonstrated, which were not, and the setup used"
          ],
          [
            "Installation package",
            "Exact unit and accessories proposed for this vehicle",
            "Items used, missing items and unanswered compatibility questions"
          ],
          [
            "Support request",
            "One specific question with model and configuration details",
            "Response received, supporting document and unresolved next step"
          ]
        ]
      },
      {
        type: "paragraph",
        text: "Use <strong>pass</strong>, <strong>fail</strong> or <strong>not tested</strong> against a stated requirement. Add the observation that explains the result. “Pass” on its own tells the next installer very little; “not tested” is not a failure, but neither is it confirmation."
      },
      {
        type: "paragraph",
        text: "Keep supplier statements in their own column. If a supplier says a function is supported but you have not checked it, preserve both facts. That prevents a brochure claim from becoming an assumed workshop result."
      },
      {
        type: "subheading",
        text: "Turn an unresolved result into a useful question"
      },
      {
        type: "paragraph",
        text: "Suppose your intended package includes a customer’s original camera, but the sample evaluation did not demonstrate it. Do not write “camera compatible” on the quotation. Ask which interface and configuration are required for that vehicle, what evidence supports the proposed arrangement and what the installer should verify."
      },
      {
        type: "paragraph",
        text: "Record who will answer and what would settle the question. A reply that names a different vehicle or configuration does not resolve this one. Integration work should be assessed and performed by a qualified installer using the relevant vehicle and equipment instructions."
      },
      {
        type: "paragraph",
        text: "This is a suggested evaluation method, not a report of a TEYES vehicle test. Leave the result fields empty until your shop has observations to enter."
      },
      {
        type: "subheading",
        text: "Decide what the sample allows you to offer"
      },
      {
        type: "paragraph",
        text: "At the end, separate three outcomes:"
      },
      {
        type: "list",
        items: [
          "Suitable for the checked job: the requirements you defined were demonstrated in the recorded setup.",
          "Further evaluation needed: a required function, accessory or answer remains unresolved.",
          "Not suitable for that job: the evaluated arrangement did not meet a requirement you need."
        ]
      },
      {
        type: "paragraph",
        text: "A successful sample does not establish compatibility with every vehicle or every configuration in the range. Keep the record with the proposed order, and revisit the affected checks if the model, accessories or software change."
      },
      {
        type: "paragraph",
        text: "The goal is a clear next decision, not a long checklist with every box ticked. Bring the sample model, intended vehicle, recorded observations and unresolved questions to the <a href=\"/solutions/distributors/\">TEYES distributor discussion</a>. Confirm availability and cooperation terms for your market separately from the technical evaluation."
      },
      {
        type: "paragraph",
        text: "<a href=\"/downloads/head-unit-sample-evaluation-record.csv\" download>Download the blank sample evaluation record (CSV)</a>. This worksheet contains no test results; complete it with observations from your own evaluation."
      },
      {
        type: "heading",
        text: "The bottom line"
      },
      {
        type: "paragraph",
        text: "A useful supplier decision connects three things: a customer job you can identify, a product package you have evaluated and support terms you can explain. Use the checklist to choose what to investigate, and the sample record to decide what you can confidently offer."
      },
      {
        type: "paragraph",
        text: "Contact the TEYESGLOBAL team to discuss the proposed model, intended market and cooperation terms. Record the agreed availability, installation requirements and support responsibilities with the proposed order."
      }
    ]
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
