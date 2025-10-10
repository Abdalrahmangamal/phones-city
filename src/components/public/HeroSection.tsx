  import { Swiper, SwiperSlide } from "swiper/react";
  import { useLangSync } from "@/hooks/useLangSync";

  // Import Swiper styles (لازم تجيبهم)
  // Import Swiper styles

  import "swiper/swiper.css";
  import "swiper/css/pagination";

  // Import required modules
  import { Pagination, Autoplay } from "swiper/modules";
  import { Link } from "react-router-dom";
  import "../../style.css";
  import { useEffect } from "react";

  interface heroslide{
    title:string;
    description:string;
    bg:string;
    link?:string;
  }
  
  const NewHeroSection = ({slides}:{slides:heroslide[]}) => {
    // language slider re rendring
    const { lang } = useLangSync();
    useEffect(() => {}, [lang]);
    
    return (
      <div className="lg:px-[90px] px-2 pt-20 md:pt-0 ">

      <Swiper
        key={lang}
        speed={1400}

        dir={lang === "ar" ? "rtl" : "ltr"}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-[400px] rounded-[16px] mt-6 "
      >{slides.map((slide,index)=>(
        
        <SwiperSlide key={index} className="relative ">
          <img
            src={slide.bg}
            alt={`Slide `}
            className="w-full absolute  h-full object-cover"
          />
          <div className="z-[1]  w-full flex flex-col justify-start items-start h-full pt-[40px] pr-[40px]">
            <h1 className="font-[700] md:text-[3rem] text-[1.2rem] mt-[30px] md:mt-[0px] text-[#FFFFFF] textshad">
              {slide.title}
            </h1>

            <p className="font-[700] md:text-[20px] text-[15px] max-w-[50%] text-[#FFFFFF] mt-[25px] md:max-w-[36%] text-start">
{slide.description}
            </p>
            <Link
              to={`${slide.link}`}
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
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r  from-[#211C4D0A] via-[#211C4D22] to-[#211C4D6B]"></div>
        </SwiperSlide>
      ))

      }

      </Swiper>
      </div>
    );
  };

  export default NewHeroSection;
