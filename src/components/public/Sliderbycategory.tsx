"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { useLangSync } from "@/hooks/useLangSync";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

// صور الفئات
import phones from "@/assets/images/bluephone.png";
import watches from "@/assets/images/watch.png";
import accessories from "../../assets/images/accessories.png";
import chargers from "../../assets/images/chargers.png";
import laptops from "@/assets/images/orangelabtop.png";
import earbuds from "@/assets/images/airbuds.png";

export default function CategorySlider() {
  const { lang } = useLangSync();
  const swiperRef = useRef<any>(null);

  const categories = [
    { name: "اكسسوارات", img: accessories },
    { name: "الشواحن", img: chargers },
    { name: "ساعات ذكية", img: watches },
    { name: "سماعات", img: earbuds },
    { name: "هواتف", img: phones },
    { name: "لابتوب ابل", img: laptops },
    { name: "لابتوب ابل", img: laptops },
    { name: "لابتوب ابل", img: laptops },
  ];

  return (
    <div className="relative w-full bg-[#E5E5F7] py-6">
      {/* الأسهم */}
      <button
        onClick={() => swiperRef.current.swiper.slidePrev()}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <ChevronLeft className="w-4 h-4 rotate-180 text-[#211C4D]" />
      </button>
      <button
        onClick={() => swiperRef.current.swiper.slideNext()}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <ChevronRight className="w-4 h-4 text-[#211C4D]" />
      </button>

      {/* السلايدر */}
      <Swiper
        ref={swiperRef}
        slidesPerView={6}
        spaceBetween={20}
        dir={lang === "ar" ? "rtl" : "ltr"}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="mySwiper"
      >
        {categories.map((cat, i) => (
          <SwiperSlide key={i}>
            <Link
              to={`/${lang}/trademarkscategory`}
              className="flex flex-col items-center justify-center bg-white rounded-xl py-4 px-3 shadow-[0_4px_8px_#0000001a] hover:shadow-lg transition-all duration-200"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="!w-[182px] !h-[122px] !object-contain"
              />
              <p className="mt-3 text-[#211C4D] text-[24px] font-medium">
                {cat.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
