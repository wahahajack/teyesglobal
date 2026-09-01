import { Link } from "react-router-dom";
import {
  ArrowRight,
  Box,
  CheckCircle2,
  ChevronRight,
  Radio,
  SlidersHorizontal,
  Volume2,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const productFamilies = [
  {
    title: "Speakers",
    eyebrow: "T3 · T6",
    description: "Six component, active 3-way and coaxial speaker configurations across the T3 and T6 series.",
    highlights: ["6 models", "100–180 W rated", "Passive · Active · Coaxial"],
    icon: Volume2,
    anchor: "speakers",
    href: "/car-audio/speakers/",
    image: "/images/car-audio/speakers.webp",
    imageAlt: "TEYES T3 and T6 car speaker range",
    detail:
      "Use the dedicated speaker page to compare the T3 and T6 series by format, rated power, sensitivity, frequency response and mounting depth.",
  },
  {
    title: "Subwoofers",
    eyebrow: "Under-seat · 10-inch drivers",
    description: "Compact TS under-seat systems plus standard and thin-line 10-inch subwoofer drivers.",
    highlights: ["77 mm under-seat", "25 Hz TS-10", "84 mm thin-line driver"],
    icon: Radio,
    anchor: "subwoofers",
    href: "/car-audio/subwoofers/",
    image: "/images/car-audio/subwoofers.webp",
    imageAlt: "TEYES under-seat and 10-inch subwoofer range",
    detail:
      "Compare integrated under-seat bass with standalone 10-inch drivers using installation depth, rated power, impedance and frequency response.",
  },
  {
    title: "Bass Systems",
    eyebrow: "Competition · Enclosed",
    description: "V8 competition bass plus active and passive sealed or ported enclosed subwoofer systems.",
    highlights: ["600 W V8 rated", "16 mm X-MAX", "Birch plywood enclosures"],
    icon: Box,
    anchor: "bass-systems",
    href: "/car-audio/bass-systems/",
    image: "/images/car-audio/bass-systems.webp",
    imageAlt: "TEYES V8 competition and enclosed bass systems",
    detail:
      "Separate competition-driver specifications from ready-built enclosed formats, including active, passive, sealed and ported configurations.",
  },
  {
    title: "Amplifiers",
    eyebrow: "TD · TP",
    description: "Four-channel and mono Class D amplifiers across TD and DSP-controlled TP series.",
    highlights: ["4 models", "Up to 200 W × 4", "Up to 1200 W × 1"],
    icon: SlidersHorizontal,
    anchor: "amplifiers",
    href: "/car-audio/amplifiers/",
    image: "/images/car-audio/amplifiers.webp",
    imageAlt: "TEYES TD and TP Class D amplifier range",
    detail:
      "Compare TD and TP models by channel layout, RMS output at 4 and 2 ohms, bridged output, dimensions and net weight.",
  },
];

const accessories = ["Tweeter Mount", "T6-650 Woofer Grille", "T6-65X Coaxial Grille"];
const ecosystemSteps = ["TEYES Infotainment / Head Unit", "Amplifier", "Speakers", "Subwoofer / Bass"];

const collectionSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TEYES Car Audio",
  url: "https://teyesglobal.com/car-audio/",
  description:
    "TEYES Car Audio speakers, subwoofers, bass systems and power amplifiers for automotive aftermarket distributors and car audio channels.",
  hasPart: productFamilies.map((family) => ({
    "@type": "WebPage",
    name: family.title,
    url: `https://teyesglobal.com${family.href}`,
  })),
});

const SectionHeading = ({
  eyebrow,
  title,
  description,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  compact?: boolean;
}) => (
  <div className={compact ? "max-w-3xl" : "mb-8 max-w-3xl"}>
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
    <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
  </div>
);

