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
import { Link } from "react-router-dom";

export default function Ptoductdetails() {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const colors = [
    { name: "black", value: "#000000" },
    { name: "gray", value: "#9CA3AF" },
    { name: "pink", value: "#FFC0CB" },
    { name: "white", value: "#FFFFFF" },
    { name: "blue", value: "#1E3A8A" },
  ];
  const paymentmethod = [
    {
      img: tamara,
      description:
        "او قسم فاتورتك علي 3 دفعات بقيمه 24,020 رس بدون رسوم تأخير ، متوافقه مع الشريعه الاسلاميه ",
    },
    {
      img: tabby,
      description:
        "او قسم فاتورتك علي 4 دفعات بقيمه 15,920 رس بدون رسوم تأخير ، متوافقه مع الشريعه الاسلاميه ",
    },
    {
      img: madfu,
      description:
        "4 دفعات بقيمة 15,920 رس / شهر، وبدون رسوم تأخير ! ومتوافقه مع الشريعه الاسلاميه ",
    },
    {
      img: mispay,
      description:
        "4 دفعات بقيمة 15,920 رس /شهر، بدون رسوم تأخير ! ومتوافقه مع الشريعه الاسلاميه ",
    },
    {
      img: emkn,
      description:
        "4 دفعات بقيمة 15,920 رس /شهر، بدون رسوم تأخير ! ومتوافقه مع الشريعه الاسلاميه ",
    },
    {
      img: amwal,
      description:
        "قسّطها إلى 6 دفعات مع البنك وبدون فوائد ، متوافقه مع الشريعه الاسلاميه ",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground leading-relaxed mb-3">
          لابتوبه 15ARP9 من أبل مع شريحة ذكاء اصطناعي، شاشة 15.6 إنش FHD IPS
          100%، ذاكرة RAM 7.743SHS، رايزن SRGB 144Hz
        </h1>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-[22px] h-[22px] ${
                  star <= 4
                    ? "fill-[#FC9231] text-[#FC9231]"
                    : "fill-none text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">(68 مراجعة)</span>
        </div>
        <p className="text-sm text-primary">أختر لونك</p>
      </div>

      {/* Color Selection */}
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color.name)}
            className={`w-10 h-10 rounded-full border-2 transition-all ${
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
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-[#C33104]">1,104 ريس</span>
        <span className="text-lg text-muted-foreground line-through">
          1,299 ريس
        </span>
      </div>

      {/* Payment Options */}
      <div className="space-y-3 pt-6">
        {paymentmethod.map((item) => (
          <div className="flex items-center  gap-3 p-3 md:h-[72px] h-full rounded-lg border-1 border-[#0000004D]">
            <p className="md:text-[16px] text-[10px] font-[600] text-[#211C4D]">
              {item.description}
              <button
                onClick={() => setIsModalOpen(true)}
                className="  underline cursor-pointer decoration-[#211C4D] underline-offset-2 border-none bg-none"
              >
                لمعرفة التفاصيل
              </button>
            </p>

            <div className="px-4 py-1 rounded text-sm font-bold text-card">
              <img src={item.img} className="w-[120px]" alt="" />
            </div>
          </div>
        ))}
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex md:justify-between justify-center flex-wrap items-center  pt-4">
        <div className="flex items-center border-2 w-[159px] h-[62px] border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 h-full hover:bg-accent transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-6 py-2 border-x-2 border-border font-bold min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 bg-[#2AA0DC] h-full text-white hover:text-black hover:bg-accent transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="px-6 w-[215px] h-[64px] border-2 border-black   bg-transparent text-[25px]"
        >
          إضافة للسلة
        </Button>
        <Link 
          className=" bg-[#2AA0DC] w-[215px] h-[64px] hover:bg-primary/90 rounded-[8px] flex items-center justify-center text-primary-foreground font-[600] text-[25px]" to={"/checkout"}        >
          اشتري الآن
        </Link>
      </div>
      <TabbyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
