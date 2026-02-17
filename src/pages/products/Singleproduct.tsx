"use client";

import Layout from "@/components/layout/layout";
import Gallery from "@/components/singleproduct/Gallery";
import Productdetails from "@/components/singleproduct/Productdetails";
import Informationproduct from "@/components/singleproduct/Informationproduct";
import FeaturedHeroSection from "@/components/home/FeaturedHeroSection";
import Loader from '@/components/Loader';
import Bestseller from "@/components/home/Bestseller";
import { useParams } from "react-router";
import { useProductsStore } from '@/store/productsStore';
import { useEffect, useState } from "react";
import '@/style.css';
import { useLangSync } from "@/hooks/useLangSync";
import { usePageStore } from '@/store/customerCareStore';
import { Link } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  const {
    fetchProductbyid,
    response,
    loading,
    fetchBestSellers,
    bestSellerProducts,
    loading: productsLoading
  } = useProductsStore();

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const { lang } = useLangSync();
  const { page, fetchPage, loading: pageLoading } = usePageStore();

  const [dataReady, setDataReady] = useState(false);

  // Reset selected option when product changes
  useEffect(() => {
    setSelectedOptionIndex(0);
  }, [id]);

  useEffect(() => {
    if (id) {
      setDataReady(false); // mark as not ready before fetching
      fetchProductbyid(id, lang).finally(() => {
        setDataReady(true);
      });
    }
    fetchPage("singlepro", lang);
    fetchBestSellers(lang);
  }, [id, lang]);

  const handleOptionChange = (index: number) => {
    setSelectedOptionIndex(index);
  };

  // الحصول على المنتج
  const product = response && typeof response === 'object' && 'id' in response
    ? response
    : Array.isArray(response) && response.length > 0
      ? response[0]
      : null;

  // تحقق إن المنتج المحمل هو فعلاً المنتج المطلوب في الـ URL
  // هذا يعمل أثناء الـ render مش بعده - فمفيش flash للبيانات القديمة
  const isCorrectProduct = product && (
    product.slug === id || String(product.id) === id
  );

  // Show loader if: data not ready yet, or product doesn't match current URL
  const isLoading = !dataReady || !isCorrectProduct;

  // إذا كان لا يزال التحميل جارياً أو المنتج مش بتاع الـ URL الحالي
  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  // إذا كان المنتج غير موجود بعد التحميل
  if (dataReady && !product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-500">
            {lang === "ar" ? "المنتج غير موجود" : "Product not found"}
          </p>
        </div>
      </Layout>
    );
  }

  const hasOptions = product?.options && Array.isArray(product.options) && product.options.length > 0;

  // تحديد إذا كان المنتج غير متوفر
  const isOutOfStock = (() => {
    try {
      const selectedVariant = hasOptions ? product.options[selectedOptionIndex] : null;
      const stockQuantity = selectedVariant?.quantity ?? product?.quantity ?? 0;
      const stockStatus = selectedVariant?.stock_status ?? product?.stock_status ?? "in_stock";
      return stockQuantity <= 0 || stockStatus === "out_of_stock" || stockStatus === "unavailable";
    } catch {
      return false;
    }
  })();

  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className={`py-4 mt-16 md:mt-6 md:-mb-8 -mb-16 ${lang === "ar" ? "text-right" : "text-left"}`}>
          <nav aria-label="breadcrumb" dir={lang === "ar" ? "rtl" : "ltr"}>
            <ol className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[16px] sm:text-[26px] md:text-base leading-none">
              <li className="flex-shrink-0">
                <Link
                  to={`/${lang}/products`}
                  className="text-[#181D25] hover:text-[#211C4D] font-[500] underline underline-offset-6 decoration-1 whitespace-nowrap"
                >
                  {lang === "ar" ? "المنتج" : "Product"}
                </Link>
              </li>
              <li className="flex-shrink-0">
                <span className="text-[#333D4C] font-[500] whitespace-nowrap">
                  {lang === "ar" ? "تفاصيل المنتج" : "Product Details"}
                </span>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="#reviews"
                  className="text-[#333D4C] font-[500] hover:text-[#211C4D] transition-colors whitespace-nowrap"
                >
                  {lang === "ar" ? "المراجعات" : "Reviews"} ({product?.reviews_count || 0})
                </a>
              </li>
            </ol>
          </nav>
        </div>

        <main className="py-8">
          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 border-[1px] border-gray-200 rounded-[12px] p-4 shadow-xl mt-12 md:mt-0">
            <Gallery
              images={
                hasOptions &&
                  product.options[selectedOptionIndex]?.images &&
                  product.options[selectedOptionIndex].images.length > 0
                  ? product.options[selectedOptionIndex].images
                  : (product.images || [])
              }
              discountPercent={
                (() => {
                  try {
                    const opt = hasOptions ? product.options[selectedOptionIndex] : null;
                    const ori = opt ? opt.original_price : product.original_price;
                    const fin = opt ? opt.final_price : product.final_price;
                    const o = ori ? Number(String(ori).replace(/,/g, "")) : 0;
                    const f = fin ? Number(String(fin).replace(/,/g, "")) : 0;
                    return o > 0 && f < o ? Math.round(((o - f) / o) * 100) : 0;
                  } catch {
                    return 0;
                  }
                })()
              }
              isOutOfStock={isOutOfStock} // تمرير حالة المخزون
            />

            <Productdetails
              product={product}
              handleindexchange={handleOptionChange}
              selectedOptionIndex={selectedOptionIndex}
              isOutOfStock={isOutOfStock} // تمرير حالة المخزون هنا أيضاً
            />
          </div>

          {/* Product Information */}
          <Informationproduct product={product} />

          {/* Featured Hero Section */}
          {!pageLoading && page && (
            <FeaturedHeroSection
              title={page.title || ""}
              description={page.short_description || ""}
              buttonText={lang === "ar" ? "تسوق الآن" : "Shop Now"}
              buttonLink="/favourite"
              backgroundImage={page.banner || ""}
            />
          )}

          {/* Best Sellers */}
          {bestSellerProducts && bestSellerProducts.length > 0 && (
            <Bestseller
              title={lang === "ar" ? "الأكثر مبيعاً" : "Best Sellers"}
              products={bestSellerProducts}
              limit={4}
              btn={true}
              link={`/${lang}/BestSellerPage`}
              showPagination={false}
              isLoading={productsLoading?.bestSellers || false}
            />
          )}
        </main>
      </div>
    </Layout>
  );
}