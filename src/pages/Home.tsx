import Layout from "@/components/layout/layout";
import HeroSection from "@/components/public/HeroSection";
import BannerSection from "@/components/public/BannerSection";
import ProductCategoriesSection from "@/components/home/ProductCategoriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FrameSection from "@/components/home/FrameSection";
import InstallmentSection from "@/components/home/InstallmentSection";
import LatestOffers from "@/components/home/LatestOffers";
import Parttner from "@/components/public/Parttner";
import AppDownloadSection from "@/components/home/AppDownloadSection";
import CertificationBadgesSection from "@/components/home/CertificationBadgesSection";
import banner from "../assets/images/banner.png";
import HomePopup from "@/components/home/HomePopup";
import { useState } from "react";

const NewHome = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 w-full flex flex-col">
        {/* Popup Modal */}
        {showPopup && <HomePopup onClose={handleClosePopup} />}
        
        <main className="w-full ">
          {/* Hero Section - Implementing Figma design */}
          <HeroSection />
          <BannerSection image={`${banner}`} />
          <InstallmentSection />
          <ProductCategoriesSection />
          <LatestOffers />
          <TestimonialsSection />
          <FrameSection />
          <CertificationBadgesSection />
          <Parttner />
          <AppDownloadSection />
        </main>
      </div>
    </Layout>
  );
};

export default NewHome;