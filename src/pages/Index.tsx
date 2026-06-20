
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
    "url": "https://teyesglobal.com",
    "logo": "https://teyesglobal.com/logo.webp",
    "description": "TEYES provides Android car stereos, car radios, head units, car infotainment systems, accessories, and OEM/ODM cooperation for global distributors, installers, retailers, and automotive brands.",
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
      "Android Head Units",
      "Android Car Stereos",
      "Car Radio Systems",
      "Car Infotainment Systems",
      "Automotive Aftermarket Distribution",
      "OEM/ODM Manufacturing",
      "Vehicle Camera Systems",
      "Dealer Support"
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

  return (
    <Layout>
      <SEO
        title="TEYES Android Car Stereo & Head Unit Supplier for Distributors"
        description="TEYES supplies premium Android car stereos, car radios, head units, accessories, and OEM/ODM infotainment solutions for global distributors, installers, retailers, and automotive brands."
        keywords="TEYES, Android head unit, Android car stereo, car radio supplier, car stereo supplier, car infotainment supplier, wholesale car audio, OEM ODM car radio"
        path="/"
        schema={schema}
        breadcrumbs={[{ label: "Home", href: "/" }]}
        faq={[
          {
            question: "Who is TEYES Global for?",
            answer: "TEYES Global is built for distributors, installers, retailers, system integrators, and automotive brands looking for Android head units, Android car stereos, car radios, and OEM/ODM infotainment cooperation.",
          },
          {
            question: "Can TEYES support distributor product selection?",
            answer: "Yes. TEYES offers a product ladder from flagship to entry-level head unit and car stereo models so partners can build a product mix for premium, mainstream, and price-sensitive markets.",
          },
        ]}
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