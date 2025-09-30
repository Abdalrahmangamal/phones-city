import React from 'react';
import Layout from '@/components/layout/layout';
import NewHeroSection from '@/components/public/HeroSection';
import CategoriesSection from '@/components/public/BannerSection';
import TrendingProductsSection from '@/components/custom/TrendingProductsSection';
import ProductCategoriesSection from '@/components/home/ProductCategoriesSection';
import ShareSection from '@/components/custom/ShareSection';
import NewTrendingProductsSection from '@/components/custom/NewTrendingProductsSection';
import SpecialOffersSection from '@/components/custom/SpecialOffersSection';
import TestimonialsSection from '@/components/custom/TestimonialsSection';
import FrameSection from '@/components/custom/FrameSection';
import TrendingProductsPopupSection from '@/components/custom/TrendingProductsPopupSection';
import Share2Section from '@/components/custom/Share2Section';
import Rectangle5Section from '@/components/custom/Rectangle5Section';

const NewHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar - Reusing existing component */}
      <Layout />
      
      {/* Main Content Area */}
      <main className="container mx-auto px-4">
        {/* Hero Section - Implementing Figma design */}
        <section className="mt-6">
          <NewHeroSection />
        </section>
        
        {/* Categories Section */}
        <section className="mt-6 mb-6">
          <CategoriesSection />
        </section>
        
        {/* Trending Products Section */}
        
        
        {/* Frame 1321317127 Image Section */}
        <section className="mt-6 mb-6 flex justify-center">
          <div className="w-full rounded-[16px] overflow-hidden">
            <img 
              src="/Frame 1321317127.svg" 
              alt="Frame 1321317127" 
              className="w-full h-auto object-cover"
            />
          </div>
        </section>
        
        {/* Product Categories Section */}
        <section className="mt-6 mb-6">
          <ProductCategoriesSection />
        </section>
        
        {/* Share Section */}
        <section className="mt-6 mb-6">
          <ShareSection />
        </section>
        
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