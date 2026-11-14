import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Package, TrendingUp, Users, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Package,
    title: "Product Portfolio",
    description: "Review Android car stereos, car audio products and accessories for your business.",
  },
  {
    icon: TrendingUp,
    title: "Pricing and Orders",
    description: "Ask about wholesale pricing, order requirements and current availability.",
  },
  {
    icon: Users,
    title: "Marketing Support",
    description: "Product images, videos, specifications, and marketing materials ready for your channels.",
  },
  {
    icon: Headphones,
    title: "Product Support",
    description: "Discuss product questions, compatibility and cooperation requirements.",
  },
];

const partnershipLevels = [
  {
    name: "Standard distribution",
    description: "A starting point for businesses reviewing the TEYES range",
    features: [
      "Product catalog",
      "Wholesale terms to discuss",
      "Product images and specifications",
      "Email product questions",
    ],
  },
  {
    name: "Expanded cooperation",
    description: "For businesses planning a broader TEYES product range",
    features: [
      "Product selection discussion",
      "Order planning",
      "Marketing material coordination",
      "Technical contact",
    ],
    highlighted: true,
  },
  {
    name: "Customized project",
    description: "For businesses with branding or product requirements",
    features: [
      "OEM/ODM discussion",
      "Custom product requirements",
      "Joint project planning",
      "Project contact",
    ],
  },
];

const SolutionsDistributorsPage = () => {
  return (
    <Layout>
      <SEO
        title="TEYES Head Units for Dealers & Installers | Wholesale Enquiries"
        description="Explore TEYES head units for your car audio business. Compare model roles, plan an evaluation and discuss wholesale terms for your market."
        keywords="car infotainment distributor, wholesale head unit, TEYES partner, distribution partnership"
        path="/solutions/distributors/"
      />
      <ContextHeader
        title="TEYES Android Head Units for Dealers and Installers"
        description="Expand your car audio range around the customers you already serve. Explore head units, car audio and accessories, then discuss the models and wholesale terms relevant to your business."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions/" },
          { label: "For Distributors" },
        ]}
      />

      {/* Buyer evaluation complements the existing support and cooperation modules. */}
      <section className="py-16 bg-background" aria-labelledby="range-role">
        <div className="container-wide max-w-4xl space-y-10">
          <div>
            <h2 id="range-role" className="section-title mb-4">Choose a role for TEYES in your range</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Whether you supply installation shops, sell to regional retailers or fit head units yourself, start with the upgrade your customers want. Do they need a more capable replacement radio, a premium option or a different price tier for everyday installations?</p>
              <p>For a premium position, review <Link className="text-primary underline underline-offset-4" to="/products/cc4-pro/">CC4 Pro</Link>. Compare it with the mainstream CC3 2K and entry-level models in the <Link className="text-primary underline underline-offset-4" to="/products/">TEYES product range</Link>. Choose around the features your customers will use and the installations your team can support.</p>
              <p>If your existing range already meets those needs, there may be no reason to replace it. A focused comparison should identify a useful addition, not create overlapping stock without a customer reason.</p>
            </div>
          </div>
          <div>
            <h2 className="section-title mb-4">Evaluate the installation, not just the screen</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Identify representative vehicles and the original equipment that matters to each installation. Ask which mounting parts, wiring interfaces and <Link className="text-primary underline underline-offset-4" to="/accessories/">accessories</Link> are required, which functions need confirmation and what is included in the proposed configuration.</p>
              <p>For audio-focused customers, consider the planned speakers, amplification and other equipment alongside the <Link className="text-primary underline underline-offset-4" to="/car-audio/">car audio range</Link>. Compatibility is a configuration-specific question, not a promise attached to every model.</p>
              <p>A sample or demo discussion can help define what to evaluate before a wider order. Confirm the evaluation arrangement and applicable terms rather than assuming a free sample or a particular delivery date.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">How TEYES Can Help</h2>
            <p className="section-subtitle mx-auto">
              Review product information and cooperation options before planning a TEYES distribution business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Levels */}
      <section className="py-20 bg-card">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Cooperation Options</h2>
            <p className="section-subtitle mx-auto">
              Start with the arrangement that fits your products, market and order requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnershipLevels.map((level) => (
              <div
                key={level.name}
                className={`rounded-2xl p-8 ${
                  level.highlighted
                    ? "bg-gradient-to-b from-primary/10 to-card border-2 border-primary/50"
                    : "bg-background border border-border/50"
                }`}
              >
                {level.highlighted && <div className="text-primary text-sm font-medium mb-4">Expanded cooperation</div>}
                <h3 className="text-xl font-semibold mb-2">{level.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{level.description}</p>
                <ul className="space-y-3">
                  {level.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
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
            Start a Practical Wholesale Conversation
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Tell us your country, business type, sales channel and the customer requests you want to address. Include target vehicles, preferred models or an approximate quantity if known. Your initial enquiry does not need to be a complete purchasing specification.
          </p>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Ask about current availability, order requirements, pricing and relevant product information. Distribution arrangements and market availability need confirmation for your location; an enquiry does not establish exclusive territory rights.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact/?inquiry=distribution">
              Business Partnership Enquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsDistributorsPage;
