import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import heroImage from "../assets/images/Frame 1321317076.png";
import serviceIcon1 from "../assets/images/Group 1000005944.png";
import serviceIcon2 from "../assets/images/Hourglass And Stack of Coins For Installment.png";
import serviceIcon3 from "../assets/images/isometric view of laptop, tablet, notebook, smartwatch.png";
import serviceIcon4 from "../assets/images/documentation.png";
import serviceIcon5 from "../assets/images/planet.png";
import serviceIcon6 from "../assets/images/Engineer working with robotic arm.png";

export default function Servces() {
  const { t } = useTranslation();
  
  return (
    <div>
      <Layout />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div 
          className="w-full rounded-lg mb-16 relative"
          style={{
            width: "1264px",
            height: "347px",
            borderRadius: "8px",
            opacity: 1,
            overflow: "hidden"
          }}
        >
          {/* Background Image */}
          <img 
            src={heroImage} 
            alt="كل ما تحتاجه في مدينه الهواتف" 
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(33, 28, 77, 0) 1.44%, rgba(33, 28, 77, 0.2) 32.21%, #211C4D 100%)"
            }}
          ></div>
          
          {/* Text Content - With increased right padding and no box-shadow */}
          <div className="absolute inset-0 flex flex-col items-end justify-center text-right" style={{ width: "458px", height: "201px", top: "37px", left: "752px", paddingRight: "40px" }}>
            <h1 
              className="text-white font-roboto font-bold text-5xl leading-[68px] mb-4"
            >
              كل ما تحتاجه في مدينه الهواتف
            </h1>
            <p 
              className="text-white font-roboto font-bold text-base leading-6"
            >
              استمتع بتجربة استثنائية معاحسن العروض بأفضل الأسعار وخدمة ما بعد البيع المميزة
            </p>
          </div>
        </div>

        {/* Services Description - Without align-items: flex-end */}
        <div className="w-full mb-10" style={{ height: "100px" }}>
          <div className="flex flex-col pr-20">
            <h2 className="text-[#211C4D] font-roboto font-bold text-[40px] leading-9 mb-2">
              في مدينه الهواتف
            </h2>
            <p className="text-[#211C4DCC] font-roboto font-normal text-2xl leading-10 text-right">
              نوفر لك تجربة شراء وصيانة متكاملة في مكان واحد لتلبية جميع احتياجاتك في عالم الهواتف و الاجهزة الذكية:
            </p>
          </div>
        </div>

        {/* First Row of Services Cards - Centered within container */}
        <div className="w-full mb-16 flex justify-center" style={{ height: "484px" }}>
          <div className="flex gap-[54px]">
            {/* Service Card 3 - Electronics Sales (Now first) */}
            <div 
              className="rounded-lg p-8 relative overflow-hidden"
              style={{
                width: "392px",
                height: "484px",
                borderRadius: "8px",
                background: "linear-gradient(180deg, #F9F9F9 0%, #CBD7F9 100%)",
                boxShadow: "0px 8px 8px 0px #0000000D"
              }}
            >
              {/* Decorative Elements - Clipped to card boundaries */}
              <div 
                className="absolute rounded-full"
                style={{
                  width: "288px",
                  height: "288px",
                  top: "-84px",
                  left: "-97px",
                  background: "#211C4D1A",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              <div 
                className="absolute rounded-full"
                style={{
                  width: "163px",
                  height: "143px",
                  top: "100px",
                  left: "313px",
                  background: "#211C4D14",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              
              {/* Card Content - Centered within the card */}
              <div className="flex flex-col items-center justify-center h-full">
                {/* Service Icon/Image */}
                <div className="mb-6">
                  <img 
                    src={serviceIcon3} 
                    alt="بيع الأجهزة الاكترونية و الأجهزه الكهربائية المنزلية" 
                    className="w-[317px] h-[210px] object-contain"
                  />
                </div>
                
                {/* Service Title */}
                <h3 
                  className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-2 text-center"
                  style={{
                    width: "328px",
                    height: "28px"
                  }}
                >
                  بيع الأجهزة الاكترونية و الأجهزه الكهربائية المنزلية
                </h3>
                
                {/* Service Description */}
                <p 
                  className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center"
                  style={{
                    width: "357px",
                    height: "24px"
                  }}
                >
                  ( جوالات - الحواسيب - ايبادات - تابات - الطابعات - الراوترات - الانترنت ) مع جميع الملحقات وكسسواراتها
                </p>
              </div>
            </div>

            {/* Service Card 2 - Installment Service (Now second) */}
            <div 
              className="rounded-lg p-8 relative overflow-hidden"
              style={{
                width: "392px",
                height: "484px",
                borderRadius: "8px",
                background: "linear-gradient(180deg, #F9F9F9 0%, #CBD7F9 100%)",
                boxShadow: "0px 8px 8px 0px #0000000D"
              }}
            >
              {/* Decorative Elements - Clipped to card boundaries */}
              <div 
                className="absolute rounded-full"
                style={{
                  width: "288px",
                  height: "288px",
                  top: "-84px",
                  left: "-97px",
                  background: "#211C4D1A",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              <div 
                className="absolute rounded-full"
                style={{
                  width: "163px",
                  height: "143px",
                  top: "100px",
                  left: "313px",
                  background: "#211C4D14",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              
              {/* Card Content - Centered within the card */}
              <div className="flex flex-col items-center justify-center h-full">
                {/* Service Icon/Image */}
                <div className="mb-6">
                  <img 
                    src={serviceIcon2} 
                    alt="خدمة الشراء بالتقسيط" 
                    className="w-[317px] h-[210px] object-contain"
                  />
                </div>
                
                {/* Service Title */}
                <h3 
                  className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-2 text-center"
                  style={{
                    width: "328px",
                    height: "28px"
                  }}
                >
                  خدمة الشراء بالتقسيط
                </h3>
                
                {/* Service Description */}
                <p 
                  className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center"
                  style={{
                    width: "357px",
                    height: "24px"
                  }}
                >
                  عبر منصات (تمارا - تابي - أموال - مدفوع - إمكان - مورا - كوارا - MISPay) بدون دفعة اولي .
                </p>
              </div>
            </div>

            {/* Service Card 1 - Device Replacement (Now third) */}
            <div 
              className="rounded-lg p-8 relative overflow-hidden"
              style={{
                width: "392px",
                height: "484px",
                borderRadius: "8px",
                background: "linear-gradient(180deg, #F9F9F9 0%, #CBD7F9 100%)",
                boxShadow: "0px 8px 8px 0px #0000000D"
              }}
            >
              {/* Decorative Elements - Clipped to card boundaries */}
              <div 
                className="absolute rounded-full"
                style={{
                  width: "288px",
                  height: "288px",
                  top: "-84px",
                  left: "-97px",
                  background: "#211C4D1A",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              <div 
                className="absolute rounded-full"
                style={{
                  width: "163px",
                  height: "143px",
                  top: "100px",
                  left: "313px",
                  background: "#211C4D14",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              
              {/* Card Content - Centered within the card */}
              <div className="flex flex-col items-center justify-center h-full">
                {/* Service Icon/Image */}
                <div className="mb-6">
                  <img 
                    src={serviceIcon1} 
                    alt="استبدال الاجهزة" 
                    className="w-[317px] h-[210px] object-contain"
                  />
                </div>
                
                {/* Service Title */}
                <h3 
                  className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-2 text-center"
                  style={{
                    width: "328px",
                    height: "28px"
                  }}
                >
                  استبدال الاجهزة
                </h3>
                
                {/* Service Description */}
                <p 
                  className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center"
                  style={{
                    width: "357px",
                    height: "24px"
                  }}
                >
                  ( الجديدة او المستعملة ) بجهاز اخر بكل سهولة
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row of Services Cards - Centered within container - Reversed order */}
        <div className="w-full flex justify-center" style={{ height: "484px" }}>
          <div className="flex gap-[54px]">
            {/* Service Card 6 - Repair and Programming (Now first in second row) */}
            <div 
              className="rounded-lg p-8 relative overflow-hidden"
              style={{
                width: "392px",
                height: "484px",
                borderRadius: "8px",
                background: "linear-gradient(180deg, #F9F9F9 0%, #CBD7F9 100%)",
                boxShadow: "0px 8px 8px 0px #0000000D"
              }}
            >
              {/* Decorative Elements - Clipped to card boundaries */}
              <div 
                className="absolute rounded-full"
                style={{
                  width: "288px",
                  height: "288px",
                  top: "-84px",
                  left: "-97px",
                  background: "#211C4D1A",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              <div 
                className="absolute rounded-full"
                style={{
                  width: "163px",
                  height: "143px",
                  top: "100px",
                  left: "313px",
                  background: "#211C4D14",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              
              {/* Card Content - Centered within the card */}
              <div className="flex flex-col items-center justify-center h-full">
                {/* Service Icon/Image */}
                <div className="mb-6">
                  <img 
                    src={serviceIcon6} 
                    alt="صيانة وبرمجة جميع الاجهزة" 
                    className="w-[317px] h-[210px] object-contain"
                  />
                </div>
                
                {/* Service Title */}
                <h3 
                  className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-2 text-center"
                  style={{
                    width: "328px",
                    height: "28px"
                  }}
                >
                  صيانة وبرمجة جميع الاجهزة
                </h3>
                
                {/* Service Description */}
                <p 
                  className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center"
                  style={{
                    width: "357px",
                    height: "24px"
                  }}
                >
                  اجهزة جوالات واجهزة حواسيب والاجهزه الالكترونية وكهربائيه
                </p>
              </div>
            </div>

            {/* Service Card 5 - Telecommunications (Now second in second row) */}
            <div 
              className="rounded-lg p-8 relative overflow-hidden"
              style={{
                width: "392px",
                height: "484px",
                borderRadius: "8px",
                background: "linear-gradient(180deg, #F9F9F9 0%, #CBD7F9 100%)",
                boxShadow: "0px 8px 8px 0px #0000000D"
              }}
            >
              {/* Decorative Elements - Clipped to card boundaries */}
              <div 
                className="absolute rounded-full"
                style={{
                  width: "288px",
                  height: "288px",
                  top: "-84px",
                  left: "-97px",
                  background: "#211C4D1A",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              <div 
                className="absolute rounded-full"
                style={{
                  width: "163px",
                  height: "143px",
                  top: "100px",
                  left: "313px",
                  background: "#211C4D14",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              
              {/* Card Content - Centered within the card */}
              <div className="flex flex-col items-center justify-center h-full">
                {/* Service Icon/Image */}
                <div className="mb-6">
                  <img 
                    src={serviceIcon5} 
                    alt="خدمات الاتصالات و الانترنت" 
                    className="w-[317px] h-[210px] object-contain"
                  />
                </div>
                
                {/* Service Title */}
                <h3 
                  className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-2 text-center"
                  style={{
                    width: "328px",
                    height: "28px"
                  }}
                >
                  خدمات الاتصالات و الانترنت
                </h3>
                
                {/* Service Description */}
                <p 
                  className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center"
                  style={{
                    width: "357px",
                    height: "24px"
                  }}
                >
                  وتوفير باقات متنوعة تناسب الجميع
                </p>
              </div>
            </div>

            {/* Service Card 4 - Customer Service (Now third in second row) */}
            <div 
              className="rounded-lg p-8 relative overflow-hidden"
              style={{
                width: "392px",
                height: "484px",
                borderRadius: "8px",
                background: "linear-gradient(180deg, #F9F9F9 0%, #CBD7F9 100%)",
                boxShadow: "0px 8px 8px 0px #0000000D"
              }}
            >
              {/* Decorative Elements - Clipped to card boundaries */}
              <div 
                className="absolute rounded-full"
                style={{
                  width: "288px",
                  height: "288px",
                  top: "-84px",
                  left: "-97px",
                  background: "#211C4D1A",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              <div 
                className="absolute rounded-full"
                style={{
                  width: "163px",
                  height: "143px",
                  top: "100px",
                  left: "313px",
                  background: "#211C4D14",
                  clipPath: "inset(0 0 0 0)"
                }}
              ></div>
              
              {/* Card Content - Centered within the card */}
              <div className="flex flex-col items-center justify-center h-full">
                {/* Service Icon/Image */}
                <div className="mb-6">
                  <img 
                    src={serviceIcon4} 
                    alt="نقديم خدمات عملاء مميزة" 
                    className="w-[317px] h-[210px] object-contain"
                  />
                </div>
                
                {/* Service Title */}
                <h3 
                  className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-2 text-center"
                  style={{
                    width: "328px",
                    height: "28px"
                  }}
                >
                  نقديم خدمات عملاء مميزة
                </h3>
                
                {/* Service Description */}
                <p 
                  className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center"
                  style={{
                    width: "357px",
                    height: "24px"
                  }}
                >
                  لزوار الفرع والمتجر إلكتروني وجود خدمة تقسيط  متعدده وأصناف منتجات مختلفه تميز بها المتجر
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}