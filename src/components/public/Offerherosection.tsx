import { Link } from "react-router-dom";
import herooffer from '@/assets/images/herooffer.png'
interface offerherotype {
  title: string;
  description: string;
  style?: string;
  textstyle?: string;
  padding?:string;
  descriptionstyle?: string;
  link?: string;
}
import { useLangSync } from "@/hooks/useLangSync";

export default function Offerherosection({
  title,
  description,
  style,
  padding,
  textstyle,
  descriptionstyle,
  link,
}: offerherotype) {
    const { lang } = useLangSync();

  return (
    <div className={`lg:px-[90px] px-2 ${padding} md:pt-0 pt-[50px] `}>
      <div
        className={`w-full max-w-[1264px] mt-[50px] ${style} h-[230px]  md:h-[351px] rounded-lg mb-16 relative isolate overflow-hidden`}
      >
        {/* Background Image */}
        <img
          src={herooffer}
          alt="كل ما تحتاجه في مدينه الهواتف"
          className="w-full h-full object-cover pointer-events-none select-none"
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 pointer-events-none bg-gradient-to-r  mdvia-[#211c4d33] ${lang=="ar"? "from-transparent via-[#211c4d57] to-[#211C4D]":"bg-gradient-to-l from-[#211C4D] via-[#211c4d57] mdvia-[#211c4d33] to-transparent"}`}></div>
        {/* Text Content - Responsive for mobile, without align-items and with correct padding */}
        <div className="absolute inset-0 z-10 flex flex-col justify-start text-start  p-5 md:pr-[57px]">
          <h1
            className={`text-white ${textstyle} font-roboto font-bold md:max-w-[30%] text-[24px] md:text-5xl leading-[48px] md:leading-[68px] mb-2 md:mb-4`}
          >
            {title}
          </h1>
          <p
            className={`text-white ${descriptionstyle} font-roboto md:max-w-[40%] text-[15px] font-bold text-base leading-6`}
          >
            {description}
          </p>
          {link ? (
            <Link
              to={`${link}`}
              className="w-[116px] flex items-center rounded-[8px] text-white mt-[20px] justify-center bg-[#F3AC5D] h-[42px]"
            >
              <p>تسوق الآن</p>
              <svg
                width="19"
                height="14"
                viewBox="0 0 19 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.75 3.57422H13.25C13.6124 3.57422 13.9062 3.80274 13.9062 4.08464C13.9062 4.36653 13.6124 4.59505 13.25 4.59505H7.33433L13.714 9.55705C13.9703 9.75638 13.9703 10.0796 13.714 10.2789C13.4578 10.4782 13.0422 10.4782 12.786 10.2789L6.40625 5.31689V9.91797C6.40625 10.1999 6.11244 10.4284 5.75 10.4284C5.38756 10.4284 5.09375 10.1999 5.09375 9.91797V4.08464C5.09375 3.94424 5.16663 3.81708 5.28457 3.7248L5.28736 3.72264C5.34995 3.67424 5.42197 3.63767 5.4988 3.61295C5.57617 3.58799 5.66102 3.57422 5.75 3.57422Z"
                  fill="white"
                />
              </svg>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
