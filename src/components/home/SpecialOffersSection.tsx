"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Autoplay } from "swiper/modules";
// import "swiper/css";
import "swiper/css/navigation";

import {useLangSync} from '@/hooks/useLangSync'
import { Link } from "react-router-dom";
import ProductCard from "../public/ProductCard";
import type { Product } from '@/types/index';
// type Product = {
//   id: number;
//   name: string;
//   image: string;
//   originalPrice: string;
//   discountedPrice: string;
  
//   discount: string;
//   rating: number;
//   reviews: number;
//   colors: string[];
// };

interface SpecialOffersProps {
  products: Product[];
  title?: string;
  style:string;
}
const SpecialOffersSection: React.FC<SpecialOffersProps> = ({ products,title ,style }) => {
  const {lang} =useLangSync();
  useEffect(() => {


  }, [lang]); // كل ما الـ lang تتغير، هيعمل التأثير ده




  return (
    <div className={`w-full flex  md:mt-[80px] flex-col  xl:px-[90px] px-2 pt-0 md:pt-0 items-start md:gap-[32px] gap-[0px] ${style}`}>
      {/* header */}
      <div className="w-full flex items-center justify-between relative">
        <div className="relative">
          <div className="absolute md:-top-2 right-[200px] md:-right-4 z-5">
            <img src="/Layer_1.svg" alt="" className="opacity-100" />
          </div>
          <h2 className="font-roboto font-semibold md:!text-[40px] text-[24px] leading-[36px] text-[#211C4D] relative z-10">
        
            {title}
          </h2>
        </div>
        <Link className="flex  items-center gap-[6px] py-[10px] rounded-[4px]" to={`/trademarkbestoffer`}>
          <span className="font-roboto font-medium md:text-[24px] leading-[20px] text-[#211C4D]">
            عرض المزيد
          </span>
          <svg
          className="w-[18px] md:w-[25px]"
            width="25.47"
            height="28.44"
            viewBox="0 0 25 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 5L8.5 13L14.5 21"
              stroke="#211C4D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div className="w-full h-[0px] border-t border-[#E5E7EB]" />

      {/* slider */}
      <Swiper
      key={lang}
        modules={[Navigation , Autoplay]}
        navigation
        loop={true}
          dir={lang === "ar" ? "rtl" : "ltr"}

        autoplay={{
    delay: 4000, // ⏱ الوقت بين كل سلايد بالمللي ثانية
    disableOnInteraction: false, // ⛔ ما يوقفش لو المستخدم تفاعل
  }}
        
        slidesPerView={4}
        className="w-full h-[350px] md:h-[500px]"
          breakpoints={{
    350: {
      slidesPerView: 3, // من أول شاشات الموبايل الكبير (تابلت صغير)
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 3, // من أول شاشات الموبايل الكبير (تابلت صغير)
      spaceBetween: 0,
    },
    768: {
      slidesPerView: 3, // التابلت
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3, // الديسكتوب
    },
    1280: {
      slidesPerView: 4, // الشاشات الكبيرة
      
    },
  }}

      >
        {products.map((item) => (
          <SwiperSlide key={item.id} >
          <ProductCard
                    key={item.id}
                    name={item.name}
                    discount={item.discount}
                    price={item.price}
                    isNew={item.isNew}
                    favourite={item.favourite}
                    variations={item.variations}
                    id={item.id}
                    imagecard="!h-[100px] !w-[100px]"
                    containerstyle="!p-2 pb-3 !rounded-[10px] !min-h-fit"
                  />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SpecialOffersSection;