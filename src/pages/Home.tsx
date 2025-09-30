import React from 'react';
import Layout from '@/components/layout/layout';
import HeroSection from '@/components/public/HeroSection';
import BannerSection from '@/components/public/BannerSection';
import TrendingProductsSection from '@/components/custom/TrendingProductsSection';
import ProductCategoriesSection from '@/components/home/ProductCategoriesSection';
import NewTrendingProductsSection from '@/components/custom/NewTrendingProductsSection';
import SpecialOffersSection from '@/components/custom/SpecialOffersSection';
import TestimonialsSection from '@/components/custom/TestimonialsSection';
import FrameSection from '@/components/custom/FrameSection';
import TrendingProductsPopupSection from '@/components/custom/TrendingProductsPopupSection';
import Share2Section from '@/components/custom/Share2Section';
import Rectangle5Section from '@/components/custom/Rectangle5Section';
import InstallmentSection from '@/components/home/InstallmentSection';
import LatestOffers from '@/components/home/LatestOffers';

const NewHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Navigation Bar - Reusing existing component */}
      <Layout />
      
      {/* Main Content Area */}
      <main className=" w-full  md:px-[45px] px-[10px]">
        {/* Hero Section - Implementing Figma design */}
    
          <HeroSection />
        
        {/* Banner Section */}
      
          <BannerSection />
        
        {/* Trending Products Section */}
        
        
        {/* Frame 1321317127 Image Section */}
       
         <InstallmentSection/>
        
        {/* Product Categories Section */}
       
          <ProductCategoriesSection />
        
        {/* LatestOffers Section */}
        <LatestOffers/>
        
        {/* New Trending Products Section */}
        <section className="mt-6 mb-6 flex justify-center">
          <NewTrendingProductsSection />
        </section>
        
        {/* Special Offers Section */}
        <section className="mt-6 mb-6 flex justify-center">
          <SpecialOffersSection />
        </section>
        
        {/* Testimonials Section */}
        <section className="mt-6 mb-6 flex justify-center">
          <TestimonialsSection />
        </section>
        
        {/* Frame Section */}
        <section className="mt-6 mb-6 flex justify-center">
          <FrameSection />
        </section>
        
        {/* Trending Products Popup Section */}
        <section className="mt-6 mb-6 flex justify-center">
          <TrendingProductsPopupSection />
        </section>
        
        {/* Share 2 Section */}
        <section className="mt-6 mb-6 flex justify-center">
          <Share2Section />
        </section>
        
        {/* Rectangle 5 Section */}
        <section className="mt-6 mb-6 flex justify-center">
          <Rectangle5Section />
        </section>
      </main>
    </div>
  );
};

export default NewHome;