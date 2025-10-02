'use client';

import { ShoppingCart, Heart, Search } from 'lucide-react';
import { useSettings } from '@/store/settings';

interface MobileNavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function MobileNavbar({ onMenuToggle, isMenuOpen }: MobileNavbarProps) {
  const { lang } = useSettings();
  
  return (
    <div 
      className="fixed top-0 left-0 right-0 bg-[#211C4DDE] backdrop-blur-md border-b border-[#FFFFFF20] z-50"
      style={{ 
        height: '70px',
        paddingTop: '8px',
        paddingRight: '16px',
        paddingBottom: '8px',
        paddingLeft: '16px'
      }}
    >
      <div className="flex items-center justify-between h-full">
        {/* Menu toggle button */}
        <button 
          onClick={onMenuToggle}
          className="flex items-center gap-4"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex flex-col gap-1">
            <div className="w-6 h-0.5 bg-white rounded-full"></div>
            <div className="w-6 h-0.5 bg-white rounded-full"></div>
            <div className="w-6 h-0.5 bg-white rounded-full"></div>
          </div>
          <span 
            className="text-white font-bold text-base"
            style={{ 
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '100%',
              textAlign: lang === 'ar' ? 'right' : 'left'
            }}
          >
            مدينة الهواتف
          </span>
        </button>

        {/* Action buttons */}
        <div className="flex items-center gap-1" style={{ width: '158px' }}>
          {/* Search button */}
          <button 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#333D4C] transition hover:bg-[#333D4C]/80"
            aria-label="Search"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '100px',
              padding: '15px'
            }}
          >
            <Search className="w-4.5 h-4.5 text-[#E0E5EB]" />
          </button>

          {/* Wishlist button */}
          <button 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#333D4C] transition hover:bg-[#333D4C]/80 relative"
            aria-label="Wishlist"
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '100px',
              padding: '15px'
            }}
          >
            <Heart 
              className="text-white" 
              style={{
                width: '24px',
                height: '24px'
              }}
            />
          </button>

          {/* Cart button with badge */}
          <button 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#333D4C] transition hover:bg-[#333D4C]/80 relative"
            aria-label="Shopping cart"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '100px',
              padding: '15px'
            }}
          >
            <ShoppingCart className="w-4.5 h-4.5 text-[#E0E5EB]" />
            <span 
              className="absolute flex items-center justify-center text-xs font-bold text-white"
              style={{ 
                width: '24px',
                height: '24px',
                borderRadius: '18px',
                border: '3px solid #222934',
                backgroundColor: '#F3AC5D',
                top: '-12px',
                right: '-12px'
              }}
            >
              3
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}