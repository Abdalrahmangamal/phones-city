"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore/cartStore";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

import tamara from "@/assets/images/tamara.png";
import tabby from "@/assets/images/tabby 1.png";
import emkann from "@/assets/images/emkann.png";
import madfu from "@/assets/images/madfu.png";
import mispay_installment from "@/assets/images/mispay_installment 1.png";
import amwal from "@/assets/images/amwal.png";

const paymentLogos: Record<number, any> = {
  1: tamara,
  2: tabby,
  3: madfu,
  4: mispay_installment,
  5: emkann,
  6: amwal,
};

// تحديث نصوص التسويق لتدعم اللغة الإنجليزية
const paymentMarketingTexts: Record<number, (amount: string, isRTL: boolean) => string> = {
  1: (a, isRTL) => isRTL 
    ? `قسم الفاتورة بـ 3 دفعات بدون فائدة ${a} ريال بعد الخصم. موافقة فورية لعملائنا الكاملين`
    : `Split invoice into 3 interest-free installments ${a} SAR after discount. Instant approval for our premium customers`,
  2: (a, isRTL) => isRTL
    ? `قسم الفاتورة بـ 4 دفعات بدون فائدة ${a} ريال بعد الخصم. موافقة فورية لعملائنا الكاملين`
    : `Split invoice into 4 interest-free installments ${a} SAR after discount. Instant approval for our premium customers`,
  3: (a, isRTL) => isRTL
    ? `4 دفعات بدون فائدة ${a} ريال بعد الخصم. وتوفير رسوم إضافية لعملائنا الكاملين`
    : `4 interest-free installments ${a} SAR after discount. Save additional fees for our premium customers`,
  4: (a, isRTL) => isRTL
    ? `4 دفعات بدون فائدة ${a} ريال بعد الخصم. وتوفير رسوم إضافية لعملائنا الكاملين`
    : `4 interest-free installments ${a} SAR after discount. Save additional fees for our premium customers`,
  5: (a, isRTL) => isRTL
    ? `4 دفعات بدون فائدة ${a} ريال بعد الخصم. وتوفير رسوم إضافية لعملائنا الكاملين`
    : `4 interest-free installments ${a} SAR after discount. Save additional fees for our premium customers`,
  6: (a, isRTL) => isRTL
    ? "استخدم 6 دفعات بدون فائدة وتوفير رسوم. لعملائنا الكاملين"
    : "Use 6 interest-free installments and save fees. For our premium customers",
};

interface OrderSummaryProps {
  onTotalUpdate?: (total: number) => void;
}

