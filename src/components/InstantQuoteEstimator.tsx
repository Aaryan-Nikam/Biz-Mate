
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { NicheType } from "./NicheSelection";
import SolarEstimatorForm from "./quote/SolarEstimatorForm";
import HVACEstimatorForm from "./quote/HVACEstimatorForm";
import RemodelingEstimatorForm from "./quote/RemodelingEstimatorForm";
import QuoteResultDisplay from "./quote/QuoteResultDisplay";
import { 
  calculateSolarQuote, 
  calculateHVACQuote, 
  calculateRemodelingQuote,
  QuoteEstimateResult 
} from "@/utils/quoteCalculations";

export interface InstantQuoteEstimatorProps {
  niche?: NicheType;
  onComplete?: (data: any) => void;
}

const InstantQuoteEstimator: React.FC<InstantQuoteEstimatorProps> = ({ niche, onComplete }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [quoteResult, setQuoteResult] = useState<QuoteEstimateResult | null>(null);
  const [activeTab, setActiveTab] = useState<string>("estimator");
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
        return {
          // Default values for when no niche is selected
          systemSize: 5,
          roofType: "asphalt",
          sunExposure: "full",
          electricBill: 200,
          financing: "cash"
        };
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
      try {
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
              totalCost: 10000,
              monthlyPayment: 200,
              paybackPeriod: 5,
              roi: 15,
              savings: 2000,
              insights: [
                "This is a default quote estimation.",
                "Select a specific niche for more accurate results.",
                "The numbers shown are just for demonstration purposes."
              ],
              chartData: Array.from({ length: 10 }, (_, i) => ({
                year: i + 1,
                savings: 2000 * (i + 1),
                investment: i === 0 ? 10000 : 0
              }))
            };
        }
        
        setQuoteResult(result);
        setActiveTab("result");
        
        // Call onComplete callback with the result data
        if (onComplete) {
          // Generate a more complete data object to pass back
          const quoteData = {
            customerInfo,
            totalAmount: result.totalCost,
            monthlyPayment: result.monthlyPayment,
            roi: result.roi,
            savings: result.savings,
            profitMargin: Math.round((result.roi / 2) * 10) / 10, // Simplified calculation for demo
            paybackPeriod: result.paybackPeriod,
            laborCost: Math.round(result.totalCost * 0.4),
            materialsCost: Math.round(result.totalCost * 0.4),
            overheadCost: Math.round(result.totalCost * 0.2),
            monthlyRevenue: Math.round(result.savings / 12),
            monthlyCost: Math.round((result.totalCost / result.paybackPeriod) / 12),
            insights: result.insights
          };
          
          onComplete(quoteData);
        }
        
        toast.success("Quote estimate generated successfully!");
      } catch (error) {
        toast.error("Error calculating quote");
        console.error(error);
      } finally {
        setIsGenerating(false);
      }
    }, 1500);
  };

  const renderInputForm = () => {
    if (!niche) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Please select a niche to see the quote estimator options.</p>
        </div>
      );
    }
    
    switch (niche) {
      case "solar":
        return (
          <SolarEstimatorForm
            formState={formState}
            handleInputChange={handleInputChange}
            handleSliderChange={handleSliderChange}
            onGenerateQuote={generateQuote}
            isGenerating={isGenerating}
          />
        );
      
      case "hvac":
        return (
          <HVACEstimatorForm
            formState={formState}
            handleInputChange={handleInputChange}
            handleSliderChange={handleSliderChange}
          />
        );
        
      case "remodeling":
        return (
          <RemodelingEstimatorForm
            formState={formState}
            handleInputChange={handleInputChange}
          />
        );
      
      default:
        return <p>Select a niche to see estimator options</p>;
    }
  };

  const renderCustomerInfoForm = () => (
    <div className="border-t pt-6 mt-6">
      <h3 className="text-lg font-medium mb-4">Customer Information</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleCustomerInfoChange}
              placeholder="John Doe"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={customerInfo.email}
              onChange={handleCustomerInfoChange}
              placeholder="john@example.com"
              className="mt-2"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={customerInfo.phone}
            onChange={handleCustomerInfoChange}
            placeholder="(123) 456-7890"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            name="address"
            value={customerInfo.address}
            onChange={handleCustomerInfoChange}
            placeholder="123 Main St, City, State, Zip"
            rows={2}
            className="mt-2"
          />
        </div>
        
        {niche !== "solar" && (
          <div className="pt-4">
            <Button
              onClick={generateQuote}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating Quote..." : "Generate Quote Estimate"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Instant {niche ? `${niche.charAt(0).toUpperCase()}${niche.slice(1)}` : ""} Quote Estimator
        </h2>
        <p className="text-muted-foreground">
          Enter your project details to get an instant quote estimate
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="estimator">Quote Estimator</TabsTrigger>
          <TabsTrigger value="result" disabled={!quoteResult}>
            Quote Result {!quoteResult && <Lock className="ml-2 h-3 w-3" />}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="estimator" className="space-y-6 pt-4">
          {renderInputForm()}
          {renderCustomerInfoForm()}
        </TabsContent>
        
        <TabsContent value="result" className="pt-4">
          {quoteResult && (
            <QuoteResultDisplay 
              quoteResult={quoteResult} 
              customerInfo={customerInfo}
              niche={niche}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstantQuoteEstimator;
