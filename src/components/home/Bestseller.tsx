import ProductCard from "../public/ProductCard";
import pattern from "../../assets/images/Layer_1.png";
import { Link } from "react-router-dom";
import type { Product } from "@/types/index";
import { useTranslation } from "react-i18next";
import Pagination from "../public/Pagination"; // استيراد Pagination

interface BestsellerProps {
  title: string;
  link?: string;
  btn?: boolean;
  style?: string;
  id?: number;
  products: Product[];
  favourite?: boolean;
  limit?: number;
  filterComponent?: React.ReactNode;
  imagecard?: string;
  containercard?: string;
  
  // إضافة Props للـ Pagination
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
  isLoading?: boolean;
}

export default function Bestseller({
  title,
  link,
  btn,
  products,
  containercard,
  style,
  limit,
  imagecard,
  filterComponent,
  
  // Pagination props
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  showPagination = true,
  isLoading = false,
}: BestsellerProps) {
  const { t } = useTranslation();

  const hasProducts = Array.isArray(products) && products.length > 0;
  
  // ====== التعديل المهم هنا ======
  // استبدل الكود القديم كله بهذا السطر:
const productsToShow = showPagination ? products : (limit ? products.slice(0, limit) : products);
  
  // ====== إضافة console.log للتصحيح ======
  console.log("Bestseller - Debug Info:", {
    hasProducts,
    showPagination,
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    allProductsCount: products.length,
    productsToShowCount: productsToShow.length,
    startIndex: showPagination ? (currentPage - 1) * itemsPerPage : 0,
    endIndex: showPagination ? (currentPage - 1) * itemsPerPage + itemsPerPage : limit || products.length
  });

  return (
    <div className={`mt-[20px] lg:px-[90px] px-2 pt-20 md:pt-20 ${containercard}`}>
      {/* العنوان */}
      <div className="flex items-center px-[10px] w-full justify-between relative">
        <div className="relative">
          <p className="text-[#211C4D] font-[600] text-[24px] md:text-[40px]">
            {title}
          </p>
          <img
            className="absolute top-0 md:top-[10px] w-[80px] md:w-[100px] object-contain right-[-50px]"
            src={pattern}
            alt=""
          />
        </div>

        <div className="flex items-center gap-4">
          {filterComponent && <div>{filterComponent}</div>}
          {btn && !showPagination && ( 
            <Link
              className="text-[#211C4D] text-[24px] flex items-center gap-[10px] font-[500]"
              to={link || "#"}
            >
              {t("ShowMore")}
              <svg
                width="10"
                height="18"
                viewBox="0 0 10 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.64 16.95C8.27 17.35 7.69 17.34 7.33 16.93L1.03 9.76C0.68 9.35 0.68 8.69 1.05 8.29L7.49 1.25C7.86 0.85 8.45 0.85 8.81 1.26C9.16 1.67 9.16 2.33 8.79 2.73L3.01 9.04L8.66 15.48C9.02 15.89 9.01 16.55 8.64 16.95Z"
                  fill="#211C4D"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* حالة التحميل */}
      {isLoading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
          <p className="text-gray-500 mt-2">{t('Loading')}</p>
        </div>
      )}

      {/* المنتجات */}
      {!isLoading && (
        <>
          <div
            className={`grid grid-cols-2 gap-[20px] sm:grid-cols-3 xl:grid-cols-4 ${style} md:gap-[40px] lg:gap-[100px] justify-items-center mt-[60px]`}
          >
            {hasProducts ? (
              productsToShow.map((item) => (
                <ProductCard key={item.id} product={item} imagecard={imagecard} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500 text-lg">{t('NoProductsAvailable')}</p>
              </div>
            )}
          </div>

          {/* Pagination Component */}
          {showPagination && hasProducts && (
  <div className="mt-12 mb-8 px-4">
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange || (() => {})}
      itemsPerPage={itemsPerPage}
      totalItems={totalItems}
    />
  </div>
)}

          {/* زر Show More (للحالات بدون pagination) */}
          {btn && showPagination && hasProducts && limit && products.length > limit && (
            <div className="text-center mt-8">
              <Link
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#211C4D] text-white rounded-lg hover:bg-[#2a245a] transition-colors"
                to={link || "#"}
              >
                {t("ShowMore")}
                <svg
                  width="10"
                  height="18"
                  viewBox="0 0 10 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.64 16.95C8.27 17.35 7.69 17.34 7.33 16.93L1.03 9.76C0.68 9.35 0.68 8.69 1.05 8.29L7.49 1.25C7.86 0.85 8.45 0.85 8.81 1.26C9.16 1.67 9.16 2.33 8.79 2.73L3.01 9.04L8.66 15.48C9.02 15.89 9.01 16.55 8.64 16.95Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}