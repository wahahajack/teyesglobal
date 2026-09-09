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
    description: "No industry articles have been published yet. Read the latest product announcements and exhibition updates from TEYES.",
  },
];

export const newsArticles: NewsArticle[] = [
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
        text: "TEYES is also showing its new speakers, amplifiers and subwoofers in the car audio demonstration area. The range adds audio products alongside TEYES head units. For an overview of the categories, representative models and specification links, read the <a href=\"/news/company/teyes-car-audio-series-launch/\">car audio launch announcement</a>.",
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
