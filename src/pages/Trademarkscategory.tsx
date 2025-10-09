import Bestseller from "@/components/home/Bestseller";
import Layout from "@/components/layout/Layout";
import Offerherosection from "@/components/public/Offerherosection";
import Sliderbycategory from "@/components/public/Sliderbycategory";
import BannerSection from "@/components/public/BannerSection";
import Parttner from "@/components/public/Parttner";
import sceondbanner from "../assets/images/sceondbanner.png";

import product1 from "@/assets/images/product1.png";
import product2 from "@/assets/images/product2.png";
import Offerbannersingle from "@/components/public/Offerbannersingle";
import {useLangSync} from '@/hooks/useLangSync'
import type {Product} from '@/types/index'
export default function Trademarks() {
  const products: Product[] = [

  
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },


  ];
const {lang}=useLangSync();
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
          <Bestseller title={"افضل العروض"} products={products}  />
          <BannerSection image={sceondbanner} />
          <Bestseller title={"الأكثر مبيعاً"} link={`/${lang}/trademarksbestseller`} btn={true} products={products} />
          <Offerbannersingle />
          <div className="my-12">
            <Parttner />
          </div>
        </div>
      </Layout>
    </div>
  );
}
