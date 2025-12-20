"use client";
import "@/style.css";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from '@/store/cartStore/cartStore';

export default function Basketsummary({ products, total }: any) {
  const { deletefromCart, updateQuantity } = useCartStore();

  const handleIncrement = (cartItemId: number, currentQuantity: number) => {
    updateQuantity(cartItemId, currentQuantity + 1);
  };

  const handleDecrement = (cartItemId: number, currentQuantity: number) => {
    updateQuantity(cartItemId, currentQuantity - 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[24px] font-[600] text-[#211C4D] text-right">
          ملخص السلة
        </h1>
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {products.map((item: any) => {
          const product = item.product || item;
          const imageUrl = product?.images?.[0]?.url || product?.main_image || "";
          const productName = product?.name || item?.name || "منتج";
          const productPrice = product?.final_price || item?.price || 0;
          const quantity = item?.quantity || 1;
          const cartItemId = item?.id || 0; // مهم جداً: هذا cart_item_id (مثل 125)

          return (
            <div
              key={cartItemId}
              className="flex items-center justify-between gap-4 lg:p-4 border-b border-border hover:bg-muted/50 transition-colors"
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

              {/* المعلومات والكمية والسعر */}
              <div className="flex-1 lg:pl-[40px] flex flex-col md:flex-row justify-between gap-3">
                <div className="text-sm text-right flex-1">
                  <p className="md:text-[16px] text-[13px] max-w-[200px] font-[600] text-[#211C4D] line-clamp-2">
                    {productName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">#{cartItemId}</p>
                </div>

                {/* أزرار الكمية */}
                <div className="flex items-center gap-2 rounded-md bg-gray-100 p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 text-black p-0 hover:bg-gray-200"
                    onClick={() => handleIncrement(cartItemId, quantity)}
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
                    className="h-8 w-8 p-0 text-black hover:bg-gray-200"
                    onClick={() => handleDecrement(cartItemId, quantity)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>

                {/* السعر الإجمالي للمنتج (سعر الوحدة × الكمية) - اختياري */}
                <div className="flex items-center gap-3 min-w-max">
                  <span className="font-bold text-[14px] md:text-lg text-[#211C4D]">
                    {typeof productPrice === "string"
                      ? productPrice
                      : Number(productPrice).toLocaleString("ar-SA")} ر.س
                  </span>
                </div>
              </div>

              {/* زر الحذف */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deletefromCart(cartItemId)}
                className="text-[#211C4D] hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
              >
                <X className="!w-[24px] !h-[24px]" />
              </Button>
            </div>
          );
        })}
      </div>

      {/* الإجمالي */}
      {/* {products.length > 0 && (
        <div className="mt-8 p-4 bg-muted rounded-lg border border-border">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-foreground">الإجمالي:</span>
            <span className="text-muted-foreground text-start font-semibold" dir="ltr">
              {Number(total).toLocaleString("ar-SA", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} ر.س
            </span>
          </div>
        </div>
      )} */}

      {/* السلة فارغة */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">السلة فارغة</p>
        </div>
      )}
    </div>
  );
}