import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems = 0,
}) => {
  const { t } = useTranslation();

  // حساب أرقام الصفحات المرئية (حد أقصى 7 أرقام للجمال)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // دائمًا نظهر الـ Pagination حتى لو صفحة واحدة
  return (
    <div className="w-full max-w-8xl mx-auto mt-16 mb-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 bg-gradient-to-r from-[#211C4D]/10 to-[#211C4D]/5 backdrop-blur-md rounded-2xl p-6 border border-[#211C4D]/20 shadow-2xl">
        
        {/* نص عدد النتائج */}
        <div className="text-center sm:text-left">
          <p className="text-[#211C4D] font-medium text-lg">
            {totalItems > 0 ? (
              <>
                {t("Showing")}{" "}
                <span className="text-yellow-600 font-bold text-xl">
                  {startItem}-{endItem}
                </span>{" "}
                {t("of")}{" "}
                <span className="text-yellow-600 font-bold text-xl">
                  {totalItems}
                </span>{" "}
                {t("results")}
              </>
            ) : (
              <span className="text-gray-500 italic">{t("No results")}</span>
            )}
          </p>
        </div>

        {/* أزرار التنقل */}
        <div className="flex items-center justify-center gap-3">
          {/* زر السابق */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`group flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#211C4D] text-white hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105"
            }`}
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {t("Previous")}
          </button>

          {/* أرقام الصفحات */}
          <div className="flex items-center gap-2">
            {pageNumbers.map((page, index) =>
              page === "..." ? (
                <span
                  key={index}
                  className="px-4 py-2 text-[#211C4D]/60 font-medium text-lg"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  className={`w-12 h-12 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center ${
                    page === currentPage
                      ? "bg-yellow-500 text-[#211C4D] shadow-xl shadow-yellow-500/50 scale-110"
                      : "bg-white text-[#211C4D] hover:bg-[#211C4D] hover:text-white hover:shadow-md border border-[#211C4D]/20"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* زر التالي */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`group flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#211C4D] text-white hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105"
            }`}
          >
            {t("Next")}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;