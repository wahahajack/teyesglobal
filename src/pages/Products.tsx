import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { products, seriesInfo, getProductsBySeries } from "@/data/products";

const ProductsPage = () => {
  const flagshipProducts = getProductsBySeries("flagship");
  const advancedProducts = getProductsBySeries("advanced");
  const entryProducts = getProductsBySeries("entry");

  return (
    <Layout>
      <ContextHeader
        title="Products"
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
                to={`/products/${product.id}`}
                className="group bg-background rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
                    {product.badge === "NEW" && <Star className="h-3 w-3" />}
                    {product.badge}
                  </div>
                )}

                <div className="aspect-square p-8 bg-gradient-to-b from-secondary/50 to-background flex items-center justify-center overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
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
            ))}
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
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-display font-bold">{info.name}</h2>
                  <p className="text-muted-foreground">{info.description}</p>
                </div>
                <Button variant="hero-outline" size="sm" asChild>
                  <Link to={`/products/lines#${key}`}>View All</Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seriesProducts.slice(0, 3).map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="group flex gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all"
                  >
                    <div className="w-24 h-24 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
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
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </Layout>
  );
};

export default ProductsPage;
