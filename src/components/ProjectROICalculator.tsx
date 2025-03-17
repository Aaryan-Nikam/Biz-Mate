
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import QuoteChart from "./QuoteChart";
import { Lightbulb } from "lucide-react";

// Types for project ROI calculator
interface ProjectData {
  projectCost: number;
  projectRevenue: number;
  projectDuration: number;
  materialCosts: number;
  laborCosts: number;
  marketingCosts: number;
  recurringMaintenance: number;
}

interface ProjectResult {
  totalCost: number;
  revenue: number;
  profit: number;
  roi: number;
  monthlyProfit: number;
  paybackPeriod: number;
  breakdownData: { category: string; value: number }[];
  projectionData: { month: number; cost: number; revenue: number; profit: number }[];
}

const initialData: ProjectData = {
  projectCost: 10000,
  projectRevenue: 15000,
  projectDuration: 3,
  materialCosts: 5000,
  laborCosts: 3500,
  marketingCosts: 500,
  recurringMaintenance: 200
};

const ProjectROICalculator = () => {
  const [formData, setFormData] = useState<ProjectData>(initialData);
  const [result, setResult] = useState<ProjectResult | null>(null);
  const [activeTab, setActiveTab] = useState("inputs");
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof ProjectData, value: string | number) => {
    const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleSliderChange = (field: keyof ProjectData, value: number[]) => {
    setFormData((prev) => ({ ...prev, [field]: value[0] }));
  };

  const calculateProjectROI = (data: ProjectData): ProjectResult => {
    const { projectCost, projectRevenue, projectDuration, materialCosts, laborCosts, marketingCosts, recurringMaintenance } = data;
    
    // Calculate total cost including all factors
    const totalCost = materialCosts + laborCosts + marketingCosts + (recurringMaintenance * projectDuration);
    
    // Calculate profit and ROI
    const profit = projectRevenue - totalCost;
    const roi = (profit / totalCost) * 100;
    
    // Calculate monthly profit
    const monthlyProfit = profit / projectDuration;
    
    // Calculate payback period (months)
    const paybackPeriod = totalCost / (projectRevenue / projectDuration);
    
    // Generate cost breakdown data for chart
    const breakdownData = [
      { category: "Materials", value: materialCosts },
      { category: "Labor", value: laborCosts },
      { category: "Marketing", value: marketingCosts },
      { category: "Maintenance", value: recurringMaintenance * projectDuration }
    ];
    
    // Generate monthly projection data for chart
    const projectionData = Array.from({ length: projectDuration }, (_, i) => ({
      month: i + 1,
      cost: i === 0 ? totalCost : recurringMaintenance,
      revenue: projectRevenue / projectDuration,
      profit: (projectRevenue / projectDuration) - (i === 0 ? totalCost : recurringMaintenance)
    }));
    
    return {
      totalCost,
      revenue: projectRevenue,
      profit,
      roi,
      monthlyProfit,
      paybackPeriod,
      breakdownData,
      projectionData
    };
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for UX
    setTimeout(() => {
      try {
        const result = calculateProjectROI(formData);
        setResult(result);
        setActiveTab("results");
        toast.success("Project ROI calculation complete!");
      } catch (error) {
        toast.error("Error calculating ROI. Please check your inputs and try again.");
        console.error(error);
      } finally {
        setIsCalculating(false);
      }
    }, 800);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const renderAIInsights = () => {
    if (!result) return null;
    
    const insights = [];
    
    // Generate insights based on ROI result
    if (result.roi < 15) {
      insights.push("Your project ROI is below the industry average of 15%. Consider reducing material costs or increasing revenue.");
    } else if (result.roi > 30) {
      insights.push("Excellent ROI! Your project is performing well above industry standards.");
    }
    
    // Material to labor ratio insight
    const materialToLaborRatio = formData.materialCosts / formData.laborCosts;
    if (materialToLaborRatio > 2) {
      insights.push("Your material costs are significantly higher than labor costs. Consider negotiating better material prices or using alternative materials.");
    } else if (materialToLaborRatio < 0.5) {
      insights.push("Your labor costs are significantly higher than material costs. Consider optimizing workforce efficiency or automation options.");
    }
    
    // Payback period insight
    if (result.paybackPeriod > formData.projectDuration) {
      insights.push(`Your payback period (${result.paybackPeriod.toFixed(1)} months) exceeds the project duration (${formData.projectDuration} months). Consider extending the project timeline or increasing revenue.`);
    } else if (result.paybackPeriod < formData.projectDuration / 2) {
      insights.push(`Your project will break even in ${result.paybackPeriod.toFixed(1)} months, which is excellent for a ${formData.projectDuration}-month project.`);
    }
    
    // Marketing efficiency insight
    const marketingToRevenueRatio = (formData.marketingCosts / formData.projectRevenue) * 100;
    if (marketingToRevenueRatio > 10) {
      insights.push(`Your marketing expenses (${marketingToRevenueRatio.toFixed(1)}% of revenue) are high. Consider optimizing your marketing channels for better ROI.`);
    }
    
    return insights;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="inputs">Project Inputs</TabsTrigger>
          <TabsTrigger value="results" disabled={!result}>Results & Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inputs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project-Based ROI Calculator</CardTitle>
              <CardDescription>
                Calculate the return on investment for individual projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectCost">Total Project Cost</Label>
                  <Input
                    id="projectCost"
                    type="number"
                    value={formData.projectCost}
                    onChange={(e) => handleInputChange("projectCost", e.target.value)}
                    placeholder="e.g. 10000"
                  />
                  <p className="text-xs text-muted-foreground">The total cost to complete the project</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projectRevenue">Project Revenue</Label>
                  <Input
                    id="projectRevenue"
                    type="number"
                    value={formData.projectRevenue}
                    onChange={(e) => handleInputChange("projectRevenue", e.target.value)}
                    placeholder="e.g. 15000"
                  />
                  <p className="text-xs text-muted-foreground">The total revenue expected from the project</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projectDuration">Project Duration (months)</Label>
                <div className="pt-2">
                  <Slider
                    id="projectDuration"
                    name="projectDuration"
                    min={1}
                    max={24}
                    step={1}
                    value={[formData.projectDuration]}
                    onValueChange={(value) => handleSliderChange("projectDuration", value)}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 month</span>
                    <span>{formData.projectDuration} months</span>
                    <span>24 months</span>
                  </div>
                </div>
              </div>
              
              <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="materialCosts">Material Costs</Label>
                      <Input
                        id="materialCosts"
                        type="number"
                        value={formData.materialCosts}
                        onChange={(e) => handleInputChange("materialCosts", e.target.value)}
                        placeholder="e.g. 5000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="laborCosts">Labor Costs</Label>
                      <Input
                        id="laborCosts"
                        type="number"
                        value={formData.laborCosts}
                        onChange={(e) => handleInputChange("laborCosts", e.target.value)}
                        placeholder="e.g. 3000"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="marketingCosts">Marketing Costs</Label>
                      <Input
                        id="marketingCosts"
                        type="number"
                        value={formData.marketingCosts}
                        onChange={(e) => handleInputChange("marketingCosts", e.target.value)}
                        placeholder="e.g. 500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="recurringMaintenance">Monthly Maintenance</Label>
                      <Input
                        id="recurringMaintenance"
                        type="number"
                        value={formData.recurringMaintenance}
                        onChange={(e) => handleInputChange("recurringMaintenance", e.target.value)}
                        placeholder="e.g. 200"
                      />
                      <p className="text-xs text-muted-foreground">Recurring monthly maintenance costs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCalculate} 
                className="w-full"
                disabled={isCalculating}
              >
                {isCalculating ? "Calculating..." : "Calculate Project ROI"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Project ROI Results</CardTitle>
                  <CardDescription>
                    Based on your inputs, here's your project performance analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Total Cost</CardDescription>
                        <CardTitle className="text-xl text-primary">{formatCurrency(result.totalCost)}</CardTitle>
                      </CardHeader>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Revenue</CardDescription>
                        <CardTitle className="text-xl text-primary">{formatCurrency(result.revenue)}</CardTitle>
                      </CardHeader>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Project Profit</CardDescription>
                        <CardTitle className="text-xl text-primary">{formatCurrency(result.profit)}</CardTitle>
                      </CardHeader>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>ROI</CardDescription>
                        <CardTitle className="text-xl text-primary">{result.roi.toFixed(1)}%</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Project Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Monthly Profit</p>
                            <p className="text-xl font-medium">{formatCurrency(result.monthlyProfit)}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground">Payback Period</p>
                            <p className="text-xl font-medium">{result.paybackPeriod.toFixed(1)} months</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground">Profit Margin</p>
                            <p className="text-xl font-medium">{((result.profit / result.revenue) * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center">
                          <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                          AI Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {renderAIInsights()?.map((insight, index) => (
                            <li key={index} className="text-sm">• {insight}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-[300px]">
                      <QuoteChart
                        type="bar"
                        title="Cost Breakdown"
                        data={result.breakdownData}
                        xKey="category"
                        yKeys={[
                          { key: "value", name: "Amount", color: "#8b5cf6" }
                        ]}
                      />
                    </div>
                    
                    <div className="h-[300px]">
                      <QuoteChart
                        type="area"
                        title="Project Projection"
                        data={result.projectionData}
                        xKey="month"
                        yKeys={[
                          { key: "revenue", name: "Revenue", color: "#2563eb" },
                          { key: "cost", name: "Cost", color: "#ef4444" },
                          { key: "profit", name: "Profit", color: "#10b981" }
                        ]}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("inputs")} 
                    className="w-full"
                  >
                    Adjust Inputs
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ProjectROICalculator;
