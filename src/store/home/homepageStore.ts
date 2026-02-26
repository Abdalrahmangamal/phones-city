// store/home/homePage.types.ts
 interface HomePageData {
  id: number;

  offer_text: string;
  offer_text_en: string;
  offer_text_ar: string;
  offer_images: string[];

  app_title: string;
  app_title_en: string;
  app_title_ar: string;

  app_description: string;
  app_description_en: string;
  app_description_ar: string;

  app_main_image: string | null;
  app_images: string[];

  main_images: string[];

  created_at: string;
  updated_at: string;
}

 interface HomePageResponse {
  status: boolean;
  message: string;
  data: HomePageData;
}

// store/home/homePageStore.ts
import { create } from "zustand";
import axiosClient from "@/api/axiosClient";

const HOME_PAGE_CACHE_TTL_MS = 300_000;
const homePageCache = new Map<string, { data: HomePageData; fetchedAt: number }>();
const homePageInFlight = new Map<string, Promise<void>>();

interface HomePageStore {
  data: HomePageData | null;
  loading: boolean;
  error: string | null;

  fetchHomePage: (lang:string) => Promise<void>;

  // helpers للترجمة
  getOfferText: (lang: string) => string;
  getAppTitle: (lang: string) => string;
  getAppDescription: (lang: string) => string;
}

export const useHomePageStore = create<HomePageStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchHomePage: async (lang:string) => {
    const normalizedLang = (lang || "ar").trim() || "ar";
    const cached = homePageCache.get(normalizedLang);
    if (cached && Date.now() - cached.fetchedAt < HOME_PAGE_CACHE_TTL_MS) {
      set({ data: cached.data, loading: false, error: null });
      return;
    }

    const pending = homePageInFlight.get(normalizedLang);
    if (pending) {
      return pending;
    }

    const request = (async () => {
      try {
        set({ loading: true, error: null });

        const token = localStorage.getItem("token");

        const res = await axiosClient.get<HomePageResponse>(
          `api/v1/home-page`,
          {
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
              "Accept-Language": normalizedLang,
              Accept: "application/json",
            },
          }
        );

        if (res.data?.data) {
          homePageCache.set(normalizedLang, {
            data: res.data.data,
            fetchedAt: Date.now(),
          });
        }

        set({
          data: res.data.data,
          loading: false,
          error: null,
        });
      } catch (err: any) {
        set({
          error:
            err?.response?.data?.message ||
            "Failed to fetch home page data",
          loading: false,
        });
      } finally {
        homePageInFlight.delete(normalizedLang);
      }
    })();

    homePageInFlight.set(normalizedLang, request);
    return request;
  },

  // ================= Helpers =================
  getOfferText: (lang: string) => {
    const data = get().data;
    if (!data) return "";

    return lang.startsWith("en")
      ? data.offer_text_en
      : data.offer_text_ar;
  },

  getAppTitle: (lang: string) => {
    const data = get().data;
    if (!data) return "";

    return lang.startsWith("en")
      ? data.app_title_en
      : data.app_title_ar;
  },

  getAppDescription: (lang: string) => {
    const data = get().data;
    if (!data) return "";

    return lang.startsWith("en")
      ? data.app_description_en
      : data.app_description_ar;
  },
}));
