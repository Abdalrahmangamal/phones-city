import { useEffect, useState } from "react";
import Bestseller from "@/components/home/Bestseller";
import Layout from "@/components/layout/layout";
import { useProductsStore } from "@/store/productsStore";
import { useNavigate } from "react-router-dom";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next"; // أو أي طريقة تستخدمها للترجمة
import Filter from "@/components/public/Filter";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import type { Product } from "@/types/index";
import { getProductNumericPrice, isProductOnOffer, parseSortToken, productMatchesCategorySelection } from "@/utils/filterUtils";

export default function Trademarkbestoffer() {
  const navigate = useNavigate();
  const { lang } = useLangSync();
  const { t } = useTranslation(); // استدعاء دالة الترجمة
  const { categories, fetchCategories } = useCategoriesStore();

  // استخدم الـ response مباشرة كمصفوفة منتجات
  const { response: products, loading: productsLoading, error: storeError, fetchProducts } = useProductsStore();
  
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([null, null]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts({
      has_offer: 1,
      per_page: 100,
    }, lang);
    
    // جلب الفئات للفلتر
    fetchCategories(lang);
  }, [lang, fetchProducts]);

  // تطبيق الفلاتر على المنتجات
  useEffect(() => {
    let result = Array.isArray(products)
      ? [...products].filter((product) => isProductOnOffer(product))
      : [];
    
    // تطبيق فلتر الفئة
    if (selectedCategory !== null) {
      result = result.filter((product) =>
        productMatchesCategorySelection(product, selectedCategory, categories as any)
      );
    }
    
    // تطبيق فلتر النطاق السعري
    if (priceRange[0] !== null || priceRange[1] !== null) {
      result = result.filter(product => {
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
  }, [products, selectedCategory, sortOption, priceRange, lang]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const handlePriceRangeChange = (minPrice: number | null, maxPrice: number | null) => {
    setPriceRange([minPrice, maxPrice]);
  };

  // حالة الخطأ من الـ store
  if (storeError) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('AnErrorOccurred')}</h2>
            <p className="text-gray-600 mb-6">{storeError}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {t('Reload')}
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // حالة التحميل
  if (productsLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-700">{t('LoadingSpecialOffers')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  // تأكد أن products مصفوفة (للأمان)
  const productsList = Array.isArray(products)
    ? products.filter((product) => isProductOnOffer(product))
    : [];
  const hasActiveFilters =
    selectedCategory !== null || !!sortOption || priceRange[0] !== null || priceRange[1] !== null;
  const displayedProducts = hasActiveFilters ? filteredProducts : productsList;

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
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{t('ExclusiveSpecialOffers')}</h2>
              <p className="opacity-90">{t('EnjoyBestOffersOn')} {productsList.length} {t('products')}</p>
            </div>
          </div>

          {productsList.length > 0 ? (
            <div className="max-w-8xl mx-auto -mt-8">
              <Bestseller 
                title={t('AllOffers')} 
                products={displayedProducts}
                btn={false}
                style="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                filterComponent={
                  <div className="flex justify-center">
                    <Filter 
                      onSortChange={handleSortChange}
                      onCategoryChange={handleCategoryChange}
                      onPriceRangeChange={handlePriceRangeChange}
                      categories={categories}
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
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center py-16 bg-white rounded-2xl shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">{t('NoOffersAvailable')}</h3>
              <p className="text-gray-500 mb-8">{t('NoOffersFound')}</p>
              <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {t('ReturnToHome')}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
