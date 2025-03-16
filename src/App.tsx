
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Calculator from "./pages/Calculator";
import SendQuote from "./pages/SendQuote";
import NotFound from "./pages/NotFound";
import SolarDashboard from "./pages/SolarDashboard";
import HVACDashboard from "./pages/HVACDashboard";
import RemodelingDashboard from "./pages/RemodelingDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <UserProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/send" element={<SendQuote />} />
            <Route path="/solar-dashboard" element={<SolarDashboard />} />
            <Route path="/hvac-dashboard" element={<HVACDashboard />} />
            <Route path="/remodeling-dashboard" element={<RemodelingDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
