
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Calculator, HomeIcon, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const RemodelingDashboard = () => {
  const { user, clearUserNiche } = useUser();
  const navigate = useNavigate();

  if (!user) return null;

  const handleBackToDashboard = () => {
    clearUserNiche();
    navigate("/dashboard");
  };

  const navigateToFeature = (path: string) => {
    navigate(path);
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
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="heading-1 mb-2 flex items-center">
                <HomeIcon className="mr-2 text-green-500" /> Remodeling Dashboard
              </h1>
              <p className="subheading">
                Monitor and manage your home remodeling projects
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleBackToDashboard}>
              <ArrowLeft className="mr-1 h-4 w-4" /> Change Industry
            </Button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">350 sq ft</CardTitle>
                <CardDescription>Average Project Size</CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">$22,500</CardTitle>
                <CardDescription>Average Project Cost</CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">65%</CardTitle>
                <CardDescription>Average ROI on Remodeling</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <Card 
                className="h-full border-2 transition-all cursor-pointer bg-primary/5 hover:border-primary/30 group-hover:shadow-md"
                onClick={() => navigateToFeature("/calculator")}
              >
                <CardHeader>
                  <Calculator className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Remodeling ROI Calculator</CardTitle>
                  <CardDescription>
                    Calculate remodeling project ROI and property value increase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Input your project details, costs, and materials to get a detailed ROI analysis with property value increase estimates.
                  </p>
                  <Button className="mt-4 w-full">Open Calculator</Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <Card 
                className="h-full border-2 transition-all cursor-pointer bg-primary/5 hover:border-primary/30 group-hover:shadow-md"
                onClick={() => navigateToFeature("/send")}
              >
                <CardHeader>
                  <HomeIcon className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>Remodeling Quote Estimator</CardTitle>
                  <CardDescription>
                    Generate detailed remodeling project quotes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create professional remodeling quotes with materials, labor, and timeline estimates. Email quotes directly to clients.
                  </p>
                  <Button className="mt-4 w-full">Create Quote</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RemodelingDashboard;
