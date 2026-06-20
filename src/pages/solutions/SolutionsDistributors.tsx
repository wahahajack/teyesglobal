import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Package, TrendingUp, Users, Headphones, Boxes, ShieldCheck } from "lucide-react";

const quickStart = [
  {
    icon: Boxes,
    title: "Mixed-model Trial Orders",
    description: "Test flagship, mainstream, and entry-level TEYES Android head unit and car stereo models before committing to a deeper market program.",
  },
  {
    icon: TrendingUp,
    title: "Higher Retail Positioning",
    description: "Build a stronger car audio and car radio product ladder instead of competing only with low-price generic Android units.",
  },
  {
    icon: ShieldCheck,
    title: "Dealer Support Package",
    description: "Use product specs, images, comparison guidance, and technical support to reduce sales and installation friction.",
  },
];

const benefits = [
  {
    icon: Package,
    title: "Proven Product Portfolio",
    description: "Access a complete Android car stereo and head unit lineup covering premium, mainstream, and entry-level market needs.",
  },
  {
    icon: TrendingUp,
    title: "Channel-friendly Margins",
    description: "Wholesale pricing structures designed to support healthy distributor and dealer profitability.",
  },
  {
    icon: Users,
    title: "Marketing Support",
    description: "Product images, videos, specifications, and marketing materials ready for car stereo wholesale and dealer channels.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Account managers and technical support to help with product selection, installation questions, and after-sales communication.",
  },
];

const partnershipLevels = [
  {
    name: "Authorized Distributor",
    description: "Standard partnership for regional car stereo and head unit distribution",
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
      "Territory discussion for qualified markets",
      "Custom product options",
      "Joint business planning",
      "Executive-level engagement",
    ],
  },
];

const faqs = [
  {
    question: "Who can apply to become a TEYES distributor?",
    answer: "TEYES distributor cooperation is suitable for car stereo distributors, car radio wholesalers, automotive electronics distributors, car audio installers, retail chains, online sellers, and regional aftermarket partners.",
  },
  {
    question: "Does TEYES support both Android head unit and car stereo wholesale channels?",
    answer: "Yes. TEYES supports partners selling Android head units, Android car stereos, car radios, infotainment systems, and related accessories through wholesale, installer, retail, and online channels.",
  },
  {
    question: "Can distributors test more than one model in the first order?",
    answer: "Yes. TEYES supports product mix discussions so partners can test flagship, mainstream, and entry-level head unit and car stereo models according to local market demand.",
  },
  {
    question: "What support can distributors receive?",
    answer: "Support can include product specifications, images, videos, comparison guidance, account management, and technical support for product selection and after-sales communication.",
  },
];

const SolutionsDistributorsPage = () => {
  return (
    <Layout>
      <SEO
        title="Car Stereo Wholesale Distributor Program | TEYES Android Head Units"
        description="Apply for TEYES wholesale pricing for Android car stereos, car radios, head units, and accessories. Build a distributor product line with mixed-model trials and dealer support."
        keywords="android head unit distributor, car stereo wholesale, wholesale android car stereo, car radio distributor, car stereo suppliers, wholesale car audio, TEYES distributor, car infotainment supplier"
        path="/solutions/distributors"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "For Distributors" },
        ]}
        faq={faqs}
      />
      <ContextHeader
        title="Android Car Stereo & Head Unit Wholesale Program"
        description="Sell higher, reduce return pressure, and build a stronger Android head unit and car stereo product ladder for your market."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "For Distributors" },
        ]}
      />

      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title mb-4">Build a TEYES Product Line Without Heavy Guesswork</h2>
            <p className="section-subtitle mx-auto">
              TEYES supports car stereo distributors, car radio suppliers, installers, and retail chains looking to build a premium Android head unit and car infotainment product line.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickStart.map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact?intent=wholesale">
                Apply for Wholesale Pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/products/compare">Compare Head Unit Models</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/solutions/market-needs">View Market Needs</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title mb-4">Why Partner with TEYES</h2>
            <p className="section-subtitle mx-auto">
              We provide the product ladder, wholesale support, and technical resources needed to build a stronger car audio distribution business.
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

      <section className="py-20 bg-background">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Distributor FAQ</h2>
            <p className="section-subtitle mx-auto">
              Quick answers before you apply for TEYES wholesale cooperation.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Ready to Build Your TEYES Head Unit and Car Stereo Line?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Share your market, channel, and target product range. We will help you review the best wholesale starting plan.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact?intent=wholesale">
              Apply for Wholesale Pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsDistributorsPage;