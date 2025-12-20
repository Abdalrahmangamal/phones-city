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
import InstallmentSection from "@/components/home/InstallmentSection"; // Import the InstallmentSection component
import { useHomePageStore } from '@/store/home/homepageStore'; // Import the home page store

export default function SpecialOffersPage() {
  const navigate = useNavigate();
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { categories, fetchCategories } = useCategoriesStore();
  const { data: homeData, fetchHomePage } = useHomePageStore(); // Get home page data

  // استخدم الـ response مباشرة كمصفوفة منتجات
  const { response: products, loading: productsLoading, error: storeError, fetchProducts } = useProductsStore();
  
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("created_at");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([null, null]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts({
      has_offer: 1,
      per_page: 100,
    }, lang);
    
    // جلب الفئات للفلتر
    fetchCategories(lang);
    
    // جلب بيانات الصفحة الرئيسية للحصول على نص العرض
    fetchHomePage(lang);
  }, [lang, fetchProducts, fetchHomePage]);

  // تطبيق الفلاتر على المنتجات
  useEffect(() => {
    let result = Array.isArray(products) ? [...products] : [];
    
    // تطبيق فلتر الفئة
    if (selectedCategory !== null) {
      result = result.filter(product => product.category?.id === selectedCategory);
    }
    
    // تطبيق فلتر النطاق السعري
    if (priceRange[0] !== null || priceRange[1] !== null) {
      result = result.filter(product => {
        const price = parseFloat(product.final_price || product.original_price);
        const min = priceRange[0];
        const max = priceRange[1];
        
        if (min !== null && price < min) return false;
        if (max !== null && price > max) return false;
        return true;
      });
    }
    
    // تطبيق الترتيب
    switch (sortOption) {
      case "created_at":
        // الترتيب الافتراضي
        break;
      case "main_price":
        result = [...result].sort((a, b) => {
          const priceA = parseFloat(a.final_price || a.original_price);
          const priceB = parseFloat(b.final_price || b.original_price);
          return priceA - priceB;
        });
        break;
      case "name_ar":
        // Since name_ar doesn't exist in Product type, we'll use name field
        result = [...result].sort((a, b) => 
          (a.name || "").localeCompare(b.name || "")
        );
        break;
      case "best_seller":
        // Since sales_count doesn't exist, we'll skip this sorting option
        break;
      case "average_rating":
        // Since average_rating doesn't exist, we'll skip this sorting option
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, sortOption, priceRange]);

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
  const productsList = Array.isArray(products) ? products : [];

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
          <InstallmentSection title={homeData?.offer_text} />
          
          {productsList.length > 0 ? (
            <div className="max-w-8xl mx-auto -mt-8">
              <Bestseller 
                title={t('AllOffers')} 
                products={filteredProducts.length > 0 ? filteredProducts : productsList}
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