import React, { useState, useEffect } from 'react';

const NewHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(''); // Track slide direction for animation
  
  // Using the provided image for all slides
  const images = [
    '/8165fa56d02ed33ff4b950907459c02c9a8a6fd3.png',
    '/8165fa56d02ed33ff4b950907459c02c9a8a6fd3.png',
    '/8165fa56d02ed33ff4b950907459c02c9a8a6fd3.png',
    '/8165fa56d02ed33ff4b950907459c02c9a8a6fd3.png',
    '/8165fa56d02ed33ff4b950907459c02c9a8a6fd3.png',
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Reset slide direction after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideDirection('');
    }, 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handleDotClick = (index: number) => {
    if (index > currentSlide) {
      setSlideDirection('next');
    } else if (index < currentSlide) {
      setSlideDirection('prev');
    }
    setCurrentSlide(index);
  };

  const handleShopNowClick = () => {
    console.log("Shop Now button clicked!");
    // Navigation will be implemented later
  };

  return (
    <div 
      className="relative w-full h-[339px] rounded-[16px] overflow-hidden"
      style={{
        background: `linear-gradient(90deg, rgba(33, 28, 77, 0.042) 0%, rgba(33, 28, 77, 0.1365) 33.17%, rgba(33, 28, 77, 0.42) 50%, rgba(33, 28, 77, 0.42) 100%)`
      }}
    >
      {/* Background Image with animation */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out ${
          slideDirection === 'next' ? 'animate-slideInRight' : 
          slideDirection === 'prev' ? 'animate-slideInLeft' : ''
        }`}
        style={{ 
          backgroundImage: `url(${images[currentSlide]})`,
          backgroundBlendMode: 'overlay'
        }}
      />
      
      {/* Content - Right aligned for RTL layout with proper padding */}
      <div className="relative z-10 w-full md:w-[505px] h-[192px] float-right pt-[30px] pr-[60px] flex flex-col gap-[17px] items-end">
        <div className="w-[458px] h-[68px]">
          <h1 
            className="font-roboto font-bold text-[48px] leading-[68px] text-white text-right"
            style={{
              textShadow: '0px 15px 5px rgba(0, 0, 0, 0.25)'
            }}
          >
            أحدث الهواتف الذكية
          </h1>
        </div>
        
        <div className="w-[458px] h-[48px]">
          <p 
            className="font-roboto font-bold text-[16px] leading-[24px] text-white text-right"
            style={{
              textShadow: '0px 15px 3px rgba(0, 0, 0, 0.25)'
            }}
          >
            استمتع بتجربة استثنائية مع أحدث الهواتف بأفضل الأسعار وخدمة ما بعد البيع المميزة
          </p>
        </div>
        
        {/* Button positioned below text and aligned to the right */}
        <div className="w-full">
          <button 
            className="flex items-center gap-[8px] w-auto h-[42px] py-[10px] px-[24px] bg-[#F3AC5D] rounded-[8px]"
            onClick={handleShopNowClick}
          >
            <span className="font-roboto font-medium text-[16px] leading-[20px] text-white whitespace-nowrap">
              تسوق الآن
            </span>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7H17M1 7L7 1M1 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 flex gap-[8px] z-10">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`cursor-pointer transition-all duration-300 ${
              currentSlide === idx 
                ? 'w-[15px] bg-[#F3AC5D]' 
                : 'w-[8px] bg-[#F3AC5D66]'
            } h-[8px] rounded-[4px]`}
            onClick={() => handleDotClick(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NewHeroSection;