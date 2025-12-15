import React, { useState } from "react";
import { ChevronDown, Grid } from "lucide-react";

interface FilterProps {
  onSortChange: (sortOption: string) => void;
  onCategoryChange: (categoryId: number | null) => void;
  categories: any[];
}

const Filter: React.FC<FilterProps> = ({ onSortChange, onCategoryChange, categories }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const sortOptions = [
    { id: "latest", label: "الأحدث" },
    { id: "oldest", label: "الأقدم" },
    { id: "price-low-high", label: "من الأقل للأعلي" },
    { id: "price-high-low", label: "من الأعلي للأقل" },
  ];

  const handleSortChange = (optionId: string) => {
    setSelectedSort(optionId);
    onSortChange(optionId);
    setIsSortOpen(false);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
    setIsCategoryOpen(false);
  };

  return (
    <div className="w-[300px] relative" dir="rtl">
      {/* Filter Toggle Button */}
      <div 
        className="w-[300px] h-[54px] border border-gray-200 rounded-t-lg bg-white flex items-center justify-between px-6 py-3 gap-2.5 cursor-pointer"
        onClick={() => setIsSortOpen(!isSortOpen)}
      >
        <div className="flex items-center gap-2">
          <Grid className="w-8 h-[20px] text-[#211C4D]" />
          <span className="font-roboto font-medium text-[25px] leading-[24px] text-[#211C4D]">
            فلتر
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#211C4D] transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Sort Filter Dropdown */}
      {isSortOpen && (
        <div 
          className="w-[300px] border border-gray-200 bg-white absolute z-20 mt-1"
        >
          <div className="w-full h-[40px] flex justify-between items-center px-2 bg-[#FDFDFD] border-b border-gray-100">
            <span className="text-[#211C4D] font-roboto text-[18px] leading-[25px]">ترتيب حسب</span>
            <ChevronDown 
              className="w-4 h-4 text-[#211C4D] transition-transform cursor-pointer rotate-180" 
              onClick={() => setIsSortOpen(!isSortOpen)}
            />
          </div>
          
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
        </div>
      )}

      {/* Category Filter Dropdown */}
      {isCategoryOpen && (
        <div 
          className="w-[300px] border border-gray-200 bg-white absolute z-20 mt-1"
          style={{ top: 'calc(100% + 10px)' }}
        >
          <div className="w-full h-[40px] flex justify-between items-center px-2 bg-[#FDFDFD] border-b border-gray-100">
            <span className="text-[#211C4D] font-roboto text-[18px] leading-[25px]">تصنيف</span>
            <ChevronDown 
              className="w-4 h-4 text-[#211C4D] transition-transform cursor-pointer rotate-180" 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            />
          </div>
          
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
        </div>
      )}
    </div>
  );
};

export default Filter;