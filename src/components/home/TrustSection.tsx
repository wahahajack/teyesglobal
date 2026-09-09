import { Monitor, Speaker, Cable, Handshake } from "lucide-react";

const trustItems = [
  { icon: Monitor, label: "Head units", description: "Compare TEYES models" },
  { icon: Speaker, label: "Car audio", description: "Speakers, amplifiers and subwoofers" },
  { icon: Cable, label: "Accessories", description: "Check compatible options" },
  { icon: Handshake, label: "Cooperation", description: "Discuss distribution and customization" },
];

export function TrustSection() {
  return (
    <section className="py-20 bg-card border-y border-border/50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold">
            Products and cooperation
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item) => (
            <div key={item.label} className="text-center p-6 rounded-xl bg-secondary/30 border border-border/30">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-lg">{item.label}</h3>
              <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
