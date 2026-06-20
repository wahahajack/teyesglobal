import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Cpu, Palette, Code, Factory, Wrench, TestTube } from "lucide-react";

const capabilities = [
  {
    icon: Cpu,
    title: "Head Unit Hardware Customization",
    description: "Modify Android car stereo hardware specifications, add interfaces, or develop custom PCB layouts.",
    features: ["Custom interface configurations", "Screen size and resolution options", "Memory and storage customization", "Connector and harness adaptation"],
  },
  {
    icon: Palette,
    title: "Car Radio Branding & UI",
    description: "Complete visual customization to match your car audio or automotive electronics brand identity.",
    features: ["Boot logo and animations", "Custom UI themes and colors", "Branded packaging design", "Custom accessory design"],
  },
  {
    icon: Code,
    title: "Software & Firmware Development",
    description: "Custom Android car radio software features, app integrations, and firmware support for your market.",
    features: ["Custom Android applications", "Third-party integrations", "Firmware modifications", "Feature development"],
  },
  {
    icon: Factory,
    title: "Car Stereo Manufacturing",
    description: "Scalable production for Android head units and car infotainment systems with consistent quality and on-time delivery.",
    features: ["Prototype development", "Pilot production runs", "Mass production scaling", "Quality control systems"],
  },
  {
    icon: Wrench,
    title: "Engineering Support",
    description: "Dedicated technical resources throughout your Android head unit project lifecycle.",
    features: ["Project management", "Technical consultation", "Design reviews", "Testing support"],
  },
  {
    icon: TestTube,
    title: "Testing & Validation",
    description: "Comprehensive testing to support product quality, reliability, and regional compliance needs.",
    features: ["Environmental testing", "EMC compliance testing", "Reliability testing", "Performance validation"],
  },
];

const faqs = [
  {
    question: "What OEM/ODM capabilities does TEYES offer for Android head units?",
    answer: "TEYES supports Android head unit and car stereo OEM/ODM projects covering hardware configuration, UI branding, firmware support, app integration, accessory planning, testing, and production.",
  },
  {
    question: "Can TEYES support car radio factory projects for global brands?",
    answer: "Yes. TEYES can support global brands and distributors looking for Android car radio factory capabilities, white-label cooperation, and market-specific product customization.",
  },
];

const OemCapabilitiesPage = () => {
  return (
    <Layout>
      <SEO
        title="Android Car Radio OEM/ODM Capabilities | TEYES Head Unit Factory Support"
        description="Explore TEYES OEM/ODM capabilities for Android car radios, car stereos, and head unit systems, including hardware customization, UI branding, firmware support, testing, and production."
        keywords="Android car radio OEM ODM, head unit factory, car stereo manufacturing, car radio factory, hardware customization, custom branding, software development, automotive manufacturing"
        path="/oem-odm/capabilities"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "OEM / ODM", href: "/oem-odm" },
          { label: "Capabilities" },
        ]}
        faq={faqs}
      />
      <ContextHeader
        title="Android Car Radio & Head Unit OEM/ODM Capabilities"
        description="From minor customizations to full product development, TEYES supports Android car stereo and head unit projects for brands, distributors, and automotive electronics partners."
        backLink={{ label: "Back to OEM / ODM", href: "/oem-odm" }}
      />

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.title} className="rounded-2xl bg-card border border-border/50 p-8 hover:border-primary/30 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <cap.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{cap.title}</h3>
                <p className="text-muted-foreground mb-6">{cap.description}</p>
                <ul className="space-y-2">
                  {cap.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Have an Android Head Unit Project in Mind?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Let's discuss your car radio factory, car stereo OEM/ODM, or white-label head unit requirements and find the right approach for your project.</p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact?intent=oem">
              Start a Conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default OemCapabilitiesPage;