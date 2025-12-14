// components/home/AppDownloadSection.tsx
import background from "../../assets/images/background.png";
// import expotuer from "../../assets/images/expotuer.png"; // معلق في الأصلي
import appstore from "../../assets/images/appstore.png";
import googleplay from "../../assets/images/googleplay.png";
import useS24Ultra from "@/hooks/useS24Ultra";
import S24AppDownloadSection from "@/components/s24-ultra/S24AppDownloadSection";
import { useDownloadStore } from "@/store/home/downloadStore";
import { useTranslation } from "react-i18next";

interface DownloadData {
  app_main_image: string;
}

interface AppDownloadSectionProps {
  downloadData: DownloadData | null;
}

const AppDownloadSection: React.FC<AppDownloadSectionProps> = ({ downloadData }) => {
  const isS24Ultra = useS24Ultra();
  const { getTranslatedTitle, getTranslatedDescription } = useDownloadStore();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  if (isS24Ultra) {
    return <S24AppDownloadSection />;
  }

  if (downloadData === null) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!downloadData) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-red-500 mb-4">حدث خطأ في تحميل البيانات</p>
      </div>
    );
  }

  const appTitle = getTranslatedTitle(currentLang);
  const appDescription = getTranslatedDescription(currentLang);
  const appImage = downloadData.app_main_image;

  return (
    <div className="w-full">
      {/* Desktop / Tablet */}
      <div className="relative w-full hidden md:block overflow-hidden mt-6 md:h-[350px] lg:h-[530px] xl:h-[580px]">
        {/* Images */}
        <div className="absolute top-[10%] md:top-auto md:bottom-[0%] left-[18%] md:left-[9%] z-10 w-[280px] md:w-[230px] lg:w-[360px]">
          <img
            src={appImage}
            alt="main visual"
            className="w-full h-auto"
            onError={(e) => {
              e.currentTarget.src = background;
            }}
          />
          {/* <img
            src={expotuer}
            alt="decor"
            className="absolute top-0 left-0 w-full h-auto"
          /> */}
        </div>

        {/* Text + Buttons - مطابق للأصلي تمامًا */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 max-w-[600px] flex flex-col gap-6">
          <div className="flex flex-col gap-3 text-right" dir={currentLang === "ar" ? "rtl" : "ltr"}>
            <h2 className="font-roboto font-bold text-[#211C4D] leading-[1.4] text-[28px] md:text-[27px] md:mt-0 lg:text-[35px] xl:text-[42px]">
              {appTitle}
            </h2>
            <p className="font-roboto font-medium text-[#211C4D] text-[16px] md:text-[20px] lg:text-[24px] leading-relaxed">
              {appDescription}
            </p>
          </div>

          <div className="flex gap-6 md:gap-10">
            <img
              src={googleplay}
              alt="Google Play"
              className="w-[140px] md:w-[160px] lg:w-[180px] cursor-pointer hover:scale-105 transition"
            />
            <img
              src={appstore}
              alt="App Store"
              className="w-[140px] md:w-[160px] lg:w-[180px] cursor-pointer hover:scale-105 transition"
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden bg-white py-8 pb-0 md:pb-8 px-4 mt-6">
        <div className="flex flex-col items-center text-center">
          <h2
            className="font-roboto font-bold text-xl sm:text-2xl text-[15px] text-[#211C4D] mb-3"
            dir={currentLang === "ar" ? "rtl" : "ltr"}
          >
            {appTitle}
          </h2>
          <p
            className="font-roboto font-medium text-base sm:text-lg text-[12px] text-[#211C4D] mb-6"
            dir={currentLang === "ar" ? "rtl" : "ltr"}
          >
            {appDescription}
          </p>

          <div className="flex gap-3 sm:gap-4 mb-6">
            <img
              src={googleplay}
              alt="Google Play"
              className="w-20 sm:w-32 h-8 sm:h-12 object-contain cursor-pointer"
            />
            <img
              src={appstore}
              alt="App Store"
              className="w-20 sm:w-32 h-8 sm:h-12 object-contain cursor-pointer"
            />
          </div>

          <img
            src={appImage}
            alt="App visual"
            className="w-[70%] max-w-[150px] md:max-w-[250px] mx-auto mt-4"
            onError={(e) => {
              e.currentTarget.src = background;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;