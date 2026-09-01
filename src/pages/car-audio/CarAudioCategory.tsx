import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

type CategoryKey = "speakers" | "subwoofers" | "bass-systems" | "amplifiers";

type CategoryConfig = {
  label: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  heroCopy: string;
  models: string[];
  related: { label: string; href: string }[];
};

const categoryConfig: Record<CategoryKey, CategoryConfig> = {
  speakers: {
    label: "Speakers",
    eyebrow: "T3 · T6 speaker range",
    title: "TEYES Car Speakers",
    seoTitle: "TEYES Car Speakers - T3 & T6 Series",
    description:
      "Compare TEYES T3 and T6 component, active 3-way and coaxial car speakers for automotive aftermarket distribution and installation channels.",
    path: "/car-audio/speakers/",
    image: "/images/car-audio/speakers.webp",
    imageAlt: "TEYES T3 and T6 car speaker range",
    heroCopy:
      "A six-model range covering passive component, active 3-way and coaxial configurations, with rated power from 100 W to 180 W.",
    models: ["T3-652", "T3-65X", "T6-652", "T6-653A", "T6-603A", "T6-65X"],
    related: [
      { label: "Amplifiers", href: "/car-audio/amplifiers/" },
      { label: "Subwoofers", href: "/car-audio/subwoofers/" },
    ],
  },
  subwoofers: {
    label: "Subwoofers",
    eyebrow: "Under-seat · 10-inch drivers",
    title: "TEYES Car Subwoofers",
    seoTitle: "TEYES Car Subwoofers - Under-Seat & 10-Inch Drivers",
    description:
      "Compare TEYES TS under-seat subwoofers and 10-inch standard or thin-line subwoofer drivers for automotive aftermarket channels.",
    path: "/car-audio/subwoofers/",
    image: "/images/car-audio/subwoofers.webp",
    imageAlt: "TEYES under-seat and 10-inch subwoofer range",
    heroCopy:
      "Compact 77 mm under-seat systems plus standard and thin-line 10-inch drivers for different installation depths and output requirements.",
    models: ["TS-08", "TS-10", "10T3-D4", "10T3S-V4", "10T6-V4", "10T6S-V4"],
    related: [
      { label: "Bass Systems", href: "/car-audio/bass-systems/" },
      { label: "Amplifiers", href: "/car-audio/amplifiers/" },
    ],
  },
  "bass-systems": {
    label: "Bass Systems",
    eyebrow: "Competition · Enclosed systems",
    title: "TEYES Car Bass Systems & Subwoofer Enclosures",
    seoTitle: "TEYES Car Bass Systems & Subwoofer Enclosures",
    description:
      "Explore TEYES enclosed sealed and ported subwoofer systems plus the V8 competition subwoofer range for car audio distribution channels.",
    path: "/car-audio/bass-systems/",
    image: "/images/car-audio/bass-systems.webp",
    imageAlt: "TEYES V8 competition and enclosed bass systems",
    heroCopy:
      "Active and passive sealed or ported enclosures sit alongside the 600 W rated V8 competition subwoofer for higher-output bass programs.",
    models: ["10V8-V4", "BXA3-10T3S-V4", "BX1-10T3S-V4", "BX2-10T3S-V4", "BX4-10T3-D4"],
    related: [
      { label: "Subwoofers", href: "/car-audio/subwoofers/" },
      { label: "Amplifiers", href: "/car-audio/amplifiers/" },
    ],
  },
  amplifiers: {
    label: "Amplifiers",
    eyebrow: "TD · TP Class D",
    title: "TEYES Car Amplifiers",
    seoTitle: "TEYES Car Amplifiers - Class D & DSP-Controlled",
    description:
      "Compare TEYES TD and TP Class D car amplifiers, including four-channel, mono and DSP-controlled models for automotive aftermarket channels.",
    path: "/car-audio/amplifiers/",
    image: "/images/car-audio/amplifiers.webp",
    imageAlt: "TEYES TD and TP Class D car amplifier range",
    heroCopy:
      "Four-channel and mono Class D amplifiers across TD and DSP-controlled TP series, with output up to 1200 W × 1 at 2 ohms.",
    models: ["TD500/4", "TD1000/1", "TP800/4", "TP1200/1"],
    related: [
      { label: "Speakers", href: "/car-audio/speakers/" },
      { label: "Subwoofers", href: "/car-audio/subwoofers/" },
    ],
  },
};

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

