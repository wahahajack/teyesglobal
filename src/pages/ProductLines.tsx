import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { products, seriesInfo, getProductsBySeries } from "@/data/products";

const ProductLinesPage = () => {
  return (
    <Layout>
      <ContextHeader
        title="Product Lines"
        description="Explore TEYES infotainment series designed for different market tiers."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Product Lines" },
        ]}
      />

      {/* Series Sections */}
      {(["flagship", "advanced", "entry"] as const).map((seriesKey) => {
        const info = seriesInfo[seriesKey];
        const seriesProducts = getProductsBySeries(seriesKey);

        return (
          <section
            key={seriesKey}
            id={seriesKey}
            className="py-20 border-t border-border/50"
            style={{
              background: seriesKey === "flagship" 
                ? "linear-gradient(to bottom, hsl(var(--background)), hsl(var(--card)))"
                : seriesKey === "advanced"
                ? "hsl(var(--card))"
                : "hsl(var(--background))",
            }}
          >
            <div className="container-wide">
              {/* Series Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${info.color} text-white text-sm font-medium mb-4`}>
                    {info.name}
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-2">
                    {info.description}
                  </h2>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {seriesProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="group bg-background rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 relative"
                  >
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
                        {product.badge === "NEW" && <Star className="h-3 w-3" />}
                        {product.badge}
                      </div>
                    )}

                    <div className="aspect-square p-8 bg-gradient-to-b from-secondary/50 to-transparent flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <p className="text-primary text-sm font-medium mb-1">
                        {product.tagline}
                      </p>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.features.slice(0, 4).map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-primary font-medium text-sm">
                        View Specifications
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="py-20 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Compare models side-by-side or talk to our team about the best 
            products for your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" asChild>
              <Link to="/products/compare">
                Compare Models
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="hero-outline" asChild>
              <Link to="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductLinesPage;
