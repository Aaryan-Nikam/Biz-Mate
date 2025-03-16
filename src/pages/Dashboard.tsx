
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { BarChart3, Calculator, Mail, ArrowRight } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-16 md:ml-64 p-6">
        <header className="mb-8">
          <h1 className="heading-1 mb-2">Welcome to Your Dashboard</h1>
          <p className="subheading">
            {user.role === "homeowner" 
              ? "Generate ROI quotes for your home improvement projects" 
              : "Create detailed ROI estimates for your clients"}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
          <h2 className="heading-3 mb-4">Get Started with ROI Calculations</h2>
          <p className="body-text mb-4">
            {user.role === "homeowner"
              ? "Input your project costs and expected benefits to see your return on investment."
              : "Create professional ROI estimates for your clients with our easy-to-use calculator."}
          </p>
          <Button onClick={() => navigate("/calculator")} className="btn-primary">
            Go to Calculator <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>
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

export default Dashboard;
