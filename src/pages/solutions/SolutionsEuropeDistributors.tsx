import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Radio, ShieldCheck, Languages, Wrench, Volume2, Car } from "lucide-react";

const europeNeeds = [
  { icon: ShieldCheck, title: "Europe Compliance Support", description: "Support distributor discussions around CE, RoHS, RED, product documentation, and model-specific market requirements." },
  { icon: Radio, title: "DAB+ and Regional Accessories", description: "Prepare DAB+ adapter, camera, microphone, and installation accessories for European car audio channels." },
  { icon: Languages, title: "Multi-language Positioning", description: "Help dealers present Android head units and car stereos with language, UI, and local sales material expectations in mind." },
  { icon: Wrench, title: "Installer Support", description: "Support installers with clearer model comparison, fitment discussion, accessory bundles, and troubleshooting resources." },
];

const productMix = [
  { market: "Premium installers", models: "CC4 Pro / CC3 2K", reason: "Best for performance, display, sound, and camera-system positioning." },
  { market: "Mainstream car stereo retailers", models: "CC3 2K / CC4", reason: "Balances feature strength and price positioning for retail channels." },
  { market: "Price-sensitive channels", models: "CC4L / X1 Pro", reason: "Lower entry point for Android Auto, CarPlay, and core infotainment features." },
  { market: "Accessory-driven installers", models: "CC4 Pro + cameras + DAB+", reason: "Creates a stronger upgrade package around safety, visibility, audio, and regional radio needs." },
];

const faqs = [
  { question: "Is this page for TEYES EU or TEYES Europe distributor inquiries?", answer: "Yes. This page is designed to help Europe-focused distributors, installers, and car stereo retailers discuss TEYES Android head unit and car stereo cooperation." },
  { question: "Which TEYES products are suitable for Europe?", answer: "Common starting points include CC4 Pro and CC3 2K for premium installers, CC3 2K and CC4 for mainstream channels, and CC4L or X1 Pro for price-sensitive channels." },
  { question: "Can TEYES help with DAB+ and Europe-specific accessories?", answer: "Yes. TEYES can help partners review DAB+, camera systems, microphones, cables, and accessory bundle needs for European channels." },
];

const SolutionsEuropeDistributorsPage = () => {
  return (
    <Layout>
      <SEO
        title="TEYES Europe Distributor Support for Android Head Units & Car Stereos"
        description="TEYES Europe distributor support for Android head units, Android car stereos, car radios, DAB+ accessories, product mix planning, and wholesale cooperation."
        keywords="TEYES Europe, TEYES EU, TEYES distributor Europe, Android head unit Europe, Android car stereo Europe, car stereo distributor Europe"
        path="/solutions/europe-distributors"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Europe Distributors" },
        ]}
        faq={faqs}
      />
      <ContextHeader
        title="TEYES Europe Distributor Support"
        description="Android head unit and car stereo product mix support for Europe-focused distributors, installers, and retailers."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Europe Distributors" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title mb-4">For TEYES Europe, EU and Regional Distributor Inquiries</h2>
            <p className="section-subtitle mx-auto">European car audio channels often need premium product positioning, DAB+ accessories, compliance documentation, multilingual support, and installer-ready materials. TEYES helps partners prepare the right Android head unit and car stereo product mix.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {europeNeeds.map((item) => (
              <div key={item.title} className="rounded-xl bg-card border border-border/50 p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><item.icon className="h-6 w-6 text-primary" /></div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title mb-4">Europe Product Mix Reference</h2>
            <p className="section-subtitle mx-auto">Use this as a starting point before discussing a market-specific wholesale plan.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead><tr className="bg-background"><th className="text-left p-4 border-b border-border/50">Channel</th><th className="text-left p-4 border-b border-border/50">Recommended Models</th><th className="text-left p-4 border-b border-border/50">Reason</th></tr></thead>
              <tbody>
                {productMix.map((item) => (
                  <tr key={item.market}><td className="p-4 border-b border-border/30 font-medium">{item.market}</td><td className="p-4 border-b border-border/30 text-primary">{item.models}</td><td className="p-4 border-b border-border/30 text-muted-foreground">{item.reason}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Button variant="hero" size="lg" asChild><Link to="/contact?intent=europe">Discuss Europe Wholesale Cooperation<ArrowRight className="h-4 w-4" /></Link></Button>
            <Button variant="hero-outline" size="lg" asChild><Link to="/products/compare">Compare Head Unit Models</Link></Button>
            <Button variant="ghost" size="lg" asChild><Link to="/accessories">View Accessories</Link></Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-12"><h2 className="section-title mb-4">Europe Distributor FAQ</h2></div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6 rounded-xl bg-card border border-border/50"><h3 className="font-semibold mb-2">{faq.question}</h3><p className="text-muted-foreground text-sm">{faq.answer}</p></div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsEuropeDistributorsPage;
