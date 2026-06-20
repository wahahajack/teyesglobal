import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { OfficialPortalSection } from "@/components/home/OfficialPortalSection";
import { TrustSection } from "@/components/home/TrustSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { OemCtaSection } from "@/components/home/OemCtaSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

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
        title="TEYES - Smart Infotainment Solutions for Global Markets"
        description="Global Smart Infotainment Solutions for the Automotive Aftermarket. OEM/ODM partner trusted by distributors across 100+ markets."
        path="/"
        schema={schema}
        faq={faq}
      />
      <HeroSection />
      <OfficialPortalSection />
      <TrustSection />
      <CapabilitiesSection />
      <ProductsSection />
      <OemCtaSection />
      <PartnersSection />
      <HomeFaqSection />
      <FinalCtaSection />
    </Layout>
  );
};

export default Index;
