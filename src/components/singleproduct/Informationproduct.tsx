import Comments from "@/components/singleproduct/Comments"

export default function Informationproduct({ product }: any) {
  // استخدام بيانات المنتج من الـ API إذا كانت موجودة
  const specifications = product?.details 
    ? [
        { label: "الوصف", value: product.details },
        ...(product.about ? [{ label: "معلومات إضافية", value: product.about }] : []),
      ]
    : [
        { label: "العلامة التجارية :", value: product?.product_mark || "غير محدد" },
        { label: "السعة :", value: product?.capacity || "غير محدد" },
      ];

  const features = product?.details 
    ? [product.details]
    : [
        "اكتشف الميزات والمواصفات الكاملة للمنتج",
      ];

  return (
    <div className="rounded-lg bg-white p-4 md:p-8" dir="rtl">
      {/* Main Title */}
      <h1 className="mb-6 md:mb-8 text-right text-2xl md:text-3xl font-bold text-gray-900">
        تفاصيل المنتج
      </h1>

      {/* Specifications Section */}
      <div className="mb-8 md:mb-12">
        <h2 className="mb-4 md:mb-6 text-right text-lg md:text-xl font-semibold text-gray-900">
          المواصفات العامة
        </h2>

        <div className="space-y-3 md:space-y-4">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_auto] justify-between items-center gap-3 md:gap-4"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="whitespace-nowrap text-right text-sm md:text-base text-[#211C4DCC]">
                  {spec.label}
                </div>
                <div className="h-px flex-1 border-b border-dotted border-gray-300" />
              </div>
              <div className="text-right text-sm md:text-base text-[#211C4D] font-[500]">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="mb-8 md:mb-12">
        <h2 className="mb-4 md:mb-6 text-right text-2xl md:text-[32px] font-semibold text-[#211C4D]">
          عن هذا المنتج
        </h2>

        <ul className="space-y-3 md:space-y-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start px-3 md:px-4 gap-2 md:gap-3 text-right text-sm md:text-base leading-relaxed text-[#211C4DCC]"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-900" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Comments Section */}
      <Comments />
    </div>
  );
}
