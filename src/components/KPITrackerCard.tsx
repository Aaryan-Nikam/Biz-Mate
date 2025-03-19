
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
    <Card className={`h-full cursor-pointer hover:shadow-md border-primary/20 hover:border-primary/50 transition-all ${className}`}>
      <CardHeader className="pb-2">
        <TrendingUp className="h-8 w-8 text-primary mb-2" />
        <CardTitle className="text-xl">
          KPI Tracker & Analysis
        </CardTitle>
        <CardDescription>
          Track, analyze, and optimize your business metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Monitor key performance indicators including lead conversion, customer satisfaction, 
          and project profitability with comprehensive analytics and visualizations.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="secondary" 
          className="w-full"
          onClick={() => navigate("/kpi-tracker")}
        >
          View KPI Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KPITrackerCard;
