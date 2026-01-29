import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { OemCtaSection } from "@/components/home/OemCtaSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="TEYES - Smart Infotainment Solutions for Global Markets"
        description="TEYES - Global Smart Infotainment Solutions for the Automotive Aftermarket. OEM/ODM partner trusted by distributors across 100+ markets. CC4 Pro, CC3 2K, X1 Pro."
        keywords="TEYES, car infotainment, android head unit, car stereo, OEM, ODM, CC4 Pro, CC3 2K, automotive"
        canonicalPath=""
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
