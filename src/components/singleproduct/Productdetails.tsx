import { Plus, Minus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { TabbyModal } from "@/components/singleproduct/Modelpayment";
import { TamaraModal } from "@/components/singleproduct/TamaraModal";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/cartStore/cartStore";
import { toast } from "react-toastify";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import { SaudiRiyalIcon } from "@/components/common/SaudiRiyalIcon";

import TamaraWidget from "@/components/public/TamaraWidget";

interface ProductdetailsProps {
  product: any;
  handleindexchange: (index: number) => void;
  selectedOptionIndex: number;
  isOutOfStock?: boolean;
}

export default function Productdetails({
  product,
  handleindexchange,
  selectedOptionIndex: propSelectedOptionIndex,
  isOutOfStock = false,
}: ProductdetailsProps) {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isTabbyModalOpen, setIsTabbyModalOpen] = useState(false);
  const [isTamaraModalOpen, setIsTamaraModalOpen] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(
    propSelectedOptionIndex || 0
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const colorDropdownRef = useRef<HTMLDivElement>(null);
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Close color dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target as Node)) {
        setColorDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    handleindexchange(selectedOptionIndex);
  }, [selectedOptionIndex, handleindexchange]);

  useEffect(() => {
    if (propSelectedOptionIndex !== undefined) {
      setSelectedOptionIndex(propSelectedOptionIndex);
    }
  }, [propSelectedOptionIndex]);

  if (!product) return <div>تحميل...</div>;

  const hasOptions = product?.options && Array.isArray(product.options) && product.options.length > 1;

  const selectedVariant = product.options?.[selectedOptionIndex];


  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.error("هذا المنتج غير متوفر حالياً", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      setIsAddingToCart(true);
      const hasMultiple = product.options && product.options.length > 1;
      const idToSend = hasMultiple ? selectedVariant.id : product.id;

      await addToCart(idToSend, quantity, hasMultiple);

      toast.success(t("product.addedToCart", { name: product.name }), {
        position: "bottom-right",
        autoClose: 2000,
      });

      setQuantity(1);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage === "Insufficient stock") {
        toast.error(t("product.insufficientStock"), {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else if (typeof error?.message === "string" && error.message.trim()) {
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        toast.error(t("product.addToCartFailed"), {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (isOutOfStock) {
      toast.error("هذا المنتج غير متوفر حالياً", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      setIsBuyingNow(true);
      const hasMultiple = product.options && product.options.length > 1;
      const idToSend = hasMultiple ? selectedVariant.id : product.id;

      await addToCart(idToSend, quantity, hasMultiple);

      toast.success(t("product.addedToCart", { name: product.name }), {
        position: "bottom-right",
        autoClose: 2000,
      });

      navigate(`/${lang}/checkout`);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage === "Insufficient stock") {
        toast.error(t("product.insufficientStock"), {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else if (typeof error?.message === "string" && error.message.trim()) {
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        toast.error(t("product.addToCartFailed"), {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } finally {
      setIsBuyingNow(false);
    }
  };

  const paymentMethodsForSelectedVariant =
    selectedVariant?.payment_methods || [];

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  // Calculate numeric price for Tamara Widget
  const currentDisplayPrice = selectedVariant?.final_price ?? product.final_price ?? 0;
  const widgetPrice = typeof currentDisplayPrice === 'string'
    ? parseFloat(currentDisplayPrice.replace(/,/g, ''))
    : Number(currentDisplayPrice);

  const normalizeTextValue = (value: unknown) => {
    if (typeof value === "string") return value.trim();
    if (value === null || value === undefined) return "";
    return String(value).trim();
  };

  const isColorCode = (value: unknown) => {
    const v = normalizeTextValue(value);
    if (!v) return false;
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v)
      || /^rgba?\(/i.test(v)
      || /^hsla?\(/i.test(v);
  };

  const getOptionLabel = (variant: any, index: number) => {
    const namedValue =
      (lang === "ar" ? variant?.value_ar : variant?.value_en) ||
      (lang === "ar" ? variant?.name_ar : variant?.name_en) ||
      variant?.label ||
      variant?.name ||
      variant?.title ||
      variant?.display_value ||
      variant?.value_name ||
      variant?.color_name;

    if (typeof namedValue === "string" && namedValue.trim() !== "" && !isColorCode(namedValue)) {
      return namedValue.trim();
    }

    const rawValue = normalizeTextValue(variant?.value);
    if (!rawValue) {
      return lang === "ar" ? `الخيار ${index + 1}` : `Option ${index + 1}`;
    }

    if (isColorCode(rawValue)) {
      return lang === "ar" ? `اللون ${index + 1}` : `Color ${index + 1}`;
    }

    return rawValue;
  };

  const getSwatchColor = (variant: any) => {
    const candidates = [
      variant?.color_code,
      variant?.hex_code,
      variant?.hex,
      variant?.color,
      variant?.colour,
      variant?.swatch,
      variant?.value,
    ];

    for (const candidate of candidates) {
      const normalized = normalizeTextValue(candidate);
      if (isColorCode(normalized)) {
        return normalized;
      }
    }

    return undefined;
  };

  const hasAnySwatchOptions = !!(hasOptions && product.options.some((v: any) => !!getSwatchColor(v)));
  const selectedOptionLabel = hasOptions
    ? getOptionLabel(product.options[selectedOptionIndex], selectedOptionIndex)
    : (lang === "ar" ? "اختر الخيار" : "Select option");
  const selectedOptionSwatch = hasOptions ? getSwatchColor(product.options[selectedOptionIndex]) : undefined;
  const optionsFieldLabelRaw = hasAnySwatchOptions ? t("Chooseyourcolor") : t("Option");
  const optionsFieldLabel = optionsFieldLabelRaw === "Chooseyourcolor"
    ? (lang === "ar" ? "اختر لونك" : "Choose your color")
    : optionsFieldLabelRaw === "Option"
      ? (lang === "ar" ? "اختر الخيار" : "Select option")
      : optionsFieldLabelRaw;

  return (
    <div className="space-y-4 md:space-y-6" dir={lang == "ar" ? "rtl" : "ltr"}>
      <div>
        <h2 className="md:text-base !text-[25px] text-black font-medium mb-1 text-start">
          {product?.name}
        </h2>

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
                className={`w-[18px] h-[18px] md:w-[22px] md:h-[22px] ${star <= product.average_rating
                  ? "fill-[#FC9231] text-[#FC9231]"
                  : "fill-none text-gray-300"
                  }`}
              />
            ))}
          </div>
          <span className="text-xs md:text-sm text-muted-foreground">
            ({product.reviews_count} {t("review.reviews")})
          </span>
        </div>
      </div>

      {
        hasOptions && (() => {
          // Unified custom dropdown: supports color swatches and plain options with one visual style.
          return (
            <div className="mt-5">
              <p className="text-sm font-semibold text-[#211C4D]/80 mb-2 text-start">
                {optionsFieldLabel}:
              </p>
              <div className="relative" ref={colorDropdownRef}>
                <button
                  type="button"
                  onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
                  aria-expanded={colorDropdownOpen}
                  aria-haspopup="listbox"
                  className="group w-full max-w-[360px] rounded-2xl border border-[#211C4D]/12 bg-gradient-to-b from-white to-[#F8FAFC] px-4 py-3 text-start shadow-sm transition-all hover:border-[#2AA0DC]/45 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2AA0DC]/30"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 ${selectedOptionSwatch ? "border-white ring-1 ring-[#211C4D]/15 shadow-sm" : "border-[#D7DEEA] bg-white"
                        }`}
                      style={selectedOptionSwatch ? { backgroundColor: selectedOptionSwatch } : undefined}
                    >
                      {!selectedOptionSwatch && (
                        <span className="h-2 w-2 rounded-full bg-[#211C4D]/25" />
                      )}
                    </span>

                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] leading-4 text-[#667085]">
                        {lang === "ar" ? "الخيار المحدد" : "Selected option"}
                      </span>
                      <span className="block truncate text-sm font-semibold text-[#211C4D]">
                        {selectedOptionLabel}
                      </span>
                    </div>

                    <span className={`shrink-0 rounded-full border border-[#E4E7EC] bg-white p-1.5 transition-transform duration-200 ${colorDropdownOpen ? "rotate-180" : ""}`}>
                      <svg
                        className="w-4 h-4 text-[#211C4D]/70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </button>

                {colorDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-full max-w-[360px] overflow-hidden rounded-2xl border border-[#211C4D]/10 bg-white shadow-[0_18px_50px_-18px_rgba(33,28,77,0.35)]">
                    <div className="max-h-[260px] overflow-y-auto p-2">
                      {product.options.map((variant: any, index: number) => {
                        const swatchColor = getSwatchColor(variant);
                        const isSelected = index === selectedOptionIndex;
                        const optionLabel = getOptionLabel(variant, index);

                        return (
                          <button
                            key={index}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setSelectedOptionIndex(index);
                              setColorDropdownOpen(false);
                            }}
                            className={`w-full rounded-xl border px-3 py-2.5 text-start transition-all ${isSelected
                              ? "border-[#2AA0DC]/45 bg-[#2AA0DC]/8 shadow-sm"
                              : "border-transparent hover:border-[#211C4D]/10 hover:bg-[#F8FAFC]"
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 ${swatchColor
                                  ? (isSelected ? "border-white ring-1 ring-[#211C4D]/20 shadow-sm" : "border-[#E5E7EB]")
                                  : (isSelected ? "border-[#2AA0DC]/35 bg-white" : "border-[#E5E7EB] bg-white")
                                  }`}
                                style={swatchColor ? { backgroundColor: swatchColor } : undefined}
                              >
                                {!swatchColor && <span className="h-1.5 w-1.5 rounded-full bg-[#98A2B3]" />}
                              </span>

                              <span className={`min-w-0 flex-1 truncate text-sm ${isSelected ? "font-semibold text-[#211C4D]" : "font-medium text-[#344054]"
                                }`}>
                                {optionLabel}
                              </span>

                              {isSelected && (
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#211C4D] text-white shrink-0">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()
      }

      <div className="mt-2">
        <p className={`text-sm md:text-base font-semibold ${isOutOfStock ? "text-red-600" : "text-green-600"
          }`}>
          {isOutOfStock ? "غير متوفر" : "متوفر"}
        </p>
      </div>

      <div className="flex items-baseline gap-2 md:gap-3">
        <span className={`text-2xl md:text-3xl font-bold ${isOutOfStock ? "text-gray-500" : "text-[#C33104]"
          }`}>
          {selectedVariant?.final_price
            ? (typeof selectedVariant.final_price === "string"
              ? selectedVariant.final_price
              : Number(selectedVariant.final_price || 0).toLocaleString("ar-SA"))
            : (product.final_price
              ? (typeof product.final_price === "string"
                ? product.final_price
                : Number(product.final_price || 0).toLocaleString("ar-SA"))
              : "0")}
          <SaudiRiyalIcon className="w-5 h-5 inline-block mx-1" />
        </span>
        {!isOutOfStock && selectedVariant?.original_price &&
          selectedVariant.final_price !== selectedVariant.original_price && (
            <span className="text-base md:text-lg text-muted-foreground line-through flex items-center">
              {typeof selectedVariant.original_price === "string"
                ? selectedVariant.original_price
                : Number(selectedVariant.original_price || 0).toLocaleString("ar-SA")}
              <SaudiRiyalIcon className="w-3.5 h-3.5 inline-block mx-1" />
            </span>
          )}
      </div>

      {
        !isOutOfStock && (
          <div className="space-y-3 pt-4 md:pt-6">
            <div className="mb-4">
              <TamaraWidget
                price={widgetPrice}
                currency="SAR"
                lang={lang}
              />
            </div>

            {paymentMethodsForSelectedVariant.length > 0 && paymentMethodsForSelectedVariant.map((item: any) => (
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
            ))}
          </div>
        )
      }

      <div className="flex flex-col md:flex-row md:justify-between justify-center flex-wrap items-center gap-4 md:gap-0 pt-4">
        <div className={`flex items-center justify-between border-2 w-[180px] md:w-[159px] h-[50px] md:h-[62px] rounded-lg overflow-hidden ${isOutOfStock ? "border-gray-300 opacity-60" : "border-border"
          }`}>
          <button
            onClick={() => !isOutOfStock && setQuantity(Math.max(1, quantity - 1))}
            disabled={isOutOfStock}
            className={`px-3 md:px-4 py-2 h-full transition-colors ${isOutOfStock
              ? "bg-gray-200 cursor-not-allowed opacity-60"
              : "bg-gray-200 hover:bg-accent"
              }`}
            aria-label="تقليل الكمية"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className={`px-4 md:px-6 py-2 border-x-2 border-border font-bold min-w-[40px] md:min-w-[60px] text-center text-sm md:text-base ${isOutOfStock ? "opacity-60" : ""
            }`}>
            {quantity}
          </span>
          <button
            onClick={() => !isOutOfStock && setQuantity(quantity + 1)}
            disabled={isOutOfStock}
            className={`px-3 md:px-4 py-2 h-full transition-colors ${isOutOfStock
              ? "bg-gray-300 cursor-not-allowed opacity-60"
              : "bg-[#2AA0DC] text-white hover:bg-[#1e8bc0]"
              }`}
            aria-label="زيادة الكمية"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart || isBuyingNow || isOutOfStock}
            variant={isOutOfStock ? "secondary" : "outline"}
            size="lg"
            className={`px-4 md:px-6 w-[180px] md:w-[200px] h-[50px] md:h-[64px] text-xl md:text-[25px] ${isOutOfStock
              ? "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
              : "border-2 border-black bg-transparent hover:bg-gray-50"
              } disabled:opacity-50`}
          >
            {isAddingToCart
              ? (lang === "ar" ? "جاري الإضافة..." : "Adding...")
              : isOutOfStock
                ? (lang === "ar" ? "غير متوفر" : "Out of Stock")
                : t("Addtocart")}
          </Button>

          <Button
            onClick={handleBuyNow}
            disabled={isAddingToCart || isBuyingNow || isOutOfStock}
            variant={isOutOfStock ? "secondary" : "default"}
            size="lg"
            className={`w-[180px] md:w-[200px] h-[50px] md:h-[64px] rounded-[8px] flex items-center justify-center font-[600] text-xl md:text-[25px] ${isOutOfStock
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-[#2AA0DC] hover:bg-[#1e8bc0] text-white"
              } disabled:opacity-50`}
          >
            {isBuyingNow
              ? (lang === "ar" ? "جاري التوجيه..." : "Redirecting...")
              : isOutOfStock
                ? (lang === "ar" ? "غير متوفر" : "Out of Stock")
                : t("Buynow")}
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
    </div >
  );
}
