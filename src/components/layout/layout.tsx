'use client';
import * as React from 'react';
import logo from '../../assets/images/logo.png'; 
import { ShoppingCart, UserRound, Heart, Search, LayoutGrid, ChevronDown, ChevronRight, ChevronLeft, Monitor, Smartphone, Tablet, Camera, Mouse, Headphones, Watch, Gamepad2, HardDrive, Power, Pen, CreditCard, Home, Server, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LanguageSwitch from '@/components/custom/LanguageSwitch';
import { useLocation } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';
import MobileMenu from './MobileMenu';

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

export default function Header() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);

  // submenu position as viewport coordinates (fixed)
  const [submenuPos, setSubmenuPos] = React.useState<{ top: number; left: number } | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  // Function to determine if a link is active
  const isActiveLink = (index: number) => {
    if (index === 0) {
      const path = location.pathname;
      return path === '/' || 
             path.endsWith('/home') ||
             /^\/[a-z]{2}\/?$/.test(path) || 
             /^\/[a-z]{2}\/$/.test(path);
    }
    return false;
  };

  // Close dropdown / submenu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdown = document.getElementById('categories-dropdown');
      const trigger = document.getElementById('categories-trigger');
      const submenu = document.getElementById('categories-submenu');
      
      if (dropdown && !dropdown.contains(target) && trigger && !trigger.contains(target) && (!submenu || !submenu.contains(target))) {
        setIsDropdownOpen(false);
        setActiveSubmenu(null);
        setSubmenuPos(null);
      }
    };

    if (isDropdownOpen || activeSubmenu) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen, activeSubmenu]);

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

  // handle click on category item: toggle submenu on same item
  const handleCategoryItemClick = (item: CategoryItem, e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    const SUBMENU_WIDTH = 211;
    const GAP = 8;

    // toggle behavior: if already open, close
    if (item.name === 'الاجهزة اللوحية' && activeSubmenu === 'tablets') {
      setActiveSubmenu(null);
      setSubmenuPos(null);
      return;
    }

    if (item.name === 'الاجهزة اللوحية') {
      // ensure main dropdown is open
      if (!isDropdownOpen) setIsDropdownOpen(true);

      const targetEl = e.currentTarget as HTMLElement;
      const dropdownEl = dropdownRef.current;

      // compute viewport positions to choose the empty side
      const itemRect = targetEl.getBoundingClientRect();
      const dropdownRect = dropdownEl ? dropdownEl.getBoundingClientRect() : itemRect;
      const viewportWidth = window.innerWidth;
      const spaceOnRight = viewportWidth - dropdownRect.right; // space to right of dropdown
      const spaceOnLeft = dropdownRect.left; // space to left of dropdown

      // determine top for submenu (keep aligned with item)
      // we use viewport coords (fixed positioning)
      const top = Math.max(6, itemRect.top + 0); // avoid going too high

      // decide left coordinate so submenu appears on the side with more space (the "empty" side)
      let left: number;
      if (spaceOnRight >= SUBMENU_WIDTH + GAP) {
        // place to the right of dropdown (submenu on the empty right side)
        left = dropdownRect.right + GAP;
      } else if (spaceOnLeft >= SUBMENU_WIDTH + GAP) {
        // place to the left of dropdown
        left = Math.max(GAP, dropdownRect.left - SUBMENU_WIDTH - GAP);
      } else {
        // fallback: try to place where there's more space and clamp
        if (spaceOnRight >= spaceOnLeft) {
          left = Math.min(viewportWidth - SUBMENU_WIDTH - GAP, dropdownRect.right + GAP);
        } else {
          left = Math.max(GAP, dropdownRect.left - SUBMENU_WIDTH - GAP);
        }
      }

      setSubmenuPos({ top, left });
      setActiveSubmenu('tablets');
    } else {
      // normal item clicked -> close submenu if any
      setActiveSubmenu(null);
      setSubmenuPos(null);
      // navigation logic can go here
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <header dir="rtl" className="w-full bg-[#211C4D] text-white hidden md:block">
        <div className="px-4 md:px-6 py-2">
          {/* Top row */}
          <div className="flex items-center gap-4">
            
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="مدينة الهواتف"
                width={120}
                height={18}
                className="h-12 w-auto object-contain"
              />
              <h1 className='text-[18px] font-bold [filter:drop-shadow(0px_10px_5px_rgba(0,0,0,0.25))]'>مدينة الهواتف</h1>
            </a>

            {/* Search */}
            <div className="hidden md:block mx-auto flex-1">
              <div className="relative w-full max-w-[350px] mx-auto">
                <Search className="absolute top-1/2 right-4 -translate-y-1/2 h-5 w-5 text-white" />
                <Input
                  placeholder="بحث"
                  className="h-10 w-full rounded-full bg-transparent border border-white py-2 px-4 pr-12 text-white placeholder:text-[#6C727F] focus-visible:ring-white/40"
                />
              </div>
            </div>

            {/* Left icons */}
            <div className="flex items-center gap-2">
              <IconButton aria-label="المفضلة">
                <Heart className="h-5 w-5 opacity-90" />
              </IconButton>
              <IconButton aria-label="حسابي">
                <UserRound className="h-5 w-5 opacity-90" />
              </IconButton>
              <IconButton aria-label="عربة التسوق">
                <span className="relative">
                  <ShoppingCart className="h-5 w-5 opacity-90" />
                  <span className="absolute -top-2 -left-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#211C4D] bg-[#F3AC5D] text-[8px] font-bold text-white">
                    3
                  </span>
                </span>
              </IconButton>
            </div>
          </div>

          {/* Bottom nav */}
          <div className="mt-2 flex items-center relative">
              {/* Language Switcher */}
              <div className="flex flex-1 justify-start">
                  <LanguageSwitch />
              </div>

              {/* Nav Links */}
              <nav className="hidden md:flex flex-auto justify-center items-center gap-1">
                  {navLinks.map((link, index) => (
                      <a 
                        key={link} 
                        href={index === 0 ? '/' : '#'} 
                        className={`px-3 py-2 text-base font-medium [filter:drop-shadow(0px_15px_5px_rgba(0,0,0,0.35))] hover:text-white/80 rounded-lg ${
                          isActiveLink(index) ? 'bg-[#FFFFFF1A]' : 'text-white'
                        }`}
                      >
                        {link}
                      </a>
                  ))}
              </nav>

              {/* Categories Toggle */}
              <div className="flex flex-1 justify-end relative">
                <Button 
                  id="categories-trigger"
                  variant="ghost" 
                  className="flex items-center gap-1 px-3 py-2 text-base font-medium rounded-t-lg rounded-b-none hover:bg-white/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    // toggle main dropdown
                    setIsDropdownOpen(prev => {
                      const next = !prev;
                      if (!next) {
                        // closing main dropdown also close submenu
                        setActiveSubmenu(null);
                        setSubmenuPos(null);
                      }
                      return next;
                    });
                  }}
                  aria-expanded={isDropdownOpen}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>الأقسام</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {/* Main Dropdown */}
                {isDropdownOpen && categories.length > 0 && categories[0].items && (
                  <div 
                    id="categories-dropdown"
                    ref={dropdownRef}
                    className="absolute top-full right-0 bg-white border border-[#EEF1F6] p-3 z-50"
                    style={{ 
                      height: 'auto',
                      maxHeight: '684px',
                      opacity: 1,
                      borderBottomRightRadius: '16px',
                      borderBottomLeftRadius: '16px',
                      borderWidth: '1px',
                      boxShadow: '0px 8px 32px -4px #676F7B1A',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-1 max-h-[660px] overflow-y-auto">
                      {categories[0].items.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center justify-between hover:bg-gray-100 transition-colors"
                          style={{
                            width: '230px',
                            height: '36px',
                            gap: '12px',
                            paddingTop: '8px',
                            paddingRight: '12px',
                            paddingBottom: '8px',
                            paddingLeft: '12px',
                            borderRadius: '8px',
                            opacity: 1,
                          }}
                          onClick={(e) => handleCategoryItemClick(item, e, index)}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <span 
                              className="text-[#272727] text-sm"
                              style={{
                                fontFamily: 'Roboto',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '100%',
                                textAlign: 'right',
                                opacity: 1,
                              }}
                            >
                              {item.name}
                            </span>
                          </div>
                          <ChevronRight 
                            className="w-4 h-4 text-[#333D4C]" 
                            style={{ 
                              opacity: 0.6,
                              transform: 'rotate(180deg)'
                            }} 
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submenu (fixed, appears on the empty side) */}
                {activeSubmenu === 'tablets' && submenuPos && (
                  <div
                    id="categories-submenu"
                    className="bg-white border border-[#EEF1F6] p-3 z-50"
                    style={{
                      position: 'fixed',
                      top: `${submenuPos.top}px`,
                      left: `${submenuPos.left}px`,
                      height: 'auto',
                      maxHeight: '400px',
                      opacity: 1,
                      borderRadius: '12px',
                      borderWidth: '1px',
                      boxShadow: '0px 8px 32px -4px #676F7B1A',
                      transform: 'translateY(0)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-1 overflow-y-auto" style={{ maxHeight: '360px' }}>
                      {tabletSubcategories.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="flex items-center gap-3 hover:bg-gray-100 transition-colors"
                          style={{
                            width: '197px',
                            height: '36px',
                            gap: '12px',
                            paddingTop: '8px',
                            paddingRight: '12px',
                            paddingBottom: '8px',
                            paddingLeft: '12px',
                            borderRadius: '8px',
                            opacity: 1,
                          }}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* navigate to subItem page */ }}
                        >
                          <div className="flex items-center gap-3">
                            {subItem.icon}
                            <span 
                              className="text-[#272727] text-sm"
                              style={{
                                fontFamily: 'Roboto',
                                fontWeight: 300,
                                fontSize: '14px',
                                lineHeight: '100%',
                                textAlign: 'right',
                                opacity: 1,
                              }}
                            >
                              {subItem.name}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Only visible on mobile devices */}
      <div className="md:hidden">
        <MobileNavbar 
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          isMenuOpen={isMobileMenuOpen} 
        />
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
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
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button
      {...props}
      className={
        'inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/25 backdrop-blur transition hover:bg-white/30 ' +
        (className ?? '')
      }
    >
      {children}
    </button>
  );
}