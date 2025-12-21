import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import arabicOfferImage from "@/assets/images/Group 1000005945.png";
import englishOfferImage from "@/assets/images/Gemini_Generated_Image_lp4ibvlp4ibvlp4i.png";
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";

interface HomePopupProps {
  onClose: () => void;
}

const HomePopup: React.FC<HomePopupProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { lang } = useLangSync();

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-[788px] max-w-[calc(100%-2rem)] p-0 overflow-hidden rounded-xl"
        showCloseButton={false}
      >
        {/* Header with title and close button */}
        <div className="flex justify-between items-center p-6 pb-4 sm:p-8 sm:pb-4">
          {/* Title */}
          <div className="text-right font-bold text-[#211C4D] text-3xl sm:text-4xl">
            {t("NewOffer")}
          </div>
          
          {/* Close Button - Increased size */}
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center bg-[#29293A12] border border-[#E2E8F0] hover:bg-[#29293A22] transition-colors"
            aria-label={lang === "ar" ? "إغلاق" : "Close"}
          >
            <X className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Image/Content Area with spacing */}
        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          <div className="h-[250px] sm:h-[400px] flex items-center justify-center bg-white rounded-lg">
            <img 
              src={lang === "ar" ? arabicOfferImage : englishOfferImage} 
              alt={lang === "ar" ? t("NewOffer") : t("NewOfferEn")} 
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