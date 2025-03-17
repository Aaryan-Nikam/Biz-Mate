
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { BarChart3, Calculator, Mail, FileText, Sun, Wind, HomeIcon, ArrowLeft } from "lucide-react";
import { NicheType } from "@/components/NicheSelection";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Dashboard = () => {
  const { user, isAuthenticated, setUserNiche, clearUserNiche } = useUser();
  const navigate = useNavigate();
  const [nicheDialogOpen, setNicheDialogOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<"calculator" | "quote" | null>(null);

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

  const handleFeatureSelect = (feature: "calculator" | "quote") => {
    if (user.niche) {
      // If user already has a niche, navigate directly to the feature
      if (feature === "calculator") {
        navigate("/calculator");
      } else {
        navigate("/quote");
      }
    } else {
      // Open niche selection dialog
      setSelectedFeature(feature);
      setNicheDialogOpen(true);
    }
  };

  const handleNicheSelect = (niche: NicheType) => {
    setUserNiche(niche);
    toast.success(`${niche.charAt(0).toUpperCase() + niche.slice(1)} selected as your industry!`);
    
    // Navigate based on the previously selected feature
    if (selectedFeature === "calculator") {
      navigate("/calculator");
    } else if (selectedFeature === "quote") {
      navigate("/quote");
    } else {
      // Default navigation based on niche
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
    }
    
    setNicheDialogOpen(false);
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
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Your Dashboard</h1>
            <p className="text-muted-foreground">
              Get started with our powerful ROI calculators and instant quote estimators
            </p>
          </header>

          <div className="max-w-5xl mx-auto">
            {/* Main Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-md border-primary/20 hover:border-primary/50 transition-all"
                      onClick={() => handleFeatureSelect("calculator")}>
                  <CardHeader className="pb-2">
                    <Calculator className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-xl">ROI Calculator</CardTitle>
                    <CardDescription>Analyze ROI and gain business insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Calculate comprehensive return on investment metrics for your projects with detailed 
                      analysis, visualizations, and AI-driven insights.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full">
                      Calculate ROI
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-md border-primary/20 hover:border-primary/50 transition-all"
                      onClick={() => handleFeatureSelect("quote")}>
                  <CardHeader className="pb-2">
                    <FileText className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-xl">Instant Quote Estimator</CardTitle>
                    <CardDescription>Generate quotes in seconds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Create professional quotes instantly based on your project parameters. 
                      Customize, download, and share with clients seamlessly.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full">
                      Generate Quote
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>

            {/* Industry Selection Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Choose Your Industry</CardTitle>
                <CardDescription>
                  Select an industry to access specialized calculators and estimators
                </CardDescription>
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
                      <div className="flex flex-col items-center text-center">
                        <h3 className="text-lg font-bold">Solar</h3>
                        <p className="text-sm text-muted-foreground mt-2 px-4">
                          Solar panel installation and efficiency calculation
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
                      <div className="flex flex-col items-center text-center">
                        <h3 className="text-lg font-bold">HVAC</h3>
                        <p className="text-sm text-muted-foreground mt-2 px-4">
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
                      <div className="flex flex-col items-center text-center">
                        <h3 className="text-lg font-bold">Remodeling</h3>
                        <p className="text-sm text-muted-foreground mt-2 px-4">
                          Home renovation and remodeling projects
                        </p>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Niche Selection Dialog */}
      <Dialog open={nicheDialogOpen} onOpenChange={setNicheDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Choose Your Industry</DialogTitle>
            <DialogDescription>
              Select an industry to customize your experience with specialized tools and metrics
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
            <Button 
              onClick={() => handleNicheSelect("solar")}
              variant="outline" 
              className="h-32 flex flex-col gap-2 p-4 hover:border-yellow-500/30 hover:bg-yellow-500/5"
            >
              <Sun className="h-8 w-8 text-yellow-500" />
              <div className="text-center">
                <p className="font-medium">Solar</p>
              </div>
            </Button>
            
            <Button 
              onClick={() => handleNicheSelect("hvac")}
              variant="outline" 
              className="h-32 flex flex-col gap-2 p-4 hover:border-blue-500/30 hover:bg-blue-500/5"
            >
              <Wind className="h-8 w-8 text-blue-500" />
              <div className="text-center">
                <p className="font-medium">HVAC</p>
              </div>
            </Button>
            
            <Button 
              onClick={() => handleNicheSelect("remodeling")}
              variant="outline" 
              className="h-32 flex flex-col gap-2 p-4 hover:border-green-500/30 hover:bg-green-500/5"
            >
              <HomeIcon className="h-8 w-8 text-green-500" />
              <div className="text-center">
                <p className="font-medium">Remodeling</p>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
