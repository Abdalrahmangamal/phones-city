// Offers.tsx
import Layout from "@/components/layout/layout";
import NewHeroSection from "@/components/public/HeroSection";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner"; // الكومبوننت المعدل
import { useProductsStore } from "@/store/productsStore.ts";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore.ts";
import { useEffect, useState } from "react";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";
import { useHeroSectionStore } from "@/store/home/herosectionStore";
export default function Offers() {
  const { fetchProducts, response } = useProductsStore();
  const { fetchCategories, categories } = useCategoriesStore();
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { sliders, fetchSliders } = useHeroSectionStore();

  // useEffect(() => {
  //   fetchProducts({ simple: false, has_offer: 1 }, lang);
  //   fetchCategories(lang);
  // }, [lang]);

  useEffect(() => {
    fetchProducts({ simple: false, has_offer: 1 }, lang);
    fetchCategories(lang);
    fetchSliders(lang); // أضف هذا السطر
  }, [lang]);

  return (
    <Layout>
      <div>
        <NewHeroSection sliders={sliders} />
        {/* <BannerSection image={banner} /> */}

        <Bestseller
          title={`${t("CityofPhonesOffers")}`}
          btn={true}
          link={`/${lang}/SpecialOffersPage`}
          products={response}
        />

        {/* الكومبوننت سيتولى جلب البيانات بنفسه */}
        <div className="mb-15">
          <Parttner />
        </div>
      </div>
      {!response?(<Loader/>):("")}
    </Layout>
  );
}
