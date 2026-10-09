import { Suspense, lazy } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { organizationSchema } from "@/data/company";

const OfficialPortalSection = lazy(() =>
  import("@/components/home/OfficialPortalSection").then((module) => ({ default: module.OfficialPortalSection }))
);
const TrustSection = lazy(() =>
  import("@/components/home/TrustSection").then((module) => ({ default: module.TrustSection }))
);
const CapabilitiesSection = lazy(() =>
  import("@/components/home/CapabilitiesSection").then((module) => ({ default: module.CapabilitiesSection }))
);
const ProductsSection = lazy(() =>
  import("@/components/home/ProductsSection").then((module) => ({ default: module.ProductsSection }))
);
const CarAudioSection = lazy(() =>
  import("@/components/home/CarAudioSection").then((module) => ({ default: module.CarAudioSection }))
);
const OemCtaSection = lazy(() =>
  import("@/components/home/OemCtaSection").then((module) => ({ default: module.OemCtaSection }))
);
const PartnersSection = lazy(() =>
  import("@/components/home/PartnersSection").then((module) => ({ default: module.PartnersSection }))
);
const HomeFaqSection = lazy(() =>
  import("@/components/home/HomeFaqSection").then((module) => ({ default: module.HomeFaqSection }))
);
const FinalCtaSection = lazy(() =>
  import("@/components/home/FinalCtaSection").then((module) => ({ default: module.FinalCtaSection }))
);

const Index = () => {
  const faq = [
    {
      question: "Is this the official TEYES Global website?",
      answer:
        "This is the international website for TEYES Android car stereos, car audio products and accessories.",
    },
    {
      question: "Does TEYES Global support distributors?",
      answer:
        "Yes. TEYES works with distributors, wholesalers, installers and retail partners. Contact the team to discuss product selection and current distribution options.",
    },
    {
      question: "Can I become a TEYES distributor in my market?",
      answer:
        "Send us your country, business type, sales channel and target products. The team can then discuss whether TEYES products fit your business and market.",
    },
    {
      question: "Does TEYES support OEM / ODM projects?",
      answer:
        "Yes. TEYES can discuss OEM/ODM projects covering product platforms, branding, software, accessories and vehicle compatibility.",
    },
    {
      question: "Which TEYES model should distributors start with?",
      answer:
        "It depends on the market. CC4 Pro is positioned for premium channels, CC3 2K for mainstream demand, and X1 Pro or CC4L for entry-level channels. Compare the specifications and vehicle requirements before selecting a model.",
    },
  ];

  return (
    <Layout>
      <SEO
        title="TEYES Premium Android Head Units & Car Audio"
        description="Premium TEYES Android head units and car audio solutions for distributors, installers, wholesalers and automotive partners in the global automotive aftermarket."
        path="/"
        schema={organizationSchema}
        faq={faq}
      />
      <HeroSection />
      <Suspense fallback={null}>
        <OfficialPortalSection />
        <TrustSection />
        <CapabilitiesSection />
        <ProductsSection />
        <CarAudioSection />
        <OemCtaSection />
        <PartnersSection />
        <HomeFaqSection />
        <FinalCtaSection />
      </Suspense>
    </Layout>
  );
};

export default Index;
