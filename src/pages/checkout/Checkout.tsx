// Checkout.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import order from "@/assets/images/order.png";
import step2 from "@/assets/images/step2.png";
import step3 from "@/assets/images/step3.png";
import Checkoutsummary from "@/components/checkout/Checkoutsummary";
import Checkoutaddress from "@/components/checkout/Checkoutaddress";
import Checkoutpayment from "@/components/checkout/Checkoutpayment";
import Layout from "@/components/layout/Layout";
import { useCartStore } from '@/store/cartStore/cartStore';
import { useTranslation } from "react-i18next";
import axiosClient from "@/api/axiosClient";
import { useAddressStore } from '@/store/profile/indexStore';
import { Package, Home, ShoppingBag } from "lucide-react";
import BankTransferModal from "@/components/checkout/payment/BankTransferModal";
import { SaudiRiyalIcon } from "@/components/common/SaudiRiyalIcon";

export default function CheckoutPage() {
  const location = useLocation();
  const locationState = (location.state || {}) as { checkoutStep?: number };
  const requestedStep = Number.isInteger(locationState.checkoutStep)
    ? locationState.checkoutStep
    : 0;

  const [activeStep, setActiveStep] = useState(() => Math.max(0, Math.min(2, requestedStep)));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null); // لرفع إثبات الدفع
  const [uploadUrl, setUploadUrl] = useState<string | null>(null); // URL لرفع إثبات الدفع
  const [bankAccountDetails, setBankAccountDetails] = useState<any>(null); // بيانات الحساب البنكي
  const [showBankTransferModal, setShowBankTransferModal] = useState(false); // مودال التحويل البنكي
  const BANK_TRANSFER_ID = 8; // ID التحويل البنكي الحقيقي من الـ API
  const navigate = useNavigate();

  const { items, total, fetchCart, selectedPaymentId, clearCart } = useCartStore();



  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const currentLang = i18n.language;
  const [usePoints, setUsePoints] = useState(false);
  const [pointsDiscountAmount, setPointsDiscountAmount] = useState<number>(0);
  const {
    selectedAddressId,
    getSelectedAddress,
    addresses,
    deliveryMethod,
  } = useAddressStore();

  const getPointsUsagePayload = () => {
    const normalizedPointsDiscount = Math.max(
      0,
      Math.floor(Number.isFinite(pointsDiscountAmount) ? pointsDiscountAmount : 0)
    );
    const shouldUsePoints = usePoints && normalizedPointsDiscount > 0;

    return {
      use_point: shouldUsePoints,
      points_discount: shouldUsePoints ? normalizedPointsDiscount : 0,
    };
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart, usePoints]);

  useEffect(() => {
    setActiveStep(Math.max(0, Math.min(2, requestedStep)));
  }, [requestedStep]);


  const steps = [
    {
      title: t("checkout.steps.orderSummary"),
      number: order,
      componunt: (
        <Checkoutsummary
          products={items}
          total={total}
          usePoints={usePoints}
          onUsePointsChange={setUsePoints}
          pointsDiscountAmount={pointsDiscountAmount}
          onPointsDiscountChange={setPointsDiscountAmount}
        />
      ),
    },
    {
      title: t("checkout.steps.address"),
      number: step2,
      componunt: <Checkoutaddress />,
    },
    {
      title: t("checkout.steps.payment"),
      number: step3,
      componunt: (
        <Checkoutpayment
          usePoints={usePoints}
          onUsePointsChange={setUsePoints}
          pointsDiscountAmount={pointsDiscountAmount}
          onPointsDiscountChange={setPointsDiscountAmount}
        />
      ),
    },
  ];
  const currentStep = steps[activeStep] ?? steps[0];

  const showCustomToast = (type: 'success' | 'error' | 'info', title: string, message?: React.ReactNode, duration: number = 8000) => {
    const ToastContent = () => (
      <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="font-bold text-lg flex items-center gap-2">
          {type === 'success' && '✅'}
          {type === 'error' && '❌'}
          {type === 'info' && 'ℹ️'}
          {title}
        </div>
        {message && <div className="text-sm mt-1 text-gray-600">{message}</div>}
      </div>
    );

    const options = {
      position: "bottom-right" as const,
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light" as const,
      className: type === 'success'
        ? "!rounded-lg !shadow-xl !border !border-green-200 !bg-gradient-to-r !from-green-50 !to-white"
        : type === 'error'
          ? "!rounded-lg !shadow-xl !border !border-red-200 !bg-gradient-to-r !from-red-50 !to-white"
          : "!rounded-lg !shadow-xl !border !border-blue-200 !bg-gradient-to-r !from-blue-50 !to-white",
      bodyClassName: "!p-4",
    };

    switch (type) {
      case 'success':
        toast.success(<ToastContent />, options);
        break;
      case 'error':
        toast.error(<ToastContent />, options);
        break;
      case 'info':
        toast.info(<ToastContent />, { ...options, autoClose: 5000 });
        break;
    }
  };

  const handleCompleteOrder = async () => {
    setIsSubmitting(true);

    try {
      // التحقق من صحة البيانات
      if (!selectedPaymentId) {
        showCustomToast(
          'error',
          isRTL ? 'خطأ في الدفع' : 'Payment Error',
          isRTL ? 'الرجاء اختيار طريقة دفع' : 'Please select a payment method'
        );
        setIsSubmitting(false);
        return;
      }

      if (items.length === 0) {
        showCustomToast(
          'error',
          isRTL ? 'السلة فارغة' : 'Cart is Empty',
          isRTL ? 'الرجاء إضافة منتجات إلى السلة' : 'Please add products to your cart'
        );
        setIsSubmitting(false);
        return;
      }

      const currentDeliveryMethod = deliveryMethod || "delivery";

      if (currentDeliveryMethod === "delivery") {
        const selectedAddress = getSelectedAddress();
        if (!selectedAddressId || !selectedAddress) {
          showCustomToast(
            'error',
            isRTL ? 'عنوان مفقود' : 'Address Missing',
            isRTL ? 'الرجاء اختيار عنوان التوصيل' : 'Please select a delivery address'
          );
          setIsSubmitting(false);
          return;
        }
      }

      // ⭐ للتحويل البنكي: نفتح المودال أولاً بدون إنشاء الطلب
      if (Number(selectedPaymentId) === BANK_TRANSFER_ID) {
        setShowBankTransferModal(true);
        setIsSubmitting(false);
        return; // لا ننشئ الطلب الآن - سينشأ عند الضغط على "دفع الآن" في المودال
      }

      // إظهار toast للتحميل
      const loadingToast = toast.info(
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <div className="flex flex-col">
            <span className="font-semibold">
              {isRTL ? 'جاري معالجة طلبك' : 'Processing your order'}
            </span>
            <span className="text-sm opacity-80">
              {isRTL ? 'يرجى الانتظار...' : 'Please wait...'}
            </span>
          </div>
        </div>,
        {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          className: "!rounded-lg !shadow-xl !bg-gradient-to-r !from-[#F3AC5D] !to-[#211C4D] !text-white",
        }
      );

      // بناء بيانات الطلب مع إضافة use_points
      const pointsUsagePayload = getPointsUsagePayload();
      const orderRequestData = {
        ...(currentDeliveryMethod === "delivery" && { location_id: selectedAddressId }),
        payment_method_id: parseInt(selectedPaymentId),
        note: "",
        discount_code: localStorage.getItem('discount_code') || null,
        delivery_method: currentDeliveryMethod === "pickup" ? "store_pickup" : "home_delivery",
        ...pointsUsagePayload,
      };


      // إرسال الطلب
      const response = await axiosClient.post('/api/v1/orders', orderRequestData);

      // إغلاق toast التحميل
      toast.dismiss(loadingToast);

      // بعض بوابات الدفع (مثل Moyasar) يرجعون بيانات دفع مع رابط تحويل
      const paymentData = response.data?.payment || response.data?.data?.payment;
      const redirectUrl = paymentData?.redirect_url || paymentData?.redirectUrl || paymentData?.url || null;
      const requiresRedirect = paymentData?.requires_redirect || paymentData?.requiresRedirect || false;

      if (requiresRedirect || redirectUrl) {
        // حفظ رقم الطلب جزئياً (قد نعود لاحقاً عبر webhook أو callback)
        const orderNum = response.data.order_number || response.data.id;
        setOrderNumber(orderNum);

        // لا ننظف السلة هنا لأن الدفع سيكمل خارج الموقع
        // افتح رابط الدفع
        window.location.href = redirectUrl as string;
        return;
      }

      // حفظ رقم الطلب وتحديث الحالة للحالات التي لا تحتاج تحويل
      const orderData = response.data.data?.order || response.data.data || response.data;
      const orderNum = orderData?.order_number || response.data.order_number || response.data.id;
      const orderIdFromResponse = orderData?.id || response.data.data?.id || response.data.id || response.data.order_id;


      setOrderNumber(orderNum);
      setOrderId(orderIdFromResponse);

      // التحقق إذا كانت طريقة الدفع هي التحويل البنكي أو تحتاج رفع إثبات دفع
      const requiresProofUpload = paymentData?.requires_proof_upload || false;

      if (Number(selectedPaymentId) === BANK_TRANSFER_ID || requiresProofUpload) {
        // حفظ بيانات التحويل البنكي من الـ API
        const apiUploadUrl = paymentData?.upload_url || null;
        const apiBankDetails = paymentData?.bank_account_details || null;


        setUploadUrl(apiUploadUrl);
        setBankAccountDetails(apiBankDetails);

        // فتح مودال رفع إثبات الدفع
        setShowBankTransferModal(true);
        toast.dismiss(loadingToast);
        return;
      }

      setOrderCompleted(true);

      // تنظيف السلة
      if (clearCart) {
        clearCart();
      }

      localStorage.removeItem('discount_code');

      // عرض toast النجاح مع معلومات النقاط
      let successMessage: React.ReactNode = isRTL
        ? `تم إتمام الطلب رقم ${orderNum} بنجاح`
        : `Order #${orderNum} completed successfully - You can track your orders`;

      if (usePoints && response.data.data?.points_discount) {
        const pointsDiscount = response.data.data.points_discount;
        successMessage = (
          <div className="flex flex-col">
            <span>{isRTL ? `تم إتمام الطلب رقم ${orderNum} بنجاح` : `Order #${orderNum} completed successfully`}</span>
            <span className="flex items-center gap-1 mt-1">
              {isRTL
                ? `تم خصم ${pointsDiscount}`
                : `${pointsDiscount} deducted using points`}
              <SaudiRiyalIcon className="w-3 h-3" />
              {isRTL ? 'باستخدام النقاط' : ''}
            </span>
          </div>
        );
      }

      showCustomToast(
        'success',
        isRTL ? 'تم بنجاح!' : 'Order Successful!',
        successMessage
      );

    } catch (error: any) {
      let errorTitle = isRTL ? 'فشل في الطلب' : 'Order Failed';
      let errorMessage = isRTL ? 'حدث خطأ أثناء معالجة الطلب' : 'An error occurred while processing your order';

      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        const allErrors = Object.values(serverErrors).flat().join(' - ');
        errorMessage = isRTL ? `أخطاء: ${allErrors}` : `Errors: ${allErrors}`;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      showCustomToast('error', errorTitle, errorMessage);

      console.error('Order submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextOrComplete = async () => {
    if (activeStep === steps.length - 1) {
      await handleCompleteOrder();
    } else {
      setActiveStep(prev => Math.min(steps.length - 1, prev + 1));
    }
  };



  const handleUsePointsChange = (value: boolean) => {
    setUsePoints(value);
  };

  // Step validation logic
  const isStepValid = (): boolean => {
    switch (activeStep) {
      case 0: // Order Summary - must have items in cart
        return items.length > 0;
      case 1: // Address - must have address selected (unless pickup)
        const currentDelivery = deliveryMethod || "delivery";
        if (currentDelivery === "pickup") {
          return true; // No address needed for pickup
        }
        return selectedAddressId !== null && selectedAddressId !== undefined;
      case 2: // Payment - must have payment method selected
        return selectedPaymentId !== null && selectedPaymentId !== undefined && selectedPaymentId !== "";
      default:
        return true;
    }
  };

  // ثم استخدم handleUsePointsChange بدلاً من setUsePoints في steps
  const handleGoHome = () => {
    navigate(`/${currentLang}`);
  };

  const handleGoToOrders = () => {
    window.location.href = `/${currentLang}/myorder`;
  };

  // إذا تم إتمام الطلب، اعرض شاشة النجاح
  if (orderCompleted) {
    return (
      <Layout>
        <div className="min-h-screen mt-[60px] bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Success Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                    <Package className="w-10 h-10 text-green-600" />
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {isRTL ? '🎉 تم تأكيد طلبك!' : '🎉 Order Confirmed!'}
              </h1>

              <p className="text-lg text-gray-600 mb-2">
                {isRTL
                  ? `تم إتمام طلبك بنجاح`
                  : `Your order #${orderNumber} has been confirmed`
                }
              </p>

              {usePoints && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 inline-block">
                  <p className="text-blue-700 font-medium">
                    {isRTL ? '✅ تم استخدام النقاط في هذا الطلب' : '✅ Points were used in this order'}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button
                  onClick={handleGoHome}
                  variant="outline"
                  className="flex items-center justify-center gap-2 px-8 py-6 text-lg rounded-xl border-2 border-[#211C4D] text-[#211C4D] hover:bg-[#211C4D] hover:text-white"
                >
                  <Home className="w-5 h-5" />
                  {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
                </Button>

                <Button
                  onClick={handleGoToOrders}
                  className="flex items-center justify-center gap-2 px-8 py-6 text-lg rounded-xl bg-[#F3AC5D] hover:bg-[#e69c4d] text-white"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {isRTL ? 'عرض طلباتي' : 'View My Orders'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // صفحة الـ Checkout العادية
  return (
    <Layout>
      <div className="min-h-screen mt-[60px] bg-white" dir={isRTL ? "rtl" : "ltr"}>
        {/* Stepper */}
        <div className="bg-white flex items-center justify-center py-8">
          <div className="md:w-[600px] w-full px-4">
            <div className="flex items-center justify-around gap-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center justify-center flex-col">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className={`w-[37px] h-[37px] rounded-full flex items-center justify-center font-bold text-lg transition-all ${activeStep === index
                          ? "bg-orange-400 text-white"
                          : activeStep > index
                            ? "bg-green-500 text-white"
                            : "bg-[#AEAEAE] text-gray-600"
                          }`}
                      >
                        {activeStep > index ? "✓" : <img src={step.number} alt="" className="w-6 h-6" />}
                      </div>
                      <span
                        className={`mt-2 text-sm font-semibold text-center ${activeStep === index ? "text-orange-400" : "text-[#939393]"
                          }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="md:w-[150px] w-[50px] h-[2px] mt-5 bg-gray-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full mx-auto px-4 py-8">
          <div className="bg-white rounded-lg lg:p-8 min-h-96">
            {currentStep.componunt}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around gap-4">
            <Button
              variant="outline"
              className="md:w-[400px] w-full h-[56px] bg-[#211C4D] rounded-[16px] flex items-center justify-center text-[24px] text-white hover:bg-[#2A2460] transition-colors"
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0 || isSubmitting}
            >
              {t("checkout.buttons.back")}
            </Button>
            <Button
              className="md:w-[400px] w-full h-[56px] bg-gradient-to-r from-[#F3AC5D] to-[#FF7B54] rounded-[16px] flex items-center justify-center text-[24px] text-white hover:from-[#FF7B54] hover:to-[#F3AC5D] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleNextOrComplete}
              disabled={isSubmitting || !isStepValid()}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  {t("checkout.buttons.processing")}
                </span>
              ) : activeStep === steps.length - 1 ? (
                <span className="flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  {t("checkout.buttons.completeOrder")}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="text-xl">→</span>
                  {t("checkout.buttons.next")}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Bank Transfer Payment Proof Modal */}
      <BankTransferModal
        isOpen={showBankTransferModal}
        onClose={() => {
          // ⭐ فقط نغلق المودال - لا ننشئ الطلب ولا نمسح السلة
          setShowBankTransferModal(false);
        }}
        totalAmount={total}
        orderId={orderId}
        uploadUrl={uploadUrl}
        onSubmit={async () => { }}
        onCreateOrder={async () => {
          // ⭐ إنشاء الطلب عند الضغط على "دفع الآن" في المودال
          try {
            const currentDeliveryMethod = deliveryMethod || "delivery";
            const pointsUsagePayload = getPointsUsagePayload();

            const orderRequestData = {
              ...(currentDeliveryMethod === "delivery" && { location_id: selectedAddressId }),
              payment_method_id: parseInt(selectedPaymentId as string),
              note: "",
              discount_code: localStorage.getItem('discount_code') || null,
              delivery_method: currentDeliveryMethod === "pickup" ? "store_pickup" : "home_delivery",
              ...pointsUsagePayload,
            };


            const response = await axiosClient.post('/api/v1/orders', orderRequestData);

            const orderData = response.data.data?.order || response.data.data || response.data;
            const orderNum = orderData?.order_number || response.data.order_number || response.data.id;
            const orderIdFromResponse = orderData?.id || response.data.data?.id || response.data.id || response.data.order_id;
            const paymentData = response.data?.payment || response.data?.data?.payment;
            const apiUploadUrl = paymentData?.upload_url || null;


            setOrderNumber(orderNum);
            setOrderId(orderIdFromResponse);
            setUploadUrl(apiUploadUrl);

            return {
              orderId: orderIdFromResponse,
              uploadUrl: apiUploadUrl
            };
          } catch (error: any) {
            console.error('Error creating order');
            const errorMessage = error.response?.data?.message ||
              (isRTL ? 'فشل في إنشاء الطلب' : 'Failed to create order');
            showCustomToast('error', isRTL ? 'خطأ' : 'Error', errorMessage);
            return null;
          }
        }}
        onUploadSuccess={() => {
          showCustomToast(
            'success',
            isRTL ? 'تم بنجاح!' : 'Success!',
            isRTL
              ? `تم رفع إثبات الدفع للطلب رقم ${orderNumber} بنجاح`
              : `Payment proof for order #${orderNumber} uploaded successfully`
          );
          setShowBankTransferModal(false);
          setOrderCompleted(true);
          if (clearCart) {
            clearCart();
          }
          localStorage.removeItem('discount_code');
        }}
      />
    </Layout>
  );
}
