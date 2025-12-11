import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import blue from "../../assets/images/Ellipse 2.png";
import placeholderImage from "../../assets/images/image_placeholder.png";
import arrowUp from "../../assets/images/arrowup.png";
import arrowDown from "../../assets/images/arrowdown.png";
import { useEffect, useRef } from "react";
import { useLangSync } from "@/hooks/useLangSync";
import pattern from "../../assets/images/Layer_1.png";
import { useTestimonialStore } from "@/store/home/testimonialStore"; 

const TestimonialsSection = () => {
  const { lang } = useLangSync();
  const swiperRef = useRef<SwiperType | null>(null);
  
  // استخدام المخزن
  const {
    testimonials,
    loading,
    error,
    fetchTestimonials,
    getLocalizedName,
    getLocalizedDescription
  } = useTestimonialStore();

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // إعادة تهيئة السلايدر عند تغيير اللغة
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [lang, testimonials]); 

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  // الترجمة الديناميكية للعنوان
  const getTitle = () => {
    return lang === "ar" ? "آراء العملاء" : "Customer Testimonials";
  };

  // تحميل حالة أو خطأ
  if (loading) {
    return (
      <section className="w-full xl:px-[90px] px-2 pt-0 md:pt-0 min-h-[500px] lg:h-[900px] flex items-center justify-center py-10 lg:py-0 lg:mt-6 relative overflow-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#211C4D] mx-auto"></div>
          <p className="mt-4 text-[#211C4D]">
            {lang === "ar" ? "جاري تحميل آراء العملاء..." : "Loading testimonials..."}
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    console.warn('Error loading testimonials:', error);
    
  }

  // استخدام البيانات من المخزن أو البيانات الثابتة كنسخة احتياطية
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: 1,
      name: "يزن مؤمن محمود",
      name_en: "Yazen Moumen Mahmoud",
      name_ar: "يزن مؤمن محمود",
      description: "تجربة رائعة، سأعود مرة أخرى!",
      description_en: "Great experience, I'll come back again!",
      description_ar: "تجربة رائعة، سأعود مرة أخرى!",
      image: placeholderImage,
      rate: 4.8,
      created_at: "",
      updated_at: ""
    },
    
  ];

  return (
    <section className="w-full xl:px-[90px] px-2 pt-0 md:pt-0 min-h-[500px] lg:h-[900px] flex items-center justify-center py-10 lg:py-0 lg:mt-6 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 w-full items-center relative z-10">
        {/* الجزء الأيمن */}
        <div className="flex flex-col items-start mb-10 gap-4 lg:gap-6 relative z-20 text-right order-1 lg:order-1 lg:col-span-1">
          <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto">
            <img src={pattern} alt="" className="w-12 h-12 lg:w-20 lg:h-20" />
            <h2 className="font-roboto font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-[28px] lg:leading-[36px] text-[#211C4D] mr-2">
              {getTitle()}
            </h2>
          </div>

          {/* أزرار التحكم */}
          <div className="flex mt-4 lg:mt-8 justify-center lg:justify-start w-full lg:w-auto lg:mr-[50px] gap-4">
            <button
              className="swiper-button-prev-custom p-2 hover:bg-gray-100 rounded transition-colors"
              onClick={handlePrev}
            >
              <img
                src={arrowDown}
                alt={lang === "ar" ? "السابق" : "Previous"}
                className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
              />
            </button>
            <button
              className="swiper-button-next-custom p-2 hover:bg-gray-100 rounded transition-colors"
              onClick={handleNext}
            >
              <img
                src={arrowUp}
                alt={lang === "ar" ? "التالي" : "Next"}
                className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
              />
            </button>
          </div>
        </div>

        {/* الجزء الأيسر */}
        <div className="relative flex justify-start items-start h-full order-2 lg:order-2 lg:col-span-2">
          {/* الخلفيات */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-start z-0">
            <img
              src={blue}
              alt=""
              className="opacity-100 object-cover min-w-[300px] h-[300px] sm:min-w-[500px] sm:min-h-[500px] lg:min-w-[706px] xl:min-w-[806px] xl:min-h-[606px] lg:min-h-[706px]"
            />
          </div>

          {/* الـ Slider */}
          <div className="w-full h-full flex items-center justify-center md:!justify-end z-20 relative ml-0 lg:ml-8">
            <div className="w-full max-w-[900px] md:w-[72%] lg:w-[94%] mx-auto md:!m-0 px-2 sm:px-4">
              <Swiper
                key={`${lang}-${testimonials.length}`} 
                dir={lang === "ar" ? "rtl" : "ltr"}
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                loop={displayTestimonials.length > 1}
                slidesPerView={1}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                centeredSlides={true}
                breakpoints={{
                  480: { slidesPerView: 1, spaceBetween: 15 },
                  640: { slidesPerView: 1.2, spaceBetween: 20 },
                  768: { slidesPerView: 1.5, spaceBetween: 25 },
                  1024: { slidesPerView: 2, spaceBetween: 30 },
                  1280: { slidesPerView: 2, spaceBetween: 30 },
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className="mySwiper w-full"
              >
                {displayTestimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <div className="flex items-center !w-full justify-center">
                      <div className="bg-white p-4 sm:p-5 rounded-[16px] shadow-lg w-full max-w-[320px] sm:max-w-[300px] lg:max-w-[900px] h-[200px] sm:h-[300px] lg:h-[304px] relative">
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
                          <img
                            src={testimonial.image || placeholderImage}
                            alt={getLocalizedName(testimonial, lang)}
                            className="rounded-full object-cover flex-shrink-0 mr-2 sm:mr-3"
                            style={{ width: "40px", height: "40px" }}
                            onError={(e) => {
                              // إذا فشل تحميل الصورة، استخدم الصورة البديلة
                              e.currentTarget.src = placeholderImage;
                            }}
                          />
                          <div className="flex-1 text-right">
                            <h3 className="text-[15px] sm:text-lg lg:text-[20px] font-bold text-[#211C4D] mb-1">
                              {getLocalizedName(testimonial, lang)}
                            </h3>
                            <div className="flex justify-start items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-[20px] sm:text-[25px] w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] lg:w-[20px] lg:h-[20px] flex items-center justify-center ${
                                    i < Math.round(testimonial.rate)
                                      ? "text-[#F3AC5D]"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                              <span className="text-[15px] sm:text-[15px] font-[500] text-[#211C4D]">
                                {testimonial.rate.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Text */}
                        <div className="p-2 sm:p-4 bg-white mb-2 sm:mb-3">
                          <p className="text-[#211C4D] text-[10px] sm:text-lg lg:text-[18px] font-[500] leading-relaxed text-right">
                            {getLocalizedDescription(testimonial, lang)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              
              {!loading && displayTestimonials.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-[#211C4D]">
                    {lang === "ar" ? "لا توجد آراء متاحة حاليًا" : "No testimonials available"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;