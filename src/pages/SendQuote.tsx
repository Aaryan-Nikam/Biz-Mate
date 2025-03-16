
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/context/UserContext";
import { Send } from "lucide-react";

// Mock quote data - in a real app, this would come from your database
const mockQuotes = [
  { id: "q1", title: "Solar Panel Installation" },
  { id: "q2", title: "Kitchen Remodel" },
];

const formSchema = z.object({
  quoteId: z.string({ required_error: "Please select a quote" }),
  recipientEmail: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SendQuote = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quoteId: "",
      recipientEmail: "",
      subject: "Your ROI Quote",
      message: "Here's the ROI quote we discussed. Please review and let me know if you have any questions.",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Quote successfully sent!", {
        description: `Quote sent to ${values.recipientEmail}`,
      });
      setIsSending(false);
      
      // Reset form
      form.reset({
        quoteId: "",
        recipientEmail: "",
        subject: "Your ROI Quote",
        message: "Here's the ROI quote we discussed. Please review and let me know if you have any questions.",
      });
    }, 1500);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-16 md:ml-64 p-6">
        <header className="mb-8">
          <h1 className="heading-1 mb-2">Send Quote</h1>
          <p className="subheading">Email your ROI quotes to clients or yourself</p>
        </header>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Email Quote</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="quoteId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Quote</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a quote" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockQuotes.map(quote => (
                            <SelectItem key={quote.id} value={quote.id}>
                              {quote.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Email</FormLabel>
                      <FormControl>
                        <Input placeholder="client@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={5}
                          placeholder="Enter a personal message to include with the quote"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSending}>
                    {isSending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Quote
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SendQuote;
