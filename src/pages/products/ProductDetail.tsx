import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Star } from "lucide-react";
import { getProductById, products } from "@/data/products";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = getProductById(productId || "");

  if (!product) {
    return (
      <Layout>
        <div className="container-wide py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button variant="hero-outline" asChild>
            <Link to="/products/">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const relatedProducts = products
    .filter((p) => p.series === product.series && p.id !== product.id)
    .slice(0, 2);

  // Generate SEO content
  const seoTitle = `${product.name} - ${product.tagline} | TEYES Car Infotainment`;
  const seoDescription = `${product.description} Features: ${product.features.slice(0, 4).join(", ")}. ${product.seriesName}.`;
  const seoKeywords = `${product.name}, TEYES, car head unit, android car stereo, ${product.features.join(", ")}, ${product.seriesName}`;

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        path={`/products/${product.id}/`}
        ogType="product"
        productData={{
          name: product.name,
          brand: "TEYES",
          category: product.seriesName,
        }}
      />
      {/* Simple Breadcrumb Header */}
      <div className="py-4 bg-card border-b border-border/50">
        <div className="container-wide">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/products/" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <span>/</span>
            <Link to="/products/lines/" className="hover:text-foreground transition-colors">
              {product.seriesName}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Showcase - Not a Hero, but product display */}
      <section className="py-12 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-b from-secondary/50 to-background p-8 overflow-hidden">
              {product.badge && (
                <div className="absolute top-6 left-6 z-10 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1">
                  {product.badge === "NEW" && <Star className="h-4 w-4" />}
                  {product.badge}
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
                width={600}
                height={450}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* Info */}
            <div>
              <p className="text-primary font-medium mb-2">{product.seriesName}</p>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {product.tagline}
              </p>
              <p className="text-muted-foreground mb-8">{product.description}</p>

              {/* Highlights */}
              <div className="space-y-3 mb-8">
                {product.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Features Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 bg-secondary rounded-lg text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact/">
                    Request Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/products/compare/">Compare Models</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-card">
        <div className="container-wide">
          <h2 className="text-2xl font-display font-bold mb-8">
            Technical Specifications
          </h2>
          <div className="bg-background rounded-2xl border border-border/50 overflow-hidden">
            <div className="grid md:grid-cols-2">
              {product.specs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`flex justify-between p-4 border-b border-border/50 ${
                    index % 2 === 0 ? "md:border-r" : ""
                  }`}
                >
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container-wide">
            <h2 className="text-2xl font-display font-bold mb-8">
              Related Products
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/products/${rp.id}/`}
                  className="group flex gap-6 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all"
                >
                  <div className="w-32 h-32 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {rp.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {rp.tagline}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      View Details
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetailPage;
