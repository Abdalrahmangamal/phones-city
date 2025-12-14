// components/home/InstallmentSection.tsx
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import coara from "../../assets/images/coara.png";
import mora from "../../assets/images/mora.png";

// تعريف نوع البيانات المتوقعة من الـ API (يمكنك تعديله حسب الـ response الفعلي)
interface InstallmentData {
  offer_text?: string;
  offer_text_ar?: string;
  offer_text_en?: string;
  coara_link?: string;
  mora_link?: string;
}

// Props الجديدة: نستقبل البيانات جاهزة من Home.tsx
interface InstallmentSectionProps {
  installmentData: InstallmentData | null;
}

const InstallmentSection: React.FC<InstallmentSectionProps> = ({ installmentData }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "ar";
  const isRTL = currentLang === "ar";

  // دالة للحصول على النص المناسب حسب اللغة
  const getOfferText = () => {
    if (!installmentData) {
      return currentLang === "ar" ? "عرض خاص!" : "Special Offer!";
    }

    return currentLang === "ar"
      ? installmentData.offer_text_ar || installmentData.offer_text || "عرض خاص!"
      : installmentData.offer_text_en || installmentData.offer_text || "Special Offer!";
  };

  // إذا لم يتم تمرير البيانات بعد (مثلاً أثناء التحميل في Home.tsx)
  if (installmentData === null || installmentData === undefined) {
    return (
      <div className="xl:px-[90px] px-2 pt-0 md:pt-0 my-8">
        <div className="md:h-[300px] h-[150px] w-full bg-gray-100 rounded-[16px] px-5 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {currentLang === "ar" ? "جاري تحميل العروض..." : "Loading offers..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // في حالة وجود خطأ في جلب البيانات (يمكنك تمرير prop إضافي إذا أردت، لكن هنا نفترض أن البيانات null = خطأ أو تحميل)
  // لكن لتبسيط الأمور، إذا وصلت البيانات لكن فارغة تمامًا، نعرض fallback بسيط
  const hasValidData =
    installmentData.offer_text ||
    installmentData.offer_text_ar ||
    installmentData.offer_text_en ||
    installmentData.coara_link ||
    installmentData.mora_link;

  if (!hasValidData) {
    return (
      <div className="xl:px-[90px] px-2 pt-0 md:pt-0 my-8">
        <div className="md:h-[300px] h-[150px] w-full bg-red-50 border border-red-200 rounded-[16px] px-5 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-2">
              {currentLang === "ar" ? "⚠️ لا توجد عروض متاحة" : "⚠️ No offers available"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:px-[90px] px-2 pt-0 md:pt-0 my-8">
      <div className="md:h-[300px] h-[150px] w-full bg-[#4058A61A] md:pt-[5px] pt-[10px] rounded-[16px] px-5">
        {/* العنوان */}
        <p
          className={`
            md:text-[38px] lg:text-[42px] mt-3 text-[11px] md:text-[16px] 
            font-[500] text-[#211C4D] text-center 
            ${isRTL ? "md:text-right" : "md:text-left"}
            leading-relaxed
          `}
        >
          {getOfferText()}
        </p>

        {/* الشعارات */}
        <div className="flex items-center mt-[20px] justify-between md:px-[30px]">
          <Link to={installmentData.coara_link || "/about-quara"}>
            <img
              className="w-[120px] md:w-full max-w-[200px] hover:scale-105 transition-transform"
              src={coara}
              alt={isRTL ? "شعار كوارا" : "Coara Logo"}
            />
          </Link>

          <Link to={installmentData.mora_link || "/about-mora"}>
            <img
              className="w-[120px] md:w-full max-w-[200px] hover:scale-105 transition-transform"
              src={mora}
              alt={isRTL ? "شعار مورا" : "Mora Logo"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstallmentSection;