'use client';
import * as React from 'react';
import logo from '../../assets/images/logo.png'; 
import { ShoppingCart, UserRound, Heart, Globe, Menu, Grid2x2, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  items?: string[];
};

const categories: Category[] = [
  { id: 'phones', name: 'موبايلات', icon: <Grid2x2 className="h-4 w-4" /> , items: ['سامسونج', 'آيفون', 'شاومي', 'أوبو'] },
  { id: 'accessories', name: 'اكسسوارات', icon: <Grid2x2 className="h-4 w-4" /> , items: ['سماعات', 'كفرات', 'سكرينات', 'شواحن'] },
  { id: 'tablets', name: 'تابلت', icon: <Grid2x2 className="h-4 w-4" /> , items: ['آيباد', 'سامسونج', 'لينوفو'] },
  { id: 'smart', name: 'أجهزة ذكية', icon: <Grid2x2 className="h-4 w-4" /> , items: ['سمارت ووتش', 'تراكر', 'هوم'] },
];

export default function Header() {
  return (
    <header dir="rtl" className="w-full border-b border-white/10 bg-[#211a44] text-white">
      <div className="container mx-auto px-3 md:px-6">
        {/* Top row */}
        <div className="flex items-center gap-3 py-3">
            
          {/* Logo */}
   <a href="/" className="ms-auto flex items-center gap-2">
  <img
    src={logo}
    alt="مدينة الهواتف"
    width={157}
    height={24}
    className="h-10 w-auto object-contain"
  />
</a>

          {/* Search */}
          <div className="mx-auto hidden flex-1 items-center md:flex">
            <div className="relative w-full max-w-2xl">
              <Input
                placeholder="ابحث عن المنتجات"
                className="h-10 rounded-full bg-transparent border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white/40"
              />
            </div>
          </div>


          {/* Left icons (في RTL هتبقى شمال فعليًا) */}
          <div className="flex items-center gap-2">
            <IconButton aria-label="عربة التسوق">
              <span className="relative">
                <ShoppingCart className="h-5 w-5 opacity-90" />
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-orange-400" />
              </span>
            </IconButton>
            <IconButton aria-label="حسابي">
              <UserRound className="h-5 w-5 opacity-90" />
            </IconButton>
            <IconButton aria-label="المفضلة">
              <Heart className="h-5 w-5 opacity-90" />
            </IconButton>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center w-full !justify-around gap-4 pb-3">
         
           {/* Language */}
          <button className=" flex items-center gap-1 text-sm opacity-90 hover:opacity-100">
            عربي <Globe className="h-4 w-4" />
          </button>
          {/* Main Links */}
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#" className="hover:opacity-90">الرئيسية</a>
            <a href="#" className="hover:opacity-90">من نحن</a>
            <a href="#" className="hover:opacity-90">العروض</a>
            <a href="#" className="hover:opacity-90">خدماتنا</a>
            <a href="#" className="hover:opacity-90">تواصل معنا</a>
          </nav>

         {/* Categories Drawer Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="group flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/15"
              >
                <Menu className="h-4 w-4" />
                <span>الأقسام</span>
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
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
        'inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/15 ' +
        (className ?? '')
      }
    >
      {children}
    </button>
  );
}
