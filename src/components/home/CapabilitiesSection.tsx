import { Cpu, Wrench, Boxes, Headphones } from "lucide-react";

const capabilities = [
  {
    icon: Cpu,
    title: "Android Head Unit Platform",
    description:
      "TEYES Android infotainment hardware includes display, audio, camera, connectivity and vehicle integration features.",
  },
  {
    icon: Boxes,
    title: "Product Selection for Wholesale",
    description:
      "Compare models from entry-level to flagship and discuss accessories or trial orders for your market.",
  },
  {
    icon: Wrench,
    title: "Vehicle and Market Fit",
    description:
      "Discuss language options, accessories and vehicle-fitment requirements for your market.",
  },
  {
    icon: Headphones,
    title: "Distributor Support",
    description:
      "Use product comparison materials, technical information and accessory guidance when planning cooperation.",
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
            How TEYES Can Support Your Project
          </h2>
          <p className="section-subtitle mt-4">
            Use the product range, technical information and cooperation paths below to plan a
            TEYES car audio project.
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
