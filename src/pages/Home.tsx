import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
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
import image from "../assets/images/hero.jpg";
import banner from "../assets/images/banner.png";
import HomePopup from "@/components/home/HomePopup";
import { useState } from "react";

const NewHome = () => {
<<<<<<< HEAD
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
=======
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل البيانات أو الانتظار
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
>>>>>>> 9ac42f042247453880fca736bc689adc981318f4

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 w-full flex flex-col">
        {/* Popup Modal */}
        {showPopup && <HomePopup onClose={handleClosePopup} />}
        
        <main className="w-full ">
          {/* Hero Section  */}
          <HeroSection
            // slides={[
            //   {
            //     title: "أحدث الهواتف الذكية",
            //     description:
            //       "استمتع بتجربة استثنائية مع أحدث الهواتف بأفضل الأسعار وخدمة ما بعد البيع المميزة",
            //     bg: `${image}`,
            //     link: "/Trademarkbestoffer",
            //   },
            //   {
            //     title: "عروض خاصة جدًا",
            //     description:
            //       "خصومات حصرية على جميع الماركات العالمية لفترة محدودة",
            //     bg: `${image}`,
            //     link: "/Trademarkbestoffer",
            //   },
            //   {
            //     title: "عروض خاصة جدًا",
            //     description:
            //       "خصومات حصرية على جميع الماركات العالمية لفترة محدودة",
            //     bg: `${image}`,
            //     link: "/Trademarkbestoffer",
            //   },
            //   {
            //     title: "عروض خاصة جدًا",
            //     description:
            //       "خصومات حصرية على جميع الماركات العالمية لفترة محدودة",
            //     bg: `${image}`,
            //     link: "/Trademarkbestoffer",
            //   },
            //   {
            //     title: "عروض خاصة جدًا",
            //     description:
            //       "خصومات حصرية على جميع الماركات العالمية لفترة محدودة",
            //     bg: `${image}`,
            //     link: "/Trademarkbestoffer",
            //   },
            // ]}
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