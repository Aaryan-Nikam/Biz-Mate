
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import NicheSelection from "@/components/NicheSelection";
import { NicheType } from "@/components/NicheSelection";

interface NicheSelectionPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectNiche: (niche: NicheType) => void;
}

const NicheSelectionPopup: React.FC<NicheSelectionPopupProps> = ({
  open,
  onOpenChange,
  onSelectNiche
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Choose Your Niche</DialogTitle>
          <DialogDescription className="text-center">
            Select your specific area of interest to get tailored quotes and calculations
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <NicheSelection onSelectNiche={(niche) => {
            onSelectNiche(niche);
            onOpenChange(false);
          }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NicheSelectionPopup;
