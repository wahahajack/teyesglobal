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
    description:
      "Component, coaxial and active 3-way configurations across the T3 and T6 speaker families.",
    models: ["T3-652", "T3-65X", "T6-652", "T6-653A", "T6-603A", "T6-65X"],
    icon: Volume2,
    anchor: "speakers",
  },
  {
    title: "Subwoofers",
    eyebrow: "Under-seat · Drivers",
    description:
      "Compact TS under-seat products plus standard and thin-line T3/T6 subwoofer-driver formats.",
    models: ["TS-08", "TS-10", "10T3-V4 / D4*", "10T3S-V4", "10T6-V4", "10T6S-V4"],
    icon: Radio,
    anchor: "subwoofers",
  },
  {
    title: "Bass Systems",
    eyebrow: "Competition · Enclosed",
    description:
      "V8 competition bass plus active/passive sealed and ported BXA/BX enclosed systems.",
    models: ["10V8-V4", "BXA3-10T3S-V4", "BX1-10T3S-V4", "BX2-10T3S-V4", "BX4-10T3-D4"],
    icon: Box,
    anchor: "bass-systems",
  },
  {
    title: "Amplifiers",
    eyebrow: "TD · TP",
    description:
      "Class D TD power amplifiers and DSP-controlled TP models with published output and chassis data.",
    models: ["TD500/4", "TD1000/1", "TP800/4", "TP1200/1"],
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
  ["10T3-D4*", '10" Subwoofer', "400 W", "800 W", "4 Ω", "85 dB", "31.5 Hz-400 Hz", "148.5 mm"],
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
  <div className={compact ? "max-w-3xl" : "max-w-3xl mb-10"}>
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
    <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
  </div>
);

