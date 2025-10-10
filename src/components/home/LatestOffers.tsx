import svg from "../../assets/images/svg2.png";
import laptops from "../../assets/images/laptops.png";
import game from "../../assets/images/game.png";
import playstation from "../../assets/images/playstation.png";
import { Link } from "react-router-dom";
import '../../style.css'
export default function LatestOffers() {
  return (
    <div className="w-full mt-[60px] lg:px-[90px] px-2 pt-20 md:pt-0 md:mt-[80px] relative  md:px-0">
      {/* Title */}
      <h1 className="text-[28px] md:text-[40px] font-[700] text-[#211C4D] text-center">
        أحدث العروض
      </h1>

      <img
        className="absolute hidden md:block top-[20px] right-[37%] w-[80px]"
        src={svg}
        alt=""
      />

      {/* Layout wrapper */}
      <div className="flex flex-col md:flex-row items-start justify-center pt-[40px] md:pt-[50px] gap-[20px]">

        {/* Left section (Laptops) */}
        <div className="relative flex items-end justify-center h-[80vh] lg:h-[58rem] md:h-[117vh] w-full md:w-[36%] rounded-[16px] overflow-hidden">
          <img
            src={laptops}
            className="absolute top-0 left-0 w-full h-full object-fill"
            alt=""
          />
          <div className="z-[2] relative flex flex-col justify-center items-center pb-[40px] md:pb-[100px] text-center">
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
        <div className="flex flex-col gap-[20px] w-full md:w-[60%]">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-[20px]">
            {[game, game].map((img, i) => (
              <div key={i} className="w-full h-[200px] md:h-[230px] rounded-[16px] relative overflow-hidden">
                <img src={img} className="absolute inset-0 w-full h-full " alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211c4d80]/80 via-[#211c4d8000]/30 to-transparent rounded-[16px]"></div>
                <div className="relative z-[2] mr-[20px] mt-[20px] text-right">
                  <h1 className="text-[20px] md:text-[24px] font-[700] text-[#211C4D] md:text-[#211C4D]">إكسسوارات الألعاب</h1>
                  <p className="text-[#211C4D] md:text-[#211C4D] text-[16px] md:text-[18px] textoffer">خصم يصل إلى 30%</p>
                  <Link
                    to={""}
                    className="w-[110px] h-[35px] md:w-[117px] md:h-[30px] text-[#F3AC5D] mt-[15px] bg-[#211C4D] hover:text-[#211C4D] rounded-[8px] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105 btnoffer"
                  >
                    تسوق الآن
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Playstation */}
          <div className="relative w-full h-[220px] md:h-auto rounded-[16px] overflow-hidden">
            <img src={playstation} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211c4d80]/80 via-[#211c4d8000]/30 to-transparent rounded-[16px]"></div>
            <div className="absolute inset-0 flex flex-col bigtitle items-center md:pl-[350px] pl-[150px] justify-center text-center">
              <h1 className="text-[28px] md:text-[56px] font-[700] text-[#211C4D]">أجهزة الألعاب</h1>
              <p className="text-[#211C4D] text-[18px] md:text-[20px] font-[700] mt-1">خصم يصل إلى 15%</p>
              <Link
                to={""}
                className="w-[110px] h-[40px] md:w-[116px] md:h-[42px] text-white mt-[20px] bg-[#F3AC5D] rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105"
              >
                تسوق الآن
              </Link>
            </div>
          </div>

          {/* Row 2 (same as Row 1) */}
          <div className="flex flex-col md:flex-row gap-[20px]">
            {[game, game].map((img, i) => (
              <div key={i} className="w-full h-[200px] md:h-[230px] rounded-[16px] relative overflow-hidden">
                <img src={img} className="absolute inset-0 w-full h-full " alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211c4d80]/80 via-[#211c4d8000]/30 to-transparent rounded-[16px]"></div>
                <div className="relative z-[2] mr-[20px] mt-[20px] text-right">
                  <h1 className="text-[20px] md:text-[24px] font-[700] text-[#211C4D] md:text-[#211C4D]">إكسسوارات الألعاب</h1>
                  <p className="text-[#211C4D] md:text-[#211C4D] text-[16px] md:text-[18px] textoffer">خصم يصل إلى 30%</p>
                  <Link
                    to={""}
                    className="w-[110px] h-[35px] md:w-[117px] md:h-[30px] text-[#F3AC5D] mt-[15px] bg-[#211C4D] hover:text-[#211C4D] rounded-[8px] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#e79940] hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)] hover:scale-105 btnoffer"
                  >
                    تسوق الآن
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
