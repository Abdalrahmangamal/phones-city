import { useCart } from "@/store/cart";
import { Minus, Plus, X } from "lucide-react";
import OrderSummarySection from "./OrderSummarySection";
import { useNavigate } from "react-router-dom";

export default function Cheackoutsummary() {
  const { items, remove, add } = useCart();
  const navigate = useNavigate();

  // Handle quantity changes
  const handleQuantityChange = (id: string, newQty: number) => {
    const item = items.find(item => item.id === id);
    if (item && newQty > 0) {
      add({ ...item, qty: newQty });
    }
  };

  // Handle complete order
  const handleCompleteOrder = () => {
    // Navigate to the next step (address page)
    navigate("/checkout/address");
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
                    
                    <div className="mr-auto text-[#211C4D] font-bold text-base leading-6">
                      {(item.price * item.qty).toLocaleString('ar-SA')} رس
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Complete Order Button - This will be moved to the OrderSummarySection */}
        {/* <button 
          className="w-full mt-8 h-[56px] bg-[#F3AC5D] rounded-[16px] text-[24px] text-white font-normal hover:bg-[#e09a4d] transition-colors"
          onClick={handleCompleteOrder}
        >
          اتمام الطلب
        </button> */}
      </div>
      
      {/* Right Side - Order Summary */}
      <div className="w-full lg:w-[536px]">
        <OrderSummarySection />
      </div>
    </div>
  );
}
