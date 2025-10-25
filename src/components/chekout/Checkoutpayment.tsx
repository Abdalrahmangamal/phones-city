import Paymentway from "./payment/Paymentway";
import Summarypayment from "./payment/Summarypayment";

export default function Checkoutpayment() {
  return (
    <div className="grid  xl:px-[90px] px-[0px] grid-cols-1 md:grid-cols-2">
      <div className="lg:pl-[40px] md:pl-[10px]">
        <Summarypayment />
      </div>
      <div>
        <Paymentway />
      </div>
    </div>
  );
}
