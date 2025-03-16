
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserContext";
import QuoteSummary from "@/components/QuoteSummary";
import QuoteChart from "@/components/QuoteChart";
import { Send, Download } from "lucide-react";

// Mock quote data - in a real app, this would come from your database
const mockQuotes = [
  {
    id: "q1",
    title: "Solar Panel Installation",
    date: "2023-09-15",
    roiPercentage: 12.5,
    totalInvestment: 15000,
    annualSavings: 1875,
    breakEvenMonths: 96,
    monthlyData: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      value: 1875 / 12 * (i + 1)
    })),
    yearlyData: Array.from({ length: 10 }, (_, i) => ({
      year: i + 1,
      value: 1875 * (i + 1)
    }))
  },
  {
    id: "q2",
    title: "Kitchen Remodel",
    date: "2023-10-20",
    roiPercentage: 8.2,
    totalInvestment: 25000,
    annualSavings: 2050,
    breakEvenMonths: 146,
    monthlyData: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      value: 2050 / 12 * (i + 1)
    })),
    yearlyData: Array.from({ length: 10 }, (_, i) => ({
      year: i + 1,
      value: 2050 * (i + 1)
    }))
  }
];

// Create mock data for the homeowner result
const createMockHomeownerResult = (quote: any) => {
  return {
    initialInvestment: quote.totalInvestment,
    monthlyPayment: quote.totalInvestment / quote.breakEvenMonths,
    annualMaintenance: quote.totalInvestment * 0.02,
    firstYearROI: quote.roiPercentage,
    firstYearNetSavings: quote.annualSavings - (quote.totalInvestment * 0.02),
    breakEvenMonths: quote.breakEvenMonths,
    totalSavings: quote.annualSavings * 10, // 10-year savings
    yearlyProjections: Array.from({ length: 10 }, (_, i) => ({
      year: i + 1,
      annualSavings: quote.annualSavings,
      annualCost: quote.totalInvestment * 0.02 + (quote.totalInvestment / quote.breakEvenMonths) * 12,
      netSavings: quote.annualSavings - (quote.totalInvestment * 0.02) - ((quote.totalInvestment / quote.breakEvenMonths) * 12)
    }))
  };
};

const Quote = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [selectedQuote, setSelectedQuote] = useState(mockQuotes[0]);
  const [activeTab, setActiveTab] = useState("summary");
  
  // Create mock homeowner result from the selected quote
  const mockHomeownerResult = createMockHomeownerResult(selectedQuote);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;
  
  const handleSendEmail = () => {
    navigate("/send");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-16 md:ml-64 p-6">
        <header className="mb-8">
          <h1 className="heading-1 mb-2">My Quotes</h1>
          <p className="subheading">View and manage your saved ROI quotes</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Saved Quotes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockQuotes.map(quote => (
                    <Button
                      key={quote.id}
                      variant={selectedQuote.id === quote.id ? "default" : "outline"}
                      className="w-full justify-start h-auto py-3 px-4"
                      onClick={() => setSelectedQuote(quote)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{quote.title}</div>
                        <div className="text-xs text-muted-foreground">{quote.date}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="border-b flex flex-row items-center justify-between">
                <CardTitle>{selectedQuote.title}</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate("/send")}
                  >
                    <Send className="mr-2 h-4 w-4" /> Send
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly View</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly View</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary" className="mt-0">
                    <QuoteSummary 
                      type="homeowner" 
                      result={mockHomeownerResult} 
                      onSendEmail={handleSendEmail} 
                    />
                  </TabsContent>
                  
                  <TabsContent value="monthly" className="mt-0">
                    <QuoteChart 
                      type="bar"
                      title="Monthly Savings Projection"
                      data={selectedQuote.monthlyData} 
                      xKey="month" 
                      yKeys={[
                        { key: "value", name: "Savings", color: "#2563eb" }
                      ]}
                    />
                  </TabsContent>
                  
                  <TabsContent value="yearly" className="mt-0">
                    <QuoteChart 
                      type="area"
                      title="Yearly Savings Projection"
                      data={selectedQuote.yearlyData} 
                      xKey="year" 
                      yKeys={[
                        { key: "value", name: "Cumulative Savings", color: "#10b981" }
                      ]}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
