"use client"

import { X } from "lucide-react"

interface TabbyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TabbyModal({ isOpen, onClose }: TabbyModalProps) {
  if (!isOpen) return null

  const paymentPlans = [
    { installments: 4, monthlyAmount: "337.25", color: "bg-blue-100 text-blue-600" },
    { installments: 6, monthlyAmount: "237.25", color: "bg-green-100 text-green-600" },
    { installments: 9, monthlyAmount: "137.25", color: "bg-yellow-100 text-yellow-600" },
    { installments: 12, monthlyAmount: "90.25", color: "bg-pink-100 text-pink-600" },
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
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
          <button onClick={onClose} className="rounded-full p-1 transition-colors hover:bg-gray-100" aria-label="إغلاق">
            <X className="h-5 w-5 text-gray-600" />
          </button>
          <div className="text-lg font-semibold text-gray-900">tabby</div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Hero Section */}
          <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 to-purple-700">
            <div className="p-8 text-center">
              <div className="mb-4 flex justify-center">
                <img src="/diverse-woman-smiling.png" alt="Woman" className="h-24 w-24 rounded-full object-cover" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">احفظ بشترة سداد أطول</h2>
              <p className="text-sm text-purple-200">قسم مشترياتك بما يصل الى 60 شهر</p>
            </div>
          </div>

          {/* Payment Plans */}
          <div className="mb-6 space-y-3">
            {paymentPlans.map((plan) => (
              <div key={plan.installments} className="flex items-center justify-between rounded-lg border p-4">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{plan.monthlyAmount} ر.س / شهر</div>
                  <div className="text-sm text-orange-500">بدون فوائد أو رسوم</div>
                </div>
                <div className={`rounded-full px-4 py-1.5 text-sm font-semibold ${plan.color}`}>
                  {plan.installments} دفعات
                </div>
              </div>
            ))}
          </div>

          {/* Usage Steps */}
          <div className="mb-6">
            <h3 className="mb-4 text-right text-lg font-semibold text-gray-900">آلية الاستخدام</h3>
            <ol className="space-y-3">
              {usageSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-right text-sm text-gray-700">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Info Sections */}
          <div className="mb-6 space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 text-right text-sm font-semibold text-gray-900">
                <span>📞</span>
                تواصل بنا للمزيد
              </h4>
              <p className="text-right text-xs text-gray-600">
                تواصل معنا للحصول على المزيد من المعلومات حول خيارات الدفع
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 text-right text-sm font-semibold text-gray-900">
                <span>🛡️</span>
                تسوق بأمان مع تابي
              </h4>
              <p className="text-right text-xs text-gray-600">معلوماتك محمية بأعلى معايير الأمان والخصوصية</p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full rounded-lg bg-orange-400 py-3 text-base font-semibold text-white transition-colors hover:bg-orange-500">
            سجل الآن تابي
          </button>
        </div>
      </div>
    </div>
  )
}
