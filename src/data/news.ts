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
  excerpt: string;
  image?: string;
  location?: string;
  eventDates?: string;
  booth?: string;
  blocks: NewsArticleBlock[];
}

export const newsCategories: {
  id: NewsCategory;
  name: string;
  description: string;
}[] = [
  {
    id: "company",
    name: "Company News",
    description:
      "Official announcements from TEYES — product launches, partnerships, and company milestones.",
  },
  {
    id: "exhibitions",
    name: "Exhibitions & Events",
    description:
      "Where to meet TEYES around the world — trade shows, expos, and event highlights.",
  },
  {
    id: "industry",
    name: "Industry Insights",
    description:
      "Analysis and trends shaping the automotive infotainment and aftermarket industry.",
  },
];

export const newsArticles: NewsArticle[] = [
  {
    slug: "teyes-car-audio-series-launch",
    category: "company",
    title:
      "TEYES Launches Car Audio Series: Speakers, Amplifiers, and Subwoofers for Complete In-Car Sound",
    date: "2026-09-08",
    excerpt:
      "TEYES has launched its new car audio series — component and coaxial speakers, Class D amplifiers, and enclosed subwoofers. Debuted at Automechanika Frankfurt 2026, the series extends the TEYES ecosystem from infotainment into complete in-car sound systems.",
    image: "/assets/news/automechanika-2026-audio-demo-large.webp",
    blocks: [
      {
        type: "paragraph",
        text: "TEYES has officially launched its car audio series, debuting the lineup at Automechanika Frankfurt 2026 (September 8–12, Messe Frankfurt, Hall 3.1, Booth G85). Building on a decade-plus of infotainment engineering, TEYES is extending its product ecosystem from screens and software into complete in-car sound systems.",
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-audio-demo-large.webp",
        alt: "TEYES car audio demo station at Automechanika Frankfurt 2026 — speakers, head unit and subwoofer on a lit display podium",
        caption: "The TEYES car audio demo station at the Frankfurt debut — speakers, a TEYES head unit, and a subwoofer playing in a live setup",
        width: 1600,
        height: 900,
      },
      {
        type: "heading",
        text: "Three Categories, One Ecosystem",
      },
      {
        type: "paragraph",
        text: "The new series covers three product categories: speakers, amplifiers, and subwoofers. The speaker lineup includes 6.5-inch component sets (T3-652, T6-652, T6-653A) and active 3-way models (T6-803A), plus coaxial speakers (T3-65X, T6-65X) — full specs are on the <a href=\"/car-audio/speakers/\">TEYES speakers page</a>. Amplifiers span the Class D TD series (TD500/4 four-channel, TD1000/1 mono) and the DSP-controlled TP series (TP800/4, TP1200/1) — see the <a href=\"/car-audio/amplifiers/\">amplifier comparison</a>. For bass, the lineup ranges from compact TS-08 and TS-10 under-seat enclosures to BX-series boxed subwoofers — details on the <a href=\"/car-audio/enclosed-subwoofers/\">enclosed subwoofer page</a>.",
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-audio-wall.webp",
        alt: "TEYES exhibition wall at Automechanika Frankfurt 2026 showing head units, amplifiers and subwoofers on three display shelves",
        caption: "The TEYES audio wall at the launch — head units on top, TD-series amplifiers in the middle, and subwoofers below",
        width: 1200,
        height: 2133,
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-audio-showcase.webp",
        alt: "Panorama of the TEYES car audio showcase at Automechanika Frankfurt 2026 — rotating subwoofer tower, speaker and amplifier shelves, and the demo speaker",
        caption: "The full car audio showcase — subwoofer driver tower on the left, speaker and amplifier wall in the center, demo speaker on the right",
        width: 1200,
        height: 2133,
      },
      {
        type: "paragraph",
        text: "Together with TEYES head units — including flagship models with multi-channel DSP audio output — the new lineup lets drivers upgrade their entire sound system under one brand, with one support channel, and with vehicle-fitment know-how backed by TEYES localization experience in 100+ markets.",
      },
      {
        type: "paragraph",
        text: "For distributors and retailers, the car audio series opens a higher-margin accessory category alongside head units, while OEM/ODM partners can develop custom-branded audio programs on the same platforms. Wholesale buyers can <a href=\"/contact/\">contact the TEYES team</a> for the current model list and channel terms.",
      },
      {
        type: "paragraph",
        text: "The series debuted live at the TEYES demonstration area, Hall 3.1, Booth G85, throughout Automechanika Frankfurt 2026. Read the <a href=\"/news/exhibitions/automechanika-frankfurt-2026/\">full exhibition report</a> for booth details and how to meet the team.",
      },
    ],
  },
  {
    slug: "automechanika-frankfurt-2026",
    category: "exhibitions",
    title:
      "TEYES Exhibits at Automechanika Frankfurt 2026 and Launches New Car Audio Series",
    date: "2026-09-08",
    excerpt:
      "TEYES is exhibiting at Automechanika Frankfurt 2026 (September 8–12, Messe Frankfurt, Hall 3.1, Booth G85) and using the show to launch its new car audio series — speakers, amplifiers, and subwoofers that extend the TEYES ecosystem from infotainment to complete in-car sound systems.",
    location: "Messe Frankfurt, Frankfurt am Main, Germany",
    eventDates: "September 8–12, 2026",
    booth: "Hall 3.1, Booth G85",
    image: "/assets/news/automechanika-2026-booth-1-large.webp",
    blocks: [
      {
        type: "paragraph",
        text: "TEYES is exhibiting at Automechanika Frankfurt 2026, the world's leading trade fair for the automotive aftermarket, taking place September 8–12, 2026 at Messe Frankfurt, Germany. The 2026 edition brings together more than 4,400 exhibitors from over 80 countries across roughly 300,000 square metres of exhibition space.",
      },
      {
        type: "paragraph",
        text: "At the show, TEYES is presenting its full range of Android smart infotainment systems for the automotive aftermarket — from entry-level head units to flagship large-screen solutions — alongside accessories and OEM/ODM capabilities for partners who want custom-branded products.",
      },
      {
        type: "heading",
        text: "Head Units on Display: From Flagship to Entry",
      },
      {
        type: "paragraph",
        text: "The TEYES booth dedicates a display island to each head unit family, letting visitors compare the lineup hands-on — from the AI-powered flagship down to the entry tier.",
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-cc4-pro-display.webp",
        alt: "TEYES CC4 Pro display island at Automechanika Frankfurt 2026 — live head unit, AI dashboard on screen and camera accessories",
        caption: "The CC4 Pro island — the TEYES flagship on live display with its camera accessories",
        width: 1200,
        height: 675,
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-cc4-pro-navigation.webp",
        alt: "TEYES CC4 Pro running split-screen navigation and surround-view camera interface at Automechanika Frankfurt 2026",
        caption: "CC4 Pro live demo — split-screen navigation with surround-view 360° camera support",
        width: 1200,
        height: 675,
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-cc4-display.webp",
        alt: "TEYES CC4 display island at Automechanika Frankfurt 2026 with live unit and accessory lineup",
        caption: "The CC4 island — performance tier",
        width: 1200,
        height: 675,
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-cc4l-display.webp",
        alt: "TEYES CC4L display island at Automechanika Frankfurt 2026 — entry-level head unit with accessory suite",
        caption: "The CC4L island — entry-level smart infotainment with 3D-ready dynamic interface",
        width: 1200,
        height: 675,
      },
      {
        type: "heading",
        text: "Headline News: TEYES Car Audio Series Launches at the Show",
      },
      {
        type: "paragraph",
        text: "The headline announcement at this year's booth is the world debut of the TEYES car audio series — speakers, amplifiers, and subwoofers that extend the TEYES ecosystem from infotainment into complete in-car sound systems. Visitors can experience the new lineup live at the demonstration area throughout the fair.",
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-audio-demo-large.webp",
        alt: "TEYES car audio demo station at Automechanika Frankfurt 2026 — speakers, head unit and subwoofer on a lit display podium",
        caption: "The TEYES car audio demo station at Hall 3.1, Booth G85 — part of the world debut of the new speaker, amplifier and subwoofer series",
        width: 1600,
        height: 900,
      },
      {
        type: "paragraph",
        text: "For the full product lineup — component and coaxial speakers, TD and TP Class D amplifiers, and TS / BX subwoofers — read the <a href=\"/news/company/teyes-car-audio-series-launch/\">official car audio series launch announcement</a>.",
      },
      {
        type: "heading",
        text: "Digital Cameras and Accessories",
      },
      {
        type: "paragraph",
        text: "Alongside head units and the new audio series, TEYES is showcasing its growing accessory ecosystem at the booth — digital camera and microphone products that extend the infotainment system into a complete vehicle electronics platform.",
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-front-adas-camera.webp",
        alt: "TEYES front ADAS camera on display at Automechanika Frankfurt 2026",
        caption: "TEYES front ADAS camera",
        width: 1200,
        height: 675,
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-rear-adas-camera.webp",
        alt: "TEYES rear ADAS camera with 1080P digital output on display at Automechanika Frankfurt 2026",
        caption: "TEYES rear ADAS camera — 1080P digital",
        width: 1200,
        height: 675,
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-rear-360-camera.webp",
        alt: "TEYES rear 360-degree camera on display at Automechanika Frankfurt 2026",
        caption: "TEYES rear 360° camera",
        width: 1200,
        height: 675,
      },
      {
        type: "image",
        src: "/assets/news/automechanika-2026-digital-mic.webp",
        alt: "TEYES digital microphone on display at Automechanika Frankfurt 2026",
        caption: "TEYES digital microphone for in-car voice and calls",
        width: 1200,
        height: 675,
      },
      {
        type: "paragraph",
        text: "The camera lineup includes a front ADAS camera for advanced driver assistance features, a rear ADAS camera with 1080P digital output, and a rear 360° camera for surround-view parking — all designed to integrate with TEYES head units. A digital microphone rounds out the lineup for clear in-car voice control and hands-free calls.",
      },
      {
        type: "heading",
        text: "Meet the TEYES Team",
      },
      {
        type: "paragraph",
        text: "Our team is on site throughout the five-day event to meet distributors, retailers, workshop networks, and auto brands. Visitors can explore live product demonstrations, discuss distribution partnerships, and learn about TEYES OEM/ODM services including customization, certification support, and regional market adaptation.",
      },
      {
        type: "heading",
        text: "Why Automechanika Matters",
      },
      {
        type: "paragraph",
        text: "Held every two years since 1971, Automechanika Frankfurt is the flagship event of the global Automechanika brand and the industry's central meeting place for manufacturers, suppliers, distributors, and service providers across the entire automotive value chain. The previous edition in 2024 welcomed around 4,200 exhibitors and approximately 108,000 trade visitors from 172 countries.",
      },
      {
        type: "heading",
        text: "Visit Us",
      },
      {
        type: "list",
        items: [
          "Event: Automechanika Frankfurt 2026",
          "Dates: September 8–12, 2026 (9:00–18:00; 9:00–17:00 on September 12)",
          "Venue: Messe Frankfurt, Ludwig-Erhard-Anlage 1, 60327 Frankfurt am Main, Germany",
          "TEYES Booth: Hall 3.1, Booth G85",
        ],
      },
      {
        type: "paragraph",
        text: "Interested in scheduling a meeting with our team during the fair? Contact us through our contact page and mention Automechanika Frankfurt 2026.",
      },
    ],
  },
];

export const getArticlesByCategory = (category: NewsCategory) =>
  newsArticles
    .filter((a) => a.category === category)
    .sort((a, b) => b.date.localeCompare(a.date));

export const getArticleBySlug = (slug: string) =>
  newsArticles.find((a) => a.slug === slug);

export const getSortedArticles = () =>
  [...newsArticles].sort((a, b) => b.date.localeCompare(a.date));
