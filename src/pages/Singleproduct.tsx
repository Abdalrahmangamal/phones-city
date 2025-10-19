"use client";

import Layout from "@/components/layout/Layout";
import Gallery from "@/components/singleproduct/Gallery";
import Ptoductdetails from "@/components/singleproduct/Ptoductdetails";
import Informationproduct from "@/components/singleproduct/Informationproduct";
export default function ProductPage() {

  return (
    <Layout>
      <div className="min-h-screen bg-background lg:px-[90px] px-2 pt-20 md:pt-0" dir="rtl">
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="bg-card rounded-lg shadow-sm p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <Gallery />
              {/* Product Details */}
              <Ptoductdetails />
            </div>
          </div>
          <Informationproduct />
        
        </main>
      </div>
    </Layout>
  );
}
