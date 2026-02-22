import { create } from "zustand";
import axios from "axios";

interface BannerData {
    image: string;
    slug: string;
    title?: string;
    title_ar?: string;
    title_en?: string;
    name?: string;     // Added potential field
    name_ar?: string;  // Added potential field
    name_en?: string;  // Added potential field
}

interface BannerState {
    bannerData: BannerData | null;
    bannerImage: string | null; // Keep for backward compatibility if needed, but we prefer bannerData
    loading: boolean;
    error: string | null;
    fetchBanner: (slug: string) => Promise<void>;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useBannerStore = create<BannerState>((set) => ({
    bannerData: null,
    bannerImage: null,
    loading: false,
    error: null,

    fetchBanner: async (slug: string) => {
        try {
            set({ loading: true, error: null });

            // Try fetching from banners endpoint with slug
            const res = await axios.get(`${baseUrl}api/v1/banners`, {
                params: { slug: slug }
            });

            if (res.data && res.data.data) {
                // Check if data is array or object. API might return array of 1 or just object.
                set({
                    bannerData: data,
                    bannerImage: data.image,
                    loading: false
                });
            } else {
                set({ error: "Banner not found", loading: false });
            }

        } catch (err: any) {
            set({
                error: err?.response?.data?.message || "Failed to fetch banner",
                loading: false,
            });
        }
    },
}));
