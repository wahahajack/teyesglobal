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
    description:
      "T3 and T6 component and coaxial speaker families for automotive aftermarket product portfolios.",
    models: ["T3-652", "T3-65X", "T6-652", "T6-653A", "T6-603A", "T6-65X"],
    icon: Volume2,
    anchor: "speakers",
  },
  {
    title: "Subwoofers",
    description:
      "Under-seat subwoofers and standalone subwoofer drivers covering compact and conventional bass-system formats.",
    models: ["TS-08", "TS-10", "10T3-V4", "10T3S-V4", "10T6-V4", "10T6S-V4"],
    icon: Radio,
    anchor: "subwoofers",
  },
  {
    title: "Bass Systems",
    description:
      "Competition and enclosed bass products, including active and passive sealed or ported configurations identified in the catalog.",
    models: ["10V8-V4", "BXA3-10T3S-V4", "BX1-10T3S-V4", "BX2-10T3S-V4", "BX4-10T3-D4"],
    icon: Box,
    anchor: "bass-systems",
  },
  {
    title: "Amplifiers",
    description:
      "Class D power amplification in TD and TP series, including DSP-controlled TP models as identified in the catalog.",
    models: ["TD500/4", "TD1000/1", "TP800/4", "TP1200/1"],
    icon: SlidersHorizontal,
    anchor: "amplifiers",
  },
];

const speakerSeries = [
  {
    series: "T3 Series",
    summary: "Component and coaxial speaker options.",
    models: [
      { model: "T3-652", type: "Component speaker" },
      { model: "T3-65X", type: "Coaxial speaker" },
    ],
  },
  {
    series: "T6 Series",
    summary: "Broader speaker range including component, active 3-way and coaxial configurations.",
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
    description: "Compact powered-bass formats identified by size in the catalog.",
    models: [
      { model: "TS-08", detail: "8-inch under-seat subwoofer" },
      { model: "TS-10", detail: "10-inch under-seat subwoofer" },
    ],
  },
  {
    title: "Subwoofer drivers",
    description:
      "Standalone driver models. No vehicle-specific fitment claim is made without separate fitment evidence.",
    models: [
      { model: "10T3-V4", detail: "Subwoofer driver" },
      { model: "10T3S-V4", detail: "Subwoofer driver" },
      { model: "10T6-V4", detail: "Subwoofer driver" },
      { model: "10T6S-V4", detail: "Subwoofer driver" },
    ],
  },
];

const bassSystems = [
  { model: "10V8-V4", configuration: "V8 competition series, 10-inch subwoofer" },
  { model: "BXA3-10T3S-V4", configuration: "Enclosed bass system" },
  { model: "BX1-10T3S-V4", configuration: "Enclosed bass system" },
  { model: "BX2-10T3S-V4", configuration: "Enclosed bass system" },
  { model: "BX4-10T3-D4", configuration: "Enclosed bass system" },
];

const amplifiers = [
  { model: "TD500/4", classType: "Class D", control: "Standard TD series" },
  { model: "TD1000/1", classType: "Class D", control: "Standard TD series" },
  { model: "TP800/4", classType: "Class D", control: "DSP-controlled" },
  { model: "TP1200/1", classType: "Class D", control: "DSP-controlled" },
];

const accessories = ["Tweeter Mount", "T6-650 Woofer Grille", "T6-65X Coaxial Grille"];

const ecosystemSteps = [
  "TEYES Infotainment / Head Unit",
  "Amplifier",
  "Speakers",
  "Subwoofer / Bass",
];

const collectionSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TEYES Car Audio",
  url: "https://teyesglobal.com/car-audio/",
  description:
    "TEYES Car Audio speakers, subwoofers, bass systems and power amplifiers for automotive aftermarket distributors and car audio channels.",
  hasPart: productFamilies.map((family) => ({
    "@type": "WebPageElement",
    name: family.title,
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
  <div className="max-w-3xl mb-10">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400 mb-3">{eyebrow}</p>
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{title}</h2>
    <p className="mt-4 text-base md:text-lg leading-8 text-zinc-400">{description}</p>
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
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Car Audio" },
        ]}
      />

      <main className="bg-[#070707] text-white">
        <section className="relative overflow-hidden border-b border-white/10 pt-28 md:pt-32">
          <div
            className="absolute inset-0 opacity-70"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at 78% 35%, rgba(249,115,22,0.22), transparent 28%), radial-gradient(circle at 12% 0%, rgba(249,115,22,0.10), transparent 26%)",
            }}
          />
          <div className="container-wide relative grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center py-20 md:py-28">
            <div>
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                  <li>
                    <Link to="/" className="hover:text-orange-400 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="h-4 w-4" />
                  </li>
                  <li className="text-zinc-300" aria-current="page">
                    Car Audio
                  </li>
                </ol>
              </nav>

              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-400 mb-5">
                Detail · Dynamics · Depth
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[0.96]">
                TEYES Car Audio
              </h1>
              <p className="mt-7 max-w-2xl text-lg md:text-xl leading-8 text-zinc-300">
                Speakers, subwoofers, bass systems and amplifiers for automotive aftermarket
                distributors, installers and car-audio channels.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-500">
                A dedicated TEYES product family that broadens the in-car entertainment portfolio
                without changing the existing Android head-unit range.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-orange-500 text-black hover:bg-orange-400">
                  <Link to="/contact/">
                    Request Wholesale Information
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="#product-range">View Product Range</a>
                </Button>
              </div>
            </div>

            <div className="relative min-h-[360px] md:min-h-[440px] flex items-center justify-center" aria-hidden="true">
              <div className="absolute h-80 w-80 md:h-[420px] md:w-[420px] rounded-full border border-orange-400/20 shadow-[0_0_100px_rgba(249,115,22,0.12)]" />
              <div className="absolute h-60 w-60 md:h-80 md:w-80 rounded-full border border-white/10 bg-zinc-950 shadow-2xl" />
              <div className="absolute h-40 w-40 md:h-56 md:w-56 rounded-full border border-orange-400/30 bg-[radial-gradient(circle,_#2a2a2a_0%,_#111_45%,_#050505_72%)]" />
              <div className="absolute h-20 w-20 md:h-28 md:w-28 rounded-full border border-white/10 bg-black shadow-[inset_0_0_30px_rgba(255,255,255,0.04)]" />
              <div className="absolute bottom-5 right-0 rounded-2xl border border-white/10 bg-black/70 px-5 py-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Product families</p>
                <p className="mt-2 text-sm text-zinc-200">Speakers · Bass · Amplification</p>
              </div>
            </div>
          </div>
        </section>

        <section id="product-range" className="py-20 md:py-24 border-b border-white/10 scroll-mt-24">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Product range"
              title="Four core Car Audio families"
              description="The Phase 1 hub keeps Car Audio separate from the existing head-unit catalog while giving B2B buyers one place to review the confirmed range."
            />

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              {productFamilies.map((family) => {
                const Icon = family.icon;
                return (
                  <a
                    key={family.title}
                    href={`#${family.anchor}`}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-orange-400/40 hover:bg-orange-400/[0.04]"
                  >
                    <div className="h-11 w-11 rounded-xl border border-orange-400/30 bg-orange-400/10 flex items-center justify-center text-orange-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{family.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{family.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {family.models.slice(0, 4).map((model) => (
                        <span key={model} className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-zinc-300">
                          {model}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-orange-400">
                      Explore family
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="speakers" className="py-20 md:py-24 border-b border-white/10 scroll-mt-24">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Speakers"
              title="T3 and T6 speaker families"
              description="The catalog confirms component, coaxial and active 3-way configurations. Detailed performance specifications should remain tied to approved source data rather than inferred from series names."
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {speakerSeries.map((series) => (
                <div key={series.series} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
                  <p className="text-sm font-semibold text-orange-400">{series.series}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{series.summary}</h3>
                  <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
                    {series.models.map((item) => (
                      <div key={item.model} className="flex items-center justify-between gap-6 py-4">
                        <span className="font-medium text-white">{item.model}</span>
                        <span className="text-sm text-right text-zinc-400">{item.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="subwoofers" className="py-20 md:py-24 border-b border-white/10 scroll-mt-24">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Subwoofers"
              title="Compact under-seat bass and standalone drivers"
              description="The range covers TS under-seat products plus T3 and T6 subwoofer-driver variants. Vehicle-specific compatibility is not stated here because fitment evidence has not been approved."
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {subwooferGroups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-white/10 bg-zinc-950 p-6 md:p-8">
                  <h3 className="text-2xl font-semibold">{group.title}</h3>
                  <p className="mt-3 text-zinc-400 leading-7">{group.description}</p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    {group.models.map((item) => (
                      <div key={item.model} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="font-semibold text-orange-400">{item.model}</p>
                        <p className="mt-1 text-sm text-zinc-400">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="bass-systems" className="py-20 md:py-24 border-b border-white/10 scroll-mt-24">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Bass systems"
              title="Competition and enclosed bass formats"
              description="The catalog identifies the V8 competition series and enclosed bass systems. Sealed, ported, active and passive wording should only be applied where the source explicitly assigns that configuration to the individual model."
            />

            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-white/[0.05] text-xs uppercase tracking-[0.16em] text-zinc-500">
                  <tr>
                    <th className="px-5 py-4 font-medium">Model</th>
                    <th className="px-5 py-4 font-medium">Catalog classification</th>
                    <th className="px-5 py-4 font-medium">Verified detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {bassSystems.map((item) => (
                    <tr key={item.model} className="bg-black/20">
                      <td className="px-5 py-5 font-semibold text-white">{item.model}</td>
                      <td className="px-5 py-5 text-zinc-300">{item.configuration}</td>
                      <td className="px-5 py-5 text-zinc-400">
                        {item.model === "10V8-V4"
                          ? "600 W rated · 1200 W max · 4 Ω + 4 Ω · 84 dB · 30–400 Hz · 16 mm X-MAX"
                          : "Enclosure type and dimensions remain source-controlled technical data."}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="amplifiers" className="py-20 md:py-24 border-b border-white/10 scroll-mt-24">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Amplifiers"
              title="TD and DSP-controlled TP amplification"
              description="All four confirmed amplifier models are Class D. The TP series is identified by the catalog as DSP-controlled; no additional DSP software or protection-function claims are added without verified documentation."
            />

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {amplifiers.map((amp) => (
                <div key={amp.model} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Power amplifier</p>
                  <h3 className="mt-3 text-2xl font-semibold">{amp.model}</h3>
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                      <span className="text-zinc-500">Architecture</span>
                      <span className="text-zinc-200">{amp.classType}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-zinc-500">Control</span>
                      <span className="text-right text-zinc-200">{amp.control}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 border-b border-white/10">
          <div className="container-wide grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <div>
              <SectionHeading
                eyebrow="Portfolio ecosystem"
                title="A broader TEYES in-car entertainment offer"
                description="Build a broader TEYES offer across source, amplification, speakers and bass. This describes portfolio breadth, not guaranteed electrical or mechanical compatibility between individual products."
              />
              <div className="rounded-xl border border-orange-400/20 bg-orange-400/[0.05] p-5 text-sm leading-6 text-zinc-300">
                Product compatibility, vehicle fitment and installation requirements should be confirmed for the actual project before ordering.
              </div>
            </div>

            <div className="grid gap-3">
              {ecosystemSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10 text-sm font-semibold text-orange-400">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{step}</p>
                  </div>
                  {index < ecosystemSteps.length - 1 && <ArrowRight className="h-4 w-4 text-zinc-600" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 border-b border-white/10">
          <div className="container-wide grid lg:grid-cols-2 gap-10">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 md:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">Car Audio accessories</p>
              <h2 className="mt-3 text-3xl font-semibold">Supporting hardware inside the Car Audio range</h2>
              <div className="mt-7 space-y-4">
                {accessories.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-zinc-300">
                    <CheckCircle2 className="h-5 w-5 text-orange-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-6 text-zinc-500">
                These items remain part of the Car Audio section and do not replace or redefine the existing site-wide Accessories page.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 md:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">B2B cooperation</p>
              <h2 className="mt-3 text-3xl font-semibold">Discuss the range for your market</h2>
              <p className="mt-5 leading-7 text-zinc-400">
                Contact the TEYES B2B team for product information, model selection and distributor availability by market. Commercial terms such as MOQ, warranty, lead time and territory arrangements are confirmed separately rather than assumed from the product catalog.
              </p>
              <Button asChild size="lg" className="mt-7 bg-orange-500 text-black hover:bg-orange-400">
                <Link to="/contact/">
                  Contact TEYES B2B
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-3xl border border-orange-400/20 bg-[linear-gradient(135deg,rgba(249,115,22,0.16),rgba(255,255,255,0.02)_55%,rgba(0,0,0,0.2))] px-7 py-12 md:px-12 md:py-16">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">TEYES Car Audio</p>
                <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
                  Request wholesale product information
                </h2>
                <p className="mt-5 text-lg leading-8 text-zinc-300">
                  Tell us your country, business type, sales channel and the Car Audio product families you are evaluating.
                </p>
                <div className="mt-8">
                  <Button asChild size="lg" className="bg-orange-500 text-black hover:bg-orange-400">
                    <Link to="/contact/">
                      Start an Inquiry
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default CarAudio;
