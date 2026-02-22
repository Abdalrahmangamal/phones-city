import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

interface Offer {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
  name: string | null;
  value: string;
  type: 'amount' | 'percentage';
  image: string;
  first_related: any | null;
  products: any[];
  categories: any[];
  created_at: string;
}

interface LatestOffersState {
  offers: Offer[];
  loading: boolean;
  error: string | null;
  fetchOffers: (lang: string) => Promise<void>;
}

const baseUrl = import.meta.env.VITE_BASE_URL.replace(/\/$/, "");
const LATEST_OFFERS_CACHE_TTL_MS = 60_000;
const latestOffersCache = new Map<string, { data: Offer[]; fetchedAt: number }>();
const latestOffersInFlight = new Map<string, Promise<void>>();

export const useLatestOffersStore = create<LatestOffersState>()(
  devtools(
    (set) => ({
      offers: [],
      loading: false,
      error: null,

      fetchOffers: async (lang: string) => {
        const normalizedLang = lang === "ar" ? "ar" : "en";
        const cached = latestOffersCache.get(normalizedLang);
        if (cached && Date.now() - cached.fetchedAt < LATEST_OFFERS_CACHE_TTL_MS) {
          set({ offers: cached.data, loading: false, error: null });
          return;
        }

        const pending = latestOffersInFlight.get(normalizedLang);
        if (pending) {
          return pending;
        }

        set({ loading: true, error: null });
        const request = (async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/v1/offers/home', {
              baseURL: baseUrl,
              headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
                'Accept': 'application/json',
                'Accept-Language': normalizedLang,
                'Content-Type': 'application/json',
              },
              params: {
                limit: 6,
                simple: true,
              },
            });

            if (response.data.status && response.data.data) {
              const limitedOffers = response.data.data.slice(0, 6);
              const offersWithFullImageUrls = limitedOffers.map((offer: Offer) => ({
                ...offer,
                image: offer.image
                  ? (offer.image.startsWith('http')
                    ? offer.image
                    : `${baseUrl}/storage/${offer.image}`)
                  : '',
              }));

              latestOffersCache.set(normalizedLang, {
                data: offersWithFullImageUrls,
                fetchedAt: Date.now(),
              });

              set({ offers: offersWithFullImageUrls, loading: false, error: null });
            } else {
              set({ error: 'Failed to fetch offers: ' + response.data.message, loading: false });
            }
          } catch (error: any) {
            console.error('Error fetching offers');
            set({
              error: error.response?.data?.message || error.message || 'Network error',
              loading: false,
            });
          } finally {
            latestOffersInFlight.delete(normalizedLang);
          }
        })();

        latestOffersInFlight.set(normalizedLang, request);
        return request;
      },
    }),
    { name: 'LatestOffersStore' }
  )
);
