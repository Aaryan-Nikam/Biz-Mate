
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface HVACEstimatorFormProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSliderChange: (name: string, value: number[]) => void;
}

const HVACEstimatorForm: React.FC<HVACEstimatorFormProps> = ({
  formState,
  handleInputChange,
  handleSliderChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="systemType">System Type</Label>
        <select
          id="systemType"
          name="systemType"
          value={formState.systemType}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="central">Central AC & Furnace</option>
          <option value="heatPump">Heat Pump</option>
          <option value="ductless">Ductless Mini-Split</option>
          <option value="geothermal">Geothermal</option>
        </select>
      </div>
      
      <div>
        <Label htmlFor="homeSize">Home Size (sq. ft.)</Label>
        <Input
          id="homeSize"
          name="homeSize"
          type="number"
          value={formState.homeSize}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="existingSystem">Existing System</Label>
          <select
            id="existingSystem"
            name="existingSystem"
            value={formState.existingSystem}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="old">Replacing Old System</option>
            <option value="working">Upgrading Working System</option>
            <option value="none">New Construction (No System)</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="seasonalUsage">Seasonal Usage</Label>
          <select
            id="seasonalUsage"
            name="seasonalUsage"
            value={formState.seasonalUsage}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="high">High (Year-round)</option>
            <option value="medium">Medium (Seasonal)</option>
            <option value="low">Low (Occasional)</option>
          </select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="zones">Number of Zones</Label>
        <div className="pt-2">
          <Slider
            id="zones"
            name="zones"
            min={1}
            max={6}
            step={1}
            value={[formState.zones]}
            onValueChange={(value) => handleSliderChange("zones", value)}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 zone</span>
            <span>{formState.zones} zone{formState.zones > 1 ? 's' : ''}</span>
            <span>6 zones</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HVACEstimatorForm;
