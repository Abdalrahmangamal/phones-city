// src/hooks/useLangSync.ts
import { useEffect } from "react";
import i18n from "@/i18n";
import { useSettings } from "@/store/settings";

const normalizeLang = (lng?: string): "ar" | "en" => {
  return typeof lng === "string" && lng.toLowerCase().startsWith("en") ? "en" : "ar";
};

/**
 * يضمن إن i18n و Zustand متزامنين دايمًا
 * ويرجع لك lang و setLang عشان تقدر تستخدمهم
 */
export function useLangSync() {
  const { lang, setLang } = useSettings();

  // لما تتغير لغة i18n من حتة تانية
  useEffect(() => {
    const handler = (lng: string) => {
      const nextLang = normalizeLang(lng);
      if (nextLang !== lang) {
        setLang(nextLang);
      }
    };

    i18n.on("languageChanged", handler);

    return () => {
      i18n.off("languageChanged", handler);
    };
  }, [lang, setLang]);

  // أول تحميل: خلي i18n على لغة Zustand
  useEffect(() => {
    const normalizedI18nLang = normalizeLang(i18n.language);
    if (normalizedI18nLang !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  // ✅ رجع lang و setLang عشان تقدر تستخدمهم في أي كومبوننت
  return { lang, setLang };
}
