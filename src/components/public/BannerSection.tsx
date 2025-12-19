import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

// تحديث الاسم ليكون أكثر دقة (بدلاً من CategoriesSection)
interface BannerSectionProps {
  images: [];
  autoplayDelay?: number;
}

const BannerSection: React.FC<BannerSectionProps> = ({
  images,
  autoplayDelay = 4000,
}) => {
  // 🟡 لا توجد صور
  if (!images || images.length === 0) {
    return (
      <div className="w-full md:my-15 xl:px-[90px] px-2 md:px-0">
        <div className="w-full h-[140px] md:h-[190.38px] rounded-[16px] overflow-hidden bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">لا توجد صور متاحة</p>
        </div>
      </div>
    );
  }

  // 🟢 صورة واحدة فقط
  if (images.length === 1) {
    return (
      <div className="w-full md:my-15 xl:px-[90px] px-2 md:px-0">
        <div className="w-full h-[140px] md:h-[190.38px] rounded-[16px] overflow-hidden">
          <img
            src={images}
            alt="بانر"
            className="w-full h-full object-contain rounded-[20px]"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  // 🔵 عدة صور → استخدام Swiper مع تأثير Fade
  return (
    <div className="w-full md:my-15 xl:px-[90px] px-2 md:px-0">
      <div className="w-full h-[140px] md:h-[190.38px] rounded-[16px] overflow-hidden">
        <Swiper
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          slidesPerView={1}
          spaceBetween={0}
          modules={[Autoplay, EffectFade]}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`banner-${index}`} className="w-full h-full">
              <img
                src={image}
                alt={`بانر ${index + 1}`}
                className="w-full h-full object-contain rounded-[20px]"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSection;