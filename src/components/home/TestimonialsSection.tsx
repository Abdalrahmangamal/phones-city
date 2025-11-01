import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
// import 'swiper/css';
// import 'swiper/css/navigation';
import blue from "../../assets/images/Ellipse 2.png";
import gray from "../../assets/images/Ellipse 1.png";
import placeholderImage from "../../assets/images/image_placeholder.png";
import arrowUp from "../../assets/images/arrowup.png";
import arrowDown from "../../assets/images/arrowdown.png";
import { useEffect, useRef } from "react";
import { useLangSync } from "@/hooks/useLangSync";
import pattern from "../../assets/images/Layer_1.png";
const TestimonialsSection = () => {
  const { lang } = useLangSync();
  useEffect(() => {
    // لما اللغة تتغير، ممكن تعيد تهيئة السلايدر
    // هنا ممكن تحتاج تستدعي أي دالة من Swiper لإعادة التهيئة
    // مثلاً: swiperRef.ref.current?.update() لو انت مستخدم ref
    // مثال بسيط لإعادة التهيئة (لو فيه ref للـ Swiper):
    // swiperRef.current?.update();
  }, [lang]); // كل ما الـ lang تتغير، هيعمل التأثير ده

  const swiperRef = useRef<SwiperType | null>(null);

  const testimonials = [
    {
      name: "يزن مؤمن محمود",
      rating: 4.8,
      text: "الخدمة جيدة جدًا، خاصة في التوصيل السريع جداً، ليس فقط سريعاً بالنسبة لنا، بل الجودة أيضاً رقم واحد، أوصي بشدة بـ مدينة الهواتف لكم.",
      image: placeholderImage,
    },
    {
      name: "أحمد علي",
      rating: 4.5,
      text: "تجربة رائعة، سأعود مرة أخرى!",
      image: placeholderImage,
    },
    {
      name: "سارة محمد",
      rating: 5.0,
      text: "أفضل خدمة عملاء حصلت عليها، محترفين جداً وسريعين في الاستجابة.",
      image: placeholderImage,
    },
    {
      name: "سارة محمد",
      rating: 5.0,
      text: "أفضل خدمة عملاء حصلت عليها، محترفين جداً وسريعين في الاستجابة.",
      image: placeholderImage,
    },
    {
      name: "خالد عبدالله",
      rating: 4.2,
      text: "جودة المنتج ممتازة والتوصيل في الوقت المحدد.",
      image: placeholderImage,
    },
  ];

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

  return (
    <section className="w-full  xl:px-[90px] px-2 pt-0 md:pt-0 min-h-[500px] lg:h-[900px]  flex items-center justify-center py-10 lg:py-0 lg:mt-6 relative overflow-hidden ">
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 lg:gap-10 w-full items-center relative z-10">
        {/* الجزء الأيمن - 1/3 من الشاشة */}
        <div className="flex flex-col items-start mb-10 gap-4 lg:gap-6 relative z-20 text-right order-1 lg:order-1 lg:col-span-1">
          <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto">
            <img src={pattern} alt="" className="w-12 h-12 lg:w-20 lg:h-20" />
            <h2 className="font-roboto font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-[28px] lg:leading-[36px] text-[#211C4D] mr-2">
              آراء العملاء
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
                alt="السابق"
                className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
              />
            </button>
            <button
              className="swiper-button-next-custom p-2 hover:bg-gray-100 rounded transition-colors"
              onClick={handleNext}
            >
              <img
                src={arrowUp}
                alt="التالي"
                className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
              />
            </button>
          </div>
        </div>

        {/* الجزء الأيسر - 2/3 من الشاشة */}
        <div className="relative flex justify-start items-start h-full order-2 lg:order-2 lg:col-span-2">
          {/* الخلفيات - تبدأ من نفس النقطة على اليسار */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-start z-0">
            <img
              src={blue}
              alt=""
              className="opacity-100 object-cover min-w-[300px] h-[300px] sm:min-w-[500px] sm:min-h-[500px] lg:min-w-[706px] xl:min-w-[806px] xl:min-h-[606px] lg:min-h-[706px]"
            />
          </div>
          {/* <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-start z-0">
            <img
              src={gray}
              alt=""
              className="opacity-100 object-cover min-w-[350px] h-[200px] sm:min-w-[550px] sm:min-h-[500px] lg:!w-[300px]  lg:min-h-[806px]"
            />
          </div> */}

          {/* الـ Slider - يأخذ 2/3 من الشاشة */}
          <div className="w-full h-full flex items-center justify-center md:!justify-end  z-20 relative ml-0 lg:ml-8">
            <div className="w-full max-w-[900px] md:w-[72%] lg:w-[94%] mx-auto md:!m-0 px-2 sm:px-4">
              <Swiper
                key={lang}
                dir={lang === "ar" ? "rtl" : "ltr"}
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                loop={true}
                slidesPerView={1}
                autoplay={{
                  delay: 2000, // ⏱ الوقت بين كل سلايد بالمللي ثانية
                  disableOnInteraction: false, // ⛔ ما يوقفش لو المستخدم تفاعل
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
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex items-center !w-00px] justify-center">
                      <div className="bg-white p-4 sm:p-5 rounded-[16px] shadow-lg w-full max-w-[320px] sm:max-w-[300px] lg:max-w-[900px] h-[200px] sm:h-[300px] lg:h-[304px] relative">
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="rounded-full object-cover flex-shrink-0 mr-2 sm:mr-3"
                            style={{ width: "40px", height: "40px" }}
                          />
                          <div className="flex-1 text-right">
                            <h3 className="text-[15px] sm:text-lg lg:text-[20px] font-bold text-[#211C4D] mb-1">
                              {testimonial.name}
                            </h3>
                            <div className="flex justify-start items-center gap-1 ">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-[20px] sm:text-[25px] w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] lg:w-[20px] lg:h-[20px] flex items-center justify-center ${
                                    i < Math.round(testimonial.rating)
                                      ? "text-[#F3AC5D]"
                                      : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                              <span className="text-[15px] sm:text-[15px] font-[500] text-[#211C4D]">
                                {testimonial.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Text */}
                        <div className="p-2 sm:p-4 bg-white mb-2 sm:mb-3">
                          <p className="text-[#211C4D] text-[10px] sm:text-lg lg:text-[18px] font-[500] leading-relaxed text-right">
                            {testimonial.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
