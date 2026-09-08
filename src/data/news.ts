// News articles for the TEYES Newsroom (/news/).
// Add a new article by appending an entry — listing pages, category pages,
// the article renderer, sitemap and prerender all pick it up automatically.

export type NewsCategory = "company" | "exhibitions" | "industry";

export interface NewsArticleBlock {
  type: "paragraph" | "heading" | "list";
  text?: string;
  items?: string[];
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
    slug: "automechanika-frankfurt-2026",
    category: "exhibitions",
    title:
      "TEYES Exhibits at Automechanika Frankfurt 2026, the World's Leading Automotive Aftermarket Trade Fair",
    date: "2026-09-08",
    excerpt:
      "TEYES is exhibiting at Automechanika Frankfurt 2026 (September 8–12, Messe Frankfurt), presenting its Android smart infotainment lineup to distributors, retailers, and industry partners from 80+ countries.",
    location: "Messe Frankfurt, Frankfurt am Main, Germany",
    eventDates: "September 8–12, 2026",
    booth: "Booth details to be announced",
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
          "TEYES Booth: [Hall / Booth number to be confirmed — update before publishing]",
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
