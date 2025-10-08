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
      className="w-full bg-[#211C4D] text-white md:block "
      style={{
        boxSizing: "border-box",
        paddingTop: 72,
        paddingBottom: 24,
        overflowX: "hidden", // safety to avoid horizontal scroll
      }}
    >
      <div
        id="footer-heading"
        className="max-w-[1440px] mx-auto w-full box-border"
        style={{ paddingLeft: 24, paddingRight: 24 }}
      >
        {/* Container */}
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Top row */}
          <div className="w-full flex flex-wrap items-start justify-between gap-8 md:gap-[80px] lg:gap-[118px]">
            {/* Customer Care */}
            <div className="flex-shrink-0 w-full sm:w-1/2 md:w-[170px] lg:w-[196px] flex flex-col gap-4 text-right">
              <h3 className="font-[Cairo] font-semibold text-[24px] leading-[150%] text-white whitespace-normal">
                رعاية العميل
              </h3>
              <div className="flex flex-col gap-2">
                {customerCareMenuItems.map((item, i) => (
                  <button
                    key={i}
                    className="text-[#E0E5EB] hover:text-white text-[16px] leading-[22px] text-right bg-transparent border-0 p-0 cursor-pointer"
                    style={{ fontFamily: "Roboto" }}
                    onClick={() => handleCustomerCareItemClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="flex-shrink-0 w-full sm:w-1/2 md:w-[170px] lg:w-[196px] flex flex-col gap-4 text-right">
              <h3 className="font-roboto font-semibold text-[24px] leading-[150%] text-white whitespace-normal">
                عن مدينة الهواتف
              </h3>
              <div className="flex flex-col gap-2">
                {aboutMenuItems.map((item, i) => (
                  <button
                    key={i}
                    className="text-[#E0E5EB] hover:text-white text-[16px] leading-[22px] text-right bg-transparent border-0 p-0 cursor-pointer"
                    style={{ fontFamily: "Roboto" }}
                    onClick={() => handleAboutItemClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="flex-shrink-0 w-full sm:w-1/2 md:w-[150px] lg:w-[170px] flex flex-col gap-4 text-right">
              <h3 className="font-roboto font-semibold text-[24px] leading-[28px] text-white whitespace-normal mb-2">
                خدمه مدينه الهواتف
              </h3>
              <div className="flex flex-col gap-2 mt-1">
                {serviceMenuItems.map((item, i) => (
                  <button
                    key={i}
                    className="text-[#E0E5EB] hover:text-white text-[16px] leading-[22px] text-right bg-transparent border-0 p-0 cursor-pointer"
                    style={{ fontFamily: "Roboto" }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand & socials (rightmost visually) */}
            <div className="flex-1 min-w-[220px] max-w-[420px] w-full sm:w-1/2 md:w-[320px] lg:w-[373px] flex flex-col gap-4 text-right">
              <h2 className="font-roboto font-bold text-[24px] leading-[100%] text-white whitespace-normal">
                مدينة الهواتف
              </h2>

              <p
                className="text-[#CAD0D9] text-[16px] leading-[150%]"
                style={{ fontFamily: "Roboto" }}
              >
                لمعرفة كل جديد عنا ...... تابع حساباتنا على وسائل التواصل
                الاجتماعي وحساباتنا على جوجل.
              </p>

              {/* Social icons row */}
              <div className="w-full mt-1">
                <div className="flex justify-end">
                  <div className="flex items-center gap-3 flex-wrap">
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
                    >
                      <img
                        src={tiktok}
                        alt="tiktok"
                        className="w-5 h-5 object-contain block"
                        style={{ display: "block" }}
                      />
                    </a>

                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
                    >
                      <img
                        src={snapchat}
                        alt="snapchat"
                        className="w-5 h-5 object-contain block"
                        style={{ display: "block" }}
                      />
                    </a>

                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
                    >
                      <img
                        src={whatsapp}
                        alt="whatsapp"
                        className="w-5 h-5 object-contain block"
                        style={{ display: "block" }}
                      />
                    </a>

                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
                    >
                      <img
                        src={x}
                        alt="x"
                        className="w-5 h-5 object-contain block"
                        style={{ display: "block" }}
                      />
                    </a>

                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
                    >
                      <img
                        src={insta}
                        alt="instagram"
                        className="w-5 h-5 object-contain block"
                        style={{ display: "block" }}
                      />
                    </a>

                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
                    >
                      <img
                        src={facebook}
                        alt="facebook"
                        className="w-5 h-5 object-contain block"
                        style={{ display: "block" }}
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="w-full mt-4">
                <div className="flex justify-end">
                  <div
                    className="flex items-center gap-3 "
                    style={{ maxWidth: "100%" }}
                  >
                    <a href="/">
                      <img
                        src={googleanalytic}
                        alt="googleanalytic"
                        className="h-10 object-contain rounded-lg block"
                        style={{ maxWidth: 140, width: "auto", height: 40 }}
                      />
                    </a>
                    <a href="/">
                      <img
                        src={googletagmaneger}
                        alt="googletagmaneger"
                        className="h-10 object-contain rounded-lg block"
                        style={{ maxWidth: 140, width: "auto", height: 40 }}
                      />
                    </a>
                    <a href="/">
                      <img
                        src={blue}
                        alt="blue"
                        className="h-10 object-contain rounded-lg block"
                        style={{ maxWidth: 140, width: "auto", height: 40 }}
                      />
                    </a>
                    <a href="/">
                      <img
                        src={drive}
                        alt="Google Play"
                        className="h-10 object-contain rounded-lg block"
                        style={{ maxWidth: 140, width: "auto", height: 40 }}
                      />
                    </a>
                    <a href="/">
                      <img
                        src={Google}
                        alt="Google"
                        className="h-10 object-contain rounded-lg block"
                        style={{ maxWidth: 140, width: "auto", height: 40 }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}

          {/* Bottom row: copyright & payments */}
          <div className="w-full mt-4 flex flex-col md:flex-row items-center justify-between gap-4 pb-6">
            <div className="flex items-center">
              <p
                className="text-[#CAD0D9] text-sm"
                style={{ fontFamily: "Roboto" }}
              >
                {/* لو مش عايز تظهر رسالة الكوبي رايت سيبها فاضية أو احذف النص */}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={amwal}
                  alt="Amwal"
                  className="h-6 object-contain rounded"
                  style={{ height: 24, maxWidth: 120 }}
                />
                <img
                  src={emkan}
                  alt="Amkan"
                  className="object-contain h-[21px] rounded w-[73px]"
                />
                {/* هنا حطينا صورة الـ SVG قبل فيزا، بنستخدم encodeURI لضمان التعامل مع المسافات بالاسم */}
                <img
                  src={payment}
                  alt="copyright-payments"
                  className="object-contain block"
                  style={{
                    height: 23,
                    maxWidth: 220,
                    width: "auto",
                    flexShrink: 0, // يمنع الصورة من التمدد والتسبب في overflow
                    marginRight: 8,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;