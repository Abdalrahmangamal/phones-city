// store/profile/discountsStore.ts (Enhanced version)
import { create } from 'zustand';
import axiosClient from '@/api/axiosClient';

// تعريف Discount هنا بدلاً من استيراده من ملف منفصل
export interface Discount {
  id: number;
  code: string;
  discount_value?: string; // e.g., "5%"
  discount?: string; // Alternative field name
  title?: string;
  description?: string;
  valid_from?: string; // ISO date string
  valid_to?: string; // ISO date string
  applicable_products?: string;
  conditions?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface DiscountResponse {
  status: boolean;
  message: string;
  data: Discount[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
  };
}

interface DiscountStore {
  discounts: Discount[];
  loading: boolean;
  error: string | null;
  copiedId: number | null;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  } | null;
  
  // Actions
  fetchDiscounts: (page?: number) => Promise<void>;
  setCopiedId: (id: number | null) => void;
  clearError: () => void;
  clearDiscounts: () => void;
  getDiscountByCode: (code: string) => Discount | undefined;
  isValidDiscount: (code: string) => boolean;
}

export const useDiscountStore = create<DiscountStore>((set, get) => ({
  discounts: [],
  loading: false,
  error: null,
  copiedId: null,
  pagination: null,

  fetchDiscounts: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get<DiscountResponse>('/api/v1/discounts', {
        params: { page }
      });
      console.log('✅ استجابة API:', response.data);
      console.log('📊 حالة الاستجابة:', response.data.status);
    console.log('📦 البيانات:', response.data.data);
    console.log('🔢 عدد العناصر:', response.data.data?.length || 0);
    console.log('📄 معلومات الصفحة:', response.data.pagination);

    
      const data = response.data;
      
      if (data.status && data.data) {
        set({ 
          discounts: data.data, 
          pagination: data.pagination,
          error: null 
        });
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch discounts');
      }
    }
     catch (error: any) {
      let errorMessage = 'حدث خطأ في جلب الخصومات';
      
      if (error.response) {
        errorMessage = error.response.data?.message || `خطأ ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'تعذر الاتصال بالخادم';
      }
      
      set({ 
        error: errorMessage,
        discounts: [],
        pagination: null
      });
      console.error('Error fetching discounts:', error);
      return [];
    } finally {
      set({ loading: false });
    }
  },

  setCopiedId: (id) => set({ copiedId: id }),

  clearError: () => set({ error: null }),

  clearDiscounts: () => set({ discounts: [], pagination: null }),

  getDiscountByCode: (code) => {
    const { discounts } = get();
    return discounts.find(discount => discount.code === code);
  },

  isValidDiscount: (code) => {
    const discount = get().getDiscountByCode(code);
    if (!discount) return false;
    
    // Check if discount is active
    if (discount.is_active === false) return false;
    
    // Check validity dates if they exist
    if (discount.valid_from && discount.valid_to) {
      const now = new Date();
      const validFrom = new Date(discount.valid_from);
      const validTo = new Date(discount.valid_to);
      return now >= validFrom && now <= validTo;
    }
    
    return true;
  },
}));