import { Swiper, SwiperSlide } from "swiper/react";

import svg1 from "../../assets/images/Layer_1.png";
import { useLangSync } from "@/hooks/useLangSync";
import "../../style.css";
import { Navigation, Autoplay } from "swiper/modules";
import useS24Ultra from "@/hooks/useS24Ultra";
import S24ProductCategoriesSection from "@/components/s24-ultra/S24ProductCategoriesSection";
import { Link } from "react-router-dom";

// تعريف نوع الفئة (Category) حسب الـ API المتوقع
interface Category {
  id?: number;
  slug?: string;
  name: string;
  image?: string;
  // أضف المزيد إذا كان هناك حقول أخرى
}

// Props الجديدة: نستقبل categories جاهزة من Home.tsx
interface ProductCategoriesSectionProps {
  categories?: Category[];
}

const ProductCategoriesSection: React.FC<ProductCategoriesSectionProps> = ({
  categories = [],
}) => {
  const { lang } = useLangSync();
  const isS24Ultra = useS24Ultra();

  // إذا كان الجهاز S24 Ultra، نعرض النسخة الخاصة به
  if (isS24Ultra) {
    return <S24ProductCategoriesSection />;
  }

  // حالة تحميل أو عدم وجود بيانات
  if (!categories || categories.length === 0) {
    return (
      <div className="xl:px-[90px] px-2 pt-2 md:pt-0">
        <div className="relative my-6">
          <h1 className="text-center text-[#211C4D] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-[700]">
            الأقسام
          </h1>
          <div className="flex items-center justify-center h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]">
            <p className="text-gray-500">
              {lang === "ar" ? "جاري تحميل الأقسام..." : "Loading categories..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:px-[90px] px-2 pt-2 md:pt-0">
      <div className="relative my-6">
        <h1 className="text-center text-[#211C4D] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-[700]">
          الأقسام
        </h1>

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
          {categories.map((cat, index) => (
            <SwiperSlide
              key={cat.id ?? index} // نستخدم id إذا كان موجودًا، وإلا index
              className="flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              {cat.slug ? (
                <Link to={`categorySingle/${cat.slug}/products`}>
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
                    src={cat.image}
                    alt={cat.name}
                    className="!object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* الزخرفة الثابتة */}
        <div className="absolute md:top-[10%] top-[2%] right-[20%] md:right-[42%] z-[1] opacity-70 pointer-events-none">
          <img
            src={svg1}
            alt=""
            className="w-[100px] sm:w-[100px] md:w-[150px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCategoriesSection;