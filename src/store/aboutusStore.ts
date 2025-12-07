import { create } from "zustand";
import axios from "axios";

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface AboutData {
  id: number;
  about_website: string;
  about_us: string;
  image: string | null;
  address: string;
  maps: string;
  email: string;
  phone: string;
  social_links: SocialLink[];
}

interface AboutState {
  loading: boolean;
  error: string | null;
  data: AboutData | null;

  fetchAbout: (lang:string) => Promise<void>;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAboutStore = create<AboutState>((set) => ({
  loading: false,
  error: null,
  data: null,

  fetchAbout: async (lang) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get(`${baseUrl}api/v1/about`, {
        headers: {
          Accept: "application/json",
         "Accept-Language": `${lang}`,

        },
      });

      set({
        data: res.data.data,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to fetch about data",
        loading: false,
      });
    }
  },
}));
