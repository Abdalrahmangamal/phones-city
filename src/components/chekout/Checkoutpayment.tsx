// Checkoutpayment.tsx
import Paymentway from "./payment/Paymentway";
import Summarypayment from "./payment/Summarypayment";
import { useTranslation } from "react-i18next";

interface CheckoutpaymentProps {
  usePoints: boolean;
  onUsePointsChange: (value: boolean) => void;
  pointsDiscountAmount: number;
  onPointsDiscountChange: (value: number) => void;
}

export default function Checkoutpayment({
  usePoints,
  onUsePointsChange,
  pointsDiscountAmount,
  onPointsDiscountChange
}: CheckoutpaymentProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className="grid xl:px-[90px] px-4 grid-cols-1 md:grid-cols-2 gap-6"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Summary Section - appears first on mobile, order changes on desktop for RTL */}
      <div className={`lg:ps-[40px] md:ps-[10px] ${isRTL ? 'md:order-2' : 'md:order-1'} order-1`}>
        <Summarypayment
          usePoints={usePoints}
          onUsePointsChange={onUsePointsChange}
          pointsDiscountAmount={pointsDiscountAmount}
          onPointsDiscountChange={onPointsDiscountChange}
        />
      </div>
      {/* Payment Methods Section */}
      <div className={`${isRTL ? 'md:order-1' : 'md:order-2'} order-2`}>
        <Paymentway />
      </div>
    </div>
  );
}