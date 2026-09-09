import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
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
  if (block.type === "image") {
    return (
      <figure className="my-8">
        <img
          src={block.src}
          alt={block.alt ?? ""}
          width={block.width}
          height={block.height}
          loading="lazy"
          className="w-full max-w-2xl mx-auto rounded-2xl border border-border/50 object-cover"
        />
        {block.caption && (
          <figcaption className="text-center text-xs text-muted-foreground mt-3">
            {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }
  // Paragraph text is authored in news.ts (internal content, no user input),
  // so inline HTML for links is rendered intentionally.
  return (
    <p
      className="my-4 text-muted-foreground leading-relaxed [&_a]:text-primary [&_a]:underline hover:[&_a]:text-primary/80"
      dangerouslySetInnerHTML={{ __html: block.text ?? "" }}
    />
  );
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
    dateModified: article.updatedAt ?? article.date,
    url,
    image: new URL(article.image, BASE_URL).href,
    author: { "@type": "Organization", "@id": `${BASE_URL}/#organization`, name: "TEYES", url: `${BASE_URL}/about/` },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "TEYES",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.webp` },
    },
    ...(article.location
      ? {
          contentLocation: {
            "@type": "Place",
            name: article.location,
          },
        }
      : {}),
    mainEntityOfPage: url,
  });

  const related = getSortedArticles().filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <Layout>
      <SEO
        title={article.title}
        description={article.excerpt}
        path={`/news/${article.category}/${article.slug}/`}
        ogType="article"
        image={article.image}
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
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </span>
            {article.updatedAt && article.updatedAt !== article.date && (
              <span>Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></span>
            )}
            <span>By <Link to="/about/" className="text-primary hover:underline">TEYES</Link></span>
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
                alt={article.imageAlt}
                width={article.imageWidth}
                height={article.imageHeight}
                loading="eager"
                className="w-full h-auto max-h-[32rem] object-contain mx-auto rounded-2xl border border-border/50"
              />
              {article.imageCaption && <figcaption className="text-center text-xs text-muted-foreground mt-3">{article.imageCaption}</figcaption>}
            </figure>
          )}

          {/* Body */}
          {article.blocks.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))}

          {/* Related reading */}
          <nav
            className="mt-12 pt-8 border-t border-border/50 grid sm:grid-cols-2 gap-4"
            aria-label="Related news"
          >
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/news/${item.category}/${item.slug}/`}
                className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors"
              >
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  Related news <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="block font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="mt-8 rounded-2xl bg-secondary/40 p-8 text-center">
            <h2 className="font-display font-bold text-lg mb-2">
              {article.cta.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {article.cta.description}
            </p>
            <Button variant="hero" asChild>
              <Link to={article.cta.href}>{article.cta.label}</Link>
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default NewsArticlePage;
