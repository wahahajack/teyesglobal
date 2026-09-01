import { Link } from "react-router-dom";
import {
  ArrowRight,
  Box,
  CheckCircle2,
  ChevronRight,
  Radio,
  SlidersHorizontal,
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
    description: "High-power component, coaxial and active 3-way speakers for clear, dynamic front-stage sound.",
    highlights: ["Up to 180 W rated", "Active 3-way options"],
    icon: Volume2,
    anchor: "speakers",
  },
  {
    title: "Subwoofers",
    eyebrow: "Under-seat · Drivers",
    description: "Compact powered bass plus standard and thin-line 10-inch drivers for flexible system builds.",
    highlights: ["TS-10 down to 25 Hz", "84 mm slim driver"],
    icon: Radio,
    anchor: "subwoofers",
  },
  {
    title: "Bass Systems",
    eyebrow: "Competition · Enclosed",
    description: "High-excursion competition bass and ready-to-install sealed or ported enclosure formats.",
    highlights: ["16 mm X-MAX", "Birch plywood cabinets"],
    icon: Box,
    anchor: "bass-systems",
  },
  {
    title: "Amplifiers",
    eyebrow: "TD · TP",
    description: "Class D power for speakers and subwoofers, with DSP-controlled TP models for more advanced tuning.",
    highlights: ["Up to 1200 W RMS", "DSP-controlled TP series"],
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
  <div className={compact ? "max-w-3xl" : "mb-10 max-w-3xl"}>
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
    <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
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

const BenefitGrid = ({ items }: { items: { title: string; text: string; stat?: string }[] }) => (
  <div className="grid gap-3 sm:grid-cols-3">
    {items.map((item) => (
      <div key={item.title} className="rounded-2xl border border-border/60 bg-card/45 p-5">
        {item.stat && <p className="text-2xl font-semibold tracking-tight text-primary">{item.stat}</p>}
        <h3 className={item.stat ? "mt-3 font-semibold text-foreground" : "font-semibold text-foreground"}>{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
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
            <th key={header} scope="col" className="whitespace-nowrap px-4 py-3.5 font-medium">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border/60">
        {rows.map((row) => (
          <tr key={row[0]} className="transition-colors hover:bg-primary/[0.035]">
            {row.map((cell, index) =>
              index === 0 ? (
                <th key={`${row[0]}-${index}`} scope="row" className="whitespace-nowrap px-4 py-4 font-semibold text-foreground">
                  {cell}
                </th>
              ) : (
                <td key={`${row[0]}-${index}`} className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                  {cell}
                </td>
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
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,hsl(var(--accent)/0.12),transparent_27%)]"
            aria-hidden="true"
          />
          <div className="container-wide relative grid items-center gap-8 py-8 sm:py-10 md:py-16 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14 lg:py-24">
            <div className="relative z-10">
              <nav aria-label="Breadcrumb" className="mb-5 md:mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <li>
                    <Link to="/" className="transition-colors hover:text-primary">Home</Link>
                  </li>
                  <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                  <li className="text-foreground/80" aria-current="page">Car Audio</li>
                </ol>
              </nav>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary">TEYES Car Audio</p>
              <h1 className="text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
                Built to make every drive sound bigger.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/80 md:text-xl">
                High-power speakers, compact bass solutions and Class D amplification engineered for more impact,
                more tuning freedom and a complete TEYES in-car audio system.
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
              <div
                className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_55%_50%,hsl(var(--primary)/0.22),transparent_44%)]"
                aria-hidden="true"
              />
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
                {["Up to 180 W speakers", "25 Hz compact bass", "Up to 1200 W RMS amp"].map((tag) => (
                  <span key={tag} className="rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-[11px] font-medium text-foreground/80 backdrop-blur-md sm:text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="product-range" className="scroll-mt-24 border-b border-border/60">
          <div className="container-wide py-16 md:py-24">
            <SectionHeading
              eyebrow="Choose your sound"
              title="One range. Four ways to transform the system."
              description="Build from the listening experience you want: clearer front-stage detail, deeper bass, ready-made enclosures or the amplifier power to drive the whole system."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {productFamilies.map((family, index) => {
                const Icon = family.icon;
                return (
                  <a
                    key={family.title}
                    href={`#${family.anchor}`}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/55 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_16px_42px_-24px_hsl(var(--primary)/0.65)]"
                  >
                    <div className="absolute -right-7 -top-8 text-[88px] font-bold leading-none text-primary/[0.035]" aria-hidden="true">0{index + 1}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{family.eyebrow}</p>
                    <h3 className="mt-2 text-xl font-semibold">{family.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{family.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {family.highlights.map((highlight) => (
                        <span key={highlight} className="rounded-full border border-border/60 bg-secondary/45 px-2.5 py-1 text-[11px] text-foreground/70">
                          {highlight}
                        </span>
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
                <SectionHeading
                  compact
                  eyebrow="Speakers"
                  title="More headroom for detail, dynamics and volume."
                  description="T3 starts with strong 100 W rated power, while T6 scales to 180 W and adds active 3-way configurations for systems that demand more output and more precise tuning."
                />
                <div className="mt-6">
                  <BenefitGrid
                    items={[
                      { stat: "100-180 W", title: "Power across the range", text: "Rated power rises with the series, giving installers more room to match higher-output amplifier channels." },
                      { stat: "3-way active", title: "Built for advanced tuning", text: "T6-653A and T6-603A open the door to dedicated frequency-band control in DSP-based systems." },
                      { stat: "88-91 dB", title: "Strong acoustic efficiency", text: "Sensitivity stays consistent across the family, with the 8-inch T6-603A reaching 91 dB." },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-5">
              <div>
                <p className="mb-3 text-sm font-semibold text-primary">Component / active configurations</p>
                <SpecTable
                  caption="TEYES component speaker specifications"
                  headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth"]}
                  rows={componentSpeakerSpecs}
                />
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-primary">Coaxial configurations</p>
                <SpecTable
                  caption="TEYES coaxial speaker specifications"
                  headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth"]}
                  rows={coaxialSpeakerSpecs}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="subwoofers" className="scroll-mt-24 border-b border-border/60 py-16 md:py-24">
          <div className="container-wide">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
              <div>
                <SectionHeading
                  compact
                  eyebrow="Subwoofers"
                  title="Bass that fits the car without giving up the low end."
                  description="Choose a compact under-seat solution for a clean installation, or move to a dedicated 10-inch driver when the system calls for more output and enclosure freedom."
                />
                <div className="mt-6">
                  <BenefitGrid
                    items={[
                      { stat: "77 mm", title: "Compact under-seat profile", text: "TS-08 and TS-10 keep enclosure height low while delivering 260 W rated power." },
                      { stat: "25 Hz", title: "Deeper extension from TS-10", text: "The 10-inch under-seat model reaches down to 25 Hz for more weight in low bass." },
                      { stat: "84 mm", title: "Slim 10-inch option", text: "10T6S-V4 combines a thin-line format with 400 W rated power for space-conscious builds." },
                    ]}
                  />
                </div>
              </div>
              <ProductStage src="/images/car-audio/subwoofers.webp" label="TEYES under-seat and standalone subwoofer range" />
            </div>

            <div className="mt-10 space-y-7">
              <div>
                <p className="mb-3 text-sm font-semibold text-primary">Under-seat subwoofers</p>
                <SpecTable
                  caption="TEYES under-seat subwoofer specifications"
                  headers={["Model", "Type", "Rated", "Max", "Sensitivity", "Frequency response", "Frequency control", "Dimensions", "Net weight"]}
                  rows={underSeatSpecs}
                />
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-primary">Subwoofer drivers</p>
                <SpecTable
                  caption="TEYES subwoofer driver specifications"
                  headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth"]}
                  rows={driverSpecs}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="bass-systems" className="scroll-mt-24 border-b border-border/60 py-16 md:py-24">
          <div className="container-wide">
            <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-10">
              <ProductStage src="/images/car-audio/bass-systems.webp" label="TEYES V8 competition and enclosed bass systems" />
              <div>
                <SectionHeading
                  compact
                  eyebrow="Bass systems"
                  title="Choose control, punch or maximum impact."
                  description="Sealed and ported birch-plywood enclosures make it easy to choose the character of the bass, while the V8 competition driver is built for high-excursion, high-power systems."
                />
                <div className="mt-6">
                  <BenefitGrid
                    items={[
                      { stat: "16 mm", title: "High-excursion V8 driver", text: "Generous X-MAX gives the 10V8-V4 the cone travel needed for forceful low-frequency output." },
                      { stat: "600 W", title: "Competition-series power", text: "Rated at 600 W with 1200 W maximum power for systems built around serious bass output." },
                      { stat: "Birch", title: "Purpose-built enclosures", text: "All four enclosed systems use birch plywood, with sealed and ported choices for different bass goals." },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.10),hsl(var(--card))_55%,hsl(var(--background)))] p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">10V8-V4 · V8 Competition Series</p>
                <h3 className="mt-2 text-2xl font-semibold md:text-3xl">Built for impact.</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">A high-excursion 10-inch platform for systems where bass output is a priority, not an afterthought.</p>
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
                <SpecTable
                  caption="TEYES enclosed subwoofer specifications"
                  headers={["Model", "Type", "Enclosure", "Surface treatment", "Dimensions", "Net weight"]}
                  rows={enclosedBassSpecs}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="amplifiers" className="scroll-mt-24 border-b border-border/60 py-16 md:py-24">
          <div className="container-wide">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
              <div>
                <SectionHeading
                  compact
                  eyebrow="Amplifiers"
                  title="Power that scales from a clean speaker upgrade to a full system."
                  description="TD brings efficient Class D power in compact chassis sizes. TP raises the output ceiling and adds DSP-controlled architecture for systems that need both muscle and tuning flexibility."
                />
                <div className="mt-6">
                  <BenefitGrid
                    items={[
                      { stat: "125 W × 4", title: "Strong 2-ohm four-channel output", text: "TD500/4 grows from 75 W × 4 at 4 Ω to 125 W × 4 at 2 Ω, with 250 W × 2 bridged." },
                      { stat: "200 W × 4", title: "TP800/4 adds serious headroom", text: "Four-channel DSP-controlled power rises to 200 W × 4 at 2 Ω or 400 W × 2 bridged." },
                      { stat: "1200 W × 1", title: "Dedicated bass authority", text: "TP1200/1 delivers up to 1200 W RMS at 2 Ω for demanding subwoofer systems." },
                    ]}
                  />
                </div>
              </div>
              <ProductStage src="/images/car-audio/amplifiers.webp" label="TEYES TD and TP Class D amplifiers" />
            </div>

            <div className="mt-10">
              <SpecTable
                caption="TEYES power amplifier specifications"
                headers={["Model", "Type", "RMS @ 4 Ω", "RMS @ 2 Ω", "Bridged @ 4 Ω", "Dimensions", "Net weight"]}
                rows={amplifierSpecs}
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 py-16 md:py-24">
          <div className="container-wide grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-10">
            <div>
              <SectionHeading
                eyebrow="Complete system"
                title="Build the signal chain around one connected product family."
                description="Start with the source, add the power the system needs, then choose the speaker and bass combination that matches the listening goal."
              />
              <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 text-sm leading-6 text-foreground/75">
                From everyday upgrades to higher-output active systems, TEYES Car Audio gives installers a clear path from infotainment to amplification, speakers and bass.
              </div>
            </div>
            <div className="relative grid gap-3">
              <div className="absolute bottom-7 left-5 top-7 w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent" aria-hidden="true" />
              {ecosystemSteps.map((step, index) => (
                <div key={step} className="relative flex items-center gap-5 rounded-2xl border border-border/60 bg-card/45 p-5 pl-4">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background text-sm font-semibold text-primary">
                    {index + 1}
                  </div>
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
              <SectionHeading
                eyebrow="Car Audio accessories"
                title="Finish the installation cleanly."
                description="Dedicated tweeter mounting hardware and protective grilles help complete T6 speaker installations with a more integrated finish."
              />
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

        <section className="border-b border-border/60 py-16 md:py-24">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/50 p-7 md:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
              <div className="relative max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">B2B cooperation</p>
                <h2 className="mt-3 text-3xl font-semibold">Build the right Car Audio range for your market.</h2>
                <p className="mt-5 leading-7 text-muted-foreground">
                  Talk with TEYES about model selection, product positioning, market availability and commercial options for your distribution channel.
                </p>
              </div>
              <Button asChild size="lg" className="relative mt-7 shrink-0 lg:mt-0">
                <Link to="/contact/">Contact TEYES B2B <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.13),hsl(var(--card))_50%,hsl(var(--background)))] px-7 py-10 md:px-12 md:py-16">
              <div className="absolute right-[-8%] top-[-45%] h-80 w-80 rounded-full border border-primary/10" aria-hidden="true" />
              <div className="relative max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">TEYES Car Audio</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Bring more sound to your next product lineup.</h2>
                <p className="mt-5 text-lg leading-8 text-foreground/75">
                  Tell us which speaker, bass and amplifier categories you are evaluating and we will help you build a focused wholesale selection.
                </p>
                <Button asChild size="lg" className="mt-8">
                  <Link to="/contact/">Start an Inquiry <ArrowRight className="h-4 w-4" /></Link>
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
