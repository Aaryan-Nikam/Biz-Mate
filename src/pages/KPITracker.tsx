import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Download, TrendingUp, Lightbulb, AreaChart, BarChart, PieChart, LineChart } from "lucide-react";
import { toast } from "sonner";
import QuoteChart from "@/components/QuoteChart";

const metricCategories = {
  revenue: [
    { id: "totalRevenue", label: "Total Revenue", default: 0 },
    { id: "recurringRevenue", label: "Recurring Revenue", default: 0 },
    { id: "onetimeRevenue", label: "One-time Revenue", default: 0 },
    { id: "upsellRevenue", label: "Upsell Revenue", default: 0 },
  ],
  costs: [
    { id: "fixedOverheads", label: "Fixed Overheads", default: 0 },
    { id: "variableCosts", label: "Variable Costs", default: 0 },
    { id: "laborCosts", label: "Labor Costs", default: 0 },
    { id: "marketingSpend", label: "Marketing Spend", default: 0 },
    { id: "technologyTools", label: "Technology & Tools", default: 0 },
  ],
  marketing: [
    { id: "customerAcquisitionCost", label: "Customer Acquisition Cost", default: 0 },
    { id: "costPerLead", label: "Cost per Lead", default: 0 },
    { id: "conversionRate", label: "Conversion Rate (%)", default: 0 },
    { id: "roaS", label: "Return on Ad Spend", default: 0 },
  ],
  clients: [
    { id: "churnRate", label: "Churn Rate (%)", default: 0 },
    { id: "retentionRate", label: "Retention Rate (%)", default: 0 },
    { id: "nps", label: "Net Promoter Score", default: 0 },
    { id: "averageRevenuePerCustomer", label: "Avg Revenue Per Customer", default: 0 },
  ],
  operations: [
    { id: "utilizationRate", label: "Utilization Rate (%)", default: 0 },
    { id: "onTimeCompletion", label: "On-Time Completion (%)", default: 0 },
    { id: "jobCompletionRate", label: "Job Completion Rate (%)", default: 0 },
    { id: "averageHandlingTime", label: "Average Handling Time (hrs)", default: 0 },
  ],
  solar: [
    { id: "panelCapacity", label: "Panel Capacity (kW)", default: 0 },
    { id: "sunlightHours", label: "Sunlight Hours", default: 0 },
    { id: "energySavings", label: "Energy Savings", default: 0 },
    { id: "paybackPeriod", label: "Payback Period (years)", default: 0 },
  ],
  hvac: [
    { id: "seasonalEnergyUsage", label: "Seasonal Energy Usage", default: 0 },
    { id: "maintenanceIntervals", label: "Maintenance Intervals", default: 0 },
    { id: "efficiencyRatings", label: "Efficiency Ratings", default: 0 },
  ],
  remodeling: [
    { id: "materialsCost", label: "Materials Cost", default: 0 },
    { id: "laborToMaterialRatio", label: "Labor to Material Ratio", default: 0 },
    { id: "projectTimelines", label: "Project Timelines (days)", default: 0 },
  ],
};

const getNicheMetrics = (niche) => {
  switch (niche) {
    case "solar":
      return metricCategories.solar;
    case "hvac":
      return metricCategories.hvac;
    case "remodeling":
      return metricCategories.remodeling;
    default:
      return [];
  }
};

const getInitialFormState = (includeNicheMetrics = true, niche = null) => {
  const state = {
    ...Object.fromEntries(metricCategories.revenue.map(m => [m.id, m.default])),
    ...Object.fromEntries(metricCategories.costs.map(m => [m.id, m.default])),
    ...Object.fromEntries(metricCategories.marketing.map(m => [m.id, m.default])),
    ...Object.fromEntries(metricCategories.clients.map(m => [m.id, m.default])),
    ...Object.fromEntries(metricCategories.operations.map(m => [m.id, m.default])),
  };

  if (includeNicheMetrics && niche) {
    const nicheMetrics = getNicheMetrics(niche);
    return {
      ...state,
      ...Object.fromEntries(nicheMetrics.map(m => [m.id, m.default])),
    };
  }

  return state;
};

