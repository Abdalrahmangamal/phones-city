
import { create } from "zustand";
import axiosClient from "@/api/axiosClient";

interface PageData {
  id: number;
  slug: string;
  title: string;
  banner: string | null;
  lang: string;
  short_description: string | null;
  description: string;
}

interface PageState {
  pages: Record<string, PageData>;
  loading: Record<string, boolean>;
  error: string | null;

  fetchPage: (slug: string, lang: string) => Promise<void>;
  getPage: (slug: string, lang: string) => PageData | null;
  isLoading: (slug: string, lang: string) => boolean;
}



export const usePageStore = create<PageState>((set, get) => ({
  pages: {},
  loading: {},
  error: null,

  fetchPage: async (slug: string, lang: string) => {
    const key = `${slug}-${lang}`;

    // إذا كانت الصفحة محملة بالفعل أو قيد التحميل، لا تعيد جلبها
    if (get().pages[key] || get().loading[key]) return;

    try {
      set((state) => ({
        loading: { ...state.loading, [key]: true },
        error: null,
      }));

      // Log token status for debugging
      const token = localStorage.getItem("token");
      console.log(`📄 Page Request (${slug}) - Token:`, token ? "✅ Token found" : "❌ No token (guest user)");

      const res = await axiosClient.get(`api/v1/pages/${slug}`, {
        headers: {
          "Accept-Language": `${lang}`,
        },
      });

      set((state) => ({
        pages: { ...state.pages, [key]: res.data.data },
        loading: { ...state.loading, [key]: false },
      }));
    } catch (err: any) {
      set((state) => ({
        error: err?.response?.data?.message || "Something went wrong",
        loading: { ...state.loading, [key]: false },
      }));
    }
  },

  getPage: (slug: string, lang: string) => {
    const key = `${slug}-${lang}`;
    return get().pages[key] || null;
  },

  isLoading: (slug: string, lang: string) => {
    const key = `${slug}-${lang}`;
    return get().loading[key] || false;
  },
}));
