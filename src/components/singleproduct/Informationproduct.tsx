import Comments from "@/components/singleproduct/Comments";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";

// مكون مساعد لعرض قائمة التفاصيل
const DetailsList = ({ details }: { details: any[] }) => {
  if (!details || !Array.isArray(details)) return null;

  
  return (
    <div className="space-y-3 md:space-y-4">
      {details.map((item, index) => {
        
        // إذا كان العنصر كائنًا يحتوي على key و value
        if (item && typeof item === 'object' && item.key && item.value) {
          return (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] justify-between items-center gap-3 md:gap-4"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="whitespace-nowrap text-right text-sm md:text-base text-[#211C4DCC]">
                  {item.key}:
                </div>
                <div className="h-px flex-1 border-b border-dotted border-gray-300" />
              </div>
              <div className="text-right text-sm md:text-base text-[#211C4D] font-[500]">
                {item.value}
              </div>
            </div>
          );
        }
        
        // إذا كان العنصر نصًا عاديًا
        return (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto] justify-between items-center gap-3 md:gap-4"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="whitespace-nowrap text-right text-sm md:text-base text-[#211C4DCC]">
                خاصية {index + 1}:
              </div>
              <div className="h-px flex-1 border-b border-dotted border-gray-300" />
            </div>
            <div className="text-right text-sm md:text-base text-[#211C4D] font-[500]">
              {String(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// مكون لعرض محتوى HTML
const HTMLContent = ({ content }: { content: string }) => {
  if (!content) return null;

  return (
    <div 
      className="text-[#211C4DCC] text-lg font-[400] leading-relaxed"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default function Informationproduct({ product }: any) {
  const { lang } = useLangSync();
  const { t } = useTranslation();


  // معالجة التفاصيل إذا كانت موجودة
  const hasDetails = product?.details && Array.isArray(product.details) && product.details.length > 0;
  const hasAbout = typeof product?.about === "string" && product.about.trim() !== "";

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
      {hasDetails && (
        <div className="mb-8 md:mb-12">
          <h2 className="mb-4 md:mb-6 text-start text-lg md:text-xl font-semibold text-gray-900">
            {t("Generalspecifications")}
          </h2>
          <DetailsList details={product.details} />
        </div>
      )}

      {/* About Section */}
      {hasAbout && (
        <div className="mb-8 md:mb-12">
          <h2 className="mb-4 md:mb-6 text-start text-2xl md:text-[32px] font-semibold text-[#211C4D]">
            {t("Aboutthisproduct")}
          </h2>
          <HTMLContent content={product.about} />
        </div>
      )}

      {/* Description Section - Only show if there's no about section or if about section is different from description */}
      {!hasAbout && product?.description && (
        <div className="mb-8 md:mb-12">
          <h2 className="mb-4 md:mb-6 text-start text-2xl md:text-[32px] font-semibold text-[#211C4D]">
            {t("Description")}
          </h2>
          <div className="text-[#211C4DCC] text-lg font-[400] leading-relaxed">
            {product.description}
          </div>
        </div>
      )}

      {/* Comments Section - مع تمرير productId */}
      <Comments productId={product?.id} />
    </div>
  );
}
