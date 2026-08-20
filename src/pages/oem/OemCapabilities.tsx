import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Cpu, Palette, Code, Factory, Wrench, TestTube } from "lucide-react";

const capabilities = [
  {
    icon: Cpu,
    title: "Hardware Customization",
    description: "Modify hardware specifications, add interfaces, or develop custom PCB layouts.",
    features: [
      "Custom interface configurations",
      "Screen size and resolution options",
      "Memory and storage customization",
      "Connector and harness adaptation",
    ],
  },
  {
    icon: Palette,
    title: "Branding & UI",
    description: "Complete visual customization to match your brand identity.",
    features: [
      "Boot logo and animations",
      "Custom UI themes and colors",
      "Branded packaging design",
      "Custom accessory design",
    ],
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Custom software features and integrations for your specific needs.",
    features: [
      "Custom Android applications",
      "Third-party integrations",
      "Firmware modifications",
      "Feature development",
    ],
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Scalable production with consistent quality and on-time delivery.",
    features: [
      "Prototype development",
      "Pilot production runs",
      "Mass production scaling",
      "Quality control systems",
    ],
  },
  {
    icon: Wrench,
    title: "Engineering Support",
    description: "Dedicated technical resources throughout your project lifecycle.",
    features: [
      "Project management",
      "Technical consultation",
      "Design reviews",
      "Testing support",
    ],
  },
  {
    icon: TestTube,
    title: "Testing & Validation",
    description: "Comprehensive testing to ensure product quality and compliance.",
    features: [
      "Environmental testing",
      "EMC compliance testing",
      "Reliability testing",
      "Performance validation",
    ],
  },
];

const OemCapabilitiesPage = () => {
  return (
    <Layout>
      <SEO
        title="OEM/ODM Capabilities - Hardware, Software & Manufacturing"
        description="Full-spectrum OEM/ODM capabilities: hardware customization, branding, software development, manufacturing, engineering support, and testing services."
        keywords="OEM capabilities, hardware customization, custom branding, software development, automotive manufacturing"
        path="/oem-odm/capabilities/"
      />
      <ContextHeader
        title="Full-Spectrum OEM/ODM Capabilities"
        description="From minor customizations to ground-up product development, we have the capabilities to support your project."
        backLink={{ label: "Back to OEM / ODM", href: "/oem-odm/" }}
      />

      {/* Capabilities Grid */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-2xl bg-card border border-border/50 p-8 hover:border-primary/30 transition-colors"
              >
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

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss your requirements and find the right approach for your project.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact/">
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
