"use client"

import { X, ShoppingCart } from "lucide-react"
import frameImage from "@/assets/images/Frame 427318964.png"

interface TabbyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TabbyModal({ isOpen, onClose }: TabbyModalProps) {
  if (!isOpen) return null

  const paymentPlans = [
    { installments: 4, monthlyAmount: "337.25" },
    { installments: 6, monthlyAmount: "237.25" },
    { installments: 9, monthlyAmount: "137.25" },
    { installments: 12, monthlyAmount: "90.25" },
  ]

  const usageSteps = [
    "اختر تابي في صفحة الدفع عند الشراء",
    "أدرج بطاقتك وانتظر الموافقة الفورية",
    "ادفع بسهولة على 4 دفعات. الدفعة الأولى اليوم",
    "سيتم إرسال تذكير لك قبل كل استحقاق دفعة التالية",
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
          <div className="text-2xl font-bold text-[#211C4D]">tabby</div>
          <button onClick={onClose} className="rounded-full p-1 transition-colors hover:bg-gray-200" aria-label="إغلاق">
            <X className="h-[33px] w-[33px] text-[#211C4D]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Hero Image */}
          <div className="mb-6 flex justify-center">
            <img 
              src={frameImage} 
              alt="tabby illustration" 
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

          {/* Usage Steps */}
          <div className="mb-4 rounded-2xl bg-[#FAFAFA] p-6">
            <h3 className="mb-4 text-2xl font-bold text-[#211C4D]">الية الاستخدام</h3>
            <div className="space-y-3">
              {usageSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2AA0DC26] text-xs font-bold text-[#211C4D]">
                    {index + 1}
                  </span>
                  <span className="text-base font-bold text-[#211C4D]">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Section */}
          <div className="mb-4 rounded-2xl bg-[#FAFAFA] p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-[#2A255B0D] p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#211C4D" strokeWidth="2"/>
                  <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="#211C4D" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h4 className="mb-2 text-xl font-bold text-[#211C4D]">يثق بنا الملايين</h4>
                <p className="text-[#211C4D80]">
                  أكثر من 20 مليون متسوق يكتشفون المنتجات ويدفعون كما يناسبهم مع تابي
                </p>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="mb-6 rounded-2xl bg-[#FAFAFA] p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-[#2A255B0D] p-2">
                <ShoppingCart className="h-6 w-6 text-[#211C4D]" />
              </div>
              <div>
                <h4 className="mb-2 text-xl font-bold text-[#211C4D]">تسوّق بأمان مع تابي</h4>
                <p className="text-[#211C4D80]">
                  معلوماتك محمية بأعلى معايير الأمان والخصوصية
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full rounded-2xl bg-[#F3AC5D] py-4 text-xl font-bold text-white transition-colors hover:bg-[#e09a4d]">
            سجل مع تابي
          </button>
        </div>
      </div>
    </div>
  )
}