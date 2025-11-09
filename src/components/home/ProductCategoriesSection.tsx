import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import image4 from "../../assets/images/image4.png";
import image5 from "../../assets/images/image5.png";
import image6 from "../../assets/images/imag6.png";
import svg1 from "../../assets/images/Layer_1.png";
import { useLangSync } from "@/hooks/useLangSync";
import "../../style.css";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect } from "react";
import useS24Ultra from "@/hooks/useS24Ultra";
import S24ProductCategoriesSection from "@/components/s24-ultra/S24ProductCategoriesSection";

const ProductCategoriesSection: React.FC = () => {
  const { lang } = useLangSync();
  const isS24Ultra = useS24Ultra();

  if (isS24Ultra) {
    return <S24ProductCategoriesSection />;
  }

  useEffect(() => {}, [lang]);

  const categories = [
    { image: image1, title: "الهواتف الذكية" },
    { image: image2, title: "لابتوب" },
    { image: image3, title: "ألعاب الفيديو" },
    { image: image4, title: "الساعات الذكية" },
    { image: image5, title: "السماعات" },
    { image: image6, title: "الكاميرات والداش كام" },
    { image: image6, title: "الكاميرات والداش كام" },
    { image: image6, title: "الكاميرات والداش كام" },
    { image: image6, title: "الكاميرات والداش كام" },
  ];

  return (
    <div className="xl:px-[90px] px-2 pt-2 md:pt-0">
      <div className="relative my-6">
        <h1 className="text-center text-[#211C4D] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-[700]">
          الأقسام
        </h1>

        <Swiper
          key={lang}
          dir={lang === "ar" ? "rtl" : "ltr"}
          slidesPerView={5}
          spaceBetween={12}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]"
          breakpoints={{
            320: { slidesPerView: 5, spaceBetween: 10 },
            480: { slidesPerView: 5, spaceBetween: 12 },
            768: { slidesPerView: 5, spaceBetween: 16 },
            1024: { slidesPerView: 6, spaceBetween: 20 },
            1440: { slidesPerView: 6, spaceBetween: 24 },
          }}
        >
          {categories.map((cat, index) => (
            <SwiperSlide
              key={index}
              className="flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <div className="w-[70px] h-[70px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-white overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="!w-[68%] !h-[68%] !object-contain"
                />
              </div>
              <h2 className="text-[#211C4D] text-[6px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-[600] mt-2 text-center leading-tight">
                {cat.title}
              </h2>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute md:top-[10%] top-[2%] right-[20%] md:right-[42%] z-[1] opacity-70 pointer-events-none">
          <img src={svg1} alt="" className="w-[100px] sm:w-[100px] md:w-[150px]" />
        </div>
      </div>
    </div>
  );
};

export default ProductCategoriesSection;
