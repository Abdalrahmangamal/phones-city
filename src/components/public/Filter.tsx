import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Grid } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SaudiRiyalIcon } from "@/components/common/SaudiRiyalIcon";

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
  maxPrice = 10000,
}) => {
  const { t } = useTranslation();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const [selectedSort, setSelectedSort] = useState("best_seller");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [rangeValues, setRangeValues] = useState<[number, number]>([minPrice, maxPrice]);

  const priceSliderRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { id: "created_at", label: t("Newest") },
    { id: "main_price", label: t("Price") },
    { id: "name_ar", label: t("Name") },
    { id: "best_seller", label: t("BestSelling") },
    { id: "average_rating", label: t("HighestRated") },
  ];

  useEffect(() => {
    if (priceSliderRef.current) {
      const minVal = rangeValues[0];
      const maxVal = rangeValues[1];
      const range = maxPrice - minPrice;
      const minPercent = range > 0 ? ((minVal - minPrice) / range) * 100 : 0;
      const maxPercent = range > 0 ? ((maxVal - minPrice) / range) * 100 : 100;

      priceSliderRef.current.style.left = `${minPercent}%`;
      priceSliderRef.current.style.right = `${100 - maxPercent}%`;
    }
  }, [rangeValues, maxPrice, minPrice]);

  const handleSortChange = (optionId: string) => {
    setSelectedSort(optionId);
    onSortChange(optionId);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  const handlePriceRangeChange = (newMin: number, newMax: number) => {
    setRangeValues([newMin, newMax]);
    onPriceRangeChange(newMin === minPrice ? null : newMin, newMax === maxPrice ? null : newMax);
  };

  const handleMinChange = (value: number) => {
    if (value <= rangeValues[1] - 500) {
      handlePriceRangeChange(value, rangeValues[1]);
    }
  };

  const handleMaxChange = (value: number) => {
    if (value >= rangeValues[0] + 500) {
      handlePriceRangeChange(rangeValues[0], value);
    }
  };

  return (
    <div className="w-full md:w-[275px] relative" dir="rtl">
      {/* زر الفلتر - عرضه الأصلي في الديسكتوب، كامل في الموبايل */}
      <div
        className="w-full md:w-[275px] h-[54px] border border-gray-200 rounded-t-lg bg-white flex items-center justify-between px-6 py-3 gap-2.5 cursor-pointer"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <div className="flex items-center gap-2">
          <Grid className="w-[26.33px] h-[24.69px] text-[#211C4D]" />
          <span className="font-roboto font-medium text-[18px] leading-[25px] text-[#211C4D]">
            {t("Filter")}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#211C4D] transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {isFilterOpen && (
        <div
          className="
            w-full                   
            md:w-[275px]             
            border border-gray-200 bg-white 
            absolute left-0 top-full mt-1 
            rounded-b-lg 
            shadow-lg 
            z-20 
            max-h-[120vh] overflow-y-auto
          "
        >
          {/* فرز */}
          <div className="w-full h-[50px] flex justify-between items-center px-6 bg-[#FDFDFD] border-b border-gray-100">
            <span className="text-[#211C4D] font-roboto text-[19px] leading-[25px]">{t("SortBy")}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#211C4D] transition-transform cursor-pointer ${isSortOpen ? "rotate-180" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsSortOpen(!isSortOpen);
              }}
            />
          </div>

          {isSortOpen && (
            <div className="p-5 md:p-4 bg-[#FDFDFD] border-b border-gray-100">
              {sortOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-50 rounded-lg"
                  onClick={() => handleSortChange(option.id)}
                >
                  <div
                    className={`w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center ${selectedSort === option.id ? "bg-[#211C4D] border-[#211C4D]" : "bg-white"
                      }`}
                  >
                    {selectedSort === option.id && <div className="w-3.5 h-3.5 bg-white rounded-full"></div>}
                  </div>
                  <span className="font-roboto text-[17px] leading-[150%] text-[#211C4D]">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* الفئات */}
          <div className="w-full h-[50px] flex justify-between items-center px-6 bg-[#FDFDFD] border-b border-gray-100">
            <span className="text-[#211C4D] font-roboto text-[19px] leading-[25px]">{t("Categories")}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#211C4D] transition-transform cursor-pointer ${isCategoryOpen ? "rotate-180" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsCategoryOpen(!isCategoryOpen);
              }}
            />
          </div>

          {isCategoryOpen && (
            <div className="p-5 md:p-4 bg-[#FDFDFD] border-b border-gray-100 max-h-[250px] overflow-y-auto">
              {/* الكل */}
              <div
                className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-50 rounded-lg"
                onClick={() => handleCategoryChange(null)}
              >
                <div
                  className={`w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center ${selectedCategory === null ? "bg-[#211C4D] border-[#211C4D]" : "bg-white"
                    }`}
                >
                  {selectedCategory === null && <div className="w-3.5 h-3.5 bg-white rounded-full"></div>}
                </div>
                <span className="font-roboto text-[17px] leading-[150%] text-[#211C4D]">{t("All")}</span>
              </div>

              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center gap-4 py-2 px-3 cursor-pointer hover:bg-gray-50 rounded-lg"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <div
                    className={`w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center ${selectedCategory === category.id ? "bg-[#211C4D] border-[#211C4D]" : "bg-white"
                      }`}
                  >
                    {selectedCategory === category.id && <div className="w-3.5 h-3.5 bg-white rounded-full"></div>}
                  </div>
                  <span className="font-roboto text-[17px] leading-[150%] text-[#211C4D]">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* السعر */}
          <div className="w-full h-[50px] flex justify-between items-center px-6 bg-[#FDFDFD] border-b border-gray-100">
            <span className="text-[#211C4D] font-roboto text-[19px] leading-[25px]">{t("Price")}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#211C4D] transition-transform cursor-pointer ${isPriceOpen ? "rotate-180" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsPriceOpen(!isPriceOpen);
              }}
            />
          </div>

          {isPriceOpen && (
            <div className="p-6 md:p-4 bg-[#FDFDFD] rounded-b-lg">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <span className="text-[#211C4D] font-roboto text-[16px] mb-3 block">{t("Minimum")}</span>
                  <input
                    type="number"
                    value={rangeValues[0]}
                    onChange={(e) => handleMinChange(parseInt(e.target.value) || minPrice)}
                    className="w-full px-5 py-4 border border-gray-300 rounded-lg text-[#211C4D] text-[17px]"
                  />
                </div>
                <div>
                  <span className="text-[#211C4D] font-roboto text-[16px] mb-3 block">{t("Maximum")}</span>
                  <input
                    type="number"
                    value={rangeValues[1]}
                    onChange={(e) => handleMaxChange(parseInt(e.target.value) || maxPrice)}
                    className="w-full px-5 py-4 border border-gray-300 rounded-lg text-[#211C4D] text-[17px]"
                  />
                </div>
              </div>



              <div className="flex justify-between text-[16px] text-gray-700 font-medium">
                <span className="flex items-center gap-1">{minPrice.toLocaleString()} <SaudiRiyalIcon className="w-4 h-4" /></span>
                <span className="flex items-center gap-1">{maxPrice.toLocaleString()} <SaudiRiyalIcon className="w-4 h-4" /></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;