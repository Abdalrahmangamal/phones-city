import i18n from "@/i18n";
import { useSettings } from "@/store/settings";

export type AppLang = "ar" | "en";

export const normalizeAppLang = (value?: string): AppLang => {
  return typeof value === "string" && value.toLowerCase().startsWith("en") ? "en" : "ar";
};

export const buildLocalizedPath = (pathname: string, nextLang: AppLang) => {
  if (/^\/(ar|en)(?=\/|$)/.test(pathname)) {
    return pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${nextLang}`);
  }

  return `/${nextLang}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
};

export const applyLanguageImmediately = (nextLang: AppLang) => {
  const currentLang = normalizeAppLang(i18n.language);

  useSettings.getState().setLang(nextLang);

  document.documentElement.setAttribute("lang", nextLang);
  document.documentElement.setAttribute("dir", nextLang === "ar" ? "rtl" : "ltr");

  if (currentLang !== nextLang) {
    void i18n.changeLanguage(nextLang);
  }
};

