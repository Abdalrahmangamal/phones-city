"use client";
import * as React from "react";
import logo from "../../assets/images/logo.png";
import { ShoppingCart, UserRound, Heart, Globe, Search, Bell, LogOut, Package, MapPin, Wallet, FileText, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import "../../style.css";
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

// استيراد stores
import { useCartStore } from "@/store/cartStore/cartStore";
import { useNotifications } from "@/store/notifications/notificationStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useAuthStore } from "@/store/useauthstore";

const baseUrl = import.meta.env.VITE_BASE_URL;
import MobileMenu from "./MobileMenu";
import MobileNavbar from "./MobileNavbar";
import { getCategoryIcon } from "@/utils/categoryIcons";
import { cn } from "@/lib/utils";

interface SuggestionItem {
  id: number;
  name: string;
  slug: string;
  type: "category";
  image?: string;
  productsCount?: number;
}

export default function Header() {
  const categories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const { lang } = useLangSync();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const [openSections, setOpenSections] = useState(false);

  // إخفاء الهيدر عند التمرير للأسفل وإظهاره عند التمرير للأعلى
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollRafRef = useRef<number | null>(null);
  const headerVisibleRef = useRef(true);

  useEffect(() => {
    headerVisibleRef.current = headerVisible;
  }, [headerVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRafRef.current !== null) return;

      scrollRafRef.current = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const nextVisible = y <= 10 ? true : y <= lastScrollY.current;

        if (nextVisible !== headerVisibleRef.current) {
          headerVisibleRef.current = nextVisible;
          setHeaderVisible(nextVisible);
        }

        lastScrollY.current = y;
        scrollRafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  // استخدم الـ store للإشعارات بدلاً من useState
  const {
    notifications,
    unreadCount,
    fetchNotifications
  } = useNotifications();

  // استخدم cart store
  const { items: cartItems, total: cartTotal, fetchCart } = useCartStore();
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [cartSheetOpen, setCartSheetOpen] = useState(false);

  // استخدم favorites store لعرض العدد في الهيدر
  const { favorites, fetchFavorites } = useFavoritesStore();
  const favoritesCount = favorites.length;

  const { logout } = useAuthStore();

  // تعريف token
  const token = localStorage.getItem("token");
  const headerKey = lang;

  // تحديث useEffect للإشعارات لاستخدام الـ store
  // Cache ref to avoid re-fetching on every page navigation
  const lastFetchRef = useRef<{ notifications: number; categories: string; cart: number; favorites: number }>({
    notifications: 0,
    categories: '',
    cart: 0,
    favorites: 0,
  });
  const CACHE_DURATION = 60000; // 60 seconds

  useEffect(() => {
    if (token && Date.now() - lastFetchRef.current.notifications > CACHE_DURATION) {
      fetchNotifications();
      lastFetchRef.current.notifications = Date.now();
    }
  }, [fetchNotifications, token]);

  // جلب الأقسام عند تحميل المكون وعند تغيير اللغة
  useEffect(() => {
    if (lastFetchRef.current.categories !== lang) {
      fetchCategories(lang);
      lastFetchRef.current.categories = lang;
    }
  }, [fetchCategories, lang]);

  useEffect(() => {
    if (Date.now() - lastFetchRef.current.cart > CACHE_DURATION) {
      fetchCart();
      lastFetchRef.current.cart = Date.now();
    }
  }, [fetchCart]);

  useEffect(() => {
    if (token && Date.now() - lastFetchRef.current.favorites > CACHE_DURATION) {
      fetchFavorites();
      lastFetchRef.current.favorites = Date.now();
    }
  }, [fetchFavorites, token]);

  const navitem = [
    { link: `/${lang}/`, name: `${t("Home")}` },
    { link: `/${lang}/about`, name: `${t("About")}` },
    { link: `/${lang}/offers`, name: `${t("Offers")}` },
    { link: `/${lang}/servces`, name: `${t("Servces")}` },
    { link: `/${lang}/Contact`, name: `${t("Contactus")}` },
  ];

  // Mobile search handler
  const handleMobileSearch = () => {
    if (query.trim().length > 0) {
      navigate(`/${lang}/search?q=${encodeURIComponent(query.trim())}`);
      setIsMobileSearchOpen(false);
      setQuery("");
    }
  };

  // Function to fetch suggestions
  const fetchSearchSuggestions = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setSuggestionsLoading(false);
      return;
    }

    setSuggestionsLoading(true);
    try {
      const allCategories = categories;
      const searchTerm = searchQuery.trim().toLowerCase();

      let searchResults: SuggestionItem[] = [];

      allCategories.forEach((category: any) => {
        if (category.name.toLowerCase().includes(searchTerm)) {
          searchResults.push({
            id: category.id,
            name: category.name,
            slug: category.slug,
            type: "category",
            image: category.image || "/logo.png",
            productsCount: category.products_count || 0,
          });
        }

        if (category.children && Array.isArray(category.children)) {
          category.children.forEach((child: any) => {
            if (child.name.toLowerCase().includes(searchTerm)) {
              searchResults.push({
                id: child.id,
                name: child.name,
                slug: child.slug,
                type: "category",
                image: child.image || "/logo.png",
                productsCount: 0,
              });
            }
          });
        }
      });

      searchResults = searchResults
        .filter((cat, index, self) => index === self.findIndex((c) => c.id === cat.id))
        .slice(0, 6);

      setSuggestions(searchResults);
    } catch (e: any) {
      console.error("Error in local category search:", e.message);
      setSuggestions([]);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  // Debounced search handler
  const handleSearchChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(!!value.trim());

    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      fetchSearchSuggestions(value);
    }, 300);
  };

  // دالة للتعامل مع ضغط زر الأقسام في شريط التنقل المتنقل
  const handleMobileSectionToggle = () => {
    setIsMenuOpen(true);
    setOpenSections(true);
  };

  // دالة للتعامل مع إغلاق القائمة
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setOpenSections(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Desktop Header */}
      <header
        key={headerKey}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full border-b items-center justify-center h-[170px] hidden md:flex border-white/10 bg-[#211a44] text-white transition-transform duration-300 ease-out",
          !headerVisible && "-translate-y-full"
        )}
      >
        <div className="flex flex-col w-full h-[170px] justify-around lg:px-[90px] px-2 pt-20 md:pt-0">
          {/* Top row */}
          <div className="flex items-center gap-3 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt={t("CityPhones")}
                width={127}
                height={20}
                className="h-[70px] w-[70px] object-contain"
              />
              <h1 className="flex items-center text-[20px] font-[700]">{t("CityPhones")}</h1>
            </Link>

            {/* Search */}
            <div className="mx-auto hidden flex-1 max-w-[500px] justify-center items-center md:flex">
              <div className="relative w-full max-w-2xl" dir={lang === "ar" ? "rtl" : "ltr"}>
                <div className="relative">
                  <Input
                    value={query}
                    onChange={(e: any) => handleSearchChange(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter" && query.trim().length > 0) {
                        navigate(`/${lang}/search?q=${encodeURIComponent(query.trim())}`);
                        setShowSuggestions(false);
                        setQuery("");
                      }
                    }}
                    placeholder={t("search")}
                    className="h-[48px] rounded-full px-9 bg-transparent border-white text-white placeholder:text-[#6C727F] focus-visible:ring-white/40"
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
                        suggestions.map((item: SuggestionItem) => (
                          <div
                            key={`category-${item.id}`}
                            onMouseDown={() => {
                              navigate(`/${lang}/categorySingle/${item.slug}/products`);
                              setShowSuggestions(false);
                              setQuery("");
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 group"
                          >
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "/logo.png";
                                  }}
                                />
                              ) : (
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="font-medium text-gray-800">{item.name}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">{t("Category")}</span>
                                {item.productsCount !== undefined && item.productsCount > 0 && (
                                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                    {item.productsCount} {t("products")}
                                  </span>
                                )}
                              </div>
                            </div>

                            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <svg
                  className={`absolute top-3 ${lang === "ar" ? "right-3" : "left-3"}`}
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
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-2">
              {token ? null : (
                <Link
                  to="/login"
                  className="w-[160px] h-[40px] rounded-[16px] bg-[#FFFFFF1A] flex items-center justify-center text-[19px] font-[400] text-white transition-all duration-300 hover:bg-white hover:text-[#211C4D]"
                >
                  {t("Login")}
                </Link>
              )}

              {/* قائمة الإشعارات */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton aria-label={t("Notifications")} className="relative">
                    <Bell className="h-5 w-5 opacity-90" />
                    {unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-red-500"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="z-[9999] w-[320px] max-w-[90vw] rounded-xl border border-[#211C4D]/10 bg-white p-0 shadow-xl"
                >
                  <div className="border-b border-[#211C4D]/10 bg-[#211C4D] px-4 py-3 rounded-t-xl">
                    <p className="font-semibold text-white text-base">{t("Notifications")}</p>
                    {token && unreadCount > 0 && (
                      <p className="text-white/80 text-xs mt-0.5">{unreadCount} {t("unread")}</p>
                    )}
                  </div>
                  <div className="max-h-[280px] overflow-y-auto">
                    {!token ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        <p>{t("LoginToViewNotifications")}</p>
                        <Link to={`/${lang}/login`} className="text-[#2AA0DC] font-medium mt-2 inline-block">
                          {t("Login")}
                        </Link>
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        {t("NoNotifications")}
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <DropdownMenuItem
                          key={n.id}
                          className="flex flex-col items-start gap-0.5 rounded-none border-b border-gray-100 last:border-0 py-3 px-4 cursor-pointer focus:bg-[#211C4D]/5"
                          onSelect={() => navigate(`/${lang}/notifications`)}
                        >
                          <span className="font-medium text-[#211C4D] text-sm line-clamp-1">{n.data?.title || n.type}</span>
                          <span className="text-gray-500 text-xs line-clamp-2">{n.data?.message}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </div>
                  {token && notifications.length > 0 && (
                    <>
                      <div className="border-t border-gray-100 p-2">
                        <Link to={`/${lang}/notifications`}>
                          <DropdownMenuItem className="text-center text-[#2AA0DC] font-medium rounded-lg">
                            {t("ViewAllNotifications")}
                          </DropdownMenuItem>
                        </Link>
                      </div>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* قائمة المفضلة */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton aria-label={t("favourite")} className="relative">
                    <Heart className="h-5 w-5 opacity-90" />
                    {favoritesCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-[#F3AC5D]"
                      >
                        {favoritesCount}
                      </Badge>
                    )}
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="z-[9999] w-[320px] max-w-[90vw] rounded-xl border border-[#211C4D]/10 bg-white p-0 shadow-xl"
                >
                  <div className="border-b border-[#211C4D]/10 bg-[#211C4D] px-4 py-3 rounded-t-xl">
                    <p className="font-semibold text-white text-base">{t("favourite")}</p>
                    {favoritesCount > 0 && (
                      <p className="text-white/80 text-xs mt-0.5">{favoritesCount} {t("products")}</p>
                    )}
                  </div>
                  <div className="max-h-[280px] overflow-y-auto">
                    {favorites.length === 0 ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        {t("NoFavoritesYet")}
                      </div>
                    ) : (
                      favorites.slice(0, 4).map((fav) => (
                        <DropdownMenuItem
                          key={fav.id}
                          className="flex gap-3 rounded-none border-b border-gray-100 last:border-0 py-2.5 px-4 cursor-pointer focus:bg-[#211C4D]/5"
                          onSelect={() => navigate(`/${lang}/singleproduct/${fav.product?.slug || fav.product?.id}`)}
                        >
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                            {fav.product?.main_image ? (
                              <img src={fav.product.main_image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">—</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0 text-start">
                            <p className="font-medium text-[#211C4D] text-sm line-clamp-2">{fav.product?.name}</p>
                            <p className="text-[#F3AC5D] font-semibold text-xs mt-0.5">{fav.product?.final_price} {t("SAR")}</p>
                          </div>
                        </DropdownMenuItem>
                      ))
                    )}
                  </div>
                  {favorites.length > 0 && (
                    <div className="border-t border-gray-100 p-2">
                      <Link to={`/${lang}/favourite`}>
                        <DropdownMenuItem className="text-center text-[#2AA0DC] font-medium rounded-lg">
                          {t("ViewAllFavorites")}
                        </DropdownMenuItem>
                      </Link>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* قائمة البروفايل */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton aria-label={t("MyAccount")}>
                    <UserRound className="h-5 w-5 opacity-90" />
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="z-[9999] w-[240px] rounded-xl border border-[#211C4D]/10 bg-white p-0 shadow-xl"
                >
                  <div className="border-b border-[#211C4D]/10 bg-[#211C4D] px-4 py-3 rounded-t-xl">
                    <p className="font-semibold text-white text-base">{t("MyAccount")}</p>
                  </div>
                  <div className="py-2">
                    {!token ? (
                      <Link to={`/${lang}/login`}>
                        <DropdownMenuItem className="flex items-center gap-2 py-2.5 px-4 mx-1 rounded-lg text-[#2AA0DC] font-medium">
                          <UserRound className="h-4 w-4" />
                          {t("Login")}
                        </DropdownMenuItem>
                      </Link>
                    ) : (
                      <>
                        <Link to={`/${lang}/profile`}>
                          <DropdownMenuItem className="flex items-center gap-2 py-2.5 px-4 mx-1 rounded-lg focus:bg-[#211C4D]/5">
                            <UserRound className="h-4 w-4 text-[#211C4D]" />
                            <span className="text-[#211C4D]">{t("Profile")}</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link to={`/${lang}/myorder`}>
                          <DropdownMenuItem className="flex items-center gap-2 py-2.5 px-4 mx-1 rounded-lg focus:bg-[#211C4D]/5">
                            <Package className="h-4 w-4 text-[#211C4D]" />
                            <span className="text-[#211C4D]">{t("MyOrders")}</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link to={`/${lang}/address`}>
                          <DropdownMenuItem className="flex items-center gap-2 py-2.5 px-4 mx-1 rounded-lg focus:bg-[#211C4D]/5">
                            <MapPin className="h-4 w-4 text-[#211C4D]" />
                            <span className="text-[#211C4D]">{t("Addresses")}</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link to={`/${lang}/wallet`}>
                          <DropdownMenuItem className="flex items-center gap-2 py-2.5 px-4 mx-1 rounded-lg focus:bg-[#211C4D]/5">
                            <Wallet className="h-4 w-4 text-[#211C4D]" />
                            <span className="text-[#211C4D]">{t("Wallet")}</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link to={`/${lang}/favourite`}>
                          <DropdownMenuItem className="flex items-center gap-2 py-2.5 px-4 mx-1 rounded-lg focus:bg-[#211C4D]/5">
                            <Heart className="h-4 w-4 text-[#211C4D]" />
                            <span className="text-[#211C4D]">{t("favourite")}</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link to={`/${lang}/bills`}>
                          <DropdownMenuItem className="flex items-center gap-2 py-2.5 px-4 mx-1 rounded-lg focus:bg-[#211C4D]/5">
                            <FileText className="h-4 w-4 text-[#211C4D]" />
                            <span className="text-[#211C4D]">{t("Bills")}</span>
                          </DropdownMenuItem>
                        </Link>
                        <Link to={`/${lang}/discounts`}>
                          <DropdownMenuItem className="flex items-center gap-2 py-2.5 px-4 mx-1 rounded-lg focus:bg-[#211C4D]/5">
                            <Tag className="h-4 w-4 text-[#211C4D]" />
                            <span className="text-[#211C4D]">{t("Discounts")}</span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator className="bg-gray-100" />
                        <DropdownMenuItem
                          variant="destructive"
                          className="flex items-center gap-2 py-2.5 px-4 mx-1 rounded-lg focus:bg-red-50 focus:text-red-600"
                          onSelect={handleLogout}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{t("Logout")}</span>
                        </DropdownMenuItem>
                      </>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Sheet
                open={cartSheetOpen}
                onOpenChange={(open) => {
                  setCartSheetOpen(open);
                  if (open) fetchCart();
                }}
              >
                <SheetTrigger asChild>
                  <IconButton aria-label={t("Cart")} className="relative" type="button">
                    <ShoppingCart className="h-5 w-5 opacity-90" />
                    {cartQuantity > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-[#F3AC5D]"
                      >
                        {cartQuantity}
                      </Badge>
                    )}
                  </IconButton>
                </SheetTrigger>
                <SheetContent
                  side={lang === "ar" ? "left" : "right"}
                  className="w-full sm:max-w-md flex flex-col p-0 border-0 shadow-2xl"
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  <SheetHeader
                    className={cn(
                      "border-b border-[#211C4D]/10 bg-[#211C4D] text-white py-4 rounded-t-lg",
                      lang === "ar" ? "ps-12 pe-6" : "pe-12 ps-6"
                    )}
                  >
                    <SheetTitle className="text-white text-xl font-bold flex items-center gap-2">
                      <ShoppingCart className="h-6 w-6" />
                      {t("Cart")}
                      {cartQuantity > 0 && (
                        <span className="bg-[#F3AC5D] text-[#211C4D] text-sm font-bold px-2.5 py-0.5 rounded-full">
                          {cartQuantity}
                        </span>
                      )}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto">
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-[#211C4D]/10 flex items-center justify-center mb-4">
                          <ShoppingCart className="h-10 w-10 text-[#211C4D]/50" />
                        </div>
                        <p className="text-[#211C4D] font-medium text-lg">{t("YourCartIsEmpty")}</p>
                        <p className="text-gray-500 text-sm mt-1">{t("AddProductsToGetStarted")}</p>
                        <Link
                          to={`/${lang}/`}
                          onClick={() => setCartSheetOpen(false)}
                          className="mt-6 inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#2AA0DC] text-white font-semibold hover:bg-[#238ec4] transition-colors"
                        >
                          {t("ContinueShopping")}
                        </Link>
                      </div>
                    ) : (
                      <ul className="divide-y divide-gray-100">
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex gap-3 p-4 hover:bg-gray-50/80 transition-colors">
                            <Link
                              to={`/${lang}/singleproduct/${item.product?.slug || item.product?.id}`}
                              onClick={() => setCartSheetOpen(false)}
                              className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center"
                            >
                              {item.product?.main_image ? (
                                <img src={item.product.main_image} alt={item.product.name} className="w-full h-full object-cover" />
                              ) : (
                                <ShoppingCart className="h-6 w-6 text-gray-400" />
                              )}
                            </Link>
                            <div className="flex-1 min-w-0">
                              <Link
                                to={`/${lang}/singleproduct/${item.product?.slug || item.product?.id}`}
                                onClick={() => setCartSheetOpen(false)}
                                className="font-medium text-[#211C4D] text-sm line-clamp-2 hover:text-[#2AA0DC]"
                              >
                                {item.product?.name}
                              </Link>
                              <p className="text-gray-500 text-xs mt-0.5">
                                {item.quantity} × {item.price} {t("SAR")}
                              </p>
                              <p className="text-[#F3AC5D] font-semibold text-sm mt-1">{item.subtotal} {t("SAR")}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {cartItems.length > 0 && (
                    <SheetFooter className="border-t border-gray-200 p-4 flex-col gap-3 sm:flex-col">
                      <div className="flex items-center justify-between w-full text-[#211C4D] font-semibold">
                        <span>{t("Total")}</span>
                        <span className="text-lg text-[#F3AC5D]">{cartTotal} {t("SAR")}</span>
                      </div>
                      <Link
                        to={`/${lang}/checkout`}
                        onClick={() => setCartSheetOpen(false)}
                        className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-[#F3AC5D] text-[#211C4D] font-bold hover:bg-[#e09d4a] transition-colors"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        {t("CompletePurchase")}
                      </Link>
                      <Link
                        to={`/${lang}/`}
                        onClick={() => setCartSheetOpen(false)}
                        className="w-full text-center text-[#2AA0DC] text-sm font-medium hover:underline"
                      >
                        {t("ContinueShopping")}
                      </Link>
                    </SheetFooter>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Bottom nav */}
          <div className="flex items-center w-full !justify-between gap-4 pb-3">
            {/* Language */}
            <div className="relative inline-block text-left">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-1 text-sm opacity-90 hover:opacity-100 cursor-pointer">
                    <Globe className="h-4 w-4" />
                    {lang === "ar" ? t("Arabic") : t("English")}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-200"
                    >
                      <path
                        d="M8 15.5C7.5 15.5 7 15.3 6.66 14.94L2.15 10.39C1.95 10.19 1.95 9.85 2.15 9.65C2.35 9.45 2.68 9.45 2.88 9.65L7.39 14.2C7.73 14.53 8.26 14.53 8.6 14.2L13.11 9.65C13.31 9.45 13.64 9.45 13.84 9.65C14.05 9.85 14.05 10.19 13.84 10.39L9.33 14.94C8.97 15.31 8.48 15.5 8 15.5Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" sideOffset={8} className="z-[9999]">
                  <DropdownMenuItem onClick={() => i18n.changeLanguage("ar")}>العربية</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>English</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Main Navigation Links */}
            <nav className="hidden items-center lg:gap-2 h-[53px] text-sm md:flex" dir={lang === "ar" ? "rtl" : "ltr"}>
              {navitem.map((item, index) => (
                <NavLink
                  key={index}
                  to={`${item.link}`}
                  end={item.link === `/${lang}/`}
                  className={({ isActive }) =>
                    `xl:text-[20px] lg:text-[15px] py-[9px] px-[24px] md:text-[12px] font-[400] text-white hover:text-[#F3AC5D] transition-all duration-300 ${isActive ? "navactive text-[#F3AC5D]" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Categories Dropdown */}
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <div className="w-[150px] bg-transparent cursor-pointer">
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
                    <p className="text-[19px] text-[#E0E5EB]">{t("Sections")}</p>
                    <svg className="ml-[10px]" width="13" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
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

              <DropdownMenuContent className="w-56 z-50" align="start" sideOffset={5}>
                <DropdownMenuGroup>
                  {categories.map((category: any) => {
                    const hasChildren = category.children && category.children.length > 0;

                    if (!hasChildren) {
                      return (
                        <DropdownMenuItem key={category.id} asChild>
                          <Link to={`/${lang}/categorySingle/${category.slug}/products`} className="flex items-center gap-2 cursor-pointer">
                            <span className="text-gray-500">
                              {getCategoryIcon(category.name, category.slug)}
                            </span>
                            {category.name}
                          </Link>
                        </DropdownMenuItem>
                      );
                    }

                    return (
                      <DropdownMenuSub key={category.id}>
                        <DropdownMenuSubTrigger className="flex items-center gap-2 cursor-pointer">
                          <span className="text-gray-500">
                            {getCategoryIcon(category.name, category.slug)}
                          </span>
                          {category.name}
                        </DropdownMenuSubTrigger>

                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="w-48">
                            <DropdownMenuItem asChild>
                              <Link to={`/${lang}/categorySingle/${category.slug}/products`}>
                                {t("View all")} {category.name}
                              </Link>
                            </DropdownMenuItem>
                            {category.children.map((child: any) => (
                              <DropdownMenuItem key={child.id} asChild>
                                <Link to={`/${lang}/categorySingle/${child.slug}/products`} className="flex items-center gap-2">
                                  <span className="text-gray-400">
                                    {getCategoryIcon(child.name, child.slug)}
                                  </span>
                                  {child.name}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <div className="md:hidden">

        <MobileMenu
          isOpen={isMenuOpen}
          onClose={handleCloseMenu}
          openSections={openSections}
          setOpenSections={setOpenSections}
        />

        <MobileNavbar
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          onSectionToggle={handleMobileSectionToggle}
          isMenuOpen={isMenuOpen}
          onSearchToggle={() => setIsMobileSearchOpen(true)}
          headerVisible={headerVisible}
        />

        {/* Mobile Search Modal */}
        {isMobileSearchOpen && (
          <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm md:hidden">
            <div className="absolute inset-0" onClick={() => setIsMobileSearchOpen(false)} />
            <div className="absolute top-0 left-0 right-0 bg-[#211a44] p-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1" dir={lang === "ar" ? "rtl" : "ltr"}>
                  <Input
                    value={query}
                    onChange={(e: any) => handleSearchChange(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") handleMobileSearch();
                    }}
                    placeholder={t("search")}
                    className="h-12 rounded-full px-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-[#6C727F] focus-visible:ring-white/40"
                    autoFocus
                  />
                  <button
                    onClick={handleMobileSearch}
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 h-8 w-8 rounded-full bg-[#F3AC5D] flex items-center justify-center"
                  >
                    <Search className="h-4 w-4 text-white" />
                  </button>
                </div>
                <button
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              {showSuggestions && (
                <div className="mt-2 bg-white text-black rounded-lg shadow-lg max-h-72 overflow-auto">
                  {suggestionsLoading ? (
                    <div className="text-start p-3">{t("Searching...")}</div>
                  ) : suggestions.length === 0 ? (
                    <div className="p-3 text-start">{t("Noresultsfound")}</div>
                  ) : (
                    suggestions.map((item: SuggestionItem) => (
                      <div
                        key={`category-${item.id}`}
                        onClick={() => {
                          navigate(`/${lang}/categorySingle/${item.slug}/products`);
                          setIsMobileSearchOpen(false);
                          setQuery("");
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 active:bg-gray-50"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/logo.png";
                              }}
                            />
                          ) : (
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{item.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{t("Category")}</span>
                            {item.productsCount !== undefined && item.productsCount > 0 && (
                              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                {item.productsCount} {t("products")}
                              </span>
                            )}
                          </div>
                        </div>

                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* Helper Component */
function IconButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button
      {...props}
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/15 relative " +
        (className ?? "")
      }
    >
      {children}
    </button>
  );
}
