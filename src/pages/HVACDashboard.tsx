
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { Wind, Thermometer, TrendingDown, Calendar, Zap } from "lucide-react";
import InstantQuoteEstimator from "@/components/InstantQuoteEstimator";

const HVACDashboard = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user?.niche !== "hvac") {
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
            <Wind className="h-6 w-6 text-blue-500" />
            <h1 className="heading-1">HVAC Dashboard</h1>
          </div>
          <p className="subheading">
            Generate HVAC quotes and monitor system performance
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-sky-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Indoor Temperature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">72°F</div>
              <p className="text-sm text-muted-foreground">Within optimal range</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Energy Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18 kWh</div>
              <p className="text-sm text-muted-foreground">-12% from last week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Efficiency Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">SEER 16</div>
              <p className="text-sm text-muted-foreground">Above average efficiency</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>HVAC Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Tip</Badge>
                    <p className="text-sm">Replace filters every 1-3 months for optimal efficiency</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">Saving</Badge>
                    <p className="text-sm">Each degree above 72°F in summer can save 3-5% on cooling costs</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-purple-100 text-purple-700 hover:bg-purple-100">Maintenance</Badge>
                    <p className="text-sm">Schedule your seasonal tune-up for optimal performance</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">System Type</span>
                    <span className="font-semibold">Split Heat Pump</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Capacity</span>
                    <span className="font-semibold">3 Tons (36,000 BTU)</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Age</span>
                    <span className="font-semibold">4 years</span>
                  </div>
                </div>
                
                <div className="flex justify-center items-center h-[200px] bg-muted/50 rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <Thermometer className="h-8 w-8 mx-auto mb-2" />
                    <p>Temperature and usage chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">HVAC Quote Estimator</h2>
          <InstantQuoteEstimator niche="hvac" />
        </section>
      </div>
    </div>
  );
};

export default HVACDashboard;
