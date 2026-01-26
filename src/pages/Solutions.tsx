import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Car, Settings, Globe } from "lucide-react";

const solutionCategories = [
  {
    id: "distributors",
    title: "For Distributors",
    description: "Access proven products with competitive margins and reliable supply chain support",
    icon: Building2,
    href: "/solutions/distributors",
    color: "from-primary to-accent",
    benefits: [
      "Competitive wholesale pricing",
      "Marketing support materials",
      "Technical training programs",
      "Dedicated account management",
    ],
  },
  {
    id: "auto-brands",
    title: "For Auto Brands",
    description: "White-label and co-branded infotainment solutions tailored to your specifications",
    icon: Car,
    href: "/solutions/auto-brands",
    color: "from-emerald-500 to-teal-400",
    benefits: [
      "Custom branding options",
      "Exclusive model variants",
      "Priority production scheduling",
      "Joint development programs",
    ],
  },
  {
    id: "integrators",
    title: "For System Integrators",
    description: "Flexible hardware platforms with open APIs for custom integrations",
    icon: Settings,
    href: "/solutions/integrators",
    color: "from-amber-500 to-orange-400",
    benefits: [
      "Open API documentation",
      "SDK and development tools",
      "Technical integration support",
      "Custom firmware options",
    ],
  },
  {
    id: "market-needs",
    title: "By Market Needs",
    description: "Solutions tailored to specific market conditions and customer requirements",
    icon: Globe,
    href: "/solutions/market-needs",
    color: "from-violet-500 to-purple-400",
    benefits: [
      "Market entry consulting",
      "Regional feature adaptation",
      "Local compliance support",
      "Pricing strategy guidance",
    ],
  },
];

const SolutionsPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-card to-background">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-primary font-medium mb-2">Solutions</p>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Partnership Models for Every Business
            </h1>
            <p className="section-subtitle">
              Whether you're a distributor, auto brand, or system integrator, 
              we have tailored solutions to support your growth.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {solutionCategories.map((solution) => (
              <Link
                key={solution.id}
                to={solution.href}
                className="group rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                {/* Header */}
                <div className="p-8 bg-gradient-to-br from-secondary/50 to-card">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center shrink-0`}>
                      <solution.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                        {solution.title}
                      </h2>
                      <p className="text-muted-foreground">{solution.description}</p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="p-8 pt-0">
                  <ul className="space-y-3 mb-6">
                    {solution.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-primary font-medium">
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Not Sure Which Solution Fits?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our team can help you identify the best partnership model based on 
            your business goals and market position.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Talk to Our Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsPage;
