import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import offerImage from "@/assets/images/Group 1000005945.png";

interface HomePopupProps {
  onClose: () => void;
}

const HomePopup: React.FC<HomePopupProps> = ({ onClose }) => {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-[788px] max-w-[calc(100%-2rem)] p-0 overflow-hidden rounded-xl"
        showCloseButton={false}
      >
        {/* Header with title and close button */}
        <div className="flex justify-between items-center p-8 pb-4">
          {/* Title */}
          <div className="text-right font-bold text-[#211C4D] text-4xl">
            عرض جديد
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-md flex items-center justify-center bg-[#29293A12] border border-[#E2E8F0]"
            aria-label="إغلاق"
          >
            <X className="text-gray-500 w-2.5 h-2.5 border-2" />
          </button>
        </div>

        {/* Image/Content Area with spacing */}
        <div className="px-8 pb-8">
          <div className="h-[400px] flex items-center justify-center bg-white rounded-lg">
            <img 
              src={offerImage} 
              alt="عرض جديد" 
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                // Fallback to placeholder if image doesn't load
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/788x400/211C4D/FFFFFF?text=New+Offer+Image";
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HomePopup;