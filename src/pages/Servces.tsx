import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";
import heroImage from "../assets/images/Frame 1321317076.png";
import serviceIcon from "../assets/images/Group 1000005944.png";

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

        {/* Services Description - Right aligned within the full section */}
        <div className="w-full mb-10" style={{ height: "100px" }}>
          <div className="flex flex-col items-end pr-20">
            <h2 className="text-[#211C4D] font-roboto font-bold text-[40px] leading-9 mb-2">
              في مدينه الهواتف
            </h2>
            <p className="text-[#211C4DCC] font-roboto font-normal text-2xl leading-10 text-right">
              نوفر لك تجربة شراء وصيانة متكاملة في مكان واحد لتلبية جميع احتياجاتك في عالم الهواتف و الاجهزة الذكية:
            </p>
          </div>
        </div>

        {/* Services Cards */}
        <div className="w-full mb-16" style={{ height: "484px" }}>
          <div 
            className="rounded-lg p-8"
            style={{
              background: "linear-gradient(180deg, #F9F9F9 0%, #CBD7F9 100%)",
              boxShadow: "0px 8px 8px 0px #0000000D",
              height: "484px"
            }}
          >
            <div className="flex flex-col items-center relative" style={{ height: "421px" }}>
              {/* Decorative Elements */}
              <div 
                className="absolute rounded-full"
                style={{
                  width: "288px",
                  height: "288px",
                  top: "-84px",
                  left: "-97px",
                  background: "#211C4D1A"
                }}
              ></div>
              <div 
                className="absolute rounded-full"
                style={{
                  width: "163px",
                  height: "143px",
                  top: "100px",
                  left: "313px",
                  background: "#211C4D14"
                }}
              ></div>
              
              {/* Service Icon/Image */}
              <div className="mb-6">
                <img 
                  src={serviceIcon} 
                  alt="استبدال الاجهزة" 
                  className="w-[317px] h-[210px] object-contain"
                />
              </div>
              
              {/* Service Title */}
              <h3 className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-2 text-center">
                استبدال الاجهزة
              </h3>
              
              {/* Service Description */}
              <p className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center">
                ( الجديدة او المستعملة ) بجهاز اخر بكل سهولة
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}