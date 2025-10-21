"use client"

import { X } from "lucide-react"
import groupImage from "@/assets/images/Group 1000005952.png"
import { ShieldCheck, CheckCircle2, Clock } from "lucide-react";

interface TamaraModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TamaraModal({ isOpen, onClose }: TamaraModalProps) {
  if (!isOpen) return null

  const paymentPlans = [
    { installments: 2, monthlyAmount: "474.50" },
    { installments: 3, monthlyAmount: "316.33" },
    { installments: 4, monthlyAmount: "237.25" },
  ]

  const additionalPaymentPlans = [
    { installments: 6, monthlyAmount: "185.05" },
    { installments: 9, monthlyAmount: "123.37" },
    { installments: 12, monthlyAmount: "92.52" },
  ]

  const usageSteps = [
    {
      number: 1,
      title: "اختر تمارا عند الدفع لتعيين خطة دفع",
      description: "اختر تمارا عند الدفع، وحدد الخطة اللي تناسبك."
    },
    {
      number: 2,
      title: "سدد أول دفعة",
      description: "أدخل بيانات بطاقتك وسدد أول دفعة بسهولة."
    },
    {
      number: 3,
      title: "خلّك متابع دفعاتك",
      description: "تابع وسدد دفعاتك الجاية من تطبيق تمارا."
    },
    {
      number: 4,
      title: "بنكون معك",
      description: "نرسلك تنبيه قبل تاريخ استحقاق كل دفعة عشان ما تتأخر."
    }
  ]

  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-600 mb-3" />,
      title: "100% حماية لمشترياتك",
    },
    {
      icon: <CheckCircle2 className="w-10 h-10 text-teal-600 mb-3" />,
      title: "متوافقة مع الشريعة",
    },
    {
      icon: <Clock className="w-10 h-10 text-pink-600 mb-3" />,
      title: "بدون رسوم تأخير",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#EDEFF0] shadow-xl md:max-w-2xl max-w-[95vw]"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-[#EDEFF0] px-6 py-4">
          <div className="text-2xl font-bold text-[#211C4D]">تمارا</div>
          <button onClick={onClose} className="rounded-full p-1 transition-colors hover:bg-gray-200" aria-label="إغلاق">
            <X className="h-[33px] w-[33px] text-[#211C4D]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Hero Image */}
          <div className="mb-6 flex justify-center">
            <img 
              src={groupImage} 
              alt="tamara illustration" 
              className="h-[200px] md:h-[424px] w-full md:w-[560px] rounded-[30px] md:rounded-[70px] object-cover"
            />
          </div>

          {/* Payment Plans */}
          <div className="mb-4 space-y-4">
            {paymentPlans.map((plan) => (
              <div key={plan.installments} className="flex items-center justify-between rounded-2xl bg-[#FAFAFA] p-4 md:p-6">
                <div className="text-right">
                  <div className="text-xl md:text-2xl font-bold text-[#211C4D]">{plan.monthlyAmount} رس / شهر</div>
                  <div className="text-base text-[#F3AC5D]">بلا رسوم أو فوائد</div>
                </div>
                <div className="rounded-lg px-3 py-1 md:px-4 md:py-2 text-sm font-bold bg-[#2AA0DC26] text-[#211C4D]">
                  {plan.installments} دفعات
                </div>
              </div>
            ))}
          </div>

          {/* Longer Payment Plans Info */}
          <div className="mb-6 p-4 md:p-6">
            <h3 className="mb-2 text-lg md:text-xl font-bold text-[#211C4D]">خطط دفع أطول كل ما زادت قيمة مشترياتك.</h3>
            <p className="text-[#F3AC5D] text-sm md:text-base">
              ادفع حتى 12 دفعة للطلبات بقيمة 2,500 رس أو أكثر.
            </p>
          </div>

          {/* Additional Payment Plans */}
          <div className="mb-4 space-y-4">
            {additionalPaymentPlans.map((plan) => (
              <div key={`additional-${plan.installments}`} className="flex items-center justify-between rounded-2xl bg-[#FAFAFA] p-4 md:p-6">
                <div className="text-right">
                  <div className="text-xl md:text-2xl font-bold text-[#211C4D]">{plan.monthlyAmount} رس / شهر</div>
                  <div className="text-base text-[#F3AC5D]">بلا رسوم أو فوائد</div>
                </div>
                <div className="rounded-lg px-3 py-1 md:px-4 md:py-2 text-sm font-bold bg-[#2AA0DC26] text-[#211C4D]">
                  {plan.installments} دفعات
                </div>
              </div>
            ))}
          </div>

          {/* Usage Steps */}
          <div className="mb-4 rounded-2xl bg-[#FAFAFA] p-4 md:p-6">
            <h3 className="mb-4 text-xl md:text-2xl font-bold text-[#211C4D]">كيف الطريقة؟</h3>
            <div className="space-y-4">
              {usageSteps.map((step) => (
                <div key={step.number} className="flex gap-2 md:gap-3">
                  <div className="flex h-8 w-8 md:h-10 md:w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2AA0DC26] text-[#211C4D] text-sm md:text-base">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-[#211C4D]">{step.title}</h4>
                    <p className="text-xs md:text-sm text-[#211C4D80]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Tamara Section */}
          <div className="mb-6 bg-gray-50 rounded-2xl p-6 text-center max-w-5xl mx-auto shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              ليش تختار تمارا؟
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition"
                >
                  {f.icon}
                  <p className="text-gray-800 font-medium text-base md:text-lg">{f.title}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3">
              خطط الدفع المعروضة تقريبية، وقد تختلف الخطة النهائية حسب أهليتك وتفاصيل
              طلبك، بعض المتاجر أو المنتجات ما تدعم كل خطط الدفع أو خيارات التمويل
              طويلة الأجل من تمارا.
              <br />
              تعتمد الموافقة على التحقق من الأهلية وقد تحتاج دفعة مقدمة، وقد تتغير
              الشروط النهائية، بما فيها قيمة الدفعات الشهرية، بعد مراجعة عملية الدفع،
              وقد لا تشمل الضرائب أو الشحن أو أي رسوم إضافية.
            </p>

            <a
              href="#"
              className="text-indigo-600 hover:underline text-xs md:text-sm font-medium"
            >
              لمزيد من التفاصيل، يرجى زيارة الشروط والأحكام
            </a>

            <div className="flex justify-center gap-3 md:gap-4 mt-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg"
                alt="Apple Pay"
                className="h-4 md:h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/16/Mada_logo.svg"
                alt="Mada"
                className="h-4 md:h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg"
                alt="Amex"
                className="h-4 md:h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                alt="Mastercard"
                className="h-4 md:h-6"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                alt="Visa"
                className="h-4 md:h-6"
              />
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full rounded-2xl bg-[#F3AC5D] py-3 md:py-4 text-lg md:text-xl font-bold text-white transition-colors hover:bg-[#e09a4d]">
            سجل مع تمارا
          </button>
        </div>
      </div>
    </div>
  )
}