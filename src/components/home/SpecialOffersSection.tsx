// SpecialOffersSection.tsx 
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./SpecialOffersSection.css";

import { useLangSync } from '@/hooks/useLangSync';
import { Link } from "react-router-dom";
import ProductCard from "../public/ProductCard";
import type { Product } from '@/types/index';
import { useTranslation } from "react-i18next";

interface SpecialOffersSectionProps {
  products: Product[];
  title?: string;
  style?: string;
  link?: string;
  isLoading?: boolean;
}

const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  products,
  title = "Special Offers",
  style = "",
  link = "",
  isLoading = false
}) => {
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const [shouldAllowSlide, setShouldAllowSlide] = useState(true);

  // حالة التحميل
  if (isLoading) {
    return (
      <div className={`special-offers-container w-full flex md:mt-[80px] flex-col xl:px-[90px] px-2 pt-0 md:pt-0 items-start md:gap-[32px] gap-[0px] ${style}`}>
        {/* Header - مطابق لـ BestSellers */}
        <div className="w-full flex items-center justify-between relative mb-4">
          <div className="relative">
            <div className={`absolute md:-top-2 z-5 ${lang === 'en' ? 'left-[200px] md:-left-4 -scale-x-100' : 'right-[200px] md:-right-4'}`}>
              <img src="/Layer_1.svg" alt="" className="opacity-100" />
            </div>
            <h2 className="font-roboto font-semibold md:!text-[40px] text-[24px] leading-[36px] text-[#211C4D] relative z-10">
              {t(title)}
            </h2>
          </div>

          <div className="flex items-center gap-[6px] py-[10px] rounded-[4px] opacity-50">
            <span className="font-roboto font-medium md:text-[24px] leading-[20px] text-[#211C4D]">
              {t('ViewAll')}
            </span>
            <svg
              className={`w-[18px] md:w-[25px] ${lang === 'en' ? 'rotate-180' : ''}`}
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
          </div>
        </div>

        {/* Skeleton Loader */}
        <div className="w-full relative">
          <Swiper
            modules={[Navigation]}
            navigation={false}
            slidesPerView={4}
            spaceBetween={20}
            className="w-full pb-10"
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {[...Array(4)].map((_, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="h-full animate-pulse">
                  <div className="bg-gray-200 rounded-[10px] p-2 pb-3 min-h-[200px] h-full">
                    <div className="h-[100px] w-[100px] bg-gray-300 rounded mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }


  if (!products || products.length === 0) {
    return null;
  }

  const slidesPerView = 4;

  const calculateShouldAllowSlide = () => {
    const width = window.innerWidth;
    let currentSlidesPerView = slidesPerView;

    if (width < 480) currentSlidesPerView = 2;
    else if (width < 640) currentSlidesPerView = 2;
    else if (width < 768) currentSlidesPerView = 2;
    else if (width < 1024) currentSlidesPerView = 3;
    else if (width < 1280) currentSlidesPerView = 3;
    else currentSlidesPerView = 4;

    return products.length > currentSlidesPerView;
  };

  useEffect(() => {
    setShouldAllowSlide(calculateShouldAllowSlide());
    const handleResize = () => {
      setShouldAllowSlide(calculateShouldAllowSlide());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [products.length, lang]);

  return (
    <div className={`special-offers-container w-full flex md:mt-[80px] flex-col xl:px-[90px] px-2 pt-0 md:pt-0 items-start md:gap-[32px] gap-[0px] ${style}`}>
      {/* Header */}
      <div className="w-full flex items-center justify-between relative mb-4">
        <div className="relative">
          <div className={`absolute md:-top-2 z-5 ${lang === 'en' ? 'left-[200px] md:-left-4 -scale-x-100' : 'right-[200px] md:-right-4'}`}>
            <img src="/Layer_1.svg" alt="" className="opacity-100" />
          </div>
          <h2 className="font-roboto font-semibold md:!text-[40px] text-[24px] leading-[36px] text-[#211C4D] relative z-10">
            {t(title)}
          </h2>
        </div>

        <Link
          className="flex items-center gap-[6px] py-[10px] rounded-[4px] hover:opacity-80 transition-opacity"
          to={`/${lang}/${link}`}
        >
          <span className="font-roboto font-medium md:text-[24px] leading-[20px] text-[#211C4D]">
            {t('ViewAll')}
          </span>
          <svg
            className={`w-[18px] md:w-[25px] ${lang === 'en' ? 'rotate-180' : ''}`}
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

      {/* Slider Container - هيكل مطابق لـ BestSellers */}
      <div className={`w-full relative special-offers-swiper ${!shouldAllowSlide ? 'no-scroll' : ''}`}>
        <Swiper
          key={lang + products.length}
          modules={[Navigation,
            // Autoplay
          ]}
          navigation={{
            nextEl: '.special-offers-next',
            prevEl: '.special-offers-prev',
            enabled: shouldAllowSlide,
          }}
          loop={shouldAllowSlide && products.length > slidesPerView}
          dir={lang === "ar" ? "rtl" : "ltr"}
          // autoplay={
          //   shouldAllowSlide ? {
          //     delay: 4000,
          //     disableOnInteraction: false,
          //   } : false
          // }
          slidesPerView={slidesPerView}
          spaceBetween={20}
          className="w-full pb-10"
          allowTouchMove={shouldAllowSlide}
          allowSlidePrev={shouldAllowSlide}
          allowSlideNext={shouldAllowSlide}
          watchSlidesProgress={shouldAllowSlide}
          resistance={shouldAllowSlide}
          resistanceRatio={shouldAllowSlide ? 0.85 : 0}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
              allowTouchMove: products.length > 1,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
              allowTouchMove: products.length > 2,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
              allowTouchMove: products.length > 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
              allowTouchMove: products.length > 3,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
              allowTouchMove: products.length > 3,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
              allowTouchMove: products.length > 4,
            },
          }}
        >
          {products.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="h-full">
                <ProductCard
                  key={item.id}
                  product={item}
                  name={item.name}
                  discount={item.discount || item.discount_percentage || 0}
                  price={item.price || item.final_price}
                  isNew={item.is_new || item.isNew || false}
                  favourite={item.is_favorite || item.favourite || false}
                  variations={item.variations || []}
                  id={item.slug}
                  imagecard="!h-[100px] !w-[100px]"
                  containerstyle="!p-2 pb-3 !rounded-[10px]  !w-[150px]  !min-h-fit h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* أزرار التنقل - نفس موقع BestSellers */}
        {shouldAllowSlide && products.length > 1 && (
          <>
            <div className={`special-offers-prev ${!shouldAllowSlide ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={`special-offers-next ${!shouldAllowSlide ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpecialOffersSection;