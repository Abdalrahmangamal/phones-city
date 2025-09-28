'use client';
import * as React from 'react';
import logo from '../../assets/images/logo.png'; 
import { ShoppingCart, UserRound, Heart, Search, Globe, LayoutGrid, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  items?: string[];
};

const categories: Category[] = [
  { id: 'phones', name: 'موبايلات', icon: <LayoutGrid className="h-4 w-4" /> , items: ['سامسونج', 'آيفون', 'شاومي', 'أوبو'] },
  { id: 'accessories', name: 'اكسسوارات', icon: <LayoutGrid className="h-4 w-4" /> , items: ['سماعات', 'كفرات', 'سكرينات', 'شواحن'] },
  { id: 'tablets', name: 'تابلت', icon: <LayoutGrid className="h-4 w-4" /> , items: ['آيباد', 'سامسونج', 'لينوفو'] },
  { id: 'smart', name: 'أجهزة ذكية', icon: <LayoutGrid className="h-4 w-4" /> , items: ['سمارت ووتش', 'تراكر', 'هوم'] },
];

const navLinks = ['الرئيسية', 'من نحن', 'العروض', 'خدماتنا', 'تواصل معنا'];

export default function Header() {
  return (
    <header dir="rtl" className="w-full bg-[#211C4D] text-white py-2">
      <div className="px-4 md:px-6">
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
        <div className="mt-2 flex items-center">
            {/* Language Switcher */}
            <div className="flex flex-1 justify-start">
                <button className="flex items-center gap-1 text-sm font-normal">
                    <Globe className="h-4 w-4" />
                    <span>عربي</span>
                    <ChevronDown className="h-4 w-4" />
                </button>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex flex-auto justify-center items-center gap-1">
                {navLinks.map(link => (
                    <a 
                      key={link} 
                      href="#" 
                      className="px-3 py-2 text-base font-medium text-white [filter:drop-shadow(0px_15px_5px_rgba(0,0,0,0.35))] hover:text-white/80"
                    >
                      {link}
                    </a>
                ))}
            </nav>

            {/* Categories Toggle */}
            <div className="flex flex-1 justify-end">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-1 px-3 py-2 text-base font-medium rounded-t-lg rounded-b-none hover:bg-white/10">
                            <LayoutGrid className="h-4 w-4" />
                            <span>الأقسام</span>
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[92vw] sm:w-[520px]" aria-describedby={undefined}>
                        <SheetHeader>
                            <SheetTitle className="text-right">كل الأقسام</SheetTitle>
                        </SheetHeader>
                        <Separator className="my-3" />
                        <nav className="grid grid-cols-2 gap-3">
                            {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="rounded-xl border border-neutral-200/60 p-3 text-right hover:border-neutral-300"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="rounded-lg bg-neutral-100 p-1.5 text-neutral-700">{cat.icon}</span>
                                    <h3 className="text-sm font-semibold text-neutral-900">{cat.name}</h3>
                                </div>
                                </div>
                                <ul className="space-y-1">
                                {cat.items?.map((item) => (
                                    <li key={item}>
                                    <a
                                        href="#"
                                        className="block rounded-md px-2 py-1 text-[13px] text-neutral-700 hover:bg-neutral-100"
                                    >
                                        {item}
                                    </a>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
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