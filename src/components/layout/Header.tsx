"use client";
import * as React from "react";
import logo from "../../assets/images/logo.png";
import { ShoppingCart, UserRound, Heart, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import "../../style.css";
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
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
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
import MobileMenu from "./MobileMenu";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
  const { categories, fetchCategories } = useCategoriesStore();
  const { lang } = useLangSync();
  useEffect(() => {
    fetchCategories(lang);
  }, [lang]);
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  // language btn
  const { t, i18n } = useTranslation();
  const [open] = useState(false);
  // ⬇⬇ state عشان نتحكم في الموبايل منيو
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const navigate = useNavigate();
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
  const token = localStorage.getItem("token");
  const headerKey = lang;

  return (
    <>
      {/* desktop  header */}
      <header
        key={headerKey}
        dir="rtl"
        className="w-full border-b  items-center justify-center h-[170px] hidden md:flex border-white/10 bg-[#211a44] text-white"
      >
        
        <div className="  flex flex-col w-full h-[170px] justify-around  lg:px-[90px] px-2 pt-20 md:pt-0">
          {/* Top row */}
          <div className="flex items-center gap-3 py-3 ">
            {/* Logo */}

            <Link to={""} className="flex items-center gap-2">
              <img
                src={logo}
                alt={t("CityPhones")}
                width={127}
                height={20}
                className="h-[70px] w-[70px] object-contain"
              />
              <h1 className="flex items-center text-[20px] font-[700] ">
                {t("CityPhones")}
              </h1>
            </Link>
            {/* Search */}
            <div className="mx-auto hidden flex-1 max-w-[500px] justify-center items-center md:flex">
              <div
                className="relative w-full max-w-2xl"
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                <div className="relative">
                  <Input
                    value={query}
                    onChange={(e: any) => {
                      const v = e.target.value;
                      setQuery(v);
                      setShowSuggestions(!!v.trim());

                      // debounce
                      if (debounceRef.current) window.clearTimeout(debounceRef.current);
                      debounceRef.current = window.setTimeout(async () => {
                        if (!v.trim()) {
                          setSuggestions([]);
                          setSuggestionsLoading(false);
                          return;
                        }
                        setSuggestionsLoading(true);
                        try {
                          const res = await axios.get(`${baseUrl}api/v1/products`, {
                            params: { search: v.trim(), per_page: 6 },
                            headers: { "Accept-Language": lang || "ar", Accept: "application/json" },
                          });
                          const data = res?.data?.data;
                          if (Array.isArray(data)) setSuggestions(data.slice(0, 6));
                          else setSuggestions([]);
                        } catch (e) {
                          setSuggestions([]);
                        } finally {
                          setSuggestionsLoading(false);
                        }
                      }, 300);
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter" && query.trim().length > 0) {
                        navigate(`/${lang}/search?q=${encodeURIComponent(query.trim())}`);
                        setShowSuggestions(false);
                      }
                    }}
                    placeholder={t("search")}
                    className="h-[48px] rounded-full px-9  bg-transparent border-white text-white placeholder:text-[#6C727F] focus-visible:ring-white/40"
                    onFocus={() => setShowSuggestions(!!query.trim())}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  />

                  {showSuggestions && (
                    <div className="absolute left-0 right-0 mt-2 bg-white text-black rounded-lg shadow-lg z-50 max-h-72 overflow-auto">
                      {suggestionsLoading ? (
                        <div className="text-start p-3">{t("Searching...")}</div>
                      ) : suggestions.length === 0 ? (
                        <div className="p-3 text-start">{t("Noresultsfound")}</div>
                      ) : (
                        suggestions.map((p: any) => (
                          <div
                            key={p.id}
                            onMouseDown={() => {
                              // navigate to product page
                              navigate(`/${lang}/singleproduct/${p.slug}`);
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                          >
                            <img src={p.main_image || p.images?.[0] || "/logo.png"} alt={p.name} className="w-12 h-12 object-cover rounded" />
                            <div className="flex-1">
                              <div className="font-medium">{p.name}</div>
                              <div className="text-sm text-gray-500">{p.final_price ? p.final_price + t("SAR") : ''}</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
                <svg
                  className={`absolute  top-3 ${
                    lang === "ar" ? "right-3" : "left-3"
                  }`}
                  width="18"
                  height="24"
                  viewBox="0 0 18 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.25 5.90625C5.29873 5.90625 2.90625 8.29873 2.90625 11.25C2.90625 14.2013 5.29873 16.5938 8.25 16.5938C11.2013 16.5938 13.5938 14.2013 13.5938 11.25C13.5938 8.29873 11.2013 5.90625 8.25 5.90625ZM1.59375 11.25C1.59375 7.57385 4.57385 4.59375 8.25 4.59375C11.9261 4.59375 14.9062 7.57385 14.9062 11.25C14.9062 14.9261 11.9261 17.9062 8.25 17.9062C4.57385 17.9062 1.59375 14.9261 1.59375 11.25Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0235 15.0235C12.2797 14.7672 12.6953 14.7672 12.9515 15.0235L16.214 18.286C16.4703 18.5422 16.4703 18.9578 16.214 19.214C15.9578 19.4703 15.5422 19.4703 15.286 19.214L12.0235 15.9515C11.7672 15.6953 11.7672 15.2797 12.0235 15.0235Z"
                    fill="white"
                  />
                </svg>
                {/* <button
                  onClick={() => {
                    if (query.trim().length === 0) return;
                    navigate(`/${lang}/search?q=${encodeURIComponent(query.trim())}`);
                    setShowSuggestions(false);
                  }}
                  className="absolute top-2.5 right-12 h-[34px] w-[34px] rounded-full bg-white/10 flex items-center justify-center"
                >
                  🔎
                </button> */}
              </div>
            </div>

            {/* Left icons */}
            <div className="flex items-center gap-2">
              {token ? null : (
                <Link
                  to="/login"
                  className="w-[160px] h-[40px] rounded-[16px] bg-[#FFFFFF1A] flex items-center justify-center text-[19px] font-[400] 
  text-white transition-all duration-300 hover:bg-white hover:text-[#211C4D]"
                >
              {  t("Login")}
                </Link>
              )}
              <Link to={`/${lang}/favourite`}>
                <IconButton aria-label="المفضلة">
                  <Heart className="h-5 w-5 opacity-90" />
                </IconButton>
              </Link>
              <Link to={"/profile"}>
                <IconButton aria-label="حسابي">
                  <UserRound className="h-5 w-5 opacity-90" />
                </IconButton>
              </Link>
              <Link to={`/${lang}/checkout`}>
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
          <div className="flex items-center w-full !justify-between  gap-4 pb-3">
            {/* Language */}
            <div className="relative inline-block text-left">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-1 text-sm opacity-90 hover:opacity-100">
                    <Globe className="h-4 w-4" />
                    {lang === "ar" ? t("Arabic") : t("English")}
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
                  </div>
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
            <nav
              className="hidden items-center lg:gap-2 h-[53px]   text-sm md:flex"
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {navitem.map((item, index) => (
                <NavLink
                  key={index}
                  to={`${item.link}`}
                  end={item.link === `/${lang}/`} // علشان الـ home مايفضلش active دايمًا
                  className={({ isActive }) =>
                    `xl:text-[20px] lg:text-[15px] py-[9px] px-[24px] md:text-[12px] font-[400] text-white hover:text-[#F3AC5D] transition-all duration-300 ${
                      isActive ? "navactive text-[#F3AC5D]" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* category btn */}
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <div className="w-[150px] bg-transparent">
                  <div className="flex items-center justify-center gap-[10px]">
                    <svg
                      className="!w-[25px] !h-[25px]"
                      width="23"
                      height="25"
                      viewBox="0 0 28 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.48047 3.1263C2.48047 2.62292 2.93751 2.21484 3.5013 2.21484H11.668C12.2318 2.21484 12.6888 2.62292 12.6888 3.1263V10.418C12.6888 10.9214 12.2318 11.3294 11.668 11.3294H3.5013C2.93751 11.3294 2.48047 10.9214 2.48047 10.418V3.1263ZM4.52214 4.03776V9.50651H10.6471V4.03776H4.52214Z"
                        fill="#E0E5EB"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.3138 3.1263C15.3138 2.62292 15.7708 2.21484 16.3346 2.21484H24.5013C25.0651 2.21484 25.5221 2.62292 25.5221 3.1263V10.418C25.5221 10.9214 25.0651 11.3294 24.5013 11.3294H16.3346C15.7708 11.3294 15.3138 10.9214 15.3138 10.418V3.1263ZM17.3555 4.03776V9.50651H23.4805V4.03776H17.3555Z"
                        fill="#E0E5EB"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.3138 14.5846C15.3138 14.0813 15.7708 13.6732 16.3346 13.6732H24.5013C25.0651 13.6732 25.5221 14.0813 25.5221 14.5846V21.8763C25.5221 22.3797 25.0651 22.7878 24.5013 22.7878H16.3346C15.7708 22.7878 15.3138 22.3797 15.3138 21.8763V14.5846ZM17.3555 15.4961V20.9648H23.4805V15.4961H17.3555Z"
                        fill="#E0E5EB"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.48047 14.5846C2.48047 14.0813 2.93751 13.6732 3.5013 13.6732H11.668C12.2318 13.6732 12.6888 14.0813 12.6888 14.5846V21.8763C12.6888 22.3797 12.2318 22.7878 11.668 22.7878H3.5013C2.93751 22.7878 2.48047 22.3797 2.48047 21.8763V14.5846ZM4.52214 15.4961V20.9648H10.6471V15.4961H4.52214Z"
                        fill="#E0E5EB"
                      />
                    </svg>

                    <p className="text-[19px] text-[#E0E5EB]">
                      {t("Sections")}
                    </p>
                    <svg
                      className="ml-[10px]"
                      width="13"
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
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  {categories.map((category) => (
                       <DropdownMenuSub key={category.id}>
                      <Link to={`/${lang}/categorySingle/${category.slug}/products`}>
                      <DropdownMenuSubTrigger>
                        {category.name}
                      </DropdownMenuSubTrigger>
                      </Link>
                      <DropdownMenuSubContent>
                        {category.children?.map((child) => (
                          <Link to={`/${lang}/categorySingle/${child.slug}/products`}>
                          <DropdownMenuItem key={child.id}>
                            {child.name}
                          </DropdownMenuItem>

                          </Link>
                          
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* mobile header */}
      <div className="md:hidden">
        {/* المنيو */}
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          openSections={isSectionOpen}
          setOpenSections={setIsSectionOpen}
        />

        <MobileNavbar
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          onSectionToggle={() => {
            // لو المنيو لسه مقفولة، افتحها ووسّع الأقسام فورًا
            if (!isMenuOpen) {
              setIsMenuOpen(true);
              setIsSectionOpen(true);
            } else {
              // لو مفتوحة بالفعل، غيّر حالة الأقسام فقط
              setIsSectionOpen(!isSectionOpen);
            }
          }}
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
