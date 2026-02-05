import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Critical path - load immediately
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load non-critical pages for better mobile performance
const ProductsPage = lazy(() => import("./pages/Products"));
const ProductLinesPage = lazy(() => import("./pages/ProductLines"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetail"));
const ProductComparePage = lazy(() => import("./pages/ProductCompare"));
const SolutionsPage = lazy(() => import("./pages/Solutions"));
const SolutionsDistributorsPage = lazy(() => import("./pages/SolutionsDistributors"));
const SolutionsAutoBrandsPage = lazy(() => import("./pages/SolutionsAutoBrands"));
const SolutionsIntegratorsPage = lazy(() => import("./pages/SolutionsIntegrators"));
const SolutionsMarketNeedsPage = lazy(() => import("./pages/SolutionsMarketNeeds"));
const OemOdmPage = lazy(() => import("./pages/OemOdm"));
const OemCapabilitiesPage = lazy(() => import("./pages/OemCapabilities"));
const OemCertificationsPage = lazy(() => import("./pages/OemCertifications"));
const OemCasesPage = lazy(() => import("./pages/OemCases"));
const LandingOemPage = lazy(() => import("./pages/LandingOem"));
const LandingMarketEntryPage = lazy(() => import("./pages/LandingMarketEntry"));
const LandingDistributorPage = lazy(() => import("./pages/LandingDistributor"));
const AccessoriesPage = lazy(() => import("./pages/Accessories"));
const ContactPage = lazy(() => import("./pages/Contact"));
const HomeThankYou = lazy(() => import("./pages/HomeThankYou"));

// Minimal loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="space-y-4 w-full max-w-md px-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Products */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/lines" element={<ProductLinesPage />} />
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
            <Route path="/thank-you" element={<HomeThankYou />} />
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
