import { Plus, Minus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { TabbyModal } from "@/components/singleproduct/Modelpayment";
import { TamaraModal } from "@/components/singleproduct/TamaraModal";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cartStore/cartStore";
import { toast } from "react-toastify";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";

export default function Ptoductdetails({
  product,
  handleindexchange,
  selectedOptionIndex: propSelectedOptionIndex,
}: any) {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isTabbyModalOpen, setIsTabbyModalOpen] = useState(false);
  const [isTamaraModalOpen, setIsTamaraModalOpen] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(
    propSelectedOptionIndex || 0
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    handleindexchange(selectedOptionIndex);
  }, [selectedOptionIndex, handleindexchange]);

  // تحديث الـ index عند تغيير الـ prop
  useEffect(() => {
    if (propSelectedOptionIndex !== undefined) {
      setSelectedOptionIndex(propSelectedOptionIndex);
    }
  }, [propSelectedOptionIndex]);

  if (!product) return <div>تحميل...</div>;

  // تحديد نوع الخيارات المتاحة
  const hasOptions = product?.options && Array.isArray(product.options) && product.options.length > 0;
  const hasMultipleOptions = hasOptions && product.options.length > 1;
  
  // التحقق من نوع الخيارات بناءً على قيمة الخيار الأول
  const firstOption = hasOptions ? product.options[0] : null;
  const isColorOption = firstOption?.value && (
    firstOption.value.startsWith('#') || 
    ['أحمر', 'أزرق', 'أخضر', 'أسود', 'أبيض', 'رمادي'].some(color => 
      firstOption.name?.includes(color) || firstOption.value?.includes(color)
    )
  );
  const isCapacityOption = firstOption?.value && (
    firstOption.value.includes('GB') || 
    firstOption.value.includes('TB') ||
    firstOption.value.includes('جيجا') ||
    firstOption.value.includes('تيرا') ||
    ['64GB', '128GB', '256GB', '512GB', '1TB'].some(capacity => 
      firstOption.name?.includes(capacity) || firstOption.value?.includes(capacity)
    )
  );

  // تحديد نص التسمية بناءً على نوع الخيار
  const getOptionLabel = () => {
    if (isColorOption) return t("Chooseyourcolor") || "اختر لونك";
    if (isCapacityOption) return t("Chooseyourcapacity") || "اختر سعتك";
    return t("Chooseyouroption") || "اختر خيارك";
  };

  const openModal = (modalType: string) => {
    if (modalType === "tamara") {
      setIsTamaraModalOpen(true);
    } else {
      setIsTabbyModalOpen(true);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      const selectedVariant = product.options[selectedOptionIndex];
      const hasMultiple = product.options && product.options.length > 1;
      const idToSend = hasMultiple ? selectedVariant.id : product.id;

      await addToCart(idToSend, quantity, hasMultiple);

      toast.success(`تم إضافة ${product.name} إلى السلة`, {
        position: "bottom-right",
        autoClose: 2000,
      });

      // إعادة تعيين الكمية بعد الإضافة
      setQuantity(1);
    } catch (error) {
      toast.error("فشل إضافة المنتج إلى السلة", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    try {
      setIsBuyingNow(true);
      const selectedVariant = product.options[selectedOptionIndex];
      const hasMultiple = product.options && product.options.length > 1;
      const idToSend = hasMultiple ? selectedVariant.id : product.id;

      // إضافة المنتج إلى السلة
      await addToCart(idToSend, quantity, hasMultiple);

      toast.success(`تم إضافة ${product.name} إلى السلة`, {
        position: "bottom-right",
        autoClose: 2000,
      });

      // التوجيه إلى صفحة checkout
      navigate("/checkout");
    } catch (error) {
      toast.error("فشل إضافة المنتج إلى السلة", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } finally {
      setIsBuyingNow(false);
    }
  };

  // الحصول على بوابات الدفع للـ variant المختار
  const selectedVariant = product.options?.[selectedOptionIndex];
  const paymentMethodsForSelectedVariant =
    selectedVariant?.payment_methods || [];
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="space-y-4 md:space-y-6" dir={lang == "ar" ? "rtl" : "ltr"}>
      <div>
        {/* Product Name */}
        <h2 className="md:text-base !text-[25px] text-black font-medium mb-1 text-start">
          {product?.name}
        </h2>

        {/* Product Description */}
        <div className="text-start">
          <p
            className={` md:text-xl font-bold text-sm  text-gray-600 leading-relaxed 
            ${expanded ? "" : "line-clamp-3"}`}
          >
            {product?.description}
          </p>

          {product?.description?.length > 100 && (
            <button
              onClick={toggleExpand}
              className="text-[#211C4D] font-semibold text-sm mt-1 hover:underline"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-[18px] h-[18px] md:w-[22px] md:h-[22px] ${
                  star <= product.average_rating
                    ? "fill-[#FC9231] text-[#FC9231]"
                    : "fill-none text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs md:text-sm text-muted-foreground">
            ({product.reviews_count} {t("review")})
          </span>
        </div>
      </div>
      
      {/* عرض خيارات المنتج (الألوان أو السعات) */}
      {hasMultipleOptions && (
        <div>
          <p className="text-sm text-start text-primary">{getOptionLabel()}</p>

          {/* عرض الخيارات بناءً على نوعها */}
          <div className="flex gap-2 md:gap-3 flex-wrap">
            {product?.options?.map((opt: any, index: number) => (
              <button
                key={opt.id}
                onClick={() => setSelectedOptionIndex(index)}
                className={`flex items-center justify-center rounded-full border-2 transition-all ${
                  selectedOptionIndex === index
                    ? "border-primary scale-110"
                    : "border-border hover:border-muted-foreground"
                }`}
                style={
                  isColorOption
                    ? {
                        width: "2rem",
                        height: "2rem",
                        backgroundColor: opt.value,
                        boxShadow:
                          opt.value === "#FFFFFF"
                            ? "inset 0 0 0 1px #e5e7eb"
                            : "none",
                      }
                    : {
                        minWidth: "4rem",
                        height: "2.5rem",
                        padding: "0 0.75rem",
                        backgroundColor: selectedOptionIndex === index ? "#2AA0DC" : "#f3f4f6",
                        color: selectedOptionIndex === index ? "white" : "#374151",
                      }
                }
              >
                {isColorOption ? (
                  // عرض دائرة للون
                  <span className="sr-only">{opt.name || `اللون ${index + 1}`}</span>
                ) : (
                  // عرض نص للسعة أو أي خيار آخر
                  <span className="text-sm font-medium">
                    {opt.name || opt.value || `الخيار ${index + 1}`}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-2 md:gap-3">
        <span className="text-2xl md:text-3xl font-bold text-[#C33104]">
          {selectedVariant?.final_price 
            ? (typeof selectedVariant.final_price === "string"
                ? selectedVariant.final_price
                : Number(selectedVariant.final_price || 0).toLocaleString("ar-SA"))
            : (product.final_price 
                ? (typeof product.final_price === "string"
                    ? product.final_price
                    : Number(product.final_price || 0).toLocaleString("ar-SA"))
                : "0")}
          {t("SAR")}
        </span>
        {selectedVariant?.original_price && 
         selectedVariant.final_price !== selectedVariant.original_price && (
          <span className="text-base md:text-lg text-muted-foreground line-through">
            {typeof selectedVariant.original_price === "string"
              ? selectedVariant.original_price
              : Number(selectedVariant.original_price || 0).toLocaleString("ar-SA")}
            {t("SAR")}
          </span>
        )}
      </div>

      {/* Payment Options */}
      <div className="space-y-3 pt-4 md:pt-6">
        {paymentMethodsForSelectedVariant &&
        paymentMethodsForSelectedVariant.length > 0 ? (
          paymentMethodsForSelectedVariant.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row md:items-center gap-3 p-3 md:h-[72px] h-full rounded-lg border border-[#0000004D]"
            >
              <div className="flex-1">
                <p className="text-xs md:text-[16px] font-[600] text-start text-[#211C4D]">
                  {item.name}
                  <span className="ml-2 text-[#C33104] font-bold">
                    {item.total_price}
                  </span>
                </p>
              </div>
              <div className="px-3 py-1 md:px-4 md:py-1 rounded text-sm font-bold text-card">
                <img
                  src={item.image}
                  className="w-[80px] h-[60px] object-contain"
                  alt={item.name}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            لا توجد طرق دفع متاحة لهذا الخيار
          </div>
        )}
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex flex-col md:flex-row md:justify-between justify-center flex-wrap items-center gap-4 md:gap-0 pt-4">
        <div className="flex items-center justify-between border-2 w-[180px] md:w-[159px] h-[50px] md:h-[62px] border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 md:px-4 py-2 h-full bg-gray-200 hover:bg-accent transition-colors"
            aria-label="تقليل الكمية"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 md:px-6 py-2 border-x-2 border-border font-bold min-w-[40px] md:min-w-[60px] text-center text-sm md:text-base">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 md:px-4 py-2 bg-[#2AA0DC] h-full text-white hover:text-black hover:bg-accent transition-colors"
            aria-label="زيادة الكمية"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart || isBuyingNow}
            variant="outline"
            size="lg"
            className="px-4 md:px-6 w-[180px] md:w-[200px] h-[50px] md:h-[64px] border-2 border-black bg-transparent text-xl md:text-[25px] disabled:opacity-50"
          >
            {isAddingToCart ? "جاري الإضافة..." : t("Addtocart")}
          </Button>
          <Button
            onClick={handleBuyNow}
            disabled={isAddingToCart || isBuyingNow}
            className="bg-[#2AA0DC] w-[180px] md:w-[200px] h-[50px] md:h-[64px] hover:bg-primary/90 rounded-[8px] flex items-center justify-center text-primary-foreground font-[600] text-xl md:text-[25px] disabled:opacity-50"
          >
            {isBuyingNow ? "جاري التوجيه..." : t("Buynow")}
          </Button>
        </div>
      </div>
      <TabbyModal
        isOpen={isTabbyModalOpen}
        onClose={() => setIsTabbyModalOpen(false)}
      />
      <TamaraModal
        isOpen={isTamaraModalOpen}
        onClose={() => setIsTamaraModalOpen(false)}
      />
    </div>
  );
}