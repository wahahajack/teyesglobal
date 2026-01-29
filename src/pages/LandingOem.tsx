import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Factory, Cpu, Palette, Clock, Shield, Users } from "lucide-react";
import oemFactoryImg from "@/assets/decorative/oem-factory.jpg";

const benefits = [
  { icon: Factory, title: "Manufacturing Scale", text: "From prototype to 100K+ units" },
  { icon: Cpu, title: "Proven Platforms", text: "Hardware ready for customization" },
  { icon: Palette, title: "Full Branding", text: "Your identity, our technology" },
  { icon: Clock, title: "Fast Time-to-Market", text: "6-12 months typical launch" },
  { icon: Shield, title: "Certified Quality", text: "ISO & automotive standards" },
  { icon: Users, title: "Dedicated Team", text: "Engineering support included" },
];

const process = [
  { step: 1, title: "Initial Discussion", desc: "Share your requirements and goals" },
  { step: 2, title: "Solution Design", desc: "We propose a tailored approach" },
  { step: 3, title: "Sample Development", desc: "Prototype and validation" },
  { step: 4, title: "Production Launch", desc: "Scale manufacturing begins" },
];

const LandingOemPage = () => {
  return (
    <Layout>
      <SEOHead
        title="OEM Partnership - Custom Car Infotainment Manufacturing"
        description="Partner with TEYES for OEM car infotainment. Proven hardware platforms, full branding, 6-12 month launch, ISO-certified manufacturing, and dedicated engineering support."
        keywords="OEM car infotainment, custom manufacturing, white-label head unit, automotive OEM partner"
        canonicalPath="/partners/oem"
      />
      {/* Hero - Full Height with Image */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={oemFactoryImg}
            alt="Modern manufacturing facility"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
        </div>

        {/* Content */}
        <div className="container-wide relative py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                OEM / ODM Partnership
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Launch Your Own
                <span className="block text-primary">Car Infotainment Line</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Skip years of R&D and millions in investment. Partner with TEYES to bring 
                competitive infotainment products to market under your own brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">
                    Request OEM Consultation
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/oem-odm">Learn About Our Capabilities</Link>
                </Button>
              </div>
            </div>

            {/* Right: Featured Image */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border border-border/30 shadow-2xl">
                <img
                  src={oemFactoryImg}
                  alt="Advanced manufacturing facility"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-primary text-sm font-medium">Modern Manufacturing</p>
                  <p className="text-foreground font-semibold">State-of-the-Art Production Lines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-card">
        <div className="container-wide">
          <h2 className="section-title text-center mb-4">Why Partner with TEYES</h2>
          <p className="section-subtitle text-center mx-auto mb-12">
            Everything you need to succeed in the infotainment market.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{b.title}</h3>
                  <p className="text-muted-foreground text-sm">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <h2 className="section-title text-center mb-12">Simple 4-Step Process</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((p) => (
              <div key={p.step} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground mb-4">
                  {p.step}
                </div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-card to-background">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Build Your Product Line?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            No obligation discussion. Let's explore how TEYES can support your product development goals.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Contact Our OEM Team
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default LandingOemPage;
