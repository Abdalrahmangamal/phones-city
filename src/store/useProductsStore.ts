import { useState } from "react";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import type { Product } from "@/types/index";
import { useLangSync } from "@/hooks/useLangSync";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
  favourite?: boolean;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { lang } = useLangSync();

  // هل في ألوان؟
  const hasOptions =
    Array.isArray(product?.options) && product.options.length > 0;

  // اللون المختار (لو موجود)
  const selectedVariant = hasOptions
    ? product.options[selectedIndex]
    : null;

  // الصورة
  const currentImage = hasOptions
    ? selectedVariant?.images?.[0]?.url || product.main_image
    : product.main_image;

  // السعر الأساسي و النهائي
  const original = hasOptions
    ? Number(selectedVariant?.original_price?.replace(/,/g, "")) || 0
    : Number(product?.original_price?.replace(/,/g, "")) || 0;

  const final = hasOptions
    ? Number(selectedVariant?.final_price?.replace(/,/g, "")) || 0
    : Number(product?.final_price?.replace(/,/g, "")) || 0;

  // نسبة الخصم
  const discountPercent =
    original > 0 ? ((original - final) / original) * 100 : 0;

  return (
    <div
      key={product.id}
      className="max-w-[350px] md:!w-[320px] scale-[0.9] md:scale-[1] col-span-1 bg-white w-full min-h-[350px] md:min-h-[400px] rounded-[16px] p-[15px] shadow-[0px_4px_4px_0px_#00000040] flex flex-col"
    >
      {/* الصورة */}
      <div className="flex items-center justify-center pt-7 md:pt-0 relative">
        <Link to={`/${lang}/singleproduct`}>
          <img
            src={currentImage}
            className="md:!w-[220px] h-[160px] w-[160px] object-contain md:!h-[220px]"
            alt={product?.name}
          />
        </Link>

        {/* الديسكاونت */}
        {discountPercent > 0 && (
          <div className="flex w-full items-center justify-end absolute right-0 top-0 p-1">
            <div className="w-fit px-2 h-[22px] flex items-center justify-center rounded-[4px] bg-[#F03D3D]">
              <p className="text-white text-[13px]">
                {discountPercent.toFixed(0)}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* الاسم */}
      <Link to={`/${lang}/singleproduct`}>
        <h2 className="text-[15px] md:text-[24px] font-[500] text-[#211C4D] line-clamp-1 mt-[10px]">
          {product?.name}
        </h2>
      </Link>

      {/* الألوان لو موجودة */}
      {hasOptions && (
        <div className="flex items-center gap-[7px] mt-[10px] justify-start">
          {product.options.map((variant, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-[18px] h-[18px] rounded-full border-2 transition ${
                index === selectedIndex
                  ? "border-[#211C4D] scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: variant?.value }}
              title={`Select color ${variant?.value}`}
            ></button>
          ))}
        </div>
      )}

      {/* التقييم */}
      <div className="flex mt-[10px] items-center justify-start gap-0">
        <Rating defaultValue={3} className="pointer-events-none">
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton
              key={index}
              className="text-yellow-500 [&>svg]:w-3 [&>svg]:h-3 md:[&>svg]:h-5 md:[&>svg]:w-5"
            />
          ))}
        </Rating>

        <p className="text-[#9CA3AF] text-[10px] md:!w-[15px]">(125)</p>
      </div>

      {/* السعر */}
      <div className="flex items-center justify-between mt-[10px] w-full">
        <div className="relative flex gap-3">
          <p className="text-[#211C4D] md:text-[18px] text-[11px] font-[500]">
            {final?.toLocaleString()} ر.س
          </p>

          {original > final && (
            <div className="relative">
              <p className="text-[#211C4D] md:text-[18px] text-[11px] font-[500] opacity-50 line-through">
                {original?.toLocaleString()} ر.س
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
