import { Link } from "react-router-dom";
import { ArrowRight, Building2, Cpu, Handshake, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg800 from "@/assets/hero-bg-800.webp";
import heroBg1200 from "@/assets/hero-bg-1200.webp";
import heroBg800Avif from "@/assets/hero-bg-800.avif";
import heroBg1200Avif from "@/assets/hero-bg-1200.avif";
import teyesHero480 from "@/assets/teyes-hero-ecosystem-approved-480.webp";
import teyesHero800 from "@/assets/teyes-hero-ecosystem-approved-800.webp";
import teyesHero1200 from "@/assets/teyes-hero-ecosystem-approved-1200.webp";
import teyesHero480Avif from "@/assets/teyes-hero-ecosystem-approved-480.avif";
import teyesHero800Avif from "@/assets/teyes-hero-ecosystem-approved-800.avif";
import teyesHero1200Avif from "@/assets/teyes-hero-ecosystem-approved-1200.avif";

const entryPoints = [
  {
    id: "products-compare",
    icon: Building2,
    label: "Compare Products",
    description: "Compare head units and car audio products side by side",
    href: "/products/compare/",
    color: "from-primary to-blue-400",
  },
  {
    id: "oem-capabilities",
    icon: Cpu,
    label: "OEM / ODM & Private Label",
    description: "Learn about manufacturing, branding, and project support",
    href: "/oem-odm/",
    color: "from-accent to-cyan-400",
  },
  {
    id: "distributor-cooperation",
    icon: Handshake,
    label: "Distributor / Wholesale Cooperation",
    description: "Explore product-line planning and market support",
    href: "/solutions/distributors/",
    color: "from-emerald-500 to-teal-400",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-card to-background">
      {/* Decorative background: responsive but deliberately low priority. */}
      <div className="absolute inset-0" aria-hidden="true">
        <picture>
          <source media="(max-width: 768px)" type="image/avif" srcSet={heroBg800Avif} />
          <source media="(max-width: 768px)" type="image/webp" srcSet={heroBg800} />
          <source media="(min-width: 769px)" type="image/avif" srcSet={heroBg1200Avif} />
          <source media="(min-width: 769px)" type="image/webp" srcSet={heroBg1200} />
          <img
            src={heroBg1200}
            alt=""
            className="w-full h-full object-cover opacity-25 md:opacity-30"
            width={1200}
            height={686}
            loading="eager"
            fetchPriority="low"
            decoding="async"
          />
        </picture>
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Glow Effect */}
      <div className="hero-glow" />

      {/* Content - Left Text, Right Product Image */}
      <div className="relative container-wide pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary" />
              Trusted by 100+ Markets Worldwide
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">
              <span className="text-gradient">TEYES Global Smart Infotainment Solutions</span>
            </h1>

            <p className="text-sm md:text-base text-muted-foreground/80 font-medium tracking-wide max-w-xl">
              Android head units, car stereo systems, accessories, distributor cooperation,
              and OEM/ODM solutions for global markets.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button variant="hero" size="lg" className="md:h-12 md:px-6" asChild>
                <Link to="/products/">
                  Explore Product Lines
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" className="md:h-12 md:px-6" asChild>
                <Link to="/contact/">Contact TEYES</Link>
              </Button>
            </div>

          </div>

          {/* Right: Product Image */}
          <div className="relative max-w-[520px] xl:max-w-[560px] w-full mx-auto lg:ml-auto">
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-accent/15 to-transparent rounded-3xl blur-3xl transform scale-105" />

              {/* Product Image */}
              <div className="relative rounded-2xl overflow-hidden border border-border/30 bg-card/30 backdrop-blur-sm shadow-2xl">
                <picture>
                  <source media="(max-width: 480px)" type="image/avif" srcSet={teyesHero480Avif} />
                  <source media="(max-width: 480px)" type="image/webp" srcSet={teyesHero480} />
                  <source media="(max-width: 768px)" type="image/avif" srcSet={teyesHero800Avif} />
                  <source media="(max-width: 768px)" type="image/webp" srcSet={teyesHero800} />
                  <source media="(min-width: 769px)" type="image/avif" srcSet={teyesHero1200Avif} />
                  <source media="(min-width: 769px)" type="image/webp" srcSet={teyesHero1200} />
                  <img
                    src={teyesHero800}
                    alt="TEYES CC4 Pro smart head unit with speakers, subwoofer and amplifier"
                    className="w-full h-auto"
                    width={800}
                    height={800}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>

                {/* Image Overlay with Product Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-background/90 via-background/60 to-transparent">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">CC4 Pro</h3>
                      <p className="text-muted-foreground text-sm mt-1">8-Core • 8GB RAM • 256GB ROM</p>
                    </div>
                    <Button variant="hero" size="sm" asChild>
                      <Link to="/products/cc4-pro/">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-gold text-gold-foreground rounded-full text-xs font-bold shadow-lg">
                Flagship Model
              </div>
            </div>

            <p className="hidden sm:block mt-3 text-center text-xs text-muted-foreground/80 tracking-wide">
              Head Units · Speakers · Amplifiers · Subwoofers
            </p>
          </div>
        </div>

        {/* Four Entry Points - Full Width */}
        <div className="mt-6 md:mt-8">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2 md:mb-3">
            Choose your path
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
            <div className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-border/30 bg-secondary/20 p-2.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-secondary/30 md:p-4">
              <Link
                to="/products/"
                aria-label="Explore all TEYES products"
                className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />

              <div className="relative z-10 flex items-center gap-3 pointer-events-none md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Layers3 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">
                    Explore Products
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Browse the TEYES product range
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary md:h-5 md:w-5" />
              </div>

              <div className="relative z-20 grid grid-cols-2 gap-2">
                <Link
                  to="/products/"
                  className="group/tile flex min-h-16 flex-col justify-between gap-2 rounded-lg border border-border/30 bg-background/45 px-3 py-2.5 transition-all hover:border-primary/50 hover:bg-background/70"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold leading-tight text-foreground group-hover/tile:text-primary">
                      Android Head Units
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover/tile:translate-x-0.5 group-hover/tile:text-primary" />
                  </div>
                  <span className="text-[11px] leading-tight text-muted-foreground">
                    Flagship · Mainstream · Entry
                  </span>
                </Link>
                <Link
                  to="/car-audio/"
                  className="group/tile flex min-h-16 flex-col justify-between gap-2 rounded-lg border border-border/30 bg-background/45 px-3 py-2.5 transition-all hover:border-primary/50 hover:bg-background/70"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold leading-tight text-foreground group-hover/tile:text-primary">
                      Car Audio
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover/tile:translate-x-0.5 group-hover/tile:text-primary" />
                  </div>
                  <span className="text-[11px] leading-tight text-muted-foreground">
                    Speakers · Subwoofers · Amplifiers
                  </span>
                </Link>
              </div>
            </div>

            {entryPoints.map((entry, index) => (
              <Link
                key={entry.id}
                to={entry.href}
                className="group flex h-full items-center gap-3 md:gap-4 p-2.5 md:p-4 rounded-xl border border-border/30 bg-secondary/20 backdrop-blur-sm hover:border-primary/50 hover:bg-secondary/40 transition-all duration-300"
                style={{ animationDelay: `${(index + 1) * 50}ms` }}
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
