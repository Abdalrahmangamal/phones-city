import Layout from "@/components/layout/Layout";
import NewHeroSection from "@/components/public/HeroSection";
import image from "@/assets/images/hero.jpg";
import BannerSection from "@/components/public/BannerSection";
import banner from "@/assets/images/banner.png";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";
import {useProductsStore} from '@/store/productsStore.ts';
import { useEffect } from "react";
export default function Offers() {
const { fetchProducts ,response} = useProductsStore();
useEffect(() => {
    fetchProducts();
  }, [response]);
  console.log(response)

  return (
    <Layout>
      <div>
        <div>
          <NewHeroSection
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
          <BannerSection image={banner} />
          <Bestseller title={"عروض مدينة الهواتف"} products={response || []} />
          <div className="mb-15">
            <Parttner />
          </div>
        </div>
      </div>
    </Layout>
  );
}
