import { Link } from "react-router-dom";
import { ArrowRight, Boxes, Globe2, Handshake, Layers3 } from "lucide-react";

const portalLinks = [
  {
    title: "Compare Products",
    description: "Compare TEYES Android head units and car audio products side by side by specifications and features.",
    href: "/products/compare/",
    icon: Layers3,
  },
  {
    title: "Distributor Cooperation",
    description: "Explore distribution options, product selection and support for regional car audio businesses.",
    href: "/solutions/distributors/",
    icon: Handshake,
  },
  {
    title: "Accessories Ecosystem",
    description: "View cameras, TPMS, OBD, DAB+ and installation accessories that can be added to a TEYES product range.",
    href: "/accessories/",
    icon: Boxes,
  },
  {
    title: "Market Needs",
    description: "Compare flagship, mainstream and entry-level models by features, installation requirements and budget.",
    href: "/solutions/market-needs/",
    icon: Globe2,
  },
];

export function OfficialPortalSection() {
  return (
    <section className="py-20 bg-background border-b border-border/40">
      <div className="container-wide">
        <div className="max-w-3xl mb-10">
          <p className="text-primary font-medium mb-2">Official TEYES Global Portal</p>
          <h2 className="section-title">Find the Right TEYES Path for Your Market</h2>
          <p className="section-subtitle mt-4">
            TEYES develops Android car stereos, car audio products and accessories for distributors,
            installers, wholesalers, auto brands and OEM/ODM partners. Use the links below to
            compare products, review accessories or discuss a project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {portalLinks.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <div className="flex items-center gap-2 text-primary font-medium text-sm">
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
