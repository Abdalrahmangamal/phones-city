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
          <div className="md:w-[1000px] px-5 md:px-0">
            <Bestseller
              title={"المنتجات المفضله"}
              btn={false}
              style="md:!grid-cols-3"
              products={products}
                         />
          </div>
        </div>
      </Layout>
    </div>
  );
}
