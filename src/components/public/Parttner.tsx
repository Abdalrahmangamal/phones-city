import pattern from "../../assets/images/Layer_1.png";
import logo1 from "../../assets/images/logo1.png";
import logo2 from "../../assets/images/logo2.png";
import logo3 from "../../assets/images/logo3.png";
import logo4 from "../../assets/images/logo4.png";
import {useCategoriesStore} from '@/store/categories/useCategoriesStore';
import { Swiper, SwiperSlide } from "swiper/react";
import { useLangSync } from "@/hooks/useLangSync";
import "../../style.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useS24Ultra from "@/hooks/useS24Ultra";
import S24Parttner from "@/components/s24-ultra/S24Parttner";
import Loader from '@/components/Loader'
export default function Parttner() {
    const { lang } = useLangSync();
  const { fetchCategories,treadmark } = useCategoriesStore();
  useEffect(() => {
    fetchCategories(lang,true);
  }
, []);
console.log("tredmark",treadmark)
  const isS24Ultra = useS24Ultra();
  
  // If device is S24 Ultra, render the S24 Ultra specific component
  if (isS24Ultra) {
    return <S24Parttner />;
  }

  const partnerimg = [
    {
      img: logo1,
    },
    {
      img: logo2,
    },
    {
      img: logo3,
    },
    {
      img: logo4,
    },
    {
      img: logo1,
    },
    {
      img: logo2,
    },
    {
      img: logo3,
    },
    {
      img: logo4,
    },
    {
      img: logo1,
    },
  ];

  return (
    <div>
        {
        !treadmark ? <Loader /> : null
      }
      <div className="relative flex items-center justify-center">
        <h1 className="md:text-[40px] text-[24px] font-[700]  text-[#211C4D]">
          العلامات التجارية
        </h1>
        <img src={pattern} className="absolute w-[80px] top-2 md:top-[20px] right-[18%] md:right-[36%]" alt="" />
      </div>

      <Swiper
        key={lang}
        slidesPerView={6}
        spaceBetween={20}
        dir={lang === "ar" ? "rtl" : "ltr"}
        breakpoints={{
          320: { slidesPerView: 4 },  // Changed from 3 to 4 for mobile
          640: { slidesPerView: 4 },  // Changed from 3 to 4 for small screens
          768: { slidesPerView: 4 },  // Keep 4 for tablets
          1024: { slidesPerView: 6 }, // Keep 6 for desktop
        }}
        className="mySwiper !px-[20px] md:px-[0px] h-[100px] md:h-[130px] pt-[50px] mt-[60px]"
      >
        {treadmark.map((item) => (
          <SwiperSlide
            className="
      !h-[70px]
      md:!h-[120px] 
      flex items-center justify-center
      rounded-[12px] 
      bg-white 
      shadow-[0px_4px_4px_0px_#2D295C40]
    "
          >
            <Link to={`/${lang}/trademarks/${item.id}`}>
              <img
                src={item.image}
                className="w-full h-full  !object-contain"
                alt="logo"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}