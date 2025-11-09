"use client";
import { useState } from "react";
import { ShoppingCart,Globe, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
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
import { Button } from "../ui/button";
interface MobileNavbarProps {
  onMenuToggle: () => void;
  onSectionToggle: () => void;
  isMenuOpen: boolean;
}

export default function MobileNavbar({
  onMenuToggle,
  onSectionToggle,
}: MobileNavbarProps) {
  const { lang } = useLangSync();
  const { i18n } = useTranslation();
  const [showLang, setShowLang] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#211C4DDE] backdrop-blur-md border-b border-[#FFFFFF20] z-50 h-[70px] px-4">
      <div className="flex items-center justify-between h-full">
        {/* زر الأقسام */}
        <button
  onClick={onSectionToggle}
  className="flex items-center gap-2 text-white"
>
  <Menu className="w-6 h-6" />
  <span className="text-sm font-semibold">الأقسام</span>
</button>


        {/* اسم المتجر */}
        {/* <Link  className="text-white font-bold text-base" to={`/`}>الرئيسية</Link> */}
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
        {/* أزرار اليمين */}
        <div className="flex items-center gap-2">
        

    
  {/* سلة الشراء */}
          <Link
            to={`/${lang}/myorder`}
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#333D4C]"
          >
            <ShoppingCart className="w-5 h-5 text-[#E0E5EB]" />
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-[#211C4D] bg-[#F3AC5D] flex items-center justify-center text-[10px] text-white font-bold">
              3
            </span>
          </Link>
          {/* تسجيل الدخول */}
          <Link
            to="/login"
            className="w-[90px] h-[30px] rounded-[16px] bg-[#FFFFFF1A] flex items-center justify-center text-[10px] font-[400] 
            text-white transition-all duration-300 hover:bg-white hover:text-[#211C4D]"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
