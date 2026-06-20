import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Factory, CheckCircle, Settings, ShieldCheck, Wrench, PackageCheck } from "lucide-react";

const checks = [
  { icon: Factory, title: "Factory and platform depth", description: "Check whether the supplier has proven Android head unit platforms, stable product lines, and manufacturing support instead of only trading generic units." },
  { icon: Settings, title: "CANBUS and fitment support", description: "A car radio manufacturer should support fitment discussion, CANBUS questions, camera compatibility, and installation scenarios." },
  { icon: ShieldCheck, title: "Quality and compliance", description: "Review quality systems, test procedures, regional documents, and model-specific certifications before scaling orders." },
  { icon: Wrench, title: "Firmware and after-sales", description: "Strong car audio manufacturers should help with firmware, troubleshooting, and distributor support after shipment." },
  { icon: PackageCheck, title: "Accessories and bundles", description: "Cameras, DAB+, microphones, TPMS, OBD II, and cables can make the head unit offer easier to sell and support." },
  { icon: CheckCircle, title: "Distributor sales assets", description: "Look for comparison sheets, product images, specs, dealer FAQ, and market-positioning support." },
];

const faqs = [
  { question: "What should distributors check when choosing China car audio manufacturers?", answer: "Distributors should review product platforms, Android head unit stability, car stereo model range, fitment support, CANBUS experience, firmware support, quality systems, certifications, accessories, and after-sales communication." },
  { question: "Is a car radio factory better than a trading company?", answer: "A factory or platform owner can usually support deeper product questions, OEM/ODM customization, firmware, accessories, and long-term product planning. Trading companies may be useful for sourcing but often have less control over engineering and after-sales." },
  { question: "Does TEYES support Android head unit OEM/ODM and wholesale cooperation?", answer: "Yes. TEYES supports both distributor wholesale cooperation and OEM/ODM projects for Android car stereos, car radios, head units, and infotainment accessories." },
];

const ChinaCarAudioManufacturersGuide = () => {
  return (
    <Layout>
      <SEO
        title="How to Choose China Car Audio Manufacturers for Android Head Units"
        description="A B2B guide for choosing China car audio manufacturers, Android car stereo suppliers, car radio factories, and head unit OEM/ODM partners."
        keywords="China car audio manufacturers, car radio factory, Android car stereo manufacturer, car stereo suppliers, Android head unit factory, car radio OEM ODM"
        path="/resources/china-car-audio-manufacturers-guide"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources/china-car-audio-manufacturers-guide" },
          { label: "China Car Audio Manufacturers Guide" },
        ]}
        faq={faqs}
      />
      <ContextHeader
        title="How to Choose China Car Audio Manufacturers"
        description="A practical checklist for distributors comparing Android car stereo suppliers, car radio factories, and head unit OEM/ODM partners."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
          { label: "China Car Audio Manufacturers Guide" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title mb-4">Start with the real buying risk, not only the price</h2>
          <p className="text-muted-foreground mb-6">For car audio distributors, the real risk is not only unit cost. A weak Android car stereo supplier can create fitment issues, CANBUS confusion, firmware problems, unclear installation support, and higher return pressure. A stronger partner should help you choose the right head unit platform, build a product ladder, and support your dealer channel.</p>
          <p className="text-muted-foreground">TEYES is positioned for distributors, installers, retailers, and brands that need Android head units, car radios, accessories, and OEM/ODM cooperation with a more structured support model.</p>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checks.map((item) => (
              <div key={item.title} className="rounded-xl bg-background border border-border/50 p-6"><div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><item.icon className="h-6 w-6 text-primary" /></div><h3 className="font-semibold mb-2">{item.title}</h3><p className="text-sm text-muted-foreground">{item.description}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title mb-6">Factory checklist for distributors</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]"><thead><tr className="bg-card"><th className="text-left p-4 border-b border-border/50">What to check</th><th className="text-left p-4 border-b border-border/50">Why it matters</th></tr></thead><tbody>
              <tr><td className="p-4 border-b border-border/30 font-medium">Android head unit platform</td><td className="p-4 border-b border-border/30 text-muted-foreground">Stable platforms make it easier to build a product ladder and support dealers.</td></tr>
              <tr><td className="p-4 border-b border-border/30 font-medium">Fitment and CANBUS support</td><td className="p-4 border-b border-border/30 text-muted-foreground">Reduces installation uncertainty and after-sales pressure.</td></tr>
              <tr><td className="p-4 border-b border-border/30 font-medium">Firmware support</td><td className="p-4 border-b border-border/30 text-muted-foreground">Important for long-term distributor confidence.</td></tr>
              <tr><td className="p-4 border-b border-border/30 font-medium">Accessories</td><td className="p-4 border-b border-border/30 text-muted-foreground">Cameras, microphones, DAB+, TPMS, and cables help create complete upgrade bundles.</td></tr>
              <tr><td className="p-4 border-b border-border/30 font-medium">OEM/ODM scope</td><td className="p-4 border-b border-border/30 text-muted-foreground">Clarifies whether branding, UI, software, hardware, or packaging can be customized.</td></tr>
            </tbody></table>
          </div>
          <div className="flex flex-wrap gap-3 mt-10"><Button variant="hero" size="lg" asChild><Link to="/oem-odm">Explore TEYES OEM/ODM<ArrowRight className="h-4 w-4" /></Link></Button><Button variant="hero-outline" size="lg" asChild><Link to="/solutions/distributors">Distributor Program</Link></Button></div>
        </div>
      </section>
    </Layout>
  );
};

export default ChinaCarAudioManufacturersGuide;
