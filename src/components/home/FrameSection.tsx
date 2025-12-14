// components/home/FrameSection.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import "@/style.css";
import topYellow from "../../assets/images/Frame 546526596png.png";
import bottomYellow from "../../assets/images/Frame 1321317129.png";
import pattern from "../../assets/images/Layer_1.png";

// تعريف نوع الميزة (Feature) حسب الـ API المتوقع
interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  // إذا كان هناك title_ar / description_ar، يمكن إضافتها هنا
}

// Props الجديدة: نستقبل الميزات المترجمة جاهزة من Home.tsx
interface FrameSectionProps {
  features: Feature[];
}

const FrameSection: React.FC<FrameSectionProps> = ({ features }) => {
  const { t } = useTranslation();

  // حالة تحميل أو عدم وجود بيانات
  if (!features || features.length === 0) {
    return (
      <div className="w-full min-h-[600px] mt-15 lg:min-h-[800px] relative mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#211C4D] mx-auto mb-4"></div>
          <p className="text-[#211C4D]">{t("loading") || "جاري تحميل الميزات..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[600px] mt-15 lg:min-h-[800px] relative mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* الإطار الزخرفي العلوي */}
      <img
        src={topYellow}
        alt="Top decorative frame"
        className="absolute top-0 left-0 w-[40vw] max-w-[380px] h-auto object-cover object-left z-0"
      />

      {/* الإطار الزخرفي السفلي */}
      <img
        src={bottomYellow}
        alt="Bottom decorative frame"
        className="absolute bottom-0 right-0 w-[50vw] max-w-[550px] md:w-[25vw] lg:w-[30vw] h-auto object-cover z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* العنوان الرئيسي مع الزخرفة */}
        <div className="flex items-center justify-center lg:justify-center w-full lg:w-auto">
          <img src={pattern} alt="" className="w-12 h-12 lg:w-20 lg:h-20" />
          <h2 className="text-center text-[#211C4D] text-[clamp(24px,5vw,36px)] font-[700] mb-4 ml-6">
            {t("StoreFeatures") || "مميزات المتجر"}
          </h2>
        </div>

        {/* الوصف الفرعي */}
        <h5 className="text-center text-[15px] text-[#211C4D] font-[700] mb-8">
          {t("FeaturesDescription") || '"كل ميزة صممناها عشان نخلي تسوقك اسهل , اسرع , اضمن ."'}
        </h5>

        {/* شبكة الميزات */}
        <div className="grid grid-cols-2 pt-8 pb-24 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:!pb-[90px] s24-frame-grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-row items-start gap-4 w-full max-w-[350px] min-h-[100px] md:min-h-[130px] mx-auto"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-12 h-12 iconframe sm:w-16 sm:h-16 flex-shrink-0 object-contain"
                loading="lazy"
              />
              <div className="flex iconframetext flex-col items-start gap-2">
                <h4 className="text-[#211C4D] !text-[12px] md:text-[clamp(18px,3vw,22px)] font-[700]">
                  {feature.title}
                </h4>
                <p className="text-[#211C4D] text-[clamp(14px,2vw,16px)] font-[400]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameSection;