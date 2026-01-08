"use client";
import "@/style.css";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from '@/store/cartStore/cartStore';
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Basketsummary({ products, total }: any) {
  const { deletefromCart, updateQuantity, items, clearCart, loading } = useCartStore();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  // تسجيل البيانات للتصحيح
  console.log("Cart items in Basketsummary:", products);
  
  const handleDeleteAll = async () => {
    if (items.length === 0 || isDeletingAll || loading) return;
    
    if (window.confirm(t("AreYouSureDeleteAll"))) {
      setIsDeletingAll(true);
      try {
        await clearCart();
      } catch (error) {
        console.error("Failed to delete all items:", error);
        alert(t("DeleteAllFailed"));
      } finally {
        setIsDeletingAll(false);
      }
    }
  };

  const handleIncrement = (cartItemId: number, currentQuantity: number) => {
    updateQuantity(cartItemId, currentQuantity + 1);
  };

  const handleDecrement = (cartItemId: number, currentQuantity: number) => {
    updateQuantity(cartItemId, currentQuantity - 1);
  };

  // استخراج السعر من العنصر في السلة
  const getItemPrice = (item: any) => {
    // أولوية: سعر العنصر المباشر في السلة
    if (item.price !== undefined && item.price !== null) {
      return item.price;
    }
    
    // ثانياً: السعر من الـ variant المحدد
    if (item.variant?.final_price !== undefined && item.variant?.final_price !== null) {
      return item.variant.final_price;
    }
    
    // ثالثاً: السعر من المنتج الرئيسي
    const product = item.product || item;
    return product?.final_price || product?.price || 0;
  };

  // استخراج اسم المنتج مع تفاصيل الـ variant
  const getItemDisplayName = (item: any) => {
    const product = item.product || item;
    const baseName = product?.name || t("Product");
    
    // إضافة تفاصيل الـ variant إذا كانت موجودة
    if (item.variant?.name || item.variant?.value) {
      const variantName = item.variant.name || item.variant.value;
      return `${baseName} - ${variantName}`;
    }
    
    return baseName;
  };

  // استخراج صورة العنصر
  const getItemImage = (item: any) => {
    // أولوية: صورة الـ variant
    if (item.variant?.images?.[0]?.url) {
      return item.variant.images[0].url;
    }
    
    // ثانياً: الصورة من المنتج
    const product = item.product || item;
    return product?.images?.[0]?.url || product?.main_image || "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header مع زر حذف الكل */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className={`text-[24px] font-[600] text-[#211C4D] ${isRTL ? "text-right" : "text-left"}`}>
          {t("CartSummary")}
        </h1>
        
        {products.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDeleteAll}
            disabled={loading || isDeletingAll}
            className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isDeletingAll ? (
              <>
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                {t("Deleting")}
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                {t("DeleteAll")}
              </>
            )}
          </Button>
        )}
      </div>

      {/* قائمة المنتجات */}
      <div className="space-y-6">
        {products.map((item: any) => {
          const cartItemId = item?.id || 0;
          const quantity = item?.quantity || 1;
          const itemPrice = getItemPrice(item);
          const itemName = getItemDisplayName(item);
          const imageUrl = getItemImage(item);
          const variantInfo = item.variant ? `(${item.variant.name || item.variant.value})` : '';

          return (
            <div
              key={cartItemId}
              className="flex items-center justify-between gap-4 lg:p-4 border-b border-border hover:bg-muted/50 transition-colors"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {/* الصورة */}
              <div className="flex-shrink-0">
                <img
                  src={imageUrl}
                  alt={itemName}
                  className="lg:w-[92px] lg:h-[92px] md:w-[80px] md:h-[80px] w-[70px] h-[70px] object-contain rounded-lg bg-gray-50"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/70?text=No+Image";
                  }}
                />
              </div>

              {/* المحتوى الرئيسي */}
              <div className={`flex-1 flex flex-col md:flex-row justify-between gap-3 ${isRTL ? "lg:pl-[40px]" : "lg:pr-[40px]"}`}>
                <div className={`text-sm flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  <p className="md:text-[16px] text-[13px] max-w-[200px] font-[600] text-[#211C4D] line-clamp-2">
                    {itemName}
                  </p>
                  {variantInfo && (
                    <p className="text-xs text-gray-500 mt-1">{variantInfo}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">#{cartItemId}</p>
                </div>

                {/* عداد الكمية */}
                <div className="flex items-center gap-2 rounded-md bg-gray-100 p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 text-black p-0 hover:bg-gray-200 disabled:opacity-50"
                    onClick={() => handleIncrement(cartItemId, quantity)}
                    disabled={loading}
                    aria-label={t("Increase")}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>

                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-[45px] h-[32px] border text-black outline-none border-[#D9D9D9] rounded-[4px] text-center bg-white font-semibold"
                    min="1"
                    aria-label="Product quantity"
                  />

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-black hover:bg-gray-200 disabled:opacity-50"
                    onClick={() => handleDecrement(cartItemId, quantity)}
                    disabled={quantity <= 1 || loading}
                    aria-label={t("Decrease")}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>

                {/* السعر */}
                <div className="flex items-center gap-3 min-w-max">
                  <span className="font-bold text-[14px] md:text-lg text-[#211C4D]">
                    {typeof itemPrice === "string"
                      ? itemPrice
                      : Number(itemPrice).toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("SAR")}
                  </span>
                  {quantity > 1 && (
                    <span className="text-xs text-gray-500">
                      = {typeof itemPrice === "string" 
                        ? (parseFloat(itemPrice.replace(/[^\d.-]/g, '')) * quantity).toLocaleString(isRTL ? "ar-SA" : "en-US")
                        : (itemPrice * quantity).toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("SAR")}
                    </span>
                  )}
                </div>
              </div>

              {/* زر الحذف */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deletefromCart(cartItemId)}
                disabled={loading}
                className="text-[#211C4D] hover:text-destructive hover:bg-destructive/10 flex-shrink-0 disabled:opacity-50"
                aria-label={t("Remove")}
              >
                <X className="!w-[24px] !h-[24px]" />
              </Button>
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">{t("EmptyCart")}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.href = '/'}
          >
            {t("ContinueShopping")}
          </Button>
        </div>
      )}
    </div>
  );
}