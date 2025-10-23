import { useState } from "react";
import tamara from "@/assets/images/tamara.png";
import tabby from "@/assets/images/tabby 1.png";
import madfu from "@/assets/images/madfu.png";
import mispay from "@/assets/images/mispay_installment 1.png";
import emkn from "@/assets/images/emkann.png";
import amwal from "@/assets/images/amwal.png";
import { TamaraModal } from "@/components/singleproduct/TamaraModal";
import { TabbyModal } from "@/components/singleproduct/Modelpayment";

export default function OrderSummarySection({ onNavigateToNextStep }: { onNavigateToNextStep?: () => void }) {
  const [isPointsToggleOn, setIsPointsToggleOn] = useState(false);
  const [isTamaraModalOpen, setIsTamaraModalOpen] = useState(false);
  const [isTabbyModalOpen, setIsTabbyModalOpen] = useState(false);

  const paymentMethods = [
    {
      id: "tamara",
      img: tamara,
      name: "تامارا",
      description: "او قسم فاتورتك علي 3 دفعات بقيمه 24,020 رس بدون رسوم تأخير ، متوافقه مع الشريعه الاسلاميه ",
      modal: "tamara"
    },
    {
      id: "tabby",
      img: tabby,
      name: "تابي",
      description: "او قسم فاتورتك علي 4 دفعات بقيمه 15,920 رس بدون رسوم تأخير ، متوافقه مع الشريعه الاسلاميه ",
      modal: "tabby"
    },
    {
      id: "madfu",
      img: madfu,
      name: "مدفوع",
      description: "4 دفعات بقيمة 15,920 رس / شهر، وبدون رسوم تأخير ! ومتوافقه مع الشريعه الاسلاميه ",
      modal: "tabby"
    },
    {
      id: "mispay",
      img: mispay,
      name: "ميسباي",
      description: "4 دفعات بقيمة 15,920 رس /شهر، بدون رسوم تأخير ! ومتوافقه مع الشريعه الاسلاميه ",
      modal: "tabby"
    },
    {
      id: "emkn",
      img: emkn,
      name: "امكن",
      description: "4 دفعات بقيمة 15,920 رس /شهر، بدون رسوم تأخير ! ومتوافقه مع الشريعه الاسلاميه ",
      modal: "tabby"
    },
    {
      id: "amwal",
      img: amwal,
      name: "أمـوال",
      description: "قسّطها إلى 6 دفعات مع البنك وبدون فوائد ، متوافقه مع الشريعه الاسلاميه ",
      modal: "tabby"
    },
  ];

  const openModal = (modalType: string) => {
    if (modalType === "tamara") {
      setIsTamaraModalOpen(true);
    } else {
      setIsTabbyModalOpen(true);
    }
  };

  // Handle complete order - call the navigation callback
  const handleCompleteOrder = () => {
    if (onNavigateToNextStep) {
      onNavigateToNextStep();
    }
  };

  return (
    <>
      <div className="bg-white rounded-[10px] border border-[#0000001A] py-[22px] px-16">
        <h2 className="text-[#211C4D] text-xl font-bold leading-6 mb-10 text-right">ملخص الطلب</h2>
        
        <div className="space-y-6 mb-10">
          <div className="space-y-3">
            <label className="text-[#211C4D] text-sm font-medium block">رمز الخصم / رمز الترويج</label>
            <div className="relative w-full h-16 flex items-center justify-between rounded-[7px] border border-[#00000080] bg-white px-4">
              <input 
                type="text" 
                placeholder="الرمز"
                className="w-full h-full bg-transparent text-right text-[#979797] text-sm outline-none"
              />
              <button 
                className="gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive py-2 has-[>svg]:px-3 w-[76.45px] h-8 bg-white border border-[#211C4D] rounded-[6px] px-2 text-[#211C4D] text-xs font-medium shadow-none hover:bg-white transition-none flex items-center justify-center"
                style={{ lineHeight: '16px' }}
              >
                تقدم بطلب
              </button>
            </div>
          </div>
          
          <div 
            className="flex items-center justify-between p-4 rounded-[8px] border border-[#0000001A]"
            onClick={() => setIsPointsToggleOn(!isPointsToggleOn)}
          >
            <div className="text-[#424242] text-base font-bold leading-6">
              استخدم 60 نقطه واستمتع بخصم 15 %
            </div>
            <div 
              className={`relative inline-block w-12 h-6 rounded-full transition-colors cursor-pointer hover:opacity-90 ${isPointsToggleOn ? 'bg-[#2AA0DC]' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${isPointsToggleOn ? 'left-[26px]' : 'left-1'}`}></div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pb-8">
          <div className="flex justify-between items-center">
            <span className="text-[#211C4D] text-base font-medium">المجموع الفرعي</span>
            <span className="text-[#211C4D] text-base font-medium">١٨٢٬٠٠٠ رس</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[#F3AC5D] text-base font-normal">الخصم</span>
            <span className="text-[#F3AC5D] text-base font-medium">٢٧٬٣٠٠ رس</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[#211C4DB2] text-base font-normal">الضريبة المقدرة</span>
            <span className="text-[#211C4DB2] text-base font-medium">٢٣٬٢٠٥ رس</span>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-t-[#0000001A]">
            <span className="text-[#211C4D] text-base font-medium">إجمالي</span>
            <span className="text-[#211C4D] text-base font-medium">١٧٧٬٩٠٥ رس</span>
          </div>
        </div>
        
        <div className="space-y-4 pt-6">
          {paymentMethods.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border border-[#0000004D]"
            >
              <div className="flex-1">
                <p className="text-sm md:text-[16px] font-[600] text-[#211C4D] leading-6">
                  {item.description}
                  <button
                    onClick={() => openModal(item.modal)}
                    className="underline cursor-pointer decoration-[#211C4D] underline-offset-2 border-none bg-none mr-1"
                    aria-label={`معرفة التفاصيل عن ${item.name}`}
                  >
                    لمعرفة التفاصيل
                  </button>
                </p>
              </div>
              <div className="px-3 py-2 md:px-4 md:py-2 rounded text-sm font-bold text-card">
                <img 
                  src={item.img} 
                  className="w-[80px] md:w-[120px] h-auto" 
                  alt={item.name} 
                />
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs px-4 py-2 has-[>svg]:px-3 w-full mt-8 h-[56px] bg-[#F3AC5D] rounded-[16px] text-[24px] text-white font-normal hover:bg-[#e09a4d] transition-colors"
          onClick={handleCompleteOrder}
        >
          اتمام الطلب
        </button>
      </div>
      
      {/* Modals */}
      <TamaraModal 
        isOpen={isTamaraModalOpen} 
        onClose={() => setIsTamaraModalOpen(false)} 
      />
      <TabbyModal 
        isOpen={isTabbyModalOpen} 
        onClose={() => setIsTabbyModalOpen(false)} 
      />
    </>
  );
}