import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Plug, FileText, Wrench } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Open APIs",
    description: "Comprehensive APIs for deep integration with your software ecosystem.",
  },
  {
    icon: Plug,
    title: "Hardware Interfaces",
    description: "CAN bus, GPIO, and standard automotive interfaces for vehicle integration.",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Detailed technical documentation and integration guides.",
  },
  {
    icon: Wrench,
    title: "Development Tools",
    description: "SDKs, emulators, and debugging tools for efficient development.",
  },
];

const integrationOptions = [
  {
    title: "Fleet Management",
    description: "Integrate with fleet tracking, driver behavior monitoring, and logistics systems.",
  },
  {
    title: "Telematics",
    description: "Vehicle diagnostics, remote monitoring, and connected car services.",
  },
  {
    title: "Custom Applications",
    description: "Develop and deploy custom Android applications for specific use cases.",
  },
  {
    title: "Third-Party Hardware",
    description: "Interface with cameras, sensors, and specialized automotive equipment.",
  },
];

const SolutionsIntegratorsPage = () => {
  return (
    <Layout>
      <SEO
        title="System Integrator Solutions - APIs & Development Tools"
        description="Build on TEYES hardware with open APIs, SDKs, and development tools. Fleet management, telematics, custom applications, and hardware interfaces."
        keywords="system integrator, open API, car infotainment SDK, fleet management integration, telematics"
        path="/solutions/integrators"
      />
      <ContextHeader
        title="Solutions for System Integrators"
        description="Build on our proven hardware platforms with open APIs and comprehensive development tools."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "For Integrators" },
        ]}
      />

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Developer-Friendly Platform</h2>
            <p className="section-subtitle mx-auto">
              Everything you need to build custom solutions on TEYES hardware.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="py-20 bg-card">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Integration Scenarios</h2>
            <p className="section-subtitle mx-auto">
              Common use cases our platform supports.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {integrationOptions.map((option) => (
              <div
                key={option.title}
                className="p-8 rounded-xl bg-background border border-border/50"
              >
                <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                <p className="text-muted-foreground">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Ready to Integrate?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact our technical team to discuss your integration requirements 
            and get access to developer resources.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Talk to Engineering
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsIntegratorsPage;