const ProductStage = ({ src, alt, height = 320 }: { src: string; alt: string; height?: number }) => (
  <div className="relative isolate min-h-[280px] overflow-hidden rounded-[2rem] border border-border/60 bg-card/50 sm:min-h-[320px] md:min-h-[420px]">
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_46%_48%,hsl(var(--primary)/0.18),transparent_36%),linear-gradient(145deg,hsl(var(--secondary)/0.58),hsl(var(--background))_68%)]"
      aria-hidden="true"
    />
    <div className="absolute inset-x-[14%] bottom-5 h-16 rounded-full bg-primary/10 blur-3xl md:bottom-7 md:h-20" aria-hidden="true" />
    <div className="relative flex min-h-[280px] items-center justify-center p-4 sm:min-h-[320px] md:min-h-[420px] md:p-7">
      <img
        src={src}
        alt={alt}
        width={500}
        height={height}
        loading="lazy"
        decoding="async"
        className="relative z-10 h-auto w-full object-contain drop-shadow-[0_28px_42px_rgba(0,0,0,0.52)]"
      />
    </div>
  </div>
);

const CarAudio = () => {
  return (
    <Layout>
      <SEO
        title="TEYES Car Audio - Speakers, Subwoofers & Amplifiers"
        description="Explore TEYES Car Audio speakers, subwoofers, enclosed bass systems and power amplifiers for automotive aftermarket distributors and car audio channels."
        path="/car-audio/"
        schema={collectionSchema}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Car Audio" }]}
      />

      <div className="bg-background text-foreground">
        <section className="hero-section relative border-b border-border/60 pt-20 md:pt-24 lg:pt-32">
          <div className="hero-glow" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,hsl(var(--accent)/0.12),transparent_27%)]" aria-hidden="true" />
          <div className="container-wide relative grid items-center gap-8 py-8 sm:py-10 md:py-16 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14 lg:py-24">
            <div className="relative z-10">
              <nav aria-label="Breadcrumb" className="mb-5 md:mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <li><Link to="/" className="transition-colors hover:text-primary">Home</Link></li>
                  <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                  <li className="text-foreground/80" aria-current="page">Car Audio</li>
                </ol>
              </nav>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary">TEYES Car Audio</p>
              <h1 className="text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
                More power. More range. More ways to sell.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-7 text-foreground/80 md:text-xl">
                Speakers, subwoofers, bass systems and Class D amplifiers in one dedicated Car Audio portfolio.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-9 md:gap-4">
                <Button asChild size="lg">
                  <Link to="/contact/">Request Wholesale Information <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/30 bg-background/20 hover:bg-primary/10">
                  <a href="#product-range">Explore the Range</a>
                </Button>
              </div>
            </div>

            <div className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-[520px]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_55%_50%,hsl(var(--primary)/0.22),transparent_44%)]" aria-hidden="true" />
              <div className="absolute left-[6%] top-[10%] h-20 w-20 rounded-full border border-primary/15 md:h-24 md:w-24" aria-hidden="true" />
              <div className="absolute bottom-[10%] right-[8%] h-32 w-32 rounded-full border border-accent/10 md:h-44 md:w-44" aria-hidden="true" />
              <img
                src="/images/car-audio/hero-speakers.webp"
                alt="TEYES Car Audio speaker pair"
                width={500}
                height={362}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 m-auto h-auto max-h-[470px] w-[96%] object-contain drop-shadow-[0_34px_54px_rgba(0,0,0,0.58)] md:w-[102%]"
              />
              <div className="absolute bottom-2 left-2 flex flex-wrap gap-2 sm:bottom-5 sm:left-0">
                {["6 speaker models", "77 mm under-seat bass", "1200 W × 1 amplifier"].map((tag) => (
                  <span key={tag} className="rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-[11px] font-medium text-foreground/80 backdrop-blur-md sm:text-xs">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="product-range" className="scroll-mt-24 border-b border-border/60">
          <div className="container-wide py-16 md:py-24">
            <SectionHeading
              eyebrow="Product range"
              title="Four product categories, each with its own selection logic."
              description="Start here for the overall TEYES Car Audio range, then move into the category page for model-level specifications and comparison."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {productFamilies.map((family, index) => {
                const Icon = family.icon;
                return (
                  <Link key={family.title} to={family.href} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/55 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_42px_-24px_hsl(var(--primary)/0.65)]">
                    <div className="absolute -right-7 -top-8 text-[88px] font-bold leading-none text-primary/[0.035]" aria-hidden="true">0{index + 1}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{family.eyebrow}</p>
                    <h3 className="mt-2 text-xl font-semibold">{family.title}</h3>
                    <p className="mt-3 text-sm leading-5 text-muted-foreground">{family.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {family.highlights.slice(0, 2).map((highlight) => (
                        <span key={highlight} className="rounded-full border border-border/60 bg-secondary/45 px-2.5 py-1 text-[11px] text-foreground/70">{highlight}</span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {productFamilies.map((family, index) => (
          <section key={family.anchor} id={family.anchor} className="scroll-mt-24 border-b border-border/60 py-16 md:py-24">
            <div className={`container-wide grid gap-8 lg:items-center lg:gap-12 ${index % 2 === 0 ? "lg:grid-cols-[0.95fr_1.05fr]" : "lg:grid-cols-[1.05fr_0.95fr]"}`}>
              {index % 2 === 0 && <ProductStage src={family.image} alt={family.imageAlt} />}
              <div>
                <SectionHeading compact eyebrow={family.eyebrow} title={family.title} description={family.description} />
                <div className="mt-6 flex flex-wrap gap-2">
                  {family.highlights.map((highlight) => (
                    <span key={highlight} className="rounded-full border border-border/60 bg-card/55 px-3 py-1.5 text-sm text-foreground/75">{highlight}</span>
                  ))}
                </div>
                <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">{family.detail}</p>
                <Button asChild size="lg" className="mt-7">
                  <Link to={family.href}>Explore {family.title} <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
              {index % 2 !== 0 && <ProductStage src={family.image} alt={family.imageAlt} />}
            </div>
          </section>
        ))}

        <section className="border-b border-border/60 py-16 md:py-24">
          <div className="container-wide grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-10">
            <div>
              <SectionHeading
                eyebrow="Complete system"
                title="A broader TEYES in-car entertainment portfolio."
                description="Present source, amplification, speakers and bass as one portfolio while keeping each product category technically distinct."
              />
            </div>
            <div className="relative grid gap-3">
              <div className="absolute bottom-7 left-5 top-7 w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent" aria-hidden="true" />
              {ecosystemSteps.map((step, index) => (
                <div key={step} className="relative flex items-center gap-5 rounded-2xl border border-border/60 bg-card/45 p-5 pl-4">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background text-sm font-semibold text-primary">{index + 1}</div>
                  <p className="flex-1 font-medium">{step}</p>
                  {index < ecosystemSteps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground/50" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-16 md:py-24">
          <div className="container-wide grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-10">
            <ProductStage src="/images/car-audio/accessories.webp" alt="TEYES Car Audio tweeter mounts and speaker grilles" height={227} />
            <div>
              <SectionHeading eyebrow="Car Audio accessories" title="Installation accessories within the Car Audio range." description="The catalog lists dedicated tweeter mounts and T6 speaker grilles alongside the main Car Audio categories." />
              <div className="space-y-3">
                {accessories.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/45 px-4 py-3 text-foreground/80">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.13),hsl(var(--card))_50%,hsl(var(--background)))] px-7 py-10 md:px-12 md:py-14">
              <div className="absolute right-[-8%] top-[-45%] h-80 w-80 rounded-full border border-primary/10" aria-hidden="true" />
              <div className="relative max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">B2B cooperation</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Build the right range for your market.</h2>
                <p className="mt-4 text-base leading-7 text-foreground/75 md:text-lg">Contact TEYES for wholesale product information and the current Car Audio model range.</p>
                <Button asChild size="lg" className="mt-7">
                  <Link to="/contact/">Contact TEYES B2B <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CarAudio;
