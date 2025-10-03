"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// import "swiper/css";
import "swiper/css/navigation";

type Product = {
  id: number;
  name: string;
  image: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  rating: number;
  reviews: number;
  colors: string[];
};

const productsData: Product[] = [
  {
    id: 1,
    name: "ساعة ذكية سلسلة 7....",
    image: "/b3a03d436a7a55678e2142a1f7303de56510d5c3.png",
    originalPrice: "899.00 رس",
    discountedPrice: "786.00 رس",
    discount: "-17%",
    rating: 4,
    reviews: 125,
    colors: ["#2C2929", "#438DB8", "#EE7593", "#FFFFFF"],
  },
  {
    id: 2,
    name: "ساعة ذكية سلسلة 8....",
    image: "/b3a03d436a7a55678e2142a1f7303de56510d5c3.png",
    originalPrice: "999.00 رس",
    discountedPrice: "850.00 رس",
    discount: "-15%",
    rating: 5,
    reviews: 89,
    colors: ["#2C2929", "#438DB8", "#EE7593", "#FFFFFF"],
  },
  {
    id: 3,
    name: "ساعة ذكية سلسلة 9....",
    image: "/b3a03d436a7a55678e2142a1f7303de56510d5c3.png",
    originalPrice: "1199.00 رس",
    discountedPrice: "999.00 رس",
    discount: "-17%",
    rating: 4,
    reviews: 210,
    colors: ["#2C2929", "#438DB8", "#EE7593", "#FFFFFF"],
  },
  {
    id: 4,
    name: "ساعة ذكية سلسلة 10....",
    image: "/b3a03d436a7a55678e2142a1f7303de56510d5c3.png",
    originalPrice: "1299.00 رس",
    discountedPrice: "1099.00 رس",
    discount: "-15%",
    rating: 5,
    reviews: 156,
    colors: ["#2C2929", "#438DB8", "#EE7593", "#FFFFFF"],
  },
  {
    id: 5,
    name: "ساعة ذكية سلسلة 10....",
    image: "/b3a03d436a7a55678e2142a1f7303de56510d5c3.png",
    originalPrice: "1299.00 رس",
    discountedPrice: "1099.00 رس",
    discount: "-15%",
    rating: 5,
    reviews: 156,
    colors: ["#2C2929", "#438DB8", "#EE7593", "#FFFFFF"],
  },
];

const SpecialOffersSection: React.FC = () => {
  const renderStars = (rating: number) => (
    <div className="flex gap-1 items-center" aria-hidden>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {i < rating ? (
            <path
              d="M10 15.27L16.18 20L14.54 12.94L20 8.24L12.91 7.63L10 1L7.09 7.63L0 8.24L5.46 12.94L3.82 20L10 15.27Z"
              fill="#F3AC5D"
            />
          ) : (
            <path
              d="M10 15.27L16.18 20L14.54 12.94L20 8.24L12.91 7.63L10 1L7.09 7.63L0 8.24L5.46 12.94L3.82 20L10 15.27Z"
              fill="#CAD0D9"
            />
          )}
        </svg>
      ))}
    </div>
  );

  return (
    <div className="w-full flex mt-[80px] flex-col items-start gap-[32px]">
      {/* header */}
      <div className="w-full flex items-center justify-between relative">
        <div className="relative">
          <div className="absolute -top-2 -right-4 z-0">
            <img src="/Layer_1.svg" alt="" className="opacity-100" />
          </div>
          <h2 className="font-roboto font-semibold text-[40px] leading-[36px] text-[#211C4D] relative z-10">
            عروض خاصة لك
          </h2>
        </div>
        <button className="flex items-center gap-[6px] py-[10px] rounded-[4px]">
          <span className="font-roboto font-medium text-[24px] leading-[20px] text-[#211C4D]">
            عرض المزيد
          </span>
          <svg
            width="25.47"
            height="28.44"
            viewBox="0 0 25 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 5L8.5 13L14.5 21"
              stroke="#211C4D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="w-full h-[0px] border-t border-[#E5E7EB]" />

      {/* slider */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={5}
        slidesPerView={4}
        className="w-full h-[500px]"
      >
        {productsData.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="rounded-[16px] bg-white shadow-[0px_4px_4px_0px_#00000040] flex flex-col overflow-hidden">
              <div className="w-full min-h-[240px] p-[24px] relative">
                <div className="absolute top-4 left-4 w-[45px] h-[20px] rounded-[4px] bg-[#F03D3D] flex items-center justify-center py-[2px] px-[8px]">
                  <span
                    className="font-inter font-medium text-[12px] leading-[16px] text-white"
                    dir="ltr"
                  >
                    {product.discount}
                  </span>
                </div>

                <div className="w-full h-[240px] flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-[258px] max-h-[240px] object-contain"
                  />
                </div>
              </div>

              <div className="w-full p-[16px] bg-white flex flex-col gap-[12px]">
                <h3 className="font-roboto font-medium text-[24px] leading-[20px] text-[#211C4D]">
                  {product.name}
                </h3>

                <div className="w-full flex flex-col items-end gap-2">
                  <div className="flex items-center gap-[8px] justify-end">
                    {renderStars(product.rating)}
                    <span
                      className="font-roboto font-normal text-[12px] leading-[18px] text-[#9CA3AF]"
                      dir="ltr"
                    >
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex gap-[4px] justify-end">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-[15px] h-[15px] rounded-full border border-[#00000040]"
                        style={{ backgroundColor: color }}
                        aria-label={`لون المنتج ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-full flex items-center justify-between">
                  <div className="flex flex-col items-end">
                    <span className="font-roboto font-semibold text-[16px] leading-[28px] text-[#211C4D]">
                      {product.discountedPrice}
                    </span>
                    <div className="relative">
                      <span className="font-roboto font-medium text-[16px] leading-[28px] text-[#211C4D] line-through">
                        {product.originalPrice}
                      </span>
                      <div className="absolute top-[50%] left-0 w-full h-[2px] bg-[#F03D3D] transform -translate-y-1/2" />
                    </div>
                  </div>

                  <button className="w-[40px] h-[40px] rounded-[8px] bg-[#EEF1F6] flex items-center justify-center p-[12px]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 6H21L20 12H9L6 6Z"
                        stroke="#000000"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z"
                        stroke="#000000"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18Z"
                        stroke="#000000"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SpecialOffersSection;
