import { Link } from "react-router-dom";
import { ArrowRight, Building2, Car, Settings } from "lucide-react";

const partners = [
  {
    icon: Building2,
    title: "Distributors & Wholesalers",
    description: "Access a proven Android car stereo portfolio with competitive margins and reliable supply.",
    href: "/solutions/distributors/",
  },
  {
    icon: Car,
    title: "Private Label & Auto Brands",
    description: "White-label and co-branded infotainment solutions tailored to your market strategy.",
    href: "/solutions/auto-brands/",
  },
  {
    icon: Settings,
    title: "Installers & System Integrators",
    description: "Flexible product platforms, accessories, and integration support for professional channels.",
    href: "/solutions/integrators/",
  },
];

export function PartnersSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-medium mb-2">Partnership Models</p>
          <h2 className="section-title">Who We Work With</h2>
          <p className="section-subtitle mt-4 mx-auto">
            We support different business models and partnership structures
            to match your market strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <Link
              key={partner.title}
              to={partner.href}
              className="group p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <partner.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {partner.title}
              </h3>
              <p className="text-muted-foreground mb-4">{partner.description}</p>
              <div className="flex items-center gap-2 text-primary font-medium text-sm">
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
