
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RenterDashboard from "./pages/RenterDashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import PropertyDetails from "./pages/PropertyDetails";
import DocumentUpload from "./pages/DocumentUpload";
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
          <Route path="/renter" element={<RenterDashboard />} />
          <Route path="/landlord" element={<LandlordDashboard />} />
          <Route path="/authority" element={<AuthorityDashboard />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/landlord/document/:id" element={<DocumentUpload />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