export default function OrderSummary({ onTotalUpdate }: OrderSummaryProps) {
  const { 
    items, 
    total, 
    loading, 
    fetchCart,
    finalTotal: storeFinalTotal,
    selectedPaymentId: storeSelectedPaymentId,
    updateFinalTotal 
  } = useCartStore();
  
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';
  
  const [promoCode, setPromoCode] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(storeSelectedPaymentId);
  const [localFinalTotal, setLocalFinalTotal] = useState(storeFinalTotal);

  useEffect(() => {
    if (items.length === 0 && !loading) fetchCart();
  }, [items.length, loading, fetchCart]);

  const subtotal = total || 0;
  
  let calculatedFinalTotal = subtotal; // تم إزالة shipping
  let processingFee = 0;
  let selectedPaymentName = "";

  const paymentMethods = items[0]?.product.options?.[0]?.payment_methods || [];

  if (selectedPaymentId !== null) {
    const selected = paymentMethods.find((p) => p.id === selectedPaymentId);
    if (selected) {
      selectedPaymentName = selected.name;
      processingFee = parseFloat(selected.processing_fee_amount || "0");
      calculatedFinalTotal += processingFee;
    }
  }

  useEffect(() => {
    setLocalFinalTotal(calculatedFinalTotal);
  }, [calculatedFinalTotal]);

  useEffect(() => {
    updateFinalTotal(calculatedFinalTotal, selectedPaymentId);
    if (onTotalUpdate) {
      onTotalUpdate(calculatedFinalTotal);
    }
  }, [calculatedFinalTotal, selectedPaymentId, updateFinalTotal, onTotalUpdate]);

  useEffect(() => {
    if (storeSelectedPaymentId !== selectedPaymentId) {
      setSelectedPaymentId(storeSelectedPaymentId);
    }
  }, [storeSelectedPaymentId]);

  const handlePaymentSelect = (paymentId: number) => {
    setSelectedPaymentId(paymentId);
  };

  const paymentProviders = paymentMethods.map((p) => {
    const amount = parseFloat(p.total_price).toLocaleString(isRTL ? "ar-SA" : "en-US");
    const textFn = paymentMarketingTexts[p.id];
    const description = textFn
      ? p.id === 6
        ? textFn("", isRTL)
        : textFn(amount, isRTL)
      : isRTL
        ? `${p.name} • ${amount} ريال`
        : `${p.name} • ${amount} SAR`;

    return {
      id: p.id,
      name: p.name,
      logo: paymentLogos[p.id] || madfu,
      description,
    };
  });

  if (loading) return <div className="p-10 text-center" dir={isRTL ? "rtl" : "ltr"}>{t("LoadingOrderSummary")}</div>;
  if (items.length === 0) return <div className="p-10 text-center text-gray-500" dir={isRTL ? "rtl" : "ltr"}>{t("NoItemsInCart")}</div>;

  return (
    <div
      className="bg-white p-6 border border-[#EBEBEB] md:px-[70px] mt-9 md:mt-0 px-[20px] rounded-[10px]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h1 className={`mb-6 text-xl font-bold text-blue-500 ${isRTL ? 'text-right' : 'text-left'}`}>
        {t("OrderSummary")}
      </h1>

      {/* كود الخصم */}
      <div className="mb-6 space-y-2">
        <label 
          className={`block text-xs font-medium text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {t("PromoCode")}
        </label>
        <div className="relative">
          <Input
            type="text"
            placeholder={t("EnterCode")}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="h-[64px] border-gray-300"
            dir={isRTL ? "rtl" : "ltr"}
            style={{
              textAlign: isRTL ? 'right' : 'left',
              paddingRight: isRTL ? '100px' : '1rem',
              paddingLeft: isRTL ? '1rem' : '100px'
            }}
          />
          <button 
            className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-[12px]' : 'right-[12px]'} text-[#211C4D] text-xs border border-[#211C4D] rounded-[6px] w-20 h-9 hover:bg-[#211C4D] hover:text-white transition`}
          >
            {t("Apply")}
          </button>
        </div>
      </div>

      {/* تفاصيل الأسعار */}
      <div className="mb-6 space-y-3 text-sm">
        <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-gray-600">{t("Subtotal")}</span>
          <span className="font-semibold">{subtotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("SAR")}</span>
        </div>

        
        {/* <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-gray-600">{t("Shipping")}</span>
          <span className="font-semibold">{shipping.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("SAR")}</span>
        </div> */}

        {processingFee > 0 && (
          <div className={`flex justify-between text-gray-700 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <span>{t("PaymentFees", { paymentName: selectedPaymentName })}</span>
            <span>+{processingFee.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("SAR")}</span>
          </div>
        )}

        <div className={`border-t pt-3 flex justify-between text-lg font-bold ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <span>{t("FinalTotal")}</span>
          <span className="text-orange-600">{calculatedFinalTotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("SAR")}</span>
        </div>
      </div>

      {/* بوابات الدفع */}
      <div className="mb-8 space-y-3">
        {paymentProviders.map((provider) => (
          <div
            key={provider.id}
            onClick={() => handlePaymentSelect(provider.id)}
            className={`flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-all ${
              selectedPaymentId === provider.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <input
              type="radio"
              name="payment"
              checked={selectedPaymentId === provider.id}
              onChange={() => handlePaymentSelect(provider.id)}
              className="h-5 w-5 text-blue-600"
            />

            <div className="flex-1">
              <p className={`text-sm font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{provider.name}</p>
              <p className={`text-xs text-gray-500 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>{provider.description}</p>
            </div>

            <img src={provider.logo} alt={provider.name} className="h-10 w-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}