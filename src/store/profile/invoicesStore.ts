// store/profile/invoicesStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosClient from '@/api/axiosClient';

export interface InvoiceItem {
  id: number;
  product: {
    id: number;
    slug: string;
    name: string;
    name_en: string;
    name_ar: string;
    main_image: string;
    images: Array<{
      id: number;
      url: string;
      sort_order: number;
    }>;
  };
  product_option: {
    id: number;
    type: string;
    value: string;
    value_en: string;
    value_ar: string;
    images: Array<{
      id: number;
      url: string;
      sort_order: number;
    }>;
  } | null;
  price: number;
  quantity: number;
  total: number;
}

export interface OrderLocation {
  id: number;
  first_name: string;
  last_name: string;
  country: string;
  city_id: number;
  street_address: string;
  phone: string;
  email: string;
  label: string;
  created_at: string;
}

export interface OrderPaymentMethod {
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
}

export interface Order {
  id: number;
  order_number: string;
  notes: string | null;
  location: OrderLocation;
  payment_method: OrderPaymentMethod;
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
  items: InvoiceItem[];
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: number;
  invoice_number: string;
  invoice_date: string;
  invoice_pdf_path: string | null;
  type: string;
  type_label: string;
  notes: string | null;
  order_number: string;
  order_id: number;
  total_amount: number;
  order: Order;
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

export interface InvoicesResponse {
  status: boolean;
  message: string;
  data: Invoice[];
  pagination: Pagination;
}

export interface SingleInvoiceResponse {
  status: boolean;
  message: string;
  data: Invoice;
}

interface InvoicesStore {
  invoices: Invoice[];
  currentInvoice: Invoice | null;
  loading: boolean;
  singleLoading: boolean;
  error: string | null;
  singleError: string | null;
  pagination: Pagination | null;
  fetchInvoices: (page?: number) => Promise<void>;
  fetchInvoiceById: (id: number) => Promise<void>;
  getInvoiceById: (id: number) => Invoice | undefined;
  clearCurrentInvoice: () => void;
  clearInvoices: () => void;
}

const useInvoicesStore = create<InvoicesStore>()(
  persist(
    (set, get) => ({
      invoices: [],
      currentInvoice: null,
      loading: false,
      singleLoading: false,
      error: null,
      singleError: null,
      pagination: null,

      fetchInvoices: async (page = 1) => {
        set({ loading: true, error: null });
        
        try {
          const response = await axiosClient.get<InvoicesResponse>('/api/v1/invoices', {
            params: { page }
          });
          
          const { data, pagination } = response.data;
          
          set({
            invoices: data,
            pagination,
            loading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            loading: false,
            error: error.response?.data?.message || 'حدث خطأ أثناء جلب الفواتير',
          });
          throw error;
        }
      },

      fetchInvoiceById: async (id: number) => {
        set({ singleLoading: true, singleError: null });
        
        try {
          const response = await axiosClient.get<SingleInvoiceResponse>(`/api/v1/invoices/${id}`);
          
          set({
            currentInvoice: response.data.data,
            singleLoading: false,
            singleError: null,
          });
        } catch (error: any) {
          set({
            singleLoading: false,
            singleError: error.response?.data?.message || 'حدث خطأ أثناء جلب تفاصيل الفاتورة',
          });
          throw error;
        }
      },

      getInvoiceById: (id: number) => {
        const { invoices } = get();
        return invoices.find(invoice => invoice.id === id);
      },

      clearCurrentInvoice: () => {
        set({
          currentInvoice: null,
          singleError: null,
        });
      },

      clearInvoices: () => {
        set({
          invoices: [],
          currentInvoice: null,
          pagination: null,
          error: null,
          singleError: null,
          loading: false,
          singleLoading: false,
        });
      },
    }),
    {
      name: 'invoices-storage',
      partialize: (state) => ({
        invoices: state.invoices,
        currentInvoice: state.currentInvoice,
        pagination: state.pagination,
      }),
    }
  )
);

export default useInvoicesStore;