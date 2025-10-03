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
// Correct imports for Swiper v12 CSS files
// import 'swiper/css';
// import 'swiper/css/navigation';

// import required modules
const ProductCategoriesSection: React.FC = () => {
  const {lang}= useLangSync();
    useEffect(() => {
      // لما اللغة تتغير، ممكن تعيد تهيئة السلايدر
      // هنا ممكن تحتاج تستدعي أي دالة من Swiper لإعادة التهيئة
      // مثلاً: swiperRef.ref.current?.update() لو انت مستخدم ref
  
      // مثال بسيط لإعادة التهيئة (لو فيه ref للـ Swiper):
      // swiperRef.current?.update();
  
    }, [lang]); // كل ما الـ lang تتغير، هيعمل التأثير ده
  
  return (
    <div className="relative my-6">
      <h1 className="text-center text-[#211C4D] text-[40px] font-[700]">
        الاقسام
      </h1>
      <Swiper
      key={lang}
        dir={lang === "ar" ? "rtl" : "ltr"}

        slidesPerView={6}
        spaceBetween={0}
        autoplay={{
    delay: 4000, // ⏱ الوقت بين كل سلايد بالمللي ثانية
    disableOnInteraction: false, // ⛔ ما يوقفش لو المستخدم تفاعل
  }}
  loop={true}
        navigation={true}                 // 👈 تفعل الأسهم
        modules={[Navigation ,Autoplay]} // 👈 تضيف Navigation هنا
        className="mySwiper !h-[400px]"
        breakpoints={{
          320: {       // موبايل صغير
            slidesPerView: 1,
          },
          640: {       // موبايل كبير
            slidesPerView: 2,
          },
          768: {       // تابلت
            slidesPerView: 3,
          },
          1024: {      // لابتوب
            slidesPerView: 4,
          },
          1280: {      // ديسكتوب كبير
            slidesPerView: 6,
          },
        }}
      >
        <SwiperSlide className="flex flex-col items-center justify-center">
          <div className="w-[200px] h-[200px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-[white]">
            <img src={image1} alt="" className="!w-[140px] !h-[140px] !object-contain" />
          </div>
          <h2 className="text-[#211C4D] font-[700] text-[24px]">الهواتف الذكيه</h2>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center justify-center">
          <div className="w-[200px] h-[200px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-[white]">
            <img src={image2} alt="" className="!w-[140px] !h-[140px] !object-contain" />
          </div>
          <h2 className="text-[#211C4D] font-[700] text-[24px]">لابتوب</h2>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center justify-center">
          <div className="w-[200px] h-[200px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-[white]">
            <img src={image3} alt="" className="!w-[140px] !h-[140px] !object-contain" />
          </div>
          <h2 className="text-[#211C4D] font-[700] text-[24px]">العاب الفيديو</h2>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center justify-center">
          <div className="w-[200px] h-[200px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-[white]">
            <img src={image4} alt="" className="!w-[140px] !h-[140px] !object-contain" />
          </div>
          <h2 className="text-[#211C4D] font-[700] text-[24px]">الساعات الذكيه </h2>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center justify-center">
          <div className="w-[200px] h-[200px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-[white]">
            <img src={image5} alt="" className="!w-[140px] !h-[140px] !object-contain" />
          </div>
          <h2 className="text-[#211C4D] font-[700] text-[24px]">السماعات </h2>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center justify-center">
          <div className="w-[200px] h-[200px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-[white]">
            <img src={image6} alt="" className="!w-[140px] !h-[140px] !object-contain" />
          </div>
          <h2 className="text-[#211C4D] font-[700] text-[24px]">الكيمرات و الداش كام</h2>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center justify-center">
          <div className="w-[200px] h-[200px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-[white]">
            <img src={image1} alt="" className="!w-[140px] !h-[140px] !object-contain" />
          </div>
          <h2 className="text-[#211C4D] font-[700] text-[24px]">الهواتف الذكيه</h2>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center justify-center">
          <div className="w-[200px] h-[200px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-[white]">
            <img src={image1} alt="" className="!w-[140px] !h-[140px] !object-contain" />
          </div>
          <h2 className="text-[#211C4D] font-[700] text-[24px]">الهواتف الذكيه</h2>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center justify-center">
          <div className="w-[200px] h-[200px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-[white]">
            <img src={image1} alt="" className="!w-[140px] !h-[140px] !object-contain" />
          </div>
          <h2 className="text-[#211C4D] font-[700] text-[24px]">الهواتف الذكيه</h2>
        </SwiperSlide>
      </Swiper>
      <div className="absolute top-[10%] right-[42%] z-[1]">
        <img src={svg1} alt="" />
      </div>
    </div>
  );
};

export default ProductCategoriesSection;