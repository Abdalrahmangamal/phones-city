import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";
import { useLatestOffersStore } from "@/store/home/latestOffersStore";
import Loader from "@/components/Loader";
import { SaudiRiyalIcon } from "@/components/common/SaudiRiyalIcon";
import svg from "@/assets/images/Layer_1.png";

interface Offer {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
  name: string | null;
  value: string;
  type: 'amount' | 'percentage';
  image: string;
}

export default function LatestOffers() {
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { offers, loading, fetchOffers } = useLatestOffersStore();

  useEffect(() => {
    fetchOffers(lang);
  }, [fetchOffers, lang]);

  const laptopOffer = offers[0];
  const gamingOffer = offers[3];
  const accessoryOffers = [offers[1], offers[2], offers[4], offers[5]];

  const getDiscountText = (offer: Offer | undefined) => {
    if (!offer) return t("SpecialDiscount");

    if (offer.type === 'percentage') {
      return `${t("Discount")} ${offer.value}%`;
    } else {
      return (
        <span className="flex items-center gap-1 inline-flex">
          {t("Discount")} {offer.value} <SaudiRiyalIcon className="w-4 h-4" />
        </span>
      );
    }
  };

  const getOfferLink = () => {
    return `/${lang}/offers`;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full translate-y-[-50px] md:h-[60vh] xl:h-[100vh] xl:px-[90px] px-2 pt-8 md:pt-0 relative md:px-0">
      <div className="relative w-fit mx-auto mb-8">
        <h1 className="text-[24px] md:text-[40px] font-[700] text-[#211C4D] text-center">
          {t("LatestOffers")}
        </h1>
        <img
          className={`absolute block ${lang === "ar"
            ? "w-[120px] md:w-[200px] -bottom-10 md:-bottom-15 -right-16 md:-right-23"
            : "w-[120px] md:w-[200px] -bottom-10 md:-bottom-15 -left-12 md:-left-20 -scale-x-100"
            }`}
          src={svg}
          alt=""
        />
      </div>

      <div className="flex flex-col md:flex-row items-center h-full md:items-start justify-center pt-[40px] md:pt-[50px] gap-[20px]">
        {/* Laptop Section - Desktop */}
        <div className="relative hidden md:flex items-end justify-center md:!h-full w-[300px] md:w-[36%] rounded-[16px] overflow-hidden">
          {laptopOffer ? (
            <>
              {/* صورة العرض الرئيسية فقط */}
              <img
                src={laptopOffer.image}
                className="absolute inset-0 w-full h-full object-cover"
                alt={laptopOffer.name_ar || laptopOffer.name_en || t("Laptop")}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }
                }}
              />

              {/* طبقة تظليل لتحسين قراءة النص */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              <div className="z-[20] absolute flex flex-col bottom-0 justify-center items-center pb-[40px] md:pb-[50px] lg:pb-[100px] text-center w-full">
                <h1 className="text-white font-[700] text-[20px] md:text-[24px] lg:text-[32px] drop-shadow-lg">
                  {laptopOffer.name_ar || laptopOffer.name_en || t("Laptop")}
                </h1>
                <p className="text-[14px] md:text-[18px] text-[#F3AC5D] font-[700] mt-1 drop-shadow-lg">
                  {getDiscountText(laptopOffer)}
                </p>
                <Link
                  to={getOfferLink()}
                  className="w-[110px] h-[40px] md:w-[116px] md:h-[42px] text-white mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105"
                >
                  {t("ShopNow")}
                </Link>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <img
                src={lang === 'ar' ? '/src/assets/images/coming-soon-ar.svg' : '/src/assets/images/coming-soon-en.svg'}
                alt={t("ComingSoon")}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Mobile Laptop Section */}
        <div className="relative w-full block md:hidden h-[200px] rounded-[16px] overflow-hidden">
          {laptopOffer ? (
            <>
              {/* صورة العرض الرئيسية فقط */}
              <img
                src={laptopOffer.image}
                className="absolute inset-0 w-full h-full object-cover"
                alt={laptopOffer.name_ar || laptopOffer.name_en || t("Laptop")}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
                <h1 className="text-[23px] font-[700] text-white drop-shadow-lg">
                  {laptopOffer.name_ar || laptopOffer.name_en || t("Laptop")}
                </h1>
                <p className="text-[#F3AC5D] text-[15px] font-[700] mt-1 drop-shadow-lg">
                  {getDiscountText(laptopOffer)}
                </p>
                <Link
                  to={getOfferLink()}
                  className="w-[100px] h-[35px] text-white mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#e79940] hover:shadow-lg hover:scale-105"
                >
                  {t("ShopNow")}
                </Link>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <img
                src={lang === 'ar' ? '/src/assets/images/coming-soon-ar.svg' : '/src/assets/images/coming-soon-en.svg'}
                alt={t("ComingSoon")}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Right Section - Accessories & Gaming */}
        <div className="flex flex-col gap-[20px] h-full justify-between w-full md:w-[60%]">
          {/* Row 1 - Accessories 1 & 2 */}
          <div className="flex flex-row gap-[20px]">
            {[0, 1].map((index) => {
              const offer = accessoryOffers[index];
              return offer ? (
                <div key={index} className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] relative overflow-hidden">
                  <img
                    src={offer.image}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={offer.name_ar || offer.name_en || t("GameAccessories")}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                      }
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                  <div className="absolute inset-0 z-10 px-4 py-3 text-right flex flex-col justify-end">
                    <h1 className="text-[10px] md:text-[15px] lg:text-[20px] font-[700] text-white line-clamp-2 drop-shadow-lg">
                      {offer.name_ar || offer.name_en || t("GameAccessories")}
                    </h1>
                    <p className="text-[8px] md:text-[12px] lg:text-[16px] text-[#F3AC5D] mt-1 font-[700] drop-shadow-lg">
                      {getDiscountText(offer)}
                    </p>
                    <Link
                      to={getOfferLink()}
                      className="inline-block w-fit mt-4 px-3 py-1 text-[8px] md:text-[12px] text-white bg-[#F3AC5D] rounded-[6px] hover:bg-[#e79940] transition-all"
                    >
                      {t("ShopNow")}
                    </Link>
                  </div>
                </div>
              ) : (
                <div key={index} className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={lang === 'ar' ? '/src/assets/images/coming-soon-ar.svg' : '/src/assets/images/coming-soon-en.svg'}
                    alt={t("ComingSoon")}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>

          {/* Gaming Section */}
          <div className="relative w-full h-[150px] md:h-[200px] lg:h-[250px] rounded-[16px] overflow-hidden">
            {gamingOffer ? (
              <>
                <img
                  src={gamingOffer.image}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={gamingOffer.name_ar || gamingOffer.name_en || t("GamingDevices")}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    }
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
                  <h1 className="text-[18px] md:text-[24px] lg:text-[32px] font-[700] text-white drop-shadow-lg">
                    {gamingOffer.name_ar || gamingOffer.name_en || t("GamingDevices")}
                  </h1>
                  <p className="text-[#F3AC5D] text-[12px] md:text-[16px] font-[700] mt-1 drop-shadow-lg">
                    {getDiscountText(gamingOffer)}
                  </p>
                  <Link
                    to={getOfferLink()}
                    className="w-[100px] h-[35px] md:w-[116px] md:h-[42px] text-white mt-[10px] md:mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all hover:bg-[#e79940] hover:shadow-lg hover:scale-105"
                  >
                    {t("ShopNow")}
                  </Link>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <img
                  src={lang === 'ar' ? '/src/assets/images/coming-soon-ar.svg' : '/src/assets/images/coming-soon-en.svg'}
                  alt={t("ComingSoon")}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Row 2 - Accessories 3 & 4 */}
          <div className="flex flex-row gap-[20px]">
            {[2, 3].map((index) => {
              const offerIndex = index;
              const offer = accessoryOffers[offerIndex];
              return offer ? (
                <div key={index} className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] relative overflow-hidden">
                  <img
                    src={offer.image}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={offer.name_ar || offer.name_en || t("GameAccessories")}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                      }
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                  <div className="absolute inset-0 z-10 px-4 py-3 text-right flex flex-col justify-end">
                    <h1 className="text-[10px] md:text-[15px] lg:text-[20px] font-[700] text-white line-clamp-2 drop-shadow-lg">
                      {offer.name_ar || offer.name_en || t("GameAccessories")}
                    </h1>
                    <p className="text-[8px] md:text-[12px] lg:text-[16px] text-[#F3AC5D] mt-1 font-[700] drop-shadow-lg">
                      {getDiscountText(offer)}
                    </p>
                    <Link
                      to={getOfferLink()}
                      className="inline-block w-fit mt-4 px-3 py-1 text-[8px] md:text-[12px] text-white bg-[#F3AC5D] rounded-[6px] hover:bg-[#e79940] transition-all"
                    >
                      {t("ShopNow")}
                    </Link>
                  </div>
                </div>
              ) : (
                <div key={index} className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={lang === 'ar' ? '/src/assets/images/coming-soon-ar.svg' : '/src/assets/images/coming-soon-en.svg'}
                    alt={t("ComingSoon")}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}