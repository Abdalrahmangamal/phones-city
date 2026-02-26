import { Swiper, SwiperSlide } from "swiper/react";
import { useLangSync } from "@/hooks/useLangSync";
import "swiper/swiper.css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "../../style.css";
import { useMemo } from "react";

// تعريف نوع البيانات المتوقعة من الـ slider (يمكنك تعديله حسب الـ API الفعلي)
interface Slider {
  bg: string;
  title: string;
  description: string;
  link?: string;
}

// Props الجديدة: نستقبل sliders جاهزة من Home.tsx
interface HeroSectionProps {
  sliders: Slider[];
  showButton?: boolean;
}

const NewHeroSection: React.FC<HeroSectionProps> = ({ sliders, showButton = true }) => {
  const { lang } = useLangSync();

  // حالات fallback باستخدام useMemo لتحسين الأداء
  const renderLoading = useMemo(
    () => (
      <div className="xl:px-[90px] px-2 pt-20 md:pt-0">
        <div className="md:h-[400px] h-[200px] rounded-[16px] mt-6 bg-gray-200 animate-pulse flex items-center justify-center">
          <p className="text-gray-500">
            {lang === "ar" ? "جارٍ تحميل الشرائح..." : "Loading slides..."}
          </p>
        </div>
      </div>
    ),
    [lang]
  );

  const renderEmpty = useMemo(
    () => (
      <div className="xl:px-[90px] px-2 pt-20 md:pt-0">
        <div className="md:h-[400px] h-[200px] rounded-[16px] mt-6 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">
            {lang === "ar" ? "لا توجد شرائح متاحة" : "No slides available"}
          </p>
        </div>
      </div>
    ),
    [lang]
  );

  // إذا لم يكن هناك sliders (أو مصفوفة فارغة) → نعرض fallback
  if (!sliders || sliders.length === 0) {
    // في الوضع الجديد، إذا لم يتم تمرير sliders، نعرض loading أو empty حسب الحاجة
    // لكن عادةً Home.tsx سيمرر مصفوفة (حتى لو فارغة بعد الـ fetch)
    return sliders === undefined ? renderLoading : renderEmpty;
  }

  return (
    <div className="xl:px-[90px] px-2 pt-20 md:pt-0">
      <Swiper
        key={lang} // لإعادة تهيئة السلايدر عند تغيير اللغة
        speed={1000}
        dir={lang === "ar" ? "rtl" : "ltr"}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}

        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper md:h-[400px]  h-[200px] rounded-[16px] mt-6"
      >
        {sliders.map((slide, index) => (
          <SwiperSlide key={`${slide.title}-${index}`} className="relative isolate">
            {/* خلفية الصورة */}
            <div className="absolute inset-0 w-[99%] h-full">
              <img
                src={slide.bg}
                alt={`${slide.title} - Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-[16px] pointer-events-none select-none"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />

              {/* Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#211C4D0A] via-[#211C4D22] to-[#211C4D6B] rounded-[16px]"></div>
            </div>

            {/* المحتوى النصي والزر */}
            <div className="relative z-10 w-full h-full flex flex-col justify-start items-start px-[40px] pt-[20px] md:pt-[60px]">
              <h1 className="font-[700] md:text-[3rem] text-[1.5rem] text-white textshad">
                {slide.title}
              </h1>

              <p className="font-[700] md:text-[20px] text-[14px] max-w-[90%] md:max-w-[50%] text-white mt-[15px] md:mt-[20px] text-start">
                {slide.description}
              </p>

              {showButton && (
                <Link
                  to={`/${lang}/offers`}
                  className="
                    md:w-[140px] md:h-[48px]
                    w-[100px] h-[36px]
                    text-[12px] 
                    md:text-[18px]
                    text-white 
                    mt-[18px] 
                    bg-[#F3AC5D] 
                    rounded-[8px] 
                    flex items-center justify-center 
                    gap-2
                    transition-all duration-300 ease-in-out
                    hover:bg-[#e79940] 
                    hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)]
                    hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-[#F3AC5D] focus:ring-offset-2
                  "
                  aria-label={lang === "ar" ? "اذهب للتسوق الآن" : "Go to shop now"}
                >
                  {lang === "ar" ? "تسوق الآن" : "Shop Now"}
                  <svg
                    width="19"
                    height="14"
                    viewBox="0 0 19 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-300 hover:translate-x-1 ${lang === "ar" ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <path
                      d="M5.75 3.57422H13.25C13.6124 3.57422 13.9062 3.80274 13.9062 4.08464C13.9062 4.36653 13.6124 4.59505 13.25 4.59505H7.33433L13.714 9.55705C13.9703 9.75638 13.9703 10.0796 13.714 10.2789C13.4578 10.4782 13.0422 10.4782 12.786 10.2789L6.40625 5.31689V9.91797C6.40625 10.1999 6.11244 10.4284 5.75 10.4284C5.38756 10.4284 5.09375 10.1999 5.09375 9.91797V4.08464C5.09375 3.94424 5.16663 3.81708 5.28457 3.7248L5.28736 3.72264C5.34995 3.67424 5.42197 3.63767 5.4988 3.61295C5.57617 3.58799 5.66102 3.57422 5.75 3.57422Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewHeroSection;
