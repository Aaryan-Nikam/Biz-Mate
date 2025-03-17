
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserContext";
import HomeownerCalculator from "@/components/HomeownerCalculator";
import ProviderCalculator from "@/components/ProviderCalculator";
import { motion } from "framer-motion";

const Calculator = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-16 md:ml-64 p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <header className="mb-8">
            <h1 className="heading-1 mb-2">ROI Calculator</h1>
            <p className="subheading">
              {user.role === "homeowner" 
                ? "Calculate the return on investment for your home improvement projects" 
                : "Generate detailed ROI estimates for your clients"}
            </p>
          </header>

          <Card className="p-6 shadow-sm border-border/60">
            {user.role === "homeowner" ? (
              <HomeownerCalculator />
            ) : (
              <ProviderCalculator />
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Calculator;
