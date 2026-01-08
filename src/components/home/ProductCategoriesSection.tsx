import { Swiper, SwiperSlide } from "swiper/react";

import svg1 from "../../assets/images/Layer_1.png";
import { useLangSync } from "@/hooks/useLangSync";
import "../../style.css";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import Loader from '@/components/Loader';
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next"; // Import translation hook

export default function ProductCategoriesSection() {

  const { lang } = useLangSync();
  const { t } = useTranslation(); // Use translation hook
  const { fetchCategories, categories } = useCategoriesStore();
  useEffect(() => {
    fetchCategories(lang);
  }, []);
  console.log("home", categories);


  return (
    <div className="xl:px-[90px] px-2 pt-2 md:pt-0">
      <div className="relative my-6">
        <div className="relative w-fit mx-auto mb-8">
          <h1 className="text-center text-[#211C4D] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-[700]">
            {t("Sections")}
          </h1>
          <img
            src={svg1}
            alt=""
            className={`absolute block ${lang === "ar"
              ? "w-[80px] md:w-[110px] -bottom-5 md:-bottom-7 -right-10 md:-right-15"
              : "w-[80px] md:w-[110px] -bottom-5 md:-bottom-7 -left-10 md:-left-15 -scale-x-100"
              }`}
          />
        </div>

        <Swiper
          key={lang} // لإعادة تهيئة السلايدر عند تغيير اللغة
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
          {categories?.map((cat, index) => (
            <SwiperSlide
              key={cat.id ?? index} // نستخدم id إذا كان موجودًا، وإلا index
              className="flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              {cat.slug ? (
                <Link to={`categorySingle/${cat.slug}/products`} className="flex justify-center flex-col items-center">
                  <div className="w-[70px] h-[70px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-white overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="!object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="text-[#211C4D] text-[6px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-[600] mt-2 text-center leading-tight">
                    {cat.name}
                  </h2>
                </Link>
              ) : (
                <div className="w-[70px] h-[70px] sm:w-[110px] sm:h-[110px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-full flex items-center justify-center bg-white overflow-hidden">
                  <img
                    src={cat?.image}
                    alt={cat?.name}
                    className="!object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
      {!categories ? (<Loader />) : ("")}
    </div>
  );
};

// export default ProductCategoriesSection;