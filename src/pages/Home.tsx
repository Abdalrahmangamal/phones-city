import { useState, useEffect } from "react";
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
import Loader from "@/components/Loader";
import SpecialOffersSection from "@/components/home/SpecialOffersSection";
import HomePopup from "@/components/home/HomePopup"; 
import BestSellersSection from "@/components/home/BestSellersSection";



// Stores
import { useProductsStore } from "@/store/productsStore";
import { useHeroSectionStore } from "@/store/home/herosectionStore";
import { useCertificateStore } from "@/store/home/certificateStore";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import useFeaturesStore from "@/store/home/featuresStore";
import { useLangSync } from "@/hooks/useLangSync";
import { useHomePageStore } from '@/store/home/homepageStore';
import { usePopupStore } from '@/store/popupStore'; // Added popup store
// import type { Product } from '@/types/index';

const NewHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { fetchHomePage, data } = useHomePageStore();
  const { lang } = useLangSync();
  const { isShowing, showPopup, hidePopup } = usePopupStore(); // Use popup store
  
  useEffect(() => {
    fetchHomePage(lang);
    console.log(lang)
  }, [lang]);

  // Effect to show popup after a delay only if it hasn't been shown yet
  useEffect(() => {
    // Reset popup state when component mounts (homepage is visited)
    usePopupStore.getState().resetPopup();
    
    const popupTimer = setTimeout(() => {
      // Check if popup has already been shown
      if (!usePopupStore.getState().hasShown) {
        showPopup();
      }
    }, 10000); // Show popup after 10 seconds (as per user request)

    // Cleanup timer if component unmounts
    return () => {
      clearTimeout(popupTimer);
    };
  }, []);

  // All stores
  const {
    fetchOffers,  
    fetchBestSellers,
    offersProducts,
    bestSellerProducts,
    response: productsResponse,
    loading: productsLoading,
  } = useProductsStore();

  const { fetchSliders, sliders } = useHeroSectionStore();
  const { fetchCertificates, certificates } = useCertificateStore();
  const { fetchCategories, categories } = useCategoriesStore();
  const { fetchFeatures, getFeaturesByLanguage } = useFeaturesStore();

 
  // Fetch all data in one place
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);

        await Promise.all([
          // Special offers products
          fetchOffers(lang),

          // Best sellers products
          fetchBestSellers(lang),

          // Hero sliders
          fetchSliders(lang),

          // Certificates
          fetchCertificates(),

          // Product categories
          fetchCategories(lang),

          // Features (FrameSection)
          fetchFeatures(),

          // Trademarks / Brands (Parttner)
          // fetchtradmarks(),
        ]);
      } catch (error) {
        console.error("Error loading home page data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, [lang]); 

  // Helper to safely get products array
  const getProductsArray = () => {
    if (!productsResponse) return [];
    if (Array.isArray(productsResponse)) return productsResponse.slice(0, 10);
    return [productsResponse];
  };

  const products = getProductsArray();

  // Features translated by current language
  const langFeatures = getFeaturesByLanguage(lang === "ar" ? "ar" : "en") || [];

  // Map categories to handle null images
  const mappedCategories = categories.map(category => ({
    ...category,
    image: category.image || undefined
  }));

  // Global loading state
  if (isLoading || productsLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      {/* Show the popup if showPopup is true */}
      {isShowing && <HomePopup onClose={() => hidePopup()} sliders={sliders} />}
      
      <div className="min-h-screen bg-gray-50 w-full flex flex-col">
        <main className="w-full">
          <HeroSection sliders={sliders} />
          <BannerSection images={data?.main_images || []} />
          <InstallmentSection title={data?.offer_text} />
          <ProductCategoriesSection />
          <LatestOffers />
          <SpecialOffersSection 
            title="SpecialOffersForYou"    
            products={offersProducts} 
            link="offers"
          />
          <SpecialOffersSection 
            title="BestSellers"    
            products={bestSellerProducts} 
            link="BestSellerPage"
          />
          <SpecialOffersSection 
            title="SpecialOffersForYou"    
            products={offersProducts} 
            link="offers"
          />

         
          <TestimonialsSection />
          <FrameSection features={langFeatures} />
          <CertificationBadgesSection certificates={certificates || []} />
          <Parttner />
          <AppDownloadSection 
          key={lang}
            title={data?.app_title } 
            description={data?.app_description } 
            image={data?.app_main_image }  
          />
        </main>
      </div>
    </Layout>
  );
};

export default NewHome;