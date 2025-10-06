"use client";
import * as React from "react";
import logo from "../../assets/images/logo.png";
import { ShoppingCart, UserRound, Heart, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "../../style.css";
import { useTranslation } from "react-i18next";

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
import { Link } from "react-router-dom";
import {  useState } from "react";
import MobileMenu from "./MobileMenu";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
  // language btn
  const { t, i18n } = useTranslation();
  const [open, ] = useState(false);
  // ⬇⬇ state عشان نتحكم في الموبايل منيو
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* desktop  header */}
      <header
        dir="rtl"
        className="w-full border-b h-[170px] hidden md:block border-white/10 bg-[#211a44] text-white"
      >
        <div className="container h-full flex flex-col justify-around mx-auto px-3 md:px-6">
          {/* Top row */}
          <div className="flex items-center gap-3 py-3 lg:px-[100px]">
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
                <Heart className="h-5 w-5 opacity-90" />
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
                  <ShoppingCart className="h-5 w-5 opacity-90" />
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-orange-400" />
                </span>
              </IconButton>
</Link>
            </div>
          </div>

          {/* Bottom nav */}
          <div className="flex items-center w-full !justify-between lg:px-[100px] gap-4 pb-3">
            {/* Language */}
            <div className="relative inline-block text-left">
            

                <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  className="text-sm bg-transparent">
        <button
              
                className="flex items-center gap-1 text-sm opacity-90 hover:opacity-100"
              >
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

      <DropdownMenuContent align="end"   sideOffset={8}
  className="z-[9999] relative">
        <DropdownMenuItem
          onClick={() => i18n.changeLanguage("ar")}
        >
         العربية
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => i18n.changeLanguage("en")}
        >
           English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

            </div>

            {/* Main Links */}
            <nav className="hidden items-center lg:gap-15 md:gap-8  text-sm md:flex">
              <Link to={"/"} className="text-[24px] md:text-[15px] font-[400] active">
                {t("Home")}
              </Link>
              <Link to={"/about"} className="lg:text-[24px] md:text-[15px] font-[400] ">
                {t("About")}
              </Link>
              <Link to={"/offers"} className="lg:text-[24px] md:text-[15px] font-[400] ">
                {t("Offers")}
              </Link>
              <Link to={"/servces"} className="lg:text-[24px] md:text-[15px] font-[400] ">
                {t("Servces")}
              </Link>
              <Link to={"/contact"} className="lg:text-[24px] md:text-[15px] font-[400] ">
                {t("Contactus")}
              </Link>
            </nav>

            {/* category btn */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-[150px] bg-transparent">
                  <div className="flex items-center justify-center gap-[10px]">
                    <p>الأقسام</p>
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
