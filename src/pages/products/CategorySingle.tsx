import Layout from "@/components/layout/Layout";
import BannerSection from "@/components/public/BannerSection";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore.ts";
import { useEffect } from "react";
import { useParams } from "react-router";
import Loader from "@/components/Loader";
import { useHeroSectionStore } from "@/store/home/herosectionStore";
import { useLangSync } from "@/hooks/useLangSync";
import HeroSection from "@/components/public/HeroSection";
import { useHomePageStore } from "@/store/home/homepageStore";

export default function Offers() {
  const { id, productmain } = useParams();
  const { fetchSliders, sliders } = useHeroSectionStore();
  const { lang } = useLangSync();
  const { data } = useHomePageStore();

  useEffect(() => {
    fetchSliders(lang);
  }, []);
  const { Categoriesbyid, fetchCategoriesbyid } = useCategoriesStore();
  useEffect(() => {
    if (id) {
      fetchCategoriesbyid(id, productmain);
    }
  }, [id]);

  console.log("asdasd", Categoriesbyid);

  return (
    <Layout>
      {!Categoriesbyid ? <Loader /> : null}
      <div>
        <div>
          <HeroSection sliders={sliders} />

          <BannerSection images={data?.main_images} />
          {/* <Bestseller title={"عروض مدينة الهواتف"}  /> */}
          {Categoriesbyid && <Bestseller title="" products={Categoriesbyid} />}
          <div className="mb-15">
            <Parttner />
          </div>
        </div>
      </div>
    </Layout>
  );
}
