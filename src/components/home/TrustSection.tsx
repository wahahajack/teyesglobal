import { Globe, Users, CheckCircle, Shield } from "lucide-react";

const trustItems = [
  { icon: Globe, value: "100+", label: "Markets Reached" },
  { icon: Users, value: "Global", label: "User Base" },
  { icon: CheckCircle, value: "QC", label: "Before Shipment" },
  { icon: Shield, value: "Channel", label: "Friendly Pricing" },
];

export function TrustSection() {
  return (
    <section className="py-20 bg-card border-y border-border/50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="text-primary font-medium mb-2 block">Why Choose TEYES</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold">
            Trusted by Industry Partners Worldwide
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
              <div className="stat-value text-4xl font-display font-bold">
                {item.value}
              </div>
              <p className="stat-label text-xs mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}