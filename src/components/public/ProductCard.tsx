import { useState } from "react";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import addtocart from "@/assets/images/addtocart.png";
import type {Product} from '@/types/index'
// interface ProductCardProps {
//   name: string;
//   discount?: string;
//   price: number;
//   isNew?: boolean;
//   favourite?:boolean;
//   variations?: { color: string; image: string }[];
// }

export default function ProductCard({
  name,
  discount,
  price,
  favourite = false ,
  isNew = false,
  variations = [],
}: Product) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = variations[selectedIndex]?.image;

  return (
    <div className="max-w-[350px] col-span-1 bg-white min-w-[300px] h-[400px] rounded-[16px] p-[15px] shadow-[0px_4px_4px_0px_#00000040]">
      {/* الصورة */}
      <div className="flex items-center justify-center relative">
        <img
          src={currentImage}
          className="w-[220px] object-contain h-[220px]"
          alt={name}
        />

        <div className="flex w-full items-center justify-between absolute right-0 top-0">
          <div className="bg-[#EEF1F6] flex items-center justify-center w-[36px] h-[36px] rounded-full">
            {favourite === true ? (  <svg
              width="21"
              height="18"
              viewBox="0 0 21 18"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.9 1.96094C4.11914 1.96094 1.75 4.04024 1.75 6.74073C1.75 8.60369 2.62235 10.1721 3.77849 11.4714C4.93066 12.7661 6.41714 13.853 7.76097 14.7626L10.0796 16.332C10.3335 16.5039 10.6665 16.5039 10.9204 16.332L13.239 14.7626C14.5829 13.853 16.0693 12.7661 17.2215 11.4714C18.3777 10.1721 19.25 8.60369 19.25 6.74073C19.25 4.04024 16.8809 1.96094 14.1 1.96094C12.6665 1.96094 11.4052 2.63308 10.5 3.50277C9.59484 2.63308 8.33347 1.96094 6.9 1.96094Z"
                stroke=""
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>):(
                <svg
              width="21"
              height="18"
              viewBox="0 0 21 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.9 1.96094C4.11914 1.96094 1.75 4.04024 1.75 6.74073C1.75 8.60369 2.62235 10.1721 3.77849 11.4714C4.93066 12.7661 6.41714 13.853 7.76097 14.7626L10.0796 16.332C10.3335 16.5039 10.6665 16.5039 10.9204 16.332L13.239 14.7626C14.5829 13.853 16.0693 12.7661 17.2215 11.4714C18.3777 10.1721 19.25 8.60369 19.25 6.74073C19.25 4.04024 16.8809 1.96094 14.1 1.96094C12.6665 1.96094 11.4052 2.63308 10.5 3.50277C9.59484 2.63308 8.33347 1.96094 6.9 1.96094Z"
                stroke="#211C4D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            )
          

            }
          </div>

          {isNew && (
            <div className="w-[41px] h-[20px] flex items-center justify-center rounded-[4px] bg-[#259ACB]">
              <p className="text-white text-[13px]">جديد</p>
            </div>
          )}
          {discount && (
            <div className="w-[45px] h-[20px] flex items-center justify-center rounded-[4px] bg-[#F03D3D]">
              <p className="text-white text-[13px]">{discount}%-</p>
            </div>
          )}
        </div>
      </div>

      {/* الاسم */}
      <h2 className="text-[24px] font-[500] text-[#211C4D] mt-[10px] line-clamp-2">
        {name}
      </h2>

      {/* الألوان */}
      {variations.length > 0 && (
        <div className="flex items-center gap-[7px] mt-[10px] justify-start">
          {variations.map((variant, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-[18px] h-[18px] rounded-full border-2 transition ${
                index === selectedIndex
                  ? "border-[#211C4D] scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: variant.color }}
            ></button>
          ))}
        </div>
      )}

      {/* التقييم */}
      <div className="flex mt-[10px] items-center justify-start gap-1">
        <Rating defaultValue={3}>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton className="text-yellow-500" key={index} />
          ))}
        </Rating>
        <p className="text-[#9CA3AF] text-[14px]">(125)</p>
      </div>

      {/* السعر + زر السلة */}
      <div className="flex items-center justify-between mt-[10px] w-full">
          <div className="relative flex gap-3">
        <p className="text-[#211C4D] text-[18px] font-[500]">{price} ر.س</p>
          <p className="text-[#211C4D] text-[18px] font-[500]">{price} ر.س</p>
  <svg width="87"className="absolute top-3 left-0 z-1" height="5" viewBox="0 0 87 5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 1.51396C6.40086 2.41917 2.25702 2.59053 0.748739 3.9048C-0.759546 5.21908 4.82858 2.71501 11.1019 3.83643C1.50418 7.64729 19.8998 0.595701 11.1019 3.83643C13.52 3.65675 37.5718 3.55427 43.4152 1.91822C46.3024 1.89069 47.0564 1.38262 49.7085 1.51396C52.3607 1.6453 54.6749 1.8494 56.4452 2.10758C58.2155 2.36576 61.0433 1.78554 61.5 2.10758C64.6992 1.20738 82.7675 2.99182 86.5 0.89135C81.2405 0.499791 75.344 0.22942 69.1506 0.0958978C62.9572 -0.0376246 56.5908 -0.0316571 50.418 0.113434C44.2452 0.258525 38.39 0.539867 33.189 0.941212C27.988 1.34256 21.9276 0.918209 18.5 1.51396C12.6347 1.00384 15 2.08409 15 1.51396Z" fill="#F03D3D"/>
  </svg>

          </div>
        <div className="w-[40px] h-[40px] bg-[#EEF1F6] flex items-center justify-center rounded-[8px] cursor-pointer hover:bg-[#dfe3ea] transition">
          <img src={addtocart} alt="" />
        </div>
      </div>
    </div>
  );
}
 