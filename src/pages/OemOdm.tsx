import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Factory, Award, Headphones, FileCheck, Briefcase } from "lucide-react";
import oemFactoryImg from "@/assets/decorative/oem-factory.jpg";
import carInteriorImg from "@/assets/decorative/car-interior.jpg";

const capabilities = [
  {
    icon: Cpu,
    title: "Hardware Platforms",
    description: "Standardized hardware platforms ready for customization, reducing development time and risk.",
  },
  {
    icon: Factory,
    title: "Manufacturing Scale",
    description: "Modern facilities supporting orders from prototype to mass production with consistent quality.",
  },
  {
    icon: Award,
    title: "Quality Systems",
    description: "ISO-certified processes ensuring consistent quality across every production run.",
  },
  {
    icon: Headphones,
    title: "Project Support",
    description: "Dedicated project managers and engineers throughout the development cycle.",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Requirement Discussion",
    description: "We understand your needs, target market, and technical requirements.",
  },
  {
    step: 2,
    title: "Solution Proposal",
    description: "Our team presents customized solutions with timelines and pricing.",
  },
  {
    step: 3,
    title: "Sample & Validation",
    description: "Prototype development and validation to ensure specifications are met.",
  },
  {
    step: 4,
    title: "Mass Production",
    description: "Scaled manufacturing with rigorous quality control at every stage.",
  },
  {
    step: 5,
    title: "Long-term Support",
    description: "Ongoing technical support, updates, and continuous improvement.",
  },
];

const subPages = [
  {
    title: "Capabilities",
    description: "Explore our full range of OEM/ODM capabilities",
    href: "/oem-odm/capabilities",
    icon: Factory,
  },
  {
    title: "Certifications",
    description: "Quality standards and industry certifications",
    href: "/oem-odm/certifications",
    icon: FileCheck,
  },
  {
    title: "Project Cases",
    description: "Success stories from our OEM/ODM partnerships",
    href: "/oem-odm/cases",
    icon: Briefcase,
  },
];

const OemOdmPage = () => {
  return (
    <Layout>
      {/* Hero with Background Image */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={oemFactoryImg}
            alt="Manufacturing facility"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background" />
        </div>

        <div className="container-wide relative py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-medium mb-2">OEM / ODM</p>
              <h1 className="section-title text-4xl md:text-5xl mb-6">
                Build Competitive Products Without Complex R&D
              </h1>
              <p className="section-subtitle mb-8">
                Leverage our proven hardware platforms, manufacturing capabilities, 
                and technical expertise to bring your infotainment products to market faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Start an OEM Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/landing/oem">View OEM Landing Page</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-border/30 shadow-xl">
                <img
                  src={carInteriorImg}
                  alt="Premium car interior with infotainment"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-primary text-sm font-medium">Your Brand</p>
                  <p className="text-foreground font-semibold">Our Technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-pages Navigation */}
      <section className="py-12 bg-card border-y border-border/50">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6">
            {subPages.map((page) => (
              <Link
                key={page.title}
                to={page.href}
                className="group flex items-center gap-4 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <page.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{page.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Overview */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">What We Offer</h2>
            <p className="section-subtitle mx-auto">
              Complete OEM/ODM services from concept to production.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <cap.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{cap.title}</h3>
                <p className="text-muted-foreground text-sm">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-card">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Our Process</h2>
            <p className="section-subtitle mx-auto">
              A proven workflow that minimizes risk and maximizes speed to market.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-8">
              {processSteps.map((step) => (
                <div key={step.step} className="relative flex gap-8">
                  {/* Step Number */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0 z-10">
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-3">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Talk to an Engineer Before Making Any Commitment
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            No obligation discussion. Let's explore how TEYES can support your 
            product development goals.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Request OEM Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default OemOdmPage;
