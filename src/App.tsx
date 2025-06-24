import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import InvestmentPage from "./pages/InvestmentPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import AboutUsPage from "./pages/AboutUsPage";
import AuthPage from "./pages/AuthPage"; // Renamed from LoginPage
import MyPropertiesPage from "./pages/MyPropertiesPage"; // Import MyPropertiesPage
import IndexPage from "./pages/IndexPage"; // Import the new IndexPage
import ForSellersPage from "./pages/ForSellersPage"; // Import the new ForSellersPage
import { PropertiesProvider } from "./hooks/use-properties";
import { AuthProvider } from "./hooks/use-auth"; // Import AuthProvider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider> {/* Wrap with AuthProvider */}
        <PropertiesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/:id" element={<PropertyDetailsPage />} />
              <Route path="/invest/:id" element={<InvestmentPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/auth" element={<AuthPage />} /> {/* Updated route path */}
              <Route path="/my-properties" element={<MyPropertiesPage />} /> {/* New route for My Properties */}
              <Route path="/index" element={<IndexPage />} /> {/* New route for Index Page */}
              <Route path="/for-sellers" element={<ForSellersPage />} /> {/* New route for For Sellers Page */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PropertiesProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;