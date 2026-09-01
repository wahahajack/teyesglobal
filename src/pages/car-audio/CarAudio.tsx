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
    description: "From 100 W upgrades to 180 W active 3-way systems.",
    highlights: ["100–180 W rated", "Active 3-way"],
    icon: Volume2,
    anchor: "speakers",
  },
  {
    title: "Subwoofers",
    eyebrow: "Under-seat · Drivers",
    description: "Compact under-seat bass plus slim and standard 10-inch drivers.",
    highlights: ["25 Hz TS-10", "84 mm slim driver"],
    icon: Radio,
    anchor: "subwoofers",
  },
  {
    title: "Bass Systems",
    eyebrow: "Competition · Enclosed",
    description: "Competition output plus active/passive sealed and ported systems.",
    highlights: ["16 mm X-MAX", "Birch plywood"],
    icon: Box,
    anchor: "bass-systems",
  },
  {
    title: "Amplifiers",
    eyebrow: "TD · TP",
    description: "Class D power from compact 4-channel builds to DSP and mono bass systems.",
    highlights: ["Up to 1200 W RMS", "DSP-controlled TP"],
    icon: SlidersHorizontal,
    anchor: "amplifiers",
  },
];

const componentSpeakerSpecs = [
  ["T3-652", '6.5" 2-Way Passive', "100 W", "200 W", "4 Ω", "88 dB", "65 Hz-22 kHz", "71 mm"],
  ["T6-652", '6.5" 2-Way Passive', "120 W", "240 W", "4 Ω", "89 dB", "55 Hz-25 kHz", "77.5 mm"],
  ["T6-653A", '6.5" 3-Way Active', "150 W", "300 W", "4 Ω", "89 dB", "55 Hz-25 kHz", "77.5 mm"],
  ["T6-603A", '8" 3-Way Active', "180 W", "360 W", "4 Ω", "91 dB", "53 Hz-25 kHz", "77.5 mm"],
];

const coaxialSpeakerSpecs = [
  ["T3-65X", "Coaxial", "100 W", "200 W", "4 Ω", "89 dB", "63 Hz-22 kHz", "71 mm"],
  ["T6-65X", "Coaxial", "120 W", "240 W", "4 Ω", "89 dB", "55 Hz-25 kHz", "77.5 mm"],
];

const underSeatSpecs = [
  ["TS-08", '8" Under-Seat Subwoofer', "260 W", "520 W", "85 dB", "35 Hz-150 Hz", "20 Hz-150 Hz", "284 × 210 × 77 mm", "5.5 kg"],
  ["TS-10", '10" Under-Seat Subwoofer', "260 W", "520 W", "85 dB", "25 Hz-150 Hz", "20 Hz-150 Hz", "314 × 235 × 77 mm", "6.5 kg"],
];

const driverSpecs = [
  ["10T3-D4", '10" Subwoofer', "400 W", "800 W", "4 Ω", "85 dB", "31.5 Hz-400 Hz", "148.5 mm"],
  ["10T3S-V4", '10" Thin-line Subwoofer', "400 W", "800 W", "4 Ω + 4 Ω", "84 dB", "30 Hz-400 Hz", "89 mm"],
  ["10T6-V4", '10" Subwoofer', "500 W", "1000 W", "4 Ω + 4 Ω", "85 dB", "29 Hz-400 Hz", "160.5 mm"],
  ["10T6S-V4", '10" Thin-line Subwoofer', "400 W", "800 W", "4 Ω + 4 Ω", "85 dB", "28 Hz-400 Hz", "84 mm"],
];

const enclosedBassSpecs = [
  ["BXA3-10T3S-V4", '10" Active Sealed Subwoofer', "Birch plywood", "Black flat covering", "460 × 340 × 139 mm", "13 kg"],
  ["BX1-10T3S-V4", '10" Passive Sealed Subwoofer', "Birch plywood", "Black felt covering", "460 × 340 × 139 mm", "11 kg"],
  ["BX2-10T3S-V4", '10" Passive Ported Subwoofer', "Birch plywood", "Polyurea paint", "323 × 330 × 400 mm", "13 kg"],
  ["BX4-10T3-D4", '10" Passive Ported Subwoofer', "Birch plywood", "Polyurea paint", "240 × 355 × 430 mm", "15 kg"],
];

const amplifierSpecs = [
  ["TD500/4", "Class D", "75 W × 4", "125 W × 4", "250 W × 2", "250 × 172 × 60 mm", "2.0 kg"],
  ["TD1000/1", "Class D", "350 W × 1", "650 W × 1", "N/A", "250 × 172 × 60 mm", "2.2 kg"],
  ["TP800/4", "Class D DSP-Controlled", "120 W × 4", "200 W × 4", "400 W × 2", "300 × 176 × 60 mm", "3.6 kg"],
  ["TP1200/1", "Class D DSP-Controlled", "800 W × 1", "1200 W × 1", "N/A", "300 × 176 × 60 mm", "3.6 kg"],
];

