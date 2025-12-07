"use client";

import Layout from "@/components/layout/Layout";
import Gallery from "@/components/singleproduct/Gallery";
import Ptoductdetails from "@/components/singleproduct/Ptoductdetails";
import Informationproduct from "@/components/singleproduct/Informationproduct";
import FeaturedHeroSection from "@/components/home/FeaturedHeroSection";
import heroImage from "@/assets/images/herooffer.png";
import Loader from '@/components/Loader'
import { useParams } from "react-router";
import {useProductsStore} from '@/store/productsStore'
import { useEffect, useState } from "react";

export default function ProductPage() {
  const {id} = useParams();
  const {fetchProductbyid, response, loading} = useProductsStore();
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProductbyid(id);
    }
  }, [id, fetchProductbyid]);

  const handleOptionChange = (index: number) => {
    setSelectedOptionIndex(index);
  }

  // تحديث selectedOptionIndex عند تحميل المنتج
  useEffect(() => {
    setSelectedOptionIndex(0);
  }, [response]);

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
            <FeaturedHeroSection
              title="اكتشافك المفضل التالي على بعد نقرة واحدة فقط!"
              description=""
              buttonText="تسوق الان"
              buttonLink="/products"
              backgroundImage={heroImage}
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