const SectionHeading = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
  <div className="mb-8 max-w-3xl">
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
    <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
  </div>
);

const ProductStage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative isolate min-h-[300px] overflow-hidden rounded-[2rem] border border-border/60 bg-card/50 md:min-h-[440px]">
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,hsl(var(--primary)/0.18),transparent_38%),linear-gradient(145deg,hsl(var(--secondary)/0.58),hsl(var(--background))_68%)]"
      aria-hidden="true"
    />
    <div className="relative flex min-h-[300px] items-center justify-center p-5 md:min-h-[440px] md:p-8">
      <img
        src={src}
        alt={alt}
        width={500}
        height={320}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="relative z-10 h-auto w-full object-contain drop-shadow-[0_28px_42px_rgba(0,0,0,0.52)]"
      />
    </div>
  </div>
);

const SpecTable = ({ caption, headers, rows }: { caption: string; headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card/35">
    <table className="w-full min-w-[820px] text-left text-sm">
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

const DecisionGrid = ({ items }: { items: { title: string; text: string }[] }) => (
  <div className="grid gap-4 md:grid-cols-3">
    {items.map((item) => (
      <div key={item.title} className="rounded-2xl border border-border/60 bg-card/45 p-5">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
      </div>
    ))}
  </div>
);

function SpeakersContent() {
  return (
    <>
      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Range structure"
            title="T3 and T6 cover distinct speaker configurations."
            description="Use the series, speaker format, rated power and mounting depth to shape the right assortment for your channel."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">T3 Series</p>
              <h3 className="mt-2 text-2xl font-semibold">T3-652 · T3-65X</h3>
              <p className="mt-3 text-muted-foreground">A 100 W rated component option and a 100 W rated coaxial option, both with 71 mm mounting depth.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">T6 Series</p>
              <h3 className="mt-2 text-2xl font-semibold">Passive · Active 3-way · Coaxial</h3>
              <p className="mt-3 text-muted-foreground">Four configurations from 120 W to 180 W rated power, including 6.5-inch and 8-inch active 3-way models.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="container-wide space-y-8">
          <SectionHeading
            eyebrow="Technical comparison"
            title="Compare the six speaker models."
            description="The catalog supplies type, rated and maximum power, impedance, sensitivity, frequency response and mounting depth."
          />
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">Component and active configurations</p>
            <SpecTable caption="TEYES component and active speaker specifications" headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth"]} rows={componentSpeakerSpecs} />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">Coaxial configurations</p>
            <SpecTable caption="TEYES coaxial speaker specifications" headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth"]} rows={coaxialSpeakerSpecs} />
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Selection checkpoints" title="Build the range around installation and system needs." description="These are the main catalog dimensions distributors and installers can compare before narrowing the model list." />
          <DecisionGrid items={[
            { title: "Speaker format", text: "Separate passive component, active 3-way and coaxial configurations before comparing models." },
            { title: "Rated power", text: "The published range runs from 100 W to 180 W rated power across T3 and T6." },
            { title: "Mounting depth", text: "Published mounting depth is 71 mm for T3 models and 77.5 mm for the listed T6 models." },
          ]} />
        </div>
      </section>
    </>
  );
}

function SubwoofersContent() {
  return (
    <>
      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Two installation formats" title="Under-seat systems and standalone 10-inch drivers." description="Keep compact integrated bass and enclosure-ready subwoofer drivers as separate buying decisions." />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">TS Under-Seat</p>
              <h3 className="mt-2 text-2xl font-semibold">TS-08 · TS-10</h3>
              <p className="mt-3 text-muted-foreground">Both models are 77 mm high, with 260 W rated power and different cabinet footprints and low-frequency response.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">10-inch drivers</p>
              <h3 className="mt-2 text-2xl font-semibold">Standard · Thin-line</h3>
              <p className="mt-3 text-muted-foreground">Four 10-inch drivers cover 400–500 W rated power with mounting depths from 84 mm to 160.5 mm.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="container-wide space-y-8">
          <SectionHeading eyebrow="Technical comparison" title="Compare compact systems and standalone drivers separately." description="The two groups solve different installation tasks, so their catalog specifications are kept in separate tables." />
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">Under-seat subwoofers</p>
            <SpecTable caption="TEYES under-seat subwoofer specifications" headers={["Model", "Type", "Rated", "Max", "Sensitivity", "Frequency response", "Frequency control", "Dimensions", "Net weight"]} rows={underSeatSpecs} />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">10-inch subwoofer drivers</p>
            <SpecTable caption="TEYES 10-inch subwoofer driver specifications" headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth"]} rows={driverSpecs} />
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Selection checkpoints" title="Start with available space, then compare electrical and acoustic specifications." description="The catalog gives enough dimensional and power data to separate compact installations from enclosure-based builds." />
          <DecisionGrid items={[
            { title: "Installation format", text: "Choose between an integrated under-seat unit and a standalone 10-inch driver before comparing individual models." },
            { title: "Available depth", text: "Under-seat units are 77 mm high; the listed 10-inch drivers range from 84 mm to 160.5 mm mounting depth." },
            { title: "Power and impedance", text: "Standalone drivers publish 400–500 W rated power and single or dual 4-ohm configurations depending on model." },
          ]} />
        </div>
      </section>
    </>
  );
}

function BassSystemsContent() {
  return (
    <>
      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="container-wide grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.10),hsl(var(--card))_55%,hsl(var(--background)))] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">10V8-V4 · V8 Competition Series</p>
            <h2 className="mt-2 text-3xl font-semibold">600 W rated competition subwoofer.</h2>
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
            <SectionHeading eyebrow="Enclosed systems" title="Four cabinet formats with active, passive, sealed and ported options." description="The enclosed range uses birch plywood and publishes enclosure type, surface treatment, dimensions and net weight for each model." />
            <SpecTable caption="TEYES enclosed bass system specifications" headers={["Model", "Type", "Enclosure", "Surface treatment", "Dimensions", "Net weight"]} rows={enclosedBassSpecs} />
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Selection checkpoints" title="Separate competition drivers from complete enclosed systems." description="This keeps the category clear for buyers comparing ready-built enclosures against a dedicated high-output subwoofer driver." />
          <DecisionGrid items={[
            { title: "System format", text: "The enclosed range includes one active sealed model plus passive sealed and passive ported models." },
            { title: "Cabinet construction", text: "All four listed enclosed systems specify birch plywood, with felt, flat covering or polyurea surface treatments." },
            { title: "Competition specification", text: "The 10V8-V4 publishes 600 W rated power, 1200 W maximum power and 16 mm X-MAX." },
          ]} />
        </div>
      </section>
    </>
  );
}

function AmplifiersContent() {
  return (
    <>
      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Series structure" title="TD Class D and TP DSP-controlled Class D amplifiers." description="The four-model range separates four-channel and mono output while keeping TD and TP as clear series choices." />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">TD Series</p>
              <h3 className="mt-2 text-2xl font-semibold">TD500/4 · TD1000/1</h3>
              <p className="mt-3 text-muted-foreground">Class D four-channel and mono models in a 250 × 172 × 60 mm chassis format.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">TP Series</p>
              <h3 className="mt-2 text-2xl font-semibold">TP800/4 · TP1200/1</h3>
              <p className="mt-3 text-muted-foreground">DSP-controlled Class D four-channel and mono models, each listed at 300 × 176 × 60 mm.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Technical comparison" title="Compare channel layout and published RMS output." description="The catalog supplies RMS power at 4 and 2 ohms, bridged output where applicable, dimensions and net weight." />
          <SpecTable caption="TEYES power amplifier specifications" headers={["Model", "Type", "RMS @ 4 Ω", "RMS @ 2 Ω", "Bridged @ 4 Ω", "Dimensions", "Net weight"]} rows={amplifierSpecs} />
        </div>
      </section>

      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Selection checkpoints" title="Choose by channel count, impedance and output tier." description="The published specifications make it possible to compare the amplifier range without relying on unsupported feature claims." />
          <DecisionGrid items={[
            { title: "Four-channel or mono", text: "TD500/4 and TP800/4 are four-channel models; TD1000/1 and TP1200/1 are mono models." },
            { title: "TD or TP", text: "TD models are listed as Class D; TP models are explicitly listed as Class D DSP-Controlled." },
            { title: "Published RMS output", text: "At 2 ohms, the catalog lists up to 200 W × 4 for the four-channel range and 1200 W × 1 for the mono range." },
          ]} />
        </div>
      </section>
    </>
  );
}

function CategoryBody({ category }: { category: CategoryKey }) {
  if (category === "speakers") return <SpeakersContent />;
  if (category === "subwoofers") return <SubwoofersContent />;
  if (category === "bass-systems") return <BassSystemsContent />;
  return <AmplifiersContent />;
}

const CarAudioCategory = ({ category }: { category: CategoryKey }) => {
  const config = categoryConfig[category];
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: config.title,
    url: `https://teyesglobal.com${config.path}`,
    description: config.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: config.models.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
      })),
    },
  });

  return (
    <Layout>
      <SEO
        title={config.seoTitle}
        description={config.description}
        path={config.path}
        schema={schema}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Car Audio", href: "/car-audio/" },
          { label: config.label },
        ]}
      />

      <div className="bg-background text-foreground">
        <section className="hero-section relative border-b border-border/60 pt-20 md:pt-24 lg:pt-32">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container-wide relative grid items-center gap-8 py-10 md:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-20">
            <div className="relative z-10">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <li><Link to="/" className="transition-colors hover:text-primary">Home</Link></li>
                  <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                  <li><Link to="/car-audio/" className="transition-colors hover:text-primary">Car Audio</Link></li>
                  <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                  <li className="text-foreground/80" aria-current="page">{config.label}</li>
                </ol>
              </nav>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">{config.eyebrow}</p>
              <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl md:text-6xl">{config.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/80">{config.heroCopy}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to="/contact/">Request Wholesale Information <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/car-audio/">Back to Car Audio</Link>
                </Button>
              </div>
            </div>
            <ProductStage src={config.image} alt={config.imageAlt} />
          </div>
        </section>

        <CategoryBody category={category} />

        <section className="border-b border-border/60 py-16 md:py-20">
          <div className="container-wide">
            <SectionHeading eyebrow="Related Car Audio ranges" title="Continue building the product mix." description="Move between adjacent categories without returning to the main site product tree." />
            <div className="grid gap-4 sm:grid-cols-2">
              {config.related.map((item) => (
                <Link key={item.href} to={item.href} className="group flex items-center justify-between rounded-2xl border border-border/60 bg-card/45 p-5 transition-colors hover:border-primary/40">
                  <span className="font-semibold">{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.13),hsl(var(--card))_50%,hsl(var(--background)))] px-7 py-10 md:px-12 md:py-14">
              <div className="relative max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">B2B cooperation</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Request the {config.label.toLowerCase()} range for your market.</h2>
                <p className="mt-4 text-base leading-7 text-foreground/75 md:text-lg">Contact TEYES for wholesale product information and the current model list for your channel.</p>
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

export default CarAudioCategory;
