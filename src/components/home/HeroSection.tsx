import { Link } from "react-router-dom";
import { ArrowRight, Building2, Cpu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

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
    <section className="hero-section relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Car interior"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Glow Effect */}
      <div className="hero-glow" />

      {/* Content */}
      <div className="relative container-wide min-h-screen flex flex-col justify-center py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trusted by 100+ Markets Worldwide
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Smart Infotainment Solutions,{" "}
              <span className="text-gradient">Built for Global Markets</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl">
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
          </div>

          {/* Right: Three Entry Points */}
          <div className="space-y-4 animate-fade-in-up delay-200">
            <p className="text-muted-foreground text-sm uppercase tracking-wider mb-6">
              Choose your path
            </p>

            {entryPoints.map((entry, index) => (
              <Link
                key={entry.id}
                to={entry.href}
                className="cta-card group flex items-center gap-6"
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${entry.color} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
                >
                  <entry.icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-semibold mb-1 group-hover:text-primary transition-colors">
                    {entry.label}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {entry.description}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 pt-12 border-t border-border/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "100+", label: "Global Markets" },
              { value: "500+", label: "Distribution Partners" },
              { value: "10M+", label: "Units Shipped" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
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
