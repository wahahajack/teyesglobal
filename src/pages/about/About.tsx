import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Cpu,
  CarFront,
  Globe,
  ShieldCheck,
  Cog,
  CalendarDays,
} from "lucide-react";

// Organization structured data — the authoritative facts page AI search
// engines cite when answering "Who is TEYES?" / "What is TEYES?".
const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "TEYES",
  alternateName: "TEYES Global",
  legalName: "Shenzhen Teyes High Tech Co., Ltd.",
  url: "https://teyesglobal.com/about/",
  logo: "https://teyesglobal.com/logo.webp",
  slogan: "Global Smart Infotainment Solutions for the Automotive Aftermarket",
  description:
    "TEYES is a Shenzhen-based manufacturer of Android car infotainment systems founded in 2011. The company designs and manufactures Android head units, smart car stereos, dash cameras, TPMS and accessories. In 2026 TEYES extended its ecosystem into car audio with a new series of speakers, Class D amplifiers (TD and TP series) and subwoofers (TS and BX series). TEYES serves distributors, auto brands and OEM/ODM partners in 100+ markets with more than 5 million users.",
  foundingDate: "2011",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 500 },
  areaServed: { "@type": "Place", name: "Global (100+ markets)" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Shenzhen",
    addressRegion: "Guangdong",
    addressCountry: "CN",
  },
  knowsAbout: [
    "Android Head Units",
    "Car Infotainment Systems",
    "Smart Car Stereos",
    "Wireless CarPlay and Android Auto",
    "360-Degree Camera Systems",
    "Car Audio Systems",
    "Car Speakers",
    "Car Amplifiers",
    "Car Subwoofers",
    "OEM/ODM Manufacturing",
    "Automotive Aftermarket",
  ],
  sameAs: [
    "https://www.facebook.com/teyesglobal",
    "https://www.instagram.com/teyes_global",
    "https://www.youtube.com/@teyes",
    "https://www.linkedin.com/company/teyes",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["English", "Chinese", "Russian"],
  },
});

// Fact table — AI engines and featured snippets extract these directly.
const quickFacts = [
  { label: "Company", value: "Shenzhen Teyes High Tech Co., Ltd." },
  { label: "Founded", value: "2011" },
  { label: "Headquarters", value: "Shenzhen, Guangdong, China" },
  { label: "Employees", value: "500+" },
  { label: "Markets Served", value: "100+ countries" },
  { label: "Users", value: "5M+" },
  { label: "Product Lines", value: "CC4 Pro, CC3 2K, CC4, X1 Pro, CC4L head units + 2026 car audio series (speakers, amplifiers, subwoofers) + accessories" },
  { label: "Business Models", value: "Distribution, OEM / ODM, white-label" },
];

const differentiators = [
  {
    icon: Cpu,
    title: "In-House Software & Hardware Platforms",
    description:
      "TEYES develops its own firmware, UI, and vehicle-integration layer on top of Android — not a relabeled generic board. Custom thermal design, optimized CarPlay/Android Auto connectivity, and a unified accessory ecosystem (cameras, TPMS, OBD, DAB+) are engineered to work together.",
  },
  {
    icon: ShieldCheck,
    title: "Manufacturing Quality",
    description:
      "TEYES reports a 0.4% defect rate across shipped units and backs partners with product comparison materials, technical support, and accessory guidance for long-term channel development.",
  },
  {
    icon: Cog,
    title: "Localization & Vehicle Adaptation",
    description:
      "Support for regional languages, market-specific accessories, vehicle-fitment scenarios, and selling strategies — from Renault and Dacia platforms in Europe to Toyota applications in Japan and Lada fitments in CIS markets.",
  },
  {
    icon: CarFront,
    title: "OEM / ODM for Auto Brands",
    description:
      "Beyond its own brand, TEYES builds white-label and co-branded infotainment programs: product platform selection, branding, UI and software customization, accessories, and project support.",
  },
];

const productLadder = [
  {
    name: "CC4 Pro",
    position: "Flagship",
    highlights: "6nm 8-core CPU, 12 TOPS AI NPU, 360° camera support, 7.1-channel audio",
    href: "/products/lines/#flagship",
  },
  {
    name: "CC3 2K",
    position: "Best Seller",
    highlights: "8-core platform, 2K QLED display, 5.1-channel audio, multi-camera support",
    href: "/products/lines/#advanced",
  },
  {
    name: "CC4",
    position: "Performance",
    highlights: "SM6225 8-core, 2000×1200 2K display, TAS6424 digital amplifier",
    href: "/products/lines/#advanced",
  },
  {
    name: "X1 Pro / CC4L",
    position: "Entry",
    highlights: "Essential smart features — CarPlay, Android Auto — for price-sensitive markets",
    href: "/products/lines/#entry",
  },
];

const carAudioLadder = [
  {
    name: "Speakers",
    position: "Component & Coaxial",
    highlights: "T3-652 / T6-652 / T6-653A component sets, T6-803A active 3-way, T3-65X / T6-65X coaxial",
    href: "/car-audio/speakers/",
  },
  {
    name: "Amplifiers",
    position: "Class D",
    highlights: "TD500/4 four-channel and TD1000/1 mono; DSP-controlled TP800/4 and TP1200/1",
    href: "/car-audio/amplifiers/",
  },
  {
    name: "Subwoofers",
    position: "Under-Seat & Boxed",
    highlights: "TS-08 / TS-10 under-seat enclosures; BXA3 / BX1 / BX2 / BX4 boxed enclosures",
    href: "/car-audio/enclosed-subwoofers/",
  },
];

