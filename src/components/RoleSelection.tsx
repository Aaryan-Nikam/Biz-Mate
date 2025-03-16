
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoleSelectionProps {
  onSelectRole: (role: "homeowner" | "provider") => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Choose Your Path
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          Select the option that best describes you to get a personalized ROI calculation experience.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className="h-full"
        >
          <Card className="h-full transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">
                  For You
                </Badge>
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Home className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl mt-4">Homeowner</CardTitle>
              <CardDescription>Evaluate home improvement investments</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Calculate ROI on solar, HVAC, renovation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Compare financing options and payback periods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Visualize savings over time with interactive charts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Receive a detailed ROI report via email</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => onSelectRole("homeowner")}
              >
                Continue as Homeowner
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className="h-full"
        >
          <Card className="h-full transition-all duration-300 hover:shadow-md border-blue-600/20">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  ProAccess
                </Badge>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl mt-4">Service Provider</CardTitle>
              <CardDescription>Optimize your business operations</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Track business expenses, revenue, and profit margins</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Analyze marketing spend and conversion metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Project growth and ROI for your service business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-xl">•</span>
                  <span>Generate professional reports for clients & investors</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="default"
                className="w-full"
                onClick={() => onSelectRole("provider")}
              >
                Continue as Service Provider
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;
