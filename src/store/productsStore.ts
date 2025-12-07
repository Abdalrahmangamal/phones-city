import { create } from "zustand";
import axios from "axios";
import type { Product } from "@/types/index";

interface productsParams {
  simple?: boolean;
  has_offer?: number;
  per_page?: number;
  page?: number;
  category_id?: number;
  search?: string;
  max_price?: number;
  min_price?: number;
  sort_order?: string;
}

interface PageState {
  loading: boolean;
  error: string | null;

  response: Product | Product[] | null; // الداتا الراجعة فعليًا - يمكن أن تكون مفردة أو مصفوفة
  fetchProducts: (params?: productsParams, lang?: string) => Promise<void>;
  fetchProductbyid: (id: string, params?: productsParams) => Promise<void>;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProductsStore = create<PageState>((set) => ({
  loading: false,
  error: null,
  response: null,

  fetchProducts: async (params: productsParams = {}, lang?: string) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");

      const res = await axios.get(`${baseUrl}api/v1/products`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": `${lang || "ar"}`,
          Accept: "application/json",
        },
      });

      console.log("ZUSTAND RESPONSE:", res.data.data); // <<< هنا هتشوفها 100%

      set({
        response: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },
  fetchProductbyid: async (id: string, params: productsParams = {}) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get(`${baseUrl}api/v1/products/${id}`, {
        params,
      });

      console.log("ZUSTAND RESPONSE:", res.data.data); // <<< هنا هتشوفها 100%

      set({
        response: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },
}));
