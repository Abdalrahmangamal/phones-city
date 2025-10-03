import Layout from "@/components/layout/layout";
import HeroSection from "@/components/public/HeroSection";
import BannerSection from "@/components/public/BannerSection";
import ProductCategoriesSection from "@/components/home/ProductCategoriesSection";
// import NewTrendingProductsSection from '@/components/custom/NewTrendingProductsSection';
import SpecialOffersSection from "@/components/home/SpecialOffersSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FrameSection from "@/components/home/FrameSection";
// import Share2Section from '@/components/custom/Share2Section';
import InstallmentSection from "@/components/home/InstallmentSection";
import LatestOffers from "@/components/home/LatestOffers";
import Footer from "@/components/layout/Footer"; // Added Footer import
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";
import AppDownloadSection from "@/components/home/AppDownloadSection";
import CertificationBadgesSection from "@/components/home/CertificationBadgesSection";
import image from "../assets/images/hero.png";
import banner from "../assets/images/banner.png";
const NewHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col">
      <Layout />
      <main className="w-full md:px-[45px] px-[10px] pt-20 md:pt-0 flex-grow">
        {/* Hero Section - Implementing Figma design */}
        <HeroSection
          slides={[
            {
              title: "أحدث الهواتف الذكية",
              description:
                "استمتع بتجربة استثنائية مع أحدث الهواتف بأفضل الأسعار وخدمة ما بعد البيع المميزة",
              bg: `${image}`,
              link: "/shop",
            },
            {
              title: "عروض خاصة جدًا",
              description:
                "خصومات حصرية على جميع الماركات العالمية لفترة محدودة",
              bg: `${image}`,
              link: "/offers",
            },
          ]}
        />
        <BannerSection image={`${banner}`} />
        <InstallmentSection
          title={
            "موظف ونسبة التزاماتك أقل من45%قسط مشترياتك بدون دفعة أولى الى36شهر مع"
          }
          coaralink={""}
          moralink={""}
        />
        <ProductCategoriesSection />
        <LatestOffers />
        <Bestseller />
        <SpecialOffersSection />
        <TestimonialsSection />
        <section className="px-0 -mx-[10px] md:-mx-[45px]">
          <FrameSection />
        </section>
        <CertificationBadgesSection />
        <Parttner />
        <AppDownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default NewHome;
