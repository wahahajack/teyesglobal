import { Link } from "react-router-dom";
import {
  ArrowRight,
  Box,
  CheckCircle2,
  ChevronRight,
  Gauge,
  Radio,
  Ruler,
  SlidersHorizontal,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const productFamilies = [
  {
    title: "Speakers",
    eyebrow: "T3 · T6",
    description: "Component, coaxial and active 3-way configurations across the T3 and T6 speaker families.",
    models: ["T3-652", "T3-65X", "T6-652", "T6-653A", "T6-603A", "T6-65X"],
    icon: Volume2,
    anchor: "speakers",
  },
  {
    title: "Subwoofers",
    eyebrow: "Under-seat · Drivers",
    description: "Compact TS under-seat products plus standalone T3 and T6 subwoofer-driver formats.",
    models: ["TS-08", "TS-10", "10T3-V4", "10T3S-V4", "10T6-V4", "10T6S-V4"],
    icon: Radio,
    anchor: "subwoofers",
  },
  {
    title: "Bass Systems",
    eyebrow: "Competition · Enclosed",
    description: "V8 competition bass plus BXA and BX enclosed systems in multiple construction formats.",
    models: ["10V8-V4", "BXA3-10T3S-V4", "BX1-10T3S-V4", "BX2-10T3S-V4", "BX4-10T3-D4"],
    icon: Box,
    anchor: "bass-systems",
  },
  {
    title: "Amplifiers",
    eyebrow: "TD · TP",
    description: "Class D TD power amplifiers and DSP-controlled TP models for expanded system design.",
    models: ["TD500/4", "TD1000/1", "TP800/4", "TP1200/1"],
    icon: SlidersHorizontal,
    anchor: "amplifiers",
  },
];

const speakerSeries = [
  {
    series: "T3 Series",
    models: [
      { model: "T3-652", type: "Component speaker" },
      { model: "T3-65X", type: "Coaxial speaker" },
    ],
  },
  {
    series: "T6 Series",
    models: [
      { model: "T6-652", type: "Component speaker" },
      { model: "T6-653A", type: "Active 3-way configuration" },
      { model: "T6-603A", type: "Active 3-way configuration" },
      { model: "T6-65X", type: "Coaxial speaker" },
    ],
  },
];

const subwooferGroups = [
  {
    title: "Under-seat subwoofers",
    models: [
      { model: "TS-08", detail: "8-inch under-seat subwoofer" },
      { model: "TS-10", detail: "10-inch under-seat subwoofer" },
    ],
  },
  {
    title: "Subwoofer drivers",
    models: [
      { model: "10T3-V4", detail: "T3 subwoofer driver" },
      { model: "10T3S-V4", detail: "T3S subwoofer driver" },
      { model: "10T6-V4", detail: "T6 subwoofer driver" },
      { model: "10T6S-V4", detail: "T6S subwoofer driver" },
    ],
  },
];

const bassSystems = [
  { model: "10V8-V4", configuration: "V8 Competition Series · 10-inch subwoofer" },
  { model: "BXA3-10T3S-V4", configuration: "Enclosed bass system" },
  { model: "BX1-10T3S-V4", configuration: "Enclosed bass system" },
  { model: "BX2-10T3S-V4", configuration: "Enclosed bass system" },
  { model: "BX4-10T3-D4", configuration: "Enclosed bass system" },
];

const amplifiers = [
  { model: "TD500/4", classType: "Class D", control: "TD Series" },
  { model: "TD1000/1", classType: "Class D", control: "TD Series" },
  { model: "TP800/4", classType: "Class D", control: "DSP-controlled" },
  { model: "TP1200/1", classType: "Class D", control: "DSP-controlled" },
];

const speakerSpecFields = [
  "Rated power",
  "Maximum power",
  "Nominal impedance",
  "Sensitivity",
  "Frequency response",
  "Mounting depth",
];

const underSeatSpecFields = [
  "Rated power",
  "Maximum power",
  "Sensitivity",
  "Frequency response",
  "Frequency control range",
  "Dimensions",
  "Net weight",
];

const driverSpecFields = [
  "Type",
  "Rated power",
  "Maximum power",
  "Nominal impedance",
  "Sensitivity",
  "Frequency response",
  "Mounting depth",
];

const amplifierSpecFields = ["RMS @ 4 Ω", "RMS @ 2 Ω", "Bridged output", "Dimensions", "Net weight"];

const competitionSpecs = [
  { label: "Rated power", value: "600 W", icon: Zap },
  { label: "Maximum power", value: "1200 W", icon: Gauge },
  { label: "Nominal impedance", value: "4 Ω + 4 Ω", icon: Radio },
  { label: "Sensitivity", value: "84 dB", icon: Volume2 },
  { label: "Frequency response", value: "30 Hz–400 Hz", icon: Sparkles },
  { label: "X-MAX", value: "16 mm", icon: Ruler },
  { label: "Voice coil", value: "CCAW", icon: SlidersHorizontal },
  { label: "Mounting depth", value: "165 mm", icon: Ruler },
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
  hasPart: productFamilies.map((family) => ({ "@type": "WebPageElement", name: family.title })),
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
  <div className={compact ? "max-w-3xl" : "max-w-3xl mb-10"}>
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">{eyebrow}</p>
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{title}</h2>
    <p className="mt-4 text-base md:text-lg leading-8 text-muted-foreground">{description}</p>
  </div>
);

const ProductStage = ({ src, label }: { src: string; label: string }) => (
  <div
    className="relative isolate min-h-[390px] overflow-hidden rounded-[2rem] border border-border/60 bg-card/50 md:min-h-[440px]"
    role="img"
    aria-label={label}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_46%_48%,hsl(var(--primary)/0.18),transparent_36%),linear-gradient(145deg,hsl(var(--secondary)/0.58),hsl(var(--background))_68%)]" aria-hidden="true" />
    <div className="absolute inset-x-[14%] bottom-7 h-20 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
    <div className="absolute left-[12%] top-[12%] h-28 w-28 rounded-full border border-primary/10" aria-hidden="true" />
    <div className="absolute right-[8%] bottom-[10%] h-40 w-40 rounded-full border border-accent/10" aria-hidden="true" />
    <div className="relative flex min-h-[390px] items-center justify-center p-4 md:min-h-[440px] md:p-7">
      <img src={src} alt="" width={800} height={560} loading="lazy" decoding="async" className="relative z-10 h-auto w-full object-contain drop-shadow-[0_28px_42px_rgba(0,0,0,0.52)]" />
    </div>
  </div>
);

