// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { ar: { translation: ar }, en: { translation: en } },
    fallbackLng: "ar",
    supportedLngs: ["ar", "en"],
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      // The URL (/ar or /en) should win on refresh/navigation.
      order: ["path", "localStorage", "htmlTag", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },
  });

export default i18n;
