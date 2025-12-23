// Summarypayment.tsx
import CheckoutSummarySection from "../summary/CheckoutSummarySection";

interface SummarypaymentProps {
  usePoints: boolean;
  onUsePointsChange: (value: boolean) => void;
}

export default function Summarypayment({ 
  usePoints, 
  onUsePointsChange 
}: SummarypaymentProps) {
  return (
    <div>
      <CheckoutSummarySection 
        usePoints={usePoints}
        onUsePointsChange={onUsePointsChange}
      />
    </div>
  )
}