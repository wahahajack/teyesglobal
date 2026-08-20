import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Palette, Shield, Zap, Award } from "lucide-react";

const benefits = [
  {
    icon: Palette,
    title: "Custom Branding",
    description: "Your logo, colors, and brand identity integrated into the product experience.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous testing and certification processes to meet your quality standards.",
  },
  {
    icon: Zap,
    title: "Fast Time-to-Market",
    description: "Leverage our proven platforms to accelerate your product launches.",
  },
  {
    icon: Award,
    title: "Exclusive Features",
    description: "Custom software features and UI designs unique to your brand.",
  },
];

const collaborationModels = [
  {
    title: "White-Label Products",
    description: "Our products with your branding. Quick to market with proven quality.",
    features: [
      "Your brand identity on proven hardware",
      "Custom boot logo and UI themes",
      "Your packaging and documentation",
      "Minimum investment, maximum speed",
    ],
  },
  {
    title: "Co-Branded Solutions",
    description: "Joint development that combines your market insights with our technology.",
    features: [
      "Shared development resources",
      "Combined brand recognition",
      "Custom feature development",
      "Joint marketing campaigns",
    ],
  },
  {
    title: "Exclusive Models",
    description: "Unique products developed exclusively for your brand and channels.",
    features: [
      "Exclusive product designs",
      "Unique feature sets",
      "Protected distribution rights",
      "Long-term development roadmap",
    ],
  },
];

const SolutionsAutoBrandsPage = () => {
  return (
    <Layout>
      <SEO
        title="Auto Brand Solutions - White-Label Car Infotainment"
        description="White-label and co-branded infotainment solutions for auto brands. Custom branding, exclusive models, fast time-to-market, and quality assurance."
        keywords="white-label car infotainment, co-branded head unit, automotive brand partnership, custom car stereo"
        path="/solutions/auto-brands/"
      />
      <ContextHeader
        title="Solutions for Auto Brands"
        description="Launch your own infotainment line without R&D complexity. We provide the technology, you own the brand."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions/" },
          { label: "For Auto Brands" },
        ]}
      />

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Your Brand, Our Technology</h2>
            <p className="section-subtitle mx-auto">
              Focus on what you do best while we handle the technical complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Models */}
      <section className="py-20 bg-card">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Collaboration Models</h2>
            <p className="section-subtitle mx-auto">
              Flexible partnership options to match your brand strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {collaborationModels.map((model, index) => (
              <div
                key={model.title}
                className="rounded-2xl bg-background border border-border/50 p-8 hover:border-primary/30 transition-colors"
              >
                <div className="text-emerald-500 text-sm font-medium mb-4">
                  Option {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{model.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{model.description}</p>
                <ul className="space-y-3">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Let's Build Your Product Line
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Share your vision and we'll show you how TEYES can bring it to life.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact/">
              Start the Conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsAutoBrandsPage;
