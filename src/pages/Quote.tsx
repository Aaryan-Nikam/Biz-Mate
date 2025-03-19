
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
    if (!user?.niche && user?.role === "provider") {
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
              {activeStep === 1 && (
                <InstantQuoteEstimator 
                  niche={user?.niche} 
                  onComplete={handleQuoteComplete} 
                />
              )}
              
              {activeStep === 2 && formData && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Quote Results</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">Total Quote Amount</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-indigo-600">${formData.totalAmount?.toLocaleString() || "0"}</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">Estimated ROI</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">{formData.roi || "0"}%</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-0">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-muted-foreground">Profit Margin</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-amber-600">{formData.profitMargin || "0"}%</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Cost Breakdown Chart */}
                    <div className="bg-white rounded-lg border overflow-hidden">
                      <div className="h-[350px] pt-4">
                        <QuoteChart
                          type="bar"
                          title="Cost Breakdown"
                          data={[
                            { name: "Labor", value: formData.laborCost || 0 },
                            { name: "Materials", value: formData.materialsCost || 0 },
                            { name: "Overhead", value: formData.overheadCost || 0 }
                          ]}
                          xKey="name"
                          yKeys={[{ key: "value", name: "Amount", color: "#8B5CF6" }]}
                        />
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50">
                        <h4 className="font-medium text-purple-700 mb-2 flex items-center">
                          <Lightbulb className="mr-2 h-5 w-5 text-purple-500" />
                          Cost Insight
                        </h4>
                        <p className="text-sm text-slate-700">Labor and materials make up the majority of your project costs. Optimizing your material selection could reduce overall expenses by 10-15%.</p>
                      </div>
                    </div>
                    
                    {/* ROI Analysis Chart */}
                    <div className="bg-white rounded-lg border overflow-hidden">
                      <div className="h-[350px] pt-4">
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
                            { key: "revenue", name: "Revenue", color: "#0EA5E9" },
                            { key: "cost", name: "Cost", color: "#F97316" }
                          ]}
                        />
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50">
                        <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                          <Lightbulb className="mr-2 h-5 w-5 text-blue-500" />
                          ROI Insight
                        </h4>
                        <p className="text-sm text-slate-700">Your project shows increasing returns month-over-month. Based on current projections, you'll begin seeing positive cash flow within the first quarter.</p>
                      </div>
                    </div>
                    
                    {/* Long-term Value Projection Chart */}
                    <div className="bg-white rounded-lg border overflow-hidden">
                      <div className="h-[350px] pt-4">
                        <QuoteChart
                          type="area"
                          title="Long-term Value Projection"
                          data={[
                            { year: "Year 1", value: formData.totalAmount || 0, savings: formData.savings || 0 },
                            { year: "Year 2", value: (formData.totalAmount || 0) * 0.9, savings: (formData.savings || 0) * 2.2 },
                            { year: "Year 3", value: (formData.totalAmount || 0) * 0.8, savings: (formData.savings || 0) * 3.5 },
                            { year: "Year 4", value: (formData.totalAmount || 0) * 0.7, savings: (formData.savings || 0) * 4.8 },
                            { year: "Year 5", value: (formData.totalAmount || 0) * 0.6, savings: (formData.savings || 0) * 6.2 }
                          ]}
                          xKey="year"
                          yKeys={[
                            { key: "value", name: "Investment Value", color: "#D946EF" },
                            { key: "savings", name: "Cumulative Savings", color: "#10B981" }
                          ]}
                        />
                      </div>
                      <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50">
                        <h4 className="font-medium text-emerald-700 mb-2 flex items-center">
                          <Lightbulb className="mr-2 h-5 w-5 text-emerald-500" />
                          Long-term Insight
                        </h4>
                        <p className="text-sm text-slate-700">Your investment will continue to generate value over its lifetime. By year 5, you can expect to have saved more than 6x your initial investment.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg shadow-sm">
                    <h4 className="font-medium flex items-center text-amber-700 mb-3">
                      <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                      AI Recommendations
                    </h4>
                    <div className="space-y-3">
                      {formData.insights ? (
                        formData.insights.map((insight: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <Badge variant="outline" className="mt-0.5 bg-white shrink-0 text-amber-700 border-amber-200">
                              {index + 1}
                            </Badge>
                            <p className="text-sm text-slate-700">{insight}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-700">Based on your quote details, we recommend reviewing your material costs which are slightly above industry average. Negotiating with suppliers could increase your profit margin by 5-8%.</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveStep(1)}
                    >
                      Edit Quote
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
                      onClick={() => navigate("/send", { state: { quoteData: formData } })}
                    >
                      Send Quote
                    </Button>
                  </div>
                </div>
              )}
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
