import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const compareSpecs = [
  "CPU",
  "RAM + ROM",
  "Screen Resolution",
  "Touch Haptic",
  "Audio Channel",
  "Sound Effect",
  "Camera Channels",
  "360° SVM",
  "Navigation",
  "Accuracy",
  "OS",
  "WIFI",
  "Bluetooth",
  "Apple CarPlay",
  "Android Auto",
];

const ProductComparePage = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    "cc4-pro",
    "cc3-2k",
    "x1-pro",
  ]);

  const comparedProducts = selectedProducts
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const getSpecValue = (product: typeof products[0], specLabel: string) => {
    const spec = product.specs.find((s) => s.label === specLabel);
    return spec?.value || "-";
  };

  const renderValue = (value: string) => {
    if (value === "Yes") return <Check className="h-5 w-5 text-success mx-auto" />;
    if (value === "No") return <X className="h-5 w-5 text-muted-foreground mx-auto" />;
    return value;
  };

  return (
    <Layout>
      <ContextHeader
        title="Compare Models"
        description="Compare specifications side-by-side to find the best product for your market."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Compare" },
        ]}
      />

      {/* Comparison Table */}
      <section className="py-16 bg-background">
        <div className="container-wide">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              {/* Product Headers */}
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-border/50 w-48">
                    <span className="text-muted-foreground font-normal">Specification</span>
                  </th>
                  {comparedProducts.map((product) => (
                    <th key={product!.id} className="p-4 border-b border-border/50">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-32 h-32 rounded-xl bg-secondary/50 flex items-center justify-center overflow-hidden">
                          <img
                            src={product!.image}
                            alt={product!.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-primary text-sm font-medium">
                            {product!.seriesName}
                          </p>
                          <h3 className="text-lg font-semibold">{product!.name}</h3>
                        </div>
                        <Button variant="hero-outline" size="sm" asChild>
                          <Link to={`/products/${product!.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Specs Body */}
              <tbody>
                {compareSpecs.map((spec, index) => (
                  <tr
                    key={spec}
                    className={index % 2 === 0 ? "bg-card/50" : ""}
                  >
                    <td className="p-4 border-b border-border/30 font-medium">
                      {spec}
                    </td>
                    {comparedProducts.map((product) => (
                      <td
                        key={product!.id}
                        className="p-4 border-b border-border/30 text-center"
                      >
                        {renderValue(getSpecValue(product!, spec))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-card">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Ready to Make a Decision?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact our team to discuss pricing, volume discounts, and 
            partnership opportunities.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ProductComparePage;
