import svg from "../../assets/images/svg2.png";
import laptops from "../../assets/images/bglabtop.png";
import lapimg from "../../assets/images/lapimg.png";
import control from "../../assets/images/control.png";
import bgsmalloffer from "../../assets/images/bgsmalloffer.png";
import largbgoffers from "../../assets/images/largbgoffers.png";
import ps5 from "../../assets/images/ps5.png";
import { Link } from "react-router-dom";
import '../../style.css'
export default function LatestOffers() {
  return (
    <div className="w-full  lg:px-[90px] px-2  md:pt-0 md:mt-[80px] relative  md:px-0">
      {/* Title */}
      <h1 className="text-[24px] mb-[25px] md:text-[40px] font-[700] text-[#211C4D] text-center">
        أحدث العروض
      </h1>

      <img
        className="absolute hidden md:block top-[20px] right-[37%] w-[80px]"
        src={svg}
        alt=""
      />

      {/* Layout wrapper */}
      <div className="flex flex-col h-[100vh] md:flex-row items-start justify-center pt-[40px] md:pt-[50px] gap-[20px]">

        {/* Left section (Laptops) */}
        <div className="relative flex items-end justify-center h-[50vh]   md:h-[100vh] w-full md:w-[36%] rounded-[16px] ">
          <img
            src={laptops}
            className=" top-0 left-0 w-full h-[50vh] md:h-[100vh] object-fill"
            alt=""
          />
          <img
            src={lapimg}
            className="  left-[13%] w-[250px] md:w-[90%] md:left-[2%]  md:top-[-20px] top-0  z-1 absolute object-fill"
            alt=""
          />

          <div className="z-[2] absolute flex flex-col bottom-[-20px] justify-center items-center pb-[40px] md:pb-[100px] text-center">
            <h1 className="text-white font-[700] text-[32px] md:text-[56px]">لابتوب</h1>
            <p className="text-[18px] md:text-[24px] text-[#F3AC5D] font-[700] mt-1">خصم يصل إلى 30%</p>
            <Link
              to={""}
              className="w-[110px] h-[40px] md:w-[116px] md:h-[42px] text-white mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105"
            >
              تسوق الآن
            </Link>
          </div>
        </div>

        {/* Right section (multiple boxes) */}
        <div className="flex flex-col gap-[20px] h-[100vh] w-full md:w-[60%]">
          {/* Row 1 */}
          <div className="flex flex-row gap-[20px]">
              <div  className="w-full h-[120px] md:h-[200px] rounded-[16px] relative overflow-hidden">
                <img src={bgsmalloffer} className="  w-full h-full " alt="" />
                <img src={control} className=" absolute object-contain top-0 left-0  w-full h-full " alt="" />
                <div className="absolute inset-0 top-[10px] md:top-[20px] z-[2] mr-[20px] mt-[20px] text-right">
                  <h1 className="text-[10px] md:text-[24px] font-[700] text-[#211C4D] md:text-[#211C4D]">إكسسوارات الألعاب</h1>
                  <p className="text-[#211C4D] md:text-[#211C4D] text-[8px] md:text-[18px] textoffer">خصم يصل إلى 30%</p>
                  <Link
                    to={""}
                    className="text-[8px] w-[50px] md:text-[16px] h-[30px] md:w-[117px] md:h-[30px] text-[#F3AC5D] mt-[15px] bg-[#211C4D] hover:text-[#211C4D] rounded-[8px] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105 btnoffer"
                  >
                    تسوق الآن
                  </Link>
                </div>
              </div>
              <div  className="w-full h-[120px] md:h-[200px] rounded-[16px] relative overflow-hidden">
                <img src={bgsmalloffer} className="  w-full h-full " alt="" />
                <img src={control} className=" absolute object-contain top-0 left-0  w-full h-full " alt="" />
                <div className="absolute inset-0 top-[10px] md:top-[20px] z-[2] mr-[20px] mt-[20px] text-right">
                  <h1 className="text-[10px] md:text-[24px] font-[700] text-[#211C4D] md:text-[#211C4D]">إكسسوارات الألعاب</h1>
                  <p className="text-[#211C4D] md:text-[#211C4D] text-[8px] md:text-[18px] textoffer">خصم يصل إلى 30%</p>
                  <Link
                    to={""}
                    className="text-[8px] w-[50px] md:text-[16px] h-[30px] md:w-[117px] md:h-[30px] text-[#F3AC5D] mt-[15px] bg-[#211C4D] hover:text-[#211C4D] rounded-[8px] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105 btnoffer"
                  >
                    تسوق الآن
                  </Link>
                </div>
              </div>
              
        
            
          </div>

          {/* Playstation */}
          <div className="relative w-full md:h-auto h-[150px] rounded-[16px] overflow-hidden">
            <img src={largbgoffers} className="w-full h-full object-fill" alt="" />
            <img src={ps5} className="absolute z-1 left-[15%] top-0 w-[130px] md:w-[230px]" alt="" />
            <div className="absolute inset-0 flex flex-col bigtitle items-center md:pl-[350px] pl-[150px] justify-center text-center">
              <h1 className="text-[23px] md:text-[56px] font-[700] text-[#211C4D]">أجهزة الألعاب</h1>
              <p className="text-[#211C4D] text-[15px] md:text-[20px] font-[700] mt-1">خصم يصل إلى 15%</p>
              <Link
                to={""}
                className="w-[100px] h-[35px] md:w-[116px] md:h-[42px] text-white mt-[10px] md:mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105"
              >
                تسوق الآن
              </Link>
            </div>
          </div>

          {/* Row 2 (same as Row 1) */}
              <div className="flex flex-row gap-[20px]">
              <div  className="w-full h-[120px] md:h-[200px] rounded-[16px] relative overflow-hidden">
                <img src={bgsmalloffer} className="  w-full h-full " alt="" />
                <img src={control} className=" absolute object-contain top-0 left-0  w-full h-full " alt="" />
                <div className="absolute inset-0 top-[10px] md:top-[20px] z-[2] mr-[20px] mt-[20px] text-right">
                  <h1 className="text-[10px] md:text-[24px] font-[700] text-[#211C4D] md:text-[#211C4D]">إكسسوارات الألعاب</h1>
                  <p className="text-[#211C4D] md:text-[#211C4D] text-[8px] md:text-[18px] textoffer">خصم يصل إلى 30%</p>
                  <Link
                    to={""}
                    className="text-[8px] w-[50px] md:text-[16px] h-[30px] md:w-[117px] md:h-[30px] text-[#F3AC5D] mt-[15px] bg-[#211C4D] hover:text-[#211C4D] rounded-[8px] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105 btnoffer"
                  >
                    تسوق الآن
                  </Link>
                </div>
              </div>
              <div  className="w-full h-[120px] md:h-[200px] rounded-[16px] relative overflow-hidden">
                <img src={bgsmalloffer} className="  w-full h-full " alt="" />
                <img src={control} className=" absolute object-contain top-0 left-0  w-full h-full " alt="" />
                <div className="absolute inset-0 top-[10px] md:top-[20px] z-[2] mr-[20px] mt-[20px] text-right">
                  <h1 className="text-[10px] md:text-[24px] font-[700] text-[#211C4D] md:text-[#211C4D]">إكسسوارات الألعاب</h1>
                  <p className="text-[#211C4D] md:text-[#211C4D] text-[8px] md:text-[18px] textoffer">خصم يصل إلى 30%</p>
                  <Link
                    to={""}
                    className="text-[8px] w-[50px] md:text-[16px] h-[30px] md:w-[117px] md:h-[30px] text-[#F3AC5D] mt-[15px] bg-[#211C4D] hover:text-[#211C4D] rounded-[8px] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105 btnoffer"
                  >
                    تسوق الآن
                  </Link>
                </div>
              </div>
              
        
            
          </div>
        </div>
      </div>
    </div>
  );
}
