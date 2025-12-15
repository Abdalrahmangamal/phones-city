import { useEffect } from "react";
import Bestseller from "@/components/home/Bestseller";
import Layout from "@/components/layout/Layout";
import { useProductsStore } from "@/store/productsStore";
import { useNavigate } from "react-router-dom";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next"; // أو أي طريقة تستخدمها للترجمة

export default function Trademarkbestoffer() {
  const navigate = useNavigate();
  const { lang } = useLangSync();
  const { t } = useTranslation(); // استدعاء دالة الترجمة

  // استخدم الـ response مباشرة كمصفوفة منتجات
  const { response: products, loading: productsLoading, error: storeError, fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts({
      has_offer: 1,
      per_page: 100,
    }, lang);
  }, [lang, fetchProducts]);

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
                products={productsList}
                btn={false}
                style="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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