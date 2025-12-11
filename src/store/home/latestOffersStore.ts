import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

interface Offer {
  id: number;
  name_ar: string;
  name_en: string;
  value: string;
  type: 'amount' | 'percentage';
  image: string | null;
  first_related: any | null;
  products: any[];
  categories: any[];
}

interface LatestOffersState {
  offers: Offer[];
  loading: boolean;
  error: string | null;
  fetchOffers: () => Promise<void>;
}

const baseUrl = import.meta.env.VITE_BASE_URL.replace(/\/$/, "");

export const useLatestOffersStore = create<LatestOffersState>()(
  devtools(
    (set) => ({
      offers: [],
      loading: false,
      error: null,

      fetchOffers: async () => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('/api/v1/offers/home', {
            baseURL: baseUrl,
            headers: {
              ...(token && { Authorization: `Bearer ${token}` }),
              'Accept': 'application/json',
            },
            params: {
              limit: 6, 
            },
          });

          if (response.data.status) {
            
            const limitedOffers = response.data.data.slice(0, 6);
            set({ offers: limitedOffers, loading: false });
          } else {
            set({ error: 'Failed to fetch offers', loading: false });
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Network error',
            loading: false,
          });
        }
      },
    }),
    { name: 'LatestOffersStore' }
  )
);