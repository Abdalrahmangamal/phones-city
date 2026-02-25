// Ordersummary.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore/cartStore";
import { Pencil } from "lucide-react";
import BankTransferModal from "@/components/checkout/payment/BankTransferModal";

import { useTranslation } from "react-i18next";

import tamara from "@/assets/images/tamara.png";
import tabby from "@/assets/images/tabby 1.png";
import emkann from "@/assets/images/emkann.png";
import madfu from "@/assets/images/madfu.png";

import amwal from "@/assets/images/amwal.png";
import moyassarlogo from "@/assets/images/moyassarlogo.png";
import footerLogo from "@/assets/images/footer-logo.svg";

const paymentLogos: Record<number, any> = {
  1: tamara,
  2: tabby,
  3: madfu,
  5: emkann,
  6: amwal,
  7: moyassarlogo,
};

import { SaudiRiyalIcon } from "@/components/common/SaudiRiyalIcon";

// تحديث نصوص التسويق لتدعم اللغة الإنجليزية
const paymentMarketingTexts: Record<number, (amount: string, isRTL: boolean) => React.ReactNode> = {
  1: (a, isRTL) => isRTL
    ? <span>قسم الفاتورة بـ 3 دفعات بدون فائدة {a} <SaudiRiyalIcon className="w-3 h-3 inline pb-0.5" /> بعد الخصم. موافقة فورية لعملائنا الكاملين</span>
    : <span>Split invoice into 3 interest-free installments {a} <SaudiRiyalIcon className="w-3 h-3 inline pb-0.5" /> after discount. Instant approval for our premium customers</span>,
  2: (a, isRTL) => isRTL
    ? <span>قسم الفاتورة بـ 4 دفعات بدون فائدة {a} <SaudiRiyalIcon className="w-3 h-3 inline pb-0.5" /> بعد الخصم. موافقة فورية لعملائنا الكاملين</span>
    : <span>Split invoice into 4 interest-free installments {a} <SaudiRiyalIcon className="w-3 h-3 inline pb-0.5" /> after discount. Instant approval for our premium customers</span>,
  3: (a, isRTL) => isRTL
    ? <span>4 دفعات بدون فائدة {a} <SaudiRiyalIcon className="w-3 h-3 inline pb-0.5" /> بعد الخصم. وتوفير رسوم إضافية لعملائنا الكاملين</span>
    : <span>4 interest-free installments {a} <SaudiRiyalIcon className="w-3 h-3 inline pb-0.5" /> after discount. Save additional fees for our premium customers</span>,

  5: (a, isRTL) => isRTL
    ? <span>4 دفعات بدون فائدة {a} <SaudiRiyalIcon className="w-3 h-3 inline pb-0.5" /> بعد الخصم. وتوفير رسوم إضافية لعملائنا الكاملين</span>
    : <span>4 interest-free installments {a} <SaudiRiyalIcon className="w-3 h-3 inline pb-0.5" /> after discount. Save additional fees for our premium customers</span>,
  6: (a, isRTL) => isRTL
    ? "استخدم 6 دفعات بدون فائدة وتوفير رسوم. لعملائنا الكاملين"
    : "Use 6 interest-free installments and save fees. For our premium customers",
};

const INSTALLMENT_METHOD_IDS = new Set([1, 2, 3, 4, 5, 6]);

const isInstallmentMethod = (method: any) => {
  const id = Number(method?.id);
  const name = String(method?.name || "").toLowerCase();

  if (INSTALLMENT_METHOD_IDS.has(id)) return true;

  // Keep Moyasar (7) and bank transfer (8) outside installment classification.
  if (id === 7 || id === 8) return false;

  return /(tamara|tabby|emkan|emkann|amwal|mispay|تمارا|تابي|إمكان|امكان|أموال|اموال)/i.test(name);
};

const extractItemPaymentMethods = (item: any): any[] => {
  const selectedOptionId = item?.product_option?.id || item?.product_option_id;
  const matchedOption = Array.isArray(item?.product?.options)
    ? item.product.options.find((opt: any) => opt?.id === selectedOptionId)
    : undefined;

  const candidates = [
    item?.payment_methods,
    item?.product_option?.payment_methods,
    matchedOption?.payment_methods,
    item?.product?.payment_methods,
    item?.product?.options?.[0]?.payment_methods,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length > 0) {
      return candidate.filter(Boolean);
    }
  }

  return [];
};

