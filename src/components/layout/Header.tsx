"use client";
import * as React from "react";
import logo from "../../assets/images/logo.png";
import { ShoppingCart, UserRound, Heart, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "../../style.css";
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
  // language btn
  const { t, i18n } = useTranslation();
  const [open] = useState(false);
  // ⬇⬇ state عشان نتحكم في الموبايل منيو
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang } = useLangSync();
  const navitem = [
    {
      link: `/${lang}/`,
      name: `${t("Home")}`,
    },
    {
      link: `/${lang}/about`,
      name: `${t("About")}`,
    },
    {
      link: `/${lang}/offers`,
      name: `${t("Offers")}`,
    },
    {
      link: `/${lang}/servces`,
      name: `${t("Servces")}`,
    },
    {
      link: `/${lang}/Contact`,
      name: `${t("Contactus")}`,
    },
  ];
  return (
    <>
      {/* desktop  header */}
      <header
        dir="rtl"
        className="w-full border-b h-[170px] hidden md:block border-white/10 bg-[#211a44] text-white"
      >
        <div className="container h-full flex flex-col justify-around mx-auto px-3 md:px-6">
          {/* Top row */}
          <div className="flex items-center gap-3 py-3 lg:px-[50px]">
            {/* Logo */}

            <Link to={""} className="flex items-center gap-2">
              <img
                src={logo}
                alt="مدينة الهواتف"
                width={157}
                height={24}
                className="h-[70px] w-[70px] object-contain"
              />
              <h1 className="flex items-center text-[24px] font-[700] ">
                مدينة الهواتف
              </h1>
            </Link>
            {/* Search */}
            <div className="mx-auto hidden flex-1 max-w-[500px] justify-center items-center md:flex">
              <div className="relative w-full max-w-2xl">
                <Input
                  placeholder="ابحث عن المنتجات"
                  className="h-10 rounded-full bg-transparent border-white text-white placeholder:text-white/60 focus-visible:ring-white/40"
                />
              </div>
            </div>

            {/* Left icons */}
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="w-[187px] h-[48px] rounded-[16px] bg-[#FFFFFF1A] flex items-center justify-center text-[24px] font-[400] 
  text-white transition-all duration-300 hover:bg-white hover:text-[#211C4D]"
              >
                تسجيل الدخول
              </Link>
              <Link to={""}>
                <IconButton aria-label="المفضلة">
                  <Link to={`/${lang}/favourite`}>
                    <Heart className="h-5 w-5 opacity-90" />
                  </Link>
                </IconButton>
              </Link>
              <Link to={"/profile"}>
                <IconButton aria-label="حسابي">
                  <UserRound className="h-5 w-5 opacity-90" />
                </IconButton>
              </Link>
              <Link to={""}>
                <IconButton aria-label="عربة التسوق">
                  <span className="relative">
                    <Link to={`/${lang}/myorder`}>
                      <ShoppingCart className="h-5 w-5 opacity-90" />
                    </Link>
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-orange-400" />
                  </span>
                </IconButton>
              </Link>
            </div>
          </div>

          {/* Bottom nav */}
          <div className="flex items-center w-full !justify-between lg:px-[50px] gap-4 pb-3">
            {/* Language */}
            <div className="relative inline-block text-left">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="text-sm bg-transparent">
                    <button className="flex items-center gap-1 text-sm opacity-90 hover:opacity-100">
                      <Globe className="h-4 w-4" />
                      عربي
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M8 15.5C7.5 15.5 7 15.3 6.66 14.94L2.15 10.39C1.95 10.19 1.95 9.85 2.15 9.65C2.35 9.45 2.68 9.45 2.88 9.65L7.39 14.2C7.73 14.53 8.26 14.53 8.6 14.2L13.11 9.65C13.31 9.45 13.64 9.45 13.84 9.65C14.05 9.85 14.05 10.19 13.84 10.39L9.33 14.94C8.97 15.31 8.48 15.5 8 15.5Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="z-[9999] relative"
                >
                  <DropdownMenuItem onClick={() => i18n.changeLanguage("ar")}>
                    العربية
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Main Links */}
            <nav className="hidden items-center lg:gap-15 md:gap-8  text-sm md:flex">
              {navitem.map((item) => (
                <NavLink
                  to={`${item.link}`}
                  end={item.link === `/${lang}/`} // علشان الـ home مايفضلش active دايمًا
                  className={({ isActive }) =>
                    `xl:text-[24px] text-[15px] font-[400] text-white hover:text-[#F3AC5D] transition-all duration-300 ${
                      isActive ? "navactive text-[#F3AC5D]" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* category btn */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-[150px] bg-transparent">
                  <div className="flex items-center justify-center gap-[10px]">
                    <svg
                      className="!w-[30px] !h-[30px]"
                      width="23"
                      height="25"
                      viewBox="0 0 28 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.48047 3.1263C2.48047 2.62292 2.93751 2.21484 3.5013 2.21484H11.668C12.2318 2.21484 12.6888 2.62292 12.6888 3.1263V10.418C12.6888 10.9214 12.2318 11.3294 11.668 11.3294H3.5013C2.93751 11.3294 2.48047 10.9214 2.48047 10.418V3.1263ZM4.52214 4.03776V9.50651H10.6471V4.03776H4.52214Z"
                        fill="#E0E5EB"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.3138 3.1263C15.3138 2.62292 15.7708 2.21484 16.3346 2.21484H24.5013C25.0651 2.21484 25.5221 2.62292 25.5221 3.1263V10.418C25.5221 10.9214 25.0651 11.3294 24.5013 11.3294H16.3346C15.7708 11.3294 15.3138 10.9214 15.3138 10.418V3.1263ZM17.3555 4.03776V9.50651H23.4805V4.03776H17.3555Z"
                        fill="#E0E5EB"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.3138 14.5846C15.3138 14.0813 15.7708 13.6732 16.3346 13.6732H24.5013C25.0651 13.6732 25.5221 14.0813 25.5221 14.5846V21.8763C25.5221 22.3797 25.0651 22.7878 24.5013 22.7878H16.3346C15.7708 22.7878 15.3138 22.3797 15.3138 21.8763V14.5846ZM17.3555 15.4961V20.9648H23.4805V15.4961H17.3555Z"
                        fill="#E0E5EB"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.48047 14.5846C2.48047 14.0813 2.93751 13.6732 3.5013 13.6732H11.668C12.2318 13.6732 12.6888 14.0813 12.6888 14.5846V21.8763C12.6888 22.3797 12.2318 22.7878 11.668 22.7878H3.5013C2.93751 22.7878 2.48047 22.3797 2.48047 21.8763V14.5846ZM4.52214 15.4961V20.9648H10.6471V15.4961H4.52214Z"
                        fill="#E0E5EB"
                      />
                    </svg>

                    <p className="text-[24px] text-[#E0E5EB]">الأقسام</p>
                    <svg
                      className="ml-[10px]"
                      width="14"
                      height="9"
                      viewBox="0 0 14 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.934144 0.731804C1.24738 0.375857 1.75523 0.375857 2.06846 0.731804L7.0013 6.33731L11.9341 0.731804C12.2474 0.375857 12.7552 0.375857 13.0685 0.731804C13.3817 1.08775 13.3817 1.66485 13.0685 2.0208L7.56846 8.2708C7.25523 8.62675 6.74738 8.62675 6.43414 8.2708L0.934144 2.0208C0.620911 1.66485 0.620911 1.08775 0.934144 0.731804Z"
                        fill="#E0E5EB"
                      />
                    </svg>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex justify-between text-right">
                    لاب توب
                  </DropdownMenuItem>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="flex justify-between text-right">
                      الهواتف الذكية
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem className="text-right">
                        أجهزة أبل
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-right">
                        أجهزة سامسونج
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-right">
                        أجهزة هونر
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-right">
                        أجهزة شاومي
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-right">
                        أجهزة إنفينكس
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-right">
                        أجهزة تكنو
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-right">
                        أجهزة أوبو
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-right">
                        أجهزة هواوي
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-right">
                        أجهزة أندرويد أخرى
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuItem className="flex justify-between text-right">
                    الأجهزة اللوحية
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex justify-between text-right">
                    الكاميرات والدخان كام
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex justify-between text-right">
                    الاكسسوارات
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* mobile header */}
      <div className="md:hidden">
        {/* المنيو */}
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        {/* النافبار */}
        <MobileNavbar
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
        />
      </div>
    </>
  );
}

/** ــــــــــــــــ عناصر مساعدة ــــــــــــــــ */
function IconButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <button
      {...props}
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/15 " +
        (className ?? "")
      }
    >
      {children}
    </button>
  );
}
