"use client";

import Layout from "@/components/layout/Layout";
import Gallery from "@/components/singleproduct/Gallery";
import Ptoductdetails from "@/components/singleproduct/Ptoductdetails";
import Informationproduct from "@/components/singleproduct/Informationproduct";
import FeaturedHeroSection from "@/components/home/FeaturedHeroSection";
import BestSellingProducts from "@/components/singleproduct/BestSellingProducts";
import heroImage from "@/assets/images/herooffer.png";
import orangelabtop from "@/assets/images/orangelabtop.png";
import bluephone from "@/assets/images/bluephone.png";
import watch from "@/assets/images/watch.png";
import airbuds from "@/assets/images/airbuds.png";
import product1 from "@/assets/images/product1.png";
import product2 from "@/assets/images/product2.png";
import type { Product } from "@/types/index";

export default function ProductPage() {
  // Mock data for best selling products
  const bestSellingProducts: Product[] = [
    {
      id: 1,
      name: "لابتوب ابل ماك بوك برو 2024",
      price: 8999,
      isNew: true,
      variations: [
        { color: "#fff", image: orangelabtop },
        { color: "#000", image: bluephone },
        { color: "#f68b1f", image: airbuds },
      ],
    },
    {
      id: 2,
      name: "ايفون 15 برو",
      discount: "16",
      price: 7499,
      variations: [
        { color: "#ccc", image: bluephone },
        { color: "#000", image: product2 },
        { color: "#f68b1f", image: airbuds },
      ],
    },
    {
      id: 3,
      name: "ايفون 15 برو",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },

  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background lg:px-[90px] px-2 pt-20 md:pt-0" dir="rtl">
        {/* Main Content */}
        <main className="lg:container mx-auto  md:px-4 py-4 md:py-8">
          <div className="bg-card rounded-lg shadow-sm p-4 md:p-8">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
              {/* Product Images */}
              <Gallery />
              {/* Product Details */}
              <Ptoductdetails />
            </div>
          </div>
          
          <Informationproduct />
          
          {/* Featured Hero Section - Placed at the end of the page with correct sizing */}
          <FeaturedHeroSection
            title="اكتشافك المفضل التالي على بعد نقرة واحدة فقط!"
            description=""
            buttonText="تسوق الان"
            buttonLink="/products"
            backgroundImage={heroImage}
          />
          
          {/* Best Selling Products Section */}
          <BestSellingProducts
            title={"الأكثر مبيعاً"}
            btn={true}
            link="/Trademarksbestseller"
            products={bestSellingProducts}
          />
        
        </main>
      </div>
    </Layout>
  );
}