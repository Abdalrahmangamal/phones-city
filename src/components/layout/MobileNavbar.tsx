"use client";
import { useState } from "react";
import { ShoppingCart, Globe, Menu, Search, Bell } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// استيراد stores
import { useCartStore } from "@/store/cartStore/cartStore";
import { useNotifications } from "@/store/notifications/notificationStore";

interface MobileNavbarProps {
  onMenuToggle: () => void;
  onSectionToggle: () => void;
  isMenuOpen: boolean;
  onSearchToggle?: () => void;
  headerVisible?: boolean;
}

export default function MobileNavbar({
  onMenuToggle,
  onSectionToggle,
  isMenuOpen,
  onSearchToggle,
  headerVisible = true,
}: MobileNavbarProps) {
  const { lang } = useLangSync();
  const { i18n, t } = useTranslation();
  const [showLang, setShowLang] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  // جلب بيانات السلة
  const { items: cartItems } = useCartStore();
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // جلب بيانات الإشعارات
  const { unreadCount } = useNotifications();

  const handleSearchClick = () => {
    if (onSearchToggle) {
      onSearchToggle();
    } else {
      console.error("Search toggle handler is not provided");
    }
  };

  // دالة للانتقال إلى صفحة الإشعارات
  const handleNotificationClick = () => {
    window.location.href = `/${lang}/notifications`;
  };

  // 🔥 ضبط setShowLang عند فتح/إغلاق قائمة اللغة
  const handleLangTrigger = () => {
    setShowLang(!showLang);
  };

  const handleLanguageChange = (nextLang: "ar" | "en") => {
    const nextPath = /^\/(ar|en)(?=\/|$)/.test(location.pathname)
      ? location.pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${nextLang}`)
      : `/${nextLang}${location.pathname.startsWith("/") ? location.pathname : `/${location.pathname}`}`;

    navigate(`${nextPath}${location.search}${location.hash}`);
    i18n.changeLanguage(nextLang);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-[#211C4DDE] backdrop-blur-md border-b border-[#FFFFFF20] z-50 h-[70px] px-4 transition-transform duration-300 ease-out ${
        headerVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between h-full">
        {/* زر الأقسام */}
        <button
          onClick={onSectionToggle}
          className="flex items-center gap-2 text-white"
        >
          <Menu className="w-6 h-6" />
          <span className="text-sm font-semibold">{t("Sections")}</span>
        </button>

        {/* اختيار اللغة */}
        <div className="relative inline-block text-left">
          <DropdownMenu onOpenChange={handleLangTrigger}>
            <DropdownMenuTrigger asChild>
              <div className="text-sm bg-transparent">
                <button className="flex items-center gap-1 text-sm opacity-90 hover:opacity-100">
                  <Globe className="h-4 w-4" />
                  {lang === "ar" ? t("Arabic") : t("English")}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${
                      showLang ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M8 15.5C7.5 15.5 7 15.3 6.66 14.94L2.15 10.39C1.95 10.19 1.95 9.85 2.15 9.65C2.35 9.45 2.68 9.45 2.88 9.65L7.39 14.2C7.73 14.53 8.26 14.53 8.6 14.2L13.11 9.65C13.31 9.45 13.64 9.45 13.84 9.65C14.05 9.85 14.05 10.19 13.84 10.39L9.33 14.94C8.97 15.31 8.48 15.5 8 15.5Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="z-[9999] relative"
            >
              <DropdownMenuItem onClick={() => handleLanguageChange("ar")}>
                العربية
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* أزرار اليمين */}
        <div className="flex items-center gap-2">
          {/* زر البحث */}
          <button
            onClick={handleSearchClick}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#333D4C] hover:bg-[#3a4657] transition-colors"
            aria-label={t("Search")}
          >
            <Search className="w-5 h-5 text-[#E0E5EB]" />
          </button>

          {/* زر الإشعارات - جديد */}
          <button
            onClick={handleNotificationClick}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#333D4C] hover:bg-[#3a4657] transition-colors"
            aria-label={t("Notifications")}
          >
            <Bell className="w-5 h-5 text-[#E0E5EB]" />
            
            {/* عداد الإشعارات غير المقروءة */}
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full border-2 border-[#211C4D] bg-[#F3AC5D] flex items-center justify-center text-[10px] text-white font-bold">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* سلة الشراء */}
          <Link
            to={`/${lang}/checkout`}
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#333D4C]"
          >
            <ShoppingCart className="w-5 h-5 text-[#E0E5EB]" />
            
            {/* عرض العداد فقط إذا كان هناك منتجات */}
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full border-2 border-[#211C4D] bg-[#F3AC5D] flex items-center justify-center text-[10px] text-white font-bold">
                {cartQuantity > 99 ? "99+" : cartQuantity}
              </span>
            )}
          </Link>

          {/* زر تسجيل الدخول - يظهر فقط إذا لم يكن هناك توكن */}
          {!token && (
            <Link
              to="/login"
              className="w-[90px] h-[30px] rounded-[16px] bg-[#FFFFFF1A] flex items-center justify-center text-[10px] font-[400] 
              text-white transition-all duration-300 hover:bg-white hover:text-[#211C4D]"
            >
              {t("Login")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
