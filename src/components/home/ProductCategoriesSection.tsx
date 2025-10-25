// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import image1 from '../../assets/images/image1.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import image4 from '../../assets/images/image4.png';
import image5 from '../../assets/images/image5.png';
import image6 from '../../assets/images/imag6.png'; // Fixed the filename
import svg1 from '../../assets/images/Layer_1.png';
import { useLangSync } from '@/hooks/useLangSync'
// Import Swiper styles
import "../../style.css";
import { Navigation , Autoplay } from "swiper/modules";
import { useEffect } from "react";
import useS24Ultra from '@/hooks/useS24Ultra';
import S24ProductCategoriesSection from '@/components/s24-ultra/S24ProductCategoriesSection';

const ProductCategoriesSection: React.FC = () => {
  const {lang}= useLangSync();
  const isS24Ultra = useS24Ultra();
  
  // If device is S24 Ultra, render the S24 Ultra specific component
  if (isS24Ultra) {
    return <S24ProductCategoriesSection />;
  }
  
    useEffect(() => {
    }, [lang]); 
  const categories = [
  { image: image1, title: "الهواتف الذكيه" },
  { image: image2, title: "لابتوب" },
  { image: image3, title: "العاب الفيديو" },
  { image: image4, title: "الساعات الذكيه" },
  { image: image5, title: "السماعات" },
  { image: image6, title: "الكيمرات و الداش كام" },
  { image: image1, title: "الهواتف الذكيه" },
  { image: image1, title: "الهواتف الذكيه" },
  { image: image1, title: "الهواتف الذكيه" },
];

  return (
    <div className="lg:px-[90px] px-2 pt-5 md:pt-0">

    <div className="relative my-6">
      <h1 className="text-center text-[#211C4D] text-[28px] md:text-[40px] font-[700]">
        الاقسام
      </h1>
  <Swiper
  key={lang}
  dir={lang === "ar" ? "rtl" : "ltr"}
  slidesPerView={6}
  spaceBetween={0}
  autoplay={{
    delay: 4000,
    disableOnInteraction: false,
  }}
  loop={true}
  navigation={true}
  modules={[Navigation, Autoplay]}
  className="mySwiper h-[260px] md:!h-[400px]"
  breakpoints={{
    320: { slidesPerView: 4 },
    640: { slidesPerView: 4 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 6 },
  }}
>
  {categories.map((cat, index) => (
    <SwiperSlide
      key={index}
      className="flex flex-col items-center category justify-center scale-[0.5] md:scale-[1]"
    >
      <div className="w-[200px] h-[200px]   shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-[white]">
        <img
          src={cat.image}
          alt={cat.title}
          className="!w-[140px] !h-[140px] imgg !object-contain"
        />
      </div>
      <h2 className="text-[#211C4D] font-[700] text-[24px]">{cat.title}</h2>
    </SwiperSlide>
  ))}
</Swiper>

      <div className="absolute md:top-[10%] top-[2%] right-[25%] md:right-[42%] z-[1]">
        <img src={svg1} alt="" />
      </div>
    </div>
    </div>
  );
};

export default ProductCategoriesSection;