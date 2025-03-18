
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import InstantQuoteEstimator from "@/components/InstantQuoteEstimator";
import { Button } from "@/components/ui/button";
import { Download, Send, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import QuoteChart from "@/components/QuoteChart";
import { toast } from "sonner";

const Quote = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("estimator");
  const [quoteData, setQuoteData] = useState({
    totalCost: 10000,
    monthlyCost: 200,
    annualSavings: 2000,
    monthlySavings: 167,
    paybackPeriod: 5,
    roi: 15,
  });

  // If not logged in, redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleQuoteComplete = (data: any) => {
    // In a real implementation, we would use the actual data from the estimator
    // For now, we'll just use our default state
    setActiveTab("results");
  };

  const handleDownload = () => {
    toast.success("Downloading quote as PDF...");
    // In a real implementation, this would generate a PDF
  };

  // Sample data for charts
  const costBreakdownData = [
    { category: "Materials", value: quoteData.totalCost * 0.4 },
    { category: "Labor", value: quoteData.totalCost * 0.35 },
    { category: "Overhead", value: quoteData.totalCost * 0.15 },
    { category: "Profit", value: quoteData.totalCost * 0.1 },
  ];

  const roiProjectionData = Array.from({ length: 10 }, (_, i) => ({
    year: i + 1,
    savings: quoteData.annualSavings * (i + 1),
    investment: i === 0 ? quoteData.totalCost : 0,
  }));

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
                      <p className="text-3xl font-bold">${quoteData.totalCost.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">or ${quoteData.monthlyCost}/month</p>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
                      <p className="text-sm text-muted-foreground">Annual Savings</p>
                      <p className="text-3xl font-bold">${quoteData.annualSavings.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">${quoteData.monthlySavings}/month</p>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
                      <p className="text-sm text-muted-foreground">Payback Period</p>
                      <p className="text-3xl font-bold">{quoteData.paybackPeriod} years</p>
                      <p className="text-xs text-muted-foreground">ROI: {quoteData.roi}%</p>
                    </div>
                  </div>

                  {/* New chart sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <QuoteChart
                      type="bar"
                      title="Cost Breakdown"
                      data={costBreakdownData}
                      xKey="category"
                      yKeys={[
                        { key: "value", name: "Amount ($)", color: "#0ea5e9" }
                      ]}
                    />
                    
                    <QuoteChart
                      type="area"
                      title="ROI Projection"
                      data={roiProjectionData}
                      xKey="year"
                      yKeys={[
                        { key: "savings", name: "Cumulative Savings", color: "#10b981" },
                        { key: "investment", name: "Investment", color: "#f43f5e" }
                      ]}
                    />
                  </div>
                  
                  {/* AI Insights section */}
                  <div className="bg-muted/50 rounded-lg p-4 mt-4">
                    <div className="flex items-center mb-3">
                      <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="text-md font-semibold">AI Insights</h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">1</Badge>
                        <p className="text-sm">Reducing overhead costs by 10% could improve your ROI by approximately 3%.</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">2</Badge>
                        <p className="text-sm">Based on current energy prices, your estimated annual savings could increase by 5-7% over the next 3 years.</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">3</Badge>
                        <p className="text-sm">Consider financing options to reduce upfront costs while maintaining positive cash flow from day one.</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-4">
                    <Button variant="outline" onClick={handleDownload}>
                      <Download className="mr-2 h-4 w-4" /> Download Quote
                    </Button>
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
