"use client";
import * as React from "react";
import logo from "../../assets/images/logo.png";
import { ShoppingCart, UserRound, Heart, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
  // language btn
  const [open, setOpen] = useState(false);

  return (
    <>
    {/* desktop  header */}
    <header
      dir="rtl"
      className="w-full border-b h-[170px] hidden md:block border-white/10 bg-[#211a44] text-white"
    >
      <div className="container h-full flex flex-col justify-around mx-auto px-3 md:px-6">
        {/* Top rrrrrrrrrrrrow */}
        <div className="flex items-center gap-3 py-3 px-[100px]">
          {/* Logo */}
          <a href="/" className=" flex items-center gap-2">
            <img
              src={logo}
              alt="مدينة الهواتف"
              width={157}
              height={24}
              className="h-[70px] w-[70px] object-contain"
            />
            <h1 className="flex items-center text-[24px] font-[700] ">
              مدينة الهواتف
            </h1>
          </a>

          {/* Search */}
          <div className="mx-auto hidden flex-1 max-w-[500px] justify-center items-center md:flex">
            <div className="relative w-full max-w-2xl">
              <Input
                placeholder="ابحث عن المنتجات"
                className="h-10 rounded-full bg-transparent border-white text-white placeholder:text-white/60 focus-visible:ring-white/40"
              />
            </div>
          </div>

          {/* Left icons (في RTL هتبقى شمال فعليًا) */}
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
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-orange-400" />
              </span>
            </IconButton>
          </div>
        </div>

        {/* Bottom nnnnnnnnnnnnnnnav */}
        <div className="flex items-center w-full !justify-between px-[100px] gap-4 pb-3">
          {/* Language */}
            <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm opacity-90 hover:opacity-100"
      >
        <Globe className="h-4 w-4" />
        عربي
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M8 15.5C7.5 15.5 7 15.3 6.66 14.94L2.15 10.39C1.95 10.19 1.95 9.85 2.15 9.65C2.35 9.45 2.68 9.45 2.88 9.65L7.39 14.2C7.73 14.53 8.26 14.53 8.6 14.2L13.11 9.65C13.31 9.45 13.64 9.45 13.84 9.65C14.05 9.85 14.05 10.19 13.84 10.39L9.33 14.94C8.97 15.31 8.48 15.5 8 15.5Z"
            fill="white"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
          <ul className="py-1 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">العربية</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">English</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Français</li>
          </ul>
        </div>
      )}
    </div>

          {/* Main Links */}
          <nav className="hidden items-center gap-15  text-sm md:flex">
            <Link to={"/"} className="text-[24px] font-[400] ">
              الرئيسية{" "}
            </Link>
            <Link to={"/"} className="text-[24px] font-[400] ">
              من نحن{" "}
            </Link>
            <Link to={"/"} className="text-[24px] font-[400] ">
              العروض{" "}
            </Link>
            <Link to={"/"} className="text-[24px] font-[400] ">
              خدماتنا{" "}
            </Link>
            <Link to={"/"} className="text-[24px] font-[400] ">
              تواصل معنا{" "}
            </Link>
          </nav>
          {/* category btn */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-[150px] bg-transparent ">
                <div className="flex items-center justify-center gap-[10px]">
                  <svg
                    width="24"
                    height="21"
                    viewBox="0 0 24 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.480469 1.1263C0.480469 0.622918 0.937511 0.214844 1.5013 0.214844H9.66797C10.2318 0.214844 10.6888 0.622918 10.6888 1.1263V8.41797C10.6888 8.92135 10.2318 9.32943 9.66797 9.32943H1.5013C0.937511 9.32943 0.480469 8.92135 0.480469 8.41797V1.1263ZM2.52214 2.03776V7.50651H8.64714V2.03776H2.52214Z"
                      fill="#E0E5EB"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.3138 1.1263C13.3138 0.622918 13.7708 0.214844 14.3346 0.214844H22.5013C23.0651 0.214844 23.5221 0.622918 23.5221 1.1263V8.41797C23.5221 8.92135 23.0651 9.32943 22.5013 9.32943H14.3346C13.7708 9.32943 13.3138 8.92135 13.3138 8.41797V1.1263ZM15.3555 2.03776V7.50651H21.4805V2.03776H15.3555Z"
                      fill="#E0E5EB"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.3138 12.5846C13.3138 12.0813 13.7708 11.6732 14.3346 11.6732H22.5013C23.0651 11.6732 23.5221 12.0813 23.5221 12.5846V19.8763C23.5221 20.3797 23.0651 20.7878 22.5013 20.7878H14.3346C13.7708 20.7878 13.3138 20.3797 13.3138 19.8763V12.5846ZM15.3555 13.4961V18.9648H21.4805V13.4961H15.3555Z"
                      fill="#E0E5EB"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.480469 12.5846C0.480469 12.0813 0.937511 11.6732 1.5013 11.6732H9.66797C10.2318 11.6732 10.6888 12.0813 10.6888 12.5846V19.8763C10.6888 20.3797 10.2318 20.7878 9.66797 20.7878H1.5013C0.937511 20.7878 0.480469 20.3797 0.480469 19.8763V12.5846ZM2.52214 13.4961V18.9648H8.64714V13.4961H2.52214Z"
                      fill="#E0E5EB"
                    />
                  </svg>
                  <p>الاقسام</p>
                  <svg
                    className="mr-[10px]"
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.934144 0.731804C1.24738 0.375857 1.75523 0.375857 2.06846 0.731804L7.0013 6.33731L11.9341 0.731804C12.2474 0.375857 12.7552 0.375857 13.0685 0.731804C13.3817 1.08775 13.3817 1.66485 13.0685 2.0208L7.56846 8.2708C7.25523 8.62675 6.74738 8.62675 6.43414 8.2708L0.934144 2.0208C0.620911 1.66485 0.620911 1.08775 0.934144 0.731804Z"
                      fill="#E0E5EB"
                    />
                  </svg>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
    </header>
    {/* mobile header */}
    <div className="md:hidden">
    <MobileMenu isOpen={true} />
<MobileNavbar onMenuToggle={function (): void {
          throw new Error("Function not implemented.");
        } } isMenuOpen={false}/>
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
