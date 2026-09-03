import { Suspense, lazy } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/home/HeroSection";

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
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "TEYES",
    "url": "https://teyesglobal.com",
    "logo": "https://teyesglobal.com/logo.webp",
    "description": "Global leader in automotive infotainment systems, offering advanced Android head units, 360° cameras, and smart driving solutions for the aftermarket.",
    "foundingDate": "2011",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 500
    },
    "areaServed": {
      "@type": "Place",
      "name": "Global (100+ markets)"
    },
    "knowsAbout": [
      "Car Infotainment Systems",
      "Android Head Units",
      "OEM/ODM Manufacturing",
      "Automotive Aftermarket Solutions"
    ],
    "sameAs": [
      "https://www.facebook.com/teyesglobal",
      "https://www.instagram.com/teyes_global",
      "https://www.youtube.com/@teyes"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "availableLanguage": ["English", "Chinese", "Russian"]
    }
  });

  const faq = [
    {
      question: "Is this the official TEYES Global website?",
      answer:
        "TEYES Global is the international B2B cooperation portal for TEYES smart infotainment, Android head unit, and car stereo solutions.",
    },
    {
      question: "Does TEYES Global support distributors?",
      answer:
        "Yes. TEYES Global supports distributors, wholesalers, installers, and retail channels with product-line planning, wholesale cooperation, accessories, and market support.",
    },
    {
      question: "Can I become a TEYES distributor in my market?",
      answer:
        "You can contact us with your country, business type, sales channel, and target product range. Our team will review the cooperation fit and suggest a trial plan.",
    },
    {
      question: "Does TEYES support OEM / ODM projects?",
      answer:
        "Yes. TEYES supports OEM/ODM cooperation, including product platform selection, branding, UI/software customization, accessories, and project support.",
    },
    {
      question: "Which TEYES model should distributors start with?",
      answer:
        "It depends on the market. CC4 Pro is positioned for premium channels, CC3 2K for mainstream demand, and X1 Pro or CC4L for entry-level or price-sensitive markets.",
    },
  ];

  return (
    <Layout>
      <SEO
        title="TEYES Premium Android Head Units & Car Audio"
        description="Premium TEYES Android head units and car audio solutions for distributors, installers, wholesalers and automotive partners in the global automotive aftermarket."
        path="/"
        schema={schema}
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