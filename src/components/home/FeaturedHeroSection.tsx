import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLangSync } from "@/hooks/useLangSync";

interface FeaturedHeroSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
}

const FeaturedHeroSection = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink,
  backgroundImage
}: FeaturedHeroSectionProps) => {
  const { lang } = useLangSync();
  
  // Determine text alignment based on language
  const textAlignClass = lang === "ar" ? "text-right" : "text-left";
  const paddingClass = lang === "ar" ? "pr-[57px]" : "pl-[57px]";
  
  return (
    <div className="lg:px-[90px] px-2 md:pt-0 pt-[50px]">
      <div className="w-full max-w-[1264px] mt-[50px] h-[230px] md:h-[351px] rounded-lg mb-16 relative overflow-hidden">
        {/* Background Image */}
        {backgroundImage ? (
          <img 
            src={backgroundImage} 
            alt="Featured Hero" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#211C4D] to-[#211C4D99]"></div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#211c4d57] to-[#211C4D]"></div>
        {/* Text Content - Responsive for mobile, without align-items and with correct padding */}
        <div 
          className={`absolute inset-0 flex flex-col justify-start ${textAlignClass} p-5 md:${paddingClass}`}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <h1 className="text-white font-roboto font-bold md:max-w-[30%] text-[32px] md:text-5xl leading-[48px] md:leading-[68px] mb-2 md:mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-white font-roboto md:max-w-[40%] text-[18px] font-bold text-base leading-6">
              {description}
            </p>
          )}
          <Link
            to={buttonLink}
            className="w-[116px] flex items-center rounded-[8px] text-white mt-[20px] justify-center bg-[#F3AC5D] h-[42px] hover:bg-[#e09a4d] transition-colors"
          >
            <p>{buttonText}</p>
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
        </div>
      </div>
    </div>
  );
};

export default FeaturedHeroSection;