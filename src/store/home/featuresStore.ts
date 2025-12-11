// store/home/featuresStore.ts
import { create } from 'zustand';
import axios from 'axios'; 

interface FeaturesState {
  features: StoreFeature[];
  loading: boolean;
  error: string | null;
  fetchFeatures: () => Promise<void>;
  getFeatureById: (id: number) => StoreFeature | undefined;
  getFeaturesByLanguage: (lang: 'ar' | 'en') => Array<{
    id: number;
    title: string;
    description: string;
    image: string;
  }>;
}

export interface StoreFeature {
  id: number;
  name: string;
  name_en: string;
  name_ar: string;
  description: string;
  description_en: string;
  description_ar: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: StoreFeature[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

const useFeaturesStore = create<FeaturesState>((set, get) => ({
  features: [],
  loading: false,
  error: null,

  fetchFeatures: async () => {
    set({ loading: true, error: null });
    
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const token = localStorage.getItem("token");
      
      if (!baseUrl) {
        throw new Error('VITE_BASE_URL is not defined');
      }
      
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
      });
      
      const response = await axiosInstance.get<ApiResponse>('/api/v1/store-features');
      
      if (response.data.status && response.data.data) {
        set({ 
          features: response.data.data,
          loading: false 
        });
      } else {
        set({ 
          error: response.data.message || 'Failed to fetch features',
          loading: false 
        });
      }
    } catch (error: any) {
      set({ 
        error: error.message || 'Network error occurred',
        loading: false 
      });
    }
  },

  getFeatureById: (id: number) => {
    const { features } = get();
    return features.find(feature => feature.id === id);
  },

  getFeaturesByLanguage: (lang: 'ar' | 'en' = 'ar') => {
    const { features } = get();
    
    return features.map(feature => ({
      id: feature.id,
      title: lang === 'ar' ? feature.name_ar : feature.name_en,
      description: lang === 'ar' ? feature.description_ar : feature.description_en,
      image: feature.image
    }));
  }
}));

export default useFeaturesStore;