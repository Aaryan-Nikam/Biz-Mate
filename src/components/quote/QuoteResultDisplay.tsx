
import React from "react";
import { Download, Send, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import QuoteChart from "../QuoteChart";

interface QuoteResultDisplayProps {
  quoteResult: {
    totalCost: number;
    monthlyPayment: number;
    savings: number;
    roi: number;
    paybackPeriod: number;
    insights: string[];
    chartData: any[];
  };
  customerInfo: {
    email: string;
    name: string;
    phone: string;
    address: string;
  };
  niche?: string;
}

const QuoteResultDisplay: React.FC<QuoteResultDisplayProps> = ({
  quoteResult,
  customerInfo,
  niche
}) => {
  const handleSendEmail = () => {
    if (!customerInfo.email) {
      toast.error("Please provide an email address to send the quote");
      return;
    }
    
    toast.success(`Quote sent to ${customerInfo.email}`);
  };

  const handleDownload = () => {
    toast.success("Downloading your quote estimate...");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground">Total Cost</p>
          <p className="text-3xl font-bold text-blue-700">${quoteResult.totalCost.toLocaleString()}</p>
          {quoteResult.monthlyPayment > 0 && (
            <p className="text-xs text-muted-foreground">
              or ${quoteResult.monthlyPayment}/month
            </p>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground">
            {niche === "remodeling" ? "Property Value Increase" : "Annual Savings"}
          </p>
          <p className="text-3xl font-bold text-emerald-600">${quoteResult.savings.toLocaleString()}</p>
          {niche !== "remodeling" && (
            <p className="text-xs text-muted-foreground">
              ${Math.round(quoteResult.savings / 12)}/month
            </p>
          )}
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground">ROI</p>
          <p className="text-3xl font-bold text-amber-600">{quoteResult.roi}%</p>
          <p className="text-xs text-muted-foreground">
            {quoteResult.paybackPeriod < Infinity 
              ? `Payback in ${quoteResult.paybackPeriod} years` 
              : "Long-term investment"}
          </p>
        </div>
      </div>
      
      <div className="mt-8 space-y-8">
        <div>
          <div className="h-[350px] overflow-hidden rounded-t-lg border border-slate-200">
            <QuoteChart
              type="bar"
              title="Cost Analysis"
              data={quoteResult.chartData.slice(0, 3)}
              xKey="category" 
              yKeys={[
                { key: "value", name: "Amount", color: "#8B5CF6" }
              ]}
            />
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-b-lg border-x border-b border-slate-200">
            <h4 className="font-medium text-purple-700 mb-2 flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-purple-500" />
              Cost Analysis Insight
            </h4>
            <p className="text-sm text-slate-700">{quoteResult.insights[0]}</p>
          </div>
        </div>
        
        {niche !== "remodeling" && (
          <div>
            <div className="h-[350px] overflow-hidden rounded-t-lg border border-slate-200">
              <QuoteChart
                type="area"
                title="Savings Projection"
                data={quoteResult.chartData}
                xKey="year"
                yKeys={[
                  { key: "savings", name: "Cumulative Savings", color: "#10B981" },
                  { key: "investment", name: "Initial Investment", color: "#F97316" }
                ]}
              />
            </div>
            <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-b-lg border-x border-b border-slate-200">
              <h4 className="font-medium text-emerald-700 mb-2 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-emerald-500" />
                Savings Insight
              </h4>
              <p className="text-sm text-slate-700">{quoteResult.insights[1]}</p>
            </div>
          </div>
        )}
        
        {niche === "remodeling" && (
          <div>
            <div className="h-[350px] overflow-hidden rounded-t-lg border border-slate-200">
              <QuoteChart
                type="bar"
                title="Value Comparison"
                data={quoteResult.chartData.filter(item => 
                  ["Project Cost", "Property Value Increase"].includes(item.category))}
                xKey="category"
                yKeys={[
                  { key: "value", name: "Amount", color: "#EC4899" }
                ]}
              />
            </div>
            <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-b-lg border-x border-b border-slate-200">
              <h4 className="font-medium text-pink-700 mb-2 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-pink-500" />
                Value Insight
              </h4>
              <p className="text-sm text-slate-700">{quoteResult.insights[1]}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm">
        <h4 className="font-medium flex items-center text-indigo-700 mb-3">
          <Lightbulb className="mr-2 h-5 w-5 text-indigo-500" />
          Expert Recommendations
        </h4>
        <div className="space-y-3">
          {quoteResult.insights.slice(2).map((insight, index) => (
            <div key={index} className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5 bg-white/80 shrink-0 text-indigo-700 border-indigo-200">
                {index + 1}
              </Badge>
              <p className="text-sm text-slate-700">{insight}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Button 
          variant="outline" 
          className="flex items-center justify-center"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Quote
        </Button>
        <Button 
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
          onClick={handleSendEmail}
        >
          <Send className="mr-2 h-4 w-4" />
          Send to Email
        </Button>
      </div>
    </div>
  );
};

export default QuoteResultDisplay;
