import Chooseaddress from "./address/Chooseaddress";
import Ordersummary from "./public/Ordersummary";

export default function Checkoutaddress() {
  return (
<div className="grid  lg:px-[90px] px-[0px] grid-cols-1 md:grid-cols-2">
      <div className="lg:pl-[40px] md:pl-[10px]">
        <Chooseaddress/>
      </div>
      <div>
        <Ordersummary />
      </div>
    </div>  )
}