const ProductStage = ({ src, label, height = 295 }: { src: string; label: string; height?: number }) => (
  <div
    className="relative isolate min-h-[390px] overflow-hidden rounded-[2rem] border border-border/60 bg-card/50 md:min-h-[440px]"
    role="img"
    aria-label={label}
  >
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_46%_48%,hsl(var(--primary)/0.18),transparent_36%),linear-gradient(145deg,hsl(var(--secondary)/0.58),hsl(var(--background))_68%)]"
      aria-hidden="true"
    />
    <div className="absolute inset-x-[14%] bottom-7 h-20 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
    <div className="absolute left-[12%] top-[12%] h-28 w-28 rounded-full border border-primary/10" aria-hidden="true" />
    <div className="absolute right-[8%] bottom-[10%] h-40 w-40 rounded-full border border-accent/10" aria-hidden="true" />
    <div className="relative flex min-h-[390px] items-center justify-center p-4 md:min-h-[440px] md:p-7">
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
        <section className="hero-section relative border-b border-border/60 pt-28 md:pt-32">
          <div className="hero-glow" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,hsl(var(--accent)/0.12),transparent_27%)]"
            aria-hidden="true"
          />
          <div className="container-wide relative grid items-center gap-10 py-16 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14 md:py-24">
            <div className="relative z-10">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <li>
                    <Link to="/" className="transition-colors hover:text-primary">Home</Link>
                  </li>
                  <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                  <li className="text-foreground/80" aria-current="page">Car Audio</li>
                </ol>
              </nav>

              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-primary">Detail · Dynamics · Depth</p>
              <h1 className="text-5xl font-semibold leading-[0.96] tracking-[-0.04em] md:text-6xl lg:text-7xl">TEYES Car Audio</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/80 md:text-xl">
                Speakers, subwoofers, bass systems and amplifiers for automotive aftermarket distributors,
                installers and car-audio channels.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                A dedicated product family extending the TEYES in-car entertainment portfolio beyond infotainment.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link to="/contact/">Request Wholesale Information <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/30 bg-background/20 hover:bg-primary/10">
                  <a href="#product-range">View Product Range</a>
                </Button>
              </div>
            </div>

            <div className="relative min-h-[430px] lg:min-h-[520px]">
              <div
                className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_55%_50%,hsl(var(--primary)/0.19),transparent_42%)]"
                aria-hidden="true"
              />
              <div className="absolute left-[6%] top-[10%] h-24 w-24 rounded-full border border-primary/15" aria-hidden="true" />
              <div className="absolute right-[8%] bottom-[10%] h-44 w-44 rounded-full border border-accent/10" aria-hidden="true" />
              <img
                src="/images/car-audio/overview.webp"
                alt="TEYES Car Audio speakers, subwoofer and amplifier range"
                width={500}
                height={283}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 m-auto h-auto max-h-[480px] w-[108%] max-w-none object-contain drop-shadow-[0_34px_54px_rgba(0,0,0,0.55)] lg:w-[112%]"
              />
              <div className="absolute right-0 top-7 rounded-xl border border-primary/20 bg-background/70 px-4 py-3 shadow-lg backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Product family</p>
                <p className="mt-1 text-sm font-semibold">Speakers · Bass · Amplification</p>
              </div>
              <div className="absolute bottom-5 left-0 flex gap-2">
                {["T3 / T6", "TS", "TD / TP"].map((tag) => (
                  <span key={tag} className="rounded-full border border-border/70 bg-card/75 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="product-range" className="scroll-mt-24 border-b border-border/60">
          <div className="container-wide py-20 md:py-24">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                compact
                eyebrow="Product range"
                title="Four core Car Audio families"
                description="A clear product ladder for B2B buyers, with technical data organized by family instead of repeating the same product collage in every card."
              />
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                21 core models across speakers, subwoofers, bass systems and Class D amplification.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                    <p className="mt-5 text-xs text-foreground/60">{family.models.length} models</p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="speakers" className="scroll-mt-24 border-b border-border/60 py-20 md:py-24">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <ProductStage src="/images/car-audio/speakers.webp" label="TEYES T3 and T6 speaker range" />
              <SectionHeading
                compact
                eyebrow="Speakers"
                title="T3 and T6 speaker families"
                description="The catalog publishes power handling, impedance, sensitivity, frequency response and mounting depth for all six speaker models."
              />
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

        <section id="subwoofers" className="scroll-mt-24 border-b border-border/60 py-20 md:py-24">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <SectionHeading
                  compact
                  eyebrow="Subwoofers"
                  title="Under-seat bass and standalone drivers"
                  description="The TS models add compact powered bass, while the T3/T6 driver range includes standard and thin-line 10-inch formats."
                />
                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/[0.055] p-5 text-sm leading-6 text-foreground/75">
                  The catalog uses the heading “Custom-Fit Subwoofers”. This page does not infer vehicle-specific fitment without a separate fitment list.
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
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  * The catalog lineup page labels the first driver “10T3-V4”, while the technical specification page labels it “10T3-D4”. Confirm the commercial model code before ordering.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="bass-systems" className="scroll-mt-24 border-b border-border/60 py-20 md:py-24">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
              <ProductStage src="/images/car-audio/bass-systems.webp" label="TEYES V8 competition and enclosed bass systems" />
              <SectionHeading
                compact
                eyebrow="Bass systems"
                title="Competition and enclosed bass formats"
                description="The V8 competition model sits alongside four BXA/BX enclosures with published construction, finish, dimensions and net-weight data."
              />
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.10),hsl(var(--card))_55%,hsl(var(--background)))] p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">10V8-V4 · V8 Competition Series</p>
                <h3 className="mt-2 text-2xl font-semibold md:text-3xl">Published technical profile</h3>
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

        <section id="amplifiers" className="scroll-mt-24 border-b border-border/60 py-20 md:py-24">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <SectionHeading
                  compact
                  eyebrow="Amplifiers"
                  title="TD power and DSP-controlled TP amplification"
                  description="All four models are Class D. The TP models are explicitly labeled DSP-Controlled in the catalog, with RMS output, bridged output, dimensions and net weight published for comparison."
                />
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

        <section className="border-b border-border/60 py-20 md:py-24">
          <div className="container-wide grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Portfolio ecosystem"
                title="A broader TEYES in-car entertainment offer"
                description="Build a broader product portfolio across source, amplification, speakers and bass while matching power, impedance and installation requirements per vehicle project."
              />
              <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 text-sm leading-6 text-foreground/75">
                Product-portfolio breadth does not imply universal electrical or mechanical compatibility between every TEYES head unit and every Car Audio model.
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

        <section className="border-b border-border/60 py-20 md:py-24">
          <div className="container-wide grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <ProductStage src="/images/car-audio/accessories.webp" label="TEYES Car Audio tweeter mounts and speaker grilles" height={227} />
            <div>
              <SectionHeading
                eyebrow="Car Audio accessories"
                title="Supporting hardware for the speaker range"
                description="Car Audio-specific mounts and grilles stay inside this product family and remain separate from the existing head-unit Accessories page."
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

        <section className="border-b border-border/60 py-20 md:py-24">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/50 p-7 md:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
              <div className="relative max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">B2B cooperation</p>
                <h2 className="mt-3 text-3xl font-semibold">Discuss the range for your market</h2>
                <p className="mt-5 leading-7 text-muted-foreground">
                  Contact the TEYES B2B team for model selection, full product specifications, market availability and commercial information for the Car Audio range.
                </p>
              </div>
              <Button asChild size="lg" className="relative mt-7 shrink-0 lg:mt-0">
                <Link to="/contact/">Contact TEYES B2B <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.13),hsl(var(--card))_50%,hsl(var(--background)))] px-7 py-12 md:px-12 md:py-16">
              <div className="absolute right-[-8%] top-[-45%] h-80 w-80 rounded-full border border-primary/10" aria-hidden="true" />
              <div className="relative max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">TEYES Car Audio</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Request wholesale product information</h2>
                <p className="mt-5 text-lg leading-8 text-foreground/75">
                  Tell us your country, business type, sales channel and the Car Audio product families you are evaluating.
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
