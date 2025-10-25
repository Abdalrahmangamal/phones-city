"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import tamara from '@/assets/images/tamara.png'
import tabby from '@/assets/images/tabby 1.png'
import emkann from '@/assets/images/emkann.png'
import madfu from '@/assets/images/madfu.png'
import mispay_installment from '@/assets/images/mispay_installment 1.png'
import amwal from '@/assets/images/amwal.png'
export default function OrderSummary() {
  const [promoCode, setPromoCode] = useState("")
  const [usePoints, setUsePoints] = useState(false)

  const subtotal = 31200
  const discount = usePoints ? 7730 : 0
  const shipping = 100
  const total = subtotal - discount + shipping

  const paymentProviders = [
    {
      id: "tamara",
      logo:tamara,
      description: "قسم الفاتورة بـ 3 دفعات بدون فائدة 24,000 ريس بعد الخصم. موافقة فورية لعملائنا الكاملين",
    },
    {
      id: "budaey",
      logo:tabby,
      description: "قسم الفاتورة بـ 4 دفعات بدون فائدة 15,920 ريس بعد الخصم. موافقة فورية لعملائنا الكاملين",
    },
    {
      id: "emkan",
      logo: emkann,
      description: "4 دفعات بدون فائدة 15,920 ريس بعد الخصم. وتوفير رسوم إضافية لعملائنا الكاملين",
    },
    {
      id: "madifu",
      logo:madfu,
      description: "4 دفعات بدون فائدة 15,920 ريس بعد الخصم. وتوفير رسوم إضافية لعملائنا الكاملين",
    },
    {
      id: "mis",
      logo:mispay_installment,
      description: "4 دفعات بدون فائدة 15,920 ريس بعد الخصم. وتوفير رسوم إضافية لعملائنا الكاملين",
    },
    {
      id: "armwal",
      logo:amwal,
      description: "استخدم 6 دفعات بدون فائدة وتوفير رسوم. لعملائنا الكاملين",
    },
  ]

  return (
    <div className="  bg-white p-6 border border-[#EBEBEB] md:px-[70px] mt-9 md:mt-0 px-[20px] rounded-[10px] " dir="rtl">
      {/* Header */}
      <h1 className="mb-6 text-start   text-xl font-bold text-blue-500">ملخص الطلب</h1>

      {/* Promo Code Section */}
      <div className="relative mb-4 space-y-2">
        <label className="block text-xs font-medium text-gray-600">رمز الخصم / رمز الترويج</label>
        <Input
          type="text"
          placeholder="الرمز"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="border h-[64px] border-gray-300 text-right text-sm"
        />
<button
  className="text-[#211C4D] text-[12px] border border-[#211C4D] rounded-[6px] w-[76px] h-[32px] flex items-center justify-center absolute top-[40px] end-[20px]
  hover:bg-[#211C4D] hover:text-white transition-all duration-300"
>
  تقدم بطلب
</button>
      </div>

      {/* Points Section */}
      <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 p-4">
        <label className="text-xs text-gray-700">استخدم 60 نقطة واستبدلها بخصم 15%</label>
        <button
          onClick={() => setUsePoints(!usePoints)}
          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
            usePoints ? "bg-blue-400" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              usePoints ? "-translate-x-1" : "-translate-x-5"
            }`}
          />
        </button>
      </div>

      {/* Price Breakdown */}
      <div className="mb-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">المجموع العربي</span>
          <span className="font-medium">{subtotal.toLocaleString("ar-SA")} ريس</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-orange-500">الخصم</span>
            <span className="font-medium text-orange-500">-{discount.toLocaleString("ar-SA")} ريس</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">الشحنة المقررة</span>
          <span className="font-medium">{shipping.toLocaleString("ar-SA")} ريس</span>
        </div>
      </div>

      {/* Total */}
      <div className="mb-6 flex justify-between border-t border-gray-200 pt-3">
        <span className="font-bold text-gray-900">إجمالي</span>
        <span className="font-bold text-gray-900">{total.toLocaleString("ar-SA")} ريس</span>
      </div>

      {/* Payment Providers */}
      <div className="mb-6 space-y-3">
        {paymentProviders.map((provider) => (
          <div key={provider.id} className="flex gap-3 rounded-lg border border-gray-200 p-3">
            <div className="flex-1">
              <p className="text-[12px] leading-relaxed text-gray-600 ">{provider.description}</p>
            </div>
            <div className="flex h-10 w-15 flex-shrink-0 items-center justify-center rounded  text-lg">
              
              <img src={provider.logo} alt="" />
            </div>
          </div>
        ))}
      </div>

      {/* Complete Order Button */}
      {/* <Button className="w-full bg-orange-500 py-3 text-base font-semibold text-white hover:bg-orange-600">
        اتمام الطلب
      </Button> */}
    </div>
  )
}
