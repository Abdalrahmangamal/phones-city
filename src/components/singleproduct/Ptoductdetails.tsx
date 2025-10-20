import { Plus, Minus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import tamara from "@/assets/images/tamara.png";
import tabby from "@/assets/images/tabby 1.png";
import madfu from "@/assets/images/madfu.png";
import mispay from "@/assets/images/mispay_installment 1.png";
import emkn from "@/assets/images/emkann.png";
import amwal from "@/assets/images/amwal.png";
import { useState } from "react";
import { TabbyModal } from "@/components/singleproduct/Modelpayment";
import { TamaraModal } from "@/components/singleproduct/TamaraModal";
import { Link } from "react-router-dom";

export default function Ptoductdetails() {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [quantity, setQuantity] = useState(1);
  const [isTabbyModalOpen, setIsTabbyModalOpen] = useState(false);
  const [isTamaraModalOpen, setIsTamaraModalOpen] = useState(false);

  const colors = [
    { name: "black", value: "#000000" },
    { name: "gray", value: "#9CA3AF" },
    { name: "pink", value: "#FFC0CB" },
    { name: "white", value: "#FFFFFF" },
    { name: "blue", value: "#1E3A8A" },
  ];
  
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
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-3">
          لابتوبه 15ARP9 من أبل مع شريحة ذكاء اصطناعي، شاشة 15.6 إنش FHD IPS
          100%، ذاكرة RAM 7.743SHS، رايزن SRGB 144Hz
        </h1>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-[18px] h-[18px] md:w-[22px] md:h-[22px] ${
                  star <= 4
                    ? "fill-[#FC9231] text-[#FC9231]"
                    : "fill-none text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs md:text-sm text-muted-foreground">(68 مراجعة)</span>
        </div>
        <p className="text-sm text-primary">أختر لونك</p>
      </div>

      {/* Color Selection */}
      <div className="flex gap-2 md:gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color.name)}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all ${
              selectedColor === color.name
                ? "border-primary scale-110"
                : "border-border hover:border-muted-foreground"
            }`}
            style={{
              backgroundColor: color.value,
              boxShadow:
                color.name === "white" ? "inset 0 0 0 1px #e5e7eb" : "none",
            }}
            aria-label={color.name}
          />
        ))}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 md:gap-3">
        <span className="text-2xl md:text-3xl font-bold text-[#C33104]">1,104 ريس</span>
        <span className="text-base md:text-lg text-muted-foreground line-through">
          1,299 ريس
        </span>
      </div>

      {/* Payment Options */}
      <div className="space-y-3 pt-4 md:pt-6">
        {paymentMethods.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-3 p-3 rounded-lg border border-[#0000004D] lg1024-payment-option">
            <div className="flex-1">
              <p className="text-xs md:text-[16px] font-[600] text-[#211C4D] lg1024-payment-text">
                {item.description}
                <button
                  onClick={() => openModal(item.modal)}
                  className="underline cursor-pointer decoration-[#211C4D] underline-offset-2 border-none bg-none"
                  aria-label={`معرفة التفاصيل عن ${item.name}`}
                >
                  لمعرفة التفاصيل
                </button>
              </p>
            </div>
            <div className="px-3 py-1 md:px-4 md:py-1 rounded text-sm font-bold text-card">
              <img src={item.img} className="w-[80px] md:w-[120px] lg1024-payment-img" alt={item.name} />
            </div>
          </div>
        ))}
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 pt-4 w-full">
        <div className="flex items-center border-2 w-[140px] md:w-[159px] h-[50px] md:h-[62px] border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 h-full hover:bg-accent transition-colors flex items-center justify-center lg1024-quantity-btn"
            aria-label="تقليل الكمية"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-2 py-2 border-x-2 border-border font-bold min-w-[40px] text-center text-sm md:text-base flex items-center justify-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 bg-[#2AA0DC] h-full text-white hover:text-black hover:bg-accent transition-colors flex items-center justify-center lg1024-quantity-btn"
            aria-label="زيادة الكمية"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 md:gap-4">
          <Button
            variant="outline"
            size="lg"
            className="px-4 md:px-6 w-[180px] md:w-[215px] h-[50px] md:h-[64px] border-2 border-black bg-transparent text-xl md:text-[25px] lg1024-cart-btn"
          >
            إضافة للسلة
          </Button>
          <Link 
            className="bg-[#2AA0DC] w-[180px] md:w-[215px] h-[50px] md:h-[64px] hover:bg-primary/90 rounded-[8px] flex items-center justify-center text-primary-foreground font-[600] text-xl md:text-[25px] lg1024-buy-now-btn" 
            to={"/checkout"}
          >
            اشتري الآن
          </Link>
        </div>
      </div>
      <TabbyModal isOpen={isTabbyModalOpen} onClose={() => setIsTabbyModalOpen(false)} />
      <TamaraModal isOpen={isTamaraModalOpen} onClose={() => setIsTamaraModalOpen(false)} />
    </div>
  );
}