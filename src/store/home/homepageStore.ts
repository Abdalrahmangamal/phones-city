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
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

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
    const { data, loading } = get();

    // 🔒 منع ضرب API أكتر من مرة
    if (data || loading) return;

    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("token");

      const res = await axios.get<HomePageResponse>(
        `${baseUrl}api/v1/home-page`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Accept-Language": `${lang}`,
            Accept: "application/json",
          },
        }
      );

      set({
        data: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          "Failed to fetch home page data",
        loading: false,
      });
    }
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
