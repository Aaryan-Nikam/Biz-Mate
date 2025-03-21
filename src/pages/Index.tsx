import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import NicheSelection from "@/components/NicheSelection";
import RoleSelection from "@/components/RoleSelection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, FileText, Sun, Wind, HomeIcon } from "lucide-react";
const Index = () => {
  const {
    user,
    isAuthenticated,
    setUserRole,
    setUserNiche
  } = useUser();
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
    setUserNiche(niche);
    navigate("/login");
  };
  const navigateToFeature = (path: string) => {
    navigate(path);
  };
  return <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        {/* Hero Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="text-center my-12 md:my-16 flex-1 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Biz-Mate</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Generate detailed ROI quotes and estimates for home improvements and service businesses
          </p>

          {!user?.role ? <div className="w-full max-w-5xl">
              <h2 className="text-2xl font-semibold mb-8">I am a...</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div whileHover={{
              scale: 1.02
            }} className="bg-card border rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
                  <div className="mb-6 p-4 bg-primary/10 rounded-full">
                    <Calculator className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Homeowner</h3>
                  <p className="text-muted-foreground mb-6">
                    Get instant quotes and calculate ROI for your home improvement projects
                  </p>
                  <Button size="lg" className="mt-auto" onClick={() => handleRoleSelect("homeowner")}>
                    Continue as Homeowner <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{
              scale: 1.02
            }} className="bg-card border rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
                  <div className="mb-6 p-4 bg-primary/10 rounded-full">
                    <FileText className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Service Provider</h3>
                  <p className="text-muted-foreground mb-6">
                    Generate professional quotes and calculate business ROI for your clients
                  </p>
                  <Button size="lg" className="mt-auto" onClick={() => handleRoleSelect("provider")}>
                    Continue as Provider <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div> : <div className="w-full max-w-5xl">
              <h2 className="text-2xl font-semibold mb-8">Select your industry</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div whileHover={{
              scale: 1.03
            }} transition={{
              duration: 0.2
            }}>
                  <Button onClick={() => handleNicheSelect("solar")} variant="outline" className="h-48 w-full flex flex-col gap-4 p-6 hover:border-yellow-500/30 hover:bg-yellow-500/5">
                    <Sun className="h-12 w-12 text-yellow-500" />
                    <div className="flex flex-col items-center">
                      <h3 className="text-lg font-bold">Solar</h3>
                      <p className="text-sm text-muted-foreground mt-2 text-center px-2">
                        Solar panel installation and efficiency calculation
                      </p>
                    </div>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{
              scale: 1.03
            }} transition={{
              duration: 0.2
            }}>
                  <Button onClick={() => handleNicheSelect("hvac")} variant="outline" className="h-48 w-full flex flex-col gap-4 p-6 hover:border-blue-500/30 hover:bg-blue-500/5">
                    <Wind className="h-12 w-12 text-blue-500" />
                    <div className="flex flex-col items-center">
                      <h3 className="text-lg font-bold">HVAC</h3>
                      <p className="text-sm text-muted-foreground mt-2 text-center px-2">
                        Heating, ventilation, and cooling systems
                      </p>
                    </div>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{
              scale: 1.03
            }} transition={{
              duration: 0.2
            }}>
                  <Button onClick={() => handleNicheSelect("remodeling")} variant="outline" className="h-48 w-full flex flex-col gap-4 p-6 hover:border-green-500/30 hover:bg-green-500/5">
                    <HomeIcon className="h-12 w-12 text-green-500" />
                    <div className="flex flex-col items-center">
                      <h3 className="text-lg font-bold">Remodeling</h3>
                      <p className="text-sm text-muted-foreground mt-2 text-center px-2">
                        Home renovation and remodeling projects
                      </p>
                    </div>
                  </Button>
                </motion.div>
              </div>
            </div>}

          {/* App Features */}
          <div className="w-full max-w-5xl mt-16">
            <h2 className="text-2xl font-semibold mb-8">App Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div whileHover={{
              scale: 1.02
            }} className="bg-primary/5 border border-primary/10 rounded-xl p-8 cursor-pointer" onClick={() => navigateToFeature("/calculator")}>
                <Calculator className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">ROI Calculator</h3>
                <p className="text-muted-foreground">
                  Calculate return on investment for projects with detailed analysis and visualizations.
                </p>
              </motion.div>
              
              <motion.div whileHover={{
              scale: 1.02
            }} className="bg-primary/5 border border-primary/10 rounded-xl p-8 cursor-pointer" onClick={() => navigateToFeature("/quote")}>
                <FileText className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instant Quote Estimator</h3>
                <p className="text-muted-foreground">
                  Generate professional quotes to send to clients or estimate project costs.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Login link */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Already have an account?</p>
            <Button variant="outline" size="lg" onClick={() => navigate("/login")}>
              Log in to your account
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2023 ROI Mate. All rights reserved.</p>
        </div>
      </footer>
    </div>;
};
export default Index;