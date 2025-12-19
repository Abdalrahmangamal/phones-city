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
import HomePopup from "@/components/home/HomePopup"; // Import the HomePopup component
import BestSellersSection from "@/components/home/BestSellersSection";

// Stores
import { useProductsStore } from "@/store/productsStore";
import { useHeroSectionStore } from "@/store/home/herosectionStore";
import { useCertificateStore } from "@/store/home/certificateStore";
import { useLatestOffersStore } from "@/store/home/latestOffersStore";
import { useTestimonialStore } from "@/store/home/testimonialStore";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import useFeaturesStore from "@/store/home/featuresStore";
import { useLangSync } from "@/hooks/useLangSync";
import { useHomePageStore } from '@/store/home/homepageStore';
import type { Product } from '@/types/index';

const NewHome = () => {
  const [showPopup, setShowPopup] = useState(false); // Initially set to false
  const [isLoading, setIsLoading] = useState(false);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [bestSellersLoading, setBestSellersLoading] = useState(false);
  
  const { fetchHomePage, data } = useHomePageStore();
  const { lang } = useLangSync();
  
  useEffect(() => {
    fetchHomePage(lang);
  }, [lang]);

  // Effect to show popup after a delay
  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 2000); // Show popup after 2 seconds (as per memory requirement)

    // Cleanup timer if component unmounts
    return () => clearTimeout(popupTimer);
  }, []);

  // All stores
  const {
    fetchProducts,
    response: productsResponse,
    loading: productsLoading,
  } = useProductsStore();

  const { fetchSliders, sliders } = useHeroSectionStore();
  const { fetchCertificates, certificates } = useCertificateStore();
  const { fetchOffers, offers } = useLatestOffersStore();
  const { fetchTestimonials, testimonials } = useTestimonialStore();
  const { fetchCategories, categories } = useCategoriesStore();
  const { fetchFeatures, getFeaturesByLanguage } = useFeaturesStore();
  const { fetchtradmarks, treadmark: trademarks } = useCategoriesStore();

  // دالة لجلب المنتجات الأكثر مبيعاً
  // في Home.tsx، تحديث دالة fetchBestSellers:
const fetchBestSellers = async () => {
  try {
    setBestSellersLoading(true);
    
    console.log("📞 Calling fetchProducts with best_seller param...");
    
    
    const response = await fetchProducts(
      { 
        per_page: 10, 
        best_seller: true,
        sort_by: 'best_seller',
        sort_order: 'desc'
      }, 
      lang
    );
    
    console.log("📦 Best sellers response in Home.tsx:", response);
    
    
    if (Array.isArray(response)) {
      console.log(`✅ Found ${response.length} best seller products`);
      setBestSellers(response);
    } else {
      console.log("⚠️ Response is not an array:", response);
      setBestSellers([]);
    }
  } catch (error) {
    console.error("❌ Error fetching best sellers:", error);
    setBestSellers([]);
  } finally {
    setBestSellersLoading(false);
  }
};

  // Fetch all data in one place
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);
        setBestSellersLoading(true);

        await Promise.all([
          // Special offers products
          fetchProducts({ per_page: 10, has_offer: 1 }, lang),

          // Best sellers products
          fetchBestSellers(),

          // Hero sliders
          fetchSliders(lang),

          // Certificates
          fetchCertificates(),

          // Latest offers
          fetchOffers(),


          // Testimonials
          fetchTestimonials(),


          // Product categories
          fetchCategories(lang),


          // Features (FrameSection)
          fetchFeatures(),


          // Trademarks / Brands (Parttner)
          fetchtradmarks(),
        ]);
      } catch (error) {
        console.error("Error loading home page data:", error);
      } finally {
        setIsLoading(false);
        setBestSellersLoading(false);
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
      {showPopup && <HomePopup onClose={() => setShowPopup(false)} />}
      
      <div className="min-h-screen bg-gray-50 w-full flex flex-col">
        <main className="w-full">
          <HeroSection sliders={sliders} />
          <BannerSection images={data?.main_images || []} />
          <InstallmentSection title={data?.offer_text || ""} />
          {/* ProductCategoriesSection fetches its own data internally */}
          <ProductCategoriesSection categories={mappedCategories} />
          {/* These components fetch their own data internally, so we don't pass props */}
          <LatestOffers />
          <SpecialOffersSection 
            title="SpecialOffersForYou"    
            products={products} 
          />

          <BestSellersSection 
            title="BestSellers"           
            products={bestSellers}
            isLoading={bestSellersLoading}
          />
          
          <TestimonialsSection />
          <FrameSection features={langFeatures} />
          <CertificationBadgesSection certificates={certificates || []} />
          <Parttner />
          <AppDownloadSection 
            title={data?.app_title || ""} 
            description={data?.app_description || ""} 
            image={data?.app_main_image || ""}  
          />
        </main>
      </div>
    </Layout>
  );
};

export default NewHome;