import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/public/HeroSection";
import BannerSection from "@/components/public/BannerSection";
import ProductCategoriesSection from "@/components/home/ProductCategoriesSection";
// import NewTrendingProductsSection from '@/components/custom/NewTrendingProductsSection';
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FrameSection from "@/components/home/FrameSection";
// import Share2Section from '@/components/custom/Share2Section';
import InstallmentSection from "@/components/home/InstallmentSection";
import LatestOffers from "@/components/home/LatestOffers";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";
import AppDownloadSection from "@/components/home/AppDownloadSection";
import CertificationBadgesSection from "@/components/home/CertificationBadgesSection";
import image from "../assets/images/hero.jpg";
import banner from "../assets/images/banner.png";
import orangelabtop from "@/assets/images/orangelabtop.png";
import bluephone from "@/assets/images/bluephone.png";
import watch from "@/assets/images/watch.png";
import airbuds from "@/assets/images/airbuds.png";
import product1 from "@/assets/images/product1.png";
import product2 from "@/assets/images/product2.png";
import type { Product } from "@/types/index";
import { useLangSync } from "@/hooks/useLangSync";
import SpecialOffersSection from "@/components/home/SpecialOffersSection";
const NewHome = () => {
  const { lang } = useLangSync();
  const products: Product[] = [
    {
      id: 1,
      name: "لابتوب ابل ماك بوك برو 2024",
      price: 8999,
      isNew: true,
      variations: [
        { color: "#fff", image: orangelabtop },
        { color: "#000", image: bluephone },
        { color: "#f68b1f", image: airbuds },
      ],
    },
    {
      id: 2,
      name: "ايفون 15 برو",
      discount: "16",
      price: 7499,
      variations: [
        { color: "#ccc", image: bluephone },
        { color: "#000", image: product2 },
        { color: "#f68b1f", image: airbuds },
      ],
    },
    {
      id: 3,
      name: "ايفون 15 برو",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 4,
      name: "ايفون 15 برو",
      discount: "16",
      price: 7499,
      variations: [
        { color: "#ccc", image: bluephone },
        { color: "#000", image: watch },
      ],
    },
  ];
  const products2: Product[] = [
    {
      id: 1,
      name: "لابتوب ابل ماك بوك برو 2024",
      price: 8999,
      discount: "16",
      variations: [
        { color: "#fff", image:  airbuds},
        { color: "#000", image: bluephone },
        { color: "#f68b1f", image:orangelabtop  },
      ],
    },
    {
      id: 2,
      name: "ايفون 15 برو",
      discount: "16",
      price: 7499,
      variations: [
        { color: "#ccc", image:  product2 },
        { color: "#000", image:  bluephone},
        { color: "#f68b1f", image: airbuds },
      ],
    },
    {
      id: 3,
      name: "ايفون 15 برو",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 4,
      name: "ايفون 15 برو",
      discount: "16",
      price: 7499,
      variations: [
        { color: "#ccc", image: bluephone },
        { color: "#000", image: watch },
      ],
    },
    {
      id: 4,
      name: "ايفون 15 برو",
      discount: "16",
      price: 7499,
      variations: [
        { color: "#ccc", image: bluephone },
        { color: "#000", image: watch },
      ],
    },
    {
      id: 4,
      name: "ايفون 15 برو",
      discount: "16",
      price: 7499,
      variations: [
        { color: "#ccc", image: bluephone },
        { color: "#000", image: watch },
      ],
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 w-full flex flex-col">
        <main className="w-full ">
          {/* Hero Section - Implementing Figma design */}
          <HeroSection
            slides={[
              {
                title: "أحدث الهواتف الذكية",
                description:
                  "استمتع بتجربة استثنائية مع أحدث الهواتف بأفضل الأسعار وخدمة ما بعد البيع المميزة",
                bg: `${image}`,
                link: "/Trademarkbestoffer",
              },
              {
                title: "عروض خاصة جدًا",
                description:
                  "خصومات حصرية على جميع الماركات العالمية لفترة محدودة",
                bg: `${image}`,
                link: "/Trademarkbestoffer",
              },
              {
                title: "عروض خاصة جدًا",
                description:
                  "خصومات حصرية على جميع الماركات العالمية لفترة محدودة",
                bg: `${image}`,
                link: "/Trademarkbestoffer",
              },
              {
                title: "عروض خاصة جدًا",
                description:
                  "خصومات حصرية على جميع الماركات العالمية لفترة محدودة",
                bg: `${image}`,
                link: "/Trademarkbestoffer",
              },
              {
                title: "عروض خاصة جدًا",
                description:
                  "خصومات حصرية على جميع الماركات العالمية لفترة محدودة",
                bg: `${image}`,
                link: "/Trademarkbestoffer",
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
          {/* <Bestseller
            title={"الأكثر مبيعاً"}
            btn={true}
            link={`/${lang}/Trademarksbestseller`}
            products={products}
          /> */}
        
          <SpecialOffersSection title={"الأكثر مبيعاً"} products={products2}/>
          <SpecialOffersSection title={"عروض خاصه لك"} products={products2}/>
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
