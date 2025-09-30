import React, { useState, useRef, useEffect } from "react";

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
    <div className="w-full h-[303px] flex flex-col items-center px-[98px]">
      {/* Header */}
      <div className="w-[1244px] h-[47px] flex flex-col items-center gap-[8px] mb-[16px]">
        <h2 className="font-roboto font-bold text-[40px] leading-[100%] text-[#211C4D] text-center">
          الأقسام
        </h2>
        <img src="/Group 17.png" alt="Decorative line" className="w-full h-[4px]" />
      </div>

      {/* List */}
      <div className="w-[1244px] h-[246px] flex items-center gap-[20px]">
        <button
          className="w-[40px] h-[40px] rounded-[100px] bg-white border border-[#E0E5EB] flex items-center justify-center"
          onClick={slidePrev}
          aria-label="السابق"
          disabled={isScrolling}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="#211C4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={containerRef}
          className="flex-1 flex gap-[20px] overflow-x-auto scrollbar-hide"
          style={{ direction: "ltr", scrollBehavior: "smooth" }}
        >
          {/* كرر العناصر 3 مرات (أصل + نسخ) */}
          {[...categories, ...categories, ...categories].map((category, index) => (
            <div key={`${category.id}-${index}`} className="flex flex-col items-center gap-[24px] flex-shrink-0">
              <div className="w-[190px] h-[150px] relative">
                <div
                  className="absolute w-[150px] h-[150px] rounded-full"
                  style={{
                    background: "#FFFFFF33",
                    boxShadow: "0px 30px 57px 0px #00000026",
                    top: "0px",
                    left: "20px"
                  }}
                ></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute"
                  style={{
                    width: "auto",
                    height: "auto",
                    maxHeight: "120px",
                    maxWidth: "120px",
                    top: "15px",
                    left: "35px"
                  }}
                />
              </div>
              <div className="w-full h-[28px] flex items-start justify-center mt-[-10px]">
                <h3 className="font-roboto font-bold text-[24px] leading-[100%] text-[#211C4D] text-center">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <button
          className="w-[40px] h-[40px] rounded-[100px] bg-white border border-[#E0E5EB] flex items-center justify-center"
          onClick={slideNext}
          aria-label="التالي"
          disabled={isScrolling}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="#211C4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCategoriesSection;
