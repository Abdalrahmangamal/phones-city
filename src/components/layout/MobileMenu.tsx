"use client";
import { ChevronDown, X, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";
import React, { useEffect } from "react";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";

import { getCategoryIcon } from "@/utils/categoryIcons";

export default function MobileMenu({
  isOpen,
  onClose,
  openSections,
  setOpenSections,
}: {
  isOpen: boolean;
  onClose: () => void;
  openSections: boolean;
  setOpenSections: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [openCategory, setOpenCategory] = React.useState<string | null>(null);
  const { lang } = useLangSync();
  const { i18n, t } = useTranslation();
  const [open] = React.useState(false);
  const categories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);


  useEffect(() => {
    if (isOpen && lang) {
      fetchCategories(lang);
    }
  }, [isOpen, lang, fetchCategories]);

  const navitem = [
    { link: `/${lang}/`, name: `${t("Home")}` },
    { link: `/${lang}/about`, name: `${t("About")}` },
    { link: `/${lang}/offers`, name: `${t("Offers")}` },
    { link: `/${lang}/servces`, name: `${t("Servces")}` },
    { link: `/${lang}/Contact`, name: `${t("Contactus")}` },
    { link: `/${lang}/profile`, name: `${t("Profile")}` },
    { link: `/${lang}/favourite`, name: `${t("favourite")}` },
    { link: `/${lang}/notifications`, name: `${t("Notifications")}` },
  ];

  const handleCategoryClick = (categoryId: string, _categorySlug: string, hasChildren: boolean, e: React.MouseEvent) => {
    if (hasChildren) {
      // إذا كان للقسم أقسام فرعية، نفتح/نغلق القائمة الفرعية فقط
      e.preventDefault();
      e.stopPropagation();
      setOpenCategory(openCategory === categoryId ? null : categoryId);
    } else {
      // إذا لم يكن له أقسام فرعية، ننقل المستخدم مباشرة
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* الخلفية الداكنة */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* القائمة */}
      <div
        className={`fixed right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col overflow-hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex-none flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-black text-xl font-bold">{t("CityPhones")}</h2>
          <button onClick={onClose} className="p-2 rounded-full bg-gray-100" aria-label={lang === "ar" ? "إغلاق القائمة" : "Close menu"}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* محتوى القائمة القابل للتمرير */}
        <div className="flex-1 overflow-y-auto">
          {/* الأقسام - 🔥 افتحها تلقائياً إذا كان openSections = true */}
          <div className="px-4 py-3 border-b border-gray-200">
            <button
              onClick={() => setOpenSections(!openSections)}
              className="flex items-center justify-between w-full px-3 py-2 font-semibold text-black hover:bg-gray-100 rounded-lg"
            >
              <span>{t("Sections")}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections ? "rotate-180" : ""}`} />
            </button>

            {openSections && (
              <div className="mt-2 space-y-1">
                {categories.length === 0 ? (
                  <div className="px-3 py-2 text-gray-500 text-center">
                    {t("Loading categories...")}
                  </div>
                ) : (
                  categories.map((cat: any) => {
                    const hasChildren = cat.children && cat.children.length > 0;

                    return (
                      <div key={cat.id}>
                        {/* رابط القسم الرئيسي */}
                        <Link
                          to={hasChildren ? "#" : `/${lang}/categorySingle/${cat.slug}/products`}
                          onClick={(e) => handleCategoryClick(cat.id.toString(), cat.slug, hasChildren, e)}
                          className="flex items-center justify-between w-full px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">
                              {getCategoryIcon(cat.name, cat.slug)}
                            </span>
                            <span>{cat.name}</span>
                          </div>
                          {hasChildren && (
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${openCategory === cat.id.toString() ? "rotate-180" : ""
                                }`}
                            />
                          )}
                        </Link>

                        {/* الأقسام الفرعية */}
                        {openCategory === cat.id.toString() && hasChildren && (
                          <ul className="mr-6 mt-1 border-r-2 border-[#F3AC5D] pr-2 space-y-1">
                            {/* رابط للقسم الرئيسي نفسه (عرض جميع المنتجات) */}
                            <li>
                              <Link
                                to={`/${lang}/categorySingle/${cat.slug}/products`}
                                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg font-semibold"
                                onClick={onClose}
                              >
                                {t("View all")} {cat.name}
                              </Link>
                            </li>

                            {/* الأقسام الفرعية */}
                            {cat.children.map((sub: any) => (
                              <li key={sub.id}>
                                <Link
                                  to={`/${lang}/categorySingle/${sub.slug}/products`}
                                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                  onClick={onClose}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-500 scale-90">
                                      {getCategoryIcon(sub.name, sub.slug)}
                                    </span>
                                    {sub.name}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-3">
            <nav className="space-y-2">
              {navitem.map((link) => (
                <Link
                  key={link.link}
                  to={link.link}
                  className="block px-4 py-2 text-black hover:bg-gray-100 rounded-lg"
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              ))}

              <div className="relative inline-block text-left mt-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-sm font-medium shadow-sm transition-all duration-200 cursor-pointer">
                      <Globe className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">{lang === "ar" ? "عربي" : "English"}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-200 text-gray-500 ${open ? "rotate-180" : ""}`}
                      >
                        <path d="M8 10L4 6h8L8 10z" fill="currentColor" />
                      </svg>
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={6}
                    className="z-[9999] rounded-lg border border-gray-200 bg-white shadow-lg min-w-[120px] overflow-hidden"
                  >
                    <DropdownMenuItem
                      onClick={() => i18n.changeLanguage("ar")}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {t("Arabic")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => i18n.changeLanguage("en")}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {t("English")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
