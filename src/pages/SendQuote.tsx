
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import EmailQuoteForm from "@/components/EmailQuoteForm";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const SendQuote = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleSendSuccess = () => {
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-16 md:ml-64 p-6">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/quote")}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="heading-1">Send Quote</h1>
          </div>
          <p className="subheading">Email your ROI quote to yourself or clients</p>
        </header>

        <div className="max-w-3xl mx-auto">
          {emailSent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="inline-flex justify-center items-center w-16 h-16 mb-6 rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Quote Sent Successfully!</h2>
              <p className="text-muted-foreground mb-8">
                Your quote has been emailed and should arrive shortly.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={() => setEmailSent(false)}>
                  Send Another Quote
                </Button>
                <Button variant="outline" onClick={() => navigate("/quote")}>
                  Return to My Quotes
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Quote Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SummaryItem 
                      label="Project Type" 
                      value={user.niche ? `${user.niche.charAt(0).toUpperCase()}${user.niche.slice(1)}` : "Custom Project"} 
                    />
                    <SummaryItem 
                      label="ROI" 
                      value="12.5%" 
                    />
                    <SummaryItem 
                      label="Breakeven" 
                      value="8 years, 0 months" 
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="mb-8">
                <EmailQuoteForm 
                  onSendSuccess={handleSendSuccess}
                  quoteTitle={
                    user.niche === "solar" ? "Solar Installation Quote" :
                    user.niche === "hvac" ? "HVAC System Upgrade Quote" :
                    user.niche === "remodeling" ? "Home Renovation Quote" :
                    "Custom ROI Quote"
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface SummaryItemProps {
  label: string;
  value: string;
}

const SummaryItem: React.FC<SummaryItemProps> = ({ label, value }) => (
  <div className="bg-muted/50 p-4 rounded-lg">
    <p className="text-sm text-muted-foreground mb-1">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default SendQuote;
