import { useEffect, useState } from "react";
import Bestseller from "@/components/home/Bestseller";
import Layout from "@/components/layout/layout";
import { useNavigate } from "react-router-dom";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next"; // أو أي طريقة تستخدمها للترجمة
import Filter from "@/components/public/Filter";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import type { Product } from "@/types/index";
import InstallmentSection from "@/components/home/InstallmentSection"; // Import the InstallmentSection component
import { useProductsStore } from "@/store/productsStore"; // Import the home page store
import { getProductNumericPrice, isProductOnOffer, parseSortToken, productMatchesCategorySelection } from "@/utils/filterUtils";

export default function SpecialOffersPage() {
  const navigate = useNavigate();
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { offersProducts, fetchOffers, offersMeta, offersLoading, error: storeError } = useProductsStore();
  const { fetchCategories, categories } = useCategoriesStore();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([
    null,
    null,
  ]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchOffers(lang, currentPage).then(() => {
    }).catch((err) => console.error('Failed to fetch offers', err));

    // جلب الفئات للفلتر
    fetchCategories(lang);

  }, [lang, currentPage]);

  // تطبيق الفلاتر على المنتجات (باستخدام العروض)
  useEffect(() => {
    let result = Array.isArray(offersProducts)
      ? [...offersProducts].filter((product) => isProductOnOffer(product))
      : [];

    // تطبيق فلتر الفئة
    if (selectedCategory !== null) {
      result = result.filter((product) =>
        productMatchesCategorySelection(product, selectedCategory, categories as any)
      );
    }

    // تطبيق فلتر النطاق السعري
    if (priceRange[0] !== null || priceRange[1] !== null) {
      result = result.filter((product) => {
        const price = getProductNumericPrice(product);
        const min = priceRange[0];
        const max = priceRange[1];

        if (min !== null && price < min) return false;
        if (max !== null && price > max) return false;
        return true;
      });
    }

    // تطبيق الترتيب
    const parsedSort = parseSortToken(sortOption);
    if (parsedSort) {
      result = [...result].sort((a, b) => {
        switch (parsedSort.sortBy) {
          case "main_price": {
            const diff = getProductNumericPrice(a) - getProductNumericPrice(b);
            return parsedSort.sortOrder === "asc" ? diff : -diff;
          }
          case "name_ar": {
            const diff = (a.name || "").localeCompare(b.name || "", lang === "ar" ? "ar" : "en");
            return parsedSort.sortOrder === "asc" ? diff : -diff;
          }
          case "average_rating": {
            const diff = Number(a.average_rating || 0) - Number(b.average_rating || 0);
            return parsedSort.sortOrder === "asc" ? diff : -diff;
          }
          case "created_at": {
            const aTime = new Date((a as any)?.created_at || 0).getTime() || 0;
            const bTime = new Date((b as any)?.created_at || 0).getTime() || 0;
            const diff = aTime - bTime;
            return parsedSort.sortOrder === "asc" ? diff : -diff;
          }
          case "best_seller": {
            const diff = Number((a as any)?.sales_count || 0) - Number((b as any)?.sales_count || 0);
            return parsedSort.sortOrder === "asc" ? diff : -diff;
          }
          default:
            return 0;
        }
      });
    }
    setFilteredProducts(result);
  }, [offersProducts, selectedCategory, sortOption, priceRange, lang]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const handlePriceRangeChange = (
    minPrice: number | null,
    maxPrice: number | null
  ) => {
    setPriceRange([minPrice, maxPrice]);
  };

  // حالة الخطأ من الـ store
  if (storeError) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("AnErrorOccurred")}
            </h2>
            <p className="text-gray-600 mb-6">{storeError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {t("Reload")}
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // حالة التحميل
  if (offersLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-700">{t("LoadingSpecialOffers")}</p>
          </div>
        </div>
      </Layout>
    );
  }

  // تأكد أن offersProducts مصفوفة (للأمان)
  const offersList = Array.isArray(offersProducts)
    ? offersProducts.filter((product) => isProductOnOffer(product))
    : [];
  const hasActiveFilters =
    selectedCategory !== null || !!sortOption || priceRange[0] !== null || priceRange[1] !== null;
  const displayedProducts = hasActiveFilters ? filteredProducts : offersList;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* <button
          onClick={() => navigate(-1)}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-white shadow-lg rounded-lg hover:bg-gray-100 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('Back')}
        </button> */}

        <div className="pt-6 pb-12 px-4 md:px-8">
          {/* Replace the banner with InstallmentSection */}
          {/* <InstallmentSection title={homeData?.offer_text} /> */}

          {offersList.length > 0 ? (
            <div className="max-w-8xl mx-auto -mt-8">
              <Bestseller
                title={t("AllOffers")}
                products={displayedProducts}
                btn={false}
                style="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                filterComponent={
                  <div className="flex justify-center">
                    <Filter
                      onSortChange={handleSortChange}
                      onCategoryChange={handleCategoryChange}
                      onPriceRangeChange={handlePriceRangeChange}
                      categories={categories || []}
                      minPrice={0}
                      maxPrice={10000}
                      selectedSort={sortOption}
                      selectedCategory={selectedCategory}
                      selectedPriceRange={priceRange}
                      resultCount={displayedProducts.length}
                    />
                  </div>
                }
              />
              {/* Pagination controls for offers */}
              {/* {offersMeta && offersMeta.last_page > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border disabled:opacity-50"
                  >
                    {t("Prev") || "Prev"}
                  </button>

                  {Array.from({ length: offersMeta.last_page }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded ${pageNum === currentPage ? 'bg-blue-600 text-white' : 'border'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, offersMeta.last_page))}
                    disabled={currentPage === offersMeta.last_page}
                    className="px-3 py-1 rounded border disabled:opacity-50"
                  >
                    {t("Next") || "Next"}
                  </button>
                </div>
              )} */}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center py-16 bg-white rounded-2xl shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                {t("NoOffersAvailable")}
              </h3>
              <p className="text-gray-500 mb-8">{t("NoOffersFound")}</p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {t("ReturnToHome")}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
