"use client"

import { X } from "lucide-react"
import groupImage from "@/assets/images/Group 1000005952.png"

interface TamaraModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TamaraModal({ isOpen, onClose }: TamaraModalProps) {
  if (!isOpen) return null

  const paymentPlans = [
    { installments: 4, monthlyAmount: "337.25" },
    { installments: 6, monthlyAmount: "237.25" },
    { installments: 12, monthlyAmount: "137.25" },
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#EDEFF0] shadow-xl"
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
        <div className="p-6">
          {/* Hero Image */}
          <div className="mb-6 flex justify-center">
            <img 
              src={groupImage} 
              alt="tamara illustration" 
              className="h-[424px] w-[560px] rounded-[70px] object-cover"
            />
          </div>

          {/* Payment Plans */}
          <div className="mb-4 space-y-4">
            {paymentPlans.map((plan) => (
              <div key={plan.installments} className="flex items-center justify-between rounded-2xl bg-[#FAFAFA] p-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#211C4D]">{plan.monthlyAmount} رس / شهر</div>
                  <div className="text-base text-[#F3AC5D]">بلا رسوم أو فوائد</div>
                </div>
                <div className="rounded-lg px-4 py-2 text-sm font-bold bg-[#2AA0DC26] text-[#211C4D]">
                  {plan.installments} دفعات
                </div>
              </div>
            ))}
          </div>

          {/* Longer Payment Plans Info */}
          <div className="mb-6 p-6">
            <h3 className="mb-2 text-xl font-bold text-[#211C4D]">خطط دفع أطول كل ما زادت قيمة مشترياتك.</h3>
            <p className="text-[#F3AC5D]">
              ادفع حتى 12 دفعة للطلبات بقيمة 2,500 رس أو أكثر.
            </p>
          </div>

          {/* Additional Payment Plans */}
          <div className="mb-4 space-y-4">
            {paymentPlans.map((plan) => (
              <div key={`additional-${plan.installments}`} className="flex items-center justify-between rounded-2xl bg-[#FAFAFA] p-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#211C4D]">{plan.monthlyAmount} رس / شهر</div>
                  <div className="text-base text-[#F3AC5D]">بلا رسوم أو فوائد</div>
                </div>
                <div className="rounded-lg px-4 py-2 text-sm font-bold bg-[#2AA0DC26] text-[#211C4D]">
                  {plan.installments} دفعات
                </div>
              </div>
            ))}
          </div>

          {/* Usage Steps */}
          <div className="mb-4 rounded-2xl bg-[#FAFAFA] p-6">
            <h3 className="mb-4 text-2xl font-bold text-[#211C4D]">كيف الطريقة؟</h3>
            <div className="space-y-4">
              {usageSteps.map((step) => (
                <div key={step.number} className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2AA0DC26] text-[#211C4D]">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#211C4D]">{step.title}</h4>
                    <p className="text-sm text-[#211C4D80]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Section */}
          <div className="mb-6 rounded-2xl bg-[#FAFAFA] p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-[#2A255B0D] p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#211C4D" strokeWidth="2"/>
                  <path d="M8 12L11 15L16 9" stroke="#211C4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="mb-2 text-xl font-bold text-[#211C4D]">تسوّق بأمان مع تمارا</h4>
                <p className="text-[#211C4D80]">
                  معلوماتك محمية بأعلى معايير الأمان والخصوصية
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full rounded-2xl bg-[#F3AC5D] py-4 text-xl font-bold text-white transition-colors hover:bg-[#e09a4d]">
            سجل مع تمارا
          </button>
        </div>
      </div>
    </div>
  )
}