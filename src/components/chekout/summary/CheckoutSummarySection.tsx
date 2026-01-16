import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore/cartStore";
import { useAddressStore } from "@/store/profile/indexStore";
import { useTranslation } from "react-i18next";
import axiosClient from "@/api/axiosClient";

import tamara from "@/assets/images/tamara.png";
import tabby from "@/assets/images/tabby 1.png";
import emkann from "@/assets/images/emkann.png";
import madfu from "@/assets/images/madfu.png";
import mispay_installment from "@/assets/images/mispay_installment 1.png";
import amwal from "@/assets/images/amwal.png";

interface ShipmentInfo {
  address: string;
}

interface PointsSummary {
  total_points: number;
  available_points: number;
  available_points_value: string;
  point_value: string;
  used_points: number;
  expired_points: number;
  expiring_soon_points: number;
}


interface CheckoutSummarySectionProps {
  usePoints: boolean;
  onUsePointsChange: (value: boolean) => void;
}
const CheckoutSummarySection: React.FC<CheckoutSummarySectionProps> = ({
  usePoints,
  onUsePointsChange,
}) => {
  const { items, total, selectedPaymentId, finalTotal: cartFinalTotal } = useCartStore();
  const { t, i18n } = useTranslation();
  
  const [pointsData, setPointsData] = useState<PointsSummary | null>(null);
  const [loadingPoints, setLoadingPoints] = useState(true);
  const [errorPoints, setErrorPoints] = useState<string | null>(null);

  // الحصول على العنوان المحدد من الـ store
  const { getSelectedAddress, deliveryMethod } = useAddressStore();
  const selectedAddress = getSelectedAddress();

  const isRTL = i18n.language === "ar";

  const paymentLogos: Record<number, any> = {
    1: tamara,
    2: tabby,
    3: madfu,
    4: mispay_installment,
    5: emkann,
    6: amwal,
  };

  console.log('CheckoutSummarySection - Received props:', { 
  usePoints, 
  onUsePointsChange: typeof onUsePointsChange 
});

  // استخراج بوابات الدفع والبوابة المختارة
  const paymentMethods = (items[0]?.product as any)?.options?.[0]?.payment_methods || [];
  const selectedPayment = paymentMethods.find((p: any) => p.id === selectedPaymentId);

  // جلب نقاط المستخدم
  
useEffect(() => {
  const fetchPoints = async () => {
    try {
      setLoadingPoints(true);
      setErrorPoints(null);

      const response = await axiosClient.get("/api/v1/points/summary", {
        // إضافة headers عشان نتجنب caching لو فيه
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });

      if (response.data.status && response.data.data?.summary) {
        setPointsData(response.data.data.summary);
      } else {
        setErrorPoints(t("checkoutSummary.pointsError"));
      }
    } catch (err: any) {
      console.error("Error fetching points:", err);
      setErrorPoints(t("checkoutSummary.pointsError") || "فشل تحميل النقاط");
    } finally {
      setLoadingPoints(false);
    }
  };

  fetchPoints();
}, []); 

  // تحديد معلومات الشحن
  const getShipmentInfo = (): ShipmentInfo => {
    if (deliveryMethod === "pickup") {
      return {
        address: isRTL 
          ? "استلام من المعرض - الموقع الرئيسي" 
          : "Pickup from Showroom - Main Location"
      };
    }
    
    if (selectedAddress && deliveryMethod === "delivery") {
      const cityName = isRTL ? selectedAddress.city.name_ar : selectedAddress.city.name_en;
      return {
        address: `${selectedAddress.street_address}, ${cityName}, ${selectedAddress.country}`
      };
    }
    
    return {
      address: isRTL 
        ? "ابو بكر الصديق، شبرا، الطائف 26522،" 
        : "Abu Bakr Al-Siddiq, Shubra, Taif 26522"
    };
  };

  const shipmentInfo = getShipmentInfo();
  const subtotal = total || 0;

  // حساب قيمة النقاط المتاحة كرقم
  const availableValue = pointsData
    ? parseFloat(pointsData.available_points_value.replace(/,/g, ""))
    : 0;

  const pointsDiscount = usePoints ? Math.min(subtotal, availableValue) : 0;

  // حساب الضريبة: نسبة 15% من السعر الفرعي بعد خصم النقاط (VAT)
  const taxRate = 0.15; // 15% ضريبة
  const taxableAmount = subtotal - pointsDiscount;
  const tax = Math.round(taxableAmount * taxRate * 100) / 100;
  
  // حساب رسوم الشحن من العنوان المختار
  let shippingCost = 0;
  if (deliveryMethod === "delivery" && selectedAddress) {
    // الحصول على رسوم الشحن من مدينة العنوان المختار
    const shippingFeeStr = selectedAddress.city.shipping_fee;
    shippingCost = typeof shippingFeeStr === "string" 
      ? parseFloat(shippingFeeStr.replace(/,/g, ""))
      : typeof shippingFeeStr === "number" 
        ? shippingFeeStr 
        : 0;
  } else if (deliveryMethod === "pickup") {
    // لا توجد رسوم شحن للاستلام من المعرض
    shippingCost = 0;
  }
console.log("shippingggg",selectedAddress)
  // الإجمالي النهائي: يعتمد على cartFinalTotal (يشمل رسوم الدفع) ثم يخصم النقاط ويضيف الشحن والضريبة
  const displayFinalTotal = cartFinalTotal - pointsDiscount + shippingCost + tax;

  // حساب رسوم بوابة الدفع (لعرضها بشكل منفصل)
  const paymentProcessingFee = cartFinalTotal - subtotal;

  // عرض قسم العنوان
  const renderAddressSection = () => {
    if (deliveryMethod === "pickup") {
      return (
        <div className="p-3 rounded bg-gray-50" style={{ borderRadius: "7px" }}>
          <p className={`${isRTL ? "text-right" : "text-left"} text-wrap`} style={{
            fontFamily: "Roboto", fontWeight: 400, fontSize: "16px", lineHeight: "25px", color: "#211C4D",
          }}>
            {shipmentInfo.address}
          </p>
        </div>
      );
    }

    if (!selectedAddress) {
      return (
        <div className="p-3 rounded bg-yellow-50 border border-yellow-200" style={{ borderRadius: "7px" }}>
          <p className={`${isRTL ? "text-right" : "text-left"} text-wrap`} style={{
            fontFamily: "Roboto", fontWeight: 400, fontSize: "16px", lineHeight: "25px", color: "#D97706",
          }}>
            {t("checkoutSummary.noAddressSelected")}
          </p>
          <p className={`${isRTL ? "text-right" : "text-left"} text-sm mt-2`} style={{
            fontFamily: "Roboto", fontWeight: 400, fontSize: "14px", color: "#92400E",
          }}>
            {t("checkoutSummary.pleaseSelectAddress")}
          </p>
        </div>
      );
    }

    return (
      <div className="p-3 rounded bg-gray-50" style={{ borderRadius: "7px" }}>
        <p className={`${isRTL ? "text-right" : "text-left"} text-wrap`} style={{
          fontFamily: "Roboto", fontWeight: 400, fontSize: "16px", lineHeight: "25px", color: "#211C4D",
        }}>
          {shipmentInfo.address}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
            {selectedAddress.label || (isRTL ? "عنوان" : "Address")}
          </span>
          <span className="text-xs text-gray-500">{selectedAddress.phone}</span>
        </div>
      </div>
    );
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-8"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ width: "549px", borderRadius: "10px", borderWidth: "1px", gap: "24px" }}
    >
      {/* العنوان */}
      <h2 className={`font-semibold ${isRTL ? "text-right" : "text-left"} mb-6`} style={{
        height: "28px", fontFamily: "Roboto", fontWeight: 600, fontSize: "24px", lineHeight: "100%", color: "#211C4D",
      }}>
        {t("checkoutSummary.title")}
      </h2>

      {/* المنتجات المختارة */}
      <div className="mt-6">
        <h3 className={`font-medium text-gray-800 mb-4 ${isRTL ? "text-right" : "text-left"}`} style={{
          fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "16px", color: "#545454",
        }}>
          {t("checkoutSummary.selectedProducts")}
        </h3>

        <div className="space-y-4">
          {items.map((item: any) => {
            const product = item.product;
            const quantity = item.quantity || 1;
            const productName = product.name || t("checkoutSummary.product");
            const productPrice = product.final_price || 0;
            const unitPrice = typeof productPrice === "string" ? parseFloat(productPrice.replace(/,/g, "")) : productPrice;
            const totalPrice = unitPrice * quantity;

            return (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-[#F6F6F6]" style={{ borderRadius: "13px" }}>
                <div className={`flex items-center gap-4 ${isRTL ? "flex-row" : "flex-row-reverse"} flex-1`}>
                  <div className="w-10 h-10 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                    {product?.images?.[0]?.url || product?.main_image ? (
                      <img src={product?.images?.[0]?.url || product?.main_image} alt={productName} className="w-full h-full object-cover"
                        onError={(e: any) => { e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E"; }}
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-xs text-gray-500">{t("checkoutSummary.image")}</span>
                      </div>
                    )}
                  </div>

                  <div className={`${isRTL ? "text-right" : "text-left"} flex-1`}>
                    <p className="font-semibold line-clamp-1 mb-1" style={{ fontFamily: "Roboto", fontWeight: 600, fontSize: "16px", lineHeight: "20px", color: "#000000" }}>
                      {productName}
                    </p>
                    {quantity > 1 && (
                      <p className="text-xs text-gray-500" style={{ fontFamily: "Roboto", fontWeight: 400, fontSize: "12px", lineHeight: "16px" }}>
                        {quantity} × {unitPrice.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="font-medium flex-shrink-0 ml-4" style={{
                  fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "100%", color: "#000000", minWidth: "80px", textAlign: isRTL ? "left" : "right",
                }}>
                  {totalPrice.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* التفاصيل */}
      <div className="mt-6">
        {/* معلومات الشحن */}
        <div className="mb-6">
          <h3 className={`font-medium mb-2 ${isRTL ? "text-right" : "text-left"}`} style={{
            fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "16px", color: "#545454",
          }}>
            {deliveryMethod === "pickup" ? t("checkoutSummary.pickupLocation") : t("checkoutSummary.address")}
          </h3>
          {renderAddressSection()}
        </div>

        {/* بوابة الدفع المختارة */}
        <div className="mb-6">
          <h3 className={`font-medium mb-2 ${isRTL ? "text-right" : "text-left"}`} style={{
            fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "16px", color: "#545454",
          }}>
            {t("checkoutSummary.paymentMethod")}
          </h3>

          {selectedPayment ? (
            <div className="p-4 rounded-lg bg-gray-50 flex items-center justify-between" style={{ borderRadius: "7px" }}>
              <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                <img src={paymentLogos[selectedPayment.id] || madfu} alt={selectedPayment.name} className="h-10 w-auto" />
                <div className={isRTL ? "text-right" : "text-left"}>
                  <p className="font-semibold text-[#211C4D]">{selectedPayment.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedPaymentId === 6 
                      ? (isRTL ? "استخدم 6 دفعات بدون فائدة وتوفير رسوم" : "Use 6 interest-free installments and save fees")
                      : isRTL 
                        ? `قسم على ${selectedPayment.id === 1 || selectedPayment.id === 2 ? (selectedPayment.id === 1 ? 3 : 4) : 4} دفعات بدون فائدة`
                        : `Split into ${selectedPayment.id === 1 || selectedPayment.id === 2 ? (selectedPayment.id === 1 ? 3 : 4) : 4} interest-free installments`
                    }
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className={`text-amber-800 ${isRTL ? "text-right" : "text-left"}`}>
                {t("checkoutSummary.noPaymentSelected")}
              </p>
            </div>
          )}
        </div>

        {/* تفاصيل الأسعار */}
        <div>
          {/* استخدام النقاط */}
          <div className="flex flex-col p-4 rounded-lg border border-gray-300 mb-4" style={{ borderRadius: "8px", borderWidth: "1px", borderColor: "#939393" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="font-bold flex-1" style={{
                fontFamily: "Roboto", fontWeight: 700, fontSize: "16px", lineHeight: "150%", color: "#424242", textAlign: isRTL ? "right" : "left",
              }}>
                {t("checkoutSummary.useAllPoints")}
              </p>

             <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    checked={usePoints}
    onChange={(e) => onUsePointsChange(e.target.checked)}
    className="sr-only peer"
  />
  <div
    className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full
               peer peer-checked:bg-blue-500 transition-colors"
  ></div>
  <div
    className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full
               transition-transform peer-checked:translate-x-5"
  ></div>
</label>

            </div>

            {loadingPoints ? (
              <p className="text-sm text-gray-500">{t("common.loading")}...</p>
            ) : errorPoints ? (
              <p className="text-sm text-red-500">{errorPoints}</p>
            ) : pointsData ? (
              <p className="text-sm text-gray-600 mt-2" style={{ textAlign: isRTL ? "right" : "left" }}>
                {t("checkoutSummary.availablePoints", {
                  points: pointsData.available_points.toLocaleString(),
                  value: pointsData.available_points_value,
                })}
              </p>
            ) : null}
          </div>

          {/* المجموع الفرعي */}
          <div className="flex justify-between items-center mb-4">
            <p className="font-medium" style={{
              fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "24px", letterSpacing: "3%", color: "#211C4D", textAlign: isRTL ? "right" : "left",
            }}>
              {t("checkoutSummary.subtotal")}
            </p>
            <p className="font-medium" style={{
              fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "32px", letterSpacing: "3%", color: "#211C4D", minWidth: "100px", textAlign: isRTL ? "left" : "right",
            }}>
              {subtotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
            </p>
          </div>

          {/* تفاصيل إضافية */}
          <div className="mb-6 space-y-2">
            {/* رسوم بوابة الدفع */}
            {paymentProcessingFee > 0 && (
              <div className="flex justify-between items-center">
                <p className="font-normal" style={{
                  fontFamily: "Roboto", fontWeight: 400, fontSize: "16px", lineHeight: "32px", color: "#211C4DB2", textAlign: isRTL ? "right" : "left",
                }}>
                  {t("checkoutSummary.paymentFees", { paymentName: selectedPayment?.name || "" })}
                </p>
                <p className="font-medium" style={{
                  fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "32px", color: "#211C4DB2", minWidth: "100px", textAlign: isRTL ? "left" : "right",
                }}>
                  +{paymentProcessingFee.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
                </p>
              </div>
            )}

            {/* خصم النقاط */}
            {usePoints && pointsDiscount > 0 && (
              <div className="flex justify-between items-center">
                <p className="font-normal" style={{
                  fontFamily: "Roboto", fontWeight: 400, fontSize: "16px", lineHeight: "32px", color: "#F3AC5D", textAlign: isRTL ? "right" : "left",
                }}>
                  {t("checkoutSummary.pointsDiscount")}
                </p>
                <p className="font-medium" style={{
                  fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "32px", color: "#F3AC5D", minWidth: "100px", textAlign: isRTL ? "left" : "right",
                }}>
                  -{pointsDiscount.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
                </p>
              </div>
            )}

            {/* الضريبة */}
            <div className="flex justify-between items-center">
              <p className="font-normal" style={{
                fontFamily: "Roboto", fontWeight: 400, fontSize: "16px", lineHeight: "32px", color: "#211C4DB2", textAlign: isRTL ? "right" : "left",
              }}>
                {t("checkoutSummary.estimatedTax")}
              </p>
              <p className="font-medium" style={{
                fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "32px", color: "#211C4DB2", minWidth: "100px", textAlign: isRTL ? "left" : "right",
              }}>
                {tax.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
              </p>
            </div>

            {/* الشحن */}
            <div className="flex justify-between items-center">
              <p className="font-normal" style={{
                fontFamily: "Roboto", fontWeight: 400, fontSize: "16px", lineHeight: "32px", color: "#211C4DB2", textAlign: isRTL ? "right" : "left",
              }}>
                {t("checkoutSummary.shippingCost")}
              </p>
              <p className="font-medium" style={{
                fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "32px", color: "#211C4DB2", minWidth: "100px", textAlign: isRTL ? "left" : "right",
              }}>
                {shippingCost === 0 
                  ? (isRTL ? "مجاني" : "Free")
                  : `${shippingCost.toLocaleString(isRTL ? "ar-SA" : "en-US")} ${t("common.SAR")}`
                }
              </p>
            </div>
          </div>

          {/* الإجمالي النهائي */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <p className="font-medium" style={{
              fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "24px", letterSpacing: "3%", color: "#211C4D", textAlign: isRTL ? "right" : "left",
            }}>
              {t("checkoutSummary.total")}
            </p>
            <p className="font-medium" style={{
              fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "32px", letterSpacing: "3%", color: "#211C4D", minWidth: "100px", textAlign: isRTL ? "left" : "right",
            }}>
              {displayFinalTotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("common.SAR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummarySection;