
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Calendar, Download, Mail, Printer } from "lucide-react";
import { toast } from "sonner";
import { HomeownerResult, ProviderResult } from "@/utils/calculationUtils";
import QuoteChart from "./QuoteChart";

interface QuoteSummaryProps {
  type: "homeowner" | "provider";
  result: HomeownerResult | ProviderResult;
  onSendEmail: () => void;
}

const QuoteSummary: React.FC<QuoteSummaryProps> = ({ type, result, onSendEmail }) => {
  const isHomeowner = type === "homeowner";
  const homeownerResult = isHomeowner ? (result as HomeownerResult) : null;
  const providerResult = !isHomeowner ? (result as ProviderResult) : null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const handlePrint = () => {
    window.print();
    toast.success("Printing quote summary...");
  };

  const handleDownload = () => {
    toast.success("Downloading PDF...");
    // Placeholder for PDF download functionality
  };

  const getTitle = () => {
    return isHomeowner 
      ? "Home Investment ROI Analysis" 
      : "Service Business ROI Analysis";
  };

  const getDescription = () => {
    return isHomeowner
      ? "Detailed analysis of your home investment return on investment"
      : "Comprehensive analysis of your service business performance";
  };

  const renderHomeownerSummary = () => {
    if (!homeownerResult) return null;

    // Prepare data for years chart
    const yearlyData = homeownerResult.yearlyProjections.slice(0, 5).map((year) => ({
      year: `Year ${year.year}`,
      savings: Math.round(year.annualSavings),
      costs: Math.round(year.annualCost),
      netSavings: Math.round(year.netSavings)
    }));

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardDescription>First Year ROI</CardDescription>
              <CardTitle className="text-3xl">{formatPercent(homeownerResult.firstYearROI)}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardDescription>Breakeven Point</CardDescription>
              <CardTitle className="text-3xl">
                {Math.floor(homeownerResult.breakEvenMonths / 12)} years, {homeownerResult.breakEvenMonths % 12} months
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardDescription>Total 10-Year Savings</CardDescription>
              <CardTitle className="text-3xl">{formatCurrency(homeownerResult.totalSavings)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Your investment will break even in {Math.floor(homeownerResult.breakEvenMonths / 12)} years and {homeownerResult.breakEvenMonths % 12} months</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>First year net savings: {formatCurrency(homeownerResult.firstYearNetSavings)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Monthly payment: {formatCurrency(homeownerResult.monthlyPayment)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Annual maintenance: {formatCurrency(homeownerResult.annualMaintenance)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>After 10 years, your total return will be {formatCurrency(homeownerResult.totalSavings)}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <QuoteChart
            type="bar"
            title="5-Year Projection"
            data={yearlyData}
            xKey="year"
            yKeys={[
              { key: "savings", name: "Annual Savings", color: "#2563eb" },
              { key: "costs", name: "Annual Costs", color: "#ef4444" },
              { key: "netSavings", name: "Net Savings", color: "#10b981" }
            ]}
            height={300}
          />
        </div>
      </>
    );
  };

  const renderProviderSummary = () => {
    if (!providerResult) return null;

    // Prepare data for revenue chart
    const yearlyData = providerResult.yearlyProjections.map((year) => ({
      year: `Year ${year.year}`,
      revenue: Math.round(year.revenue),
      expenses: Math.round(year.expenses),
      profit: Math.round(year.profit)
    }));

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardDescription>Monthly Revenue</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(providerResult.monthlyRevenue)}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardDescription>Monthly Profit</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(providerResult.monthlyProfit)}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardDescription>Profit Margin</CardDescription>
              <CardTitle className="text-2xl">{formatPercent(providerResult.profitMargin)}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardDescription>ROI</CardDescription>
              <CardTitle className="text-2xl">{formatPercent(providerResult.monthlyROI)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Business Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Your business generates {formatCurrency(providerResult.annualRevenue)} in annual revenue</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Cost per job: {formatCurrency(providerResult.costPerJob)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Profit per job: {formatCurrency(providerResult.profitPerJob)}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>You need {providerResult.breakevenJobs.toFixed(1)} jobs per month to break even</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>5-year projected revenue: {formatCurrency(providerResult.yearlyProjections[4].revenue)}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <QuoteChart
            type="area"
            title="5-Year Revenue & Profit Projection"
            data={yearlyData}
            xKey="year"
            yKeys={[
              { key: "revenue", name: "Revenue", color: "#2563eb" },
              { key: "profit", name: "Profit", color: "#10b981" }
            ]}
            height={300}
          />
        </div>
      </>
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto print:max-w-full"
    >
      <Card className="print:shadow-none print:border-none">
        <CardHeader className="print:pb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
            <div>
              <Badge variant="outline" className="mb-2">
                {isHomeowner ? "Home Investment" : "Business Analysis"}
              </Badge>
              <CardTitle>{getTitle()}</CardTitle>
              <CardDescription>{getDescription()}</CardDescription>
            </div>
            <div className="flex items-center space-x-2 sm:self-end">
              <p className="text-sm text-muted-foreground flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          
          {/* Print-friendly header */}
          <div className="hidden print:block print:mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">{getTitle()}</h1>
                <p className="text-gray-500">{getDescription()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Generated on: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {isHomeowner ? renderHomeownerSummary() : renderProviderSummary()}
          
          <Card className="bg-primary/5 print:hidden">
            <CardHeader>
              <CardTitle className="text-lg">Ready to take the next step?</CardTitle>
              <CardDescription>
                {isHomeowner 
                  ? "Get a detailed ROI report sent to your email or speak with a specialist" 
                  : "Share this analysis with your team or speak with a business consultant"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex items-center gap-2"
                  onClick={onSendEmail}
                >
                  <Mail className="h-4 w-4" />
                  Send via Email
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4" />
                  Print Analysis
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
        
        <CardFooter className="print:hidden">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">ROI Mate Quote Generator</span>
            </div>
            <p className="text-xs text-muted-foreground">Results are estimates based on provided inputs</p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuoteSummary;
