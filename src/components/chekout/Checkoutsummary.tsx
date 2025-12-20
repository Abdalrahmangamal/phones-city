import Ordersummary from "./public/Ordersummary";
import Basketsummary from "./summary/Basketsummary";
import { useState } from "react";

export default function Cheackoutsummary({products,total}: any) {
  const [finalTotal, setFinalTotal] = useState(total);

  return (
    <div className="grid xl:px-[90px] px-[0px] grid-cols-1 md:grid-cols-2">
      <div className="lg:pl-[40px] md:pl-[10px]">
        <Basketsummary products={products} total={finalTotal}/> 
      </div>
      <div>
        <Ordersummary onTotalUpdate={setFinalTotal} />
      </div>
    </div>
  );
}