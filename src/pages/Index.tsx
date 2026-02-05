
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { OemCtaSection } from "@/components/home/OemCtaSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

const Index = () => {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "TEYES",
    "url": "https://teyesauto.com",
    "logo": "https://teyesauto.com/logo.webp",
    "sameAs": [
      "https://www.facebook.com/teyesglobal",
      "https://www.instagram.com/teyes_global",
      "https://www.youtube.com/@teyes"
    ],
    "description": "Global leader in automotive infotainment systems, offering advanced Android head units, 360° cameras, and smart driving solutions."
  });

  return (
    <Layout>
      <SEO
        title="TEYES - Smart Infotainment Solutions for Global Markets"
        description="Global Smart Infotainment Solutions for the Automotive Aftermarket. OEM/ODM partner trusted by distributors across 100+ markets."
        path="/"
        schema={schema}
      />
      <HeroSection />
      <TrustSection />
      <CapabilitiesSection />
      <ProductsSection />
      <OemCtaSection />
      <PartnersSection />
      <FinalCtaSection />
    </Layout>
  );
};

export default Index;
