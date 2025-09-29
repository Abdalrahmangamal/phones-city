import React from 'react';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import ProductCard from './ProductCard';

const TrendingProductsSection = () => {
  // Create an array with 8 product cards for a 2-row grid
  const productCards = Array(8).fill(0);

  return (
    <div className="flex flex-col items-start gap-8 w-full max-w-[1264px] mx-auto mt-8">
      <div className="flex items-center justify-between w-full">
        {/* Title and Icon */}
        <div className="flex items-center gap-2">
          <h2 className="font-roboto font-bold text-[40px] leading-[36px] text-[#211C4D] text-right">
            لا بتوب ويندوز
          </h2>
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 bg-white border border-[#CFCDCD] rounded-tl-lg rounded-tr-lg py-3 px-6">
          <span className="font-roboto font-medium text-[32px] leading-[24px] text-[#211C4D] text-right">
            فلتر
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid w-8 h-8 text-[#211C4D]" aria-hidden="true"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
          <ChevronDown className="w-4 h-4 text-[#211C4D]" />
        </button>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-[#E0E5EB]"></div>

      {/* Products Grid (2 rows of 4 products each) */}
      <div className="grid grid-cols-4 gap-6 w-full">
        {productCards.map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProductsSection;
