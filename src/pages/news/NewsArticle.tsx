import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import {
  newsCategories,
  getArticleBySlug,
  getSortedArticles,
  type NewsArticleBlock,
} from "@/data/news";
import NotFound from "@/pages/NotFound";

const BASE_URL = "https://teyesglobal.com";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

const BlockRenderer = ({ block }: { block: NewsArticleBlock }) => {
  if (block.type === "heading") {
    return (
      <h2 className="text-xl md:text-2xl font-display font-bold mt-10 mb-4">
        {block.text}
      </h2>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="my-4 space-y-2">
        {block.items?.map((item) => (
          <li key={item} className="flex items-start gap-3 text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="my-4 text-muted-foreground leading-relaxed">{block.text}</p>;
};

const NewsArticlePage = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article || article.category !== category) {
    return <NotFound />;
  }

  const categoryMeta = newsCategories.find((c) => c.id === article.category);
  const url = `${BASE_URL}/news/${article.category}/${article.slug}/`;

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    url,
    image: article.image ?? `${BASE_URL}/og-image.webp`,
    author: { "@type": "Organization", name: "TEYES", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "TEYES",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.webp` },
    },
    ...(article.location ? { locationCreated: article.location } : {}),
    mainEntityOfPage: url,
  });

  const sorted = getSortedArticles();
  const currentIndex = sorted.findIndex((a) => a.slug === article.slug);
  const prev = currentIndex > 0 ? sorted[currentIndex - 1] : undefined;
  const next =
    currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : undefined;

  return (
    <Layout>
      <SEO
        title={article.title}
        description={article.excerpt}
        path={`/news/${article.category}/${article.slug}/`}
        ogType="article"
        schema={articleSchema}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news/" },
          {
            label: categoryMeta?.name ?? article.category,
            href: `/news/${article.category}/`,
          },
          { label: article.title },
        ]}
      />
      <ContextHeader
        title={article.title}
        description=""
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news/" },
          {
            label: categoryMeta?.name ?? article.category,
            href: `/news/${article.category}/`,
          },
          { label: "Article" },
        ]}
      />

      <article className="py-12 bg-background">
        <div className="container-wide max-w-3xl">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border/50">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDate(article.date)}
            </span>
            {article.eventDates && (
              <span className="inline-flex items-center gap-1.5">
                Event: {article.eventDates}
              </span>
            )}
            {article.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {article.location}
              </span>
            )}
            {article.booth && (
              <span className="inline-flex items-center gap-1.5">
                {article.booth}
              </span>
            )}
          </div>

          {/* Hero image */}
          {article.image && (
            <figure className="mb-10">
              <img
                src={article.image}
                alt={article.title}
                width={1600}
                height={2844}
                loading="eager"
                className="w-full max-w-2xl mx-auto rounded-2xl border border-border/50 object-cover"
              />
              <figcaption className="text-center text-xs text-muted-foreground mt-3">
                The TEYES booth at Automechanika Frankfurt 2026 — Hall 3.1,
                Booth G85
              </figcaption>
            </figure>
          )}

          {/* Body */}
          {article.blocks.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))}

          {/* Prev / Next */}
          <nav
            className="mt-12 pt-8 border-t border-border/50 grid sm:grid-cols-2 gap-4"
            aria-label="More articles"
          >
            {prev ? (
              <Link
                to={`/news/${prev.category}/${prev.slug}/`}
                className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors"
              >
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </span>
                <span className="block font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={`/news/${next.category}/${next.slug}/`}
                className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors sm:text-right"
              >
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="block font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>

          {/* CTA */}
          <div className="mt-8 rounded-2xl bg-secondary/40 p-8 text-center">
            <h2 className="font-display font-bold text-lg mb-2">
              Interested in Partnering With TEYES?
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Talk to our team about distribution, OEM/ODM, or market entry.
            </p>
            <Button variant="hero" asChild>
              <Link to="/contact/">Contact Us</Link>
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default NewsArticlePage;
