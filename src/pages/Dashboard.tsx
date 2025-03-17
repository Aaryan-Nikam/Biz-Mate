
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { BarChart3, Calculator, Mail, ArrowRight, Sun, Wind, HomeIcon } from "lucide-react";
import { NicheType } from "@/components/NicheSelection";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, isAuthenticated, setUserNiche } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user?.niche) {
      // Redirect to niche-specific dashboard
      switch (user.niche) {
        case "solar":
          navigate("/solar-dashboard");
          break;
        case "hvac":
          navigate("/hvac-dashboard");
          break;
        case "remodeling":
          navigate("/remodeling-dashboard");
          break;
      }
    }
  }, [isAuthenticated, navigate, user]);

  if (!user) return null;

  const getNicheIcon = (niche?: NicheType) => {
    switch (niche) {
      case "solar":
        return <Sun className="h-12 w-12 text-yellow-500" />;
      case "hvac":
        return <Wind className="h-12 w-12 text-blue-500" />;
      case "remodeling":
        return <HomeIcon className="h-12 w-12 text-green-500" />;
      default:
        return <Calculator className="h-12 w-12 text-blue-500" />;
    }
  };

  const handleNicheSelect = (niche: NicheType) => {
    setUserNiche(niche);
    
    switch (niche) {
      case "solar":
        navigate("/solar-dashboard");
        break;
      case "hvac":
        navigate("/hvac-dashboard");
        break;
      case "remodeling":
        navigate("/remodeling-dashboard");
        break;
    }
  };

  // This is the generic dashboard for users who haven't selected a niche yet
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
            <h1 className="heading-1 mb-2">Welcome to Your Dashboard</h1>
            <p className="subheading">
              Please select an industry to continue
            </p>
          </header>

          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Choose Your Industry</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                    <Button 
                      onClick={() => handleNicheSelect("solar")}
                      variant="outline" 
                      className="h-48 w-full flex flex-col gap-4 p-6 hover:border-yellow-500/30 hover:bg-yellow-500/5"
                    >
                      <Sun className="h-12 w-12 text-yellow-500" />
                      <div>
                        <h3 className="text-lg font-bold">Solar</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          Solar panel installation and efficiency calculations
                        </p>
                      </div>
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                    <Button 
                      onClick={() => handleNicheSelect("hvac")}
                      variant="outline" 
                      className="h-48 w-full flex flex-col gap-4 p-6 hover:border-blue-500/30 hover:bg-blue-500/5"
                    >
                      <Wind className="h-12 w-12 text-blue-500" />
                      <div>
                        <h3 className="text-lg font-bold">HVAC</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          Heating, ventilation, and cooling systems
                        </p>
                      </div>
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                    <Button 
                      onClick={() => handleNicheSelect("remodeling")}
                      variant="outline" 
                      className="h-48 w-full flex flex-col gap-4 p-6 hover:border-green-500/30 hover:bg-green-500/5"
                    >
                      <HomeIcon className="h-12 w-12 text-green-500" />
                      <div>
                        <h3 className="text-lg font-bold">Remodeling</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          Home renovation and remodeling projects
                        </p>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>App Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-primary/5 border-primary/10">
                    <CardHeader>
                      <Calculator className="h-6 w-6 text-primary mb-2" />
                      <CardTitle className="text-lg">ROI Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Calculate return on investment for projects with detailed analysis and visualizations.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary/5 border-primary/10">
                    <CardHeader>
                      <Mail className="h-6 w-6 text-primary mb-2" />
                      <CardTitle className="text-lg">Instant Quote Estimator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Generate professional quotes to send to clients or estimate project costs.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
