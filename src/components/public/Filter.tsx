import React, { useState } from "react";
import { ChevronDown, Grid } from "lucide-react";

interface FilterProps {
  onSortChange: (sortOption: string) => void;
  onCategoryChange: (categoryId: number | null) => void;
  onPriceRangeChange: (minPrice: number | null, maxPrice: number | null) => void;
  categories: any[];
  minPrice?: number;
  maxPrice?: number;
}

const Filter: React.FC<FilterProps> = ({ 
  onSortChange, 
  onCategoryChange, 
  onPriceRangeChange,
  categories,
  minPrice = 0,
  maxPrice = 10000
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [selectedSort, setSelectedSort] = useState("created_at");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  const sortOptions = [
    { id: "created_at", label: "الأحدث" },
    { id: "main_price", label: "السعر" },
    { id: "name_ar", label: "الاسم" },
    { id: "best_seller", label: "الأكثر مبيعاً" },
    { id: "average_rating", label: "الأعلى تقييماً" },
  ];

  const handleSortChange = (optionId: string) => {
    setSelectedSort(optionId);
    onSortChange(optionId);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  const handlePriceRangeChange = (newMin: number, newMax: number) => {
    setPriceRange([newMin, newMax]);
    onPriceRangeChange(newMin, newMax);
  };

  return (
    <div className="w-[275px] relative" dir="rtl">
      {/* Filter Toggle Button */}
      <div 
        className="w-[275px] h-[54px] border border-gray-200 rounded-t-lg bg-white flex items-center justify-between px-6 py-3 gap-2.5 cursor-pointer"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <div className="flex items-center gap-2">
          <Grid className="w-[26.33px] h-[24.69px] text-[#211C4D]" />
          <span className="font-roboto font-medium text-[18px] leading-[25px] text-[#211C4D]">
            فلتر
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#211C4D] transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Combined Filter Dropdown */}
      {isFilterOpen && (
        <div 
          className="w-[275px] border border-gray-200 bg-white absolute z-20 mt-1 rounded-b-lg"
        >
          {/* Sort Filter Section */}
          <div className="w-full h-[40px] flex justify-between items-center px-2 bg-[#FDFDFD] border-b border-gray-100">
            <span className="text-[#211C4D] font-roboto text-[18px] leading-[25px]">ترتيب حسب</span>
            <ChevronDown 
              className={`w-4 h-4 text-[#211C4D] transition-transform cursor-pointer ${isSortOpen ? 'rotate-180' : ''}`} 
              onClick={(e) => {
                e.stopPropagation();
                setIsSortOpen(!isSortOpen);
              }}
            />
          </div>
          
          {isSortOpen && (
            <div className="p-2 bg-[#FDFDFD] border-b border-gray-100">
              {sortOptions.map((option) => (
                <div 
                  key={option.id}
                  className="flex items-center gap-2 py-2 px-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSortChange(option.id)}
                >
                  <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${
                    selectedSort === option.id ? 'bg-[#211C4D] border-[#211C4D]' : 'bg-white'
                  }`}>
                    {selectedSort === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-roboto text-[16px] leading-[150%] text-[#211C4D]">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Category Filter Section */}
          <div className="w-full h-[40px] flex justify-between items-center px-2 bg-[#FDFDFD] border-b border-gray-100">
            <span className="text-[#211C4D] font-roboto text-[18px] leading-[25px]">تصنيف</span>
            <ChevronDown 
              className={`w-4 h-4 text-[#211C4D] transition-transform cursor-pointer ${isCategoryOpen ? 'rotate-180' : ''}`} 
              onClick={(e) => {
                e.stopPropagation();
                setIsCategoryOpen(!isCategoryOpen);
              }}
            />
          </div>
          
          {isCategoryOpen && (
            <div className="p-2 bg-[#FDFDFD] border-b border-gray-100">
              <div 
                className="flex items-center gap-2 py-2 px-2 cursor-pointer hover:bg-gray-50"
                onClick={() => handleCategoryChange(null)}
              >
                <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${
                  selectedCategory === null ? 'bg-[#211C4D] border-[#211C4D]' : 'bg-white'
                }`}>
                  {selectedCategory === null && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-roboto text-[16px] leading-[150%] text-[#211C4D]">
                  الجميع
                </span>
              </div>
              
              {categories.map((category) => (
                <div 
                  key={category.id}
                  className="flex items-center gap-2 py-2 px-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${
                    selectedCategory === category.id ? 'bg-[#211C4D] border-[#211C4D]' : 'bg-white'
                  }`}>
                  {selectedCategory === category.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-roboto text-[16px] leading-[150%] text-[#211C4D]">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Price Range Filter Section */}
          <div className="w-full h-[40px] flex justify-between items-center px-2 bg-[#FDFDFD] border-b border-gray-100">
            <span className="text-[#211C4D] font-roboto text-[18px] leading-[25px]">السعر</span>
            <ChevronDown 
              className={`w-4 h-4 text-[#211C4D] transition-transform cursor-pointer ${isPriceOpen ? 'rotate-180' : ''}`} 
              onClick={(e) => {
                e.stopPropagation();
                setIsPriceOpen(!isPriceOpen);
              }}
            />
          </div>
          
          {isPriceOpen && (
            <div className="p-4 bg-[#FDFDFD] rounded-b-lg">
              {/* Price Range Slider Placeholder - Ready for API integration */}
              <div className="mb-4">
                <div className="flex justify-between text-[#211C4D] font-roboto text-[16px] leading-[150%] mb-2">
                  <span>من: {priceRange[0].toLocaleString()} ريال</span>
                  <span>إلى: {priceRange[1].toLocaleString()} ريال</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div 
                    className="absolute h-2 bg-[#211C4D] rounded-full" 
                    style={{ 
                      left: `${(priceRange[0] / maxPrice) * 100}%`, 
                      right: `${100 - (priceRange[1] / maxPrice) * 100}%` 
                    }}
                  ></div>
                  {/* Thumb controls would go here for actual slider implementation */}
                </div>
                <div className="flex justify-between text-[14px] text-gray-500 mt-1">
                  <span>0</span>
                  <span>{maxPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange[1])}
                  className="w-full p-2 border border-gray-300 rounded text-[#211C4D]"
                  placeholder="الحد الأدنى"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(priceRange[0], Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded text-[#211C4D]"
                  placeholder="الحد الأقصى"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;