const KPITracker = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("daily");
  const [period, setPeriod] = useState("current");
  const [dailyFormState, setDailyFormState] = useState(() => getInitialFormState(true, user?.niche));
  const [monthlyFormState, setMonthlyFormState] = useState(() => getInitialFormState(true, user?.niche));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (user.role !== "provider") {
      toast.error("KPI Tracker is only available for service providers");
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (!user || user.role !== "provider") return null;

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? 0 : parseFloat(value);
    
    if (formType === "daily") {
      setDailyFormState(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setMonthlyFormState(prev => ({ ...prev, [name]: numericValue }));
    }
  };

  const handleSelectChange = (value, name, formType) => {
    if (formType === "daily") {
      setDailyFormState(prev => ({ ...prev, [name]: value }));
    } else {
      setMonthlyFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const calculateProfitMetrics = (formState) => {
    const totalRevenue = formState.totalRevenue || 
                        (formState.recurringRevenue + formState.onetimeRevenue + formState.upsellRevenue);
    
    const totalCosts = formState.fixedOverheads + 
                      formState.variableCosts + 
                      formState.laborCosts + 
                      formState.marketingSpend + 
                      formState.technologyTools;
    
    const grossProfit = totalRevenue - (formState.variableCosts + formState.laborCosts);
    const netProfit = totalRevenue - totalCosts;
    
    const grossProfitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
    const netProfitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    
    const roi = totalCosts > 0 ? (netProfit / totalCosts) * 100 : 0;
    
    const breakEven = formState.fixedOverheads / 
                      (totalRevenue > 0 && (formState.variableCosts + formState.laborCosts) < totalRevenue ? 
                      1 - ((formState.variableCosts + formState.laborCosts) / totalRevenue) : 1);
    
    return {
      totalRevenue,
      totalCosts,
      grossProfit,
      netProfit,
      grossProfitMargin,
      netProfitMargin,
      roi,
      breakEven,
    };
  };

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`${formType === "daily" ? "Daily" : "Monthly"} KPIs updated successfully!`);
      setActiveTab("analysis");
    }, 1000);
  };

  const handleDownload = () => {
    toast.success("Downloading KPI report...");
  };

  const dailyMetrics = calculateProfitMetrics(dailyFormState);
  const monthlyMetrics = calculateProfitMetrics(monthlyFormState);
  
  const metrics = activeTab === "daily" ? dailyMetrics : monthlyMetrics;

  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 16000 },
    { month: "May", revenue: 21000 },
    { month: "Jun", revenue: 24000 },
  ];

  const expenseData = [
    { category: "Fixed Overheads", value: monthlyFormState.fixedOverheads || 5000 },
    { category: "Variable Costs", value: monthlyFormState.variableCosts || 4000 },
    { category: "Labor", value: monthlyFormState.laborCosts || 8000 },
    { category: "Marketing", value: monthlyFormState.marketingSpend || 3000 },
    { category: "Technology", value: monthlyFormState.technologyTools || 2000 },
  ];

  const profitTrendData = [
    { month: "Jan", revenue: 12000, expenses: 9000, profit: 3000 },
    { month: "Feb", revenue: 15000, expenses: 10000, profit: 5000 },
    { month: "Mar", revenue: 18000, expenses: 12000, profit: 6000 },
    { month: "Apr", revenue: 16000, expenses: 11000, profit: 5000 },
    { month: "May", revenue: 21000, expenses: 13000, profit: 8000 },
    { month: "Jun", revenue: 24000, expenses: 15000, profit: 9000 },
  ];

  const renderMetricInputs = (metrics, formType) => {
    return metrics.map((metric) => (
      <div key={metric.id} className="mb-4">
        <Label htmlFor={metric.id}>{metric.label}</Label>
        <Input
          id={metric.id}
          name={metric.id}
          type="number"
          value={formType === "daily" ? dailyFormState[metric.id] : monthlyFormState[metric.id]}
          onChange={(e) => handleInputChange(e, formType)}
          className="mt-1"
          placeholder="0"
        />
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-16 md:ml-64 p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">KPI Tracker & Analysis</h1>
            <p className="text-muted-foreground">
              Track, analyze, and optimize your key performance indicators
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${metrics.totalRevenue.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">
                  {period === "current" ? "This month" : "Last month"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Net Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${metrics.netProfit.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">
                  Margin: {metrics.netProfitMargin.toFixed(1)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.roi.toFixed(1)}%</div>
                <p className="text-sm text-muted-foreground">
                  Break-even: ${metrics.breakEven.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="daily" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="daily">Daily KPIs</TabsTrigger>
              <TabsTrigger value="monthly">Monthly KPIs</TabsTrigger>
              <TabsTrigger value="analysis">Analysis & Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daily KPI Tracking</CardTitle>
                  <CardDescription>
                    Enter your daily metrics to track performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, "daily")}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Revenue & Jobs</h3>
                        {renderMetricInputs([
                          { id: "totalRevenue", label: "Total Daily Revenue ($)" },
                          { id: "jobsCompleted", label: "Jobs Completed" },
                          { id: "laborHours", label: "Labor Hours" },
                        ], "daily")}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Costs & Operations</h3>
                        {renderMetricInputs([
                          { id: "variableCosts", label: "Variable Costs ($)" },
                          { id: "laborCosts", label: "Labor Costs ($)" },
                          { id: "onTimeCompletion", label: "On-Time Completion (%)" },
                        ], "daily")}
                      </div>
                      
                      {user?.niche && (
                        <div className="col-span-1 md:col-span-2">
                          <Separator className="my-4" />
                          <h3 className="text-lg font-medium mb-4 capitalize">{user.niche}-Specific Metrics</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderMetricInputs(getNicheMetrics(user.niche), "daily")}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Daily KPIs"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monthly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly KPI Tracking</CardTitle>
                  <CardDescription>
                    Enter your monthly metrics for comprehensive business analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, "monthly")}>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Revenue Metrics</h3>
                          {renderMetricInputs(metricCategories.revenue, "monthly")}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Cost Metrics</h3>
                          {renderMetricInputs(metricCategories.costs, "monthly")}
                        </div>
                      </div>
                      
                      <Separator className="my-2" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Marketing & Sales</h3>
                          {renderMetricInputs(metricCategories.marketing, "monthly")}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Client Metrics</h3>
                          {renderMetricInputs(metricCategories.clients, "monthly")}
                        </div>
                      </div>
                      
                      <Separator className="my-2" />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Operational Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {renderMetricInputs(metricCategories.operations, "monthly")}
                        </div>
                      </div>
                      
                      {user?.niche && (
                        <>
                          <Separator className="my-2" />
                          <div>
                            <h3 className="text-lg font-medium mb-4 capitalize">{user.niche}-Specific Metrics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {renderMetricInputs(getNicheMetrics(user.niche), "monthly")}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Monthly KPIs"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Performance Analysis</h2>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Period</SelectItem>
                    <SelectItem value="previous">Previous Period</SelectItem>
                    <SelectItem value="ytd">Year-to-Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <QuoteChart
                  type="line"
                  title="Revenue Trend"
                  data={revenueData}
                  xKey="month"
                  yKeys={[
                    { key: "revenue", name: "Revenue", color: "#10b981" }
                  ]}
                />
                
                <QuoteChart
                  type="bar"
                  title="Expense Breakdown"
                  data={expenseData}
                  xKey="category"
                  yKeys={[
                    { key: "value", name: "Amount ($)", color: "#f43f5e" }
                  ]}
                />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Profit & Loss Analysis</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <QuoteChart
                    type="area"
                    title="Revenue vs. Expenses"
                    data={profitTrendData}
                    xKey="month"
                    yKeys={[
                      { key: "revenue", name: "Revenue", color: "#10b981" },
                      { key: "expenses", name: "Expenses", color: "#f43f5e" },
                      { key: "profit", name: "Profit", color: "#0ea5e9" }
                    ]}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                    AI-Driven Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-medium mb-2">Revenue Optimization</h4>
                    <p className="text-sm">Based on your current metrics, focusing on upsell opportunities could increase your revenue by 15-20%. Consider implementing a structured upsell program targeting your existing customers.</p>
                  </div>
                  
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-medium mb-2">Cost Management</h4>
                    <p className="text-sm">Your variable costs are currently 28% of revenue, which is 5% higher than industry average. Reviewing your supply chain and negotiating better terms with vendors could yield significant savings.</p>
                  </div>
                  
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-medium mb-2">Operational Efficiency</h4>
                    <p className="text-sm">Your on-time completion rate of 82% is good, but increasing it to 90% could improve customer satisfaction and generate more referrals. Consider reviewing your project management processes.</p>
                  </div>
                  
                  {user?.niche === "solar" && (
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h4 className="font-medium mb-2">Solar-Specific Insights</h4>
                      <p className="text-sm">Based on current sunlight hours data, optimizing panel placement could increase energy output by up to 12%. Consider offering panel optimization as an add-on service to existing customers.</p>
                    </div>
                  )}
                  
                  {user?.niche === "hvac" && (
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h4 className="font-medium mb-2">HVAC-Specific Insights</h4>
                      <p className="text-sm">Seasonal analysis shows higher demand in summer months. Consider launching a preventative maintenance program in spring to capture additional revenue and smooth out seasonal fluctuations.</p>
                    </div>
                  )}
                  
                  {user?.niche === "remodeling" && (
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h4 className="font-medium mb-2">Remodeling-Specific Insights</h4>
                      <p className="text-sm">Your labor to material ratio is above industry average. Optimizing work schedules and crew assignments could reduce labor costs by approximately 8-10% without impacting quality.</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download KPI Report
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default KPITracker;
