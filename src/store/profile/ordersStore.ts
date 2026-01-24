import { create } from 'zustand';
import axiosClient from '@/api/axiosClient';
import { persist } from 'zustand/middleware';

export interface OrderItem {
  id: number;
  product: {
    id: number;
    slug: string;
    name: string;
    name_en: string;
    name_ar: string;
    main_image: string | null;
  };
  product_option: {
    id: number;
    type: string;
    value: string;
    value_en: string;
    value_ar: string;
  } | null;
  price: number;
  quantity: number;
  total: number;
}

export interface Invoice {
  id: number;
  invoice_number: string;
  invoice_date: string;
  invoice_pdf_path: string | null;
  type: string;
  type_label: string;
  notes: string | null;
  order_number: string | null;
  order_id: number;
  total_amount: number | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  notes: string;
  location: {
    id: number;
    first_name: string;
    last_name: string;
    country: string;
    city_id: number;
    city: {
      id: number;
      slug: string;
      name: string;
      name_en: string;
      name_ar: string;
      shipping_fee: string;
    };
    street_address: string;
    phone: string;
    email: string;
    label: string;
    created_at: string;
  };
  payment_method: {
    id: number;
    name: string;
    name_en: string;
    name_ar: string;
    description: string;
    description_en: string;
    description_ar: string;
    image: string;
    status: string;
    processing_fee_percentage: number;
  };
  delivery_method: string;
  subtotal: number;
  discount: number;
  discount_code: string | null;
  shipping: number;
  tax: number;
  payment_method_amount: number;
  points_discount: number;
  total: number;
  status: string;
  payment_status: string; // حالة الدفع
  items: OrderItem[];
  invoice: Invoice;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface OrdersResponse {
  status: boolean;
  message: string;
  data: Order[];
  pagination: Pagination;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  pagination: Pagination | null;

  // Actions
  fetchOrders: () => Promise<void>;
  fetchOrdersByStatus: (status: string) => Promise<void>;
  getOrderById: (orderId: number) => Order | undefined;
  getOrdersByStatus: (status: string) => Order[];
  cancelOrder: (orderId: number) => Promise<void>;
  setOrders: (orders: Order[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearOrders: () => void;
}

const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      loading: false,
      error: null,
      pagination: null,

      fetchOrders: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.get<OrdersResponse>('/api/v1/orders');
          if (response.data.status) {
            set({
              orders: response.data.data,
              pagination: response.data.pagination,
              loading: false
            });
          } else {
            set({ error: response.data.message, loading: false });
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'فشل في جلب الطلبات',
            loading: false
          });
        }
      },

      fetchOrdersByStatus: async (status: string) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.get<OrdersResponse>('/api/v1/orders', {
            params: { status }
          });
          if (response.data.status) {
            set({
              orders: response.data.data,
              pagination: response.data.pagination,
              loading: false
            });
          } else {
            set({ error: response.data.message, loading: false });
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'فشل في جلب الطلبات',
            loading: false
          });
        }
      },

      getOrderById: (orderId: number) => {
        const { orders } = get();
        return orders.find(order => order.id === orderId);
      },

      getOrdersByStatus: (status: string) => {
        const { orders } = get();
        if (status === 'total') return orders;
        return orders.filter(order => order.status === status);
      },

      cancelOrder: async (orderId: number) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.put(`/api/v1/orders/${orderId}/cancel`);
          if (response.data.status) {
            // تحديث حالة الطلب محلياً
            set(state => ({
              orders: state.orders.map(order =>
                order.id === orderId ? { ...order, status: 'cancelled' } : order
              ),
              loading: false
            }));
          } else {
            set({ error: response.data.message, loading: false });
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'فشل في إلغاء الطلب',
            loading: false
          });
        }
      },

      setOrders: (orders: Order[]) => set({ orders }),
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      clearOrders: () => set({ orders: [], pagination: null, error: null }),
    }),
    {
      name: 'orders-storage',
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);

export default useOrdersStore;