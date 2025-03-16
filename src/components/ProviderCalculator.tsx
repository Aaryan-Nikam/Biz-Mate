
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
import { calculateProviderROI, ProviderData, ProviderResult } from "@/utils/calculationUtils";

const initialData: ProviderData = {
  overheadCosts: 5000,
  laborExpenses: 10000,
  marketingSpend: 3000,
  revenuePerJob: 7500,
  jobsPerMonth: 8,
  closingRate: 40,
  leadCost: 100,
  otherExpenses: 1000,
};

interface ProviderCalculatorProps {
  onSaveQuote?: (result: ProviderResult, inputs: ProviderData) => void;
}

const ProviderCalculator: React.FC<ProviderCalculatorProps> = ({ onSaveQuote }) => {
  const [formData, setFormData] = useState<ProviderData>(initialData);
  const [result, setResult] = useState<ProviderResult | null>(null);
  const [activeTab, setActiveTab] = useState("inputs");
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof ProviderData, value: string | number) => {
    const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleSliderChange = (field: keyof ProviderData, value: number[]) => {
    setFormData((prev) => ({ ...prev, [field]: value[0] }));
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for UX
    setTimeout(() => {
      try {
        const calculationResult = calculateProviderROI(formData);
        setResult(calculationResult);
        setActiveTab("results");
        toast.success("Business ROI calculation complete!");
      } catch (error) {
        toast.error("Error calculating ROI. Please check your inputs and try again.");
        console.error(error);
      } finally {
        setIsCalculating(false);
      }
    }, 800);
  };

  const handleSaveQuote = () => {
    if (result && onSaveQuote) {
      onSaveQuote(result, formData);
      toast.success("Business analysis saved successfully!");
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const renderResultCharts = () => {
    if (!result) return null;

    // Prepare data for charts
    const monthlyData = {
      revenue: result.monthlyRevenue,
      expenses: result.monthlyTotalExpenses,
      profit: result.monthlyProfit
    };

    // Expense breakdown
    const expenseData = [
      { name: "Overhead", value: formData.overheadCosts },
      { name: "Labor", value: formData.laborExpenses },
      { name: "Marketing", value: formData.marketingSpend },
      { name: "Lead Costs", value: result.monthlyRevenue * (formData.leadCost / 100) },
      { name: "Other", value: formData.otherExpenses }
    ];

    // Yearly projection data
    const yearlyData = result.yearlyProjections.map((year) => ({
      year: `Year ${year.year}`,
      revenue: Math.round(year.revenue),
      expenses: Math.round(year.expenses),
      profit: Math.round(year.profit)
    }));

    // ROI projection data
    const roiData = result.yearlyProjections.map((year) => ({
      year: `Year ${year.year}`,
      roi: Math.round(year.roi)
    }));

    return (
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuoteChart
            type="bar"
            title="Monthly Revenue vs. Expenses"
            data={[monthlyData].map((item, index) => ({ 
              month: "Monthly", 
              ...item 
            }))}
            xKey="month"
            yKeys={[
              { key: "revenue", name: "Revenue", color: "#2563eb" },
              { key: "expenses", name: "Expenses", color: "#ef4444" },
              { key: "profit", name: "Profit", color: "#10b981" }
            ]}
          />
          
          <QuoteChart
            type="bar"
            title="Expense Breakdown"
            data={expenseData.map(item => ({
              category: item.name,
              amount: item.value
            }))}
            xKey="category"
            yKeys={[
              { key: "amount", name: "Amount", color: "#8b5cf6" },
            ]}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuoteChart
            type="area"
            title="5-Year Projection"
            data={yearlyData}
            xKey="year"
            yKeys={[
              { key: "revenue", name: "Revenue", color: "#2563eb" },
              { key: "expenses", name: "Expenses", color: "#ef4444" },
              { key: "profit", name: "Profit", color: "#10b981" }
            ]}
          />
          
          <QuoteChart
            type="line"
            title="ROI Projection (%)"
            data={roiData}
            xKey="year"
            yKeys={[
              { key: "roi", name: "ROI", color: "#8b5cf6" },
            ]}
            formatYAxis={(value) => `${value}%`}
          />
        </div>
      </div>
    );
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
          <TabsTrigger value="inputs">Business Inputs</TabsTrigger>
          <TabsTrigger value="results" disabled={!result}>Results & Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inputs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Provider ROI Calculator</CardTitle>
              <CardDescription>
                Calculate the return on investment for your service business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="overheadCosts">Monthly Overhead Costs</Label>
                  <Input
                    id="overheadCosts"
                    type="number"
                    value={formData.overheadCosts}
                    onChange={(e) => handleInputChange("overheadCosts", e.target.value)}
                    placeholder="e.g. 5000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="laborExpenses">Monthly Labor Expenses</Label>
                  <Input
                    id="laborExpenses"
                    type="number"
                    value={formData.laborExpenses}
                    onChange={(e) => handleInputChange("laborExpenses", e.target.value)}
                    placeholder="e.g. 10000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="marketingSpend">Monthly Marketing Spend</Label>
                  <Input
                    id="marketingSpend"
                    type="number"
                    value={formData.marketingSpend}
                    onChange={(e) => handleInputChange("marketingSpend", e.target.value)}
                    placeholder="e.g. 3000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="otherExpenses">Other Monthly Expenses</Label>
                  <Input
                    id="otherExpenses"
                    type="number"
                    value={formData.otherExpenses}
                    onChange={(e) => handleInputChange("otherExpenses", e.target.value)}
                    placeholder="e.g. 1000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="revenuePerJob">Average Revenue Per Job</Label>
                  <Input
                    id="revenuePerJob"
                    type="number"
                    value={formData.revenuePerJob}
                    onChange={(e) => handleInputChange("revenuePerJob", e.target.value)}
                    placeholder="e.g. 7500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobsPerMonth">Jobs Per Month</Label>
                  <Input
                    id="jobsPerMonth"
                    type="number"
                    value={formData.jobsPerMonth}
                    onChange={(e) => handleInputChange("jobsPerMonth", e.target.value)}
                    placeholder="e.g. 8"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Closing Rate: {formData.closingRate}%</Label>
                  <Slider
                    value={[formData.closingRate]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleSliderChange("closingRate", value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="leadCost">Cost Per Lead</Label>
                  <Input
                    id="leadCost"
                    type="number"
                    value={formData.leadCost}
                    onChange={(e) => handleInputChange("leadCost", e.target.value)}
                    placeholder="e.g. 100"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCalculate} 
                className="w-full"
                disabled={isCalculating}
              >
                {isCalculating ? "Calculating..." : "Calculate Business ROI"}
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
                  <CardTitle>Business Analysis Results</CardTitle>
                  <CardDescription>
                    Based on your inputs, here's your business performance analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Monthly Revenue</CardDescription>
                        <CardTitle className="text-2xl text-primary">{formatCurrency(result.monthlyRevenue)}</CardTitle>
                      </CardHeader>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Monthly Expenses</CardDescription>
                        <CardTitle className="text-2xl text-primary">{formatCurrency(result.monthlyTotalExpenses)}</CardTitle>
                      </CardHeader>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Monthly Profit</CardDescription>
                        <CardTitle className="text-2xl text-primary">{formatCurrency(result.monthlyProfit)}</CardTitle>
                      </CardHeader>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Monthly ROI</CardDescription>
                        <CardTitle className="text-2xl text-primary">{formatPercent(result.monthlyROI)}</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Key Business Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Cost Per Job</p>
                          <p className="text-xl font-medium">{formatCurrency(result.costPerJob)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Profit Per Job</p>
                          <p className="text-xl font-medium">{formatCurrency(result.profitPerJob)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Profit Margin</p>
                          <p className="text-xl font-medium">{formatPercent(result.profitMargin)}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Breakeven Jobs Per Month</p>
                        <p className="text-xl font-medium">{result.breakevenJobs.toFixed(1)} jobs</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {renderResultCharts()}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleSaveQuote} className="w-full sm:w-auto">
                    Save Analysis
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("inputs")} className="w-full sm:w-auto">
                    Modify Inputs
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

export default ProviderCalculator;
