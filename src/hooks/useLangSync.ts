// src/hooks/useLangSync.ts
import { useEffect } from "react";
import i18n from "@/i18n";
import { useSettings } from "@/store/settings";

/**
 * يضمن إن i18n و Zustand متزامنين دايمًا
 * ويرجع لك lang و setLang عشان تقدر تستخدمهم
 */
export function useLangSync() {
  const { lang, setLang } = useSettings();

  // لما تتغير لغة i18n من حتة تانية
  useEffect(() => {
    const handler = (lng: string) => setLang((lng as "ar" | "en") ?? "ar");

    i18n.on("languageChanged", handler);

    return () => {
      i18n.off("languageChanged", handler);
    };
  }, [setLang]);

  // أول تحميل: خلي i18n على لغة Zustand
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  // ✅ رجع lang و setLang عشان تقدر تستخدمهم في أي كومبوننت
  return { lang, setLang };
}
