import React from "react";

const Footer: React.FC = () => {
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
    "سياسة  الاستبدال والايرجاع",
    "خدمة  ما بعد البيع",
    "خدمة نقاط الولاء",
  ];

  return (
    <footer
      className="w-full bg-[#211C4D] text-white md:block hidden"
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

              <p className="text-[#CAD0D9] text-[16px] leading-[150%]" style={{ fontFamily: "Roboto" }}>
                لمعرفة كل جديد عنا ...... تابع حساباتنا على وسائل التواصل الاجتماعي وحساباتنا على جوجل.
              </p>

              {/* Social icons row */}
              <div className="w-full mt-1">
                <div className="flex justify-end">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src="/bf002cfe1b95566632daee87d2a4c2c12915d171.png"
                        alt="Facebook"
                        className="w-5 h-5 object-contain block"
                        style={{ display: "block" }}
                      />
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src="/fe24cb41cc54caf30e2a392c3ae6c33e515de041.png"
                        alt="Instagram"
                        className="w-5 h-5 object-contain block"
                      />
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-[#F3AC5D] flex items-center justify-center text-white text-[12px]">
                        T
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-[#F3AC5D] flex items-center justify-center text-white text-[11px]">
                        WA
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-[#F3AC5D]" />
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                      <div className="w-5 h-6 rounded-full bg-[#F3AC5D]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="w-full mt-4">
                <div className="flex justify-end">
                  <div className="flex items-center gap-3 flex-wrap" style={{ maxWidth: "100%" }}>
                    <img
                      src="/f9440200ca16c8763be4e1908ab7de1833d7f32c.png"
                      alt="Google Play"
                      className="h-10 object-contain rounded-lg block"
                      style={{ maxWidth: 140, width: "auto", height: 40 }}
                    />
                    <img
                      src="/67d3a4865997fe8cf980f7f42b07c31a8cb87a9c.png"
                      alt="App Store"
                      className="h-10 object-contain block"
                      style={{ maxWidth: 140, width: "auto", height: 40 }}
                    />
                    <img
                      src="/377d2b9f0d5a667a69bf70eb34cabee4d614cc46.png"
                      alt="Samsung Store"
                      className="h-10 object-contain rounded-lg block"
                      style={{ maxWidth: 140, width: "auto", height: 40 }}
                    />
                    <img
                      src="/93a65b3369e6323f7d16b63f2f757cf3ccd34410.png"
                      alt="Huawei AppGallery"
                      className="h-10 object-contain rounded-lg block"
                      style={{ maxWidth: 140, width: "auto", height: 40 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}

          {/* Bottom row: copyright & payments */}
          <div className="w-full mt-4 flex flex-col md:flex-row items-center justify-between gap-4 pb-6">
            <div className="flex items-center">
              <p className="text-[#CAD0D9] text-sm" style={{ fontFamily: "Roboto" }}>
                {/* لو مش عايز تظهر رسالة الكوبي رايت سيبها فاضية أو احذف النص */}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {/* هنا حطينا صورة الـ SVG قبل فيزا، بنستخدم encodeURI لضمان التعامل مع المسافات بالاسم */}
                <img
                  src={encodeURI("/copyright + payment methods.svg")}
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

                <img
                  src="/6121aba5ca7ba39fe4f679b1e0fc5fc2217f441c.png"
                  alt="Amwal"
                  className="h-6 object-contain rounded"
                  style={{ height: 24, maxWidth: 120 }}
                />

                <div className="bg-white rounded w-20 h-6 flex items-center justify-center">
                  <span className="text-black text-xs">VISA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
