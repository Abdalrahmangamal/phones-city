import { useEffect } from "react";
import { Link } from "react-router-dom";
import svg from "../../assets/images/svg2.png";
import laptops from "../../assets/images/bglabtop.png";
import lapimg from "../../assets/images/lapimg.png";
import control from "../../assets/images/control.png";
import bgsmalloffer from "../../assets/images/bgsmalloffer.png";
import largbgoffers from "../../assets/images/largbgoffers.png";
import ps5 from "../../assets/images/ps5.png";
import { useLatestOffersStore } from "../../store/home/latestOffersStore";
import "../../style.css";
import Loader from '@/components/Loader';
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";

export default function LatestOffers() {
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { offers, loading, fetchOffers } = useLatestOffersStore();

  useEffect(() => {
    fetchOffers(lang);
  }, [lang, fetchOffers]);

  // جلب أول 6 عروض فقط (للأمان)
  const limitedOffers = offers.slice(0, 6);

  // أول عرض → لابتوب (يستخدم first_related)
  const laptopOffer = limitedOffers[0];

  // ثاني عرض → Gaming (يستخدم first_related)
  const gamingOffer = limitedOffers[1];

  // الباقي → إكسسوارات (يستخدمون products[])
  const accessoryOffers = limitedOffers.slice(2, 6);

  const getDiscountText = (offer: any) => {
    if (!offer) return t("SpecialDiscount");

    if (offer.type === 'percentage') {
      return `${t("Discount")} ${offer.value}%`;
    } else {
      return `${t("Discount")} ${offer.value} ${t("SAR")}`;
    }
  };

  // دالة لتوليد رابط صفحة المنتج
  const getProductLink = (offer: any, productIndex?: number) => {
    if (!offer) return `/${lang}/offers`;

    let productId: number | undefined;

    if (typeof productIndex === 'number' && offer.products?.[productIndex]) {
      // للإكسسوارات الصغيرة
      productId = offer.products[productIndex]?.id;
    } else {
      // للكروت الكبيرة (لابتوب أو Gaming)
      productId = offer.first_related?.slug;
    }

    if (!productId) {
      return `/${lang}/offers`; // fallback
    }

    return `/${lang}/singleproduct/${productId}`;
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
          className={`absolute hidden md:block ${lang === "ar"
            ? "w-[200px] -bottom-15 -right-23"
            : "w-[200px] -bottom-15 -left-20 -scale-x-100"
            }`}
          src={svg}
          alt=""
        />
      </div>

      <div className="flex flex-col md:flex-row items-center h-full md:items-start justify-center pt-[40px] md:pt-[50px] gap-[20px]">
        {/* Laptop Section - Desktop */}
        <div className="relative hidden md:flex items-end justify-center md:!h-full w-[300px] md:w-[36%] rounded-[16px]">
          {laptopOffer ? (
            <>
              <img src={laptops} className="top-0 left-0 w-full h-[50vh] md:!h-full object-fill" alt="" />
              <img src={lapimg} className="left-[13%] w-[250px] md:w-[90%] md:left-[2%] md:top-[-20px] top-0 z-10 absolute object-fill" alt="" />
              <div className="z-[20] absolute flex flex-col bottom-[-20px] justify-center items-center pb-[40px] md:pb-[50px] lg:pb-[100px] text-center">
                <h1 className="text-white font-[700] text-[32px] md:text-[35px] lg:text-[54px]">
                  {laptopOffer.name_ar || t("Laptop")}
                </h1>
                <p className="text-[18px] md:text-[24px] text-[#F3AC5D] font-[700] mt-1">
                  {getDiscountText(laptopOffer)}
                </p>
                <Link
                  to={getProductLink(laptopOffer)}
                  className="w-[110px] h-[40px] md:w-[116px] md:h-[42px] text-white mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105"
                >
                  {t("ShopNow")}
                </Link>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-[16px] flex items-center justify-center">
              <p className="text-gray-500">{t("NoLaptopOffers")}</p>
            </div>
          )}
        </div>

        {/* Mobile Laptop Section */}
        <div className="relative w-full block md:hidden h-[150px] rounded-[16px] overflow-hidden">
          {laptopOffer ? (
            <>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
                <h1 className="text-[23px] font-[700] text-[#211C4D]">
                  {laptopOffer.name_ar || t("Laptop")}
                </h1>
                <p className="text-[#211C4D] text-[15px] font-[700] mt-1">
                  {getDiscountText(laptopOffer)}
                </p>
                <Link
                  to={getProductLink(laptopOffer)}
                  className="w-[100px] h-[35px] text-white mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#e79940] hover:shadow-lg hover:scale-105"
                >
                  {t("ShopNow")}
                </Link>
              </div>
              <img src={laptops} className="w-full h-full object-fill" alt="" />
              <img src={lapimg} className="absolute right-2 top-[-10px] w-[130px] z-10" alt="" />
            </>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">{t("NoOffers")}</p>
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
                  <img src={bgsmalloffer} className="w-full h-full" alt="" />
                  <img src={control} className="absolute object-contain inset-0 w-full h-full" alt="" />
                  <div className="absolute inset-0 z-10 px-4 py-3 text-right">
                    <h1 className="text-[10px] md:text-[15px] lg:text-[24px] font-[700] text-[#211C4D] line-clamp-2">
                      {offer.products?.[0]?.name_ar || offer.name_ar || t("GameAccessories")}
                    </h1>
                    <p className="text-[8px] md:text-[12px] lg:text-[18px] text-[#211C4D] mt-1">
                      {getDiscountText(offer)}
                    </p>
                    <Link
                      to={getProductLink(offer, 0)}
                      className="inline-block mt-4 px-4 py-2 text-[8px] md:text-[14px] text-[#F3AC5D] bg-[#211C4D] rounded-[8px] hover:bg-[#e79940] hover:text-white transition-all"
                    >
                      {t("ShopNow")}
                    </Link>
                  </div>
                </div>
              ) : (
                <div key={index} className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">{t("ComingSoon")}</p>
                </div>
              );
            })}
          </div>

          {/* Gaming Section */}
          <div className="relative w-full h-[150px] md:h-auto rounded-[16px] overflow-hidden">
            {gamingOffer ? (
              <>
                <img src={largbgoffers} className="w-full h-full object-fill" alt="" />
                <img src={ps5} className="absolute left-[15%] top-0 w-[130px] md:w-[230px] z-10" alt="" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
                  <h1 className="text-[23px] md:text-[56px] font-[700] text-[#211C4D]">
                    {gamingOffer.name_ar || t("GamingDevices")}
                  </h1>
                  <p className="text-[#211C4D] text-[15px] md:text-[20px] font-[700] mt-1">
                    {getDiscountText(gamingOffer)}
                  </p>
                  <Link
                    to={getProductLink(gamingOffer)}
                    className="w-[100px] h-[35px] md:w-[116px] md:h-[42px] text-white mt-[10px] md:mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all hover:bg-[#e79940] hover:shadow-lg hover:scale-105"
                  >
                    {t("ShopNow")}
                  </Link>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">{t("ComingSoon")}</p>
              </div>
            )}
          </div>

          {/* Row 2 - Accessories 3 & 4 */}
          <div className="flex flex-row gap-[20px]">
            {[2, 3].map((index) => {
              const offer = accessoryOffers[index - 2]; // لأن accessoryOffers يبدأ من 0
              return offer ? (
                <div key={index} className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] relative overflow-hidden">
                  <img src={bgsmalloffer} className="w-full h-full" alt="" />
                  <img src={control} className="absolute object-contain inset-0 w-full h-full" alt="" />
                  <div className="absolute inset-0 z-10 px-4 py-3 text-right">
                    <h1 className="text-[10px] md:text-[15px] lg:text-[24px] font-[700] text-[#211C4D] line-clamp-2">
                      {offer.products?.[0]?.name_ar || offer.name_ar || t("GameAccessories")}
                    </h1>
                    <p className="text-[8px] md:text-[12px] lg:text-[18px] text-[#211C4D] mt-1">
                      {getDiscountText(offer)}
                    </p>
                    <Link
                      to={getProductLink(offer, 0)}
                      className="inline-block mt-4 px-4 py-2 text-[8px] md:text-[14px] text-[#F3AC5D] bg-[#211C4D] rounded-[8px] hover:bg-[#e79940] hover:text-white transition-all"
                    >
                      {t("ShopNow")}
                    </Link>
                  </div>
                </div>
              ) : (
                <div key={index} className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">{t("ComingSoon")}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}