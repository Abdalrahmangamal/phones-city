import { useEffect } from "react";
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
import SpecialOffersSection from "@/components/home/SpecialOffersSection";
import HomePopup from "@/components/home/HomePopup";

// Stores
import { useProductsStore } from "@/store/productsStore";
import { useHeroSectionStore } from "@/store/home/herosectionStore";
import { useCertificateStore } from "@/store/home/certificateStore";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import useFeaturesStore from "@/store/home/featuresStore";
import { useLangSync } from "@/hooks/useLangSync";
import { useHomePageStore } from '@/store/home/homepageStore';
import { usePopupStore } from '@/store/popupStore';

const NewHome = () => {
  const { fetchHomePage, data } = useHomePageStore();
  const { lang } = useLangSync();
  const { isShowing, showPopup, hidePopup } = usePopupStore();

  useEffect(() => {
    fetchHomePage(lang);
  }, [lang]);

  // Product stores - use separate loading states
  const {
    fetchOffers,
    fetchBestSellers,
    fetchNewArrivals,
    offersProducts,
    bestSellerProducts,
    newArrivalsProducts,
    offersLoading,
    bestSellersLoading,
    newArrivalsLoading,
  } = useProductsStore();

  const { fetchSliders, sliders } = useHeroSectionStore();
  const { fetchCertificates, certificates } = useCertificateStore();
  const { fetchCategories } = useCategoriesStore();
  const { fetchFeatures, getFeaturesByLanguage } = useFeaturesStore();

  // Effect to show popup after a delay only if it hasn't been shown yet AND there are sliders
  useEffect(() => {
    usePopupStore.getState().resetPopup();

    const popupTimer = setTimeout(() => {
      if (!usePopupStore.getState().hasShown && sliders && sliders.length > 0) {
        showPopup();
      }
    }, 10000);

    return () => {
      clearTimeout(popupTimer);
    };
  }, [sliders]);

  // Fetch all data in parallel — NO blocking loader
  useEffect(() => {
    // Fire all requests in parallel, each section loads independently
    fetchOffers(lang);
    fetchBestSellers(lang);
    fetchNewArrivals(lang);
    fetchSliders(lang);
    fetchCertificates();
    fetchCategories(lang);
    fetchFeatures();
  }, [lang]);

  // Features translated by current language
  const langFeatures = getFeaturesByLanguage(lang === "ar" ? "ar" : "en") || [];

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
          <div className="mb-8 md:mb-12 lg:mb-16"></div>
          <LatestOffers />
          <SpecialOffersSection
            title="SpecialOffersForYou"
            products={offersProducts || []}
            link="offers"
            isLoading={offersLoading}
          />
          <SpecialOffersSection
            title="BestSellers"
            products={bestSellerProducts || []}
            link="BestSellerPage"
            isLoading={bestSellersLoading}
          />
          <SpecialOffersSection
            title="NewArrivals"
            products={newArrivalsProducts || []}
            link="new-arrivals"
            isLoading={newArrivalsLoading}
          />

          <TestimonialsSection />
          <FrameSection features={langFeatures} />
          <CertificationBadgesSection certificates={certificates || []} />
          <Parttner />
          <AppDownloadSection
            key={lang}
            title={data?.app_title || ""}
            description={data?.app_description || ""}
            image={data?.app_main_image || undefined}
          />
        </main>
      </div>
    </Layout>
  );
};

export default NewHome;