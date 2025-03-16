
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import QuoteChart from "./QuoteChart";
import { calculateHomeownerROI, HomeownerData, HomeownerResult } from "@/utils/calculationUtils";

const initialData: HomeownerData = {
  installationCost: 15000,
  annualSavings: 1800,
  maintenanceFee: 200,
  interestRate: 4.5,
  loanTerm: 10,
  energyPriceIncrease: 3,
  rebatesAndIncentives: 3000,
};

interface HomeownerCalculatorProps {
  onSaveQuote?: (result: HomeownerResult, inputs: HomeownerData) => void;
}

const HomeownerCalculator: React.FC<HomeownerCalculatorProps> = ({ onSaveQuote }) => {
  const [formData, setFormData] = useState<HomeownerData>(initialData);
  const [result, setResult] = useState<HomeownerResult | null>(null);
  const [isFinanced, setIsFinanced] = useState(true);
  const [activeTab, setActiveTab] = useState("inputs");
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof HomeownerData, value: string | number) => {
    const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleSliderChange = (field: keyof HomeownerData, value: number[]) => {
    setFormData((prev) => ({ ...prev, [field]: value[0] }));
  };

  const handleToggleFinance = (checked: boolean) => {
    setIsFinanced(checked);
    if (!checked) {
      setFormData((prev) => ({ ...prev, loanTerm: 0, interestRate: 0 }));
    } else {
      setFormData((prev) => ({ ...prev, loanTerm: 10, interestRate: 4.5 }));
    }
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for UX
    setTimeout(() => {
      try {
        const calculationResult = calculateHomeownerROI(formData);
        setResult(calculationResult);
        setActiveTab("results");
        toast.success("ROI calculation complete!");
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
      toast.success("Quote saved successfully!");
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
    const yearlyData = result.yearlyProjections.map((year) => ({
      year: `Year ${year.year}`,
      savings: Math.round(year.annualSavings),
      costs: Math.round(year.annualCost),
      netSavings: Math.round(year.netSavings),
      roi: Math.round(year.roi)
    }));

    const cumulativeData = result.yearlyProjections.map((year) => ({
      year: `Year ${year.year}`,
      return: Math.round(year.cumulativeReturn)
    }));

    const roiData = result.yearlyProjections.map((year) => ({
      year: `Year ${year.year}`,
      roi: Math.round(year.roi)
    }));

    return (
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuoteChart
            type="bar"
            title="Annual Savings vs. Costs"
            data={yearlyData}
            xKey="year"
            yKeys={[
              { key: "savings", name: "Annual Savings", color: "#2563eb" },
              { key: "costs", name: "Annual Costs", color: "#ef4444" },
              { key: "netSavings", name: "Net Savings", color: "#10b981" }
            ]}
          />
          
          <QuoteChart
            type="line"
            title="Return on Investment (%)"
            data={roiData}
            xKey="year"
            yKeys={[
              { key: "roi", name: "ROI", color: "#8b5cf6" },
            ]}
            formatYAxis={(value) => `${value}%`}
          />
        </div>
        
        <QuoteChart
          type="area"
          title="Cumulative Return Over Time"
          data={cumulativeData}
          xKey="year"
          yKeys={[
            { key: "return", name: "Cumulative Return", color: "#059669" },
          ]}
          height={240}
        />
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
          <TabsTrigger value="inputs">Calculator Inputs</TabsTrigger>
          <TabsTrigger value="results" disabled={!result}>Results & Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inputs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Homeowner ROI Calculator</CardTitle>
              <CardDescription>
                Calculate the return on investment for your home improvement projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="installationCost">Installation Cost</Label>
                  <Input
                    id="installationCost"
                    type="number"
                    value={formData.installationCost}
                    onChange={(e) => handleInputChange("installationCost", e.target.value)}
                    placeholder="e.g. 15000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="annualSavings">Annual Savings</Label>
                  <Input
                    id="annualSavings"
                    type="number"
                    value={formData.annualSavings}
                    onChange={(e) => handleInputChange("annualSavings", e.target.value)}
                    placeholder="e.g. 1800"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maintenanceFee">Annual Maintenance</Label>
                  <Input
                    id="maintenanceFee"
                    type="number"
                    value={formData.maintenanceFee}
                    onChange={(e) => handleInputChange("maintenanceFee", e.target.value)}
                    placeholder="e.g. 200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rebatesAndIncentives">Rebates & Incentives</Label>
                  <Input
                    id="rebatesAndIncentives"
                    type="number"
                    value={formData.rebatesAndIncentives}
                    onChange={(e) => handleInputChange("rebatesAndIncentives", e.target.value)}
                    placeholder="e.g. 3000"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Switch 
                    id="financing" 
                    checked={isFinanced}
                    onCheckedChange={handleToggleFinance}
                  />
                  <Label htmlFor="financing">Financing Options</Label>
                </div>
                
                {isFinanced && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label>Interest Rate: {formData.interestRate}%</Label>
                      <Slider
                        value={[formData.interestRate]}
                        min={0}
                        max={10}
                        step={0.1}
                        onValueChange={(value) => handleSliderChange("interestRate", value)}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Loan Term: {formData.loanTerm} years</Label>
                      <Slider
                        value={[formData.loanTerm]}
                        min={0}
                        max={30}
                        step={1}
                        onValueChange={(value) => handleSliderChange("loanTerm", value)}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <Label>Energy Price Increase: {formData.energyPriceIncrease}% per year</Label>
                <Slider
                  value={[formData.energyPriceIncrease]}
                  min={0}
                  max={10}
                  step={0.5}
                  onValueChange={(value) => handleSliderChange("energyPriceIncrease", value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCalculate} 
                className="w-full"
                disabled={isCalculating}
              >
                {isCalculating ? "Calculating..." : "Calculate ROI"}
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
                  <CardTitle>ROI Analysis Results</CardTitle>
                  <CardDescription>
                    Based on your inputs, here's your expected return on investment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>First Year ROI</CardDescription>
                        <CardTitle className="text-3xl text-primary">{formatPercent(result.firstYearROI)}</CardTitle>
                      </CardHeader>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Break-Even Point</CardDescription>
                        <CardTitle className="text-3xl text-primary">
                          {Math.floor(result.breakEvenMonths / 12)} years, {result.breakEvenMonths % 12} months
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>10-Year Total Savings</CardDescription>
                        <CardTitle className="text-3xl text-primary">{formatCurrency(result.totalSavings)}</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  {isFinanced && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Financing Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Monthly Payment</p>
                            <p className="text-xl font-medium">{formatCurrency(result.monthlyPayment)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Annual Maintenance</p>
                            <p className="text-xl font-medium">{formatCurrency(result.annualMaintenance)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {renderResultCharts()}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleSaveQuote} className="w-full sm:w-auto">
                    Save Quote
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

export default HomeownerCalculator;
