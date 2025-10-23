import OrderSummarySection from "./OrderSummarySection";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Checkoutaddress() {
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the next step (payment page)
    navigate("/checkout/payment");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 w-[1120px] mx-auto" dir="rtl">
      {/* Left Side - Address Form */}
      <div className="w-full lg:w-[536px]">
        <h2 className="text-[#211C4D] text-2xl font-semibold leading-6 mb-10">العنوان</h2>
        
        <div className="space-y-6">
          {/* Form fields would go here */}
          <div className="space-y-4">
            <div>
              <label className="block text-[#211C4D] text-sm font-medium mb-2">الاسم الأول</label>
              <input 
                type="text" 
                className="w-full h-12 border border-[#00000080] rounded-lg px-4 text-right"
                placeholder="الاسم الأول"
              />
            </div>
            
            <div>
              <label className="block text-[#211C4D] text-sm font-medium mb-2">اسم العائلة</label>
              <input 
                type="text" 
                className="w-full h-12 border border-[#00000080] rounded-lg px-4 text-right"
                placeholder="اسم العائلة"
              />
            </div>
            
            <div>
              <label className="block text-[#211C4D] text-sm font-medium mb-2">الدولة/المنطقة</label>
              <select 
                className="w-full h-12 border border-[#00000080] rounded-lg px-4 text-right"
                aria-label="اختر الدولة أو المنطقة"
              >
                <option>المملكة العربية السعودية</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[#211C4D] text-sm font-medium mb-2">المدينة</label>
              <select 
                className="w-full h-12 border border-[#00000080] rounded-lg px-4 text-right"
                aria-label="اختر المدينة"
              >
                <option>جدة</option>
                <option>الرياض</option>
                <option>مكة</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[#211C4D] text-sm font-medium mb-2">الشارع</label>
              <input 
                type="text" 
                className="w-full h-12 border border-[#00000080] rounded-lg px-4 text-right"
                placeholder="الشارع"
              />
            </div>
            
            <div>
              <label className="block text-[#211C4D] text-sm font-medium mb-2">الحي</label>
              <input 
                type="text" 
                className="w-full h-12 border border-[#00000080] rounded-lg px-4 text-right"
                placeholder="الحي"
              />
            </div>
            
            <div>
              <label className="block text-[#211C4D] text-sm font-medium mb-2">رقم الهاتف</label>
              <input 
                type="text" 
                className="w-full h-12 border border-[#00000080] rounded-lg px-4 text-right"
                placeholder="+966"
              />
            </div>
            
            <div>
              <label className="block text-[#211C4D] text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input 
                type="email" 
                className="w-full h-12 border border-[#00000080] rounded-lg px-4 text-right"
                placeholder="example@email.com"
              />
            </div>
          </div>
          
          {/* Next Button */}
          <Button 
            className="w-full mt-8 h-[56px] bg-[#F3AC5D] rounded-[16px] text-[24px] text-white font-normal hover:bg-[#e09a4d] transition-colors"
            onClick={handleNext}
          >
            التالي
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