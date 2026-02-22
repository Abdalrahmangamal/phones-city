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
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // حساب أرقام الصفحات المرئية (إظهار 5 صفحات كحد أقصى بنافذة متحركة)
  const getPageNumbers = () => {
    const pages: number[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      // التأكد من عرض 5 أرقام دائماً إذا كان المجموع الكلي > 5
      if (endPage - startPage < 4) {
        if (startPage === 1) {
          endPage = 5;
        } else if (endPage === totalPages) {
          startPage = totalPages - 4;
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // دائمًا نظهر الـ Pagination حتى لو صفحة واحدة
  return (
    <div className="w-full max-w-8xl mx-auto mt-16 mb-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 bg-gradient-to-r from-[#211C4D]/10 to-[#211C4D]/5 backdrop-blur-md rounded-2xl p-6 border border-[#211C4D]/20 shadow-2xl">

        {/* نص عدد النتائج */}
        <div className="text-center sm:text-left">
          {totalPages > 1 && (
            <p className="text-[#211C4D] font-medium text-lg">
              {t("Showing")}{" "}
              <span className="text-yellow-600 font-bold text-xl">
                {t("Page")} {currentPage}
              </span>{" "}
              {t("of")}{" "}
              <span className="text-yellow-600 font-bold text-xl">
                {totalPages}
              </span>
            </p>
          )}
        </div>

        {/* أزرار التنقل */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* زر السابق */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`group flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-base transition-all duration-300 flex-1 sm:flex-none sm:min-w-[120px] ${currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#211C4D] text-white hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105"
              }`}
          >
            <ChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isRTL ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
            <span className="inline-block sm:inline">{t("Previous")}</span>
          </button>

          {/* أرقام الصفحات */}
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2" dir="ltr">
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-lg transition-all duration-300 flex items-center justify-center ${page === currentPage
                  ? "bg-yellow-500 text-[#211C4D] shadow-md sm:shadow-xl shadow-yellow-500/50 scale-105 sm:scale-110"
                  : "bg-white text-[#211C4D] hover:bg-[#211C4D] hover:text-white hover:shadow-md border border-[#211C4D]/20"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* زر التالي */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`group flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-base transition-all duration-300 flex-1 sm:flex-none sm:min-w-[120px] ${currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#211C4D] text-white hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105"
              }`}
          >
            <span className="inline-block sm:inline">{t("Next")}</span>
            <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;