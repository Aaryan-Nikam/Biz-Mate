
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { NicheType } from "@/components/NicheSelection";

// Form validation schema
const formSchema = z.object({
  recipientEmail: z.string().email({ message: "Please enter a valid email address" }),
  yourName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().optional(),
  includeDetails: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface EmailQuoteFormProps {
  onSendSuccess: () => void;
  quoteTitle?: string;
}

const EmailQuoteForm: React.FC<EmailQuoteFormProps> = ({ onSendSuccess, quoteTitle }) => {
  const { user } = useUser();
  
  const getNicheEmailTemplate = (niche?: NicheType) => {
    switch (niche) {
      case "solar":
        return "Here's your detailed solar installation quote with ROI calculations and energy savings projections.";
      case "hvac":
        return "I've attached your HVAC system quote with efficiency ratings and estimated energy savings.";
      case "remodeling":
        return "Please find attached your home renovation quote with cost breakdown and property value impact analysis.";
      default:
        return "I've attached the ROI quote you requested. Please review and let me know if you have any questions.";
    }
  };

  // Set up form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientEmail: "",
      yourName: user?.email?.split('@')[0] || "",
      subject: `ROI Quote: ${quoteTitle || "Your Custom Quote"}`,
      message: getNicheEmailTemplate(user?.niche),
      includeDetails: true,
    },
  });

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    // In a real app, this would call an API to send the email
    
    // Simulate sending email
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Sending email...",
        success: () => {
          onSendSuccess();
          return "Quote sent successfully!";
        },
        error: "Failed to send email. Please try again.",
      }
    );
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Email Your Quote</CardTitle>
        <CardDescription>
          Send this quote to yourself or your client
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              name="yourName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={5}
                      placeholder="Optional message to include with the quote"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Add a personal message to accompany the quote
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" className="w-full sm:w-auto">
                <MailCheck className="mr-2 h-4 w-4" /> Send Quote
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t pt-6 flex justify-between text-sm text-muted-foreground">
        <p>Quote will be sent as a PDF attachment</p>
      </CardFooter>
    </Card>
  );
};

export default EmailQuoteForm;
