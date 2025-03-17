
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";
import { Sun, Calculator, FileText, BarChart3, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const SolarDashboard = () => {
  const { user, clearUserNiche } = useUser();
  const navigate = useNavigate();

  const handleChangeIndustry = () => {
    clearUserNiche();
    navigate("/dashboard");
    toast.success("Industry preference cleared. You can select a new industry.");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-16 md:ml-64 p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
                <Sun className="mr-2 h-8 w-8 text-yellow-500" />
                Solar Dashboard
              </h1>
              <p className="text-muted-foreground">
                Specialized tools and calculators for solar installation professionals
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 w-full md:w-auto flex items-center"
              onClick={handleChangeIndustry}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Change Industry
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full cursor-pointer hover:shadow-md border-primary/20 hover:border-primary/50 transition-all"
                    onClick={() => navigate("/calculator")}>
                <CardHeader className="pb-2">
                  <Calculator className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Solar ROI Calculator</CardTitle>
                  <CardDescription>
                    Calculate ROI for solar panel installations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Analyze financial returns from solar installations including tax credits, 
                    energy savings, and payback periods.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">
                    Calculate Solar ROI
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full cursor-pointer hover:shadow-md border-primary/20 hover:border-primary/50 transition-all"
                    onClick={() => navigate("/quote")}>
                <CardHeader className="pb-2">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Solar Quote Estimator</CardTitle>
                  <CardDescription>
                    Generate detailed solar installation quotes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create comprehensive quotes for solar panel installations 
                    based on system size, roof type, and customer requirements.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">
                    Generate Solar Quote
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Solar Performance Analytics</CardTitle>
              <CardDescription>
                Track and analyze solar installation metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Analytics Dashboard Coming Soon</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Our solar analytics dashboard is under development. Soon you'll be able 
                  to track system performance, energy production, and ROI in real-time.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SolarDashboard;
