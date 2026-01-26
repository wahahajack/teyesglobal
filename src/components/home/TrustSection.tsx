import { Award, Globe, Shield, Clock } from "lucide-react";

const trustItems = [
  { icon: Clock, value: "15+", label: "Years in Automotive Electronics" },
  { icon: Globe, value: "100+", label: "Countries & Regions" },
  { icon: Award, value: "50+", label: "Industry Certifications" },
  { icon: Shield, value: "10M+", label: "Units Deployed Globally" },
];

export function TrustSection() {
  return (
    <section className="py-20 bg-card border-y border-border/50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Why Choose TEYES</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold">
            Trusted by Industry Leaders Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="text-center p-6 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="stat-value text-4xl">{item.value}</div>
              <div className="stat-label text-xs mt-2">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
