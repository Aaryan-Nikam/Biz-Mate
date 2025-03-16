
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { BarChart3, Calculator, Mail, ArrowRight, Sun, Wind, HomeIcon } from "lucide-react";
import { NicheType } from "@/components/NicheSelection";

const Dashboard = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const getNicheIcon = (niche?: NicheType) => {
    switch (niche) {
      case "solar":
        return <Sun className="h-10 w-10 text-yellow-500" />;
      case "hvac":
        return <Wind className="h-10 w-10 text-blue-500" />;
      case "remodeling":
        return <HomeIcon className="h-10 w-10 text-green-500" />;
      default:
        return <Calculator className="h-10 w-10 text-blue-500" />;
    }
  };

  const getNicheColor = (niche?: NicheType) => {
    switch (niche) {
      case "solar":
        return "from-yellow-50 to-orange-50";
      case "hvac":
        return "from-blue-50 to-indigo-50";
      case "remodeling":
        return "from-green-50 to-emerald-50";
      default:
        return "from-blue-50 to-indigo-50";
    }
  };

  const getNicheTitle = (niche?: NicheType) => {
    switch (niche) {
      case "solar":
        return "Solar Installation";
      case "hvac":
        return "HVAC Systems";
      case "remodeling":
        return "Home Remodeling";
      default:
        return "ROI Calculator";
    }
  };

  const getNicheDescription = (niche?: NicheType) => {
    switch (niche) {
      case "solar":
        return "Calculate ROI and savings for solar panel installations";
      case "hvac":
        return "Estimate costs and efficiency of HVAC system upgrades";
      case "remodeling":
        return "Plan your home renovation projects and calculate property value increases";
      default:
        return user.role === "homeowner" 
          ? "Generate ROI quotes for your home improvement projects" 
          : "Create detailed ROI estimates for your clients";
    }
  };

  const getFeaturedContent = (niche?: NicheType) => {
    switch (niche) {
      case "solar":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Avg. Solar Savings"
              value="$1,500"
              unit="per year"
              description="Average savings from solar installations"
              color="bg-yellow-50 text-yellow-700"
            />
            <MetricCard
              title="Typical ROI"
              value="8-12%"
              unit="annual return"
              description="Return on investment for solar installations"
              color="bg-orange-50 text-orange-700"
            />
            <MetricCard
              title="Break Even"
              value="7-9"
              unit="years"
              description="Average time to recoup installation costs"
              color="bg-amber-50 text-amber-700"
            />
          </div>
        );
      case "hvac":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Energy Savings"
              value="20-30%"
              unit="reduction"
              description="Typical energy usage reduction with new systems"
              color="bg-blue-50 text-blue-700"
            />
            <MetricCard
              title="Lifespan"
              value="15-20"
              unit="years"
              description="Average lifespan of modern HVAC systems"
              color="bg-sky-50 text-sky-700"
            />
            <MetricCard
              title="Efficiency Rating"
              value="16+"
              unit="SEER"
              description="Recommended minimum efficiency rating"
              color="bg-indigo-50 text-indigo-700"
            />
          </div>
        );
      case "remodeling":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Kitchen ROI"
              value="70-80%"
              unit="of cost"
              description="Typical value recouped from kitchen remodels"
              color="bg-green-50 text-green-700"
            />
            <MetricCard
              title="Bathroom ROI"
              value="60-70%"
              unit="of cost"
              description="Typical value recouped from bathroom remodels"
              color="bg-emerald-50 text-emerald-700"
            />
            <MetricCard
              title="Value Add"
              value="5-10%"
              unit="increase"
              description="Potential property value increase"
              color="bg-teal-50 text-teal-700"
            />
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard 
              icon={<Calculator className="h-10 w-10 text-blue-500" />}
              title="ROI Calculator"
              description="Generate detailed ROI quotes based on your inputs"
              action={() => navigate("/calculator")}
            />
            
            <DashboardCard 
              icon={<BarChart3 className="h-10 w-10 text-green-500" />}
              title="My Quotes"
              description="View and manage your saved ROI quotes"
              action={() => navigate("/quote")}
            />
            
            <DashboardCard 
              icon={<Mail className="h-10 w-10 text-purple-500" />}
              title="Send Quote"
              description="Email your ROI quotes to clients or yourself"
              action={() => navigate("/send")}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-16 md:ml-64 p-6">
        <header className="mb-8">
          <h1 className="heading-1 mb-2">Welcome to Your Dashboard</h1>
          <p className="subheading">
            {user.niche 
              ? `Your ${getNicheTitle(user.niche)} dashboard is ready`
              : user.role === "homeowner" 
                ? "Generate ROI quotes for your home improvement projects" 
                : "Create detailed ROI estimates for your clients"}
          </p>
        </header>

        {getFeaturedContent(user.niche)}

        <section className={`bg-gradient-to-r ${getNicheColor(user.niche)} rounded-2xl p-6 mb-8`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="heading-3 mb-4">{getNicheTitle(user.niche)} Quote Generator</h2>
              <p className="body-text mb-4">
                {getNicheDescription(user.niche)}
              </p>
            </div>
            <Button onClick={() => navigate("/calculator")} className="btn-primary">
              Create New Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {user.niche && (
          <section className="mb-8">
            <h2 className="heading-3 mb-4">Recent Insights</h2>
            <Card>
              <CardHeader>
                <CardTitle>Did You Know?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {user.niche === "solar" && "Solar panels typically last 25-30 years, but their efficiency can decrease by about 0.5% each year. Regular maintenance can optimize their performance and lifespan."}
                  {user.niche === "hvac" && "Upgrading to a high-efficiency HVAC system can reduce your energy consumption by up to 40%, leading to significant cost savings over the lifetime of the system."}
                  {user.niche === "remodeling" && "Kitchen remodels consistently rank among the highest ROI home improvement projects, often returning 70-80% of their cost at resale. Modern, energy-efficient kitchens are especially valuable."}
                </p>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: () => void;
}

const DashboardCard = ({ icon, title, description, action }: DashboardCardProps) => (
  <Card className="card-hover h-full">
    <CardHeader className="pb-2">
      {icon}
      <CardTitle className="mt-4">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <Button onClick={action} variant="outline" className="w-full">
        Open
      </Button>
    </CardContent>
  </Card>
);

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  description: string;
  color: string;
}

const MetricCard = ({ title, value, unit, description, color }: MetricCardProps) => (
  <Card className="card-hover h-full">
    <CardHeader className={`pb-2 ${color} rounded-t-lg`}>
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="pt-4">
      <div className="flex items-baseline">
        <span className="text-3xl font-bold">{value}</span>
        <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default Dashboard;
