import background from "../../assets/images/background.png";
import expotuer from "../../assets/images/expotuer.png";
import appstore from "../../assets/images/appstore.png";
import googleplay from "../../assets/images/googleplay.png";
import useS24Ultra from "@/hooks/useS24Ultra";
import S24AppDownloadSection from "@/components/s24-ultra/S24AppDownloadSection";
import { useLangSync } from "@/hooks/useLangSync";

interface typeapp {
  title: string;
  description: string;
  image?: string;
}
const AppDownloadSection = ({ title, description, image }: typeapp) => {
  const isS24Ultra = useS24Ultra();
  const { lang } = useLangSync();

  if (isS24Ultra) {
    return <S24AppDownloadSection />;
  }


  return (
    <div className="w-full">
      {/* Desktop / Tablet */}
      <div className="relative w-full hidden md:block overflow-hidden mt-6 md:h-[350px] lg:h-[530px] xl:h-[580px]">
        {/* Glow / Blur Elements */}



        {/* Images */}
        <div className={`absolute top-[10%] md:top-auto md:bottom-[0%] z-10 w-[280px] md:w-[230px] lg:w-[360px] ${lang === 'en' ? 'right-[18%] md:right-[9%]' : 'left-[18%] md:left-[9%]'}`}>
          {image ? <img src={image} alt="main visual" className="w-full h-auto" /> : null}
          <img
            src={expotuer}
            alt="decor"
            className="absolute top-0 left-0 w-full h-auto"
          />
        </div>

        <div className="absolute bottom-0 left-[10%] md:left-[5%] md:w-[300px] z-0">
          {/* <img
            src={bolitse}
            alt="dots decoration"
            className="h-[220px] md:h-[260px] md:hidden lg:block lg:h-[300px]"
          /> */}
        </div>

        {/* Text & Buttons */}
        <div className={`absolute top-[15%] w-[60%] md:max-w-[50%] max-w-[600px] flex flex-col gap-6 ${lang === 'en' ? 'left-[8%] items-start' : 'right-[8%]'}`}>
          <div className={`flex flex-col gap-3 ${lang === 'en' ? 'text-left' : 'text-right'}`}>
            <h2 className="font-roboto font-bold text-[#211C4D] leading-[1.4] text-[28px] md:text-[27px] md:mt-0 lg:text-[35px] xl:text-[42px]">
              {title}
            </h2>
            <p className="font-roboto font-medium text-[#211C4D] text-[16px] md:text-[20px] lg:text-[24px] leading-relaxed">
              {description}
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
          <h2 className="font-roboto font-bold text-xl sm:text-2xl text-[15px] text-[#211C4D] mb-3">
            {title}
          </h2>
          <p className="font-roboto font-medium text-base sm:text-lg text-[12px] text-[#211C4D] mb-6">
            {description}
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

          {image ? <img
            src={image}
            alt="App visual"
            className="w-[70%] max-w-[150px]  md:max-w-[250px] mx-auto mt-4"
          /> : null}
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;