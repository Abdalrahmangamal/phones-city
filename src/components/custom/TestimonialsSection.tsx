import React, { useState } from 'react';

const TestimonialsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "يزن مؤمن محمود",
      rating: 4.8,
      image: "/89bb371fe2516fee2bb94a9db64f24dd73fcc67b.png",
      text: "الخدمة جيدة جدًا، خاصة في التوصيل السريع جداً، ليس فقط سريعاً بالنسبة لنا، بل الجودة أيضاً رقم واحد، أوصي بشدة بـ مدينة الهواتف لكم."
    },
    {
      id: 2,
      name: "محمد أحمد علي",
      rating: 5.0,
      image: "/89bb371fe2516fee2bb94a9db64f24dd73fcc67b.png",
      text: "تجربة ممتازة مع فريق العمل، المنتجات بجودة عالية والتوصيل كان سريع جدًا. أنصح الجميع بالشراء من هنا."
    },
    {
      id: 3,
      name: "سارة عبدالله محمد",
      rating: 4.9,
      image: "/89bb371fe2516fee2bb94a9db64f24dd73fcc67b.png",
      text: "خدمة عملاء رائعة ودعم فني متميز. المنتجات كما هو موضح في الموقع والأسعار تنافسية جدًا."
    }
  ];

  // Render star ratings
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex gap-1" aria-hidden>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            {i < fullStars ? (
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#F3AC5D"
              />
            ) : i === fullStars && hasHalfStar ? (
              <>
                <defs>
                  <linearGradient id="half-star">
                    <stop offset="50%" stopColor="#F3AC5D" />
                    <stop offset="50%" stopColor="#CAD0D9" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="url(#half-star)"
                />
              </>
            ) : (
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#CAD0D9"
              />
            )}
          </svg>
        ))}
      </div>
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="w-full max-w-[1280px] h-[574px] bg-white rounded-[16px] overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-[-174.07px] left-[-265px] w-[868px] h-[868px] rounded-full bg-[#211C4D0A] z-0"></div>
      <div className="absolute top-[-143.07px] left-[-240px] w-[806px] h-[806px] rounded-full bg-[#211C4D] z-0"></div>
      
      {/* Section header container (title + arrows + Layer_1.svg) */}
      <div className="relative z-10">
        {/* Title block positioned per design */}
        <div className="absolute top-[58px] right-[58.49px] w-[319px] h-[149px] flex flex-col gap-[12px]">
          <div className="relative">
            <h2 className="font-roboto font-bold text-[40px] leading-[650%] text-[#211C4D] text-right">
              اراء العملاء
            </h2>

            {/* Under the title: arrows (correct directions) */}
            <div className="mt-[12px] flex items-center gap-[12px] justify-end">
              {/* previous (points left) */}
              <button
                onClick={prevSlide}
                aria-label="السابق"
                className="w-[36px] h-[36px] rounded-[8px] bg-white shadow flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  {/* left pointing arrow */}
                  <path d="M15 18L9 12L15 6" stroke="#211C4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* next (points right) */}
              <button
                onClick={nextSlide}
                aria-label="التالي"
                className="w-[36px] h-[36px] rounded-[8px] bg-white shadow flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  {/* right pointing arrow */}
                  <path d="M9 6L15 12L9 18" stroke="#211C4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Layer_1.svg under the title (decorative) */}
            <div className="absolute top-[48px] right-[-20px]">
              <img src="/Layer_1.svg" alt="" className="w-[110px] h-[255.61px]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials slider */}
      <div className="absolute top-[125.93px] left-[-433px] w-[1230px] h-[304px] flex gap-[30px]">
        {/* Current testimonial */}
        <div className="w-[600px] h-[304px] bg-white rounded-[12px] shadow-[0px_0px_20px_0px_#0000000D] p-[40px] flex flex-col items-end gap-[24px] z-10">
          <div className="w-full flex flex-col items-end gap-[15px]">
            <div className="w-[520px] h-[80px] flex items-center gap-[16px] justify-end">
              <div className="flex flex-col items-end">
                <h3 className="font-poppins font-medium text-[24px] leading-[22.4px] text-[#211C4D]">
                  {testimonials[currentSlide].name}
                </h3>
                <div className="flex items-center gap-[8px] mt-[8px] justify-end">
                  <span className="font-poppins font-medium text-[15px] leading-[22.4px] text-[#211C4D]">
                    {testimonials[currentSlide].rating}
                  </span>
                  {renderStars(testimonials[currentSlide].rating)}
                </div>
              </div>
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
                <img 
                  src={testimonials[currentSlide].image} 
                  alt={testimonials[currentSlide].name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <p className="w-[520px] h-[120px] font-roboto font-medium text-[24px] leading-[40px] text-[#211C4D] text-right">
            {testimonials[currentSlide].text}
          </p>
        </div>
        
        {/* Next testimonial (preview) */}
        <div className="w-[600px] h-[304px] bg-white rounded-[12px] shadow-[0px_0px_20px_0px_#0000000D] p-[40px] flex flex-col items-end gap-[24px] opacity-60">
          <div className="w-full flex flex-col items-end gap-[15px]">
            <div className="w-[520px] h-[80px] flex items-center gap-[16px] justify-end">
              <div className="flex flex-col items-end">
                <h3 className="font-poppins font-medium text-[24px] leading-[22.4px] text-[#211C4D]">
                  {testimonials[(currentSlide + 1) % testimonials.length].name}
                </h3>
                <div className="flex items-center gap-[8px] mt-[8px] justify-end">
                  <span className="font-poppins font-medium text-[15px] leading-[22.4px] text-[#211C4D]">
                    {testimonials[(currentSlide + 1) % testimonials.length].rating}
                  </span>
                  {renderStars(testimonials[(currentSlide + 1) % testimonials.length].rating)}
                </div>
              </div>
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
                <img 
                  src={testimonials[(currentSlide + 1) % testimonials.length].image} 
                  alt={testimonials[(currentSlide + 1) % testimonials.length].name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <p className="w-[520px] h-[120px] font-roboto font-medium text-[24px] leading-[40px] text-[#211C4D] text-right">
            {testimonials[(currentSlide + 1) % testimonials.length].text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
