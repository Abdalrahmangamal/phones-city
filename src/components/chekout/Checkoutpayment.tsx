// Checkoutpayment.tsx
import Paymentway from "./payment/Paymentway";
import Summarypayment from "./payment/Summarypayment";

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
  return (
    <div className="grid xl:px-[90px] px-[0px] grid-cols-1 md:grid-cols-2">
      <div className="lg:pl-[40px] md:pl-[10px]">
        <Summarypayment
          usePoints={usePoints}
          onUsePointsChange={onUsePointsChange}
          pointsDiscountAmount={pointsDiscountAmount}
          onPointsDiscountChange={onPointsDiscountChange}
        />
      </div>
      <div>
        <Paymentway />
      </div>
    </div>
  );
}