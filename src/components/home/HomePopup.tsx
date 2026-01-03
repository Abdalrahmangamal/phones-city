// HomePopup.tsx
import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";
import { useNavigate } from "react-router-dom"; // ← جديد

// تعريف نوع Slider (نفس النوع في HeroSection)
interface Slider {
  bg: string;
  title: string;
  description: string;
  link?: string;
}

interface HomePopupProps {
  onClose: () => void;
  sliders: Slider[]; // إضافة prop جديدة
}

const HomePopup: React.FC<HomePopupProps> = ({ onClose, sliders }) => {
  const { t } = useTranslation();
  const { lang } = useLangSync();
  const navigate = useNavigate(); // ← جديد

  // الحصول على أول slide إذا كان موجوداً
  const firstSlide = sliders && sliders.length > 0 ? sliders[0] : null;

  const handleShopNow = () => {
    navigate(`/${lang}/BestSellerPage`); // توجيه إلى صفحة الأكثر مبيعًا حسب اللغة
    onClose(); // إغلاق البوب أب
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-[788px] max-w-[calc(100%-2rem)] p-0 overflow-hidden rounded-xl"
        showCloseButton={false}
      >
        {/* Header with title and close button */}
        <div className="flex justify-between items-center p-6 pb-4 sm:p-8 sm:pb-4">
          {/* Title - استخدام عنوان أول slide إذا كان موجوداً */}
          <div className="text-right font-bold text-[#211C4D] text-3xl sm:text-4xl">
            {firstSlide ? firstSlide.title : t("NewOffer")}
          </div>
          
          {/* Close Button */}
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
          <div className="h-[250px] sm:h-[400px] flex flex-col items-center justify-center bg-white rounded-lg overflow-hidden relative">
            {firstSlide ? (
              <>
                {/* عرض صورة أول slide */}
                <div className="w-full h-full relative">
                  <img 
                    src={firstSlide.bg} 
                    alt={firstSlide.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/788x400/211C4D/FFFFFF?text=Slide+Image";
                    }}
                  />
                  {/* Overlay مشابه لـ HeroSection */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#211C4D0A] via-[#211C4D22] to-[#211C4D6B]"></div>
                </div>
                
                {/* عرض الوصف + زر تسوق الآن (ثابت الآن) */}
                <div className="absolute bottom-10 right-10 left-6 text-white z-10">
                  <p className="font-semibold text-lg sm:text-xl text-start">
                    {firstSlide.description}
                  </p>
                  
                  {/* الزر الجديد - يظهر دائمًا ويوجه إلى BestSellerPage */}
                  <button
                    onClick={handleShopNow}
                    className="mt-4 inline-block bg-[#F3AC5D] text-white px-6 py-2 rounded-lg hover:bg-[#e79940] transition-colors text-sm font-medium"
                  >
                    {lang === "ar" ? "تسوق الآن" : "Shop Now"}
                  </button>
                </div>
              </>
            ) : (
              // Fallback إذا لم توجد slides
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-lg">
                  {lang === "ar" ? "لا توجد شرائح متاحة" : "No slides available"}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HomePopup;