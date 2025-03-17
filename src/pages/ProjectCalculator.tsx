
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserContext";
import ProjectROICalculator from "@/components/ProjectROICalculator";
import { motion } from "framer-motion";

const ProjectCalculator = () => {
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Project ROI Calculator</h1>
            <p className="text-muted-foreground">
              Calculate return on investment for individual projects with detailed metrics and insights
            </p>
          </header>

          <Card className="p-6 shadow-sm border-border/60">
            <ProjectROICalculator />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCalculator;
