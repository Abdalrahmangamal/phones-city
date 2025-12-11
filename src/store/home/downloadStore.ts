// store/home/downloadStore.ts
import { create } from 'zustand';

const baseUrl = import.meta.env.VITE_BASE_URL;

interface AppDownloadData {
    app_title_ar: string;
    app_title_en: string;
    app_description_ar: string;
    app_description_en: string;
    app_main_image: string;
}

interface DownloadStore {
    data: AppDownloadData | null;
    loading: boolean;
    error: string | null;
    fetchDownloadData: () => Promise<void>;
    
    // دعم اللغات
    getTranslatedTitle: (lang: string) => string;
    getTranslatedDescription: (lang: string) => string;
}

export const useDownloadStore = create<DownloadStore>((set, get) => ({
    data: null,
    loading: false,
    error: null,

    fetchDownloadData: async () => {
        set({ loading: true, error: null });
        try {
            const url = new URL('/api/v1/home-page', baseUrl);
            const token = localStorage.getItem("token");
            
            const response = await fetch(url.toString(), {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch download section data: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.status && result.data) {
                set({ data: result.data, loading: false });
            } else {
                throw new Error('Invalid data format from server');
            }
        } catch (error) {
            console.error('Error fetching download data:', error);
            set({ 
                error: (error as Error).message, 
                loading: false 
            });
        }
    },

    // دالة للحصول على العنوان المترجم
    getTranslatedTitle: (lang: string) => {
        const { data } = get();
        if (!data) return "قم بتحميل تطبيقنا واحصل علي خصم 10% وتسوق افضل";
        
        return lang === 'en' ? data.app_title_en : data.app_title_ar;
    },

    // دالة للحصول على الوصف المترجم
    getTranslatedDescription: (lang: string) => {
        const { data } = get();
        if (!data) return "«اطلب ما تريد في أي وقت ومن أي مكان، واستلمه في أسرع وقت»";
        
        return lang === 'en' ? data.app_description_en : data.app_description_ar;
    },
}));