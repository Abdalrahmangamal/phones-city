import React, { useState } from "react";
import { useCartStore } from "@/store/cartStore/cartStore";
import { Button } from "@/components/ui/button";

interface ShipmentInfo {
  address: string;
}

const CheckoutSummarySection: React.FC = () => {
  const { items, total } = useCartStore();
  const [usePoints, setUsePoints] = useState(false);

  // Mock shipment info - in a real app this would come from the user's saved addresses
  const shipmentInfo: ShipmentInfo = {
    address: "ابو بكر الصديق، شبرا، الطائف 26522،"
  };

  // Calculate prices based on actual cart data
  const subtotal = total || 0; // Use actual cart total
  const pointsDiscount = usePoints ? Math.floor(subtotal * 0.15) : 0; // 15% discount when using points
  const tax = 0; // As requested, showing 0 ر.س
  const shippingCost = 140;
  const finalTotal = subtotal - pointsDiscount + tax + shippingCost;

  return (
    <div 
      className="bg-white p-8 rounded-lg border border-gray-200"
      style={{
        width: "549px",
        borderRadius: "10px",
        borderWidth: "1px",
        paddingTop: "32px",
        paddingRight: "24px",
        paddingBottom: "32px",
        paddingLeft: "24px",
        gap: "24px"
      }}
    >
      {/* Title */}
      <h2 
        className="text-right font-semibold"
        style={{
          width: "222px",
          height: "28px",
          fontFamily: "Roboto",
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: "100%",
          color: "#211C4D"
        }}
      >
        الملخص
      </h2>

      {/* Selected Products */}
      <div 
        className="mt-6"
        style={{
          width: "501px",
          gap: "16px"
        }}
      >
        <h3 
          className="text-right font-medium text-gray-800 mb-4"
          style={{
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "16px",
            color: "#545454"
          }}
        >
          المنتجات المختارة
        </h3>
        
        <div className="space-y-4">
          {items.map((item) => {
            // Access product data correctly based on the CartItem structure
            const product = item.product;
            const quantity = (item as any).quantity || 1; // Get quantity from item, default to 1
            const productName = product.name || "منتج";
            const productPrice = product.final_price || 0;
            const unitPrice = typeof productPrice === "string" 
              ? parseFloat(productPrice.replace(/,/g, ""))
              : productPrice;
            const totalPrice = unitPrice * quantity;
            
            return (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{
                  width: "501px",
                  borderRadius: "13px",
                  gap: "16px",
                  backgroundColor: "#F6F6F6"
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Product image */}
                  <div 
                    className="w-10 h-10 rounded flex items-center justify-center overflow-hidden"
                    style={{
                      width: "40px",
                      height: "40px"
                    }}
                  >
                    {(product as any)?.images?.[0]?.url || (product as any)?.main_image ? (
                      <img 
                        src={(product as any)?.images?.[0]?.url || (product as any)?.main_image}
                        alt={productName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
                        }}
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-xs text-gray-500">صورة</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right flex-1">
                    <p 
                      className="font-semibold line-clamp-1"
                      style={{
                        fontFamily: "Roboto",
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "20px",
                        color: "#000000"
                      }}
                    >
                      {productName}
                    </p>
                    {quantity > 1 && (
                      <p 
                        className="text-xs text-gray-500"
                        style={{
                          fontFamily: "Roboto",
                          fontWeight: 400,
                          fontSize: "12px",
                          lineHeight: "16px"
                        }}
                      >
                        {quantity} × {Number(unitPrice).toLocaleString("ar-SA")} ر.س
                      </p>
                    )}
                  </div>
                </div>
                <div 
                  className="font-medium"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "100%",
                    textAlign: "left",
                    color: "#000000"
                  }}
                >
                  {Number(totalPrice).toLocaleString("ar-SA")} ر.س
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details */}
      <div 
        className="mt-6"
        style={{
          width: "501px",
          gap: "24px"
        }}
      >
        {/* Shipment Info */}
        <div 
          className="mb-6"
          style={{
            width: "501px",
            height: "73px",
            gap: "16px"
          }}
        >
          <h3 
            className="text-right font-medium mb-2"
            style={{
              width: "501px",
              height: "16px",
              fontFamily: "Roboto",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "16px",
              textAlign: "right",
              color: "#545454"
            }}
          >
            العنوان
          </h3>
          
          <div 
            className="p-3 rounded"
            style={{
              width: "501px",
              height: "49px",
              borderRadius: "7px",
              paddingTop: "12px",
              paddingBottom: "12px",
              gap: "87px",
            }}
          >
            <p 
              className="text-right"
              style={{
                width: "501px",
                height: "25px",
                fontFamily: "Roboto",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "25px",
                textAlign: "right",
                verticalAlign: "middle",
                color: "#211C4D"
              }}
            >
              {shipmentInfo.address}
            </p>
          </div>
        </div>

        {/* Prices */}
        <div 
          style={{
            width: "501px",
            gap: "16px"
          }}
        >
          {/* Points Toggle */}
          <div 
            className="flex items-center justify-between p-4 rounded-lg border border-gray-300 mb-4"
            style={{
              width: "500px",
              borderRadius: "8px",
              borderWidth: "1px",
              gap: "164px",
              padding: "16px",
              borderColor: "#939393"
            }}
          >
            <p 
              className="font-bold"
              style={{
                width: "264px",
                height: "24px",
                fontFamily: "Roboto",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "150%",
                verticalAlign: "middle",
                color: "#424242"
              }}
            >
              استخدم 60 نقطة واستمتع بخصم 15 %
            </p>
            
            <button
              onClick={() => setUsePoints(!usePoints)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                usePoints ? "bg-blue-500" : "bg-gray-300"
              }`}
              style={{
                backgroundColor: usePoints ? "#3B82F6" : "#D1D5DB",
              }}
              aria-label={usePoints ? "إيقاف استخدام النقاط" : "استخدام النقاط"}
              dir="ltr"
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  usePoints ? "translate-x-5" : ""
                }`}
                style={{
                  transform: usePoints ? "translateX(16px)" : "translateX(2px)",
                  transition: "transform 0.2s ease-in-out"
                }}
              />
            </button>
          </div>

          {/* Subtotal */}
          <div 
            className="flex justify-between items-center mb-4"
            style={{
              width: "501px",
              height: "32px",
              justifyContent: "space-between"
            }}
          >
            <p 
              className="font-medium"
              style={{
                width: "417px",
                height: "24px",
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "3%",
                textAlign: "right",
                verticalAlign: "bottom",
                color: "#211C4D"
              }}
            >
              المجموع الفرعي
            </p>
            <p 
              className="font-medium"
              style={{
                width: "84px",
                height: "32px",
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "32px",
                letterSpacing: "3%",
                textAlign: "left",
                color: "#211C4D"
              }}
            >
              {subtotal.toLocaleString("ar-SA")} ر.س
            </p>
          </div>

          {/* Taxes */}
          <div 
            className="mb-6"
            style={{
              width: "501px",
              gap: "8px"
            }}
          >
            {/* Points Discount */}
            {usePoints && (
              <div 
                className="flex justify-between items-center mb-2"
                style={{
                  width: "501px",
                  height: "32px",
                  gap: "16px"
                }}
              >
                <p 
                  className="font-normal"
                  style={{
                    width: "427px",
                    height: "32px",
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "32px",
                    letterSpacing: "0%",
                    textAlign: "right",
                    verticalAlign: "bottom",
                    color: "#F3AC5D"
                  }}
                >
                  الخصم
                </p>
                <p 
                  className="font-medium"
                  style={{
                    width: "74px",
                    height: "32px",
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "32px",
                    letterSpacing: "3%",
                    textAlign: "left",
                    color: "#F3AC5D"
                  }}
                >
                  {pointsDiscount.toLocaleString("ar-SA")} ر.س
                </p>
              </div>
            )}

            {/* Tax */}
            <div 
              className="flex justify-between items-center mb-2"
              style={{
                width: "501px",
                height: "32px",
                gap: "16px"
              }}
            >
              <p 
                className="font-normal"
                style={{
                  width: "441px",
                  height: "32px",
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "32px",
                  letterSpacing: "0%",
                  textAlign: "right",
                  verticalAlign: "bottom",
                  color: "#211C4DB2"
                }}
              >
                الضريبة المقدرة
              </p>
              <p 
                className="font-medium"
                style={{
                  width: "60px",
                  height: "32px",
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "32px",
                  letterSpacing: "3%",
                  textAlign: "left",
                  color: "#211C4DB2"
                }}
              >
                {tax.toLocaleString("ar-SA")} ر.س
              </p>
            </div>

            {/* Shipping */}
            <div 
              className="flex justify-between items-center"
              style={{
                width: "501px",
                height: "32px",
                gap: "16px"
              }}
            >
              <p 
                className="font-normal"
                style={{
                  width: "441px",
                  height: "32px",
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "32px",
                  letterSpacing: "3%",
                  textAlign: "right",
                  verticalAlign: "bottom",
                  color: "#211C4DB2"
                }}
              >
                تكلفة الشحن
              </p>
              <p 
                className="font-medium"
                style={{
                  width: "60px",
                  height: "32px",
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "32px",
                  letterSpacing: "3%",
                  textAlign: "left",
                  color: "#211C4DB2"
                }}
              >
                {shippingCost.toLocaleString("ar-SA")} ر.س
              </p>
            </div>
          </div>

          {/* Total */}
          <div 
            className="flex justify-between items-center pt-4 border-t border-gray-200"
            style={{
              width: "501px",
              height: "32px",
              justifyContent: "space-between"
            }}
          >
            <p 
              className="font-medium"
              style={{
                width: "417px",
                height: "24px",
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "3%",
                textAlign: "right",
                verticalAlign: "bottom",
                color: "#211C4D"
              }}
            >
              إجمالي
            </p>
            <p 
              className="font-medium"
              style={{
                width: "84px",
                height: "32px",
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "32px",
                letterSpacing: "3%",
                textAlign: "left",
                color: "#211C4D"
              }}
            >
              {finalTotal.toLocaleString("ar-SA")} ر.س
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummarySection;