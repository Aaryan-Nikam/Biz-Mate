import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import InstantQuoteEstimator from "@/components/InstantQuoteEstimator";

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
                  <InstantQuoteEstimator onComplete={() => setActiveTab("results")} />
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
                <CardContent>
                  {/* This content will be populated by the InstantQuoteEstimator component */}
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
