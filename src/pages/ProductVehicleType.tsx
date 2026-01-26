import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Truck } from "lucide-react";
import { products } from "@/data/products";

const vehicleTypes = [
  {
    id: "passenger",
    name: "Passenger Cars",
    description: "Solutions for sedans, SUVs, hatchbacks, and personal vehicles",
    icon: Car,
    image: products[0]?.image,
    products: ["cc4-pro", "cc3-2k", "x1-pro"],
  },
  {
    id: "commercial",
    name: "Commercial Vehicles",
    description: "Rugged solutions for trucks, vans, and fleet vehicles",
    icon: Truck,
    image: products[1]?.image,
    products: ["cc3-2k", "cc4", "cc4l"],
  },
];

const ProductVehicleTypePage = () => {
  return (
    <Layout>
      <ContextHeader
        title="By Vehicle Type"
        description="Find the right infotainment solution optimized for your specific vehicle type."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "By Vehicle Type" },
        ]}
      />

      {/* Vehicle Types */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {vehicleTypes.map((type) => {
              const typeProducts = type.products
                .map((id) => products.find((p) => p.id === id))
                .filter(Boolean);

              return (
                <div
                  key={type.id}
                  className="rounded-2xl bg-card border border-border/50 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-8 bg-gradient-to-br from-secondary to-card">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <type.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-display font-bold mb-2">
                          {type.name}
                        </h2>
                        <p className="text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      Recommended Products
                    </p>
                    {typeProducts.map((product) => (
                      <Link
                        key={product!.id}
                        to={`/products/${product!.id}`}
                        className="group flex items-center gap-4 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/50 transition-all"
                      >
                        <div className="w-16 h-16 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={product!.image}
                            alt={product!.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {product!.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {product!.seriesName}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Custom Vehicle Applications?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We support custom installations and OEM integrations for specialized 
            vehicle types and applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" asChild>
              <Link to="/oem-odm">
                Explore OEM Solutions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="hero-outline" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductVehicleTypePage;
