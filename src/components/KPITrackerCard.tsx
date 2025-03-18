
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowUpRight, LineChart, BarChart, PieChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface KPITrackerCardProps {
  className?: string;
}

const KPITrackerCard: React.FC<KPITrackerCardProps> = ({ className }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Only render for service providers
  if (user?.role !== "provider") {
    return null;
  }

  return (
    <Card className={`overflow-hidden border-0 shadow-lg ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-blue-50 to-sky-50 opacity-80 z-0"></div>
      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center text-indigo-700">
            <TrendingUp className="mr-2 h-5 w-5 text-indigo-500" />
            KPI Tracker & Analysis
          </CardTitle>
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse delay-75"></div>
            <div className="h-2 w-2 rounded-full bg-sky-500 animate-pulse delay-150"></div>
          </div>
        </div>
        <CardDescription className="text-slate-600">
          Track, analyze, and optimize your business metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3 relative z-10">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/80 rounded-lg p-3 flex flex-col items-center justify-center border border-indigo-100 shadow-sm">
            <div className="bg-indigo-100 p-2 rounded-full mb-2">
              <LineChart className="h-5 w-5 text-indigo-600" />
            </div>
            <p className="text-xs text-indigo-700 font-medium text-center">Performance Metrics</p>
          </div>
          <div className="bg-white/80 rounded-lg p-3 flex flex-col items-center justify-center border border-blue-100 shadow-sm">
            <div className="bg-blue-100 p-2 rounded-full mb-2">
              <BarChart className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-blue-700 font-medium text-center">Business Insights</p>
          </div>
          <div className="bg-white/80 rounded-lg p-3 flex flex-col items-center justify-center border border-sky-100 shadow-sm">
            <div className="bg-sky-100 p-2 rounded-full mb-2">
              <PieChart className="h-5 w-5 text-sky-600" />
            </div>
            <p className="text-xs text-sky-700 font-medium text-center">Strategic Goals</p>
          </div>
        </div>
        <div className="text-sm text-slate-600 bg-white/80 p-3 rounded-lg border border-sky-100">
          <p className="font-medium text-sky-700 mb-2">Key Performance Indicators:</p>
          <ul className="list-disc pl-5 text-xs space-y-1">
            <li>Project completion rates</li>
            <li>Customer satisfaction metrics</li>
            <li>Operational efficiency</li>
            <li>Lead conversion analysis</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="relative z-10">
        <Button 
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md"
          onClick={() => navigate("/kpi-tracker")}
        >
          View KPI Dashboard
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KPITrackerCard;
