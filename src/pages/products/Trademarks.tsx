import Bestseller from "@/components/home/Bestseller";
import Layout from "@/components/layout/Layout";
import Offerherosection from "@/components/public/Offerherosection";
import Sliderbycategory from "@/components/public/Sliderbycategory";
import BannerSection from "@/components/public/BannerSection";
import Parttner from "@/components/public/Parttner";
import sceondbanner from "@/assets/images/sceondbanner.png";
import Offerbannersingle from "@/components/public/Offerbannersingle";
import {useLangSync} from '@/hooks/useLangSync'
// import type {Product} from '@/types/index'
import {useCategoriesStore} from '@/store/categories/useCategoriesStore';
import { useEffect } from "react";
import { useParams } from "react-router";
import {useProductsStore} from '@/store/productsStore'
export default function Trademarks() {
  const {lang}=useLangSync();
  const{response,fetchProducts}=useProductsStore();
const {fetchCategoriesbyid,Categoriesbyid}=useCategoriesStore();
const {id}= useParams();
useEffect(() => {
  if (!id) return;
  fetchCategoriesbyid(id,"products");
  fetchProducts({category_id:Number(id)},lang);
},[id,lang]);
console.log("caregory response",response)
console.log("id",Categoriesbyid)
  return (
    <div>
      <Layout>
        <div className=" lg:px-[45px]  pt-20 md:pt-0 flex-grow">
          <Offerherosection
            title={"افضل اجهزه ابل "}
            description={
              "استمتع بتجربة استثنائية مع أحدث الاجهزه بأفضل الأسعار وخدمة ما بعد البيع المميزة"
            }
          />
          <div className="mx-[-4px] md:-mx-[45px]">

          <Sliderbycategory />
          </div>
          <Bestseller title={"افضل العروض"} link={`/${lang}/trademarkbestoffer`} products={Categoriesbyid} btn={true} />
          <BannerSection image={sceondbanner} />
          <Bestseller title={"الأكثر مبيعاً"} link={`/${lang}/trademarksbestseller`} btn={true} products={Categoriesbyid} />
          <Offerbannersingle />
          <div className="my-12">
            <Parttner />
          </div>
        </div>
      </Layout>
    </div>
  );
}
