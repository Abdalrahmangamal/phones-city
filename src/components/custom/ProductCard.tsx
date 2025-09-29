import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const ProductCard = () => {
  return (
    <div className="w-[299px] h-[411px] rounded-2xl bg-white shadow-[0px_4px_4px_0px_#00000040]">
      {/* Thumb */}
      <div className="relative w-full h-[264px] p-6">
        {/* Heart Button */}
        <button className="absolute top-4 right-4 bg-[#2A255B0D] rounded-full w-9 h-9 flex items-center justify-center">
          <Heart className="w-6 h-6 text-[#211C4D]" strokeWidth="2" />
        </button>
        {/* Discount Badge */}
        <div className="absolute top-4 left-4 bg-[#F03D3D] text-white text-xs px-2 py-1 rounded">
          -17%
        </div>
        {/* Product Image */}
        <img src="/1632cd4b864838f21092481885f0c4a6e120b93f.png" alt="Product" className="w-full h-full object-contain" />
      </div>
      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title + Rating */}
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h3 className="font-roboto font-medium text-2xl leading-5 text-right text-[#211C4D]">
            لابتوب ابل ماك بو.......
          </h3>
          {/* Color Circles */}
          <div className="flex gap-1 justify-end">
            <div className="w-4 h-4 rounded-full bg-[#2C2929]"></div>
            <div className="w-4 h-4 rounded-full bg-[#438DB8]"></div>
            <div className="w-4 h-4 rounded-full bg-[#EE7593]"></div>
            <div className="w-4 h-4 rounded-full bg-white border border-gray-400"></div>
          </div>
          {/* Rating */}
          <div className="flex items-center justify-end gap-2">
            <span className="font-roboto text-xs text-gray-400">(125)</span>
            <div className="flex gap-1">
              {/* Stars */}
              <Star fill="#F3AC5D" stroke="#F3AC5D" className="w-5 h-5" />
              <Star fill="#F3AC5D" stroke="#F3AC5D" className="w-5 h-5" />
              <Star fill="#F3AC5D" stroke="#F3AC5D" className="w-5 h-5" />
              <Star fill="none" stroke="#CAD0D9" className="w-5 h-5" />
              <Star fill="none" stroke="#CAD0D9" className="w-5 h-5" />
            </div>
          </div>
        </div>
        {/* Price + Button */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex flex-col items-end">
            <span className="font-roboto font-semibold text-lg text-[#211C4D]">
              486.00 رس
            </span>
            <span className="font-roboto font-medium text-base text-[#F03D3D] line-through">
              786.00 رس
            </span>
          </div>
          {/* Add to Cart Button */}
          <button className="bg-[#EEF1F6] rounded-full w-10 h-10 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
