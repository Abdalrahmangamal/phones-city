import React from 'react';

const SearchSection = () => {
  return (
    <div className="flex flex-col items-end gap-4 w-full max-w-[1278px] h-auto md:h-[99px]">
      <div className="w-full h-auto md:h-[47px] flex items-center justify-start">
        <h2 className="font-roboto font-medium text-[28px] md:text-[40px] leading-[100%] text-[#272727] text-right">
          ابحث عن الكمبيوتر المحمول الخاص بك
        </h2>
      </div>
      <div className="w-full h-auto md:h-[36px] flex items-center justify-start">
        <p className="font-roboto font-normal text-[18px] md:text-[24px] leading-[150%] text-[#4B4B4B] text-right">
          ابحث عن اللابتوب المثالي لك
        </p>
      </div>
    </div>
  );
};

export default SearchSection;