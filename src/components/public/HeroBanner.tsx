import React from 'react';

interface HeroBannerProps {
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ 
  title, 
  description, 
  imageUrl,
  altText 
}) => {
  return (
    <div className="w-full max-w-[1264px] h-[347px] rounded-lg mb-16 relative overflow-hidden">
      <img 
        alt={altText} 
        className="w-full h-full object-cover" 
        src={imageUrl} 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#211c4d33] to-[#211C4D]"></div>
      <div className="absolute inset-0 flex flex-col justify-center text-right p-4 md:p-0 pr-[57px]">
        <h1 className="text-white font-roboto font-bold text-3xl md:text-5xl leading-[48px] md:leading-[68px] mb-2 md:mb-4">
          {title}
        </h1>
        <p className="text-white font-roboto font-bold text-base leading-6">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;