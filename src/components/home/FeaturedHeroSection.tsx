import { Link } from "react-router-dom";
import { useLangSync } from "@/hooks/useLangSync";

interface FeaturedHeroSectionProps {
  title: string;
  description: string;
  buttonText: string;        // نستخدمه الآن بدلاً من الترجمة الثابتة
  buttonLink: string;        // مثل "/products" أو "/offers"
  backgroundImage?: string;
}

const FeaturedHeroSection = ({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
}: FeaturedHeroSectionProps) => {
  const { lang } = useLangSync();

  // تحديد اتجاه النصوص والـ padding حسب اللغة
  const textAlignClass = lang === "ar" ? "text-right" : "text-left";
  const paddingClass = lang === "ar" ? "pr-[57px]" : "pl-[57px]";

  // اتجاه الـ gradient حسب اللغة
  const gradientDirection = lang === "ar"
    ? "bg-gradient-to-r from-transparent via-[#211c4d57] to-[#211C4D]"
    : "bg-gradient-to-l from-transparent via-[#211c4d57] to-[#211C4D]";

  return (
    <div className="w-full">
      <div className="w-full h-[200px] rounded-lg mb-6 relative overflow-hidden">
        {/* Background Image أو Fallback Gradient */}
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
        <div className={`absolute inset-0 ${gradientDirection}`}></div>

        {/* المحتوى (العنوان + الوصف + الزر) */}
        <div
          className={`absolute inset-0 flex flex-col justify-start p-5 md:${paddingClass} ${textAlignClass}`}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <div className="w-full">
            <h1 className="text-white font-roboto font-bold text-[20px] sm:text-[24px] md:text-[32px] leading-[30px] sm:leading-[36px] md:leading-[48px] mb-1 md:mb-2">
              {title}
            </h1>
            {description && (
              <p className="text-white font-roboto text-[14px] sm:text-[16px] font-bold leading-5 mt-1">
                {description}
              </p>
            )}
          </div>

          {/* زر "تسوق الآن" – بنفس ستايل HeroSection */}
          <Link
            to={`/${lang}${buttonLink}`} // مثال: /ar/products أو /en/offers
            className="
              w-[116px] h-[42px]
              mt-[20px]
              flex items-center justify-center gap-2
              rounded-[8px]
              text-white text-[14px] md:text-[16px]
              bg-[#F3AC5D]
              transition-all duration-300 ease-in-out
              hover:bg-[#e79940]
              hover:shadow-[0_8px_20px_rgba(243,172,93,0.5)]
              hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-[#F3AC5D] focus:ring-offset-2
              flex-shrink-0
            "
            aria-label={lang === "ar" ? "اذهب للتسوق الآن" : "Go to shop now"}
          >
            <span>{buttonText}</span>
            <svg
              width="19"
              height="14"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`
                transition-transform duration-300
                hover:translate-x-1
                ${lang === "ar" ? "mr-2 rotate-180 hover:-translate-x-1" : "ml-2"}
              `}
              aria-hidden="true"
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