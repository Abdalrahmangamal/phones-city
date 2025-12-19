import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";

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
import {useAboutStore} from '@/store/aboutusStore'
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useLangSync();
  const {fetchAbout,data}=useAboutStore()
  useEffect(()=>{fetchAbout(lang)},[])

  const navigate = useNavigate();

  const serviceMenuItems = [
    { label: t("InstallmentService"), path: "/servces" },
    { label: t("DeviceExchange"), path: "/servces" },
    { label: t("DeviceSelling"), path: "/servces" },
    { label: t("ProgrammingAndMaintenance"), path: "/servces" },
    { label: t("TelecomAndInternet"), path: "/servces" },
    { label: t("PremiumCustomerService"), path: "/servces" },
  ];

  const aboutMenuItems = [
    { label: t("WhoWeAre"), path: "/about" },
    { label: t("Offers"), path: "/offers" },
    { label: t("OurServices"), path: "/servces" },
    { label: t("ContactUs"), path: "/contact" },
    { label: t("TermsAndConditions"), path: "/terms-and-conditions" },
  ];

  const customerCareMenuItems = [
    { label: t("WarrantyPolicy"), path: "/warranty-policy" },
    { label: t("ReturnPolicy"), path: "/return-policy" },
    { label: t("TermsAndConditions"), path: "/terms-and-conditions" },
    { label: t("AboutMora"), path: "/about-mora" },
    { label: t("AboutCoara"), path: "/about-quara" },
  ];

  const handleCustomerCareItemClick = (path: string) => {
    if (path !== "#") {
      navigate(path);
    }
  };

  const handleAboutItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <footer
      dir={lang==="ar"?"rtl":"ltr"}
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
          <div className="w-full grid md:!grid-cols-5 grid-cols-3 gap-y-10 md:gap-y-12 gap-x-6 md:gap-x-10 lg:gap-x-[118px]">
            {/* Customer Care */}
            <div className="w-full  md:w-[200px] flex flex-col gap-3 text-start">
              <h3 className="font-[Cairo] font-semibold text-[22px] sm:text-[18px] lg:text-[24px] leading-[150%]">
                {t("CustomerCare")}
              </h3>
              <div className="flex flex-col gap-2"       dir={lang==="ar"?"rtl":"ltr"}
>
                {customerCareMenuItems.map((item, i) => (
                  <button
                    key={i}
                    className="text-[#E0E5EB] hover:text-white text-[15px] sm:text-[12px] lg:text-[18px] text-start bg-transparent border-0 p-0 cursor-pointer"
                    style={{ fontFamily: "Roboto" }}
                    onClick={() => handleCustomerCareItemClick(item.path)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="w-full  md:w-[200px] flex flex-col gap-3 text-start">
              <h3 className="font-[Cairo] font-semibold text-[22px] sm:text-[18px] lg:text-[24px] leading-[150%]">
                {t("AboutCityPhones")}
              </h3>
              <div className="flex flex-col gap-2">
                {aboutMenuItems.map((item, i) => (
                  <button
                    key={i}
                    className="text-[#E0E5EB] hover:text-white text-[15px] sm:text-[12px] lg:text-[16px] text-start bg-transparent border-0 p-0 cursor-pointer"
                    style={{ fontFamily: "Roboto" }}
                    onClick={() => handleAboutItemClick(item.path)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="w-full  md:w-[180px] flex flex-col gap-3 text-start">
              <h3 className="font-[Cairo] font-semibold text-[22px] sm:text-[18px] lg:text-[24px] leading-[150%]">
                {t("CityPhonesServices")}
              </h3>
              <div className="flex flex-col gap-2">
                {serviceMenuItems.map((item, i) => (
                  <button
                    key={i}
                    className="text-[#E0E5EB] hover:text-white text-[15px] sm:text-[12px] lg:text-[16px] text-start bg-transparent border-0 p-0 cursor-pointer"
                    style={{ fontFamily: "Roboto" }}
                    onClick={() => {
                      if (item.path !== "#") {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand & Socials */}
            <div className="w-full md:flex-1 md:col-span-2 col-span-3 flex flex-col gap-4 text-start">
              <h2 className="font-[Cairo] font-semibold text-[22px] sm:text-[18px]  lg:text-[24px] leading-[150%]">
                {t("CityPhones")}
              </h2>

              <p
                className="text-[#CAD0D9] text-[15px] sm:text-[12px] lg:text-[16px] leading-[150%]"
                style={{ fontFamily: "Roboto" }}
              >
<div>
  {data?.about_us?.replace(/<\/?p>/g, "")}
</div>
              </p>

              {/* Social icons */}
              <div className="flex justify-start mt-2">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
                  {[
                    { icon: tiktok, url: "https://www.tiktok.com/@madinatalhawatif?_r=1&_t=ZS-92MSlSSc6D2" },
                    { icon: snapchat, url: "https://www.snapchat.com/add/madinat6100?share_id=qzDj5oOT5kM&locale=ar-SA" },
                    { icon: whatsapp, url: "#" },
                    { icon: x, url: "https://x.com/AlhwatfMdy43074" },
                    { icon: insta, url: "https://www.instagram.com/cityphone.sa?igsh=cnVoeGpncWF0Mjc5" },
                    { icon: facebook, url: "https://www.facebook.com/share/14PAhVuoWz7/" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 sm:w-7 sm:h-7 lg:w-9 lg:h-9 rounded-full bg-white flex items-center justify-center transition-all hover:bg-gray-100 hover:shadow-md"
                    >
                      <img
                        src={social.icon}
                        alt="social"
                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="flex justify-start flex-wrap gap-2 sm:gap-3 mt-4">
                {[googleanalytic, googletagmaneger, blue, drive, Google, emkan, amwal].map(
                  (img, i) => (
                    <a key={i} href={i >= 5 ? (i === 5 ? "/about-quara" : "/about-mora") : "#"} className="inline-block">
                      <img
                        src={img}
                        alt={i >= 5 ? (i === 5 ? "Coara" : "Mora") : "badge"}
                        className="h-9 sm:h-7 lg:h-10 object-contain rounded-lg"
                        style={{ maxWidth: 130 }}
                      />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#ffffff22] my-6" />

          {/* Bottom row */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
            <p
              className="text-[#CAD0D9] text-[13px] sm:text-sm"
              style={{ fontFamily: "Roboto" }}
            >
              {t("AllRightsReserved")}
            </p>

            <div className="flex items-center gap-0 md:gap-0 scale-[0.7] md:scale-[1] sm:gap-4 flex- justify-center">
              <img
                src={amwal}
                alt="Amwal"
                className="h-5 lg:h-6 sm:h-[4] object-contain rounded"
              />
              <img
                src={emkan}
                alt="Amkan"
                className="h-5 lg:h-[21px] sm:h-[15px]  rounded"
              />
              <img
                src={payment}
                alt="Payments"
                className="h-5 lg:h-[23px] sm:h-[18px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Decorative element */}
      </div>
    </footer>
  );
};

export default Footer;
