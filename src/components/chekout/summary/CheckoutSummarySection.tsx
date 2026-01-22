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
import moyassarlogo from "@/assets/images/moyassarlogo.png";
import { SaudiRiyalIcon } from "@/components/common/SaudiRiyalIcon";

const paymentLogos: Record<number, any> = {
  1: tamara,
  2: tabby,
  3: madfu,
  4: mispay_installment,
  5: emkann,
  6: amwal,
  7: moyassarlogo,
};

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
  pointsDiscountAmount: number;
  onPointsDiscountChange: (value: number) => void;
}
const CheckoutSummarySection: React.FC<CheckoutSummarySectionProps> = ({
  usePoints,
  onUsePointsChange,
  pointsDiscountAmount,
  onPointsDiscountChange,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const { items, selectedPaymentId, freeShippingThreshold, updateFinalTotal } = useCartStore();
  const { addresses, selectedAddressId, deliveryMethod } = useAddressStore();
  const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);

  const [pointsData, setPointsData] = useState<PointsSummary | null>(null);
  const [loadingPoints, setLoadingPoints] = useState(false);
  const [errorPoints, setErrorPoints] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      setLoadingPoints(true);
      try {
        const response = await axiosClient.get("/api/v1/points");
        if (response.data.status && Array.isArray(response.data.data)) {
          // Sum available points
          const availablePoints = response.data.data
            .filter((p: any) => p.status === 'available')
            .reduce((sum: number, p: any) => sum + p.points_count, 0);

          setPointsData({
            total_points: availablePoints,
            available_points: availablePoints,
            available_points_value: availablePoints.toString(),
            point_value: "1",
            used_points: 0,
            expired_points: 0,
            expiring_soon_points: 0
          });
        }
      } catch (error) {
        console.error("Failed to fetch points", error);
      } finally {
        setLoadingPoints(false);
      }
    };
    fetchPoints();
  }, []);

  // 1. Calculate Total Price (including tax) - هذا هو السعر المعروض
  const totalPriceWithTax = items.reduce((acc, item) => acc + (item.subtotal || 0), 0);

  // 2. Calculate Tax and Subtotal (14% VAT from total price)
  // مثال: إذا كان السعر المعروض 100، الضريبة = 14% من 100 = 14، المجموع الفرعي = 100 - 14 = 86
  const taxRate = 0.15; // 15%
  const tax = totalPriceWithTax * taxRate; // الضريبة = 14% من السعر الإجمالي
  const subtotal = totalPriceWithTax - tax; // المجموع الفرعي = السعر الإجمالي - الضريبة

  // 3. Selected Payment & Fees
  const selectedPayment = (items[0]?.product as any)?.options?.[0]?.payment_methods?.find((p: any) => p.id === selectedPaymentId);

  let paymentProcessingFee = 0;
  if (selectedPayment && selectedPayment.processing_fee_amount) {
    paymentProcessingFee = parseFloat(selectedPayment.processing_fee_amount);
  }

  const shipmentInfo: ShipmentInfo = {
    address: selectedAddress ? `${selectedAddress.city.name} - ${selectedAddress.street_address}` : "",
  };

  // 4. Calculate Shipping Cost
  let shippingCost = 0;
  if (deliveryMethod === "delivery" && selectedAddress) {
    const shippingFeeStr = selectedAddress.city.shipping_fee;
    let baseShippingCost = typeof shippingFeeStr === "string"
      ? parseFloat(shippingFeeStr.replace(/,/g, ""))
      : typeof shippingFeeStr === "number"
        ? shippingFeeStr
        : 0;

    // Compare with total price (including tax) for free shipping threshold
    if (freeShippingThreshold > 0 && totalPriceWithTax >= freeShippingThreshold) {
      shippingCost = 0;
    } else {
      shippingCost = baseShippingCost;
    }
  } else if (deliveryMethod === "pickup") {
    shippingCost = 0;
  }

  // 5. Calculate max possible discount (cap at total price including tax)
  const maxDiscountAmount = totalPriceWithTax; // الخصم على السعر الإجمالي (شامل الضريبة)
  const maxPointsValue = pointsData ? parseFloat(pointsData.available_points_value) : 0;

  // Debug: Log values to understand the calculation
  console.log('🔍 Points Discount Debug:', {
    totalPriceWithTax,
    subtotal,
    tax,
    maxDiscountAmount,
    maxPointsValue,
    pointsDiscountAmount,
    usePoints,
    items: items.map(i => ({ subtotal: i.subtotal, quantity: i.quantity }))
  });

  // Points Discount - use custom amount if set, otherwise use max available
  // But never exceed the subtotal (max 100% discount on products only)
  let pointsDiscount = 0;
  if (usePoints && pointsData) {
    const requestedDiscount = pointsDiscountAmount > 0 ? pointsDiscountAmount : maxPointsValue;
    pointsDiscount = Math.min(requestedDiscount, maxPointsValue, maxDiscountAmount);
  }

  // 6. Calculate Final Total (guaranteed to be >= 0)
  // Tax is already included in totalPriceWithTax, so we don't add it again
  const displayFinalTotal = Math.max(0, totalPriceWithTax + shippingCost + paymentProcessingFee - pointsDiscount);

  // Sync Final Total with Store to prevent issues on Complete Order
  useEffect(() => {
    updateFinalTotal(displayFinalTotal, selectedPaymentId);
  }, [displayFinalTotal, selectedPaymentId, updateFinalTotal]);

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
      className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8 w-full max-w-[549px] mx-auto md:mx-0"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ borderRadius: "10px", borderWidth: "1px", gap: "24px" }}
    >
      {/* العنوان */}
      <h2 className={`font-semibold ${isRTL ? "text-right" : "text-left"} mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl`} style={{
        fontFamily: "Roboto", fontWeight: 600, color: "#211C4D",
      }}>
        {t("checkoutSummary.title")}
      </h2>

      {/* المنتجات المختارة */}
      <div className="mt-4 sm:mt-6">
        <h3 className={`font-medium text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base ${isRTL ? "text-right" : "text-left"}`} style={{
          fontFamily: "Roboto", fontWeight: 500, color: "#545454",
        }}>
          {t("checkoutSummary.selectedProducts")}
        </h3>

        <div className="space-y-3 sm:space-y-4">
          {items.map((item: any) => {
            const product = item.product;
            const quantity = item.quantity || 1;
            const productName = product.name || t("checkoutSummary.product");
            const productPrice = product.final_price || 0;
            const unitPrice = typeof productPrice === "string" ? parseFloat(productPrice.replace(/,/g, "")) : productPrice;
            const totalPrice = unitPrice * quantity;

            return (
              <div key={item.id} className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-[#F6F6F6]" style={{ borderRadius: "13px" }}>
                <div className={`flex items-center gap-2 sm:gap-4 ${isRTL ? "flex-row" : "flex-row-reverse"} flex-1 min-w-0`}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
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

                  <div className={`${isRTL ? "text-right" : "text-left"} flex-1 min-w-0`}>
                    <p className="font-semibold line-clamp-1 mb-1 text-xs sm:text-sm md:text-base" style={{ fontFamily: "Roboto", fontWeight: 600, color: "#000000" }}>
                      {productName}
                    </p>
                    {quantity > 1 && (
                      <p className={`text-xs text-gray-500 flex items-center gap-1 ${isRTL ? 'justify-end' : 'justify-start'}`} style={{ fontFamily: "Roboto", fontWeight: 400, fontSize: "10px", lineHeight: "16px" }}>
                        {quantity} × {unitPrice.toLocaleString(isRTL ? "ar-SA" : "en-US")} <SaudiRiyalIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </p>
                    )}
                  </div>
                </div>

                <div className={`font-medium flex-shrink-0 flex items-center gap-1 text-xs sm:text-sm md:text-base ${isRTL ? 'mr-2 sm:mr-4' : 'ml-2 sm:ml-4'}`} style={{
                  fontFamily: "Roboto", fontWeight: 500, color: "#000000", minWidth: "60px", textAlign: isRTL ? "left" : "right",
                }}>
                  {totalPrice.toLocaleString(isRTL ? "ar-SA" : "en-US")} <SaudiRiyalIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
        <div className="mb-4 sm:mb-6">
          <h3 className={`font-medium mb-2 text-sm sm:text-base ${isRTL ? "text-right" : "text-left"}`} style={{
            fontFamily: "Roboto", fontWeight: 500, color: "#545454",
          }}>
            {t("checkoutSummary.paymentMethod")}
          </h3>

          {selectedPayment ? (
            <div className="p-3 sm:p-4 rounded-lg bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4" style={{ borderRadius: "7px" }}>
              <div className={`flex items-center gap-2 sm:gap-4 ${isRTL ? "flex-row-reverse" : "flex-row"} w-full sm:w-auto`}>
                <img src={paymentLogos[selectedPayment.id] || madfu} alt={selectedPayment.name} className="h-8 sm:h-10 w-auto max-w-[100px] object-contain flex-shrink-0" />
                <div className={`${isRTL ? "text-right" : "text-left"} flex-1 min-w-0`}>
                  <p className="font-semibold text-[#211C4D] text-sm sm:text-base">{selectedPayment.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
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
            <div className="p-3 sm:p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className={`text-amber-800 text-sm sm:text-base ${isRTL ? "text-right" : "text-left"}`}>
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
                {t("checkoutSummary.usePoints")}
              </p>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={usePoints}
                  onChange={(e) => {
                    onUsePointsChange(e.target.checked);
                    if (!e.target.checked) {
                      onPointsDiscountChange(0);
                    }
                  }}
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
              <div>
                <p className="text-sm text-gray-600 mt-2" style={{ textAlign: isRTL ? "right" : "left" }}>
                  {t("checkoutSummary.availablePoints", {
                    points: pointsData.available_points.toLocaleString(),
                    value: pointsData.available_points_value,
                  })}
                </p>

                {/* Custom Points Input */}
                {usePoints && (
                  <div className="mt-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2" style={{ textAlign: isRTL ? "right" : "left" }}>
                      {isRTL ? 'حدد عدد النقاط للاستخدام:' : 'Specify points to use:'}
                    </label>
                    <div className={`flex items-center gap-2 flex-wrap sm:flex-nowrap ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                      <input
                        type="number"
                        min="0"
                        max={Math.min(maxPointsValue, maxDiscountAmount)}
                        value={pointsDiscountAmount || ''}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          const maxAllowed = Math.min(maxPointsValue, maxDiscountAmount);
                          onPointsDiscountChange(Math.min(val, maxAllowed));
                        }}
                        placeholder={isRTL ? 'ادخل العدد' : 'Enter amount'}
                        className="flex-1 min-w-[100px] h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                        style={{ direction: 'ltr' }}
                      />
                      <button
                        onClick={() => onPointsDiscountChange(Math.min(maxPointsValue, maxDiscountAmount))}
                        className="px-3 py-2 bg-blue-500 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-600 transition whitespace-nowrap w-full sm:w-auto"
                      >
                        {isRTL ? 'استخدم الكل' : 'Use All'}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2" style={{ textAlign: isRTL ? "right" : "left" }}>
                      {isRTL
                        ? `الحد الأقصى للخصم: ${Math.min(maxPointsValue, maxDiscountAmount).toLocaleString()} ريال`
                        : `Max discount: ${Math.min(maxPointsValue, maxDiscountAmount).toLocaleString()} SAR`}
                    </p>
                    {pointsDiscount > 0 && (
                      <p className="text-xs sm:text-sm font-medium text-green-600 mt-2" style={{ textAlign: isRTL ? "right" : "left" }}>
                        {isRTL
                          ? `سيتم خصم: ${pointsDiscount.toLocaleString()} ريال`
                          : `Discount applied: ${pointsDiscount.toLocaleString()} SAR`}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* المجموع الفرعي */}
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <p className="font-medium text-sm sm:text-base" style={{
              fontFamily: "Roboto", fontWeight: 500, color: "#211C4D", textAlign: isRTL ? "right" : "left",
            }}>
              {t("checkoutSummary.subtotal")}
            </p>
            <p className="font-medium flex items-center gap-1 text-sm sm:text-base" style={{
              fontFamily: "Roboto", fontWeight: 500, color: "#211C4D", minWidth: "70px", textAlign: isRTL ? "left" : "right",
            }}>
              {subtotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} <SaudiRiyalIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </p>
          </div>

          {/* تفاصيل إضافية */}
          <div className="mb-4 sm:mb-6 space-y-2">
            {/* رسوم بوابة الدفع - محذوفة من العرض ولكن محسوبة في المجموع النهائي */}
            {/* {paymentProcessingFee > 0 && (
              <div className="flex justify-between items-center">
                <p className="font-normal" style={{
                  fontFamily: "Roboto", fontWeight: 400, fontSize: "16px", lineHeight: "32px", color: "#211C4DB2", textAlign: isRTL ? "right" : "left",
                }}>
                  {t("checkoutSummary.paymentFees", { paymentName: selectedPayment?.name || "" })}
                </p>
                <p className="font-medium flex items-center gap-1" style={{
                  fontFamily: "Roboto", fontWeight: 500, fontSize: "16px", lineHeight: "32px", color: "#211C4DB2", minWidth: "100px", textAlign: isRTL ? "left" : "right",
                }}>
                  +{paymentProcessingFee.toLocaleString(isRTL ? "ar-SA" : "en-US")} <SaudiRiyalIcon className="w-3.5 h-3.5" />
                </p>
              </div>
            )} */}

            {/* خصم النقاط */}
            {usePoints && pointsDiscount > 0 && (
              <div className="flex justify-between items-center">
                <p className="font-normal text-xs sm:text-sm" style={{
                  fontFamily: "Roboto", fontWeight: 400, color: "#F3AC5D", textAlign: isRTL ? "right" : "left",
                }}>
                  {t("checkoutSummary.pointsDiscount")}
                </p>
                <p className="font-medium flex items-center gap-1 text-xs sm:text-sm" style={{
                  fontFamily: "Roboto", fontWeight: 500, color: "#F3AC5D", minWidth: "70px", textAlign: isRTL ? "left" : "right",
                }}>
                  -{pointsDiscount.toLocaleString(isRTL ? "ar-SA" : "en-US")} <SaudiRiyalIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </p>
              </div>
            )}

            {/* الضريبة */}
            <div className="flex justify-between items-center">
              <p className="font-normal text-xs sm:text-sm" style={{
                fontFamily: "Roboto", fontWeight: 400, color: "#211C4DB2", textAlign: isRTL ? "right" : "left",
              }}>
                {t("checkoutSummary.estimatedTax")}
              </p>
              <p className="font-medium flex items-center gap-1 text-xs sm:text-sm" style={{
                fontFamily: "Roboto", fontWeight: 500, color: "#211C4DB2", minWidth: "70px", textAlign: isRTL ? "left" : "right",
              }}>
                {tax.toLocaleString(isRTL ? "ar-SA" : "en-US")} <SaudiRiyalIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </p>
            </div>

            {/* الشحن */}
            <div className="flex justify-between items-center">
              <p className="font-normal text-xs sm:text-sm" style={{
                fontFamily: "Roboto", fontWeight: 400, color: "#211C4DB2", textAlign: isRTL ? "right" : "left",
              }}>
                {t("checkoutSummary.shippingCost")}
              </p>
              <p className="font-medium text-xs sm:text-sm" style={{
                fontFamily: "Roboto", fontWeight: 500, color: "#211C4DB2", minWidth: "70px", textAlign: isRTL ? "left" : "right",
              }}>
                {shippingCost === 0
                  ? (isRTL ? "مجاني" : "Free")
                  : <span className="flex items-center gap-1">{shippingCost.toLocaleString(isRTL ? "ar-SA" : "en-US")} <SaudiRiyalIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></span>
                }
              </p>
            </div>
          </div>

          {/* الإجمالي النهائي */}
          <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-200">
            <p className="font-semibold text-sm sm:text-base" style={{
              fontFamily: "Roboto", fontWeight: 600, color: "#211C4D", textAlign: isRTL ? "right" : "left",
            }}>
              {t("checkoutSummary.total")}
            </p>
            <p className="font-semibold flex items-center gap-1 text-sm sm:text-base" style={{
              fontFamily: "Roboto", fontWeight: 600, color: "#211C4D", minWidth: "70px", textAlign: isRTL ? "left" : "right",
            }}>
              {displayFinalTotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} <SaudiRiyalIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutSummarySection;