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
    description: "T3 and T6 component and coaxial speaker families for automotive aftermarket product portfolios.",
    models: ["T3-652", "T3-65X", "T6-652", "T6-653A", "T6-603A", "T6-65X"],
    icon: Volume2,
    anchor: "speakers",
    image: "/images/car-audio/speakers.webp",
    alt: "TEYES T3 and T6 car audio speakers",
  },
  {
    title: "Subwoofers",
    description: "Under-seat subwoofers and standalone subwoofer drivers covering compact and conventional bass-system formats.",
    models: ["TS-08", "TS-10", "10T3-V4", "10T3S-V4", "10T6-V4", "10T6S-V4"],
    icon: Radio,
    anchor: "subwoofers",
    image: "/images/car-audio/subwoofers.webp",
    alt: "TEYES under-seat and standalone car subwoofers",
  },
  {
    title: "Bass Systems",
    description: "Competition and enclosed bass products across active, passive, sealed and ported configurations in the range.",
    models: ["10V8-V4", "BXA3-10T3S-V4", "BX1-10T3S-V4", "BX2-10T3S-V4", "BX4-10T3-D4"],
    icon: Box,
    anchor: "bass-systems",
    image: "/images/car-audio/bass-systems.webp",
    alt: "TEYES enclosed car audio bass systems",
  },
  {
    title: "Amplifiers",
    description: "Class D power amplification in TD and TP series, with DSP-controlled architecture on TP models.",
    models: ["TD500/4", "TD1000/1", "TP800/4", "TP1200/1"],
    icon: SlidersHorizontal,
    anchor: "amplifiers",
    image: "/images/car-audio/amplifiers.webp",
    alt: "TEYES TD and TP Class D car audio amplifiers",
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
    summary: "Broader speaker range for more varied system layouts.",
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
    description: "Compact under-seat bass formats available in 8-inch and 10-inch versions.",
    models: [
      { model: "TS-08", detail: "8-inch under-seat subwoofer" },
      { model: "TS-10", detail: "10-inch under-seat subwoofer" },
    ],
  },
  {
    title: "Subwoofer drivers",
    description: "Standalone T3 and T6 driver options for custom bass-system builds.",
    models: [
      { model: "10T3-V4", detail: "T3 subwoofer driver" },
      { model: "10T3S-V4", detail: "T3S subwoofer driver" },
      { model: "10T6-V4", detail: "T6 subwoofer driver" },
      { model: "10T6S-V4", detail: "T6S subwoofer driver" },
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
  { model: "TD500/4", classType: "Class D", control: "TD series" },
  { model: "TD1000/1", classType: "Class D", control: "TD series" },
  { model: "TP800/4", classType: "Class D", control: "DSP-controlled" },
  { model: "TP1200/1", classType: "Class D", control: "DSP-controlled" },
];

const accessories = ["Tweeter Mount", "T6-650 Woofer Grille", "T6-65X Coaxial Grille"];
const ecosystemSteps = ["TEYES Infotainment / Head Unit", "Amplifier", "Speakers", "Subwoofer / Bass"];

const collectionSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TEYES Car Audio",
  url: "https://teyesglobal.com/car-audio/",
  description: "TEYES Car Audio speakers, subwoofers, bass systems and power amplifiers for automotive aftermarket distributors and car audio channels.",
  hasPart: productFamilies.map((family) => ({ "@type": "WebPageElement", name: family.title })),
});

const SectionHeading = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
  <div className="max-w-3xl mb-10">
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400 mb-3">{eyebrow}</p>
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{title}</h2>
    <p className="mt-4 text-base md:text-lg leading-8 text-zinc-400">{description}</p>
  </div>
);

const ProductImage = ({ src, alt, height = 295 }: { src: string; alt: string; height?: number }) => (
  <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
    <img
      src={src}
      alt={alt}
      width={500}
      height={height}
      loading="lazy"
      decoding="async"
      className="h-auto w-full object-cover"
    />
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

      <div className="bg-[#070707] text-white">
        <section className="relative overflow-hidden border-b border-white/10 pt-28 md:pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(249,115,22,0.20),transparent_30%)]" aria-hidden="true" />
          <div className="container-wide relative grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center py-20 md:py-24">
            <div>
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                  <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
                  <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                  <li className="text-zinc-300" aria-current="page">Car Audio</li>
                </ol>
              </nav>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-400 mb-5">Detail · Dynamics · Depth</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[0.96]">TEYES Car Audio</h1>
              <p className="mt-7 max-w-2xl text-lg md:text-xl leading-8 text-zinc-300">Speakers, subwoofers, bass systems and amplifiers for automotive aftermarket distributors, installers and car-audio channels.</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-500">A dedicated product family that extends the TEYES in-car entertainment portfolio beyond infotainment.</p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-orange-500 text-black hover:bg-orange-400">
                  <Link to="/contact/">Request Wholesale Information <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  <a href="#product-range">View Product Range</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-4 shadow-2xl">
                <img
                  src="/images/car-audio/hero-speakers.webp"
                  alt="TEYES Car Audio speaker products"
                  width={500}
                  height={362}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-auto w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-b border-white/10">
          <div className="container-wide grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
            <ProductImage src="/images/car-audio/overview.webp" alt="Overview of the TEYES Car Audio product range" height={283} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">Complete range</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">One product family from source to bass</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-400">TEYES Car Audio adds speakers, bass products and amplification around the existing infotainment portfolio, giving distributors a broader aftermarket offer from one brand.</p>
            </div>
          </div>
        </section>

        <section id="product-range" className="py-20 md:py-24 border-b border-white/10 scroll-mt-24">
          <div className="container-wide">
            <SectionHeading eyebrow="Product range" title="Four core Car Audio families" description="Review the TEYES Car Audio range across speakers, subwoofers, bass systems and amplification in one dedicated B2B product hub." />
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              {productFamilies.map((family) => {
                const Icon = family.icon;
                return (
                  <a key={family.title} href={`#${family.anchor}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-orange-400/40 hover:bg-orange-400/[0.04]">
                    <img src={family.image} alt={family.alt} width={500} height={295} loading="lazy" decoding="async" className="aspect-[5/3] w-full object-cover" />
                    <div className="p-6">
                      <div className="h-11 w-11 rounded-xl border border-orange-400/30 bg-orange-400/10 flex items-center justify-center text-orange-400"><Icon className="h-5 w-5" /></div>
                      <h3 className="mt-5 text-xl font-semibold">{family.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-400">{family.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {family.models.slice(0, 4).map((model) => <span key={model} className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-zinc-300">{model}</span>)}
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-orange-400">Explore family <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="speakers" className="py-20 md:py-24 border-b border-white/10 scroll-mt-24">
          <div className="container-wide">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
              <div><ProductImage src="/images/car-audio/speakers.webp" alt="TEYES T3 and T6 speaker families" /></div>
              <div>
                <SectionHeading eyebrow="Speakers" title="T3 and T6 speaker families" description="T3 and T6 cover component, coaxial and active 3-way configurations for different car-audio system layouts." />
                <div className="grid md:grid-cols-2 gap-5">
                  {speakerSeries.map((series) => (
                    <div key={series.series} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                      <p className="text-sm font-semibold text-orange-400">{series.series}</p>
                      <h3 className="mt-2 text-xl font-semibold">{series.summary}</h3>
                      <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
                        {series.models.map((item) => <div key={item.model} className="flex items-center justify-between gap-4 py-3"><span className="font-medium">{item.model}</span><span className="text-sm text-right text-zinc-400">{item.type}</span></div>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="subwoofers" className="py-20 md:py-24 border-b border-white/10 scroll-mt-24">
          <div className="container-wide">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
              <div>
                <SectionHeading eyebrow="Subwoofers" title="Under-seat bass and standalone drivers" description="Choose compact TS under-seat models or standalone T3 and T6 subwoofer drivers for different bass-system formats." />
                <div className="grid md:grid-cols-2 gap-5">
                  {subwooferGroups.map((group) => (
                    <div key={group.title} className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
                      <h3 className="text-xl font-semibold">{group.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-400">{group.description}</p>
                      <div className="mt-5 grid gap-3">
                        {group.models.map((item) => <div key={item.model} className="rounded-xl border border-white/10 bg-white/[0.03] p-4"><p className="font-semibold text-orange-400">{item.model}</p><p className="mt-1 text-sm text-zinc-400">{item.detail}</p></div>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ProductImage src="/images/car-audio/subwoofers.webp" alt="TEYES under-seat and standalone subwoofers" />
            </div>
          </div>
        </section>

        <section id="bass-systems" className="py-20 md:py-24 border-b border-white/10 scroll-mt-24">
          <div className="container-wide">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
              <ProductImage src="/images/car-audio/bass-systems.webp" alt="TEYES competition and enclosed bass systems" />
              <div>
                <SectionHeading eyebrow="Bass systems" title="Competition and enclosed bass formats" description="The range includes the V8 competition series plus BXA and BX enclosed bass systems for different installation and output requirements." />
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full min-w-[620px] text-left">
                    <thead className="bg-white/[0.05] text-xs uppercase tracking-[0.16em] text-zinc-500"><tr><th className="px-5 py-4 font-medium">Model</th><th className="px-5 py-4 font-medium">Product type</th><th className="px-5 py-4 font-medium">Key detail</th></tr></thead>
                    <tbody className="divide-y divide-white/10 text-sm">
                      {bassSystems.map((item) => <tr key={item.model} className="bg-black/20"><td className="px-5 py-5 font-semibold">{item.model}</td><td className="px-5 py-5 text-zinc-300">{item.configuration}</td><td className="px-5 py-5 text-zinc-400">{item.model === "10V8-V4" ? "600 W rated · 1200 W max · 4 Ω + 4 Ω · 84 dB · 30–400 Hz · 16 mm X-MAX" : "Active/passive and sealed/ported formats vary by model."}</td></tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="amplifiers" className="py-20 md:py-24 border-b border-white/10 scroll-mt-24">
          <div className="container-wide">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
              <div>
                <SectionHeading eyebrow="Amplifiers" title="TD and DSP-controlled TP amplification" description="TD models provide Class D power amplification, while TP models add DSP-controlled architecture for the Car Audio range." />
                <div className="grid sm:grid-cols-2 gap-4">
                  {amplifiers.map((amp) => <div key={amp.model} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Power amplifier</p><h3 className="mt-3 text-2xl font-semibold">{amp.model}</h3><div className="mt-6 space-y-3 text-sm"><div className="flex justify-between gap-4 border-b border-white/10 pb-3"><span className="text-zinc-500">Architecture</span><span className="text-zinc-200">{amp.classType}</span></div><div className="flex justify-between gap-4"><span className="text-zinc-500">Series</span><span className="text-zinc-200">{amp.control}</span></div></div></div>)}
                </div>
              </div>
              <ProductImage src="/images/car-audio/amplifiers.webp" alt="TEYES TD and TP Class D amplifiers" />
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 border-b border-white/10">
          <div className="container-wide grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <div>
              <SectionHeading eyebrow="Portfolio ecosystem" title="A broader TEYES in-car entertainment offer" description="Build a broader TEYES in-car entertainment offer across source, amplification, speakers and bass." />
              <div className="rounded-xl border border-orange-400/20 bg-orange-400/[0.05] p-5 text-sm leading-6 text-zinc-300">Confirm power, impedance, installation space and system matching for each vehicle project.</div>
            </div>
            <div className="grid gap-3">
              {ecosystemSteps.map((step, index) => <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10 text-sm font-semibold text-orange-400">{index + 1}</div><p className="flex-1 font-medium">{step}</p>{index < ecosystemSteps.length - 1 && <ArrowRight className="h-4 w-4 text-zinc-600" />}</div>)}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 border-b border-white/10">
          <div className="container-wide grid lg:grid-cols-2 gap-10 items-center">
            <ProductImage src="/images/car-audio/accessories.webp" alt="TEYES Car Audio speaker accessories and grilles" height={227} />
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 md:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">Car Audio accessories</p>
              <h2 className="mt-3 text-3xl font-semibold">Supporting hardware for the Car Audio range</h2>
              <div className="mt-7 space-y-4">{accessories.map((item) => <div key={item} className="flex items-center gap-3 text-zinc-300"><CheckCircle2 className="h-5 w-5 text-orange-400" /><span>{item}</span></div>)}</div>
              <p className="mt-6 text-sm leading-6 text-zinc-500">These Car Audio-specific accessories are presented separately from the existing head-unit Accessories range.</p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 border-b border-white/10">
          <div className="container-wide">
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 md:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">B2B cooperation</p>
                <h2 className="mt-3 text-3xl font-semibold">Discuss the range for your market</h2>
                <p className="mt-5 leading-7 text-zinc-400">Contact the TEYES B2B team for product specifications, model selection, market availability and commercial information for the Car Audio range.</p>
              </div>
              <Button asChild size="lg" className="mt-7 shrink-0 bg-orange-500 text-black hover:bg-orange-400 lg:mt-0">
                <Link to="/contact/">Contact TEYES B2B <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container-wide">
            <div className="relative overflow-hidden rounded-3xl border border-orange-400/20 bg-[linear-gradient(135deg,rgba(249,115,22,0.16),rgba(255,255,255,0.02)_55%,rgba(0,0,0,0.2))] px-7 py-12 md:px-12 md:py-16">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">TEYES Car Audio</p>
                <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">Request wholesale product information</h2>
                <p className="mt-5 text-lg leading-8 text-zinc-300">Tell us your country, business type, sales channel and the Car Audio product families you are evaluating.</p>
                <Button asChild size="lg" className="mt-8 bg-orange-500 text-black hover:bg-orange-400"><Link to="/contact/">Start an Inquiry <ArrowRight className="h-4 w-4" /></Link></Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CarAudio;
