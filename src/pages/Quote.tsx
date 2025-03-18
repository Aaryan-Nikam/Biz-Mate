
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import InstantQuoteEstimator from "@/components/InstantQuoteEstimator";
import QuoteChart from "@/components/QuoteChart";

const Quote = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);

  // Fix the type mismatch by ensuring onComplete accepts a data parameter
  const handleQuoteComplete = (data: any) => {
    setFormData(data);
    setActiveStep(2);
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
              Generate accurate quotes for your projects in seconds
            </p>
          </header>

          <Tabs defaultValue="quote" className="mb-8">
            <TabsList>
              <TabsTrigger value="quote">Create Quote</TabsTrigger>
              <TabsTrigger value="history">Quote History</TabsTrigger>
            </TabsList>
            <TabsContent value="quote">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Quote</CardTitle>
                  <CardDescription>
                    Fill out the form below to generate a detailed project quote
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {activeStep === 1 && (
                    <InstantQuoteEstimator onComplete={handleQuoteComplete} />
                  )}
                  
                  {activeStep === 2 && formData && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Quote Results</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground">Total Quote Amount</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">${formData.totalAmount?.toLocaleString() || "0"}</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground">Estimated ROI</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{formData.roi || "0"}%</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-muted-foreground">Profit Margin</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{formData.profitMargin || "0"}%</div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-4">Cost Breakdown</h4>
                          <div className="h-[250px]">
                            <QuoteChart
                              type="bar"
                              title="Cost Breakdown"
                              data={[
                                { name: "Labor", value: formData.laborCost || 0 },
                                { name: "Materials", value: formData.materialsCost || 0 },
                                { name: "Overhead", value: formData.overheadCost || 0 }
                              ]}
                              xKey="name"
                              yKeys={[{ key: "value", name: "Amount", color: "#10b981" }]}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-4">ROI Analysis</h4>
                          <div className="h-[250px]">
                            <QuoteChart
                              type="bar"
                              title="ROI Analysis"
                              data={[
                                { month: "Month 1", revenue: formData.monthlyRevenue || 0, cost: formData.monthlyCost || 0 },
                                { month: "Month 2", revenue: (formData.monthlyRevenue || 0) * 1.1, cost: (formData.monthlyCost || 0) * 1.05 },
                                { month: "Month 3", revenue: (formData.monthlyRevenue || 0) * 1.2, cost: (formData.monthlyCost || 0) * 1.1 }
                              ]}
                              xKey="month"
                              yKeys={[
                                { key: "revenue", name: "Revenue", color: "#10b981" },
                                { key: "cost", name: "Cost", color: "#f43f5e" }
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <h4 className="font-medium mb-2">AI Insights</h4>
                        <p className="text-sm">Based on your quote details, we recommend reviewing your material costs which are slightly above industry average. Negotiating with suppliers could increase your profit margin by 5-8%.</p>
                      </div>
                      
                      <div className="flex justify-between mt-6">
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveStep(1)}
                        >
                          Edit Quote
                        </Button>
                        <Button 
                          onClick={() => navigate("/send", { state: { quoteData: formData } })}
                        >
                          Send Quote
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Quote;
