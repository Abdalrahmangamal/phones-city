import { create } from "zustand";
import axios from "axios";
import type { Product } from "@/types/index";

// تحديث الـ interface لإضافة المعلمات المفقودة
interface productsParams {
  simple?: boolean;
  has_offer?: number;
  per_page?: number;
  page?: number;
  category_id?: number;
  search?: string;
  max_price?: number;
  min_price?: number;
  sort_by?: string; 
  sort_order?: string;
  best_seller?: boolean; 
  new?: number;
}

interface PageState {
  loading: boolean;
  error: string | null;
  response: Product | Product[] | null;
  fetchProducts: (params?: productsParams, lang?: string) => Promise<void>;
  fetchProductbyid: (id: string, lang: string, params?: productsParams) => Promise<void>;
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

      console.log("Fetching products with params:", params);
      console.log("Full URL:", `${baseUrl}api/v1/products`);
      
      // تنظيف المعلمات - إزالة القيم undefined
      const cleanedParams: Record<string, any> = {};
      Object.keys(params).forEach(key => {
        if (params[key as keyof productsParams] !== undefined) {
          cleanedParams[key] = params[key as keyof productsParams];
        }
      });

      console.log("Cleaned params:", cleanedParams);
      
      const res = await axios.get(`${baseUrl}api/v1/products`, {
        params: cleanedParams,
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": `${lang || "ar"}`,
          Accept: "application/json",
        },
      });

      console.log("Full API Response:", res.data);
      console.log("Products data:", res.data.data);
      console.log("Total products in response:", Array.isArray(res.data.data) ? res.data.data.length : 0);

      set({
        response: res.data.data,
        loading: false,
      });
      
      // إرجاع البيانات لاستخدامها في Home.tsx
      return res.data.data;
    } catch (err: any) {
      console.error("API Error:", err.response || err);
      set({
        error: err?.response?.data?.message || "Something went wrong",
        loading: false,
      });
      throw err;
    }
  },

  fetchProductbyid: async (id: string, lang: string, params: productsParams = {}) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get(`${baseUrl}api/v1/products/${id}`, {
        params,
        headers: {
          "Accept-Language": `${lang}`,
        },
      });

      console.log("ZUSTAND RESPONSE:", res.data.data);

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