import { Link } from "react-router-dom";
import { ArrowRight, Building2, Cpu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg400 from "@/assets/hero-bg-400.webp";
import heroBg800 from "@/assets/hero-bg-800.webp";
import heroBg1200 from "@/assets/hero-bg-1200.webp";
import heroBg400Avif from "@/assets/hero-bg-400.avif";
import heroBg800Avif from "@/assets/hero-bg-800.avif";
import heroBg1200Avif from "@/assets/hero-bg-1200.avif";
import cc4Pro400 from "@/assets/products/cc4-pro-hero-400.webp";
import cc4Pro800 from "@/assets/products/cc4-pro-hero-800.webp";
import cc4Pro1200 from "@/assets/products/cc4-pro-hero-1200.webp";
import cc4Pro400Avif from "@/assets/products/cc4-pro-hero-400.avif";
import cc4Pro800Avif from "@/assets/products/cc4-pro-hero-800.avif";
import cc4Pro1200Avif from "@/assets/products/cc4-pro-hero-1200.avif";

const entryPoints = [
  {
    id: "brand",
    icon: Building2,
    label: "Explore TEYES Products",
    description: "Browse our proven infotainment lineup",
    href: "/products",
    color: "from-primary to-blue-400",
  },
  {
    id: "oem-capabilities",
    icon: Cpu,
    label: "OEM / ODM Capabilities",
    description: "Learn about manufacturing & engineering",
    href: "/oem-odm",
    color: "from-accent to-cyan-400",
  },
  {
    id: "oem-project",
    icon: Globe,
    label: "Start an OEM Project",
    description: "Discuss your cooperation needs",
    href: "/contact?intent=oem",
    color: "from-emerald-500 to-teal-400",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-card to-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <picture>
          <source
            type="image/avif"
            srcSet={`${heroBg400Avif} 400w, ${heroBg800Avif} 800w, ${heroBg1200Avif} 1200w`}
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={`${heroBg400} 400w, ${heroBg800} 800w, ${heroBg1200} 1200w`}
            sizes="100vw"
          />
          <img
            src={heroBg800}
            alt="Car interior"
            className="w-full h-full object-cover opacity-30"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Glow Effect */}
      <div className="hero-glow" />

      {/* Content - Left Text, Right Product Image */}
      <div className="relative container-wide pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Left: Text Content */}
          <div className="space-y-4 md:space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
              Trusted by 100+ Markets Worldwide
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">
              <span className="text-gradient">Built for Global Markets</span>
            </h1>

            <p className="text-sm md:text-base text-muted-foreground/80 font-medium tracking-wide">
              OEM-ready · Multi-market proven · Localization-friendly
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button variant="hero" size="lg" className="md:h-12 md:px-6" asChild>
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" className="md:h-12 md:px-6" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>

          </div>

          {/* Right: Product Image */}
          <div className="relative animate-fade-in-up delay-200">
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-3xl blur-3xl transform scale-110" />

              {/* Product Image */}
              <div className="relative rounded-2xl overflow-hidden border border-border/30 bg-card/30 backdrop-blur-sm shadow-2xl animate-float-slow">
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`${cc4Pro400Avif} 400w, ${cc4Pro800Avif} 800w, ${cc4Pro1200Avif} 1200w`}
                    sizes="(max-width: 768px) 90vw, 800px"
                  />
                  <source
                    type="image/webp"
                    srcSet={`${cc4Pro400} 400w, ${cc4Pro800} 800w, ${cc4Pro1200} 1200w`}
                    sizes="(max-width: 768px) 90vw, 800px"
                  />
                  <img
                    src={cc4Pro800}
                    alt="TEYES CC4 Pro - Flagship Android Head Unit"
                    className="w-full h-auto object-cover max-h-[400px]"
                    width={800}
                    height={600}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>

                {/* Image Overlay with Product Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 via-background/60 to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-primary text-sm font-medium mb-1">Flagship Model</p>
                      <h3 className="text-2xl font-bold text-foreground">CC4 Pro</h3>
                      <p className="text-muted-foreground text-sm mt-1">8-Core • 8GB RAM • 256GB ROM</p>
                    </div>
                    <Button variant="hero" size="sm" asChild>
                      <Link to="/products/cc4-pro">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-gold text-gold-foreground rounded-full text-sm font-bold shadow-lg animate-float">
                Flagship Model
              </div>
            </div>
          </div>
        </div>

        {/* Three Entry Points - Full Width */}
        <div className="mt-6 md:mt-8">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2 md:mb-3">
            Choose your path
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {entryPoints.map((entry, index) => (
              <Link
                key={entry.id}
                to={entry.href}
                className="group flex items-center gap-3 md:gap-4 p-2.5 md:p-4 rounded-xl border border-border/30 bg-secondary/20 backdrop-blur-sm hover:border-primary/50 hover:bg-secondary/40 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${entry.color} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
                >
                  <entry.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">
                    {entry.label}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">{entry.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
