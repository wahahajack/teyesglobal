import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers3, Boxes, Headphones, ShieldCheck, Camera, FileText } from "lucide-react";

const guideSections = [
  { icon: Layers3, title: "Build a product ladder", description: "A strong wholesale car audio plan should include flagship, mainstream, and entry-level Android head unit models rather than one single product." },
  { icon: Boxes, title: "Start with a mixed trial", description: "Mixed-model testing helps distributors identify demand before committing to deep inventory." },
  { icon: Camera, title: "Add accessory bundles", description: "Cameras, TPMS, OBD II, DAB+, microphones, and cables can raise ticket value and make the car stereo offer more complete." },
  { icon: Headphones, title: "Check after-sales support", description: "Firmware, installation guidance, fitment questions, and dealer FAQ are key to reducing return pressure." },
  { icon: ShieldCheck, title: "Review market requirements", description: "Different regions may need different documents, radio accessories, languages, and product positioning." },
  { icon: FileText, title: "Prepare dealer assets", description: "Product comparison, images, videos, specs, and listing copy help dealers sell faster." },
];

const faqs = [
  { question: "What should a distributor check before buying Android car stereos wholesale?", answer: "Check product ladder, head unit performance, fitment and CANBUS support, firmware support, accessories, warranty communication, dealer assets, and the supplier's ability to support your market." },
  { question: "Should a first order include only one model?", answer: "Usually no. A mixed first order lets distributors test premium, mainstream, and entry-level demand before committing to deeper inventory." },
  { question: "Does TEYES support wholesale car audio channels?", answer: "Yes. TEYES supports car stereo wholesale, Android head unit distributor cooperation, car radio accessories, and OEM/ODM discussions for qualified partners." },
];

const AndroidCarStereoWholesaleGuide = () => {
  return (
    <Layout>
      <SEO
        title="Android Car Stereo Wholesale Buying Guide for Distributors"
        description="A wholesale buying guide for Android car stereos, car radios, head units, accessories, trial orders, product ladders, and distributor support."
        keywords="Android car stereo wholesale, wholesale car audio, car stereo suppliers, car radio suppliers, Android head unit wholesale, car radio distributor"
        path="/resources/android-car-stereo-wholesale-guide"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
          { label: "Android Car Stereo Wholesale Guide" },
        ]}
        faq={faqs}
      />
      <ContextHeader
        title="Android Car Stereo Wholesale Buying Guide"
        description="How distributors can choose Android head units, car radios, accessories, and trial-order product mixes with less guesswork."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
          { label: "Wholesale Buying Guide" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title mb-4">Wholesale buyers need a product system, not just a low price</h2>
          <p className="text-muted-foreground mb-6">Car audio distributors often search for wholesale car audio, car stereo suppliers, or car radio suppliers. The real decision is broader: which Android head unit models fit your price bands, which accessories make the product easier to sell, and what support reduces installation and return pressure?</p>
          <p className="text-muted-foreground">TEYES helps partners build a product ladder that can cover premium installers, mainstream retailers, online sellers, and price-sensitive channels.</p>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideSections.map((item) => (
              <div key={item.title} className="rounded-xl bg-background border border-border/50 p-6"><div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><item.icon className="h-6 w-6 text-primary" /></div><h3 className="font-semibold mb-2">{item.title}</h3><p className="text-sm text-muted-foreground">{item.description}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title mb-6">Suggested first-order logic</h2>
          <div className="overflow-x-auto"><table className="w-full min-w-[760px]"><thead><tr className="bg-card"><th className="text-left p-4 border-b border-border/50">Channel</th><th className="text-left p-4 border-b border-border/50">Suggested models</th><th className="text-left p-4 border-b border-border/50">Add-ons to consider</th></tr></thead><tbody>
            <tr><td className="p-4 border-b border-border/30 font-medium">Premium installers</td><td className="p-4 border-b border-border/30 text-primary">CC4 Pro / CC3 2K</td><td className="p-4 border-b border-border/30 text-muted-foreground">360 camera, DVR, digital microphone, audio cables</td></tr>
            <tr><td className="p-4 border-b border-border/30 font-medium">Mainstream retailers</td><td className="p-4 border-b border-border/30 text-primary">CC3 2K / CC4</td><td className="p-4 border-b border-border/30 text-muted-foreground">Backup camera, TPMS, OBD II, screen protector</td></tr>
            <tr><td className="p-4 border-b border-border/30 font-medium">Price-sensitive channels</td><td className="p-4 border-b border-border/30 text-primary">X1 Pro / CC4L</td><td className="p-4 border-b border-border/30 text-muted-foreground">Essential microphone, power filter, installation tools</td></tr>
          </tbody></table></div>
          <div className="flex flex-wrap gap-3 mt-10"><Button variant="hero" size="lg" asChild><Link to="/contact?intent=wholesale">Get Wholesale Pricing<ArrowRight className="h-4 w-4" /></Link></Button><Button variant="hero-outline" size="lg" asChild><Link to="/products/compare">Compare Head Unit Models</Link></Button></div>
        </div>
      </section>
    </Layout>
  );
};

export default AndroidCarStereoWholesaleGuide;
