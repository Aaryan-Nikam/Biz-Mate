
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RoleSelection from "@/components/RoleSelection";
import { ArrowRight } from "lucide-react";
import { useUser } from "@/context/UserContext";

const Index = () => {
  const navigate = useNavigate();
  const { setUserRole } = useUser();

  const handleRoleSelect = (role: "homeowner" | "provider") => {
    setUserRole(role);
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="heading-1 text-blue-600 mb-4">
            ROI Quote Genius
          </h1>
          <p className="subheading mb-8 max-w-2xl">
            Generate detailed ROI quotes for home improvements and service-based businesses. 
            Select your role below to get started with personalized insights.
          </p>

          <RoleSelection onSelectRole={handleRoleSelect} />

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => navigate("/signup")} 
              className="btn-primary w-full sm:w-auto"
            >
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")} 
              className="w-full sm:w-auto"
            >
              Login to Existing Account
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Feature Highlights */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="heading-2 text-center mb-12">Why Use ROI Quote Genius?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Accurate ROI Calculations" 
              description="Get precise return-on-investment metrics based on your specific inputs and industry standards."
            />
            <FeatureCard 
              title="Beautiful Visualizations" 
              description="View your data through interactive charts that make complex financial projections easy to understand."
            />
            <FeatureCard 
              title="Email Ready Quotes" 
              description="Generate professional quotes that can be instantly shared via email with clients or stakeholders."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto text-center text-gray-500">
          <p>© 2023 ROI Quote Genius. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <Card className="p-6 h-full card-hover">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Card>
);

export default Index;
