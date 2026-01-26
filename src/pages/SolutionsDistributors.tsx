import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Package, TrendingUp, Users, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Package,
    title: "Proven Product Portfolio",
    description: "Access to a complete range of infotainment products with proven market success across 100+ countries.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Margins",
    description: "Wholesale pricing structures designed to ensure healthy margins for your distribution business.",
  },
  {
    icon: Users,
    title: "Marketing Support",
    description: "Product images, videos, specifications, and marketing materials ready for your channels.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Account managers and technical support to help you succeed in your market.",
  },
];

const partnershipLevels = [
  {
    name: "Authorized Distributor",
    description: "Standard partnership for regional distribution",
    features: [
      "Access to full product catalog",
      "Standard wholesale pricing",
      "Basic marketing materials",
      "Email technical support",
    ],
  },
  {
    name: "Preferred Partner",
    description: "Enhanced partnership with priority benefits",
    features: [
      "Everything in Authorized tier",
      "Improved pricing tiers",
      "Priority stock allocation",
      "Dedicated account manager",
      "Co-marketing opportunities",
    ],
    highlighted: true,
  },
  {
    name: "Strategic Partner",
    description: "Premium partnership for key markets",
    features: [
      "Everything in Preferred tier",
      "Exclusive territory rights",
      "Custom product options",
      "Joint business planning",
      "Executive-level engagement",
    ],
  },
];

const SolutionsDistributorsPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-card to-background relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <p className="text-primary font-medium mb-2">For Distributors</p>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Grow Your Business with a Proven Brand
            </h1>
            <p className="section-subtitle mb-8">
              Partner with TEYES to access premium infotainment products, 
              competitive pricing, and comprehensive support for your distribution business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Become a Distributor
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/products">View Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Why Partner with TEYES</h2>
            <p className="section-subtitle mx-auto">
              We provide everything you need to build a successful distribution business.
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
            <h2 className="section-title mb-4">Partnership Levels</h2>
            <p className="section-subtitle mx-auto">
              Choose the partnership level that matches your business scale and ambitions.
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
                {level.highlighted && (
                  <div className="text-primary text-sm font-medium mb-4">Most Popular</div>
                )}
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
            Ready to Start?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact us to discuss partnership opportunities and find the right 
            level for your business.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Contact Sales
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsDistributorsPage;