const competitionSpecs = [
  ["Type", '10" Subwoofer'],
  ["Rated power", "600 W"],
  ["Maximum power", "1200 W"],
  ["Nominal impedance", "4 Ω + 4 Ω"],
  ["Sensitivity", "84 dB"],
  ["Frequency response", "30 Hz-400 Hz"],
  ["X-MAX", "16 mm"],
  ["Voice coil", "CCAW"],
  ["Mounting depth", "165 mm"],
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
  <div className={compact ? "max-w-3xl" : "mb-8 max-w-3xl"}>
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
    <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
  </div>
);

const ProductStage = ({ src, label, height = 295 }: { src: string; label: string; height?: number }) => (
  <div
    className="relative isolate min-h-[260px] overflow-hidden rounded-[2rem] border border-border/60 bg-card/50 sm:min-h-[320px] md:min-h-[440px]"
    role="img"
    aria-label={label}
  >
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_46%_48%,hsl(var(--primary)/0.18),transparent_36%),linear-gradient(145deg,hsl(var(--secondary)/0.58),hsl(var(--background))_68%)]"
      aria-hidden="true"
    />
    <div className="absolute inset-x-[14%] bottom-5 h-16 rounded-full bg-primary/10 blur-3xl md:bottom-7 md:h-20" aria-hidden="true" />
    <div className="absolute left-[12%] top-[12%] h-20 w-20 rounded-full border border-primary/10 md:h-28 md:w-28" aria-hidden="true" />
    <div className="absolute bottom-[10%] right-[8%] h-28 w-28 rounded-full border border-accent/10 md:h-40 md:w-40" aria-hidden="true" />
    <div className="relative flex min-h-[260px] items-center justify-center p-3 sm:min-h-[320px] md:min-h-[440px] md:p-7">
      <img
        src={src}
        alt=""
        width={500}
        height={height}
        loading="lazy"
        decoding="async"
        className="relative z-10 h-auto w-full object-contain drop-shadow-[0_28px_42px_rgba(0,0,0,0.52)]"
      />
    </div>
  </div>
);

const BenefitGrid = ({ items }: { items: { title: string; text: string; stat: string }[] }) => (
  <div className="grid gap-3 sm:grid-cols-3">
    {items.map((item) => (
      <div key={item.title} className="rounded-2xl border border-border/60 bg-card/45 p-5">
        <p className="text-2xl font-semibold tracking-tight text-primary">{item.stat}</p>
        <h3 className="mt-2 font-semibold text-foreground">{item.title}</h3>
        <p className="mt-1.5 text-sm leading-5 text-muted-foreground">{item.text}</p>
      </div>
    ))}
  </div>
);

const SpecTable = ({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: string[][];
}) => (
  <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card/35">
    <table className="w-full min-w-[860px] text-left text-sm">
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-secondary/45 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        <tr>
          {headers.map((header) => (
            <th key={header} scope="col" className="whitespace-nowrap px-4 py-3.5 font-medium">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border/60">
        {rows.map((row) => (
          <tr key={row[0]} className="transition-colors hover:bg-primary/[0.035]">
            {row.map((cell, index) =>
              index === 0 ? (
                <th key={`${row[0]}-${index}`} scope="row" className="whitespace-nowrap px-4 py-4 font-semibold text-foreground">{cell}</th>
              ) : (
                <td key={`${row[0]}-${index}`} className="whitespace-nowrap px-4 py-4 text-muted-foreground">{cell}</td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
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
                Speakers, bass systems and Class D amplifiers built as one scalable Car Audio portfolio.
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
                {["6 speaker models", "25 Hz under-seat bass", "1200 W RMS amplifier"].map((tag) => (
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
              title="Four families. Multiple upgrade tiers."
              description="From entry speaker upgrades to DSP amplification and high-output bass."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                    <p className="mt-3 text-sm leading-5 text-muted-foreground">{family.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {family.highlights.map((highlight) => (
                        <span key={highlight} className="rounded-full border border-border/60 bg-secondary/45 px-2.5 py-1 text-[11px] text-foreground/70">{highlight}</span>
                      ))}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="speakers" className="scroll-mt-24 border-b border-border/60 py-16 md:py-24">
          <div className="container-wide">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10">
              <ProductStage src="/images/car-audio/speakers.webp" label="TEYES T3 and T6 speaker range" />
              <div>
                <SectionHeading compact eyebrow="Speakers" title="100 W to 180 W. One clear upgrade ladder." description="T3 covers mainstream upgrades. T6 adds more output and active 3-way options." />
                <div className="mt-6">
                  <BenefitGrid items={[
                    { stat: "100–180 W", title: "Easy tiering", text: "Clear step-up from T3 to higher-output T6." },
                    { stat: "3-way active", title: "Premium installs", text: "More control for DSP-led system tuning." },
                    { stat: "Up to 91 dB", title: "Lively sound", text: "Strong sensitivity for clear, energetic playback." },
                  ]} />
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-5">
              <div>
                <p className="mb-3 text-sm font-semibold text-primary">Component / active configurations</p>
                <SpecTable caption="TEYES component speaker specifications" headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth"]} rows={componentSpeakerSpecs} />
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-primary">Coaxial configurations</p>
                <SpecTable caption="TEYES coaxial speaker specifications" headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth"]} rows={coaxialSpeakerSpecs} />
              </div>
            </div>
          </div>
        </section>

        <section id="subwoofers" className="scroll-mt-24 border-b border-border/60 py-16 md:py-24">
          <div className="container-wide">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
              <div>
                <SectionHeading compact eyebrow="Subwoofers" title="Compact bass to serious low-end." description="Under-seat convenience, slim 10-inch options and higher-output custom builds." />
                <div className="mt-6">
                  <BenefitGrid items={[
                    { stat: "77 mm", title: "Easy fit", text: "Compact TS enclosures preserve cabin and cargo space." },
                    { stat: "25 Hz", title: "Feel the depth", text: "TS-10 reaches deeper for fuller low-frequency weight." },
                    { stat: "84 mm", title: "Slim, still serious", text: "10-inch bass for depth-limited installations." },
                  ]} />
                </div>
              </div>
              <ProductStage src="/images/car-audio/subwoofers.webp" label="TEYES under-seat and standalone subwoofer range" />
            </div>

            <div className="mt-10 space-y-7">
              <div>
                <p className="mb-3 text-sm font-semibold text-primary">Under-seat subwoofers</p>
                <SpecTable caption="TEYES under-seat subwoofer specifications" headers={["Model", "Type", "Rated", "Max", "Sensitivity", "Frequency response", "Frequency control", "Dimensions", "Net weight"]} rows={underSeatSpecs} />
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-primary">Subwoofer drivers</p>
                <SpecTable caption="TEYES subwoofer driver specifications" headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth"]} rows={driverSpecs} />
              </div>
            </div>
          </div>
        </section>

        <section id="bass-systems" className="scroll-mt-24 border-b border-border/60 py-16 md:py-24">
          <div className="container-wide">
            <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-10">
              <ProductStage src="/images/car-audio/bass-systems.webp" label="TEYES V8 competition and enclosed bass systems" />
              <div>
                <SectionHeading compact eyebrow="Bass systems" title="Three bass formats. One upsell path." description="Active, passive and competition options cover different budgets and output goals." />
                <div className="mt-6">
                  <BenefitGrid items={[
                    { stat: "16 mm", title: "More excursion", text: "More cone travel. More physical bass impact." },
                    { stat: "600 W", title: "Built to hit hard", text: "V8 is the high-output step in the range." },
                    { stat: "Birch", title: "Better enclosure story", text: "Sealed and ported cabinets use birch plywood." },
                  ]} />
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.10),hsl(var(--card))_55%,hsl(var(--background)))] p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">10V8-V4 · V8 Competition Series</p>
                <h3 className="mt-2 text-2xl font-semibold md:text-3xl">Built for impact.</h3>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {competitionSpecs.map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-border/60 bg-background/45 p-4">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="mt-2 text-base font-semibold text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-primary">T3 enclosed subwoofer systems</p>
                <SpecTable caption="TEYES enclosed subwoofer specifications" headers={["Model", "Type", "Enclosure", "Surface treatment", "Dimensions", "Net weight"]} rows={enclosedBassSpecs} />
              </div>
            </div>
          </div>
        </section>

        <section id="amplifiers" className="scroll-mt-24 border-b border-border/60 py-16 md:py-24">
          <div className="container-wide">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
              <div>
                <SectionHeading compact eyebrow="Amplifiers" title="Power tiers that match the system." description="Compact Class D, stronger 2-ohm output and DSP-controlled TP models." />
                <div className="mt-6">
                  <BenefitGrid items={[
                    { stat: "125 W × 4", title: "Flexible 4-channel", text: "TD500/4 scales cleanly into lower-impedance systems." },
                    { stat: "200 W × 4", title: "Step-up DSP power", text: "TP800/4 adds output and tuning flexibility." },
                    { stat: "1200 W × 1", title: "Serious mono output", text: "TP1200/1 is built for high-power bass systems." },
                  ]} />
                </div>
              </div>
              <ProductStage src="/images/car-audio/amplifiers.webp" label="TEYES TD and TP Class D amplifiers" />
            </div>

            <div className="mt-10">
              <SpecTable caption="TEYES power amplifier specifications" headers={["Model", "Type", "RMS @ 4 Ω", "RMS @ 2 Ω", "Bridged @ 4 Ω", "Dimensions", "Net weight"]} rows={amplifierSpecs} />
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-16 md:py-24">
          <div className="container-wide grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-10">
            <div>
              <SectionHeading eyebrow="Complete system" title="Sell the system, not just the SKU." description="Head unit → amplifier → speakers → bass. More attach opportunities from one portfolio." />
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
            <ProductStage src="/images/car-audio/accessories.webp" label="TEYES Car Audio tweeter mounts and speaker grilles" height={227} />
            <div>
              <SectionHeading eyebrow="Car Audio accessories" title="Finish the installation cleanly." description="Dedicated mounts and grilles for a more complete T6 installation." />
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
                <p className="mt-4 text-base leading-7 text-foreground/75 md:text-lg">Tell us your target price points and channels. We will help shape the lineup.</p>
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