import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    title: 'لابتوب ويندوز',
    image: '/65ff0f43147a153f5b9651e8943036ca53963cd4.png',
  },
  {
    title: 'لابتوب ابل',
    image: '/a6a7fb73e1976e5d3994d5c291b4c5bdd303dc3f.png',
  },
  {
    title: 'عروض اللابتوب',
    image: '/a3d24e07f4eced76c41e30efdae2a80136b0bbb1.png',
  },
  {
    title: 'لابتوب للألعاب',
    image: '/1ed1d64a363b0195709d4aa61e4d2288489b4752.png',
  },
  {
    title: 'لابتوب كروم بوك',
    image: '/4fd00c4dc941a8177142e68eece434877a97c501.png',
  },
  {
    title: 'جميع اللابتوبات',
    image: '/9cca1d209dc53dbb7e63ba1b557818275169ed87.png',
  },
];

const CategoryCard = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="bg-[#FDFDFD] rounded-lg shadow-[8px_8px_20px_0px_#00000008] w-[180px] h-[182px] flex flex-col items-center gap-2 pb-4 flex-shrink-0">
      <img src={image} alt={title} className="w-[180px] h-[122px] object-cover rounded-t-lg" />
      <div className="w-full px-2 flex flex-col items-center">
        <h3 className="font-roboto font-medium text-lg text-[#4B4B4B] text-center leading-tight">{title}</h3>
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  const [translateX, setTranslateX] = useState(0);
  const cardWidth = 180 + 24; // width + gap

  const nextSlide = () => {
    setTranslateX(prev => {
      const maxTranslate = -(categories.length * cardWidth - 4 * cardWidth); // Show 4 cards at a time
      const newTranslate = prev - cardWidth;
      return newTranslate < maxTranslate ? maxTranslate : newTranslate;
    });
  };
  
  const prevSlide = () => {
    setTranslateX(prev => {
      const newTranslate = prev + cardWidth;
      return newTranslate > 0 ? 0 : newTranslate;
    });
  };

  return (
    <div style={{ background: '#211C4D36' }} className="py-10">
      <div className="container mx-auto flex items-center justify-center gap-6">
        <button 
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center border border-[#E0E5EB]" 
          aria-label="السابق"
          onClick={prevSlide}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <div className="overflow-hidden w-[calc(180px*4+24*3)]">
          <div 
            className="flex gap-6 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
        <button 
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center border border-[#E0E5EB]" 
          aria-label="التالي"
          onClick={nextSlide}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CategoriesSection;