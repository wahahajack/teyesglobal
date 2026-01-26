import { Cpu, Wrench, Boxes, Headphones } from "lucide-react";

const capabilities = [
  {
    icon: Cpu,
    title: "Hardware + Software Integration",
    description:
      "Complete infotainment platforms combining cutting-edge hardware with optimized software ecosystems.",
  },
  {
    icon: Boxes,
    title: "Scalable Manufacturing",
    description:
      "From prototype to mass production, our facilities support orders of any scale with consistent quality.",
  },
  {
    icon: Wrench,
    title: "Market-Ready Platforms",
    description:
      "Pre-validated product platforms that reduce time-to-market and minimize development risk.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Technical and commercial support throughout the product lifecycle, from planning to after-sales.",
  },
];

export function CapabilitiesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative">
        <div className="max-w-3xl mb-16">
          <p className="text-primary font-medium mb-2">Core Capabilities</p>
          <h2 className="section-title">
            What Makes TEYES a Long-term Partner
          </h2>
          <p className="section-subtitle mt-4">
            We don't just sell products — we provide complete infotainment solutions 
            that help your business grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, index) => (
            <div
              key={cap.title}
              className="card-interactive p-8 rounded-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                <cap.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{cap.title}</h3>
              <p className="text-muted-foreground">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
