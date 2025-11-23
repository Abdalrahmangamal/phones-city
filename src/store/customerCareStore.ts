import { create } from "zustand";
import axios from "axios";

interface PageData {
  id: number;
  slug: string;
  title: string;
  banner: string | null;
  lang:string;
  short_description: string | null;
  description: string; // HTML
}

interface PageState {
  page: PageData | null;
  loading: boolean;
  error: string | null;

  fetchPage: (slug: string,lang:string) => Promise<void>;
}
const baseUrl = import.meta.env.VITE_BASE_URL;

export const usePageStore = create<PageState>((set) => ({
    page: null,
    loading: false,
    error: null,
    
    fetchPage: async (slug: string,lang:string) => {
        try {
      set({ loading: true, error: null });
console.log(lang)
      const res = await axios.get(`${baseUrl}api/v1/pages/${slug}`, {
        headers: {
          "Accept-Language": `${lang}`},
      });

      set({
        page: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },
}));
