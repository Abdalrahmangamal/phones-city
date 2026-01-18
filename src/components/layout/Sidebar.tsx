"use client";
import { useState, useEffect } from "react";
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
  Bell,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

// أضفنا الـ store الخاص بالبروفايل
import { useProfileStore } from "@/store/profile/profileStore";
// أضفنا الـ store الخاص بالإشعارات
import { useNotifications } from "@/store/notifications/notificationStore";

export default function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { lang } = useLangSync();

  // جلب بيانات المستخدم من الـ store
  const { profile, fetchProfile, isLoading } = useProfileStore();

  // جلب بيانات الإشعارات
  const { unreadCount, fetchNotifications } = useNotifications();

  // Fetch البروفايل لما الكومبوننت يتحمل (لو مش موجود أصلاً)
  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
    // جلب الإشعارات عند تحميل المكون
    fetchNotifications();
  }, [profile, fetchProfile, fetchNotifications]);

  // استخراج الاسم (حسب الـ API اللي عندك)
  const userName = profile?.name || profile?.firstName || "المستخدم";

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
      icon: <Bell className="w-5 h-5" />,
      text: `${t("Notifications")}`,
      link: `/${lang}/notifications`,
      badge: unreadCount > 0 ? unreadCount : null,
    },
    // {
    //   icon: <Gift className="w-5 h-5" />,
    //   text: `${t("Discounts")}`,
    //   link: `/${lang}/discounts`,
    // },
    {
      icon: <Wallet className="w-5 h-5" />,
      text: `${t("wallet")}`,
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
        <span className="text-[17px] font-medium">{t("Menu")}</span>
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
        className={`fixed md:static top-0 right-0 h-full p-4 md:p-4 md:h-auto w-[250px] bg-white shadow-lg md:shadow-none rounded-none md:rounded-xl text-right z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
      >
        {/* التحية الديناميكية */}
        <h2 className={`text-lg font-semibold mb-4 text-gray-800 ${lang === "ar" ? "text-right" : "text-left"}`}>
          {isLoading ? (
            <span className="text-gray-500">{t("Loading")}...</span>
          ) : (
            <>
              {greeting}، <span className="text-[#2AA0DC]">{userName}</span>
            </>
          )}
        </h2>

        {/* القائمة - مسافات أقل بين العناصر */}
        <ul className="flex flex-col gap-1 items-start">
          {menuItems.map((item, idx) => (
            <li key={idx} className="w-full">
              <NavLink
                to={item.link}
                onClick={(e) => {
                  if (item.action) {
                    e.preventDefault();
                    item.action();
                  }
                  setOpen(false);
                }}
                className={({ isActive }) => 
                  `flex items-center justify-between w-full text-gray-700 hover:text-[#2AA0DC] cursor-pointer transition-all p-2 rounded-md hover:bg-gray-50
                  ${isActive ? "bg-blue-50 text-[#2AA0DC] border-r-4 border-[#2AA0DC]" : ""}`
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[14px] font-medium">{item.text}</span>
                </div>
                
                {/* Badge للإشعارات غير المقروءة */}
                {item.badge !== null && item.badge !== undefined && (
                  <Badge 
                    variant="destructive" 
                    className="h-5 min-w-5 rounded-full p-0 flex items-center justify-center text-[10px] font-bold bg-red-500"
                  >
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* إحصائيات سريعة - مسافة أقل */}
        {/* <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-xs font-medium text-gray-500 mb-2">
            {t("QuickStats")}
          </h3>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">{t("UnreadNotifications")}</span>
              <Badge 
                variant={unreadCount > 0 ? "destructive" : "outline"} 
                className="h-4 px-1.5 text-[10px]"
              >
                {unreadCount}
              </Badge>
            </div>
          </div>
        </div> */}
      </aside>
    </div>
  );
}