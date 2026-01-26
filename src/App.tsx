import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductsPage from "./pages/Products";
import ProductLinesPage from "./pages/ProductLines";
import ProductDetailPage from "./pages/ProductDetail";
import ProductComparePage from "./pages/ProductCompare";
import ProductVehicleTypePage from "./pages/ProductVehicleType";
import SolutionsPage from "./pages/Solutions";
import SolutionsDistributorsPage from "./pages/SolutionsDistributors";
import SolutionsAutoBrandsPage from "./pages/SolutionsAutoBrands";
import SolutionsIntegratorsPage from "./pages/SolutionsIntegrators";
import SolutionsMarketNeedsPage from "./pages/SolutionsMarketNeeds";
import OemOdmPage from "./pages/OemOdm";
import OemCapabilitiesPage from "./pages/OemCapabilities";
import OemCertificationsPage from "./pages/OemCertifications";
import OemCasesPage from "./pages/OemCases";
import LandingOemPage from "./pages/LandingOem";
import LandingMarketEntryPage from "./pages/LandingMarketEntry";
import LandingDistributorPage from "./pages/LandingDistributor";
import AccessoriesPage from "./pages/Accessories";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Products */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/lines" element={<ProductLinesPage />} />
          <Route path="/products/vehicle-type" element={<ProductVehicleTypePage />} />
          <Route path="/products/compare" element={<ProductComparePage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          {/* Solutions */}
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/distributors" element={<SolutionsDistributorsPage />} />
          <Route path="/solutions/auto-brands" element={<SolutionsAutoBrandsPage />} />
          <Route path="/solutions/integrators" element={<SolutionsIntegratorsPage />} />
          <Route path="/solutions/market-needs" element={<SolutionsMarketNeedsPage />} />
          {/* OEM/ODM */}
          <Route path="/oem-odm" element={<OemOdmPage />} />
          <Route path="/oem-odm/capabilities" element={<OemCapabilitiesPage />} />
          <Route path="/oem-odm/certifications" element={<OemCertificationsPage />} />
          <Route path="/oem-odm/cases" element={<OemCasesPage />} />
          {/* Landing Pages */}
          <Route path="/landing/oem" element={<LandingOemPage />} />
          <Route path="/landing/market-entry" element={<LandingMarketEntryPage />} />
          <Route path="/landing/distributor" element={<LandingDistributorPage />} />
          {/* Accessories */}
          <Route path="/accessories" element={<AccessoriesPage />} />
          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
