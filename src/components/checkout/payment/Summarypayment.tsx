// Summarypayment.tsx
import CheckoutSummarySection from "../summary/CheckoutSummarySection";

interface SummarypaymentProps {
  usePoints: boolean;
  onUsePointsChange: (value: boolean) => void;
  pointsDiscountAmount: number;
  onPointsDiscountChange: (value: number) => void;
}

export default function Summarypayment({
  usePoints,
  onUsePointsChange,
  pointsDiscountAmount,
  onPointsDiscountChange
}: SummarypaymentProps) {
  return (
    <div>
      <CheckoutSummarySection
        usePoints={usePoints}
        onUsePointsChange={onUsePointsChange}
        pointsDiscountAmount={pointsDiscountAmount}
        onPointsDiscountChange={onPointsDiscountChange}
      />
    </div>
  )
}