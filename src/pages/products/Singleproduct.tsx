"use client";

import Layout from "@/components/layout/layout";
import Gallery from "@/components/singleproduct/Gallery";
import Ptoductdetails from "@/components/singleproduct/Ptoductdetails";
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

  useEffect(() => {
    if (id) {
      fetchProductbyid(id, lang);
    }
    fetchPage("singlepro", lang);

    //  جلب الأكثر مبيعاً عند تحميل الصفحة
    fetchBestSellers(lang);
  }, [id, lang]);

  const handleOptionChange = (index: number) => {
    setSelectedOptionIndex(index);
  };

  useEffect(() => {
    setSelectedOptionIndex(0);
  }, []);

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  const product = Array.isArray(response) ? response[0] : response;
  const hasOptions = product?.options && Array.isArray(product.options) && product.options.length > 0;

  return (
    <Layout>
      
      {product ? (
        <div className="container mx-auto px-4">


        {/* Breadcrumbs - Responsive */}
        <div className={`py-4 mt-16 md:mt-6 md:-mb-8 -mb-16 ${lang === "ar" ? "text-right" : "text-left"}`}>
          <nav aria-label="breadcrumb" dir={lang === "ar" ? "rtl" : "ltr"}>
            <ol className="
              flex flex-wrap items-center 
              gap-x-6 gap-y-3 
              text-[16px] 
              sm:text-[26px] 
              md:text-base 
              leading-none
            ">
              {/* المنتج */}
              <li className="flex-shrink-0">
                <Link
                  // to={`/${lang}/products`}
                  className="
                    text-[#181D25] hover:text-[#211C4D] 
                    font-[500] 
                    underline underline-offset-6 
                    decoration-1
                    whitespace-nowrap
                  "
                >
                  {lang === "ar" ? "المنتج" : "Product"}
                </Link>
              </li>

              {/* تفاصيل المنتج */}
              <li className="flex-shrink-0">
                <span className="text-[#333D4C] font-[500] whitespace-nowrap">
                  {lang === "ar" ? "تفاصيل المنتج" : "Product Details"}
                </span>
              </li>

              {/* المراجعات مع عدد ديناميكي */}
              <li className="flex-shrink-0">
                <a
                  href="#reviews"
                  className="
                    text-[#333D4C] font-[500] 
                    hover:text-[#211C4D] 
                    transition-colors 
                    whitespace-nowrap
                  "
                >
                  {lang === "ar" ? "المراجعات" : "Reviews"}{" "}
                  ({product?.reviews_count || product?.reviews?.length})
                </a>
              </li>
            </ol>
          </nav>
        </div>
          <main className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 border-[1px] border-gray-200 rounded-[12px] p-4 shadow-xl mt-12 md:mt-0">
              <Gallery 
                images={
                  hasOptions 
                    ? product.options[selectedOptionIndex]?.images 
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
                      return o > 0 ? ((o - f) / o) * 100 : 0;
                    } catch (e) {
                      return 0;
                    }
                  })()
                }
              />
              
              <Ptoductdetails 
                product={product} 
                handleindexchange={handleOptionChange}
                selectedOptionIndex={selectedOptionIndex}
              />
            </div>
            
            <Informationproduct product={product} />
            
            {/* Featured Hero Section */}
            {pageLoading && <Loader />}
            {!pageLoading && page && (
              <FeaturedHeroSection
                title={page.title || ""}
                description={page.short_description || ""}
                buttonText={lang === "ar" ? "تسوق الآن" : "Shop Now"}
                buttonLink="/favourite"
                backgroundImage={page.banner || ""}
              />
            )}

            {/*  قسم الأكثر مبيعاً  */}
            
              <Bestseller
                title={lang === "ar" ? "الأكثر مبيعاً" : "Best Sellers"}
                products={bestSellerProducts || []}
                limit={4}                    
                btn={true}                   
                link={`/${lang}/BestSellerPage`} 
                showPagination={false}       
                isLoading={productsLoading?.bestSellers || false} 
                fullWidth={true}
              />
        

          </main>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-500">المنتج غير موجود</p>
        </div>
      )}
    </Layout>
  );
}