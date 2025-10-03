import svg from "../../assets/images/svg2.png";
import laptops from "../../assets/images/laptops.png";
import game from "../../assets/images/game.png";
import playstation from "../../assets/images/playstation.png";
import { Link } from "react-router-dom";
export default function LatestOffers() {
  return (
    <div className="w-full mt-[80px] relative">
      <h1 className="text-[40px] font-[700] text-[211C4D ] text-center">
        احدث العروض
      </h1>
      <img className="absolute top-[20px] right-[37%]" src={svg} alt="" />
      <div className="flex flex-col md:flex-row items-start  justify-center pt-[50px] gap-[20px]">
        <div className="relative flex items-end  justify-center h-[120vh] w-full md:w-[36%]">
          <img
            src={laptops}
            className="h-[128vh] absolute top-0 w-full"
            alt=""
          />
          <div className="z-[2] relative flex flex-col justify-center items-center pb-[100px]">
            <h1 className="text-[white] text-center font-[700] text-[56px]">
              لابتوب
            </h1>
            <p className="text-[24px] text-[#F3AC5D] font-[700]">
              خصم يصل الي 30%
            </p>
            <Link
              to={""}
              className="
    w-[116px] h-[42px] 
    text-white 
    mt-[25px] 
    bg-[#F3AC5D] 
    rounded-[8px] 
    flex items-center justify-center 
    gap-2
    transition-all duration-300 ease-in-out
    hover:bg-[#e79940] 
    hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)]
    hover:scale-105
  "
            >
              تسوق الآن
            </Link>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex  gap-[20px] flex-col md:flex-row items-center justify-between">
            <div className="w-full h-[210px] pt-[20px]  rounded-[16px] relative">
              <div className="z-23 mr-[25px] relative">

              <h1 className="text-[24px] font-[700] text-[#211C4D]">إكسسوارات الألعاب</h1>
              <p>خصم يصل الي 30%</p>
              <Link
                to={""}
                className="
    w-[117px] h-[30px] 
    text-[#F3AC5D] 
    mt-[25px] 
    bg-[#211C4D] 
    hover:text-[#211C4D]
    rounded-[8px] 
    flex items-center justify-center 
    gap-2
    transition-all duration-300 ease-in-out
    hover:bg-[#e79940] 
    hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)]
    hover:scale-105
  "
              >
                تسوق الآن
             
              </Link>
              </div>
              <img
                src={game}
                className="w-full absolute top-0 !rounded-[16px]"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211c4d80]/80 via-[#211c4d8000]/30 to-transparent rounded-[16px]"></div>
            </div>
              <div className="w-full h-[210px] pt-[20px]  rounded-[16px] relative">
                <div className="z-23 mr-[25px] relative">

                <h1 className="text-[24px] font-[700] text-[#211C4D]">إكسسوارات الألعاب</h1>
                <p>خصم يصل الي 30%</p>
                <Link
                  to={""}
                  className="
      w-[117px] h-[30px] 
      text-[#F3AC5D] 
      mt-[25px] 
      bg-[#211C4D] 
      hover:text-[#211C4D]
      rounded-[8px] 
      flex items-center justify-center 
      gap-2
      transition-all duration-300 ease-in-out
      hover:bg-[#e79940] 
      hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)]
      hover:scale-105
    "
                >
                  تسوق الآن
              
                </Link>
                </div>
                <img
                  src={game}
                  className="w-full absolute top-0 !rounded-[16px]"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211c4d80]/80 via-[#211c4d8000]/30 to-transparent rounded-[16px]"></div>
              </div>
            
          </div>
          <div>
            <div className="w-full relative">
              <img src={playstation} className="w-full rounded-[16px]" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211c4d80]/80 via-[#211c4d8000]/30 to-transparent rounded-[16px]"></div>
              <div className="absolute flex flex-col items-center md:pl-[350px] pl-[160px] !text-center justify-center  inset-0 bg-gradient-to-t from-[#211c4d80]/80 via-[#211c4d8000]/30 to-transparent rounded-[16px]">
              <h1 className="md:text-[56px] text-[30px] font-[700]  text-[#211C4D] ">أجهزة الألعاب</h1>
              <p className="text-[#211C4D] text-[20px] font-[700]">خصم يصل الي 15%</p>
              <Link
  to={''}
  className='
    w-[116px] h-[42px] 
    text-white 
    mt-[25px] 
    bg-[#F3AC5D] 
    rounded-[8px] 
    flex items-center justify-center 
    gap-2
    transition-all duration-300 ease-in-out
    hover:bg-[#e79940] 
    hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)]
    hover:scale-105
  '
>
  تسوق الآن
  <svg
    width="19"
    height="14"
    viewBox="0 0 19 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:translate-x-1"
  >
    <path
      d="M5.75 3.57422H13.25C13.6124 3.57422 13.9062 3.80274 13.9062 4.08464C13.9062 4.36653 13.6124 4.59505 13.25 4.59505H7.33433L13.714 9.55705C13.9703 9.75638 13.9703 10.0796 13.714 10.2789C13.4578 10.4782 13.0422 10.4782 12.786 10.2789L6.40625 5.31689V9.91797C6.40625 10.1999 6.11244 10.4284 5.75 10.4284C5.38756 10.4284 5.09375 10.1999 5.09375 9.91797V4.08464C5.09375 3.94424 5.16663 3.81708 5.28457 3.7248L5.28736 3.72264C5.34995 3.67424 5.42197 3.63767 5.4988 3.61295C5.57617 3.58799 5.66102 3.57422 5.75 3.57422Z"
      fill="white"
    />
  </svg>
</Link>
              </div>
            </div>
          </div>
          <div className="flex gap-[20px] flex-col md:flex-row items-center justify-between">
            <div className="w-full h-[210px] pt-[20px]  rounded-[16px] relative">
                <div className="z-23 mr-[25px] relative">

                <h1 className="text-[24px] font-[700] text-[#211C4D]">إكسسوارات الألعاب</h1>
                <p>خصم يصل الي 30%</p>
                <Link
                  to={""}
                  className="
      w-[117px] h-[30px] 
      text-[#F3AC5D] 
      mt-[25px] 
      bg-[#211C4D] 
      hover:text-[#211C4D]
      rounded-[8px] 
      flex items-center justify-center 
      gap-2
      transition-all duration-300 ease-in-out
      hover:bg-[#e79940] 
      hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)]
      hover:scale-105
    "
                >
                  تسوق الآن
              
                </Link>
                </div>
                <img
                  src={game}
                  className="w-full absolute top-0 !rounded-[16px]"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211c4d80]/80 via-[#211c4d8000]/30 to-transparent rounded-[16px]"></div>
              </div>
               <div className="w-full h-[210px] pt-[20px]  rounded-[16px] relative">
                <div className="z-23 mr-[25px] relative">

                <h1 className="text-[24px] font-[700] text-[#211C4D]">إكسسوارات الألعاب</h1>
                <p>خصم يصل الي 30%</p>
                <Link
                  to={""}
                  className="
      w-[117px] h-[30px] 
      text-[#F3AC5D] 
      mt-[25px] 
      bg-[#211C4D] 
      hover:text-[#211C4D]
      rounded-[8px] 
      flex items-center justify-center 
      gap-2
      transition-all duration-300 ease-in-out
      hover:bg-[#e79940] 
      hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)]
      hover:scale-105
    "
                >
                  تسوق الآن
              
                </Link>
                </div>
                <img
                  src={game}
                  className="w-full absolute top-0 !rounded-[16px]"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211c4d80]/80 via-[#211c4d8000]/30 to-transparent rounded-[16px]"></div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
