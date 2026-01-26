import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cable, Camera, Mic, Radio, Usb, Wifi } from "lucide-react";

const accessoryCategories = [
  {
    id: "harnesses",
    title: "Wiring Harnesses",
    description: "Vehicle-specific plug-and-play harnesses for clean installation",
    icon: Cable,
    items: [
      { name: "Toyota/Lexus Harness", compat: "CC4 Pro, CC3 2K" },
      { name: "Honda Harness", compat: "All TEYES units" },
      { name: "VW/Audi Harness", compat: "CC4 Pro, CC3 2K" },
      { name: "Hyundai/Kia Harness", compat: "All TEYES units" },
    ],
  },
  {
    id: "cameras",
    title: "Camera Systems",
    description: "Backup cameras, 360° systems, and dash cameras",
    icon: Camera,
    items: [
      { name: "HD Backup Camera", compat: "Universal" },
      { name: "360° Camera Kit", compat: "CC4 Pro, CC3 2K" },
      { name: "Front Dash Camera", compat: "All TEYES units" },
      { name: "Dual Channel DVR", compat: "CC4 Pro" },
    ],
  },
  {
    id: "audio",
    title: "Audio Accessories",
    description: "Microphones, amplifiers, and audio interface adapters",
    icon: Mic,
    items: [
      { name: "External Microphone", compat: "Universal" },
      { name: "DSP Amplifier", compat: "All TEYES units" },
      { name: "Fiber Optic Adapter", compat: "For premium audio" },
      { name: "Subwoofer Cable Kit", compat: "Universal" },
    ],
  },
  {
    id: "connectivity",
    title: "Connectivity",
    description: "Antennas, adapters, and connectivity modules",
    icon: Wifi,
    items: [
      { name: "GPS Antenna", compat: "Universal" },
      { name: "4G LTE Module", compat: "CC4 Pro, CC3 2K" },
      { name: "CarPlay Dongle", compat: "All Android units" },
      { name: "DAB+ Antenna", compat: "For European market" },
    ],
  },
  {
    id: "interface",
    title: "Vehicle Interfaces",
    description: "Steering wheel controls, CAN bus adapters, and OBD interfaces",
    icon: Radio,
    items: [
      { name: "SWC Adapter", compat: "Vehicle-specific" },
      { name: "CAN Bus Decoder", compat: "All TEYES units" },
      { name: "OBD2 Interface", compat: "For vehicle data" },
      { name: "Amp Retention Cable", compat: "Factory amp vehicles" },
    ],
  },
  {
    id: "installation",
    title: "Installation Kits",
    description: "Trim kits, mounting brackets, and installation hardware",
    icon: Usb,
    items: [
      { name: "Dash Trim Kit", compat: "Vehicle-specific" },
      { name: "Mounting Brackets", compat: "Universal" },
      { name: "Installation Tool Kit", compat: "All installations" },
      { name: "Extension Cables", compat: "Universal" },
    ],
  },
];

const AccessoriesPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-card to-background">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-primary font-medium mb-2">Accessories</p>
            <h1 className="section-title text-4xl md:text-5xl mb-6">
              Complete Your Installation
            </h1>
            <p className="section-subtitle">
              Wiring harnesses, cameras, audio accessories, and more — 
              everything you need for a professional installation.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessoryCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl bg-card border border-border/50 overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 bg-gradient-to-br from-secondary/50 to-card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{category.title}</h2>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li key={item.name} className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.compat}</span>
                      </li>
                    ))}
                  </ul>
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
            Need Help Finding the Right Accessories?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact us with your vehicle and unit details — we'll recommend 
            the complete accessory package for your installation.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Get Recommendations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default AccessoriesPage;
