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
export default function LatestOffers() {
  const { offers, fetchOffers } = useLatestOffersStore();
  
  useEffect(() => {
    fetchOffers();
  }, []);
  
  // تأكد من أن لدينا 6 عروض فقط
  const limitedOffers = offers.slice(0, 6);
  
  // تقسيم العروض حسب التخطيط
  const laptopOffer = limitedOffers[0];
  const gamingOffer = limitedOffers[1];
  const accessoryOffers = limitedOffers.slice(2, 6);

  // دالة مساعدة لعرض قيمة الخصم
  const getDiscountText = (offer: any) => {
    if (!offer) return "خصم خاص";
    
    if (offer.type === 'percentage') {
      return `خصم ${offer.value}%`;
    } else {
      return `خصم ${offer.value} ريال`;
    }
  };




  return (
    <div className="w-full translate-y-[-50px] md:h-[60vh] xl:h-[100vh] xl:px-[90px] px-2 pt-8 md:pt-0 relative md:px-0">
      {/* Title */}
      <h1 className="text-[24px] mb-[0px] md:text-[40px] font-[700] text-[#211C4D] text-center">
        أحدث العروض
      </h1>

      <img
        className="absolute hidden md:block top-[20px] right-[37%] w-[80px]"
        src={svg}
        alt=""
      />

      {/* Layout wrapper */}
      <div className="flex flex-col md:flex-row items-center h-full md:items-start justify-center pt-[40px] md:pt-[50px] gap-[20px]">
        {/* Left section (Laptops) */}
        <div className="relative hidden md:flex items-end justify-center md:!h-full w-[300px] md:w-[36%] rounded-[16px]">
          {laptopOffer ? (
            <>
              <img
                src={laptops}
                className="top-0 left-0 w-full h-[50vh] md:!h-full object-fill"
                alt=""
              />
              <img
                src={lapimg}
                className="left-[13%] w-[250px] md:w-[90%] md:left-[2%] md:top-[-20px] top-0 z-1 absolute object-fill"
                alt=""
              />
              <div className="z-[2] absolute flex flex-col bottom-[-20px] justify-center items-center pb-[40px] md:pb-[50px] lg:pb-[100px] text-center">
                <h1 className="text-white font-[700] text-[32px] md:text-[35px] lg:text-[54px]">
                  {laptopOffer?.name_ar || "لابتوب"}
                </h1>
                <p className="text-[18px] md:text-[24px] text-[#F3AC5D] font-[700] mt-1">
                  {getDiscountText(laptopOffer)}
                </p>
                <Link
                  to={`/offers/${laptopOffer?.id}`}
                  className="w-[110px] h-[40px] md:w-[116px] md:h-[42px] text-white mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105"
                >
                  تسوق الآن
                </Link>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-[16px] flex items-center justify-center">
              <p className="text-gray-500">لا توجد عروض للابتوبات حالياً</p>
            </div>
          )}
        </div>
        
        {/* Mobile laptop section */}
        <div className="relative w-full block md:hidden md:h-auto h-[150px] rounded-[16px] overflow-hidden">
          {laptopOffer ? (
            <>
              <div className="absolute left-9 top-2 flex flex-col bigtitle items-center md:pl-[350px] justify-center text-center">
                <h1 className="text-[23px] md:text-[56px] font-[700] text-[#211C4D]">
                  {laptopOffer?.name_ar || "لابتوب"}
                </h1>
                <p className="text-[#211C4D] text-[15px] md:text-[20px] font-[700] mt-1">
                  {getDiscountText(laptopOffer)}
                </p>
                <Link
                  to={`/offers/${laptopOffer?.id}`}
                  className="w-[100px] h-[35px] md:w-[116px] md:h-[42px] text-white mt-[30px] md:mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105"
                >
                  تسوق الآن
                </Link>
              </div>
              <img
                src={laptops}
                className="w-full h-full object-fill"
                alt=""
              />
              <img
                src={lapimg}
                className="absolute z-1 right-2 top-[-10px] w-[130px] md:w-[230px]"
                alt=""
              />
            </>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">لا توجد عروض</p>
            </div>
          )}
        </div>
        
        {/* Right section (multiple boxes) */}
        <div className="flex flex-col gap-[20px] h-full justify-between w-full md:w-[60%]">
          {/* Row 1 */}
          <div className="flex flex-row gap-[20px]">
            {accessoryOffers?.length >= 2 ? (
              <>
                <div className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] relative overflow-hidden">
                  <img src={bgsmalloffer} className="w-full h-full" alt="" />
                  <img
                    src={control}
                    className="absolute object-contain top-0 left-0 w-full h-full"
                    alt=""
                  />
                  <div className="absolute inset-0 top-[0px] md:top-[0px] z-[2] mr-[20px] mt-[15px] md:mt-[10px] text-right">
                    <h1 className="text-[10px] md:text-[15px] font-[700] lg:text-[24px] text-[#211C4D] md:text-[#211C4D]">
                      {accessoryOffers[0]?.name_ar || "إكسسوارات الألعاب"}
                    </h1>
                    <p className="text-[#211C4D] md:text-[#211C4D] text-[8px] md:!text-[12px] lg:!text-[18px] textoffer">
                      {getDiscountText(accessoryOffers[0])}
                    </p>
                    <Link
                      to={`/offers/${accessoryOffers[0]?.id || "#"}`}
                      className="text-[8px] w-[50px] md:text-[16px] h-[30px] md:w-[117px] md:h-[30px] text-[#F3AC5D] mt-[30px] bg-[#211C4D] hover:text-[#211C4D] rounded-[8px] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105 btnoffer"
                    >
                      تسوق الآن
                    </Link>
                  </div>
                </div>
                <div className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] relative overflow-hidden">
                  <img src={bgsmalloffer} className="w-full h-full" alt="" />
                  <img
                    src={control}
                    className="absolute object-contain top-0 left-0 w-full h-full"
                    alt=""
                  />
                  <div className="absolute inset-0 top-[0px] md:top-[0px] z-[2] mr-[20px] mt-[15px] md:mt-[10px] text-right">
                    <h1 className="text-[10px] md:text-[15px] font-[700] lg:text-[24px] text-[#211C4D] md:text-[#211C4D]">
                      {accessoryOffers[1]?.name_ar || "إكسسوارات الألعاب"}
                    </h1>
                    <p className="text-[#211C4D] md:text-[#211C4D] text-[8px] md:!text-[12px] lg:!text-[18px] textoffer">
                      {getDiscountText(accessoryOffers[1])}
                    </p>
                    <Link
                      to={`/offers/${accessoryOffers[1]?.id || "#"}`}
                      className="text-[8px] w-[50px] md:text-[16px] h-[30px] md:w-[117px] md:h-[30px] text-[#F3AC5D] mt-[30px] bg-[#211C4D] hover:text-[#211C4D] rounded-[8px] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105 btnoffer"
                    >
                      تسوق الآن
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              // عرض عناصر افتراضية إذا لم تكن هناك عروض كافية
              [...Array(2)].map((_, index) => (
                <div key={index} className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] relative overflow-hidden bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">عرض قريباً</p>
                </div>
              ))
            )}
          </div>
        
          {/* Playstation / Gaming */}
          <div className="relative w-full md:h-auto h-[150px] rounded-[16px] overflow-hidden">
            {gamingOffer ? (
              <>
                <img
                  src={largbgoffers}
                  className="w-full h-full object-fill"
                  alt=""
                />
                <img
                  src={ps5}
                  className="absolute z-1 left-[15%] top-0 w-[130px] md:w-[230px]"
                  alt=""
                />
                <div className="absolute inset-0 flex flex-col bigtitle items-center md:pl-[350px] pl-[150px] justify-center text-center">
                  <h1 className="text-[23px] md:text-[56px] font-[700] text-[#211C4D]">
                    {gamingOffer?.name_ar || "أجهزة الألعاب"}
                  </h1>
                  <p className="text-[#211C4D] text-[15px] md:text-[20px] font-[700] mt-1">
                    {getDiscountText(gamingOffer)}
                  </p>
                  <Link
                    to={`/offers/${gamingOffer.id}`}
                    className="w-[100px] h-[35px] md:w-[116px] md:h-[42px] text-white mt-[10px] md:mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105"
                  >
                    تسوق الآن
                  </Link>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">لا توجد عروض للألعاب</p>
              </div>
            )}
          </div>
          
          {/* Row 2 */}
          <div className="flex flex-row gap-[20px]">
            {accessoryOffers?.length >= 4 ? (
              <>
                <div className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] relative overflow-hidden">
                  <img src={bgsmalloffer} className="w-full h-full" alt="" />
                  <img
                    src={control}
                    className="absolute object-contain top-0 left-0 w-full h-full"
                    alt=""
                  />
                  <div className="absolute inset-0 top-[0px] md:top-[0px] z-[2] mr-[20px] mt-[15px] md:mt-[10px] text-right">
                    <h1 className="text-[10px] md:text-[15px] font-[700] lg:text-[24px] text-[#211C4D] md:text-[#211C4D]">
                      {accessoryOffers[2]?.name_ar || "إكسسوارات الألعاب"}
                    </h1>
                    <p className="text-[#211C4D] md:text-[#211C4D] text-[8px] md:!text-[12px] lg:!text-[18px] textoffer">
                      {getDiscountText(accessoryOffers[2])}
                    </p>
                    <Link
                      to={`/offers/${accessoryOffers[2]?.id || "#"}`}
                      className="text-[8px] w-[50px] md:text-[16px] h-[30px] md:w-[117px] md:h-[30px] text-[#F3AC5D] mt-[30px] bg-[#211C4D] hover:text-[#211C4D] rounded-[8px] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105 btnoffer"
                    >
                      تسوق الآن
                    </Link>
                  </div>
                </div>
                <div className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] relative overflow-hidden">
                  <img src={bgsmalloffer} className="w-full h-full" alt="" />
                  <img
                    src={control}
                    className="absolute object-contain top-0 left-0 w-full h-full"
                    alt=""
                  />
                  <div className="absolute inset-0 top-[0px] md:top-[0px] z-[2] mr-[20px] mt-[15px] md:mt-[10px] text-right">
                    <h1 className="text-[10px] md:text-[15px] font-[700] lg:text-[24px] text-[#211C4D] md:text-[#211C4D]">
                      {accessoryOffers[3]?.name_ar || "إكسسوارات الألعاب"}
                    </h1>
                    <p className="text-[#211C4D] md:text-[#211C4D] text-[8px] md:!text-[12px] lg:!text-[18px] textoffer">
                      {getDiscountText(accessoryOffers[3])}
                    </p>
                    <Link
                      to={`/offers/${accessoryOffers[3]?.id || "#"}`}
                      className="text-[8px] w-[50px] md:text-[16px] h-[30px] md:w-[117px] md:h-[30px] text-[#F3AC5D] mt-[30px] bg-[#211C4D] hover:text-[#211C4D] rounded-[8px] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105 btnoffer"
                    >
                      تسوق الآن
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              // عرض عناصر افتراضية إذا لم تكن هناك عروض كافية
              [...Array(2)].map((_, index) => (
                <div key={index + 2} className="w-full h-[120px] md:h-full lg:h-[175px] rounded-[16px] relative overflow-hidden bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">عرض قريباً</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {!offers?(<Loader/>):("")}
    </div>
  );
}