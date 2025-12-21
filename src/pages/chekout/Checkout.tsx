// Checkout.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import order from "@/assets/images/order.png";
import step2 from "@/assets/images/step2.png";
import step3 from "@/assets/images/step3.png";
import Cheackoutsummary from "@/components/chekout/Checkoutsummary";
import Checkoutaddress from "@/components/chekout/Checkoutaddress";
import Checkoutpayment from "@/components/chekout/Checkoutpayment";
import Layout from "@/components/layout/Layout";
import { useCartStore } from '@/store/cartStore/cartStore';
import { useTranslation } from "react-i18next";
import axiosClient from "@/api/axiosClient";
import { useAddressStore } from '@/store/profile/indexStore';
import { Package, Home, ShoppingBag } from "lucide-react"; 

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false); 
  const [orderNumber, setOrderNumber] = useState<string | null>(null); 
  const navigate = useNavigate();

  const { items, total, fetchCart, selectedPaymentId, clearCart } = useCartStore();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const currentLang = i18n.language;

  const {
    selectedAddressId,
    getSelectedAddress,
    addresses,
    deliveryMethod,
  } = useAddressStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const steps = [
    {
      title: t("checkout.steps.orderSummary"),
      number: order,
      componunt: <Cheackoutsummary products={items} total={total} />,
    },
    {
      title: t("checkout.steps.address"),
      number: step2,
      componunt: <Checkoutaddress />,
    },
    {
      title: t("checkout.steps.payment"),
      number: step3,
      componunt: <Checkoutpayment />,
    },
  ];

  const showCustomToast = (type: 'success' | 'error' | 'info', title: string, message?: string, duration: number = 8000) => {
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

      const orderData = {
        ...(currentDeliveryMethod === "delivery" && { location_id: selectedAddressId }),
        payment_method_id: parseInt(selectedPaymentId),
        note: "",
        discount_code: localStorage.getItem('discount_code') || null,
        delivery_method: currentDeliveryMethod === "pickup" ? "store_pickup" : "home_delivery",
      };

      // إرسال الطلب
      const response = await axiosClient.post('/api/v1/orders', orderData);

      // إغلاق toast التحميل
      toast.dismiss(loadingToast);

      // حفظ رقم الطلب وتحديث الحالة
      const orderNum = response.data.order_number || response.data.id;
      setOrderNumber(orderNum);
      setOrderCompleted(true);

      // تنظيف السلة
      if (clearCart) {
        clearCart();
      }

      localStorage.removeItem('discount_code');

      // عرض toast النجاح
      showCustomToast(
        'success',
        isRTL ? 'تم بنجاح!' : 'Order Successful!',
        isRTL 
          ? `تم إتمام الطلب رقم بنجاح `
          : `Order #${orderNum} completed successfully - You can track your orders`
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
      
      console.error('Order submission error:', error);
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

  const handleGoHome = () => {
    navigate(`/${currentLang}`);
  };

  const handleGoToOrders = () => {
    // محاولة الذهاب لطلباتي مع تحديث الصفحة يدوياً
    window.location.href = `/${currentLang}/myorder`;
  };

  // إذا تم اتمام الطلب، اعرض شاشة النجاح
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
              
              {/* <p className="text-gray-500 mb-8">
                {isRTL 
                  ? 'سيصلك تأكيد عبر البريد الإلكتروني قريباً'
                  : 'You will receive an email confirmation shortly'
                }
              </p> */}

              {/* Order Details */}
              {/* <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isRTL ? 'رقم الطلب:' : 'Order Number:'}</span>
                    <span className="font-bold text-[#211C4D]">#{orderNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isRTL ? 'التاريخ:' : 'Date:'}</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{isRTL ? 'الحالة:' : 'Status:'}</span>
                    <span className="font-medium text-green-600">
                      {isRTL ? 'قيد المعالجة' : 'Processing'}
                    </span>
                  </div>
                </div>
              </div> */}

              {/* Instructions */}
              {/* <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {isRTL ? 'الخطوات القادمة' : 'Next Steps'}
                </h3>
                <div className="space-y-3 text-gray-600 text-left max-w-md mx-auto">
                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>
                      {isRTL 
                        ? 'سيصلك تأكيد عبر البريد الإلكتروني'
                        : 'You will receive an email confirmation'
                      }
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>
                      {isRTL 
                        ? 'يمكنك تتبع حالة طلبك من صفحة "طلباتي"'
                        : 'You can track your order status in "My Orders"'
                      }
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>
                      {isRTL 
                        ? 'لأي استفسارات، يرجى التواصل مع خدمة العملاء'
                        : 'For any inquiries, please contact customer service'
                      }
                    </span>
                  </p>
                </div>
              </div> */}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

              {/* Continue Shopping */}
              {/* <div className="mt-10 pt-8 border-t border-gray-200">
                <p className="text-gray-500 mb-4">
                  {isRTL 
                    ? 'هل ترغب في مواصلة التسوق؟'
                    : 'Want to continue shopping?'
                  }
                </p>
                <Button
                  onClick={handleGoHome}
                  variant="ghost"
                  className="text-[#F3AC5D] hover:text-[#e69c4d] hover:bg-[#F3AC5D]/10"
                >
                  {isRTL ? 'تصفح المزيد من المنتجات' : 'Browse More Products'}
                </Button>
              </div> */}
            </div>

            {/* Contact Info */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {isRTL ? 'هل تحتاج مساعدة؟' : 'Need Help?'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isRTL 
                  ? 'فريق خدمة العملاء جاهز لمساعدتك في أي استفسار حول طلبك.'
                  : 'Our customer service team is ready to assist you with any questions about your order.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">
                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                  </h4>
                  <p className="text-[#F3AC5D]">support@example.com</p>
                </div>
                <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">
                    {isRTL ? 'رقم الهاتف' : 'Phone'}
                  </h4>
                  <p className="text-[#F3AC5D]">+123 456 7890</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </Layout>
    );
  }

  //  إذا لم يتم اتمام الطلب، اعرض صفحة checkout العادية
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
                        className={`w-[37px] h-[37px] rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                          activeStep === index
                            ? "bg-orange-400 text-white"
                            : activeStep > index
                            ? "bg-green-500 text-white"
                            : "bg-[#AEAEAE] text-gray-600"
                        }`}
                      >
                        {activeStep > index ? "✓" : <img src={step.number} alt="" />}
                      </div>
                      <span
                        className={`mt-2 text-sm font-semibold ${
                          activeStep === index ? "text-orange-400" : "text-[#939393]"
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
            {steps[activeStep].componunt}
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
              disabled={isSubmitting}
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
    </Layout>
  );
}