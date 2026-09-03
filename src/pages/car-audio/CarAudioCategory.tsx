import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ProductVisualGrid } from "./ProductVisual";
import {
  amplifierVisualIds,
  boxedSubwooferVisualIds,
  categoryProductVisualIds,
  coaxialSpeakerVisualIds,
  componentSpeakerVisualIds,
  getProductSpecValue,
  getProductVisuals,
  subwooferDriverVisualIds,
  underSeatVisualIds,
  type ProductVisualId,
} from "./productVisuals";

type CategoryKey = "speakers" | "enclosed-subwoofers" | "amplifiers";

type CategoryConfig = {
  label: string;
  noun: string;
  eyebrow: string;
  title: string;
  tagline: string;
  seoTitle: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  heroCopy: string;
  related: { label: string; href: string }[];
};

const categoryConfig: Record<CategoryKey, CategoryConfig> = {
  speakers: {
    label: "Speakers",
    noun: "speaker and subwoofer driver",
    eyebrow: "T3 · T6 speakers · 10-inch subwoofer drivers",
    title: "TEYES Car Speakers & Subwoofer Drivers",
    tagline: "Detail in Every Note.",
    seoTitle: "TEYES Car Speakers & Subwoofer Drivers",
    description:
      "Compare TEYES T3 and T6 car speakers plus standalone 10-inch standard-depth, thin-line and competition subwoofer drivers for automotive aftermarket channels.",
    path: "/car-audio/speakers/",
    image: "/images/car-audio/category-speakers.webp",
    imageAlt: "TEYES car speakers and standalone subwoofer drivers",
    heroCopy:
      "The range combines six T3 and T6 component, active 3-way and coaxial speakers with five standalone 10-inch subwoofer drivers for custom low-frequency installations.",
    related: [
      { label: "Enclosed Subwoofers", href: "/car-audio/enclosed-subwoofers/" },
      { label: "Amplifiers", href: "/car-audio/amplifiers/" },
    ],
  },
  "enclosed-subwoofers": {
    label: "Enclosed Subwoofers",
    noun: "enclosed subwoofer",
    eyebrow: "Under-seat · sealed · ported",
    title: "TEYES Enclosed Car Subwoofers",
    tagline: "Bass That Moves You.",
    seoTitle: "TEYES Enclosed Car Subwoofers - Under-Seat, Sealed & Ported",
    description:
      "Compare TEYES under-seat, sealed and ported enclosed subwoofers, including active and passive formats for automotive aftermarket channels.",
    path: "/car-audio/enclosed-subwoofers/",
    image: "/images/car-audio/category-enclosed-subwoofers.webp",
    imageAlt: "TEYES enclosed car subwoofer system",
    heroCopy:
      "Compact TS under-seat systems and birch-plywood sealed or ported enclosures cover integrated, active and passive bass installations without mixing in standalone subwoofer drivers.",
    related: [
      { label: "Speakers", href: "/car-audio/speakers/" },
      { label: "Amplifiers", href: "/car-audio/amplifiers/" },
    ],
  },
  amplifiers: {
    label: "Amplifiers",
    noun: "amplifier",
    eyebrow: "TD · TP Class D",
    title: "TEYES Car Amplifiers",
    tagline: "Power with Precision.",
    seoTitle: "TEYES Car Amplifiers - Class D & DSP-Controlled",
    description:
      "Compare TEYES TD and TP Class D car amplifiers, including four-channel, mono and DSP-controlled models for automotive aftermarket channels.",
    path: "/car-audio/amplifiers/",
    image: "/images/car-audio/category-amplifiers.webp",
    imageAlt: "TEYES TD and TP Class D car amplifier range",
    heroCopy:
      "From 200 W × 4 four-channel output to 1200 W × 1 mono at 2 ohms, TD and DSP-controlled TP models provide distinct power tiers for speaker systems and high-output bass builds.",
    related: [
      { label: "Speakers", href: "/car-audio/speakers/" },
      { label: "Enclosed Subwoofers", href: "/car-audio/enclosed-subwoofers/" },
    ],
  },
};

const comparisonRows = (ids: readonly ProductVisualId[], specificationLabels: readonly string[]) =>
  getProductVisuals(ids).map((product) => [
    product.model,
    product.comparisonType ?? product.type,
    ...specificationLabels.map((label) => getProductSpecValue(product, label) ?? "N/A"),
  ]);

const speakerSpecificationLabels = [
  "Rated Power",
  "Maximum Power",
  "Nominal Impedance",
  "Sensitivity",
  "Frequency Response",
  "Mounting Depth",
] as const;

