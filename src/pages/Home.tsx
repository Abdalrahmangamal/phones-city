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

// Stores
import { useProductsStore } from "@/store/productsStore";
import { useHeroSectionStore } from "@/store/home/herosectionStore";
import { useDownloadStore } from "@/store/home/downloadStore";
import { useCertificateStore } from "@/store/home/certificateStore";
import { useInstallmentStore } from "@/store/home/installmentStore";
import { useLatestOffersStore } from "@/store/home/latestOffersStore";
import { useTestimonialStore } from "@/store/home/testimonialStore";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import useFeaturesStore from "@/store/home/featuresStore";
import { useLangSync } from "@/hooks/useLangSync";

const NewHome = () => {
  const [showPopup, setShowPopup] = useState(true);

  const { lang } = useLangSync();

  // Mock banner images (يمكنك استبدالها ببيانات ديناميكية إذا أردت)
  const bannerImages = [
    "https://example.com/banner1.jpg",
    "https://example.com/banner2.jpg",
    "https://example.com/banner3.jpg",
  ];

  // All stores
  const {
    fetchProducts,
    response: productsResponse,
    loading: productsLoading,
  } = useProductsStore();

  const { fetchSliders, sliders } = useHeroSectionStore();
  const { fetchDownloadData, data: downloadData } = useDownloadStore();
  const { fetchCertificates, certificates } = useCertificateStore();
  const { fetchInstallmentData, installmentData } = useInstallmentStore();
  const { fetchOffers, offers } = useLatestOffersStore();
  const { fetchTestimonials, testimonials } = useTestimonialStore();
  const { fetchCategories, categories } = useCategoriesStore();
  const { fetchFeatures, getFeaturesByLanguage } = useFeaturesStore();
  const { fetchtradmarks, treadmark: trademarks } = useCategoriesStore();

  // Fetch all data in one place
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);

        await Promise.all([
          // Special offers products
          fetchProducts({ per_page: 10, has_offer: 1 }, lang),

          // Hero sliders
          fetchSliders(lang),

          // App download section
          fetchDownloadData(),

          // Certificates
          fetchCertificates(),

          // Installment section
          fetchInstallmentData(),

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
      }
    };

    loadAllData();
  }, [lang]); // Re-fetch only when language changes

  // Helper to safely get products array
  const getProductsArray = () => {
    if (!productsResponse) return [];
    if (Array.isArray(productsResponse)) return productsResponse.slice(0, 10);
    return [productsResponse];
  };

  const products = getProductsArray();

  // Features translated by current language
  const langFeatures =
    getFeaturesByLanguage(lang === "ar" ? "ar" : "en") || [];

  // Global loading state
  if (isLoading || productsLoading) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 w-full flex flex-col">
        <main className="w-full">
          <HeroSection sliders={sliders} />
          <BannerSection images={bannerImages} />
          <InstallmentSection installmentData={installmentData} />
          <ProductCategoriesSection categories={categories} />
          <LatestOffers offers={offers} />
          <SpecialOffersSection title="عروض خاصة لك" products={products} />
          <TestimonialsSection testimonials={testimonials} />
          <FrameSection features={langFeatures} />
          <CertificationBadgesSection certificates={certificates} />
          <Parttner trademarks={trademarks} />
          <AppDownloadSection downloadData={downloadData} />
        </main>
      </div>
    </Layout>
  );
};

export default NewHome;