import React from "react";
import '@/style.css'
import topYellow from "../../assets/images/Frame 546526596png.png";
import bottomYellow from "../../assets/images/Frame 1321317129.png";
import cup from "../../assets/images/cup.png";
import cart from "../../assets/images/cart.png";
import visa from "../../assets/images/visa.png";
import van from "../../assets/images/van.png";
import hand from "../../assets/images/hand.png";
import box from "../../assets/images/box.png";
import correct from "../../assets/images/correct.png";
import phone from "../../assets/images/phone.png";
import pattern from "../../assets/images/Layer_1.png";
// import '../s24-ultra/s24-responsive.css'; // Import the S24 Ultra specific CSS (now imported globally)

const FrameSection: React.FC = () => {
  const features = [
    {
      icon: cup,
      title: "الجودة العالية",
      description:
        "منتجات أصلية مضمونة 100% مع عناية بأدق التفاصيل لتضمن تجربة شراء آمنة وموثقة.",
    },
    {
      icon: cart,
      title: "تنوع المنتجات",
      description:
        "ستجد لدينا كل ما تبحث عنه هواتف ذكية ,اجهزة لوحيه ,وملحقات واكثر لتلبية جميع احتياجاتك في مكان واحد.",
    },
    {
      icon: visa,
      title: "خطط تقسيط متنوعة",
      description:
        "استمتع بخيارات دفع مرنة تناسب ميزانيتك عبر خطط تقسيط ميسرة بدون تعقيدات وبالتعاون مع منصات موثوقة.",
    },
    {
      icon: van,
      title: "سرعة التوصيل",
      description:
        "نحرص على أن يصلك طلبك في أسرع وقت ممكن مع متابعة دقيقة لحالة الشحن خطوة بخطوة حتى باب منزلك.",
    },
    {
      icon: hand,
      title: "خدمة عملاء مميزة",
      description:
        "فريق متخصص لخدمتك والرد على استفساراتك في أي وقت، لضمان راحتك ورضاك التام.",
    },
    {
      icon: box,
      title: "تخفيضات ونقاط ولاء",
      description:
        "استمتع بعروض وخصومات حصرية بالإضافة إلى برنامج نقاط ولاء يمنحك مكافآت مميزة كلما تسوّقت أكثر.",
    },
    {
      icon: correct,
      title: "متجر موثّق رسميًا",
      description:
        "نحن موثّقون في المركز السعودي للأعمال ومسجّلون في منصّة معروف لضمان مصداقيتنا.",
    },
    {
      icon: phone,
      title: "تطبيق جوال متكامل",
      description:
        "حمّل تطبيقنا على جوالك لتعيش تجربة تسوّق سهلة، سريعة، ومصممة لتكون في متناول يدك دائمًا.",
    },
  ];

  return (
    <div className="w-full min-h-[600px] mt-15 lg:min-h-[800px] relative mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <img
        src={topYellow}
        alt="Top decorative frame"
        className="absolute top-0 left-0 w-[40vw] max-w-[380px] h-auto object-cover object-left z-0"
      />
      <img
        src={bottomYellow}
        alt="Bottom decorative frame"
        className="absolute bottom-0 right-0 w-[50vw] max-w-[550px] md:w-[25vw] lg:w-[30vw] h-auto object-cover z-0"
      />
      <div className="relative z-10 max-w-7xl mx-auto ">
        <div className="flex items-center justify-center lg:justify-center w-full lg:w-auto">
          <img src={pattern} alt="" className="w-12 h-12 lg:w-20 lg:h-20 " />
          <h2 className="text-center text-[#211C4D] text-[clamp(24px,5vw,36px)] font-[700] mb-4 ml-6">
            مميزات المتجر
          </h2>
        </div>

        <h5 className="text-center text-[15px] text-[#211C4D]  font-[700] mb-8">
          "كل ميزة صممناها عشان نخلي تسوقك اسهل , اسرع , اضمن ."
        </h5>
        {/* Added custom class 's24-frame-grid' for S24 Ultra responsive grid */}
        <div className="grid grid-cols-2 pt-8 pb-14 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:!pb-[90px] s24-frame-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-row items-start gap-4 w-full max-w-[350px] min-h-[100px] md:min-h-[130px] mx-auto"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-12 h-12 iconframe sm:w-16 sm:h-16 flex-shrink-0"
              />
              <div className="flex iconframetext  flex-col items-start gap-2">
                <h4 className="text-[#211C4D] text-[clamp(18px,3vw,22px)] font-[700]">
                  {feature.title}
                </h4>
                <p className="text-[#211C4D] text-[clamp(14px,2vw,16px)] font-[400]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameSection;
