import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import {
  newsCategories,
  getPopulatedNewsCategories,
  getSortedArticles,
  getArticlesByCategory,
  type NewsArticle,
  type NewsCategory,
} from "@/data/news";
import NotFound from "@/pages/NotFound";

const isCategory = (value: string): value is NewsCategory =>
  newsCategories.some((c) => c.id === value);

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export const NewsCard = ({ article }: { article: NewsArticle }) => {
  const categoryName =
    newsCategories.find((c) => c.id === article.category)?.name ??
    article.category;

  return (
    <Link
      to={`/news/${article.category}/${article.slug}/`}
      className="group flex flex-col rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {/* Image / placeholder banner */}
      <div className="h-44 bg-gradient-to-br from-secondary/60 to-card relative overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.imageAlt}
            width={article.imageWidth}
            height={article.imageHeight}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-3xl text-primary/15 uppercase tracking-widest">
              TEYES
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/90 text-xs font-medium text-foreground">
          {categoryName}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(article.date)}
          </span>
          {article.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {article.location}
            </span>
          )}
        </div>
        <h2 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h2>
        <p className="text-sm text-muted-foreground flex-1">
          {article.excerpt}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4">
          Read more <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
};

const NewsPage = () => {
  const { category } = useParams<{ category: string }>();

  if (category && !isCategory(category)) {
    return <NotFound />;
  }

  const activeCategory = category
    ? newsCategories.find((c) => c.id === category)
    : undefined;
  const articles = category
    ? getArticlesByCategory(category as NewsCategory)
    : getSortedArticles();

  const seoTitle = activeCategory
    ? `${activeCategory.name} - TEYES News`
    : "TEYES News | Product and Exhibition Updates";
  const seoDescription = activeCategory
    ? activeCategory.description
    : "Read TEYES product announcements and exhibition updates, including the car audio launch at Automechanika Frankfurt 2026.";

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDescription}
        noindex={articles.length === 0}
        followWhenNoindex
        path={category ? `/news/${category}/` : "/news/"}
        breadcrumbs={
          category
            ? [
                { label: "Home", href: "/" },
                { label: "News", href: "/news/" },
                { label: activeCategory!.name },
              ]
            : [{ label: "Home", href: "/" }, { label: "News" }]
        }
      />
      <ContextHeader
        title={activeCategory ? activeCategory.name : "News & Events"}
        description={
          activeCategory
            ? activeCategory.description
            : "Product announcements and exhibition updates from TEYES."
        }
        breadcrumbs={
          category
            ? [
                { label: "Home", href: "/" },
                { label: "News", href: "/news/" },
                { label: activeCategory!.name },
              ]
            : [{ label: "Home", href: "/" }, { label: "News" }]
        }
      />

      {/* Category tabs */}
      <section className="py-8 bg-background border-b border-border/50">
        <div className="container-wide flex flex-wrap gap-2">
          <Link
            to="/news/"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </Link>
          {getPopulatedNewsCategories().map((c) => (
            <Link
              key={c.id}
              to={`/news/${c.id}/`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === c.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Article grid */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg mb-2">There are no articles in this category yet.</p>
              <p className="text-sm">
                Read our product announcements and exhibition updates.
              </p>
              <Link to="/news/" className="inline-block mt-4 text-primary underline">Browse all news</Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default NewsPage;
