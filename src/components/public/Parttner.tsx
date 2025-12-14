// components/public/Parttner.tsx
import pattern from "../../assets/images/Layer_1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLangSync } from "@/hooks/useLangSync";
import "../../style.css";
import { Link } from "react-router-dom";
import useS24Ultra from "@/hooks/useS24Ultra";
import S24Parttner from "@/components/s24-ultra/S24Parttner";
import Loader from "@/components/Loader";
import { useTranslation } from "react-i18next";

// تعريف نوع العلامة التجارية (Trademark)
interface Trademark {
  id?: number;
  slug: string;
  image: string;
  // يمكن إضافة name_ar / name_en إذا كان مطلوبًا لاحقًا
}

// Props الجديدة: نستقبل treadmark جاهزة من Home.tsx
interface ParttnerProps {
  trademarks: Trademark[] | null; // null أثناء التحميل
}

export default function Parttner({ trademarks }: ParttnerProps) {
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const isS24Ultra = useS24Ultra();

  // إذا كان الجهاز S24 Ultra → نعرض النسخة الخاصة
  if (isS24Ultra) {
    return <S24Parttner />;
  }

  // حالة التحميل (أثناء جلب البيانات في Home.tsx)
  if (trademarks === null) {
    return <Loader />;
  }

  // حالة عدم وجود علامات تجارية (اختياري)
  if (trademarks.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 text-lg">{t("noBrandsAvailable") || "لا توجد علامات تجارية متاحة حاليًا"}</p>
      </div>
    );
  }

  return (
    <div>
      {/* العنوان مع الزخرفة */}
      <div className="relative flex items-center justify-center mt-[40px]">
        <h1 className="md:text-[40px] text-[24px] font-[700] text-[#211C4D]">
          {t("Brands")}
        </h1>
        <img
          src={pattern}
          className="absolute w-[80px] top-2 md:top-[20px] right-[18%] md:right-[36%]"
          alt=""
        />
      </div>

      {/* السلايدر */}
      <Swiper
        key={lang} // لإعادة تهيئة السلايدر عند تغيير اللغة
        slidesPerView={6}
        spaceBetween={20}
        dir={lang === "ar" ? "rtl" : "ltr"}
        breakpoints={{
          320: { slidesPerView: 4 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="mySwiper !px-[20px] md:px-[0px] h-[100px] md:h-[130px] pt-[50px] mt-[60px]"
      >
        {trademarks.map((item) => (
          <SwiperSlide
            key={item.id ?? item.slug} // key آمن
            className="
              !h-[70px]
              md:!h-[120px] 
              flex items-center justify-center
              rounded-[12px] 
              bg-white 
              shadow-[0px_4px_4px_0px_#2D295C40]
            "
          >
            <Link to={`/${lang}/trademarks/${item.slug}`}>
              <img
                src={item.image}
                className="w-full h-full !object-contain"
                alt="brand logo"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}