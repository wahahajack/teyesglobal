import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Factory, Award, Headphones, FileCheck, Briefcase } from "lucide-react";

const capabilities = [
  { icon: Cpu, title: "Android Head Unit Platforms", description: "Standardized Android car stereo and head unit platforms ready for customization, reducing development time and risk." },
  { icon: Factory, title: "Car Radio Manufacturing Scale", description: "Modern facilities supporting orders from prototype to mass production with consistent quality." },
  { icon: Award, title: "Quality Systems", description: "ISO-certified processes designed to support consistent car infotainment and automotive electronics production." },
  { icon: Headphones, title: "Project Support", description: "Dedicated project managers and engineers throughout the Android car radio OEM/ODM development cycle." },
];

const processSteps = [
  { step: 1, title: "Requirement Discussion", description: "We review your target market, head unit platform, car stereo positioning, branding needs, and technical requirements." },
  { step: 2, title: "Solution Proposal", description: "Our team presents customized Android car radio and infotainment solutions with timelines and pricing." },
  { step: 3, title: "Sample & Validation", description: "Prototype development and validation to ensure specifications are met." },
  { step: 4, title: "Mass Production", description: "Scaled manufacturing with rigorous quality control at every stage." },
  { step: 5, title: "Long-term Support", description: "Ongoing technical support, updates, and continuous improvement." },
];

const subPages = [
  { title: "Capabilities", description: "Explore Android car radio OEM/ODM capabilities", href: "/oem-odm/capabilities", icon: Factory },
  { title: "Certifications", description: "Quality standards and industry certifications", href: "/oem-odm/certifications", icon: FileCheck },
  { title: "Project Cases", description: "Success stories from our OEM/ODM partnerships", href: "/oem-odm/cases", icon: Briefcase },
];

const faqs = [
  { question: "Is TEYES a China Android car stereo manufacturer?", answer: "TEYES provides Android car stereo, car radio, head unit, and infotainment OEM/ODM manufacturing support for global distributors, brands, and automotive electronics partners." },
  { question: "Can TEYES support both head unit wholesale and OEM/ODM projects?", answer: "Yes. TEYES supports standard distributor wholesale cooperation as well as OEM/ODM projects involving branding, UI, software, hardware, accessories, and production support." },
  { question: "What is the minimum order quantity (MOQ) for OEM projects?", answer: "MOQ varies by project complexity. Standard branding and UI projects are different from full custom hardware projects. Contact TEYES to discuss your specific market and customization scope." },
  { question: "Can TEYES customize both hardware and software?", answer: "Yes. TEYES offers full-stack customization including hardware configuration, Android OS customization, UI/UX design, app integration, and branding." },
];

const OemOdmPage = () => {
  return (
    <Layout>
      <SEO
        title="China Android Car Stereo Manufacturer & Head Unit OEM/ODM Factory | TEYES"
        description="TEYES provides Android car stereo manufacturing, car radio OEM/ODM, head unit customization, UI branding, software support, and production solutions for global brands and distributors."
        keywords="China car audio manufacturers, Android car stereo manufacturer, car radio factory, head unit OEM ODM, car stereo suppliers, custom head unit, white-label Android car radio"
        path="/oem-odm"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "OEM / ODM" },
        ]}
        faq={faqs}
      />
      <ContextHeader
        title="Android Car Stereo & Head Unit OEM/ODM Manufacturer"
        description="Leverage proven Android head unit platforms and manufacturing capabilities to bring your car radio or infotainment product line to market faster."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "OEM / ODM" },
        ]}
      />

      <section className="py-12 bg-card border-y border-border/50">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6">
            {subPages.map((page) => (
              <Link key={page.title} to={page.href} className="group flex items-center gap-4 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><page.icon className="h-6 w-6 text-primary" /></div>
                <div className="flex-1"><h3 className="font-semibold group-hover:text-primary transition-colors">{page.title}</h3><p className="text-sm text-muted-foreground">{page.description}</p></div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">What We Offer</h2>
            <p className="section-subtitle mx-auto">Complete Android car radio, car stereo, and head unit OEM/ODM services from concept to production.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap) => (
              <div key={cap.title} className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><cap.icon className="h-6 w-6 text-primary" /></div>
                <h3 className="text-lg font-semibold mb-2">{cap.title}</h3>
                <p className="text-muted-foreground text-sm">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Our Process</h2>
            <p className="section-subtitle mx-auto">A proven workflow that minimizes risk and maximizes speed to market.</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-8">
              {processSteps.map((step) => (
                <div key={step.step} className="relative flex gap-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0 z-10">{step.step}</div>
                  <div className="flex-1 pt-3"><h3 className="text-xl font-semibold mb-2">{step.title}</h3><p className="text-muted-foreground">{step.description}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Talk to an Engineer Before Making Any Commitment</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">No obligation discussion. Let's explore how TEYES can support your Android head unit, car radio, or infotainment product development goals.</p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact?intent=oem">Request OEM Consultation<ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default OemOdmPage;