
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RemodelingEstimatorFormProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const RemodelingEstimatorForm: React.FC<RemodelingEstimatorFormProps> = ({
  formState,
  handleInputChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="projectType">Project Type</Label>
        <select
          id="projectType"
          name="projectType"
          value={formState.projectType}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="kitchen">Kitchen Remodel</option>
          <option value="bathroom">Bathroom Remodel</option>
          <option value="basement">Basement Finishing</option>
          <option value="addition">Home Addition</option>
          <option value="wholehome">Whole Home Renovation</option>
        </select>
      </div>
      
      <div>
        <Label htmlFor="squareFootage">Square Footage</Label>
        <Input
          id="squareFootage"
          name="squareFootage"
          type="number"
          value={formState.squareFootage}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="materialsGrade">Materials Grade</Label>
          <select
            id="materialsGrade"
            name="materialsGrade"
            value={formState.materialsGrade}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="economy">Economy (Budget-Friendly)</option>
            <option value="mid">Mid-Grade (Standard)</option>
            <option value="luxury">Luxury (High-End)</option>
            <option value="premium">Premium (Designer)</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="complexity">Project Complexity</Label>
          <select
            id="complexity"
            name="complexity"
            value={formState.complexity}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="simple">Simple (No Structural Changes)</option>
            <option value="medium">Medium (Minor Structural Changes)</option>
            <option value="complex">Complex (Major Structural Changes)</option>
            <option value="custom">Custom (Architectural Design Required)</option>
          </select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="timeframe">Project Timeframe</Label>
        <select
          id="timeframe"
          name="timeframe"
          value={formState.timeframe}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="extended">Extended (Flexible Timeline)</option>
          <option value="standard">Standard (Normal Timeline)</option>
          <option value="expedited">Expedited (Accelerated Timeline)</option>
          <option value="rush">Rush (Urgent Completion)</option>
        </select>
      </div>
    </div>
  );
};

export default RemodelingEstimatorForm;
