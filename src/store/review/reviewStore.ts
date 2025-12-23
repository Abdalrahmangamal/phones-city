import { create } from 'zustand';
import axiosClient from '@/api/axiosClient';
import { toast } from 'react-toastify';

export interface Review {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  product_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

interface ReviewStore {
  reviews: Review[];
  loading: boolean;
  submitting: boolean;
  canReview: boolean | null;

  // تغيير توقيع الدوال
  fetchReviews: (params?: { 
    product_id: string | number; 
    sort_by?: string; 
    sort_order?: string 
  }) => Promise<void>;
  createReview: (data: { product_id: string | number; rating: number; comment: string }) => Promise<boolean>;
  checkCanReview: (productId: string | number) => Promise<void>;
  clearReviews: () => void;
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  reviews: [],
  loading: false,
  submitting: false,
  canReview: null,

  clearReviews: () => set({ reviews: [], canReview: null }),

  fetchReviews: async (params) => {
    if (!params?.product_id) return;
    
    set({ loading: true });
    try {
      const response = await axiosClient.get('/api/v1/reviews', {
        params: {
          product_id: params.product_id,
          sort_by: params.sort_by || 'created_at',
          sort_order: params.sort_order || 'desc'
        },
      });

      let reviews: Review[] = [];

      if (Array.isArray(response.data)) {
        reviews = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        reviews = response.data.data;
      }

      const normalized = reviews.map((item: any): Review => ({
        id: item.id?.toString() || Date.now().toString(),
        user_id: item.user?.id || item.user_id || 'anonymous',
        user_name: item.user?.name || item.user_name || 'مستخدم مجهول',
        user_avatar: item.user?.avatar || item.user_avatar,
        product_id: item.product_id?.toString() || params.product_id.toString(),
        rating: Number(item.rating) || 0,
        comment: item.comment || '',
        created_at: item.created_at || new Date().toISOString(),
        updated_at: item.updated_at || item.created_at || new Date().toISOString(),
      }));

      set({ reviews: normalized });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      set({ reviews: [] });
    } finally {
      set({ loading: false });
    }
  },

  checkCanReview: async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ canReview: false });
      return;
    }

    try {
      const response = await axiosClient.get(`/api/v1/products/${productId}/can-review`);
      set({ canReview: !!response.data?.can_review });
    } catch (error: any) {
      set({ canReview: false });
    }
  },

  createReview: async ({ product_id, rating, comment }) => {
    set({ submitting: true });
    try {
      const response = await axiosClient.post('/api/v1/reviews', {
        product_id: Number(product_id),
        rating,
        comment: comment.trim(),
      });

      if (response.data?.status === true || response.data?.data) {
        await get().fetchReviews({ product_id });
        set({ canReview: false });
        toast.success('تم إضافة مراجعتك بنجاح! شكرًا لتقييمك 🌟');
        return true;
      }
      return false;
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('يرجى تسجيل الدخول أولاً');
      } else if (error.response?.status === 403) {
        toast.error('لا يمكنك تقييم هذا المنتج لأنك لم تشتريه');
      } else if (error.response?.status === 409) {
        toast.error('لقد قيّمت هذا المنتج من قبل');
      } else {
        toast.error(error.response?.data?.message || 'فشل في إرسال المراجعة');
      }
      // نعيد التحقق في حالة تغيير الحالة
      get().checkCanReview(product_id);
      return false;
    } finally {
      set({ submitting: false });
    }
  },
}));