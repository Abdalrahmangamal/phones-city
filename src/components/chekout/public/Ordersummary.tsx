"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore/cartStore";
import { Input } from "@/components/ui/input";

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

const paymentMarketingTexts: Record<number, (amount: string) => string> = {
  1: (a) => `قسم الفاتورة بـ 3 دفعات بدون فائدة ${a} ريال بعد الخصم. موافقة فورية لعملائنا الكاملين`,
  2: (a) => `قسم الفاتورة بـ 4 دفعات بدون فائدة ${a} ريال بعد الخصم. موافقة فورية لعملائنا الكاملين`,
  3: (a) => `4 دفعات بدون فائدة ${a} ريال بعد الخصم. وتوفير رسوم إضافية لعملائنا الكاملين`,
  4: (a) => `4 دفعات بدون فائدة ${a} ريال بعد الخصم. وتوفير رسوم إضافية لعملائنا الكاملين`,
  5: (a) => `4 دفعات بدون فائدة ${a} ريال بعد الخصم. وتوفير رسوم إضافية لعملائنا الكاملين`,
  6: () => "استخدم 6 دفعات بدون فائدة وتوفير رسوم. لعملائنا الكاملين",
};

export default function OrderSummary() {
  const { items, total, loading, fetchCart } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [usePoints, setUsePoints] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);

  useEffect(() => {
    if (items.length === 0 && !loading) fetchCart();
  }, [items.length, loading, fetchCart]);

  const totalPoints = items.reduce(
    (sum, item) => sum + (item.product.points || 0) * item.quantity,
    0
  );

  const pointsDiscount = usePoints ? Math.floor(totalPoints / 100) * 100 : 0;
  const shipping = 100;
  const subtotal = total || 0;
  let finalTotal = subtotal - pointsDiscount + shipping;

  let processingFee = 0;
  let selectedPaymentName = "";

  const paymentMethods = items[0]?.product.options?.[0]?.payment_methods || [];

  if (selectedPaymentId !== null) {
    const selected = paymentMethods.find((p) => p.id === selectedPaymentId);
    if (selected) {
      selectedPaymentName = selected.name;
      processingFee = parseFloat(selected.processing_fee_amount || "0");
      finalTotal += processingFee;
    }
  }

  const paymentProviders = paymentMethods.map((p) => {
    const amount = parseFloat(p.total_price).toLocaleString("ar-SA");
    const textFn = paymentMarketingTexts[p.id];
    const description = textFn
      ? p.id === 6
        ? textFn()
        : textFn(amount)
      : `${p.name} • ${amount} ريال`;

    return {
      id: p.id,
      name: p.name,
      logo: paymentLogos[p.id] || madfu,
      description,
    };
  });

  if (loading) return <div className="p-10 text-center" dir="rtl">جاري تحميل ملخص الطلب...</div>;
  if (items.length === 0) return <div className="p-10 text-center text-gray-500" dir="rtl">السلة فارغة</div>;

  return (
    <div
      className="bg-white p-6 border border-[#EBEBEB] md:px-[70px] mt-9 md:mt-0 px-[20px] rounded-[10px]"
      dir="rtl"
    >
      <h1 className="mb-6 text-start text-xl font-bold text-blue-500">ملخص الطلب</h1>

      {/* كود الخصم */}
      <div className="relative mb-6 space-y-2">
        <label className="block text-xs font-medium text-gray-600">رمز الخصم / رمز الترويج</label>
        <div className="relative">
          <Input
            type="text"
            placeholder="أدخل الرمز"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="h-[64px] border-gray-300 text-right pr-24"
          />
          <button className="absolute top-1/2 -translate-y-1/2 end-[12px] text-[#211C4D] text-xs border border-[#211C4D] rounded-[6px] w-20 h-9 hover:bg-[#211C4D] hover:text-white transition">
            تطبيق
          </button>
        </div>
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

      {/* تفاصيل الأسعار */}
      <div className="mb-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">المجموع الفرعي</span>
          <span className="font-semibold">{subtotal.toLocaleString("ar-SA")} ريال</span>
        </div>

        {pointsDiscount > 0 && (
          <div className="flex justify-between text-orange-600">
            <span>خصم النقاط</span>
            <span>-{pointsDiscount.toLocaleString("ar-SA")} ريال</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-600">الشحن</span>
          <span className="font-semibold">{shipping.toLocaleString("ar-SA")} ريال</span>
        </div>

        {processingFee > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>رسوم {selectedPaymentName}</span>
            <span>+{processingFee.toLocaleString("ar-SA")} ريال</span>
          </div>
        )}

        <div className="border-t pt-3 flex justify-between text-lg font-bold">
          <span>الإجمالي النهائي</span>
          <span className="text-orange-600">{finalTotal.toLocaleString("ar-SA")} ريال</span>
        </div>
      </div>

      {/* بوابات الدفع */}
      <div className="mb-8 space-y-3">
        {paymentProviders.map((provider) => (
          <div
            key={provider.id}
            onClick={() => setSelectedPaymentId(provider.id)}
            className={`flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-all ${
              selectedPaymentId === provider.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={selectedPaymentId === provider.id}
              onChange={() => setSelectedPaymentId(provider.id)}
              className="h-5 w-5 text-blue-600"
            />

            <div className="flex-1 text-right">
              <p className="text-sm font-medium">{provider.name}</p>
              <p className="text-xs text-gray-500 mt-1">{provider.description}</p>
            </div>

            <img src={provider.logo} alt={provider.name} className="h-10 w-auto" />
          </div>
        ))}
      </div>

      <button
        disabled={!selectedPaymentId || loading}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-lg transition"
      >
        إتمام الطلب
      </button>
    </div>
  );
}