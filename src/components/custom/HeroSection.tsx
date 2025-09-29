import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import ChevronLeft and ChevronRight

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(''); // Track slide direction for animation
  // Keep only the 111.png image for all slides
  const images = [
    '/111.png',
    '/111.png',
    '/111.png',
    '/111.png',
  ];

  const nextSlide = () => {
    setSlideDirection('right');
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Add automatic sliding every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Reset slide direction after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideDirection('');
    }, 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handleShopNowClick = () => {
    console.log("Shop Now button clicked!");
    // User will handle navigation later
  };

  return (
    <div className="relative w-full h-[200px] md:h-[347px] rounded-[8px] flex items-center justify-start overflow-hidden">
      {/* Background with gradient overlay and slide transition animation */}
      <div
        className={`absolute inset-0 z-0 transition-all duration-500 ease-in-out ${slideDirection === 'right' ? 'animate-slideInRight' : slideDirection === 'left' ? 'animate-slideInLeft' : ''}`}
        style={{
          background: `linear-gradient(90deg, rgba(33, 28, 77, 0) 1.44%, rgba(33, 28, 77, 0.2) 32.21%, #211C4D 100%), url(${images[currentSlide]})`,
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content - properly aligned for Arabic RTL layout */}
      <div className="relative z-10 w-full md:w-[458px] h-[260px] mr-0 md:mr-[100px] flex flex-col gap-[17px] items-end pr-4 md:pr-0 pt-4 md:pt-0">
        <div className="w-full md:w-[458px] h-auto md:h-[136px]">
          <h1 className="font-roboto font-bold text-[24px] md:text-[48px] leading-[32px] md:leading-[68px] text-white text-right [text-shadow:0px_15px_5px_rgba(0,0,0,0.25)] animate-fadeIn">
            افضل اجهزه الكمبيوتر المحموله
          </h1>
        </div>

        <div className="w-full md:w-[458px] h-auto md:h-[48px]">
          <p className="font-roboto font-bold text-[12px] md:text-[16px] leading-[16px] md:leading-[24px] text-white text-right [text-shadow:0px_15px_3px_rgba(0,0,0,0.25)] animate-fadeIn delay-100">
            استمتع بتجربة استثنائية مع أحدث الهواتف بأفضل الأسعار وخدمة ما بعد البيع المميزة
          </p>
        </div>
      </div>
      <div className="absolute z-20 bottom-10 right-10">
        <button
          className="flex items-center justify-center gap-[8px] w-[116px] h-[42px] py-[10px] px-[24px] bg-[#F3AC5D] rounded-[8px]"
          onClick={handleShopNowClick}
        >
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
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-[8px] h-[8px] rounded-[4px] cursor-pointer transition-all duration-300 ${currentSlide === idx ? 'bg-[#F3AC5D] w-[15px]' : 'bg-[#F3AC5D66]'}`}
            onClick={() => setCurrentSlide(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;