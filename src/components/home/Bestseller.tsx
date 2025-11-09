import ProductCard from "../public/ProductCard";
import pattern from "../../assets/images/Layer_1.png";
import { Link } from "react-router-dom";
import type { Product } from "@/types/index";

interface BestsellerProps {
  title: string;
  link?: string;
  btn?: boolean;
  style?: string;
  id?: number;
  products: Product[];
  favourite?: boolean;
}

export default function Bestseller({
  title,
  link,
  btn,
  products,
  style,
  
}: BestsellerProps) {
  return (
    <div className="mt-[20px] lg:px-[90px] px-2 pt-20 md:pt-20">
      {/* العنوان */}
      <div className="flex items-center px-[10px] w-full justify-between relative">
        <div className="relative">
          <p className="text-[#211C4D] font-[600] text-[24px] md:text-[40px]">
            {title}
          </p>
          <img
            className="absolute top-0 md:top-[10px] w-[80px] md:w-[100px] object-contain right-[-50px]"
            src={pattern}
            alt=""
          />
        </div>

        {btn && (
          <Link
            className="text-[#211C4D] text-[24px] flex items-center gap-[10px] font-[500]"
            to={link || "#"}
          >
            عرض المزيد
            <svg
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.64 16.95C8.27 17.35 7.69 17.34 7.33 16.93L1.03 9.76C0.68 9.35 0.68 8.69 1.05 8.29L7.49 1.25C7.86 0.85 8.45 0.85 8.81 1.26C9.16 1.67 9.16 2.33 8.79 2.73L3.01 9.04L8.66 15.48C9.02 15.89 9.01 16.55 8.64 16.95Z"
                fill="#211C4D"
              />
            </svg>
          </Link>
        )}
      </div>

      {/* المنتجات */}
      <div
        className={`grid xl:grid-cols-4 ${style} sm:grid-cols-3 grid-cols-3 gap-[2px] md:gap-[20px] justify-items-center mt-[60px] `}
      >
        {products.map((item) => (
          <ProductCard
            containerstyle={"!w-[200px]"}
            key={item.id}
            name={item.name}
            discount={item.discount}
            price={item.price}
            isNew={item.isNew}
            favourite={item.favourite}
            variations={item.variations}
            id={item.id}
            imagecard="!h-[100px] !w-[100px]"
            containerstyle="!p-2 pb-3 !rounded-[10px] !min-h-fit"
          />
        ))}
      </div>
    </div>
  );
}
