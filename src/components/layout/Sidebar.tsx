"use client";
import { useState, useEffect } from "react";  // أضفنا useEffect
import "../../index.css";
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
import { NavLink, useNavigate } from "react-router-dom";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";

// أضفنا الـ store الخاص بالبروفايل
import { useProfileStore } from "@/store/profile/profileStore";

export default function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { lang } = useLangSync();

  // جلب بيانات المستخدم من الـ store
  const { profile, fetchProfile, isLoading } = useProfileStore();

  // Fetch البروفايل لما الكومبوننت يتحمل (لو مش موجود أصلاً)
  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  // استخراج الاسم (حسب الـ API اللي عندك)
  // في الـ JSON اللي شاركتيه: "name": "bertha Kuphal" → كامل
  const userName = profile?.name || profile?.firstName || "المستخدم";  // fallback لو مش موجود

  // تحية حسب اللغة
  const greeting = lang === "ar" ? "مرحباً" : "Welcome";

  const menuItems = [
    {
      icon: <User className="w-5 h-5" />,
      text: `${t("Profile")}`,
      link: `/${lang}/profile`,
    },
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      text: `${t("MyOrders")}`,
      link: `/${lang}/myorder`,
    },
    {
      icon: <FileText className="w-5 h-5" />,
      text: `${t("Bills")}`,
      link: `/${lang}/bills`,
    },
    {
      icon: <Heart className="w-5 h-5" />,
      text: `${t("Favorites")}`,
      link: `/${lang}/favourite`,
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: `${t("Address")}`,
      link: `/${lang}/address`,
    },
    {
      icon: <Gift className="w-5 h-5" />,
      text: `${t("Discounts")}`,
      link: `/${lang}/discounts`,
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      text: `${t("Wallet")}`,
      link: `/${lang}/wallet`,
    },
    {
      icon: <LogOut className="w-5 h-5" />,
      text: `${t("Logout")}`,
      link: `/`,
      action: () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        navigate(`/${lang}/login`);
      },
    },
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
        className={`fixed md:static top-0 right-0 h-full p-[34px] md:h-auto w-[250px] bg-white shadow-lg md:shadow-none rounded-none md:rounded-xl text-right z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
      >
        {/* التحية الديناميكية */}
        <h2 className={`text-xl font-semibold mb-6 text-gray-800 ${lang === "ar" ? "text-right" : "text-left"}`}>
          {isLoading ? (
            <span className="text-gray-500">جاري التحميل...</span>
          ) : (
            <>
              {greeting}، <span className="text-[#2AA0DC]">{userName}</span>
            </>
          )}
        </h2>

        <ul className="flex flex-col gap-4 items-start">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={`${item.link}`}
                onClick={() => {
                  if (item.action) item.action();
                  setOpen(false); 
                }}
                className="flex items-center justify-end gap-3 text-gray-700 hover:text-[#2AA0DC] cursor-pointer transition-all"
              >
                {item.icon}
                <span className="text-[15px]">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}