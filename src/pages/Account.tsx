
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { User as UserIcon, Mail, Building, Phone, Save, CreditCard, FileText, Clock, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NicheType } from "@/components/NicheSelection";

const Account = () => {
  const { user, setUserNiche } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "555-123-4567",
    company: "Your Business Name",
    address: "123 Business Street",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    niche: user?.niche || "solar" as NicheType
  });

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        niche: user.niche || "solar" as NicheType
      }));
    }
  }, [user]);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNicheChange = (value: NicheType) => {
    setFormData(prev => ({ ...prev, niche: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    setUserNiche(formData.niche);
    toast.success("Profile updated successfully!");
  };

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
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
              <UserIcon className="mr-2 h-7 w-7 text-primary" />
              My Account
            </h1>
            <p className="text-muted-foreground">
              Manage your personal information and account preferences
            </p>
          </header>

          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="billing">Billing & Subscription</TabsTrigger>
              <TabsTrigger value="activity">Account Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <UserIcon className="h-16 w-16 text-primary/40" />
                      </div>
                      
                      <h3 className="text-xl font-medium">
                        {user.firstName || ''} {user.lastName || ''}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                      
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-xs text-primary font-medium mt-2 capitalize">
                        {user.niche || "No Industry Selected"}
                      </div>
                      
                      <Separator className="my-4 w-full" />
                      
                      <div className="w-full space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">555-123-4567</span>
                        </div>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">Your Business Name</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant={isEditing ? "outline" : "default"}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? "Cancel Editing" : "Edit Profile"}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        {isEditing 
                          ? "Edit your profile information below" 
                          : "Your personal and business information"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              name="firstName"
                              disabled={!isEditing}
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              name="lastName"
                              disabled={!isEditing}
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email"
                            disabled={!isEditing}
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              id="phone" 
                              name="phone"
                              disabled={!isEditing}
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input 
                              id="company" 
                              name="company"
                              disabled={!isEditing}
                              value={formData.company}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            name="address"
                            disabled={!isEditing}
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="col-span-2 md:col-span-2 space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city" 
                              name="city"
                              disabled={!isEditing}
                              value={formData.city}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input 
                              id="state" 
                              name="state"
                              disabled={!isEditing}
                              value={formData.state}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input 
                              id="zip" 
                              name="zip"
                              disabled={!isEditing}
                              value={formData.zip}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Label htmlFor="niche">Business Industry</Label>
                          <Select 
                            disabled={!isEditing} 
                            value={formData.niche}
                            onValueChange={(value) => handleNicheChange(value as NicheType)}
                          >
                            <SelectTrigger id="niche">
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="solar">Solar</SelectItem>
                              <SelectItem value="hvac">HVAC</SelectItem>
                              <SelectItem value="remodeling">Remodeling</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      {isEditing && (
                        <Button onClick={handleSaveProfile}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="billing">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-primary" />
                      Billing Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-sm text-center">You are currently on the <span className="font-bold">Free Plan</span></p>
                    </div>
                    
                    <Button className="w-full">Upgrade to Premium</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">No payment methods have been added yet.</p>
                    <Button variant="outline">Add Payment Method</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">No previous billing history.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Quote Created</p>
                          <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <UserIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Profile Updated</p>
                          <p className="text-xs text-muted-foreground">3 days ago at 10:15 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Account Created</p>
                          <p className="text-xs text-muted-foreground">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Login History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-3 py-2 bg-secondary/50 rounded-md">
                        <div>
                          <p className="text-sm font-medium">Today, 11:32 AM</p>
                          <p className="text-xs text-muted-foreground">Chrome on Windows</p>
                        </div>
                        <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Current
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center px-3 py-2 rounded-md">
                        <div>
                          <p className="text-sm font-medium">Yesterday, 9:15 PM</p>
                          <p className="text-xs text-muted-foreground">Chrome on Windows</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center px-3 py-2 rounded-md">
                        <div>
                          <p className="text-sm font-medium">May 3, 2023, 3:42 PM</p>
                          <p className="text-xs text-muted-foreground">Safari on iOS</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Account;
