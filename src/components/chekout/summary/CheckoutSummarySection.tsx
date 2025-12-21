import React, { useState } from "react";
import { useCartStore } from "@/store/cartStore/cartStore";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ShipmentInfo {
  address: string;
}

const CheckoutSummarySection: React.FC = () => {
  const { items, total } = useCartStore();
  const { t, i18n } = useTranslation();
  const [usePoints, setUsePoints] = useState(false);
  
  const isRTL = i18n.language === "ar";

  // Mock shipment info - in a real app this would come from the user's saved addresses
  const shipmentInfo: ShipmentInfo = {
    address: isRTL ? "ابو بكر الصديق، شبرا، الطائف 26522،" : "Abu Bakr Al-Siddiq, Shubra, Taif 26522"
  };

  // Calculate prices based on actual cart data
  const subtotal = total || 0;
  const pointsDiscount = usePoints ? Math.floor(subtotal * 0.15) : 0;
  const tax = 0;
  const shippingCost = 140;
  const finalTotal = subtotal - pointsDiscount + tax + shippingCost;

  return (
    <div 
      className={`bg-white rounded-lg border border-gray-200 p-8`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        width: "549px",
        borderRadius: "10px",
        borderWidth: "1px",
        gap: "24px"
      }}
    >
      {/* Title */}
      <h2 
        className={`font-semibold ${isRTL ? "text-right" : "text-left"} mb-6`}
        style={{
          height: "28px",
          fontFamily: "Roboto",
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: "100%",
          color: "#211C4D"
        }}
      >
        {t("checkoutSummary.title")}
      </h2>

      {/* Selected Products */}
      <div className="mt-6">
        <h3 
          className={`font-medium text-gray-800 mb-4 ${isRTL ? "text-right" : "text-left"}`}
          style={{
            fontFamily: "Roboto",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "16px",
            color: "#545454"
          }}
        >
          {t("checkoutSummary.selectedProducts")}
        </h3>
        
        <div className="space-y-4">
          {items.map((item) => {
            const product = item.product;
            const quantity = (item as any).quantity || 1;
            const productName = product.name || t("checkoutSummary.product");
            const productPrice = product.final_price || 0;
            const unitPrice = typeof productPrice === "string" 
              ? parseFloat(productPrice.replace(/,/g, ""))
              : productPrice;
            const totalPrice = unitPrice * quantity;
            
            return (
              <div 
                key={item.id}
                className={`flex items-center justify-between p-4 rounded-lg ${isRTL ? "flex-row" : "flex-row"}`}
                style={{
                  borderRadius: "13px",
                  backgroundColor: "#F6F6F6"
                }}
              >
                <div className={`flex items-center gap-4 ${isRTL ? "flex-row" : "flex-row-reverse"} flex-1`}>
                  {/* Product image */}
                  <div 
                    className="w-10 h-10 rounded flex items-center justify-center overflow-hidden flex-shrink-0"
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
                        <span className="text-xs text-gray-500">{t("checkoutSummary.image")}</span>
                      </div>
                    )}
                  </div>
                  <div className={`${isRTL ? "text-right" : "text-left"} flex-1`}>
                    <p 
                      className="font-semibold line-clamp-1 mb-1"
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
                        {quantity} × {Number(unitPrice).toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
                      </p>
                    )}
                  </div>
                </div>
                <div 
                  className="font-medium flex-shrink-0 ml-4"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "100%",
                    color: "#000000",
                    minWidth: "80px",
                    textAlign: isRTL ? "left" : "right"
                  }}
                >
                  {Number(totalPrice).toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details */}
      <div className="mt-6">
        {/* Shipment Info */}
        <div className="mb-6">
          <h3 
            className={`font-medium mb-2 ${isRTL ? "text-right" : "text-left"}`}
            style={{
              fontFamily: "Roboto",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "16px",
              color: "#545454"
            }}
          >
            {t("checkoutSummary.address")}
          </h3>
          
          <div 
            className="p-3 rounded bg-gray-50"
            style={{
              borderRadius: "7px",
            }}
          >
            <p 
              className={`${isRTL ? "text-right" : "text-left"} text-wrap`}
              style={{
                fontFamily: "Roboto",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "25px",
                color: "#211C4D"
              }}
            >
              {shipmentInfo.address}
            </p>
          </div>
        </div>

        {/* Prices */}
        <div>
          {/* Points Toggle */}
          <div 
            className={`flex items-center justify-between p-4 rounded-lg border border-gray-300 mb-4 ${isRTL ? 'flex-row' : 'flex-row'}`}
            style={{
              borderRadius: "8px",
              borderWidth: "1px",
              borderColor: "#939393"
            }}
          >
            <p 
              className="font-bold flex-1"
              style={{
                fontFamily: "Roboto",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "150%",
                color: "#424242",
                textAlign: isRTL ? "right" : "left"
              }}
            >
              {t("checkoutSummary.usePoints")}
            </p>
            
            <button
              onClick={() => setUsePoints(!usePoints)}
              className="relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0"
              style={{
                backgroundColor: usePoints ? "#3B82F6" : "#D1D5DB",
                direction: "ltr" // إجبار الاتجاه على LTR
              }}
              aria-label={usePoints ? t("checkoutSummary.disablePoints") : t("checkoutSummary.enablePoints")}
            >
              <span
                className="inline-block h-4 w-4 rounded-full bg-white transition-transform"
                style={{
                  transform: usePoints ? "translateX(22px)" : "translateX(2px)",
                  transition: "transform 0.2s ease-in-out"
                }}
              />
            </button>
          </div>

          {/* Subtotal */}
          <div 
            className={`flex justify-between items-center mb-4 ${isRTL ? "flex-row" : "flex-row"}`}
          >
            <p 
              className="font-medium"
              style={{
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "3%",
                color: "#211C4D",
                textAlign: isRTL ? "right" : "left"
              }}
            >
              {t("checkoutSummary.subtotal")}
            </p>
            <p 
              className="font-medium"
              style={{
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "32px",
                letterSpacing: "3%",
                color: "#211C4D",
                minWidth: "100px",
                textAlign: isRTL ? "left" : "right"
              }}
            >
              {subtotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
            </p>
          </div>

          {/* Taxes */}
          <div className="mb-6 space-y-2">
            {/* Points Discount */}
            {usePoints && (
              <div 
                className={`flex justify-between items-center ${isRTL ? "flex-row" : "flex-row"}`}
              >
                <p 
                  className="font-normal"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "32px",
                    color: "#F3AC5D",
                    textAlign: isRTL ? "right" : "left"
                  }}
                >
                  {t("checkoutSummary.discount")}
                </p>
                <p 
                  className="font-medium"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "32px",
                    color: "#F3AC5D",
                    minWidth: "100px",
                    textAlign: isRTL ? "left" : "right"
                  }}
                >
                  {pointsDiscount.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
                </p>
              </div>
            )}

            {/* Tax */}
            <div 
              className={`flex justify-between items-center ${isRTL ? "flex-row" : "flex-row"}`}
            >
              <p 
                className="font-normal"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "32px",
                  color: "#211C4DB2",
                  textAlign: isRTL ? "right" : "left"
                }}
              >
                {t("checkoutSummary.estimatedTax")}
              </p>
              <p 
                className="font-medium"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "32px",
                  color: "#211C4DB2",
                  minWidth: "100px",
                  textAlign: isRTL ? "left" : "right"
                }}
              >
                {tax.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
              </p>
            </div>

            {/* Shipping */}
            <div 
              className={`flex justify-between items-center ${isRTL ? "flex-row" : "flex-row"}`}
            >
              <p 
                className="font-normal"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "32px",
                  color: "#211C4DB2",
                  textAlign: isRTL ? "right" : "left"
                }}
              >
                {t("checkoutSummary.shippingCost")}
              </p>
              <p 
                className="font-medium"
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "32px",
                  color: "#211C4DB2",
                  minWidth: "100px",
                  textAlign: isRTL ? "left" : "right"
                }}
              >
                {shippingCost.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
              </p>
            </div>
          </div>

          {/* Total */}
          <div 
            className={`flex justify-between items-center pt-4 border-t border-gray-200 ${isRTL ? "flex-row" : "flex-row"}`}
          >
            <p 
              className="font-medium"
              style={{
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "3%",
                color: "#211C4D",
                textAlign: isRTL ? "right" : "left"
              }}
            >
              {t("checkoutSummary.total")}
            </p>
            <p 
              className="font-medium"
              style={{
                fontFamily: "Roboto",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "32px",
                letterSpacing: "3%",
                color: "#211C4D",
                minWidth: "100px",
                textAlign: isRTL ? "left" : "right"
              }}
            >
              {finalTotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummarySection;