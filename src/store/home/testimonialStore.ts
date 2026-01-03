import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Testimonial {
  id: number;
  name: string;
  name_en: string;
  name_ar: string;
  description: string;
  description_en: string;
  description_ar: string;
  image: string;
  rate: number;
  created_at: string;
  updated_at: string;
}

interface TestimonialState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  hasData: boolean; 
  fetchTestimonials: () => Promise<void>;
  getLocalizedName: (testimonial: Testimonial, lang: string) => string;
  getLocalizedDescription: (testimonial: Testimonial, lang: string) => string;
  clearTestimonials: () => void;
}

export const useTestimonialStore = create<TestimonialState>()(
  devtools(
    (set) => ({
      testimonials: [],
      loading: false,
      error: null,
      hasData: false, 

      fetchTestimonials: async () => {
  set({ loading: true, error: null });
  
  try {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    
    const url = new URL('/api/v1/customer-opinions', baseUrl);
    console.log('📡 Fetching from:', url.toString());
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: headers,
    });

    console.log('📥 Response status:', response.status);
    
    if (!response.ok) {
      let errorDetails = '';
      try {
        const errorData = await response.json();
        errorDetails = errorData.message || JSON.stringify(errorData);
      } catch {
        errorDetails = await response.text();
      }
      
      throw new Error(`HTTP ${response.status}: ${errorDetails}`);
    }

    const data = await response.json();
    
    if (data.status === true && Array.isArray(data.data)) {
      console.log('✅ Loaded testimonials:', data.data.length);
      set({ 
        testimonials: data.data, 
        error: null,
        loading: false 
      });
    } else {
      throw new Error(`Invalid API response format`);
    }
    
  } catch (err) {
    console.error('❌ Error in fetchTestimonials:', err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
    
    set({ 
      error: errorMessage, 
      loading: false,
      testimonials: []
    });
  }
},

      getLocalizedName: (testimonial: Testimonial, lang: string) => {
        if (lang === "ar" && testimonial.name_ar) {
          return testimonial.name_ar;
        }
        return testimonial.name_en || testimonial.name;
      },

      getLocalizedDescription: (testimonial: Testimonial, lang: string) => {
        if (lang === "ar" && testimonial.description_ar) {
          return testimonial.description_ar;
        }
        return testimonial.description_en || testimonial.description;
      },

      clearTestimonials: () => {
        set({ testimonials: [], error: null });
      },
    }),
    {
      name: 'testimonial-store',
    }
  )
);