import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import Bestseller from "@/components/home/Bestseller";

import product1 from "@/assets/images/product1.png";
import product2 from "@/assets/images/product2.png";
import type { Product } from "@/types/index";

export default function Favourite() {
  const products: Product[] = [
    {
      id: 3,
      name: "لابتوب ابل ماك بوك برو 2024",
      discount: "16",
      price: 7499,
      favourite:true,
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
      favourite:true,
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
      favourite:true,
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
      favourite:true,
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
      favourite:true,
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
      favourite:true,
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
      favourite:true,
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
      favourite:true,
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
      favourite:true,
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
      favourite:true,
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
      favourite:true,
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
      favourite:true,
      variations: [
        { color: "red", image: product1 },
        { color: "#000", image: product2 },
      ],
    },
  ];
  return (
    <div>
      <Layout>
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[1100px]  md:px-0">
            <Bestseller
              title={"المنتجات المفضله"}
              btn={false}
              style="lg:!grid-cols-3 lg:!gap-[80px]"
              products={products}
                  imagecard="!h-[100px] !w-[100px]"
            containerstyle="!p-2 pb-3 !px-0 !rounded-[10px] !min-h-fit"
                         />
          </div>
        </div>
      </Layout>
    </div>
  );
}
