import pattern from '../../assets/images/Layer_1.png'
import logo1 from '../../assets/images/logo1.png'
import logo2 from '../../assets/images/logo2.png'
import logo3 from '../../assets/images/logo3.png'
import logo4 from '../../assets/images/logo4.png'
import { Swiper, SwiperSlide } from "swiper/react";
import {useLangSync} from '@/hooks/useLangSync'
// Import Swiper styles
// import "swiper/css";

import "../../style.css";
import { useEffect } from 'react'

export default function Parttner() {
  
  const {lang} =useLangSync();
    useEffect(() => {
      // لما اللغة تتغير، ممكن تعيد تهيئة السلايدر
      // هنا ممكن تحتاج تستدعي أي دالة من Swiper لإعادة التهيئة
      // مثلاً: swiperRef.ref.current?.update() لو انت مستخدم ref
  
      // مثال بسيط لإعادة التهيئة (لو فيه ref للـ Swiper):
      // swiperRef.current?.update();
  
    }, [lang]); // كل ما الـ lang تتغير، هيعمل التأثير ده
  
  return (
    <div>
<div className='relative flex items-center justify-center'>
    <h1 className='text-[40px] font-[700]  text-[#211C4D]'>العلامات التجارية</h1>
    <img src={pattern} className='absolute top-[20px] right-[36%]' alt="" />
</div>

     <Swiper
     key={lang}
  slidesPerView={6}
  spaceBetween={20}
    dir={lang === "ar" ? "rtl" : "ltr"}

  breakpoints={{
    320: { slidesPerView: 1 },   
    640: { slidesPerView: 3 },   
    768: { slidesPerView: 4 },   
    1024: { slidesPerView: 6 }   
  }}

  className="mySwiper h-[200px] pt-[50px] mt-[60px]"
>
  <SwiperSlide
    className="
      !h-[112px] 
      flex items-center justify-center
      rounded-[12px] 
      bg-white 
      shadow-[0px_4px_4px_0px_#2D295C40]
    "
  >
    <img 
      src={logo1} 
      className="!w-[153px] !h-[30px] !object-contain" 
      alt="logo" 
    />
  </SwiperSlide>

  <SwiperSlide
    className="
      !h-[112px] 
      flex items-center justify-center
      rounded-[12px] 
      bg-white 
      shadow-[0px_4px_4px_0px_#2D295C40]
    "
  >
    <img 
      src={logo2} 
      className="!w-[153px] !h-[30px] !object-contain" 
      alt="logo" 
    />
  </SwiperSlide>
  <SwiperSlide
    className="
      !h-[112px] 
      flex items-center justify-center
      rounded-[12px] 
      bg-white 
      shadow-[0px_4px_4px_0px_#2D295C40]
    "
  >
    <img 
      src={logo2} 
      className="!w-[153px] !h-[30px] !object-contain" 
      alt="logo" 
    />
  </SwiperSlide>
  <SwiperSlide
    className="
      !h-[112px] 
      flex items-center justify-center
      rounded-[12px] 
      bg-white 
      shadow-[0px_4px_4px_0px_#2D295C40]
    "
  >
    <img 
      src={logo3} 
      className="!w-[153px] !h-[30px] !object-contain" 
      alt="logo" 
    />
  </SwiperSlide>
  <SwiperSlide
    className="
      !h-[112px] 
      flex items-center justify-center
      rounded-[12px] 
      bg-white 
      shadow-[0px_4px_4px_0px_#2D295C40]
    "
  >
    <img 
      src={logo4} 
      className="!w-[153px] !h-[30px] !object-contain" 
      alt="logo" 
    />
  </SwiperSlide>
  <SwiperSlide
    className="
      !h-[112px] 
      flex items-center justify-center
      rounded-[12px] 
      bg-white 
      shadow-[0px_4px_4px_0px_#2D295C40]
    "
  >
    <img 
      src={logo1} 
      className="!w-[153px] !h-[30px] !object-contain" 
      alt="logo" 
    />
  </SwiperSlide>
  <SwiperSlide
    className="
      !h-[112px] 
      flex items-center justify-center
      rounded-[12px] 
      bg-white 
      shadow-[0px_4px_4px_0px_#2D295C40]
    "
  >
    <img 
      src={logo1} 
      className="!w-[153px] !h-[30px] !object-contain" 
      alt="logo" 
    />
  </SwiperSlide>
  <SwiperSlide
    className="
      !h-[112px] 
      flex items-center justify-center
      rounded-[12px] 
      bg-white 
      shadow-[0px_4px_4px_0px_#2D295C40]
    "
  >
    <img 
      src={logo1} 
      className="!w-[153px] !h-[30px] !object-contain" 
      alt="logo" 
    />
  </SwiperSlide>
</Swiper>


    </div>
  )
}
