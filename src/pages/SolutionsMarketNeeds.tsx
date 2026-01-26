import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, TrendingUp, Shield, Users } from "lucide-react";

const marketTypes = [
  {
    title: "Entry-Level Aftermarket",
    description: "Price-sensitive markets where value is the primary purchasing driver.",
    products: ["X1 Pro", "CC4L"],
    strategies: [
      "Focus on essential features",
      "Competitive pricing positioning",
      "Simple installation focus",
    ],
  },
  {
    title: "Premium Upgrade Markets",
    description: "Markets where customers seek feature-rich upgrades for their vehicles.",
    products: ["CC4 Pro", "CC3 2K"],
    strategies: [
      "Emphasize advanced features",
      "Quality and reliability messaging",
      "Premium positioning",
    ],
  },
  {
    title: "Emerging Markets",
    description: "Growing markets with increasing demand for infotainment solutions.",
    products: ["CC3 2K", "CC4", "X1 Pro"],
    strategies: [
      "Scalable product range",
      "Local language support",
      "Partner development focus",
    ],
  },
  {
    title: "Mature Markets",
    description: "Established markets with sophisticated customer expectations.",
    products: ["CC4 Pro", "CC3 2K"],
    strategies: [
      "Feature differentiation",
      "Brand recognition leverage",
      "Service excellence",
    ],
  },
];

const supportServices = [
  {
    icon: Target,
    title: "Market Analysis",
    description: "Data-driven insights on market size, competition, and customer preferences.",
  },
  {
    icon: TrendingUp,
    title: "Product Positioning",
    description: "Recommendations on which products to offer and how to position them.",
  },
  {
    icon: Shield,
    title: "Compliance Support",
    description: "Guidance on local regulations, certifications, and requirements.",
  },
  {
    icon: Users,
    title: "Partner Network",
    description: "Connect with established installers and retailers in your target market.",
  },
];

const SolutionsMarketNeedsPage = () => {
  return (
    <Layout>
      <ContextHeader
        title="Solutions by Market Needs"
        description="Product strategies and configurations adapted to your specific market conditions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "By Market Needs" },
        ]}
      />

      {/* Market Types */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Market Types We Support</h2>
            <p className="section-subtitle mx-auto">
              Experience across diverse market conditions and customer segments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {marketTypes.map((market) => (
              <div
                key={market.title}
                className="rounded-2xl bg-card border border-border/50 p-8"
              >
                <h3 className="text-xl font-semibold mb-2">{market.title}</h3>
                <p className="text-muted-foreground mb-6">{market.description}</p>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Recommended Products:</p>
                  <div className="flex flex-wrap gap-2">
                    {market.products.map((product) => (
                      <span key={product} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Key Strategies:</p>
                  <ul className="space-y-2">
                    {market.strategies.map((strategy) => (
                      <li key={strategy} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-card">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Market Entry Support</h2>
            <p className="section-subtitle mx-auto">
              We don't just sell products — we help you succeed in your market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportServices.map((service) => (
              <div
                key={service.title}
                className="p-6 rounded-xl bg-background border border-border/50"
              >
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Let's Discuss Your Market Strategy
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Share your target market and goals. We'll provide insights and 
            recommendations based on our global experience.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Get Market Advice
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsMarketNeedsPage;
