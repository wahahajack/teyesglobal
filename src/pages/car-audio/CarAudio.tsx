import { Link } from "react-router-dom";
import {
  ArrowRight,
  Box,
  ChevronRight,
  SlidersHorizontal,
  Volume2,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ProductVisualGrid } from "./ProductVisual";
import {
  accessoryProductVisualIds,
  getProductVisuals,
} from "./productVisuals";

const productFamilies = [
  {
    title: "Speakers",
    eyebrow: "T3 · T6 · 10-inch drivers",
    description: "T3 and T6 cabin speakers plus standard-depth, thin-line and competition standalone subwoofer drivers.",
    highlights: ["6 speaker models", "5 subwoofer drivers"],
    icon: Volume2,
    anchor: "speakers",
    href: "/car-audio/speakers/",
    image: "/images/car-audio/category-speakers.webp",
    imageAlt: "TEYES car speakers and standalone subwoofer drivers",
  },
  {
    title: "Enclosed Subwoofers",
    eyebrow: "Under-seat · sealed · ported",
    description: "Compact TS under-seat systems plus active and passive sealed or ported boxed subwoofers.",
    highlights: ["TS under-seat", "Sealed & ported"],
    icon: Box,
    anchor: "enclosed-subwoofers",
    href: "/car-audio/enclosed-subwoofers/",
    image: "/images/car-audio/category-enclosed-subwoofers.webp",
    imageAlt: "TEYES enclosed car subwoofer system",
  },
  {
    title: "Amplifiers",
    eyebrow: "TD · TP",
    description: "Four-channel and mono Class D amplifiers across TD and DSP-controlled TP series.",
    highlights: ["Up to 200 W × 4", "Up to 1200 W × 1"],
    icon: SlidersHorizontal,
    anchor: "amplifiers",
    href: "/car-audio/amplifiers/",
    image: "/images/car-audio/category-amplifiers.webp",
    imageAlt: "TEYES Class D car amplifier",
  },
];

const ecosystemGroups = [
  {
    title: "Head Unit",
    description: "Smart source, control and infotainment at the center of the in-car entertainment system.",
    links: [{ label: "Explore Android Head Units", href: "/products/" }],
  },
  {
    title: "Amplification",
    description: "TD and TP Class D power stages for multi-channel speakers and dedicated bass systems.",
    links: [{ label: "Explore Amplifiers", href: "/car-audio/amplifiers/" }],
  },
  {
    title: "Cabin Audio",
    description: "T3 and T6 component, active and coaxial speakers for the main listening environment.",
    links: [{ label: "Explore Speakers", href: "/car-audio/speakers/" }],
  },
  {
    title: "Bass",
    description: "Choose standalone subwoofer drivers for custom enclosures or complete enclosed subwoofer systems.",
    links: [
      { label: "Standalone Drivers", href: "/car-audio/speakers/" },
      { label: "Enclosed Subwoofers", href: "/car-audio/enclosed-subwoofers/" },
    ],
  },
];

const collectionSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TEYES Car Audio",
  url: "https://teyesglobal.com/car-audio/",
  description:
    "TEYES Car Audio speakers and standalone subwoofer drivers, enclosed subwoofers and power amplifiers for automotive aftermarket distributors and car audio channels.",
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
}: {
  eyebrow: string;
  title: string;
  description: string;
}) => (
  <div className="mb-8 max-w-3xl">
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
    <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
  </div>
);

const CarAudio = () => {
  return (
    <Layout>
      <SEO
        title="TEYES Car Audio - Speakers, Enclosed Subwoofers & Amplifiers"
        description="Explore TEYES Car Audio speakers and standalone subwoofer drivers, enclosed subwoofers and power amplifiers for automotive aftermarket distributors and car audio channels."
        path="/car-audio/"
        schema={collectionSchema}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Car Audio" }]}
      />

      <div className="bg-background text-foreground">
        <section className="hero-section relative border-b border-border/60 pt-20 md:pt-24">
          <div className="hero-glow" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,hsl(var(--accent)/0.12),transparent_27%)]" aria-hidden="true" />
          <div className="container-wide relative grid items-center gap-8 py-8 sm:py-10 md:py-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14 lg:py-14">
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
                Expand your aftermarket range with TEYES Car Audio.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-7 text-foreground/80 md:text-xl">
                Speakers and standalone subwoofer drivers, enclosed subwoofers and Class D amplifiers for distributors, wholesalers and installers building a broader in-car audio range.
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

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-card/30 shadow-[0_24px_70px_-36px_rgba(0,0,0,0.8)]">
                <img
                  src="/images/car-audio/car-audio-hero.webp"
                  alt="TEYES Car Audio speakers, subwoofer system and amplifier"
                  width={720}
                  height={576}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[5/4] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-foreground/70 sm:text-base" aria-label="Detail, Dynamics, Depth">
                DETAIL <span className="px-1.5 text-primary">·</span> DYNAMICS <span className="px-1.5 text-primary">·</span> DEPTH
              </p>
            </div>
          </div>
        </section>

        <section id="product-range" className="scroll-mt-24 border-b border-border/60">
          <div className="container-wide py-16 md:py-24">
            <SectionHeading
              eyebrow="Product range"
              title="Speakers, enclosed bass and amplification in three clear categories."
              description="T3 and T6 speakers with standalone subwoofer drivers, enclosed subwoofer systems, and TD/TP Class D amplifiers."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {productFamilies.map((family) => {
                const Icon = family.icon;
                return (
                  <Link
                    key={family.title}
                    id={family.anchor}
                    to={family.href}
                    className="group scroll-mt-24 overflow-hidden rounded-[1.6rem] border border-border/60 bg-card/55 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_42px_-24px_hsl(var(--primary)/0.65)]"
                  >
                    <div className="aspect-[4/3] overflow-hidden border-b border-border/60 bg-card/30">
                      <img
                        src={family.image}
                        alt={family.imageAlt}
                        width={520}
                        height={390}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{family.eyebrow}</p>
                          <h3 className="mt-2 text-xl font-semibold">{family.title}</h3>
                        </div>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{family.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {family.highlights.map((highlight) => (
                          <span key={highlight} className="rounded-full border border-border/60 bg-secondary/45 px-2.5 py-1 text-[11px] text-foreground/70">{highlight}</span>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                        Explore {family.title}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-16 md:py-24">
          <div className="container-wide grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-10">
            <div>
              <SectionHeading
                eyebrow="Complete system"
                title="A broader TEYES in-car entertainment portfolio."
                description="Present source, amplification, cabin audio and bass as one connected product ecosystem without implying that every installation must follow the same sequence."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ecosystemGroups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-border/60 bg-card/45 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{group.description}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {group.links.map((item) => (
                      <Link key={item.label} to={item.href} className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                        {item.label}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-16 md:py-24">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Car Audio accessories"
              title="Installation accessories within the Car Audio range."
              description="The catalog lists dedicated tweeter mounts and T6 speaker grilles alongside the main Car Audio categories."
            />
            <ProductVisualGrid products={getProductVisuals(accessoryProductVisualIds)} />
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
