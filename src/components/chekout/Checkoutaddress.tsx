import OrderSummarySection from "./OrderSummarySection";
import { Button } from "@/components/ui/button";

export default function Checkoutaddress({ 
  onNavigateToNextStep,
  onNavigateBack
}: { 
  onNavigateToNextStep?: () => void;
  onNavigateBack?: () => void;
}) {

  const handleNext = () => {
    // Call the navigation callback to go to the next step
    if (onNavigateToNextStep) {
      onNavigateToNextStep();
    }
  };

  const handleBack = () => {
    // Call the navigation callback to go back to the previous step
    if (onNavigateBack) {
      onNavigateBack();
    }
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
          
          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <Button 
              className="flex-1 h-[56px] bg-[#F3AC5D] rounded-[16px] text-[24px] text-white font-normal hover:bg-[#e09a4d] transition-colors"
              onClick={handleNext}
            >
              التالي
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
        <OrderSummarySection currentStep={1} onNavigateToNextStep={onNavigateToNextStep} />
      </div>
    </div>
  );
}