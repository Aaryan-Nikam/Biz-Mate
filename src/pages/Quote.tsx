
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import InstantQuoteEstimator from "@/components/InstantQuoteEstimator";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Quote = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("estimator");

  // If not logged in, redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleQuoteComplete = () => {
    setActiveTab("results");
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
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Quote Estimator</h1>
            <p className="text-muted-foreground">
              Generate instant quotes based on your project specifications
            </p>
          </header>

          <Tabs defaultValue="estimator" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="estimator">Quote Estimator</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="estimator" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Instant Quote Estimator</CardTitle>
                  <CardDescription>
                    Enter your project details to get an instant quote estimate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InstantQuoteEstimator 
                    niche={user.niche} 
                    onComplete={handleQuoteComplete} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="results" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quote Results</CardTitle>
                  <CardDescription>
                    Your estimated quote results and analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                      <p className="text-3xl font-bold">$10,000</p>
                      <p className="text-xs text-muted-foreground">or $200/month</p>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
                      <p className="text-sm text-muted-foreground">Annual Savings</p>
                      <p className="text-3xl font-bold">$2,000</p>
                      <p className="text-xs text-muted-foreground">$167/month</p>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
                      <p className="text-sm text-muted-foreground">Payback Period</p>
                      <p className="text-3xl font-bold">5 years</p>
                      <p className="text-xs text-muted-foreground">ROI: 15%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => navigate("/send-quote")}>
                      <Send className="mr-2 h-4 w-4" /> Send Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Quote;
