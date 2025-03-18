
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
import ProjectCalculator from "./pages/ProjectCalculator";
import SendQuote from "./pages/SendQuote";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";
import SolarDashboard from "./pages/SolarDashboard";
import HVACDashboard from "./pages/HVACDashboard";
import RemodelingDashboard from "./pages/RemodelingDashboard";
import KPITracker from "./pages/KPITracker";
import Settings from "./pages/Settings";
import Account from "./pages/Account";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <UserProvider>
          <Toaster />
          <Sonner position="top-right" closeButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/project-calculator" element={<ProjectCalculator />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/send" element={<SendQuote />} />
            <Route path="/solar-dashboard" element={<SolarDashboard />} />
            <Route path="/hvac-dashboard" element={<HVACDashboard />} />
            <Route path="/remodeling-dashboard" element={<RemodelingDashboard />} />
            <Route path="/kpi-tracker" element={<KPITracker />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
