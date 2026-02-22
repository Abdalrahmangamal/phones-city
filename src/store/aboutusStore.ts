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
const ABOUT_CACHE_TTL_MS = 60_000;
const aboutCache = new Map<string, { data: AboutData; fetchedAt: number }>();
const aboutInFlight = new Map<string, Promise<void>>();

export const useAboutStore = create<AboutState>((set) => ({
  loading: false,
  error: null,
  data: null,

  fetchAbout: async (lang) => {
    const normalizedLang = (lang || "ar").trim() || "ar";
    const cached = aboutCache.get(normalizedLang);
    if (cached && Date.now() - cached.fetchedAt < ABOUT_CACHE_TTL_MS) {
      set({ data: cached.data, loading: false, error: null });
      return;
    }

    const pending = aboutInFlight.get(normalizedLang);
    if (pending) {
      return pending;
    }

    const request = (async () => {
      try {
        set({ loading: true, error: null });

        const res = await axios.get(`${baseUrl}api/v1/about`, {
          headers: {
            Accept: "application/json",
            "Accept-Language": normalizedLang,
          },
        });

        const nextData = res.data?.data ?? null;
        if (nextData) {
          aboutCache.set(normalizedLang, { data: nextData, fetchedAt: Date.now() });
        }

        set({
          data: nextData,
          loading: false,
          error: null,
        });
      } catch (err: any) {
        set({
          error: err?.response?.data?.message || "Failed to fetch about data",
          loading: false,
        });
      } finally {
        aboutInFlight.delete(normalizedLang);
      }
    })();

    aboutInFlight.set(normalizedLang, request);
    return request;
  },
}));
