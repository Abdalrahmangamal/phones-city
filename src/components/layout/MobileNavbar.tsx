"use client";
import { ShoppingCart, Heart, Search } from 'lucide-react';

interface MobileNavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function MobileNavbar({ onMenuToggle, isMenuOpen }: MobileNavbarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-[#211C4DDE] backdrop-blur-md border-b border-[#FFFFFF20] z-50 h-[70px] px-4">
      <div className="flex items-center justify-between h-full">
        {/* Menu toggle button */}
        <button onClick={onMenuToggle} className="flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <div className="w-6 h-0.5 bg-white rounded-full"></div>
            <div className="w-6 h-0.5 bg-white rounded-full"></div>
            <div className="w-6 h-0.5 bg-white rounded-full"></div>
          </div>
          <span className="text-white font-bold text-base">مدينة الهواتف</span>
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#333D4C]">
            <Search className="w-4 h-4 text-[#E0E5EB]" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#333D4C] relative">
            <Heart className="text-white w-5 h-5" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#333D4C] relative">
            <ShoppingCart className="w-4 h-4 text-[#E0E5EB]" />
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-[#222934] bg-[#F3AC5D] flex items-center justify-center text-[10px] text-white font-bold">
              3
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
