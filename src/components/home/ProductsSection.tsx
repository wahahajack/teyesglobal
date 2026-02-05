import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Product images are now served from the public folder
const cc4ProImg = "/assets/products/cc4-pro-screen-800.webp";
const cc4ProScreen400 = "/assets/products/cc4-pro-screen-400.webp";
const cc4ProScreen800 = "/assets/products/cc4-pro-screen-800.webp";
const cc4ProScreen1200 = "/assets/products/cc4-pro-screen-1200.webp";
const cc4ProScreen400Avif = "/assets/products/cc4-pro-screen-400.avif";
const cc4ProScreen800Avif = "/assets/products/cc4-pro-screen-800.avif";
const cc4ProScreen1200Avif = "/assets/products/cc4-pro-screen-1200.avif";
const cc3Img = "/assets/products/cc3-2k.webp";
const x1ProImg = "/assets/products/x1-pro.webp";

const productSeries = [
  {
    id: "flagship",
    name: "Flagship Series",
    tagline: "CC4 Pro",
    description: "Leading performance with 6nm CPU, 12TOPS NPU, and premium DTS audio.",
    image: cc4ProImg,
    badge: "NEW",
    features: ["8-Core 6nm CPU", "12TOPS AI NPU", "7.1 Channel Audio", "360° Camera"],
    href: "/products/lines#flagship",
  },
  {
    id: "advanced",
    name: "Advanced Series",
    tagline: "CC3 2K",
    description: "Best-selling performance and value for demanding users.",
    image: cc3Img,
    badge: "BESTSELLER",
    features: ["8-Core 12nm CPU", "2K Display", "5.1 Channel Audio", "4 Cameras"],
    href: "/products/lines#advanced",
  },
  {
    id: "entry",
    name: "Entry Series",
    tagline: "X1 Pro",
    description: "Reliable and affordable entry point for every market.",
    image: x1ProImg,
    badge: null,
    features: ["Quad-Core CPU", "HD Display", "Apple CarPlay", "Android Auto"],
    href: "/products/lines#entry",
  },
];

export function ProductsSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-medium mb-2 block">Product Matrix</span>
            <h2 className="section-title">
              For Partners Who Know What They're Looking For
            </h2>
          </div>
          <Button variant="hero-outline" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {productSeries.map((product) => (
            <Link
              key={product.id}
              to={product.href}
              className="group relative bg-background rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
                  {product.badge === "NEW" && <Star className="h-3 w-3" />}
                  {product.badge}
                </div>
              )}

              {/* Image */}
              <div className="aspect-square p-8 bg-gradient-to-b from-secondary/50 to-background flex items-center justify-center overflow-hidden">
                {product.id === 'flagship' ? (
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={`${cc4ProScreen400Avif} 400w, ${cc4ProScreen800Avif} 800w, ${cc4ProScreen1200Avif} 1200w`}
                      sizes="(max-width: 768px) 45vw, 400px"
                    />
                    <source
                      type="image/webp"
                      srcSet={`${cc4ProScreen400} 400w, ${cc4ProScreen800} 800w, ${cc4ProScreen1200} 1200w`}
                      sizes="(max-width: 768px) 45vw, 400px"
                    />
                    <img
                      src={cc4ProScreen800}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      width={400}
                      height={400}
                      decoding="async"
                    />
                  </picture>
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    width={400}
                    height={400}
                    decoding="async"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-primary text-sm font-medium mb-1">
                  {product.tagline}
                </p>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm">
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
