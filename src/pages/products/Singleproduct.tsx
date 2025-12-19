"use client";

import Layout from "@/components/layout/Layout";
import Gallery from "@/components/singleproduct/Gallery";
import Ptoductdetails from "@/components/singleproduct/Ptoductdetails";
import Informationproduct from "@/components/singleproduct/Informationproduct";
import FeaturedHeroSection from "@/components/home/FeaturedHeroSection";
import Loader from '@/components/Loader'
import { useParams } from "react-router";
import {useProductsStore} from '@/store/productsStore'
import { useEffect, useState } from "react";
import  '@/style.css'
import { useLangSync } from "@/hooks/useLangSync";
import { usePageStore } from '@/store/customerCareStore';

export default function ProductPage() {
  const {id} = useParams();
  const {fetchProductbyid, response, loading} = useProductsStore();
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const { lang } = useLangSync();
  const { page, fetchPage, loading: pageLoading } = usePageStore();

  useEffect(() => {
    if (id) {
      fetchProductbyid(id,lang);
    }
    // Fetch banner data from backend
    fetchPage("singlepro", lang);
  }, [id,lang]);

  const handleOptionChange = (index: number) => {
    setSelectedOptionIndex(index);
  }

  // تحديث selectedOptionIndex عند تحميل المنتج
  useEffect(() => {
    setSelectedOptionIndex(0);
  }, []);

  // التحقق من البيانات بشكل صحيح - response يجب أن يكون مفرد وليس array
  const product = Array.isArray(response) ? response[0] : response;
  const hasOptions = product?.options && Array.isArray(product.options) && product.options.length > 0;
  const isLoading = loading || !product;

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : product ? (
        <div className="min-h-screen bg-background lg:px-[90px] px-2 pt-20 md:pt-0" dir="rtl">
          {/* Main Content */}
          <main className="lg:container mx-auto md:px-4 py-4 md:py-8">
            <div className="bg-card rounded-lg shadow-sm p-4 md:p-8">
              <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
                {/* Product Images */}
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
                {/* Product Details */}
                <Ptoductdetails 
                  product={product} 
                  handleindexchange={handleOptionChange}
                  selectedOptionIndex={selectedOptionIndex}
                />
              </div>
            </div>
            
            <Informationproduct product={product} />
            
            {/* Featured Hero Section - Placed at the end of the page with correct sizing */}
            {/* Show loader while fetching banner data */}
            {pageLoading && <Loader />}
            {/* Display banner when data is loaded */}
            {!pageLoading && page && (
              <FeaturedHeroSection
                title={page.title || ""}
                description={page.short_description || ""}
                buttonText="تسوق الان"
                buttonLink="/products"
                backgroundImage={page.banner || ""}
              />
            )}
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