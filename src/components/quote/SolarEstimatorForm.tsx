
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface SolarEstimatorFormProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSliderChange: (name: string, value: number[]) => void;
}

const SolarEstimatorForm: React.FC<SolarEstimatorFormProps> = ({
  formState,
  handleInputChange,
  handleSliderChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="systemSize">System Size (kW)</Label>
        <div className="pt-2">
          <Slider
            id="systemSize"
            name="systemSize"
            min={1}
            max={20}
            step={0.5}
            value={[formState.systemSize]}
            onValueChange={(value) => handleSliderChange("systemSize", value)}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 kW</span>
            <span>{formState.systemSize} kW</span>
            <span>20 kW</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="roofType">Roof Type</Label>
          <select
            id="roofType"
            name="roofType"
            value={formState.roofType}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="asphalt">Asphalt Shingle</option>
            <option value="metal">Metal</option>
            <option value="tile">Tile</option>
            <option value="flat">Flat</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="sunExposure">Sun Exposure</Label>
          <select
            id="sunExposure"
            name="sunExposure"
            value={formState.sunExposure}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="full">Full Sun (6+ hours)</option>
            <option value="partial">Partial Sun (4-6 hours)</option>
            <option value="limited">Limited Sun (2-4 hours)</option>
          </select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="electricBill">Average Monthly Electric Bill ($)</Label>
        <Input
          id="electricBill"
          name="electricBill"
          type="number"
          value={formState.electricBill}
          onChange={handleInputChange}
        />
      </div>
      
      <div>
        <Label htmlFor="financing">Financing Option</Label>
        <select
          id="financing"
          name="financing"
          value={formState.financing}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="cash">Cash Purchase</option>
          <option value="loan">Solar Loan</option>
          <option value="lease">Solar Lease/PPA</option>
        </select>
      </div>
    </div>
  );
};

export default SolarEstimatorForm;
