import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { ArrowRight, Star } from "lucide-react";
import { products, seriesInfo, getProductsBySeries } from "@/data/products";
import { useState } from "react";

// Optimized product image component with srcset
function ProductImage({
  src,
  alt,
  className = "",
  priority = false,
  size = "large"
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  size?: "large" | "small";
}) {
  const [loaded, setLoaded] = useState(false);

  // Generate srcset for responsive loading
  const getSrcSet = (baseSrc: string) => {
    // Extract base path without size suffix
    const match = baseSrc.match(/^(.+)-(\d+)\.(\w+)$/);
    if (match) {
      const [, base, , ext] = match;
      return `${base}-400.${ext} 400w, ${base}-800.${ext} 800w, ${base}-1200.${ext} 1200w`;
    }
    return undefined;
  };

  const srcSet = getSrcSet(src);
  const sizes = size === "large"
    ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    : "(max-width: 768px) 96px, 96px";

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 bg-secondary/50 animate-pulse rounded" />
      )}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading={priority ? "eager" : "lazy"}
        width={size === "large" ? 400 : 96}
        height={size === "large" ? 400 : 96}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

const ProductsPage = () => {
  const flagshipProducts = getProductsBySeries("flagship");
  const advancedProducts = getProductsBySeries("advanced");
  const entryProducts = getProductsBySeries("entry");

  return (
    <Layout>
      <SEO
        title="Car Infotainment Products - Android Head Units"
        description="Browse TEYES car infotainment products. From flagship CC4 Pro to entry-level solutions. Android head units with CarPlay, Android Auto, 2K displays, and premium audio."
        keywords="TEYES products, car head unit, android car stereo, CC4 Pro, CC3 2K, CarPlay, Android Auto"
        path="/products/"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />
      <ContextHeader
        title="Android Head Units"
        description="From flagship performance to value-focused entry solutions, find the perfect product for your market."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      {/* Featured Products */}
      <section className="py-10 bg-card">
        <div className="container-wide">
          <h2 className="text-2xl font-display font-bold mb-8">Featured Products</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[flagshipProducts[0], advancedProducts[0], entryProducts[0]].filter(Boolean).map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}/`}
                className="group bg-background rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
                    {product.badge === "NEW" && <Star className="h-3 w-3" />}
                    {product.badge}
                  </div>
                )}

                <div className="aspect-square p-8 bg-gradient-to-b from-secondary/50 to-background flex items-center justify-center overflow-hidden relative">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    size="large"
                    priority={true}
                  />
                </div>

                <div className="p-6">
                  <p className="text-primary text-sm font-medium mb-1">
                    {product.seriesName}
                  </p>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    View Details
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))
            }
          </div>
        </div>
      </section>

      {/* All Series Overview */}
      {Object.entries(seriesInfo).map(([key, info]) => {
        const seriesProducts = getProductsBySeries(key as keyof typeof seriesInfo);
        if (seriesProducts.length === 0) return null;

        return (
          <section key={key} id={key} className="py-10 bg-background border-t border-border/50">
            <div className="container-wide">
              <div className="mb-8">
                <h2 className="text-2xl font-display font-bold">{info.name}</h2>
                <p className="text-muted-foreground">{info.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seriesProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}/`}
                    className="group flex gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all"
                  >
                    <div className="w-24 h-24 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 overflow-hidden">
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        size="small"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {product.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((f) => (
                          <span key={f} className="text-xs px-2 py-0.5 bg-secondary rounded">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))
                }
              </div>
            </div>
          </section>
        );
      })}
    </Layout>
  );
};

export default ProductsPage;
