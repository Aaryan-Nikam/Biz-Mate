
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, Wind, HomeIcon } from "lucide-react";
import { useUser } from "@/context/UserContext";

export type NicheType = "solar" | "hvac" | "remodeling";

interface NicheSelectionProps {
  onSelectNiche: (niche: NicheType) => void;
}

const NicheSelection: React.FC<NicheSelectionProps> = ({ onSelectNiche }) => {
  const { setUserNiche } = useUser();
  
  const handleNicheSelect = (niche: NicheType) => {
    setUserNiche(niche);
    onSelectNiche(niche);
  };

  const niches = [
    {
      id: "solar",
      title: "Solar",
      description: "Solar panel installation and energy efficiency",
      icon: Sun,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      features: [
        "Calculate solar panel ROI and savings",
        "Estimate energy production and usage",
        "Compare financing options for solar installation",
        "Analyze long-term electricity bill reduction"
      ]
    },
    {
      id: "hvac",
      title: "HVAC",
      description: "Heating, ventilation, and air conditioning",
      icon: Wind,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      features: [
        "Calculate HVAC system efficiency and savings",
        "Estimate seasonal usage and costs",
        "Compare different HVAC system options",
        "Analyze maintenance costs and long-term ROI"
      ]
    },
    {
      id: "remodeling",
      title: "Home Remodeling",
      description: "Kitchen, bathroom, and whole home renovations",
      icon: HomeIcon,
      color: "text-green-500",
      bgColor: "bg-green-50",
      features: [
        "Calculate home remodeling ROI and property value increase",
        "Estimate materials and labor costs",
        "Compare different renovation options and styles",
        "Analyze financing options and project timeline"
      ]
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Choose Your Niche
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          Select your specific area of interest to get tailored ROI calculations and quotes
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {niches.map((niche, index) => (
          <motion.div
            key={niche.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card className="h-full transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className={`${niche.bgColor} ${niche.color} hover:${niche.bgColor}`}>
                    {niche.title}
                  </Badge>
                  <div className={`w-12 h-12 rounded-full ${niche.bgColor} flex items-center justify-center`}>
                    <niche.icon className={`h-6 w-6 ${niche.color}`} />
                  </div>
                </div>
                <CardTitle className="text-2xl mt-4">{niche.title}</CardTitle>
                <CardDescription>{niche.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {niche.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary text-xl">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleNicheSelect(niche.id as NicheType)}
                >
                  Continue with {niche.title}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NicheSelection;
