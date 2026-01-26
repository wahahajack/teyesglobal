import { Link } from "react-router-dom";
import { ArrowRight, Building2, Cpu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import cc4ProImg from "@/assets/products/cc4-pro.jpg";

const entryPoints = [
  {
    id: "brand",
    icon: Building2,
    label: "I'm looking for a proven brand",
    description: "Looking for a proven infotainment brand",
    cta: "Explore TEYES Products",
    href: "/products",
    color: "from-primary to-blue-400",
  },
  {
    id: "oem",
    icon: Cpu,
    label: "I need a reliable OEM manufacturer",
    description: "Sourcing a reliable OEM / ODM partner",
    cta: "OEM / ODM Capabilities",
    href: "/oem-odm",
    color: "from-accent to-cyan-400",
  },
  {
    id: "market",
    icon: Globe,
    label: "I'm exploring solutions for my market",
    description: "Exploring solutions for your local market",
    cta: "See Market Solutions",
    href: "/solutions/market-needs",
    color: "from-emerald-500 to-teal-400",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-card to-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Car interior"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Glow Effect */}
      <div className="hero-glow" />

      {/* Content - Left Text, Right Product Image */}
      <div className="relative container-wide pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trusted by 100+ Markets Worldwide
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">
              Smart Infotainment Solutions,{" "}
              <span className="text-gradient">Built for Global Markets</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              From branded head units to OEM projects — TEYES supports your growth at every stage.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>

            {/* Three Entry Points - Below the buttons */}
            <div className="pt-6 space-y-2">
              <p className="text-muted-foreground text-xs uppercase tracking-wider">
                Choose your path
              </p>
              {entryPoints.map((entry, index) => (
                <Link
                  key={entry.id}
                  to={entry.href}
                  className="cta-card-mini group flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-secondary/20 backdrop-blur-sm hover:border-primary/50 hover:bg-secondary/40 transition-all duration-300"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${entry.color} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <entry.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">
                      {entry.label}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Product Image */}
          <div className="relative animate-fade-in-up delay-200">
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-3xl blur-3xl transform scale-110" />
              
              {/* Product Image */}
              <div className="relative rounded-2xl overflow-hidden border border-border/30 bg-card/30 backdrop-blur-sm shadow-2xl">
                <img
                  src={cc4ProImg}
                  alt="TEYES CC4 Pro - Flagship Android Head Unit"
                  className="w-full h-auto object-cover max-h-[400px]"
                />
                
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
                #1 Best Seller
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-10 pt-8 border-t border-border/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "100+", label: "Global Markets" },
              { value: "500+", label: "Distribution Partners" },
              { value: "10M+", label: "Units Shipped" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
