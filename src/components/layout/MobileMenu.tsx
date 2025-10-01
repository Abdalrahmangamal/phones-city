'use client';

import * as React from 'react';
import { X, Smartphone, Tablet, Camera, Mouse, Headphones, Watch, Gamepad2, HardDrive, Power, Pen, CreditCard, Home, Server, Monitor } from 'lucide-react';
import { useSettings } from '@/store/settings';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryItem = {
  name: string;
  icon: React.ReactNode;
};

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  items?: CategoryItem[];
};

const categories: Category[] = [
  { 
    id: 'laptops', 
    name: 'لابتوب', 
    icon: <Monitor className="w-5 h-5 text-black" />, 
    items: [
      { name: 'الهواتف الذاكيه', icon: <Smartphone className="w-5 h-5 text-black" /> },
      { name: 'الاجهزة اللوحية', icon: <Tablet className="w-5 h-5 text-black" /> },
      { name: 'الكيمرات و الداش كام', icon: <Camera className="w-5 h-5 text-black" /> },
      { name: 'الاكسيسوارات', icon: <Mouse className="w-5 h-5 text-black" /> },
      { name: 'السماعات', icon: <Headphones className="w-5 h-5 text-black" /> },
      { name: 'الساعات الذاكيه', icon: <Watch className="w-5 h-5 text-black" /> },
      { name: 'الالعاب', icon: <Gamepad2 className="w-5 h-5 text-black" /> },
      { name: 'الروتر', icon: <HardDrive className="w-5 h-5 text-black" /> },
      { name: 'الاجهزة النوكيا', icon: <Smartphone className="w-5 h-5 text-black" /> },
      { name: 'الشواحن', icon: <Power className="w-5 h-5 text-black" /> },
      { name: 'اقلام الايبادات', icon: <Pen className="w-5 h-5 text-black" /> },
      { name: 'قسم التقسيط', icon: <CreditCard className="w-5 h-5 text-black" /> },
      { name: 'الاجهزة الالكترونية والكهربائيه الصغيره', icon: <Home className="w-5 h-5 text-black" /> },
      { name: 'الاجهزة الالكترونية والكهربائيه الكبيرة', icon: <Server className="w-5 h-5 text-black" /> }
    ] 
  }
];

const navLinks = ['الرئيسية', 'من نحن', 'العروض', 'خدماتنا', 'تواصل معنا'];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { lang } = useSettings();
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);
  
  // Define subcategories for tablets
  const tabletSubcategories = [
    { name: 'اجهزة ابل', icon: <Smartphone className="w-5 h-5 text-black" /> },
    { name: 'اجهزة السامسونج', icon: <Smartphone className="w-5 h-5 text-black" /> },
    { name: 'اجهزة الهونر', icon: <Smartphone className="w-5 h-5 text-black" /> },
    { name: 'اجهزة انفينيكس', icon: <Smartphone className="w-5 h-5 text-black" /> },
    { name: 'اجهزة التكنو', icon: <Smartphone className="w-5 h-5 text-black" /> },
    { name: 'اجهزة الايتيل', icon: <Smartphone className="w-5 h-5 text-black" /> },
    { name: 'اجهزة شاومي ردمي', icon: <Smartphone className="w-5 h-5 text-black" /> },
    { name: 'اجهزة اندرويد اخري', icon: <Smartphone className="w-5 h-5 text-black" /> }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#211C4D] z-50 overflow-y-auto"
      style={{ 
        paddingTop: '70px', // Account for navbar height
        paddingBottom: '0'
      }}
    >
      {/* Header with close button */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#FFFFFF20]">
        <h2 className="text-white text-xl font-bold">مدينة الهواتف</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-[#333D4C]"
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="px-4 py-3">
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href="#" 
              className="block px-4 py-3 text-white text-base font-medium rounded-lg hover:bg-[#333D4C]"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      {/* Categories Section */}
      <div className="px-4 py-3 border-t border-[#FFFFFF20] mt-2">
        <h3 className="text-white text-lg font-bold mb-3">الأقسام</h3>
        <div className="space-y-2">
          {categories[0].items?.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center justify-between px-4 py-3 text-white hover:bg-[#333D4C] rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                if (item.name === 'الاجهزة اللوحية') {
                  setActiveSubmenu(activeSubmenu === 'tablets' ? null : 'tablets');
                } else {
                  setActiveSubmenu(null);
                }
              }}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-base">{item.name}</span>
              </div>
              {item.name === 'الاجهزة اللوحية' && (
                <svg 
                  className={`w-5 h-5 transition-transform ${activeSubmenu === 'tablets' ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </a>
          ))}
        </div>

        {/* Tablet Subcategories */}
        {activeSubmenu === 'tablets' && (
          <div className="mt-2 mr-4 space-y-2 border-r-2 border-[#F3AC5D] pr-4">
            {tabletSubcategories.map((subItem, subIndex) => (
              <a
                key={subIndex}
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#333D4C] rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {subItem.icon}
                <span className="text-base">{subItem.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}