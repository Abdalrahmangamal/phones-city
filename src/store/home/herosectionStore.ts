import { create } from 'zustand';
import axios from 'axios';

interface SliderItem {
  id: number;
  title: string;
  title_en: string;
  title_ar: string;
  description: string;
  description_en: string;
  description_ar: string;
  image: string;
  created_at: string;
  updated_at: string;
  link?: string;
}

interface FormattedSlide {
  title: string;
  description: string;
  bg: string;
  link: string;
}

interface HeroSectionStore {
  sliders: FormattedSlide[];
  loading: boolean;
  error: string | null;
  fetchSliders: (lang: string) => Promise<void>;
  clearError: () => void;
}

export const useHeroSectionStore = create<HeroSectionStore>((set) => ({
  sliders: [],
  loading: false,
  error: null,

  fetchSliders: async (lang: string) => {
    try {
      set({ loading: true, error: null });
      
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const url = new URL('/api/v1/sliders', baseUrl);
      const token = localStorage.getItem("token");
      
      const response = await axios.get(url.toString(), {
        headers: token ? {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        } : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });
      
      if (response.data.status) {
        const formattedSliders: FormattedSlide[] = response.data.data.map((slider: SliderItem) => ({
          title: lang === 'ar' ? slider.title_ar : slider.title_en,
          description: lang === 'ar' ? slider.description_ar : slider.description_en,
          bg: slider.image,
          link: slider.link || '/products'
        }));
        
        set({ 
          sliders: formattedSliders, 
          loading: false,
          error: null 
        });
      } else {
        set({ 
          error: response.data.message || 'Failed to fetch sliders', 
          loading: false 
        });
      }
    } catch (error: any) {
      let errorMessage = 'Unknown error occurred';
      
      if (error.response) {
        const { status, data } = error.response;
        errorMessage = `Server error ${status}: ${data?.message || 'No message'}`;
        
        if (status === 404) {
          errorMessage = 'API endpoint not found (404). Please check the URL.';
        }
      } else if (error.request) {
        errorMessage = 'Network error: No response from server. Check your internet connection.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Server is taking too long to respond.';
      } else {
        errorMessage = error.message || 'Request setup error';
      }
      
      set({ 
        error: errorMessage, 
        loading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
}));