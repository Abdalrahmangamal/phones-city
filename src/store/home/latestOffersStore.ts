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

export const useLatestOffersStore = create<LatestOffersState>()(
  devtools(
    (set) => ({
      offers: [],
      loading: false,
      error: null,

      fetchOffers: async (lang: string) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('/api/v1/offers/home', {
            baseURL: baseUrl,
            headers: {
              ...(token && { Authorization: `Bearer ${token}` }),
              'Accept': 'application/json',
              'Accept-Language': lang === 'ar' ? 'ar' : 'en',
              'Content-Type': 'application/json',
            },
            params: {
              limit: 6,
              simple: true,
            },
          });




          if (response.data.status && response.data.data) {
            const limitedOffers = response.data.data.slice(0, 6);
            // تأكد من أن الصور تحتوي على رابط كامل
            const offersWithFullImageUrls = limitedOffers.map((offer: Offer) => ({
              ...offer,
              // إذا كانت الصورة رابطًا نسبيًا، أضف الـ base URL
              image: offer.image
                ? (offer.image.startsWith('http')
                  ? offer.image
                  : `${baseUrl}/storage/${offer.image}`)
                : '',
            }));

            set({ offers: offersWithFullImageUrls, loading: false });
          } else {
            set({ error: 'Failed to fetch offers: ' + response.data.message, loading: false });
          }
        } catch (error: any) {
          console.error('Error fetching offers:', error);
          set({
            error: error.response?.data?.message || error.message || 'Network error',
            loading: false,
          });
        }
      },
    }),
    { name: 'LatestOffersStore' }
  )
);