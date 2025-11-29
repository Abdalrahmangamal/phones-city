  "use client";
  import { ChevronDown, Monitor, Smartphone, Tablet, Camera, X, Globe } from "lucide-react";
  import { Link } from "react-router-dom";
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
  import { useTranslation } from "react-i18next";
  import { useLangSync } from "@/hooks/useLangSync";
  import { Button } from "../ui/button";
  import React from "react";

  type SubCategory = { name: string };
  type Category = { id: string; name: string; icon: React.ReactNode; subCategories?: SubCategory[] };

  const categories: Category[] = [
    { id: "laptops", name: "لابتوب", icon: <Monitor className="w-5 h-5 text-gray-700" /> },
    {
      id: "phones",
      name: "الهواتف الذكيه",
      icon: <Smartphone className="w-5 h-5 text-gray-700" />,
      subCategories: [{ name: "أجهزة أبل" }, { name: "أجهزة سامسونج" }, { name: "أجهزة هونر" }, { name: "أجهزة شاومي" }],
    },
    { id: "tablets", name: "الأجهزة اللوحية", icon: <Tablet className="w-5 h-5 text-gray-700" /> },
    { id: "electronics", name: "الأجهزة الإلكترونية الصغيرة", icon: <Camera className="w-5 h-5 text-gray-700" /> },
  ];

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

    const navitem = [
      { link: `/${lang}/`, name: `${t("Home")}` },
      { link: `/${lang}/about`, name: `${t("About")}` },
      { link: `/${lang}/offers`, name: `${t("Offers")}` },
      { link: `/${lang}/servces`, name: `${t("Servces")}` },
      { link: `/${lang}/Contact`, name: `${t("Contactus")}` },
      { link: `/${lang}/profile`, name: `${t("Profile")}` },
      { link: `/${lang}/favourite`, name: `${t("favourite")}` },
    ];

    return (
      <div className={`fixed inset-0 z-50 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* الخلفية الداكنة */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />

        {/* القائمة */}
        <div
          className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h2 className="text-black text-xl font-bold">مدينة الهواتف</h2>
            <button onClick={onClose} className="p-2 rounded-full bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* الأقسام */}
          <div className="px-4 py-3 border-b border-gray-200">
            <button
              onClick={() => setOpenSections(!openSections)}
              className="flex items-center justify-between w-full px-3 py-2 font-semibold text-black hover:bg-gray-100 rounded-lg"
            >
              <span>الأقسام</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openSections ? "rotate-180" : ""}`} />
            </button>

            {openSections && (
              <div className="mt-2 space-y-1">
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <button
                      onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
                      className="flex items-center justify-between w-full px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {cat.icon}
                        <span>{cat.name}</span>
                      </div>
                      {cat.subCategories && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openCategory === cat.id ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {openCategory === cat.id && cat.subCategories && (
                      <ul className="mr-6 mt-1 border-r-2 border-[#F3AC5D] pr-2 space-y-1">
                        {cat.subCategories.map((sub, i) => (
                          <li key={i}>
                            <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                              {sub.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-3">
            <nav className="space-y-2">
              {navitem.map((link) => (
                <Link key={link.link} to={link.link} className="block px-4 py-2 text-black hover:bg-gray-100 rounded-lg">
                  {link.name}
                </Link>
              ))}

              <div className="relative inline-block text-left">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-sm font-medium shadow-sm transition-all duration-200">
                      <Globe className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-700">عربي</span>
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
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    className="z-[9999] rounded-lg border border-gray-200 bg-white shadow-lg min-w-[120px] overflow-hidden"
                  >
                    <DropdownMenuItem
                      onClick={() => i18n.changeLanguage("ar")}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      العربية
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => i18n.changeLanguage("en")}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      English
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
