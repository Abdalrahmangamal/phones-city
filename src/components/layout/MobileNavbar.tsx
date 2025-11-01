"use client";
import { useState } from "react";
import { ShoppingCart, Heart, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useLangSync } from "@/hooks/useLangSync";
interface MobileNavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function MobileNavbar({ onMenuToggle }: MobileNavbarProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const { lang } = useLangSync();
  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-[#211C4DDE] backdrop-blur-md border-b border-[#FFFFFF20] z-50 h-[70px] px-4">
        <div className="flex items-center justify-between h-full">
          {/* Menu toggle button */}
          <button onClick={onMenuToggle} className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <div className="w-6 h-0.5 bg-white rounded-full"></div>
              <div className="w-6 h-0.5 bg-white rounded-full"></div>
              <div className="w-6 h-0.5 bg-white rounded-full"></div>
            </div>
            <span className="text-white font-bold text-base">
              مدينة الهواتف
            </span>
          </button>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="w-[90px] h-[30px] rounded-[16px] bg-[#FFFFFF1A] flex items-center justify-center text-[10px] font-[400] 
              text-white transition-all duration-300 hover:bg-white hover:text-[#211C4D]"
            >
              تسجيل الدخول
            </Link>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#333D4C]"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? (
                <X className="w-4 h-4 text-[#E0E5EB]" />
              ) : (
                <Search className="w-4 h-4 text-[#E0E5EB]" />
              )}
            </button>

            {/* <Link  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#333D4C] relative" to={`/${lang}/favourite`}>
              <Heart className="text-white w-5 h-5" />
            </Link> */}

            <Link
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#333D4C] relative"
              to={`/${lang}/myorder`}
            >
              <ShoppingCart className="w-4 h-4 text-[#E0E5EB]" />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-[#222934] bg-[#F3AC5D] flex items-center justify-center text-[10px] text-white font-bold">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search bar overlay */}
      <div
        className={`fixed top-[70px] left-0 right-0 bg-white px-4 py-3 shadow-md transition-all duration-300 z-40 ${
          showSearch
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="relative">
          <Input
            type="text"
            placeholder="ابحث عن منتج..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10 text-right"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
    </>
  );
}
