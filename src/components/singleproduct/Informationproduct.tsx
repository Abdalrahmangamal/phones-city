import Comments from "@/components/singleproduct/Comments";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";

export default function Informationproduct({ product }: any) {
  const { lang } = useLangSync();
  const { t } = useTranslation();

  // استخدام بيانات المنتج من الـ API إذا كانت موجودة
  const specifications = product?.details
    ? [
        { label: t("Description"), value: product.details },
        ...(product.about
          ? [{ label: t("Additionalinformation"), value: product.about }]
          : []),
      ]
    : [
        {
          label: "العلامة التجارية :",
          value: product?.product_mark || "غير محدد",
        },
        { label: "السعة :", value: product?.capacity || "غير محدد" },
      ];

  const features = product?.details
    ? [product.details]
    : ["اكتشف الميزات والمواصفات الكاملة للمنتج"];

  return (
    <div
      className="rounded-lg bg-white p-4 md:p-8"
      dir={lang == "ar" ? "rtl" : "ltr"}
    >
      {/* Main Title */}
      <h1 className="mb-6 md:mb-8 text-start text-2xl md:text-3xl font-bold text-gray-900">
        {t("Productdetails")}
      </h1>

      {/* Specifications Section */}
      <div className="mb-8 md:mb-12">
        <h2 className="mb-4 md:mb-6 text-start text-lg md:text-xl font-semibold text-gray-900">
          {t("Generalspecifications")}
        </h2>

        <div className="space-y-3 md:space-y-4">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_auto] justify-between items-center gap-3 md:gap-4"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="whitespace-nowrap text-right text-sm md:text-base text-[#211C4DCC]">
                  <div
                    className="spec-item-content !text-left"
                    dangerouslySetInnerHTML={{ __html: spec.label }}
                  />
                </div>
                <div className="h-px flex-1 border-b border-dotted border-gray-300" />
              </div>
              <div className="text-right text-sm md:text-base text-[#211C4D] font-[500]">
                <div
                  className="spec-item-content"
                  dangerouslySetInnerHTML={{ __html: spec.value }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="mb-8 md:mb-12">
        <h2 className="mb-4 md:mb-6 text-start text-2xl md:text-[32px] font-semibold text-[#211C4D]">
          {t("Aboutthisproduct")}
        </h2>

        <div className="space-y-3 md:space-y-4">
          {features.map((feature, index) => (
            <div className="features-content" key={index}>
              <div className="text-[#211C4DCC] text-[24px] font-[400]" dangerouslySetInnerHTML={{ __html: feature }} />
            </div>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <Comments />
    </div>
  );
}
