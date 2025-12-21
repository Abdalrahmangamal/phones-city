import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Grid } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [selectedSort, setSelectedSort] = useState("created_at");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [rangeValues, setRangeValues] = useState<[number, number]>([minPrice, maxPrice]);
  
  const minRangeRef = useRef<HTMLInputElement>(null);
  const maxRangeRef = useRef<HTMLInputElement>(null);
  const priceSliderRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { id: "created_at", label: t("Newest") },
    { id: "main_price", label: t("Price") },
    { id: "name_ar", label: t("Name") },
    { id: "best_seller", label: t("BestSelling") },
    { id: "average_rating", label: t("HighestRated") },
  ];

  // Update slider position when range values change
  useEffect(() => {
    if (priceSliderRef.current) {
      const minVal = rangeValues[0];
      const maxVal = rangeValues[1];
      
      const minPercent = (minVal / maxPrice) * 100;
      const maxPercent = (maxVal / maxPrice) * 100;
      
      priceSliderRef.current.style.left = `${minPercent}%`;
      priceSliderRef.current.style.right = `${100 - maxPercent}%`;
    }
  }, [rangeValues, maxPrice]);

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

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value <= rangeValues[1] - 500) {
      setRangeValues([value, rangeValues[1]]);
      handlePriceRangeChange(value, rangeValues[1]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= rangeValues[0] + 500) {
      setRangeValues([rangeValues[0], value]);
      handlePriceRangeChange(rangeValues[0], value);
    }
  };

  const handleMinRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= rangeValues[1] - 500) {
      setRangeValues([value, rangeValues[1]]);
      handlePriceRangeChange(value, rangeValues[1]);
    }
  };

  const handleMaxRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= rangeValues[0] + 500) {
      setRangeValues([rangeValues[0], value]);
      handlePriceRangeChange(rangeValues[0], value);
    }
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
            {t("Filter")}
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
            <span className="text-[#211C4D] font-roboto text-[18px] leading-[25px]">{t("SortBy")}</span>
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
            <span className="text-[#211C4D] font-roboto text-[18px] leading-[25px]">{t("Category")}</span>
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
                  {t("All")}
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
            <span className="text-[#211C4D] font-roboto text-[18px] leading-[25px]">{t("Price")}</span>
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
              {/* Price Inputs */}
              <div className="flex gap-2 mb-4">
                <div className="flex flex-col">
                  <span className="text-[#211C4D] font-roboto text-[14px] mb-1">{t("Minimum")}</span>
                  <input
                    type="number"
                    value={rangeValues[0]}
                    onChange={handleMinInputChange}
                    className="w-full p-2 border border-gray-300 rounded text-[#211C4D] text-[14px]"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#211C4D] font-roboto text-[14px] mb-1">{t("Maximum")}</span>
                  <input
                    type="number"
                    value={rangeValues[1]}
                    onChange={handleMaxInputChange}
                    className="w-full p-2 border border-gray-300 rounded text-[#211C4D] text-[14px]"
                  />
                </div>
              </div>
              
              {/* Slider Container */}
              <div className="relative h-2 bg-gray-200 rounded-full mb-6">
                {/* Slider Track */}
                <div 
                  ref={priceSliderRef}
                  className="absolute h-2 bg-[#211C4D] rounded-full top-0"
                ></div>
                
                {/* Range Inputs */}
                <div className="relative h-2">
                  <input
                    ref={minRangeRef}
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={rangeValues[0]}
                    onChange={handleMinRangeChange}
                    className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto top-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#211C4D] [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <input
                    ref={maxRangeRef}
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={rangeValues[1]}
                    onChange={handleMaxRangeChange}
                    className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto top-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#211C4D] [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>
              </div>
              
              {/* Price Labels */}
              <div className="flex justify-between text-[12px] text-gray-500">
                <span>{minPrice.toLocaleString()} {t("SAR")}</span>
                <span>{maxPrice.toLocaleString()} {t("SAR")}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;