const componentSpeakerSpecs = comparisonRows(componentSpeakerVisualIds, speakerSpecificationLabels);
const coaxialSpeakerSpecs = comparisonRows(coaxialSpeakerVisualIds, speakerSpecificationLabels);
const subwooferDriverSpecs = comparisonRows(subwooferDriverVisualIds, [
  ...speakerSpecificationLabels,
  "X-MAX",
  "Voice Coil",
]);
const underSeatSpecs = comparisonRows(underSeatVisualIds, [
  "Rated Power",
  "Maximum Power",
  "Sensitivity",
  "Frequency Response",
  "Frequency Control",
  "Dimensions",
  "Net Weight",
]);
const enclosedSubwooferSpecs = comparisonRows(boxedSubwooferVisualIds, [
  "Enclosure Material",
  "Surface Treatment",
  "Dimensions",
  "Net Weight",
]);
const amplifierSpecs = comparisonRows(amplifierVisualIds, [
  "RMS Power @ 4 Ω",
  "RMS Power @ 2 Ω",
  "Bridged Power @ 4 Ω",
  "Dimensions",
  "Net Weight",
]);

const SectionHeading = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
  <div className="mb-8 max-w-3xl">
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
    <p className="mt-3 text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
  </div>
);

const ProductStage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative isolate min-h-[180px] overflow-hidden rounded-[1.6rem] border border-border/60 bg-card/50 sm:min-h-[210px] md:min-h-[240px] lg:min-h-[260px]">
    <img
      src={src}
      alt={alt}
      width={520}
      height={390}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" aria-hidden="true" />
  </div>
);

