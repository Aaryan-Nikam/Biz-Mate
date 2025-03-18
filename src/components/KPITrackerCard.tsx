
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface KPITrackerCardProps {
  className?: string;
}

const KPITrackerCard: React.FC<KPITrackerCardProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          KPI Tracker & Analysis
        </CardTitle>
        <CardDescription>
          Track, analyze, and optimize your business performance
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-primary/10 rounded-lg p-3 flex flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground">Analytics</p>
            <p className="text-sm font-medium">Track Performance</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-3 flex flex-col items-center justify-center">
            <p className="text-xs text-muted-foreground">Insights</p>
            <p className="text-sm font-medium">Optimize Business</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Track comprehensive metrics across revenue, costs, clients, and operations.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
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
