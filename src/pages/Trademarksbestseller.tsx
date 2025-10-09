import Bestseller from "@/components/home/Bestseller";
import Layout from "@/components/layout/Layout";
import Offerherosection from "@/components/public/Offerherosection";
import Sliderbycategory from "@/components/public/Sliderbycategory";
import BannerSection from "@/components/public/BannerSection";
import Parttner from "@/components/public/Parttner";
import sceondbanner from "../assets/images/sceondbanner.png";
import orangelabtop from "@/assets/images/orangelabtop.png";
import bluephone from "@/assets/images/bluephone.png";
import watch from "@/assets/images/watch.png";
import airbuds from "@/assets/images/airbuds.png";
import product1 from "@/assets/images/product1.png";
import product2 from "@/assets/images/product2.png";
import type {Product} from '@/types/index'
export default function Trademarks() {
  
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
          <Bestseller title={"الأكثر مبيعاً"} products={products} />
          <BannerSection image={sceondbanner} />
          <div className="my-12">
            <Parttner />
          </div>
        </div>
      </Layout>
    </div>
  );
}
