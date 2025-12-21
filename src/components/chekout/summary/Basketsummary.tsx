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

  const handleDeleteAll = async () => {
    if (items.length === 0 || isDeletingAll || loading) return;
    
    if (window.confirm(t("AreYouSureDeleteAll"))) {
      setIsDeletingAll(true);
      try {
        await clearCart(); // سيحذف جميع المنتجات مرة واحدة
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
          const product = item.product || item;
          const imageUrl = product?.images?.[0]?.url || product?.main_image || "";
          const productName = product?.name || item?.name || t("Product");
          const productPrice = product?.final_price || item?.price || 0;
          const quantity = item?.quantity || 1;
          const cartItemId = item?.id || 0;

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
                  alt={productName}
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
                    {productName}
                  </p>
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
                    {typeof productPrice === "string"
                      ? productPrice
                      : Number(productPrice).toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("SAR")}
                  </span>
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