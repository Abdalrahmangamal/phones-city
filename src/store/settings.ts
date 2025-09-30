// src/store/settings.ts
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

type Lang = "ar" | "en";
type Currency = "EGP" | "USD" | "SAR";

type SettingsState = {
  lang: Lang;
  dir: "rtl" | "ltr";
  currency: Currency;
  setLang: (lang: Lang) => void;
  setCurrency: (c: Currency) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    subscribeWithSelector((set, get) => ({
      lang: "ar",
      dir: "rtl",
      currency: "EGP",

      setLang: (lang) =>
        set({
          lang,
          dir: lang === "ar" ? "rtl" : "ltr",
        }),

      setCurrency: (currency) => set({ currency }),
    })),
    {
      name: "app-settings-v1", // localStorage key
      version: 1,
    }
  )
);
