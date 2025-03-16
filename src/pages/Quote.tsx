
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserContext";
import QuoteSummary from "@/components/QuoteSummary";
import QuoteChart from "@/components/QuoteChart";
import { Send, Download, Search, PlusCircle, FilterX } from "lucide-react";
import { HomeownerResult } from "@/utils/calculationUtils";
import { NicheType } from "@/components/NicheSelection";

// Function to create mock quotes based on niche
const createMockQuotes = (niche?: NicheType) => {
  const baseQuotes = [
    {
      id: "q1",
      title: "Default Quote 1",
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
      title: "Default Quote 2",
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

  switch (niche) {
    case "solar":
      return [
        {
          id: "solar1",
          title: "5kW Solar Installation",
          date: "2023-11-05",
          roiPercentage: 14.2,
          totalInvestment: 18500,
          annualSavings: 2627,
          breakEvenMonths: 84,
          monthlyData: Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            value: 2627 / 12 * (i + 1)
          })),
          yearlyData: Array.from({ length: 10 }, (_, i) => ({
            year: i + 1,
            value: 2627 * (i + 1)
          }))
        },
        {
          id: "solar2",
          title: "7.5kW Solar with Battery",
          date: "2023-12-12",
          roiPercentage: 11.8,
          totalInvestment: 29500,
          annualSavings: 3481,
          breakEvenMonths: 102,
          monthlyData: Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            value: 3481 / 12 * (i + 1)
          })),
          yearlyData: Array.from({ length: 10 }, (_, i) => ({
            year: i + 1,
            value: 3481 * (i + 1)
          }))
        }
      ];
    case "hvac":
      return [
        {
          id: "hvac1",
          title: "High-Efficiency Heat Pump",
          date: "2023-08-18",
          roiPercentage: 9.5,
          totalInvestment: 12000,
          annualSavings: 1140,
          breakEvenMonths: 126,
          monthlyData: Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            value: 1140 / 12 * (i + 1)
          })),
          yearlyData: Array.from({ length: 10 }, (_, i) => ({
            year: i + 1,
            value: 1140 * (i + 1)
          }))
        },
        {
          id: "hvac2",
          title: "Ductless Mini-Split System",
          date: "2023-10-05",
          roiPercentage: 10.2,
          totalInvestment: 8500,
          annualSavings: 867,
          breakEvenMonths: 118,
          monthlyData: Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            value: 867 / 12 * (i + 1)
          })),
          yearlyData: Array.from({ length: 10 }, (_, i) => ({
            year: i + 1,
            value: 867 * (i + 1)
          }))
        }
      ];
    case "remodeling":
      return [
        {
          id: "remodel1",
          title: "Kitchen Remodel",
          date: "2023-09-25",
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
        },
        {
          id: "remodel2",
          title: "Bathroom Renovation",
          date: "2023-11-15",
          roiPercentage: 7.8,
          totalInvestment: 18000,
          annualSavings: 1404,
          breakEvenMonths: 154,
          monthlyData: Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            value: 1404 / 12 * (i + 1)
          })),
          yearlyData: Array.from({ length: 10 }, (_, i) => ({
            year: i + 1,
            value: 1404 * (i + 1)
          }))
        }
      ];
    default:
      return baseQuotes;
  }
};

// Create mock data for the homeowner result - making sure it matches HomeownerResult type
const createMockHomeownerResult = (quote: any): HomeownerResult => {
  const annualMaintenance = quote.totalInvestment * 0.02;
  const monthlyPayment = quote.totalInvestment / quote.breakEvenMonths;
  const loanTerm = Math.ceil(quote.breakEvenMonths / 12);
  
  return {
    monthlyPayment: monthlyPayment,
    annualMaintenance: annualMaintenance,
    firstYearNetSavings: quote.annualSavings - annualMaintenance,
    firstYearROI: quote.roiPercentage,
    breakEvenMonths: quote.breakEvenMonths,
    totalSavings: quote.annualSavings * 10, // 10-year savings
    totalCost: quote.totalInvestment + (annualMaintenance * 10), // Total cost including maintenance
    yearlyProjections: Array.from({ length: 10 }, (_, i) => ({
      year: i + 1,
      annualSavings: quote.annualSavings,
      annualCost: annualMaintenance + (monthlyPayment * 12),
      netSavings: quote.annualSavings - annualMaintenance - (monthlyPayment * 12),
      cumulativeReturn: (quote.annualSavings - annualMaintenance - (monthlyPayment * 12)) * (i + 1),
      roi: quote.roiPercentage
    }))
  };
};

const Quote = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  
  // Get niche-specific quotes
  const allQuotes = createMockQuotes(user?.niche);
  const [selectedQuote, setSelectedQuote] = useState(allQuotes[0]);
  
  // Filter quotes based on search query
  const filteredQuotes = allQuotes.filter(quote => 
    quote.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.date.includes(searchQuery)
  );
  
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
    toast.success("Redirecting to send quote page");
  };
  
  const handleDownload = () => {
    toast.success("Quote PDF is being generated");
    // In a real app, this would generate and download a PDF
    setTimeout(() => {
      toast.success("Quote downloaded successfully");
    }, 1500);
  };
  
  const handleCreateQuote = () => {
    navigate("/calculator");
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
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Saved Quotes</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleCreateQuote}
                    className="text-primary hover:text-primary/90"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search quotes..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8"
                      onClick={() => setSearchQuery("")}
                    >
                      <FilterX className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {filteredQuotes.length > 0 ? (
                    filteredQuotes.map(quote => (
                      <Button
                        key={quote.id}
                        variant={selectedQuote.id === quote.id ? "default" : "outline"}
                        className="w-full justify-start h-auto py-3 px-4"
                        onClick={() => setSelectedQuote(quote)}
                      >
                        <div className="text-left">
                          <div className="font-medium">{quote.title}</div>
                          <div className="text-xs text-muted-foreground">{quote.date}</div>
                          <div className="text-xs mt-1">ROI: {quote.roiPercentage.toFixed(1)}%</div>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No quotes found</p>
                      <Button 
                        variant="link" 
                        className="mt-2"
                        onClick={() => setSearchQuery("")}
                      >
                        Clear search
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              {filteredQuotes.length > 0 && (
                <CardFooter className="pt-0 pb-4 px-4">
                  <p className="text-xs text-muted-foreground">
                    Showing {filteredQuotes.length} of {allQuotes.length} quotes
                  </p>
                </CardFooter>
              )}
            </Card>
          </div>

          <div className="lg:col-span-3">
            {selectedQuote ? (
              <Card>
                <CardHeader className="border-b flex flex-row items-center justify-between">
                  <CardTitle>{selectedQuote.title}</CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleSendEmail}
                    >
                      <Send className="mr-2 h-4 w-4" /> Send
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleDownload}
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
                          { key: "value", name: "Monthly Savings", color: "#2563eb" }
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
            ) : (
              <Card className="h-[400px] flex items-center justify-center">
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">No quote selected or no quotes available</p>
                  <Button onClick={handleCreateQuote}>
                    Create New Quote
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
