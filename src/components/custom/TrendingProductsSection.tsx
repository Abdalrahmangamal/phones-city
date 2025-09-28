import React from 'react';
import { ChevronDown, LayoutGrid } from 'lucide-react';

const TrendingProductsSection = () => {
  return (
    <div className="flex flex-col items-start gap-8 w-full max-w-[1264px] mx-auto mt-8">
      <div className="flex items-center justify-between w-full">
        {/* Title and Icon */}
        <div className="flex items-center gap-2">
          <h2 className="font-roboto font-bold text-[40px] leading-[36px] text-[#211C4D] text-right">
            لا بتوب ويندوز
          </h2>
          {/* Placeholder for the complex icon, using LayoutGrid for now as per user's previous reference */}
          <LayoutGrid className="w-8 h-8 text-[#211C4D]" />
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 bg-white border border-[#CFCDCD] rounded-tl-lg rounded-tr-lg py-3 px-6">
          <span className="font-roboto font-medium text-[32px] leading-[24px] text-[#211C4D] text-right">
            فلتر
          </span>
          <ChevronDown className="w-4 h-4 text-[#211C4D]" />
        </button>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-[#E0E5EB]"></div>

      {/* Products Grid (Placeholder) */}
      <div className="w-full h-[800px] bg-gray-100 flex items-center justify-center text-gray-500">
        {/* Placeholder for product cards */}
        Trending Products Grid will go here
      </div>
    </div>
  );
};

export default TrendingProductsSection;
