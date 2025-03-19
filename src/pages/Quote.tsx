
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import InstantQuoteEstimator from "@/components/InstantQuoteEstimator";
import QuoteChart from "@/components/QuoteChart";
import { Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NicheSelectionPopup from "@/components/quote/NicheSelectionPopup";
import { NicheType } from "@/components/NicheSelection";

const Quote = () => {
  const { user, setUserNiche } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [nichePopupOpen, setNichePopupOpen] = useState(false);

  // Check if niche is set
  useEffect(() => {
    if (!user?.niche) {
      setNichePopupOpen(true);
    }
  }, [user]);

  // Handle niche selection
  const handleNicheSelect = (niche: NicheType) => {
    setUserNiche(niche);
  };

  // Updated to accept data parameter
  const handleQuoteComplete = (data: any) => {
    setFormData(data);
    setActiveStep(2);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      {/* Niche Selection Popup */}
      <NicheSelectionPopup 
        open={nichePopupOpen} 
        onOpenChange={setNichePopupOpen} 
        onSelectNiche={handleNicheSelect}
      />
      
      <div className="flex-1 ml-16 md:ml-64 p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {user?.role === "homeowner" ? "Quote Requests" : "Quote Estimator"}
            </h1>
            <p className="text-muted-foreground">
              {user?.role === "homeowner" 
                ? "Request detailed quotes from trusted professionals" 
                : "Generate accurate quotes for your projects in seconds"}
            </p>
          </header>

          <Tabs defaultValue="quote" className="mb-8">
            <TabsList>
              <TabsTrigger value="quote">
                {user?.role === "homeowner" ? "Request Quote" : "Create Quote"}
              </TabsTrigger>
              <TabsTrigger value="history">Quote History</TabsTrigger>
            </TabsList>
            <TabsContent value="quote">
              <InstantQuoteEstimator 
                niche={user?.niche} 
                onComplete={handleQuoteComplete} 
              />
            </TabsContent>
            <TabsContent value="history">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Quote History</h3>
                <p className="text-muted-foreground">Your sent quotes will appear here.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Quote;
