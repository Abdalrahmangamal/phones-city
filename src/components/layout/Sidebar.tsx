"use client";
import { useState } from "react";
import {
  User,
  ShoppingCart,
  FileText,
  Heart,
  MapPin,
  Gift,
  Wallet,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: <User className="w-5 h-5" />, text: "الحساب الشخصي",link:"/profile" },
    { icon: <ShoppingCart className="w-5 h-5" />, text: "طلباتي",link:"/myorder" },
    { icon: <FileText className="w-5 h-5" />, text: "الفواتير",link:"/bills" },
    { icon: <Heart className="w-5 h-5" />, text: "المفضلة",link:"/favoiets" },
    { icon: <MapPin className="w-5 h-5" />, text: "العنوان",link:"/address" },
    { icon: <Gift className="w-5 h-5" />, text: "خصومات",link:"/myorder" },
    { icon: <Wallet className="w-5 h-5" />, text: "المحفظة",link:"/wallet" },
    { icon: <LogOut className="w-5 h-5" />, text: "تسجيل الخروج",link:"/myorder" },
  ];

  return (
    <div className="relative">
      {/* زر القائمة للموبايل */}
      <button
        className="md:hidden flex items-center gap-2 p-3 text-[#2AA0DC]"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        <span className="text-[17px] font-medium">القائمة</span>
      </button>

      {/* الخلفية الداكنة عند الفتح */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* الشريط الجانبي */}
      <aside
        className={`fixed md:static top-0 right-0 h-full md:h-auto w-[250px] bg-white shadow-lg md:shadow-none rounded-none md:rounded-xl  text-right z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800">مرحباً منه</h2>

        <ul className="flex flex-col gap-4 items-start">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              
            >
              <Link to={`${item.link}`} className="flex items-center justify-end gap-3 text-gray-700 hover:text-[#2AA0DC] cursor-pointer transition-all">
              {item.icon}
              <span className="text-[15px]">{item.text}</span>
              
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
