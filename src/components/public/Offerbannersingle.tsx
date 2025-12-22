import aboutusimage from "@/assets/images/aboutusimage.jpg";
import { useTranslation } from "react-i18next";

export default function Offerbannersingle() {
  const { t } = useTranslation();
  
  return (
    <div className="relative w-full h-[350px] rounded-[16px] my-18 overflow-hidden flex items-center justify-end">
      {/* الخلفية */}
      <img
        src={aboutusimage} // استبدلها بمسار الصورة
        alt="Banner"
        className="absolute inset-0 w-full h-full object-fill"
      />
<div className="w-full h-full top-0 right-0 absolute bg-[linear-gradient(90deg,rgba(33,28,77,0.28)_0%,rgba(33,28,77,0.2156)_30.77%,rgba(33,28,77,0.252)_50.48%,rgba(33,28,77,0)_94.71%)]
">

</div>
      {/* الدائرة اللي فيها blur */}
      <div
        className="absolute end-[-850px] top-0 rounded-l-[80px] rounded-r-[80px] bg-[#211C4D5C] w-[891px] h-[684px] "
        style={{
          backdropFilter: "blur(15px)",
          clipPath: "url(#bgblur_clip)",
          height: "100%",
          width: "100%",
        }}
      ></div>

      {/* المحتوى */}
      <div className="relative z-10 text-white p-10">
        <h2 className="text-[45px] md:max-w-[80%] leading-[70px] font-[700] mb-3 text-[white] [text-shadow:-1px_11px_2px_rgba(0,0,0,0.25)]">
          {t("EnjoyBestOffersWithUs")}
        </h2>

        <p className="text-[20px] mb-6 max-w-[400px]">
          {t("EnjoyExceptionalExperience")}
        </p>
        <div className="w-full flex items-center justify-start">

        <button className="bg-[#F3AC5D] hover:bg-[#d9944d] text-[white] font-[600] px-6 py-3 rounded-[8px] transition">
          {t("ShopNow")} →
        </button>
        </div>
      </div>
    </div>
  );
}