interface OrderSummaryProps {
  onTotalUpdate?: (total: number) => void;
  usePoints?: boolean;
  onUsePointsChange?: (value: boolean) => void;
  pointsDiscountAmount?: number;
  onPointsDiscountChange?: (value: number) => void;
}

export default function OrderSummary({
  onTotalUpdate,
  usePoints,
  onUsePointsChange,
  pointsDiscountAmount,
  onPointsDiscountChange
}: OrderSummaryProps) {
  const {
    items,

    loading,
    fetchCart,
    selectedPaymentId, // Directly use selectedPaymentId from store
    updateFinalTotal
  } = useCartStore();

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';

  // State للتحويل البنكي المباشر
  const [isBankTransferModalOpen, setIsBankTransferModalOpen] = useState(false);
  const [isBankTransferSelected, setIsBankTransferSelected] = useState(false);
  const BANK_TRANSFER_ID = 8; // ID التحويل البنكي الحقيقي من الـ API


  useEffect(() => {
    if (items.length === 0 && !loading) fetchCart();
  }, [items.length, loading, fetchCart]);

  // Calculate subtotal from item subtotals (price before tax)
  const subtotal = Number(items.reduce((acc, item) => acc + (item.subtotal || 0), 0).toFixed(2));

  const paymentMethodsByItem = items.map((item: any) => extractItemPaymentMethods(item));
  const hasPaymentMethodsForAllItems =
    items.length > 0 && paymentMethodsByItem.every((methods) => Array.isArray(methods) && methods.length > 0);

  const legacyPaymentMethods = (items[0]?.product as any)?.options?.[0]?.payment_methods || [];

  const paymentMethods = (() => {
    if (!hasPaymentMethodsForAllItems) {
      return Array.isArray(legacyPaymentMethods) ? legacyPaymentMethods : [];
    }

    const methodMap = new Map<number, any>();
    paymentMethodsByItem.forEach((methods) => {
      methods.forEach((method) => {
        const id = Number(method?.id);
        if (Number.isFinite(id) && !methodMap.has(id)) {
          methodMap.set(id, method);
        }
      });
    });

    let commonIds = new Set<number>(
      paymentMethodsByItem[0]
        .map((method) => Number(method?.id))
        .filter((id) => Number.isFinite(id))
    );

    for (let i = 1; i < paymentMethodsByItem.length; i += 1) {
      const currentIds = new Set<number>(
        paymentMethodsByItem[i]
          .map((method) => Number(method?.id))
          .filter((id) => Number.isFinite(id))
      );
      commonIds = new Set([...commonIds].filter((id) => currentIds.has(id)));
    }

    return [...commonIds].map((id) => methodMap.get(id)).filter(Boolean);
  })();

  const itemHasInstallmentSupport = paymentMethodsByItem.map((methods) =>
    methods.some((method) => isInstallmentMethod(method))
  );
  const hasAnyInstallmentInCart = itemHasInstallmentSupport.some(Boolean);
  const hasItemsWithoutInstallment = itemHasInstallmentSupport.some((value) => !value);
  const commonInstallmentMethods = paymentMethods.filter(
    (method: any) => Number(method?.id) !== BANK_TRANSFER_ID && isInstallmentMethod(method)
  );
  const showInstallmentUnsupportedMessage =
    hasPaymentMethodsForAllItems &&
    items.length > 1 &&
    hasAnyInstallmentInCart &&
    (hasItemsWithoutInstallment || commonInstallmentMethods.length === 0);
  const bankTransferSupported = hasPaymentMethodsForAllItems
    ? paymentMethods.some((method: any) => Number(method?.id) === BANK_TRANSFER_ID)
    : true;

  let calculatedFinalTotal = subtotal; // تم إزالة shipping
  let processingFee = 0;
  let selectedPaymentName = "";

  if (selectedPaymentId !== null) {
    const selected = paymentMethods.find((p: any) => p.id === selectedPaymentId);
    if (selected) {
      selectedPaymentName = selected.name;
      processingFee = parseFloat(selected.processing_fee_amount || "0");
      calculatedFinalTotal += processingFee;
    }
  }



  useEffect(() => {
    updateFinalTotal(calculatedFinalTotal, selectedPaymentId);
    if (onTotalUpdate) {
      onTotalUpdate(calculatedFinalTotal);
    }
  }, [calculatedFinalTotal, selectedPaymentId, updateFinalTotal, onTotalUpdate]);

  useEffect(() => {
    if (selectedPaymentId === null || selectedPaymentId === undefined) return;

    const availableIds = new Set(
      paymentMethods
        .map((method: any) => Number(method?.id))
        .filter((id: number) => Number.isFinite(id))
    );

    if (!availableIds.has(Number(selectedPaymentId))) {
      setIsBankTransferSelected(false);
      updateFinalTotal(subtotal, null);
    }
  }, [paymentMethods, selectedPaymentId, subtotal, updateFinalTotal]);

  // Removed broken useEffect trying to sync selectedPaymentId


  const handlePaymentSelect = (paymentId: number) => {
    // إذا كان التحويل البنكي
    if (paymentId === BANK_TRANSFER_ID) {
      if (!bankTransferSupported) return;
      setIsBankTransferSelected(true);
      updateFinalTotal(subtotal, BANK_TRANSFER_ID);
      return;
    }

    setIsBankTransferSelected(false);
    const selected = paymentMethods.find((p: any) => p.id === paymentId);
    if (selected) {
      const processingFee = parseFloat(selected.processing_fee_amount || "0");
      const newFinalTotal = subtotal + processingFee;

      // تحديث الـ store مرة واحدة فقط
      updateFinalTotal(newFinalTotal, paymentId);
    } else {
      // لو المستخدم اختار "إلغاء" أو بدون رسوم
      updateFinalTotal(subtotal, null);
    }
  };

  const handleBankTransferSubmit = async (file: File, bankDetails: any) => {
    // TODO: إرسال البيانات للـ Backend
    // يمكن إضافة الـ API call هنا
  };

  // استثناء التحويل البنكي من القائمة العادية لأنه له قسم خاص
  const paymentProviders = paymentMethods
    .filter((p: any) => p.id !== BANK_TRANSFER_ID)
    .map((p: any) => {
      const parsedAmount = Number.parseFloat(String(p.total_price ?? subtotal).replace(/,/g, ""));
      const safeAmount = Number.isFinite(parsedAmount) ? parsedAmount : subtotal;
      const amount = safeAmount.toLocaleString(isRTL ? "ar-SA" : "en-US");
      const textFn = paymentMarketingTexts[p.id];
      const description = textFn
        ? p.id === 6
          ? textFn("", isRTL)
          : textFn(amount, isRTL)
        : isRTL
          ? <span className="flex items-center gap-1">{p.name} • {amount} <SaudiRiyalIcon className="w-3 h-3" /></span>
          : <span className="flex items-center gap-1">{p.name} • {amount} <SaudiRiyalIcon className="w-3 h-3" /></span>;

      return {
        id: p.id,
        name: p.name,
        logo: paymentLogos[p.id] || madfu,
        description,
        isInstallment: isInstallmentMethod(p),
      };
    });

  if (loading) return <div className="p-10 text-center" dir={isRTL ? "rtl" : "ltr"}>{t("LoadingOrderSummary")}</div>;
  if (items.length === 0) return <div className="p-10 text-center text-gray-500" dir={isRTL ? "rtl" : "ltr"}>{t("NoItemsInCart")}</div>;

  return (
    <div
      className="bg-white p-4 sm:p-6 border border-[#EBEBEB] md:px-[70px] mt-6 md:mt-0 px-4 rounded-[10px] w-full"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h1 className={`mb-6 text-xl font-bold text-blue-500 ${isRTL ? 'text-right' : 'text-left'}`}>
        {t("OrderSummary")}
      </h1>

      {/* كود الخصم */}
      {/* <div className="mb-6 space-y-2">
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
      </div> */}

      {/* تفاصيل الأسعار */}
      <div className="mb-6 space-y-3 text-sm">
        <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-gray-600">{t("Subtotal")}</span>
          <span className="font-semibold flex items-center gap-1">{subtotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} <SaudiRiyalIcon className="w-3.5 h-3.5" /></span>
        </div>

        {/* رسوم بوابة الدفع - محذوفة من العرض ولكن محسوبة في المجموع النهائي */}
        {/* {processingFee > 0 && (
          <div className={`flex justify-between text-gray-700 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <span>{t("PaymentFees", { paymentName: selectedPaymentName })}</span>
            <span className="flex items-center gap-1">+{processingFee.toLocaleString(isRTL ? "ar-SA" : "en-US")} <SaudiRiyalIcon className="w-3.5 h-3.5" /></span>
          </div>
        )} */}

        {/* <div className={`border-t pt-3 flex justify-between text-lg font-bold ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <span>{t("FinalTotal")}</span>
          <span className="text-orange-600">{calculatedFinalTotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} {t("SAR")}</span>
        </div> */}
      </div>

      {/* بوابات الدفع */}
      <div className="mb-8 space-y-3">
        <h2 className="text-lg font-semibold mb-3">{t("PaymentMethods")}</h2>
        {showInstallmentUnsupportedMessage && (
          <div className={`p-3 sm:p-4 rounded-lg border border-amber-200 bg-amber-50 ${isRTL ? "text-right" : "text-left"}`}>
            <p className="text-amber-800 text-sm sm:text-base font-medium">
              {t("checkoutSummary.installmentUnavailableForSomeItems")}
            </p>
          </div>
        )}
        {paymentProviders.map((provider: any) => (
          <div
            key={provider.id}
            onClick={() => handlePaymentSelect(provider.id)}
            className={`grid grid-cols-[auto_1fr_auto] items-start sm:items-center gap-3 sm:gap-4 rounded-lg border p-3 sm:p-4 cursor-pointer transition-all ${selectedPaymentId === provider.id
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
              className="h-5 w-5 text-blue-600 mt-0.5 sm:mt-0"
              aria-label={provider.name}
            />

            <div className="min-w-0">
              <p className={`text-sm font-medium break-words ${isRTL ? 'text-right' : 'text-left'}`}>{provider.name}</p>
              <p className={`text-xs text-gray-500 mt-1 leading-5 break-words ${isRTL ? 'text-right' : 'text-left'}`}>{provider.description}</p>
            </div>

            <img src={provider.logo} alt={provider.name} className="h-8 sm:h-10 w-auto max-w-[84px] sm:max-w-[100px] object-contain self-center" />
          </div>
        ))}

        {/* التحويل البنكي المباشر */}
        {bankTransferSupported && (
          <div
            onClick={() => handlePaymentSelect(BANK_TRANSFER_ID)}
            className={`grid grid-cols-[auto_1fr_auto] items-start sm:items-center gap-3 sm:gap-4 rounded-lg border p-3 sm:p-4 cursor-pointer transition-all ${(selectedPaymentId === BANK_TRANSFER_ID || isBankTransferSelected)
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-400"
              }`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <input
              type="radio"
              name="payment"
              checked={selectedPaymentId === BANK_TRANSFER_ID || isBankTransferSelected}
              onChange={() => handlePaymentSelect(BANK_TRANSFER_ID)}
              className="h-5 w-5 text-blue-600 mt-0.5 sm:mt-0"
              aria-label={isRTL ? "التحويل البنكي المباشر" : "Direct Bank Transfer"}
            />

            <div className="min-w-0">
              <p
                className="text-sm sm:text-base font-medium sm:font-normal leading-5 break-words"
                style={{ fontFamily: 'Roboto', color: '#211C4D' }}
              >
                {isRTL ? "التحويل البنكي المباشر" : "Direct Bank Transfer"}
              </p>
              <p className={`text-[11px] sm:text-xs text-gray-500 mt-1 ${isRTL ? "text-right" : "text-left"}`}>
                {isRTL ? "ارفع إيصال التحويل بعد إتمام الدفع" : "Upload transfer receipt after payment"}
              </p>
            </div>

            <div className="flex items-center gap-2 self-center">
              {/* أيقونة البنك */}
              <div className="w-9 h-9 sm:w-[38px] sm:h-[38px] flex items-center justify-center bg-gray-100 rounded-lg shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7V10H22V7L12 2Z" stroke="#211C4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 10V20" stroke="#211C4D" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M9 10V20" stroke="#211C4D" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 10V20" stroke="#211C4D" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M20 10V20" stroke="#211C4D" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M2 20H22" stroke="#211C4D" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* زر القلم للتعديل */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePaymentSelect(BANK_TRANSFER_ID);
                  setIsBankTransferModalOpen(true);
                }}
                className="w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-gray-200 rounded transition shrink-0"
                title={isRTL ? "تعديل معلومات الحساب" : "Edit account info"}
              >
                <Pencil className="w-4 h-4" style={{ color: '#211C4D' }} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Madfu Notification */}
      <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center text-center gap-2 sm:gap-3">
        <img src={footerLogo} alt="Madfu" className="h-7 sm:h-8 max-w-full object-contain" />
        <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed px-1">
          {t("SoonMadfu")}
        </p>
      </div>


      {/* Bank Transfer Modal */}
      <BankTransferModal
        isOpen={isBankTransferModalOpen}
        onClose={() => setIsBankTransferModalOpen(false)}
        totalAmount={calculatedFinalTotal}
        onSubmit={handleBankTransferSubmit}
      />
    </div >
  );
}
