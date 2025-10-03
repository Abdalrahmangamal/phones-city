import Layout from '@/components/layout/layout';
import HeroSection from '@/components/public/HeroSection';
import BannerSection from '@/components/public/BannerSection';
import ProductCategoriesSection from '@/components/home/ProductCategoriesSection';
// import NewTrendingProductsSection from '@/components/custom/NewTrendingProductsSection';
import SpecialOffersSection from '@/components/home/SpecialOffersSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FrameSection from '@/components/home/FrameSection';
// import Share2Section from '@/components/custom/Share2Section';
import InstallmentSection from '@/components/home/InstallmentSection';
import LatestOffers from '@/components/home/LatestOffers';
import Footer from '@/components/layout/Footer'; // Added Footer import
import Bestseller from '@/components/home/Bestseller';
import Parttner from '@/components/public/Parttner';
import AppDownloadSection from '@/components/home/AppDownloadSection';
import CertificationBadgesSection from '@/components/home/CertificationBadgesSection';

const NewHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col">
      {/* Navigation Bar - Reusing existing component */}
      <Layout />
      {/* Main Content Area - Added pt-20 for mobile navbar spacing */}
      <main className="w-full md:px-[45px] px-[10px] pt-20 md:pt-0 flex-grow">
        {/* Hero Section - Implementing Figma design */}
        <HeroSection />
        {/* Banner Section */}
        <BannerSection />
        {/* Trending Products Section */}
        <InstallmentSection/>
        {/* Product Categories Section */}
        <ProductCategoriesSection />
        {/* LatestOffers Section */}
        <LatestOffers/>
        {/* New Trending Products Section */}
      <Bestseller/>
        
        {/* Special Offers Section */}
        <section className="mt-6 mb-6 flex justify-center">
          <SpecialOffersSection />
        </section>
        
        {/* Testimonials Section */}
        <section className="mt-6 mb-6 flex justify-center">
          <TestimonialsSection />
        </section>
        
        {/* Frame Section */}
        <section className="px-0 -mx-[10px] md:-mx-[45px]">
    <FrameSection />
  </section>
        
    
        {/* Certification Badges Section - SECOND TO LAST SECTION */}
        <section className="mt-6 mb-6">
          <CertificationBadgesSection />
        </section>
        
        <Parttner/>
        
        {/* App Download Section - NEW COMPONENT */}
      
          <AppDownloadSection />
    
        {/* Rectangle 5 Section */}
      </main>
      
      {/* Footer - Added Footer component at the bottom */}
      <Footer />
    </div>
  );
};

export default NewHome;