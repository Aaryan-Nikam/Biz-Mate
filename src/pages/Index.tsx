
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import NicheSelection from "@/components/NicheSelection";
import RoleSelection from "@/components/RoleSelection";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, isAuthenticated, setUserRole } = useUser();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleRoleSelect = (role: "homeowner" | "provider") => {
    setUserRole(role);
    // Don't navigate automatically - let them pick a niche first
  };

  const handleNicheSelect = (niche: "solar" | "hvac" | "remodeling") => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ROI Mate</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate detailed ROI quotes and estimates for home improvements and service businesses
          </p>
        </motion.div>

        {!user?.role ? (
          <RoleSelection onSelectRole={handleRoleSelect} />
        ) : (
          <NicheSelection onSelectNiche={handleNicheSelect} />
        )}

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Already have an account?</p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/login")}
          >
            Log in to your account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
