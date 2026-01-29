import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ContextHeader } from "@/components/layout/ContextHeader";
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
      <SEOHead
        title="Distributor Partnership - Wholesale Car Infotainment"
        description="Become a TEYES distributor. Access proven products, competitive wholesale pricing, marketing support, and dedicated account management across 100+ markets."
        keywords="car infotainment distributor, wholesale head unit, TEYES partner, distribution partnership"
        canonicalPath="/solutions/distributors"
      />
      <ContextHeader
        title="Solutions for Distributors"
        description="Partner with TEYES to access premium products, competitive pricing, and comprehensive support."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "For Distributors" },
        ]}
      />

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
