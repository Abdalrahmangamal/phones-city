import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import '@/style.css'
import topYellow from "../../assets/images/Frame 546526596png.png";
import bottomYellow from "../../assets/images/Frame 1321317129.png";
import pattern from "../../assets/images/Layer_1.png";
import useFeaturesStore from "@/store/home/featuresStore";

const FrameSection: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { 
    loading, 
    error, 
    fetchFeatures, 
    getFeaturesByLanguage 
  } = useFeaturesStore();

  // الحصول على اللغة الحالية
  const currentLang = i18n.language as 'ar' | 'en';
  
  // استخدام اللغة الحالية
  const langFeatures = getFeaturesByLanguage(currentLang);

  useEffect(() => {
    fetchFeatures();
  }, []);
console.log("fetchFeatures",fetchFeatures)
  // مراقبة تغيير اللغة وإعادة تحميل البيانات
  useEffect(() => {
    // لا حاجة لإعادة جلب البيانات، فقط سيتم إعادة حساب langFeatures
    // لأن getFeaturesByLanguage يعتمد على اللغة الحالية
  }, [currentLang]);

  if (loading) {
    return (
      <div className="w-full min-h-[600px] mt-15 lg:min-h-[800px] relative mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <div className="text-center">{t('loading') || 'جاري تحميل الميزات...'}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[600px] mt-15 lg:min-h-[800px] relative mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <div className="text-center text-red-500">
          {t('error') || 'حدث خطأ:'} {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[600px] mt-15 lg:min-h-[800px] relative mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <img
        src={topYellow}
        alt="Top decorative frame"
        className="absolute top-0 left-0 w-[40vw] max-w-[380px] h-auto object-cover object-left z-0"
      />
      <img
        src={bottomYellow}
        alt="Bottom decorative frame"
        className="absolute bottom-0 right-0 w-[50vw] max-w-[550px] md:w-[25vw] lg:w-[30vw] h-auto object-cover z-0"
      />
      <div className="relative z-10 max-w-7xl mx-auto ">
        <div className="flex items-center justify-center lg:justify-center w-full lg:w-auto">
          <img src={pattern} alt="" className="w-12 h-12 lg:w-20 lg:h-20 " />
          <h2 className="text-center text-[#211C4D] text-[clamp(24px,5vw,36px)] font-[700] mb-4 ml-6">
            {t('StoreFeatures') || 'مميزات المتجر'}
          </h2>
        </div>

        <h5 className="text-center text-[15px] text-[#211C4D] font-[700] mb-8">
          {t('FeaturesDescription') || '"كل ميزة صممناها عشان نخلي تسوقك اسهل , اسرع , اضمن ."'}
        </h5>
        
        <div className="grid grid-cols-2 pt-8 pb-24 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:!pb-[90px] s24-frame-grid">
          {langFeatures.map((feature) => {
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FrameSection;