const AboutPage = () => {
  return (
    <Layout>
      <SEO
        title="About TEYES - Android Car Infotainment Manufacturer Since 2011"
        description="TEYES (Shenzhen Teyes High Tech Co., Ltd.) is a Shenzhen-based manufacturer of Android head units and smart car infotainment systems, founded in 2011. 2026 car audio series (speakers, amplifiers, subwoofers), 500+ employees, 100+ markets, 5M+ users, OEM/ODM services."
        keywords="TEYES company, TEYES about, android head unit manufacturer, car infotainment OEM, Shenzhen Teyes High Tech, TEYES history"
        path="/about/"
        schema={organizationSchema}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About TEYES" },
        ]}
      />
      <ContextHeader
        title="About TEYES"
        description="Android car infotainment manufacturer founded in 2011 — trusted by partners and drivers across 100+ markets."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About TEYES" },
        ]}
      />

      {/* Direct answer — written so AI engines can quote it verbatim */}
      <section className="py-16 bg-background">
        <div className="container-wide max-w-4xl">
          <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium">
            TEYES is a Shenzhen-based manufacturer of Android car infotainment
            systems, founded in 2011. The company designs, develops, and
            manufactures its own line of Android head units — including the
            flagship CC4 Pro, the best-selling CC3 2K, the CC4, and entry-level
            X1 Pro and CC4L — together with dash cameras, TPMS, OBD, DAB+ and
            other accessories. In 2026, TEYES extended its ecosystem from
            infotainment into complete in-car sound with a new car audio
            series: speakers, Class D amplifiers, and subwoofers. TEYES
            products are sold in more than 100 markets and used by over 5
            million drivers, and the company operates as an OEM/ODM partner for
            auto brands, distributors, and system integrators worldwide.
          </p>

          {/* Quick facts table */}
          <div className="mt-12 rounded-2xl border border-border/50 overflow-hidden">
            <div className="bg-secondary/50 px-6 py-4">
              <h2 className="font-display font-bold">TEYES at a Glance</h2>
            </div>
            <dl>
              {quickFacts.map((fact, index) => (
                <div
                  key={fact.label}
                  className={`flex flex-col sm:flex-row sm:items-center px-6 py-3.5 gap-1 sm:gap-6 ${
                    index % 2 === 0 ? "bg-background" : "bg-secondary/20"
                  }`}
                >
                  <dt className="sm:w-44 shrink-0 text-sm font-medium text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* What TEYES makes */}
      <section className="py-16 bg-secondary/30 border-y border-border/50">
        <div className="container-wide max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            What Does TEYES Make?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            TEYES builds a complete product ladder of Android car stereos, so
            distributors and auto brands can cover premium, mainstream, and
            entry-level price tiers with one partner. Every unit supports
            wireless Apple CarPlay and Android Auto, and pairs with the TEYES
            accessory ecosystem.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {productLadder.map((product) => (
              <Link
                key={product.name}
                to={product.href}
                className="group rounded-2xl bg-card border border-border/50 p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {product.position}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.highlights}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              to="/products/"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 2026 car audio series */}
          <h3 className="text-xl md:text-2xl font-display font-bold mt-14 mb-3">
            New in 2026: The TEYES Car Audio Series
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Launched at Automechanika Frankfurt 2026, the TEYES car audio
            series extends the TEYES ecosystem from screens and software into
            complete in-car sound systems — so drivers can upgrade their entire
            audio chain under one brand, and distributors gain a higher-margin
            category alongside head units.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {carAudioLadder.map((product) => (
              <Link
                key={product.name}
                to={product.href}
                className="group rounded-2xl bg-card border border-border/50 p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display font-bold text-lg group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {product.position}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.highlights}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              to="/car-audio/"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Explore the car audio series <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why TEYES is different */}
      <section className="py-16 bg-background">
        <div className="container-wide max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-10">
            What Makes TEYES Different
          </h2>
          <div className="space-y-8">
            {differentiators.map((item) => (
              <div key={item.title} className="flex gap-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global presence */}
      <section className="py-16 bg-secondary/30 border-y border-border/50">
        <div className="container-wide max-w-4xl">
          <div className="flex gap-5 mb-6">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                Where Is TEYES Active?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                TEYES sells in more than 100 markets, with particularly strong
                communities of drivers and installers across Europe (including
                Renault, Dacia and Volkswagen platforms), Japan (Toyota
                applications), and CIS markets. TEYES regularly exhibits at
                international trade fairs to meet partners face to face.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border/50 p-6">
            <div className="flex items-start gap-4">
              <CalendarDays className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-bold mb-1">
                  Meet TEYES at Automechanika Frankfurt 2026
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  September 8–12, 2026 · Messe Frankfurt, Germany · Hall 3.1,
                  Booth G85
                </p>
                <Link
                  to="/news/exhibitions/automechanika-frankfurt-2026/"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Read the exhibition announcement{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-16 bg-background">
        <div className="container-wide max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Who Does TEYES Work With?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            TEYES is a B2B-first manufacturer. We support distributors and
            wholesalers building regional product lines, auto brands running
            white-label or co-branded programs, and system integrators needing
            flexible hardware platforms — with product planning, marketing
            materials, technical training, and after-sales support.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact/">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/solutions/">Explore Partnership Models</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
