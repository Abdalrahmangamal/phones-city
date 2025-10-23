import { useCart } from "@/store/cart";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Cheackoutsummary() {
  const { items, remove, add } = useCart();

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  
  // Calculate discount (fixed at 15% as per design)
  const discount = subtotal * 0.15;
  
  // Calculate tax (estimated at 15% of discounted amount)
  const tax = (subtotal - discount) * 0.15;
  
  // Calculate total
  const total = subtotal - discount + tax;

  // Handle quantity changes
  const handleQuantityChange = (id: string, newQty: number) => {
    const item = items.find(item => item.id === id);
    if (item && newQty > 0) {
      add({ ...item, qty: newQty });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 w-[1120px] mx-auto" dir="rtl">
      {/* Left Side - Cart Items */}
      <div className="w-full lg:w-[536px]">
        <h2 className="text-[#211C4D] text-2xl font-semibold leading-6 mb-10">ملخص السلة</h2>
        
        <div className="space-y-10">
          {items.map((item) => (
            <div key={item.id} className="pb-8 border-b border-b-[#00000080]">
              <div className="flex gap-4">
                {/* Product Image */}
                {item.image && (
                  <div className="w-[72px] h-[72px] flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                
                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="min-w-[106px]">
                      <h3 className="text-[#211C4D] text-base font-medium leading-5 mb-1">{item.name}</h3>
                      <p className="text-[#211C4D] text-sm font-normal leading-6">#{item.productId || item.id}</p>
                    </div>
                    <button 
                      onClick={() => remove(item.id)}
                      className="text-[#211C4D] hover:text-red-500 transition-colors"
                      aria-label="إزالة المنتج"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {/* Counter */}
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-[#00000080] rounded"
                        aria-label="تقليل الكمية"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <div className="w-10 h-8 flex items-center justify-center border border-[#00000080] rounded text-sm font-medium">
                        {item.qty}
                      </div>
                      
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-[#00000080] rounded bg-[#2AA0DC] text-white"
                        aria-label="زيادة الكمية"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="mr-auto text-[#211C4D] font-bold text-base leading-4">
                      {(item.price * item.qty).toLocaleString('ar-SA')} رس
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Side - Order Summary */}
      <div className="w-full lg:w-[536px] h-[1023.0001220703125px]">
        <div className="bg-white rounded-[10px] border border-[#0000001A] py-[22px] px-16 h-full">
          <h2 className="text-[#211C4D] text-xl font-bold leading-4 mb-10 text-right">ملخص الطلب</h2>
          
          <div className="space-y-4 mb-10">
            {/* Discount Code */}
            <div className="space-y-2">
              <label className="text-[#211C4D] text-sm font-medium leading-4 block">رمز الخصم / رمز الترويج</label>
              <div className="flex gap-6">
                <input 
                  type="text" 
                  placeholder="الرمز"
                  className="flex-1 border border-[#0000001A] rounded px-3 py-2 text-right text-[#979797] text-sm leading-6"
                />
                <Button className="bg-white border border-[#0000001A] rounded-[6px] px-2 h-8 text-[#211C4D] text-xs font-medium">
                  تقدم بطلب
                </Button>
              </div>
            </div>
            
            {/* Points Toggle */}
            <div className="flex items-center justify-between p-4 rounded-[8px] border border-[#0000001A]">
              <div className="text-[#424242] text-base font-bold leading-6">
                استخدم 60 نقطه واستمتع بخصم 15 %
              </div>
              <div className="relative inline-block w-12 h-6 bg-gray-300 rounded-full">
                <div className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Pricing Details */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-[#211C4D] text-base font-medium leading-6">المجموع الفرعي</span>
              <span className="text-[#211C4D] text-base font-medium leading-8">
                {subtotal.toLocaleString('ar-SA')} رس
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#F3AC5D] text-base font-normal leading-8">الخصم</span>
              <span className="text-[#F3AC5D] text-base font-medium leading-8">
                {discount.toLocaleString('ar-SA')} رس
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#211C4DB2] text-base font-normal leading-8">الضريبة المقدرة</span>
              <span className="text-[#211C4DB2] text-base font-medium leading-8">
                {tax.toLocaleString('ar-SA')} رس
              </span>
            </div>
            
            <div className="flex justify-between pt-4 border-t border-t-[#0000001A]">
              <span className="text-[#211C4D] text-base font-medium leading-6">إجمالي</span>
              <span className="text-[#211C4D] text-base font-medium leading-8">
                {total.toLocaleString('ar-SA')} رس
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}