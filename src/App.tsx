import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductsPage from "./pages/Products";
import SolutionsPage from "./pages/Solutions";
import OemOdmPage from "./pages/OemOdm";
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
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/*" element={<ProductsPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/*" element={<SolutionsPage />} />
          <Route path="/oem-odm" element={<OemOdmPage />} />
          <Route path="/oem-odm/*" element={<OemOdmPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/landing/*" element={<NotFound />} />
          <Route path="/accessories" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
