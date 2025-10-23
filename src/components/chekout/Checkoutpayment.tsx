import OrderSummarySection from "./OrderSummarySection";
import { Button } from "@/components/ui/button";

export default function Checkoutpayment({ 
  onNavigateBack
}: { 
  onNavigateBack?: () => void;
}) {

  const handleCompletePayment = () => {
    // For now, we'll just show an alert as an example
    alert("تم إتمام الدفع بنجاح!");
    // In a real application, you would redirect to a success page
  };

  const handleBack = () => {
    // Call the navigation callback to go back to the previous step
    if (onNavigateBack) {
      onNavigateBack();
    }
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
          
          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <Button 
              className="flex-1 h-[56px] bg-[#F3AC5D] rounded-[16px] text-[24px] text-white font-normal hover:bg-[#e09a4d] transition-colors"
              onClick={handleCompletePayment}
            >
              إتمام الدفع
            </Button>
            <Button 
              className="flex-1 h-[56px] bg-[#E5E5E5] rounded-[16px] text-[24px] text-[#211C4D] font-normal hover:bg-[#d5d5d5] transition-colors"
              onClick={handleBack}
            >
              رجوع
            </Button>
          </div>
        </div>
      </div>
      
      {/* Right Side - Order Summary */}
      <div className="w-full lg:w-[536px]">
        <OrderSummarySection currentStep={2} />
      </div>
    </div>
  );
}