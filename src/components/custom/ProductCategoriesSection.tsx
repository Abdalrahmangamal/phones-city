import React, { useState, useRef, useEffect } from "react";
import "./ProductCategoriesSection.css";

const ProductCategoriesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const ITEM_WIDTH = 210; // عرض العنصر + الفجوة (190 + 20)
  const categories = [
    { id: 1, name: "الكيمرات و الداش كام", image: "/849dfd2e4107ef48a9ed9f458a23f16b6520ae97.png" },
    { id: 2, name: "السماعات", image: "/d3e0cd860e313614028ea17007f662d33d6de2f2.png" },
    { id: 3, name: "الساعات الذكيه", image: "/b3a03d436a7a55678e2142a1f7303de56510d5c3.png" },
    { id: 4, name: "العاب الفيديو", image: "/378aa5c93933cff8549991b9910be6d1951290dd.png" },
    { id: 5, name: "لابتوب", image: "/b36f6016ef946376f3f3267b660b5432237ca573.png" },
    { id: 6, name: "الهواتف الذكيه", image: "/207531909b94a433540b2bfbd6c46ae9d9d0740d.png" }
  ];

  const total = categories.length;

  // Move by one item
  const slide = (dir: "next" | "prev") => {
    const container = containerRef.current;
    if (!container || isScrollingRef.current) return;

    isScrollingRef.current = true;
    setIsScrolling(true);

    const delta = dir === "next" ? ITEM_WIDTH : -ITEM_WIDTH;
    container.scrollTo({
      left: container.scrollLeft + delta,
      behavior: "smooth"
    });

    // after animation ends, clear flag and fix boundaries if needed
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      isScrollingRef.current = false;
      setIsScrolling(false);

      // boundary adjustments (jump without animation)
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
        // reached right duplicate region -> jump left by original block
        container.scrollTo({
          left: container.scrollLeft - total * ITEM_WIDTH,
          behavior: "auto"
        });
      } else if (container.scrollLeft <= 1) {
        // reached left duplicate region -> jump right by original block
        container.scrollTo({
          left: container.scrollLeft + total * ITEM_WIDTH,
          behavior: "auto"
        });
      }
    }, 400); // زمن ينتظر الانيميشن؛ 400ms مناسب للـ 'smooth'
  };

  const slideNext = () => slide("next");
  const slidePrev = () => slide("prev");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start from the middle block so we can scroll both اتجاهين
    container.scrollLeft = total * ITEM_WIDTH;

    // keep handler light and fast
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      // إذا وصلنا لنهاية النسخ المكررة على اليمين
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
        container.scrollTo({
          left: container.scrollLeft - total * ITEM_WIDTH,
          behavior: "auto"
        });
      }
      // إذا وصلنا لبداية النسخ المكررة على الشمال
      else if (container.scrollLeft <= 1) {
        container.scrollTo({
          left: container.scrollLeft + total * ITEM_WIDTH,
          behavior: "auto"
        });
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // تنفذ مرة واحدة عند الماونت

  return (
    <div className="w-full flex flex-col items-center px-4 md:px-[98px]">
      {/* Header - relative so the decorative line can be absolute (ولا تاخد مكان) */}
      <div className="relative w-full max-w-[1244px] h-auto flex flex-col items-center gap-2 mb-6">
        {/* Title (يكون فوق الصورة) */}
        <h2 className="relative z-10 font-roboto font-bold text-2xl md:text-[40px] leading-[100%] text-[#211C4D] text-center">
          الأقسام
        </h2>

        {/* Decorative line - small, centered, positioned just under the title, behind it */}
        <img
          src="/Layer_1.svg"
          alt=""
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full translate-y-1 md:translate-y-2 -z-10 w-32 md:w-[240px] h-1 md:h-[6px] object-cover opacity-95"
        />
      </div>

      {/* List */}
      <div className="w-full max-w-[1244px] h-auto flex items-center gap-2 md:gap-[20px]">
        <button
          className="w-8 h-8 md:w-[40px] md:h-[40px] rounded-full bg-white border border-[#E0E5EB] flex items-center justify-center flex-shrink-0"
          onClick={slidePrev}
          aria-label="السابق"
          disabled={isScrolling}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-4 md:h-4">
            <path d="M6 12L10 8L6 4" stroke="#211C4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={containerRef}
          className="flex-1 flex gap-2 md:gap-[20px] overflow-x-auto scrollbar-hide py-2 category-scroll-container"
        >
          {/* كرر العناصر 3 مرات (أصل + نسخ) */}
          {[...categories, ...categories, ...categories].map((category, index) => (
            <div key={`${category.id}-${index}`} className="flex flex-col items-center gap-4 md:gap-[24px] flex-shrink-0">
              <div className="w-24 h-24 md:w-[190px] md:h-[150px] relative">
                <div
                  className="absolute w-20 h-20 md:w-[150px] md:h-[150px] rounded-full category-item-shadow"
                ></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute category-image"
                />
              </div>
              <div className="w-full h-auto flex items-start justify-center mt-[-5px] md:mt-[-10px]">
                <h3 className="font-roboto font-bold text-sm md:text-[24px] leading-[100%] text-[#211C4D] text-center">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <button
          className="w-8 h-8 md:w-[40px] md:h-[40px] rounded-full bg-white border border-[#E0E5EB] flex items-center justify-center flex-shrink-0"
          onClick={slideNext}
          aria-label="التالي"
          disabled={isScrolling}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-4 md:h-4">
            <path d="M10 12L6 8L10 4" stroke="#211C4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCategoriesSection;
