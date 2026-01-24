import Ordersummary from "./public/Ordersummary";
import Basketsummary from "./summary/Basketsummary";

interface CheckoutsummaryProps {
  products: any;
  total: number;
  usePoints: boolean;
  onUsePointsChange: (value: boolean) => void;
  pointsDiscountAmount: number;
  onPointsDiscountChange: (value: number) => void;
}

export default function Checkoutsummary({
  products,
  total,
  usePoints,
  onUsePointsChange,
  pointsDiscountAmount,
  onPointsDiscountChange
}: CheckoutsummaryProps) {
  return (
    <div className="grid  xl:px-[90px] px-[0px] grid-cols-1 md:grid-cols-2">
      <div className="lg:pl-[40px] md:pl-[10px]">
        <Basketsummary products={products} total={total} />
      </div>
      <div>
        <Ordersummary
          usePoints={usePoints}
          onUsePointsChange={onUsePointsChange}
          pointsDiscountAmount={pointsDiscountAmount}
          onPointsDiscountChange={onPointsDiscountChange}
        />
      </div>
    </div>
  );
}