const SpecFieldList = ({ title, fields }: { title: string; fields: string[] }) => (
  <div className="rounded-2xl border border-border/60 bg-card/50 p-5 md:p-6">
    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
      <SlidersHorizontal className="h-4 w-4 text-primary" />
      {title}
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {fields.map((field) => (
        <span key={field} className="rounded-md border border-border/60 bg-secondary/50 px-2.5 py-1.5 text-xs text-muted-foreground">
          {field}
        </span>
      ))}
    </div>
  </div>
);

const ModelTable = ({
  rows,
  firstLabel = "Model",
  secondLabel = "Configuration",
}: {
  rows: { model: string; detail: string }[];
  firstLabel?: string;
  secondLabel?: string;
}) => (
  <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/35">
    <div className="grid grid-cols-[minmax(120px,0.72fr)_1.28fr] border-b border-border/60 bg-secondary/35 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
      <span>{firstLabel}</span>
      <span>{secondLabel}</span>
    </div>
    <div className="divide-y divide-border/60">
      {rows.map((row) => (
        <div key={row.model} className="grid grid-cols-[minmax(120px,0.72fr)_1.28fr] gap-4 px-5 py-4 text-sm">
          <span className="font-semibold text-foreground">{row.model}</span>
          <span className="text-muted-foreground">{row.detail}</span>
        </div>
      ))}
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
        <section className="hero-section relative border-b border-border/60 pt-28 md:pt-32">
          <div className="hero-glow" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,hsl(var(--accent)/0.12),transparent_27%)]" aria-hidden="true" />
          <div className="container-wide relative grid lg:grid-cols-[0.94fr_1.06fr] gap-10 lg:gap-14 items-center py-16 md:py-24">
            <div className="relative z-10">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <li><Link to="/" className="transition-colors hover:text-primary">Home</Link></li>
                  <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                  <li className="text-foreground/80" aria-current="page">Car Audio</li>
                </ol>
              </nav>

              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-primary">Detail · Dynamics · Depth</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[0.96]">TEYES Car Audio</h1>
              <p className="mt-7 max-w-2xl text-lg md:text-xl leading-8 text-foreground/80">Speakers, subwoofers, bass systems and amplifiers for automotive aftermarket distributors, installers and car-audio channels.</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">A dedicated product family extending the TEYES in-car entertainment portfolio beyond infotainment.</p>

              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg"><Link to="/contact/">Request Wholesale Information <ArrowRight className="h-4 w-4" /></Link></Button>
                <Button asChild size="lg" variant="outline" className="border-primary/30 bg-background/20 hover:bg-primary/10"><a href="#product-range">View Product Range</a></Button>
              </div>
            </div>

            <div className="relative min-h-[430px] lg:min-h-[520px]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_55%_50%,hsl(var(--primary)/0.19),transparent_42%)]" aria-hidden="true" />
              <div className="absolute left-[6%] top-[10%] h-24 w-24 rounded-full border border-primary/15" aria-hidden="true" />
              <div className="absolute right-[8%] bottom-[10%] h-44 w-44 rounded-full border border-accent/10" aria-hidden="true" />
              <img src="/images/car-audio/overview.webp" alt="TEYES Car Audio speakers, subwoofer and amplifier range" width={800} height={453} loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 m-auto h-auto max-h-[480px] w-[108%] max-w-none object-contain drop-shadow-[0_34px_54px_rgba(0,0,0,0.55)] lg:w-[112%]" />
              <div className="absolute right-0 top-7 rounded-xl border border-primary/20 bg-background/70 px-4 py-3 shadow-lg backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Product family</p>
                <p className="mt-1 text-sm font-semibold">Speakers · Bass · Amplification</p>
              </div>
              <div className="absolute bottom-5 left-0 flex gap-2">
                {["T3 / T6", "TS", "TD / TP"].map((tag) => <span key={tag} className="rounded-full border border-border/70 bg-card/75 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-md">{tag}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="product-range" className="border-b border-border/60 scroll-mt-24">
          <div className="container-wide py-20 md:py-24">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading compact eyebrow="Product range" title="Four core Car Audio families" description="A clear product ladder for B2B buyers, with technical data organized by family instead of repeating the same product collage in every card." />
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">19 core models across speakers, subwoofers, bass systems and Class D amplification.</p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {productFamilies.map((family, index) => {
                const Icon = family.icon;
                return (
                  <a key={family.title} href={`#${family.anchor}`} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/55 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_42px_-24px_hsl(var(--primary)/0.65)]">
                    <div className="absolute -right-7 -top-8 text-[88px] font-bold leading-none text-primary/[0.035]" aria-hidden="true">0{index + 1}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{family.eyebrow}</p>
                    <h3 className="mt-2 text-xl font-semibold">{family.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{family.description}</p>
                    <p className="mt-5 text-xs text-foreground/60">{family.models.length} models</p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="speakers" className="border-b border-border/60 py-20 md:py-24 scroll-mt-24">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <ProductStage src="/images/car-audio/stages/speakers-stage.webp" label="TEYES T3 and T6 speaker range" />
              <div>
                <SectionHeading eyebrow="Speakers" title="T3 and T6 speaker families" description="Component, coaxial and active 3-way configurations are separated by model, with the specification structure buyers use to compare the range." />
                <div className="grid gap-4 sm:grid-cols-2">
                  {speakerSeries.map((series) => <ModelTable key={series.series} rows={series.models.map((item) => ({ model: item.model, detail: item.type }))} firstLabel={series.series} secondLabel="Type" />)}
                </div>
                <div className="mt-5"><SpecFieldList title="Speaker specification fields" fields={speakerSpecFields} /></div>
              </div>
            </div>
          </div>
        </section>

        <section id="subwoofers" className="border-b border-border/60 py-20 md:py-24 scroll-mt-24">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
              <div className="lg:order-2"><ProductStage src="/images/car-audio/stages/subwoofers-stage.webp" label="TEYES under-seat and standalone subwoofer range" /></div>
              <div className="lg:order-1">
                <SectionHeading eyebrow="Subwoofers" title="Under-seat bass and standalone drivers" description="TS-08 and TS-10 cover compact under-seat formats, while T3 and T6 drivers support custom bass-system builds without implying vehicle-specific fitment." />
                <div className="space-y-4">
                  {subwooferGroups.map((group) => <ModelTable key={group.title} rows={group.models.map((item) => ({ model: item.model, detail: item.detail }))} firstLabel={group.title} secondLabel="Format" />)}
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <SpecFieldList title="Under-seat specification fields" fields={underSeatSpecFields} />
                  <SpecFieldList title="Driver specification fields" fields={driverSpecFields} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bass-systems" className="border-b border-border/60 py-20 md:py-24 scroll-mt-24">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <ProductStage src="/images/car-audio/stages/bass-systems-stage.webp" label="TEYES V8 competition and enclosed bass systems" />
              <div>
                <SectionHeading eyebrow="Bass systems" title="Competition and enclosed bass formats" description="The V8 competition model sits alongside BXA and BX enclosed systems. Enclosed models are documented by active/passive and sealed/ported construction, enclosure details, dimensions and net weight." />
                <ModelTable rows={bassSystems.map((item) => ({ model: item.model, detail: item.configuration }))} secondLabel="Product type" />
              </div>
            </div>

            <div className="mt-10 rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.10),hsl(var(--card))_46%,hsl(var(--background)))] p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">10V8-V4 · V8 Competition Series</p><h3 className="mt-2 text-2xl md:text-3xl font-semibold">Published technical profile</h3></div>
                <p className="text-sm text-muted-foreground">10-inch subwoofer</p>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
                {competitionSpecs.map((spec) => {
                  const Icon = spec.icon;
                  return <div key={spec.label} className="rounded-xl border border-border/60 bg-background/45 p-4"><div className="flex items-center gap-2 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5 text-primary" />{spec.label}</div><p className="mt-2 text-base font-semibold text-foreground">{spec.value}</p></div>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="amplifiers" className="border-b border-border/60 py-20 md:py-24 scroll-mt-24">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
              <div className="lg:order-2"><ProductStage src="/images/car-audio/stages/amplifiers-stage.webp" label="TEYES TD and TP Class D amplifiers" /></div>
              <div className="lg:order-1">
                <SectionHeading eyebrow="Amplifiers" title="TD power and DSP-controlled TP amplification" description="The four-model Class D range separates standard TD amplifiers from DSP-controlled TP architecture and is specified by output, dimensions and weight." />
                <div className="grid gap-3 sm:grid-cols-2">
                  {amplifiers.map((amp) => (
                    <div key={amp.model} className="rounded-2xl border border-border/60 bg-card/50 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{amp.classType}</p><h3 className="mt-1 text-2xl font-semibold">{amp.model}</h3></div>
                        {amp.control === "DSP-controlled" && <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">DSP</span>}
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">{amp.control}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5"><SpecFieldList title="Amplifier specification fields" fields={amplifierSpecFields} /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-20 md:py-24">
          <div className="container-wide grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="Portfolio ecosystem" title="A broader TEYES in-car entertainment offer" description="Build a broader product portfolio across source, amplification, speakers and bass while matching power, impedance and installation requirements per vehicle project." />
              <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 text-sm leading-6 text-foreground/75">Product-portfolio breadth does not imply universal electrical or mechanical compatibility between every TEYES head unit and every Car Audio model.</div>
            </div>
            <div className="relative grid gap-3">
              <div className="absolute left-5 top-7 bottom-7 w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent" aria-hidden="true" />
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

        <section className="border-b border-border/60 py-20 md:py-24">
          <div className="container-wide grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <ProductStage src="/images/car-audio/stages/accessories-stage.webp" label="TEYES Car Audio tweeter mounts and speaker grilles" />
            <div>
              <SectionHeading eyebrow="Car Audio accessories" title="Supporting hardware for the speaker range" description="Car Audio-specific mounts and grilles stay inside this product family and remain separate from the existing head-unit Accessories page." />
              <div className="space-y-3">
                {accessories.map((item) => <div key={item} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/45 px-4 py-3 text-foreground/80"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" /><span>{item}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-20 md:py-24">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/50 p-7 md:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
              <div className="relative max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">B2B cooperation</p>
                <h2 className="mt-3 text-3xl font-semibold">Discuss the range for your market</h2>
                <p className="mt-5 leading-7 text-muted-foreground">Contact the TEYES B2B team for model selection, full product specifications, market availability and commercial information for the Car Audio range.</p>
              </div>
              <Button asChild size="lg" className="relative mt-7 shrink-0 lg:mt-0"><Link to="/contact/">Contact TEYES B2B <ArrowRight className="h-4 w-4" /></Link></Button>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.13),hsl(var(--card))_50%,hsl(var(--background)))] px-7 py-12 md:px-12 md:py-16">
              <div className="absolute right-[-8%] top-[-45%] h-80 w-80 rounded-full border border-primary/10" aria-hidden="true" />
              <div className="relative max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">TEYES Car Audio</p>
                <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">Request wholesale product information</h2>
                <p className="mt-5 text-lg leading-8 text-foreground/75">Tell us your country, business type, sales channel and the Car Audio product families you are evaluating.</p>
                <Button asChild size="lg" className="mt-8"><Link to="/contact/">Start an Inquiry <ArrowRight className="h-4 w-4" /></Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CarAudio;
