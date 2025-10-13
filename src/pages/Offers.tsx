import Layout from "@/components/layout/Layout";
import NewHeroSection from "@/components/public/HeroSection";
import image from "../assets/images/hero.jpg";
import BannerSection from "@/components/public/BannerSection";
import banner from "../assets/images/banner.png";
import sceondbanner from "../assets/images/sceondbanner.png";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";
import orangelabtop from "@/assets/images/orangelabtop.png";
import bluephone from "@/assets/images/bluephone.png";
import watch from "@/assets/images/watch.png";
import airbuds from "@/assets/images/airbuds.png";
import product1 from "@/assets/images/product1.png";
import product2 from "@/assets/images/product2.png";
export default function Offers() {
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
          <Bestseller title={"عروض مدينة الهواتف"} products={products} />
          <BannerSection image={sceondbanner} />
          <div className="mb-15">
            <Parttner />
          </div>
        </div>
      </div>
    </Layout>
  );
}
