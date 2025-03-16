
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { HomeIcon, Hammer, TrendingUp, BarChart, PenTool } from "lucide-react";
import InstantQuoteEstimator from "@/components/InstantQuoteEstimator";

const RemodelingDashboard = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user?.niche !== "remodeling") {
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
            <HomeIcon className="h-6 w-6 text-green-500" />
            <h1 className="heading-1">Remodeling Dashboard</h1>
          </div>
          <p className="subheading">
            Generate remodeling quotes and track project information
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Home Value Estimate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$450,000</div>
              <p className="text-sm text-muted-foreground">+5.2% YoY appreciation</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Renovation Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$85,000</div>
              <p className="text-sm text-muted-foreground">For kitchen and bath remodel</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">ROI Potential</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">72%</div>
              <p className="text-sm text-muted-foreground">Based on local market trends</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Remodeling Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">Tip</Badge>
                    <p className="text-sm">Kitchen remodels typically return 70-80% of cost in home value</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 hover:bg-amber-100">Trend</Badge>
                    <p className="text-sm">Open concept designs remain popular for maximizing space</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Budget</Badge>
                    <p className="text-sm">Plan for 10-15% contingency for unexpected expenses</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Market Value Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Home Type</span>
                    <span className="font-semibold">Single Family, 3BR/2BA</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Square Footage</span>
                    <span className="font-semibold">2,200 sq ft</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Neighborhood Avg.</span>
                    <span className="font-semibold">$475,000</span>
                  </div>
                </div>
                
                <div className="flex justify-center items-center h-[200px] bg-muted/50 rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <BarChart className="h-8 w-8 mx-auto mb-2" />
                    <p>Home value trend chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Remodeling Quote Estimator</h2>
          <InstantQuoteEstimator niche="remodeling" />
        </section>
      </div>
    </div>
  );
};

export default RemodelingDashboard;
