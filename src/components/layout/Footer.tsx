import React from "react";
import { useNavigate } from "react-router-dom";
import tiktok from "../../assets/images/tiktok.png";
import snapchat from "../../assets/images/snapchat.png";
import whatsapp from "../../assets/images/whatsapp.png";
import x from "../../assets/images/x.png";
import insta from "../../assets/images/insta.png";
import facebook from "../../assets/images/facebook.png";
import googleanalytic from "../../assets/images/googleanalytic.png";
import googletagmaneger from "../../assets/images/googletagmaneger.png";
import blue from "../../assets/images/blue.png";
import drive from "../../assets/images/drive.png";
import Google from "../../assets/images/Google.png";
import amwal from "../../assets/images/amwal.png";
import emkan from "../../assets/images/emkan.png";
import payment from "../../assets/images/payment.png";
import ropot from "../../assets/images/ropot.png";
const Footer: React.FC = () => {
  const navigate = useNavigate();
  
  const serviceMenuItems = [
    "تقسيط المشتريات",
    "خدمة استبدال الاجهزه",
    "خدمة  بيع الاجهزه",
    "خدمة برمجه وصيانة الأجهزة",
    "خدمات الاتصالات والانترنت",
    "خدمات عملاء مميزة",
  ];

  const aboutMenuItems = [
    "من نحن",
    "العروض",
    "خدماتنا",
    "تواصل معنا",
    "الشروط و الاحكام",
  ];

  const customerCareMenuItems = [
    "سياسة الضمان",
    "سياسة  الاستبدال والارجاع",
    "خدمة  ما بعد البيع",
    "خدمة نقاط الولاء",
  ];

  const handleServiceItemClick = (item: string) => {
    switch (item) {
      default:
        // Handle other menu items if needed
        break;
    }
  };

  const handleCustomerCareItemClick = (item: string) => {
    switch (item) {
      case "سياسة الضمان":
        navigate("/warranty-policy");
        break;
      case "سياسة  الاستبدال والارجاع":
        navigate("/return-policy");
        break;
      default:
        // Handle other menu items if needed
        break;
    }
  };

  const handleAboutItemClick = (item: string) => {
    switch (item) {
      case "الشروط و الاحكام":
        navigate("/terms-and-conditions");
        break;
      default:
        // Handle other menu items if needed
        break;
    }
  };

  return (
<footer
  className="bg-[#211C4D] text-white"
  style={{
    boxSizing: "border-box",
    paddingTop: 72,
    paddingBottom: 24,
  }}
>
  <div
    id="footer-heading"
    className="max-w-[1440px] mx-auto w-full relative px-5 sm:px-8 md:px-10"
  >
    {/* Container */}
    <div className="max-w-[1200px] mx-auto">
      {/* Top row */}
      <div className="w-full flex flex-wrap justify-between gap-y-10 md:gap-y-12 gap-x-6 md:gap-x-10 lg:gap-x-[118px]">
        {/* Customer Care */}
        <div className="w-full sm:w-[48%] md:w-[200px] flex flex-col gap-3 text-right">
          <h3 className="font-[Cairo] font-semibold text-[22px] sm:text-[24px] leading-[150%]">
            رعاية العميل
          </h3>
          <div className="flex flex-col gap-2">
            {customerCareMenuItems.map((item, i) => (
              <button
                key={i}
                className="text-[#E0E5EB] hover:text-white text-[15px] sm:text-[16px] text-right bg-transparent border-0 p-0 cursor-pointer"
                style={{ fontFamily: "Roboto" }}
                onClick={() => handleCustomerCareItemClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="w-full sm:w-[48%] md:w-[200px] flex flex-col gap-3 text-right">
          <h3 className="font-roboto font-semibold text-[22px] sm:text-[24px] leading-[150%]">
            عن مدينة الهواتف
          </h3>
          <div className="flex flex-col gap-2">
            {aboutMenuItems.map((item, i) => (
              <button
                key={i}
                className="text-[#E0E5EB] hover:text-white text-[15px] sm:text-[16px] text-right bg-transparent border-0 p-0 cursor-pointer"
                style={{ fontFamily: "Roboto" }}
                onClick={() => handleAboutItemClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="w-full sm:w-[48%] md:w-[180px] flex flex-col gap-3 text-right">
          <h3 className="font-roboto font-semibold text-[22px] sm:text-[24px] leading-[150%]">
            خدمه مدينه الهواتف
          </h3>
          <div className="flex flex-col gap-2">
            {serviceMenuItems.map((item, i) => (
              <button
                key={i}
                className="text-[#E0E5EB] hover:text-white text-[15px] sm:text-[16px] text-right bg-transparent border-0 p-0 cursor-pointer"
                style={{ fontFamily: "Roboto" }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Brand & Socials */}
        <div className="w-full md:flex-1 flex flex-col gap-4 text-right">
          <h2 className="font-roboto font-bold text-[22px] sm:text-[24px] leading-[100%]">
            مدينة الهواتف
          </h2>

          <p className="text-[#CAD0D9] text-[15px] sm:text-[16px] leading-[150%]" style={{ fontFamily: "Roboto" }}>
            لمعرفة كل جديد عنا ...... تابع حساباتنا على وسائل التواصل الاجتماعي وحساباتنا على جوجل.
          </p>

          {/* Social icons */}
          <div className="flex justify-end mt-2">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
              {[tiktok, snapchat, whatsapp, x, insta, facebook].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center transition-all hover:bg-gray-100 hover:shadow-md"
                >
                  <img src={icon} alt="social" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                </a>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="flex justify-end flex-wrap gap-2 sm:gap-3 mt-4">
            {[googleanalytic, googletagmaneger, blue, drive, Google].map((img, i) => (
              <a key={i} href="/" className="inline-block">
                <img
                  src={img}
                  alt="badge"
                  className="h-9 sm:h-10 object-contain rounded-lg"
                  style={{ maxWidth: 130 }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#ffffff22] my-6" />

      {/* Bottom row */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        <p className="text-[#CAD0D9] text-[13px] sm:text-sm" style={{ fontFamily: "Roboto" }}>
          جميع الحقوق محفوظة © مدينة الهواتف
        </p>

        <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
          <img src={amwal} alt="Amwal" className="h-5 sm:h-6 object-contain rounded" />
          <img src={emkan} alt="Amkan" className="h-5 sm:h-[21px] rounded" />
          <img src={payment} alt="Payments" className="h-5 sm:h-[23px] object-contain" />
        </div>
      </div>
    </div>

    {/* Decorative element */}

  </div>
</footer>
  );
};

export default Footer;