import { Layout } from "@/components/layout/Layout";
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
