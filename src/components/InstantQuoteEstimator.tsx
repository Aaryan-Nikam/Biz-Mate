
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Send, Lightbulb, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion } from "framer-motion";
import QuoteChart from "./QuoteChart";
import { NicheType } from "./NicheSelection";

// Types for quote estimator
interface QuoteEstimateResult {
  totalCost: number;
  monthlyPayment: number;
  paybackPeriod: number;
  roi: number;
  savings: number;
  insights: string[];
  chartData: any[];
}

interface InstantQuoteEstimatorProps {
  niche: NicheType;
}

const InstantQuoteEstimator: React.FC<InstantQuoteEstimatorProps> = ({ niche }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quoteResult, setQuoteResult] = useState<QuoteEstimateResult | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [formState, setFormState] = useState(() => {
    // Initialize with niche-specific default values
    switch (niche) {
      case "solar":
        return {
          systemSize: 5, // kW
          roofType: "asphalt",
          sunExposure: "full",
          electricBill: 200, // monthly in $
          financing: "cash"
        };
      case "hvac":
        return {
          systemType: "central",
          homeSize: 2000, // sq ft
          existingSystem: "old",
          seasonalUsage: "high",
          zones: 1 // number of zones
        };
      case "remodeling":
        return {
          projectType: "kitchen",
          squareFootage: 200,
          materialsGrade: "mid",
          complexity: "medium",
          timeframe: "standard"
        };
      default:
        return {};
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormState(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const generateQuote = () => {
    setIsGenerating(true);
    
    // Simulate API call or calculation
    setTimeout(() => {
      // Calculate different results based on niche
      let result: QuoteEstimateResult;
      
      switch (niche) {
        case "solar":
          result = calculateSolarQuote(formState);
          break;
        case "hvac":
          result = calculateHVACQuote(formState);
          break;
        case "remodeling":
          result = calculateRemodelingQuote(formState);
          break;
        default:
          result = {
            totalCost: 0,
            monthlyPayment: 0,
            paybackPeriod: 0,
            roi: 0,
            savings: 0,
            insights: [],
            chartData: []
          };
      }
      
      setQuoteResult(result);
      setIsGenerating(false);
      toast.success("Quote estimate generated successfully!");
    }, 1500);
  };

  const calculateSolarQuote = (data: any): QuoteEstimateResult => {
    const { systemSize, roofType, sunExposure, electricBill, financing } = data;
    
    // Basic calculations for solar quote
    const costPerWatt = 2.8; // Average cost per watt in $
    const totalCost = systemSize * 1000 * costPerWatt;
    const federalTaxCredit = totalCost * 0.26; // 26% federal tax credit
    const netCost = totalCost - federalTaxCredit;
    
    // Calculate monthly payment if financing
    const interestRate = financing === "loan" ? 0.049 : 0; // 4.9% for loans
    const loanTerm = financing === "loan" ? 20 : 0; // 20 years
    const monthlyPayment = financing === "loan" 
      ? (netCost * (interestRate / 12) * Math.pow(1 + (interestRate / 12), loanTerm * 12)) / 
        (Math.pow(1 + (interestRate / 12), loanTerm * 12) - 1)
      : 0;
    
    // Calculate energy production and savings
    const exposureFactor = sunExposure === "full" ? 1 : sunExposure === "partial" ? 0.8 : 0.6;
    const monthlyProduction = systemSize * 120 * exposureFactor; // kWh per month
    const electricityRate = 0.15; // $ per kWh
    const monthlySavings = monthlyProduction * electricityRate;
    const annualSavings = monthlySavings * 12;
    
    // Calculate ROI and payback period
    const roi = (annualSavings / netCost) * 100;
    const paybackPeriod = netCost / annualSavings;
    
    // Generate insights based on the data
    const insights = [
      `Your ${systemSize}kW solar system could produce approximately ${Math.round(monthlyProduction)} kWh monthly.`,
      `Expected monthly savings on your electricity bill: $${Math.round(monthlySavings)}.`,
      `With ${financing === "loan" ? "financing" : "cash payment"}, you can expect to break even in ${Math.round(paybackPeriod * 10) / 10} years.`,
      `Solar panels typically last 25-30 years, offering about ${Math.round((25 - paybackPeriod) * annualSavings)} in total savings after payback.`,
      roofType === "metal" ? "Metal roofs are ideal for solar installation and may increase efficiency." : 
        "Your asphalt roof is compatible with standard solar mounting systems."
    ];
    
    // Generate chart data for 10 years
    const chartData = Array.from({ length: 10 }, (_, i) => ({
      year: i + 1,
      savings: Math.round(annualSavings * (i + 1)),
      investment: i === 0 ? (financing === "cash" ? netCost : 0) : (financing === "loan" ? monthlyPayment * 12 : 0)
    }));
    
    return {
      totalCost: Math.round(netCost),
      monthlyPayment: Math.round(monthlyPayment),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      roi: Math.round(roi * 10) / 10,
      savings: Math.round(annualSavings),
      insights,
      chartData
    };
  };

  const calculateHVACQuote = (data: any): QuoteEstimateResult => {
    const { systemType, homeSize, existingSystem, seasonalUsage, zones } = data;
    
    // Base costs for different system types
    const baseCosts = {
      central: 5000,
      heatPump: 7500,
      ductless: 4000,
      geothermal: 20000
    };
    
    // Calculate total cost based on system type, home size, and zones
    const systemBaseCost = baseCosts[systemType as keyof typeof baseCosts] || 5000;
    const sizeFactor = homeSize / 1000; // Cost factor based on square footage
    const zoneFactor = zones > 1 ? (1 + (zones - 1) * 0.3) : 1; // Multi-zone factor
    
    let totalCost = systemBaseCost * sizeFactor * zoneFactor;
    
    // Adjust for existing system replacement
    if (existingSystem === "old") {
      totalCost *= 0.9; // 10% discount for replacing old system
    } else if (existingSystem === "none") {
      totalCost *= 1.15; // 15% premium for new installation
    }
    
    // Calculate energy savings
    const usageFactor = seasonalUsage === "high" ? 0.4 : seasonalUsage === "medium" ? 0.25 : 0.15;
    const annualEnergyCost = homeSize * 1.2; // Rough estimate of annual energy cost
    const annualSavings = annualEnergyCost * usageFactor;
    
    // Calculate ROI and payback
    const roi = (annualSavings / totalCost) * 100;
    const paybackPeriod = totalCost / annualSavings;
    
    // Monthly payment (assuming 7-year financing at 5.9% interest)
    const interestRate = 0.059;
    const loanTerm = 7;
    const monthlyPayment = (totalCost * (interestRate / 12) * Math.pow(1 + (interestRate / 12), loanTerm * 12)) / 
      (Math.pow(1 + (interestRate / 12), loanTerm * 12) - 1);
    
    // Generate insights
    const insights = [
      `A ${systemType} HVAC system for your ${homeSize} sq. ft. home could save approximately $${Math.round(annualSavings)} annually.`,
      `Modern HVAC systems are 30-50% more efficient than systems manufactured 10-15 years ago.`,
      `With ${zones} zone${zones > 1 ? 's' : ''}, you'll have better temperature control and potential for additional energy savings.`,
      `Most HVAC systems have a lifespan of 15-20 years with proper maintenance.`,
      `Regular maintenance can extend system life and maintain efficiency, costing $150-$300 annually.`
    ];
    
    // Generate chart data
    const chartData = Array.from({ length: 10 }, (_, i) => ({
      year: i + 1,
      savings: Math.round(annualSavings * (i + 1)),
      investment: i === 0 ? totalCost : 0
    }));
    
    return {
      totalCost: Math.round(totalCost),
      monthlyPayment: Math.round(monthlyPayment),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      roi: Math.round(roi * 10) / 10,
      savings: Math.round(annualSavings),
      insights,
      chartData
    };
  };

  const calculateRemodelingQuote = (data: any): QuoteEstimateResult => {
    const { projectType, squareFootage, materialsGrade, complexity, timeframe } = data;
    
    // Base costs per square foot for different project types
    const baseCostsPerSqFt = {
      kitchen: 150,
      bathroom: 250,
      basement: 50,
      addition: 200,
      wholehome: 100
    };
    
    // Material grade multipliers
    const materialMultipliers = {
      economy: 0.8,
      mid: 1.0,
      luxury: 1.5,
      premium: 2.2
    };
    
    // Complexity multipliers
    const complexityMultipliers = {
      simple: 0.85,
      medium: 1.0,
      complex: 1.3,
      custom: 1.6
    };
    
    // Timeframe multipliers (rush jobs cost more)
    const timeframeMultipliers = {
      extended: 0.9,
      standard: 1.0,
      expedited: 1.2,
      rush: 1.4
    };
    
    // Calculate total cost
    const baseCostPerSqFt = baseCostsPerSqFt[projectType as keyof typeof baseCostsPerSqFt] || 100;
    const materialMultiplier = materialMultipliers[materialsGrade as keyof typeof materialMultipliers] || 1.0;
    const complexityMultiplier = complexityMultipliers[complexity as keyof typeof complexityMultipliers] || 1.0;
    const timeframeMultiplier = timeframeMultipliers[timeframe as keyof typeof timeframeMultipliers] || 1.0;
    
    const totalCost = squareFootage * baseCostPerSqFt * materialMultiplier * complexityMultiplier * timeframeMultiplier;
    
    // Calculate property value increase (ROI for remodeling)
    const valueIncreaseRates = {
      kitchen: 0.7, // 70% of cost recouped at resale
      bathroom: 0.65,
      basement: 0.75,
      addition: 0.65,
      wholehome: 0.6
    };
    
    const valueIncreaseRate = valueIncreaseRates[projectType as keyof typeof valueIncreaseRates] || 0.6;
    const propertyValueIncrease = totalCost * valueIncreaseRate;
    
    // Calculate ROI and monthly financing
    const roi = (propertyValueIncrease / totalCost) * 100;
    
    // Assume 10-year home improvement loan at 6.5% interest
    const interestRate = 0.065;
    const loanTerm = 10;
    const monthlyPayment = (totalCost * (interestRate / 12) * Math.pow(1 + (interestRate / 12), loanTerm * 12)) / 
      (Math.pow(1 + (interestRate / 12), loanTerm * 12) - 1);
    
    // Generate insights
    const insights = [
      `Your ${projectType} remodeling project could increase your property value by approximately $${Math.round(propertyValueIncrease)}.`,
      `${projectType.charAt(0).toUpperCase() + projectType.slice(1)} remodels typically recoup ${Math.round(valueIncreaseRate * 100)}% of costs at resale.`,
      `${materialsGrade.charAt(0).toUpperCase() + materialsGrade.slice(1)}-grade materials balance quality and cost for this project type.`,
      `Based on ${complexity} complexity, labor costs account for approximately ${Math.round(totalCost * 0.4)} of your total budget.`,
      `Consider setting aside 10-15% of your budget ($${Math.round(totalCost * 0.15)}) for unexpected issues.`
    ];
    
    // Generate chart data for value comparison
    const chartData = [
      { 
        category: "Project Cost", 
        value: Math.round(totalCost)
      },
      { 
        category: "Property Value Increase", 
        value: Math.round(propertyValueIncrease)
      },
      { 
        category: "Materials", 
        value: Math.round(totalCost * 0.4)
      },
      { 
        category: "Labor", 
        value: Math.round(totalCost * 0.4)
      },
      { 
        category: "Design & Permits", 
        value: Math.round(totalCost * 0.1)
      },
      { 
        category: "Contingency", 
        value: Math.round(totalCost * 0.1)
      }
    ];
    
    return {
      totalCost: Math.round(totalCost),
      monthlyPayment: Math.round(monthlyPayment),
      paybackPeriod: Infinity, // Remodeling doesn't have a traditional payback period
      roi: Math.round(roi * 10) / 10,
      savings: Math.round(propertyValueIncrease), // This is actually property value increase
      insights,
      chartData
    };
  };

  const handleSendEmail = () => {
    if (!customerInfo.email) {
      toast.error("Please provide an email address to send the quote");
      return;
    }
    
    toast.success(`Quote sent to ${customerInfo.email}`);
  };

  const handleDownload = () => {
    toast.success("Downloading your quote estimate...");
    // In a real app, this would generate a PDF
  };

  const renderInputForm = () => {
    switch (niche) {
      case "solar":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="systemSize">System Size (kW)</Label>
              <div className="pt-2">
                <Slider
                  id="systemSize"
                  name="systemSize"
                  min={1}
                  max={20}
                  step={0.5}
                  value={[formState.systemSize]}
                  onValueChange={(value) => handleSliderChange("systemSize", value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 kW</span>
                  <span>{formState.systemSize} kW</span>
                  <span>20 kW</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roofType">Roof Type</Label>
                <select
                  id="roofType"
                  name="roofType"
                  value={formState.roofType}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="asphalt">Asphalt Shingle</option>
                  <option value="metal">Metal</option>
                  <option value="tile">Tile</option>
                  <option value="flat">Flat</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="sunExposure">Sun Exposure</Label>
                <select
                  id="sunExposure"
                  name="sunExposure"
                  value={formState.sunExposure}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="full">Full Sun (6+ hours)</option>
                  <option value="partial">Partial Sun (4-6 hours)</option>
                  <option value="limited">Limited Sun (2-4 hours)</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="electricBill">Average Monthly Electric Bill ($)</Label>
              <Input
                id="electricBill"
                name="electricBill"
                type="number"
                value={formState.electricBill}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="financing">Financing Option</Label>
              <select
                id="financing"
                name="financing"
                value={formState.financing}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="cash">Cash Purchase</option>
                <option value="loan">Solar Loan</option>
                <option value="lease">Solar Lease/PPA</option>
              </select>
            </div>
          </div>
        );
      
      case "hvac":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="systemType">System Type</Label>
              <select
                id="systemType"
                name="systemType"
                value={formState.systemType}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="central">Central AC & Furnace</option>
                <option value="heatPump">Heat Pump</option>
                <option value="ductless">Ductless Mini-Split</option>
                <option value="geothermal">Geothermal</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="homeSize">Home Size (sq. ft.)</Label>
              <Input
                id="homeSize"
                name="homeSize"
                type="number"
                value={formState.homeSize}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="existingSystem">Existing System</Label>
                <select
                  id="existingSystem"
                  name="existingSystem"
                  value={formState.existingSystem}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="old">Replacing Old System</option>
                  <option value="working">Upgrading Working System</option>
                  <option value="none">New Construction (No System)</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="seasonalUsage">Seasonal Usage</Label>
                <select
                  id="seasonalUsage"
                  name="seasonalUsage"
                  value={formState.seasonalUsage}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="high">High (Year-round)</option>
                  <option value="medium">Medium (Seasonal)</option>
                  <option value="low">Low (Occasional)</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="zones">Number of Zones</Label>
              <div className="pt-2">
                <Slider
                  id="zones"
                  name="zones"
                  min={1}
                  max={6}
                  step={1}
                  value={[formState.zones]}
                  onValueChange={(value) => handleSliderChange("zones", value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 zone</span>
                  <span>{formState.zones} zone{formState.zones > 1 ? 's' : ''}</span>
                  <span>6 zones</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "remodeling":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectType">Project Type</Label>
              <select
                id="projectType"
                name="projectType"
                value={formState.projectType}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="kitchen">Kitchen Remodel</option>
                <option value="bathroom">Bathroom Remodel</option>
                <option value="basement">Basement Finishing</option>
                <option value="addition">Home Addition</option>
                <option value="wholehome">Whole Home Renovation</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="squareFootage">Square Footage</Label>
              <Input
                id="squareFootage"
                name="squareFootage"
                type="number"
                value={formState.squareFootage}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="materialsGrade">Materials Grade</Label>
                <select
                  id="materialsGrade"
                  name="materialsGrade"
                  value={formState.materialsGrade}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="economy">Economy (Budget-Friendly)</option>
                  <option value="mid">Mid-Grade (Standard)</option>
                  <option value="luxury">Luxury (High-End)</option>
                  <option value="premium">Premium (Designer)</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="complexity">Project Complexity</Label>
                <select
                  id="complexity"
                  name="complexity"
                  value={formState.complexity}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="simple">Simple (No Structural Changes)</option>
                  <option value="medium">Medium (Minor Structural Changes)</option>
                  <option value="complex">Complex (Major Structural Changes)</option>
                  <option value="custom">Custom (Architectural Design Required)</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="timeframe">Project Timeframe</Label>
              <select
                id="timeframe"
                name="timeframe"
                value={formState.timeframe}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="extended">Extended (Flexible Timeline)</option>
                <option value="standard">Standard (Normal Timeline)</option>
                <option value="expedited">Expedited (Accelerated Timeline)</option>
                <option value="rush">Rush (Urgent Completion)</option>
              </select>
            </div>
          </div>
        );
      
      default:
        return <p>Select a niche to see estimator options</p>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          Instant {niche.charAt(0).toUpperCase() + niche.slice(1)} Quote Estimator
        </CardTitle>
        <CardDescription>
          Generate a detailed quote estimate with AI insights based on your inputs
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="estimator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="estimator">Quote Estimator</TabsTrigger>
            <TabsTrigger value="result" disabled={!quoteResult}>
              Quote Result {!quoteResult && <Lock className="ml-2 h-3 w-3" />}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="estimator" className="space-y-6 pt-4">
            {renderInputForm()}
            
            <div className="pt-4">
              <Button
                onClick={generateQuote}
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? "Generating Quote..." : "Generate Quote Estimate"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="result" className="space-y-6 pt-4">
            {quoteResult && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="text-3xl font-bold">${quoteResult.totalCost.toLocaleString()}</p>
                    {quoteResult.monthlyPayment > 0 && (
                      <p className="text-xs text-muted-foreground">
                        or ${quoteResult.monthlyPayment}/month
                      </p>
                    )}
                  </div>
                  
                  <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      {niche === "remodeling" ? "Property Value Increase" : "Annual Savings"}
                    </p>
                    <p className="text-3xl font-bold">${quoteResult.savings.toLocaleString()}</p>
                    {niche !== "remodeling" && (
                      <p className="text-xs text-muted-foreground">
                        ${Math.round(quoteResult.savings / 12)}/month
                      </p>
                    )}
                  </div>
                  
                  <div className="bg-primary/10 rounded-lg p-4 flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      {niche === "remodeling" ? "Return on Investment" : "Payback Period"}
                    </p>
                    <p className="text-3xl font-bold">
                      {niche === "remodeling" 
                        ? `${quoteResult.roi}%` 
                        : quoteResult.paybackPeriod === Infinity 
                          ? "N/A" 
                          : `${quoteResult.paybackPeriod} years`}
                    </p>
                    {niche !== "remodeling" && quoteResult.paybackPeriod !== Infinity && (
                      <p className="text-xs text-muted-foreground">ROI: {quoteResult.roi}%</p>
                    )}
                  </div>
                </div>
                
                <div className="bg-card border rounded-lg p-6 mt-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                    AI Insights
                  </h3>
                  <ul className="space-y-2">
                    {quoteResult.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5 shrink-0">
                          {index + 1}
                        </Badge>
                        <p>{insight}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Visualized Projection</h3>
                  <div className="h-[300px]">
                    {niche === "remodeling" ? (
                      <QuoteChart
                        type="bar"
                        title="Cost & Value Breakdown"
                        data={quoteResult.chartData}
                        xKey="category"
                        yKeys={[
                          { key: "value", name: "Amount ($)", color: "#10b981" }
                        ]}
                      />
                    ) : (
                      <QuoteChart
                        type="area"
                        title={niche === "solar" ? "Solar Savings Over Time" : "HVAC Savings Over Time"}
                        data={quoteResult.chartData}
                        xKey="year"
                        yKeys={[
                          { key: "savings", name: "Cumulative Savings", color: "#2563eb" },
                          { key: "investment", name: "Investment", color: "#ef4444" }
                        ]}
                      />
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-md font-medium mb-4">Send or Download Your Quote</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleCustomerInfoChange}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={handleCustomerInfoChange}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleCustomerInfoChange}
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address (Optional)</Label>
                        <Input
                          id="address"
                          name="address"
                          value={customerInfo.address}
                          onChange={handleCustomerInfoChange}
                          placeholder="123 Main St"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <Button 
                        onClick={handleSendEmail}
                        className="flex-1"
                        disabled={!customerInfo.email}
                      >
                        <Send className="mr-2 h-4 w-4" /> Send via Email
                      </Button>
                      <Button 
                        onClick={handleDownload}
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" /> Download Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InstantQuoteEstimator;
