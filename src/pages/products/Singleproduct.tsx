"use client";

import Layout from "@/components/layout/layout";
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

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  // التحقق من البيانات بشكل صحيح - response يجب أن يكون مفرد وليس array
  const product = Array.isArray(response) ? response[0] : response;
  const hasOptions = product?.options && Array.isArray(product.options) && product.options.length > 0;

  return (
    <Layout>
      {product ? (
        <div className="container mx-auto px-4">
          <main className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Product Gallery */}
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
            
            <Informationproduct product={product} />
            
            {/* Featured Hero Section - Placed at the end of the page with correct sizing */}
            {/* Show loader while fetching banner data */}
            {pageLoading && <Loader />}
            {/* Display banner when data is loaded */}
            {!pageLoading && page && (
              <FeaturedHeroSection
                title={page.title || ""}
                description={page.short_description || ""}
                buttonText="" // Not used anymore since we're using translation
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