const SpecTable = ({
  caption,
  headers,
  rows,
  wide = false,
}: {
  caption: string;
  headers: string[];
  rows: string[][];
  wide?: boolean;
}) => (
  <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card/35">
    <table className={`w-full ${wide ? "min-w-[1120px]" : "min-w-[820px]"} text-left text-sm`}>
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

function SpeakersContent() {
  return (
    <>
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Range structure"
            title="Four product families for cabin detail and low-frequency depth."
            description="Component and coaxial speakers cover cabin listening, while standard-depth, thin-line and competition drivers extend the range into custom bass installations."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Component Speakers</p>
              <h3 className="mt-2 text-2xl font-semibold">Detail in Every Note.</h3>
              <p className="mt-3 text-muted-foreground">T3-652, T6-652, T6-653A and T6-803A cover passive and active multi-way cabin speaker formats.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Coaxial Speakers</p>
              <h3 className="mt-2 text-2xl font-semibold">Music for Every Drive.</h3>
              <p className="mt-3 text-muted-foreground">T3-65X and T6-65X provide integrated coaxial speaker choices for straightforward cabin upgrades.</p>
            </div>
            <div id="standalone-subwoofer-drivers" className="scroll-mt-28 rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Standalone Subwoofer Drivers</p>
              <h3 className="mt-2 text-2xl font-semibold">Depth You Can Feel.</h3>
              <p className="mt-3 text-muted-foreground">10T3-D4, 10T3S-V4, 10T6-V4 and 10T6S-V4 cover standard-depth and thin-line custom enclosure formats.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">V8 Competition</p>
              <h3 className="mt-2 text-2xl font-semibold">Built for Impact.</h3>
              <p className="mt-3 text-muted-foreground">10V8-V4 forms the competition tier with 600 W rated power, 16 mm X-MAX and a CCAW voice coil.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="technical-comparison" className="scroll-mt-24 border-b border-border/60 py-16 md:py-20">
        <div className="container-wide space-y-8">
          <SectionHeading
            eyebrow="Technical comparison"
            title="Compare speakers and standalone subwoofer drivers."
            description="The same structured product data powers these tables and the on-demand product detail views above, keeping each published specification aligned with its model."
          />
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">Component and active speakers</p>
            <SpecTable caption="TEYES component and active speaker specifications" headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth"]} rows={componentSpeakerSpecs} />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">Coaxial speakers</p>
            <SpecTable caption="TEYES coaxial speaker specifications" headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth"]} rows={coaxialSpeakerSpecs} />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">Standalone 10-inch subwoofer drivers</p>
            <SpecTable
              caption="TEYES standalone 10-inch subwoofer driver specifications"
              headers={["Model", "Type", "Rated", "Max", "Impedance", "Sensitivity", "Frequency response", "Mounting depth", "X-MAX", "Voice coil"]}
              rows={subwooferDriverSpecs}
              wide
            />
          </div>
        </div>
      </section>
    </>
  );
}

function EnclosedSubwoofersContent() {
  return (
    <>
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Enclosed formats"
            title="Under-seat, sealed and ported subwoofers in one enclosed-system category."
            description="TS models provide compact integrated under-seat bass, while BXA3 and BX enclosures cover sealed, ported, active and passive installation formats."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Under-Seat Subwoofers</p>
              <h3 className="mt-2 text-2xl font-semibold">Big Bass. Small Footprint.</h3>
              <p className="mt-3 text-muted-foreground">TS-08 and TS-10 integrate the enclosure into a compact 77 mm-high format for space-sensitive installations.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Boxed Enclosed Subwoofers</p>
              <h3 className="mt-2 text-2xl font-semibold">Bass That Moves You.</h3>
              <p className="mt-3 text-muted-foreground">BXA3 and BX models provide active and passive sealed or ported birch-plywood enclosure choices.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="technical-comparison" className="scroll-mt-24 border-b border-border/60 py-16 md:py-20">
        <div className="container-wide space-y-8">
          <SectionHeading
            eyebrow="Technical comparison"
            title="Compare all enclosed subwoofer formats."
            description="Under-seat performance data and boxed-enclosure construction data remain separated into the parameter sets published for each product format."
          />
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">Under-seat enclosed subwoofers</p>
            <SpecTable caption="TEYES under-seat enclosed subwoofer specifications" headers={["Model", "Type", "Rated", "Max", "Sensitivity", "Frequency response", "Frequency control", "Dimensions", "Net weight"]} rows={underSeatSpecs} />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-primary">Sealed and ported boxed subwoofers</p>
            <SpecTable caption="TEYES boxed enclosed subwoofer specifications" headers={["Model", "Type", "Enclosure", "Surface treatment", "Dimensions", "Net weight"]} rows={enclosedSubwooferSpecs} />
          </div>
        </div>
      </section>
    </>
  );
}

function AmplifiersContent() {
  return (
    <>
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container-wide">
          <SectionHeading eyebrow="Series structure" title="Four-channel and mono choices across TD and DSP-controlled TP." description="TD and TP both cover multi-channel speaker amplification and dedicated mono bass power, while TP adds DSP control and a higher-output tier." />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">TD Series</p>
              <h3 className="mt-2 text-2xl font-semibold">TD500/4 · TD1000/1</h3>
              <p className="mt-3 text-muted-foreground">Class D four-channel and mono models for speaker and subwoofer system layouts.</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/45 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">TP Series</p>
              <h3 className="mt-2 text-2xl font-semibold">TP800/4 · TP1200/1</h3>
              <p className="mt-3 text-muted-foreground">DSP-controlled Class D four-channel and mono models forming the higher-output amplifier tier.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="technical-comparison" className="scroll-mt-24 border-b border-border/60 py-16 md:py-20">
        <div className="container-wide">
          <SectionHeading eyebrow="Technical comparison" title="Compare channel layout and published RMS output." description="RMS power at 4 and 2 ohms shows the available output for different speaker and subwoofer system layouts; bridged output is listed where supported." />
          <SpecTable caption="TEYES power amplifier specifications" headers={["Model", "Type", "RMS @ 4 Ω", "RMS @ 2 Ω", "Bridged @ 4 Ω", "Dimensions", "Net weight"]} rows={amplifierSpecs} />
        </div>
      </section>
    </>
  );
}

function CategoryBody({ category }: { category: CategoryKey }) {
  if (category === "speakers") return <SpeakersContent />;
  if (category === "enclosed-subwoofers") return <EnclosedSubwoofersContent />;
  return <AmplifiersContent />;
}

const CarAudioCategory = ({ category }: { category: CategoryKey }) => {
  const config = categoryConfig[category];
  const categoryProducts = getProductVisuals(categoryProductVisualIds[category]);
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: config.title,
    url: `https://teyesglobal.com${config.path}`,
    description: config.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categoryProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.model,
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
        <section className="hero-section relative border-b border-border/60 pt-20 md:pt-24">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container-wide relative grid items-center gap-6 py-6 sm:py-8 md:py-10 lg:grid-cols-[1fr_0.82fr] lg:gap-10 lg:py-12">
            <div className="relative z-10">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <li><Link to="/" className="transition-colors hover:text-primary">Home</Link></li>
                  <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                  <li><Link to="/car-audio/" className="transition-colors hover:text-primary">Car Audio</Link></li>
                  <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                  <li className="text-foreground/80" aria-current="page">{config.label}</li>
                </ol>
              </nav>

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">{config.eyebrow}</p>
              <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{config.title}</h1>
              <p className="mt-3 text-xl font-medium tracking-tight text-primary md:text-2xl">{config.tagline}</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/80 md:text-lg">{config.heroCopy}</p>
              <a href="#product-lineup" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                View models &amp; specs <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <ProductStage src={config.image} alt={config.imageAlt} />
          </div>
        </section>

        <section id="product-lineup" className="scroll-mt-24 border-b border-border/60 py-16 md:py-20">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Product lineup"
              title={`Explore the ${config.noun} lineup.`}
              description="Open any product for a focused detail view with its complete applicable specifications, or continue to the comparison tables below to compare models side by side."
            />
            <ProductVisualGrid products={categoryProducts} />
          </div>
        </section>

        <CategoryBody category={category} />

        <section className="py-16 md:py-20">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,hsl(var(--primary)/0.13),hsl(var(--card))_50%,hsl(var(--background)))] px-7 py-10 md:px-12 md:py-14">
              <div className="relative max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">B2B cooperation</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Request the TEYES {config.noun} range for your market.</h2>
                <p className="mt-4 text-base leading-7 text-foreground/75 md:text-lg">Contact TEYES for wholesale product information and the current model list for your channel.</p>
                <Button asChild size="lg" className="mt-7">
                  <Link to="/contact/">Contact TEYES B2B <ArrowRight className="h-4 w-4" /></Link>
                </Button>

                <div className="mt-7 border-t border-border/60 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Explore other Car Audio ranges</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    {config.related.map((item) => (
                      <Link key={item.href} to={item.href} className="font-medium text-foreground/75 transition-colors hover:text-primary">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CarAudioCategory;
