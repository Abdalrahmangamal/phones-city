import Ordersummary from "./public/Ordersummary";
import Basketsummary from "./summary/Basketsummary";

export default function Cheackoutsummary({products,total}: any) {
  return (
    <div className="grid  xl:px-[90px] px-[0px] grid-cols-1 md:grid-cols-2">
      <div className="lg:pl-[40px] md:pl-[10px]">
        <Basketsummary  products={products} total={total}/> 
      </div>
      <div>
        <Ordersummary />
      </div>
    </div>
  );
}
