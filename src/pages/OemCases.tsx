import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Building2, Car, Truck } from "lucide-react";

const projectCases = [
  {
    id: 1,
    title: "European Automotive Brand",
    type: "White-Label Partnership",
    icon: Car,
    region: "Europe",
    challenge: "Needed to launch a branded infotainment line within 6 months with custom UI.",
    solution: "Customized CC3 2K platform with complete rebranding and European market adaptations.",
    results: [
      "6-month time to market",
      "50,000+ units in first year",
      "Expanded to 3 product variants",
    ],
  },
  {
    id: 2,
    title: "Middle East Distributor Network",
    type: "Regional Customization",
    icon: Globe,
    region: "Middle East",
    challenge: "Required Arabic language support and region-specific features for local market.",
    solution: "Full localization with RTL interface, regional apps, and climate-adapted hardware.",
    results: [
      "15 countries covered",
      "100% local compliance",
      "3x growth in 2 years",
    ],
  },
  {
    id: 3,
    title: "Fleet Management Company",
    type: "System Integration",
    icon: Truck,
    region: "Global",
    challenge: "Needed integrated fleet tracking with custom telematics and driver monitoring.",
    solution: "Custom firmware with fleet management APIs and integrated GPS tracking.",
    results: [
      "20,000+ vehicles equipped",
      "Real-time fleet visibility",
      "Reduced fuel costs by 15%",
    ],
  },
  {
    id: 4,
    title: "Aftermarket Retailer Chain",
    type: "Private Label",
    icon: Building2,
    region: "North America",
    challenge: "Wanted exclusive product line to differentiate from competitors.",
    solution: "Exclusive product designs with retailer branding and unique feature set.",
    results: [
      "300+ retail locations",
      "Exclusive 2-year agreement",
      "Top-selling SKU in category",
    ],
  },
];

const OemCasesPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-card to-background">
        <div className="container-wide">
          <div className="max-w-3xl">
            <Link to="/oem-odm" className="text-primary font-medium mb-2 inline-flex items-center gap-2 hover:underline">
              ← Back to OEM / ODM
            </Link>
            <h1 className="section-title text-4xl md:text-5xl mb-6 mt-4">
              Project Success Stories
            </h1>
            <p className="section-subtitle">
              Real examples of how we've helped partners achieve their goals 
              through OEM/ODM collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Project Cases */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="space-y-8">
            {projectCases.map((project, index) => (
              <div
                key={project.id}
                className="rounded-2xl bg-card border border-border/50 overflow-hidden"
              >
                <div className="grid lg:grid-cols-3 gap-8 p-8">
                  {/* Project Info */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <project.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          Case #{project.id}
                        </span>
                        <span className="block text-sm text-primary font-medium">
                          {project.type}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">Region: {project.region}</p>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="lg:col-span-1 space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Challenge
                      </h4>
                      <p className="text-foreground">{project.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Solution
                      </h4>
                      <p className="text-foreground">{project.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="lg:col-span-1">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Results
                    </h4>
                    <ul className="space-y-3">
                      {project.results.map((result) => (
                        <li key={result} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          <span className="font-medium">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Your Project Could Be Next
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss how we can help you achieve similar results.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default OemCasesPage;
