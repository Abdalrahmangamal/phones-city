import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-[200px] md:h-[347px] rounded-[8px] flex items-center justify-start overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          background: 'linear-gradient(90deg, rgba(33, 28, 77, 0) 1.44%, rgba(33, 28, 77, 0.2) 32.21%, #211C4D 100%), url(/111.png)',
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Content - properly aligned for Arabic RTL layout */}
      <div className="relative z-10 w-full md:w-[458px] h-[260px] mr-0 md:mr-[100px] flex flex-col gap-[17px] items-end pr-4 md:pr-0 pt-4 md:pt-0">
        <div className="w-full md:w-[458px] h-auto md:h-[136px]">
          <h1 className="font-roboto font-bold text-[24px] md:text-[48px] leading-[32px] md:leading-[68px] text-white text-right [text-shadow:0px_15px_5px_rgba(0,0,0,0.25)]">
            افضل اجهزه الكمبيوتر المحموله
          </h1>
        </div>
        
        <div className="w-full md:w-[458px] h-auto md:h-[48px]">
          <p className="font-roboto font-bold text-[12px] md:text-[16px] leading-[16px] md:leading-[24px] text-white text-right [text-shadow:0px_15px_3px_rgba(0,0,0,0.25)]">
            استمتع بتجربة استثنائية مع أحدث الهواتف بأفضل الأسعار وخدمة ما بعد البيع المميزة
          </p>
        </div>
      </div>
      <div className="absolute z-20 bottom-10 right-10">
        <button className="flex items-center justify-center gap-[8px] w-[116px] h-[42px] py-[10px] px-[24px] bg-[#F3AC5D] rounded-[8px]">
          <span className="font-roboto font-medium text-[14px] md:text-[16px] leading-[20px] text-white">
            تسوق الآن
          </span>
          {/* Arrow icon on the left for Arabic RTL layout */}
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7H1M1 7L7 1M1 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(30 9 7)"/>
          </svg>
        </button>
      </div>
      
      {/* Pagination Dots - centered at the bottom */}
      <div className="absolute bottom-[10px] md:bottom-[20px] left-1/2 transform -translate-x-1/2 flex gap-[8px] z-10">
        <div className="w-[8px] h-[8px] rounded-[4px] bg-[#F3AC5D66]"></div>
        <div className="w-[8px] h-[8px] rounded-[4px] bg-[#F3AC5D66]"></div>
        <div className="w-[15px] h-[8px] rounded-[4px] bg-[#F3AC5D]"></div>
        <div className="w-[8px] h-[8px] rounded-[4px] bg-[#F3AC5D66]"></div>
        <div className="w-[8px] h-[8px] rounded-[4px] bg-[#F3AC5D66]"></div>
      </div>
    </div>
  );
};

export default HeroSection;