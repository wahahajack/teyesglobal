import { Cpu, Wrench, Boxes, Headphones } from "lucide-react";

const capabilities = [
  {
    icon: Cpu,
    title: "Android Head Unit Platform",
    description:
      "TEYES combines Android infotainment hardware, UI, audio, camera, connectivity, and vehicle integration into market-ready product platforms.",
  },
  {
    icon: Boxes,
    title: "Wholesale Product Planning",
    description:
      "Build a product ladder from entry-level to flagship models, with accessories and trial-order planning for your market.",
  },
  {
    icon: Wrench,
    title: "Localization & Vehicle Adaptation",
    description:
      "Support for different market needs, languages, accessories, vehicle-fitment scenarios, and regional selling strategies.",
  },
  {
    icon: Headphones,
    title: "Distributor & After-sales Support",
    description:
      "Product comparison materials, technical support, accessory guidance, and cooperation support for long-term channel development.",
  },
];

export function CapabilitiesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative">
        <div className="max-w-3xl mb-16">
          <span className="text-primary font-medium mb-2 block">Core Capabilities</span>
          <h2 className="section-title">
            What Makes TEYES a Long-term Partner
          </h2>
          <p className="section-subtitle mt-4">
            We don't just sell products — we help partners build Android car stereo and
            smart infotainment product lines for different market positions.
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
              <h3 className="text-lg font-semibold mb-3">{cap.title}</h3>
              <p className="text-muted-foreground">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
