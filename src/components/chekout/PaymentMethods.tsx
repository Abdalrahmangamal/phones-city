import { useState } from "react";
import tamara from "@/assets/images/tamara.png";
import tabby from "@/assets/images/tabby 1.png";
import madfu from "@/assets/images/madfu.png";
import mispay from "@/assets/images/mispay_installment 1.png";
import emkn from "@/assets/images/emkann.png";
import amwal from "@/assets/images/amwal.png";
import { TamaraModal } from "@/components/singleproduct/TamaraModal";
import { TabbyModal } from "@/components/singleproduct/Modelpayment";

export default function PaymentMethods() {
  const [isTamaraModalOpen, setIsTamaraModalOpen] = useState(false);
  const [isTabbyModalOpen, setIsTabbyModalOpen] = useState(false);

  const paymentMethods = [
    {
      id: "tamara",
      img: tamara,
      name: "تامارا",
      description:
        "او قسم فاتورتك علي 3 دفعات بقيمه 24,020 رس بدون رسوم تأخير ، متوافقه مع الشريعه الاسلاميه ",
      modal: "tamara"
    },
    {
      id: "tabby",
      img: tabby,
      name: "تابي",
      description:
        "او قسم فاتورتك علي 4 دفعات بقيمه 15,920 رس بدون رسوم تأخير ، متوافقه مع الشريعه الاسلاميه ",
      modal: "tabby"
    },
    {
      id: "madfu",
      img: madfu,
      name: "مدفوع",
      description:
        "4 دفعات بقيمة 15,920 رس / شهر، وبدون رسوم تأخير ! ومتوافقه مع الشريعه الاسلاميه ",
      modal: "tabby"
    },
    {
      id: "mispay",
      img: mispay,
      name: "ميسباي",
      description:
        "4 دفعات بقيمة 15,920 رس /شهر، بدون رسوم تأخير ! ومتوافقه مع الشريعه الاسلاميه ",
      modal: "tabby"
    },
    {
      id: "emkn",
      img: emkn,
      name: "امكن",
      description:
        "4 دفعات بقيمة 15,920 رس /شهر، بدون رسوم تأخير ! ومتوافقه مع الشريعه الاسلاميه ",
      modal: "tabby"
    },
    {
      id: "amwal",
      img: amwal,
      name: "أمـوال",
      description:
        "قسّطها إلى 6 دفعات مع البنك وبدون فوائد ، متوافقه مع الشريعه الاسلاميه ",
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

  return (
    <>
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