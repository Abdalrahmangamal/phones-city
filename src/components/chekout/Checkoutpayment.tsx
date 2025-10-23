import OrderSummarySection from "./OrderSummarySection";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Checkoutpayment() {
  const navigate = useNavigate();

  const handleCompletePayment = () => {
    // Navigate to the completion page or show success message
    // For now, we'll just go back to home as an example
    navigate("/");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 w-[1120px] mx-auto" dir="rtl">
      {/* Left Side - Payment Methods */}
      <div className="w-full lg:w-[536px]">
        <h2 className="text-[#211C4D] text-2xl font-semibold leading-6 mb-10">الدفع</h2>
        
        <div className="space-y-6">
          {/* Payment options would go here */}
          <div className="space-y-4">
            <div className="p-4 border border-[#00000080] rounded-lg">
              <div className="flex items-center">
                <input type="radio" id="credit-card" name="payment" className="ml-3" />
                <label htmlFor="credit-card" className="text-[#211C4D]">بطاقة ائتمان</label>
              </div>
            </div>
            
            <div className="p-4 border border-[#00000080] rounded-lg">
              <div className="flex items-center">
                <input type="radio" id="cash" name="payment" className="ml-3" />
                <label htmlFor="cash" className="text-[#211C4D]">الدفع عند الاستلام</label>
              </div>
            </div>
            
            <div className="p-4 border border-[#00000080] rounded-lg">
              <div className="flex items-center">
                <input type="radio" id="bank" name="payment" className="ml-3" />
                <label htmlFor="bank" className="text-[#211C4D]">تحويل بنكي</label>
              </div>
            </div>
          </div>
          
          {/* Complete Payment Button */}
          <Button 
            className="w-full mt-8 h-[56px] bg-[#F3AC5D] rounded-[16px] text-[24px] text-white font-normal hover:bg-[#e09a4d] transition-colors"
            onClick={handleCompletePayment}
          >
            إتمام الدفع
          </Button>
        </div>
      </div>
      
      {/* Right Side - Order Summary */}
      <div className="w-full lg:w-[536px]">
        <OrderSummarySection />
      </div>
    </div>
  );
}