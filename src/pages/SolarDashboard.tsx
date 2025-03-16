
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { Sun, BarChart3, TrendingUp, Calendar, Zap } from "lucide-react";
import InstantQuoteEstimator from "@/components/InstantQuoteEstimator";

const SolarDashboard = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user?.niche !== "solar") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-16 md:ml-64 p-6">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="h-6 w-6 text-yellow-500" />
            <h1 className="heading-1">Solar Dashboard</h1>
          </div>
          <p className="subheading">
            Generate solar quotes and monitor performance metrics
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Today's Production</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24.5 kWh</div>
              <p className="text-sm text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Monthly Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$183.75</div>
              <p className="text-sm text-muted-foreground">Based on current utility rates</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">CO₂ Offset</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2.8 tons</div>
              <p className="text-sm text-muted-foreground">Equivalent to planting 42 trees</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Solar Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Tip</Badge>
                    <p className="text-sm">Clean your panels every 6 months for optimal efficiency</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">Saving</Badge>
                    <p className="text-sm">Running appliances during daylight can increase direct solar usage</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Weather</Badge>
                    <p className="text-sm">Clear skies forecasted for the next 5 days - expect good production</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">System Size</span>
                    <span className="font-semibold">6.4 kW</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Panels</span>
                    <span className="font-semibold">20 × 320W</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Avg. Daily Production</span>
                    <span className="font-semibold">26.8 kWh</span>
                  </div>
                </div>
                
                <div className="flex justify-center items-center h-[200px] bg-muted/50 rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <Calendar className="h-8 w-8 mx-auto mb-2" />
                    <p>Production chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Solar Quote Estimator</h2>
          <InstantQuoteEstimator niche="solar" />
        </section>
      </div>
    </div>
  );
};

export default SolarDashboard;
