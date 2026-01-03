// store/home/installmentStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface InstallmentData {
  // البيانات الأساسية
  offer_text: string;
  offer_text_en: string;
  offer_text_ar: string;
  // الروابط
  coara_link: string;
  mora_link: string;
}

interface InstallmentStore {
  installmentData: InstallmentData | null;
  loading: boolean;
  error: string | null;
  fetchInstallmentData: () => Promise<void>;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useInstallmentStore = create<InstallmentStore>()(
  persist(
    (set) => ({
      installmentData: null,
      loading: false,
      error: null,

      fetchInstallmentData: async () => {
        set({ loading: true, error: null });
        
        try {
          const token = localStorage.getItem("token");
          const url = new URL('/api/v1/home-page', baseUrl);
          
          const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          
          if (data.status && data.data) {
            const installmentData: InstallmentData = {
              offer_text: data.data.offer_text || "عرض خاص!",
              offer_text_en: data.data.offer_text_en || "Special Offer!",
              offer_text_ar: data.data.offer_text_ar || "عرض خاص!",
              coara_link: "/about-quara", 
              mora_link: "/about-mora",   
            };
            
            set({ 
              installmentData, 
              loading: false 
            });
            console.log('✅ Data fetched successfully:', installmentData);
          } else {
            throw new Error(data.message || 'No data received');
          }
        } catch (error) {
          console.error('❌ Error fetching installment data:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            loading: false 
          });
        }
      },
    }),
    {
      name: 'installment-store',
      partialize: (state) => ({ 
        installmentData: state.installmentData 
      }),
    }
  )
);