import Layout from "@/components/layout/Layout";
import NewHeroSection from "@/components/public/HeroSection";
import image from "@/assets/images/hero.jpg";
import BannerSection from "@/components/public/BannerSection";
import banner from "@/assets/images/banner.png";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";
import {useProductsStore} from '@/store/productsStore.ts';
import { useEffect } from "react";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import Loader from '@/components/Loader'
export default function Offers() {
const { fetchProducts ,response} = useProductsStore();
  const { lang } = useLangSync();
  const { t } = useTranslation();

useEffect(() => {
    fetchProducts({simple:false,has_offer:1,},lang);
  }, [lang]);
  console.log("ressss",response)

  return (
    <Layout>
      {
        !response ? <Loader /> : null
      }
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
          <Bestseller title={`${t("CityofPhonesOffers")}`} products={response || []} />
          <div className="mb-15">
            <Parttner />
          </div>
        </div>
      </div>
    </Layout>
  );
}
