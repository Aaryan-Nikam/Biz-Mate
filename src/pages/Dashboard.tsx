
import React, { useEffect } from "react";
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
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user?.niche) {
      // Redirect to niche-specific dashboard
      switch (user.niche) {
        case "solar":
          navigate("/solar-dashboard");
          break;
        case "hvac":
          navigate("/hvac-dashboard");
          break;
        case "remodeling":
          navigate("/remodeling-dashboard");
          break;
      }
    }
  }, [isAuthenticated, navigate, user]);

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

  // This is the generic dashboard for users who haven't selected a niche yet
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-16 md:ml-64 p-6">
        <header className="mb-8">
          <h1 className="heading-1 mb-2">Welcome to Your Dashboard</h1>
          <p className="subheading">
            Please select a niche to continue
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Choose Your Niche</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button 
                  onClick={() => {
                    const { setUserNiche } = useUser();
                    setUserNiche("solar");
                    navigate("/solar-dashboard");
                  }}
                  variant="outline" 
                  className="h-40 flex flex-col gap-4"
                >
                  <Sun className="h-12 w-12 text-yellow-500" />
                  <div>
                    <h3 className="font-bold">Solar</h3>
                    <p className="text-sm text-muted-foreground">Solar panel installation and efficiency</p>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => {
                    const { setUserNiche } = useUser();
                    setUserNiche("hvac");
                    navigate("/hvac-dashboard");
                  }}
                  variant="outline" 
                  className="h-40 flex flex-col gap-4"
                >
                  <Wind className="h-12 w-12 text-blue-500" />
                  <div>
                    <h3 className="font-bold">HVAC</h3>
                    <p className="text-sm text-muted-foreground">Heating, ventilation, and cooling systems</p>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => {
                    const { setUserNiche } = useUser();
                    setUserNiche("remodeling");
                    navigate("/remodeling-dashboard");
                  }}
                  variant="outline" 
                  className="h-40 flex flex-col gap-4"
                >
                  <HomeIcon className="h-12 w-12 text-green-500" />
                  <div>
                    <h3 className="font-bold">Remodeling</h3>
                    <p className="text-sm text-muted-foreground">Home renovation and remodeling</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
