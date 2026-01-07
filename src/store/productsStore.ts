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
  bestSellerProducts?: Product[];
  offersProducts?: Product[];
  offersMeta?: any; // pagination metadata from backend (current_page, last_page, total...)
  fetchBestSellers: (lang: string) => Promise<void>;
  fetchOffers: (lang: string, page?: number) => Promise<void>;
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
        if (params[key as keyof productsParams] !== undefined && params[key as keyof productsParams] !== null) {
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
  offersMeta: null,

  fetchOffers: async (lang: string, page: number = 1) => {
    try {
      set({ loading: true });

      const res = await axios.get(`${baseUrl}api/v1/products`, {
        params: { has_offer: 1, per_page: 15, page },
        headers: { "Accept-Language": lang },
      });

      // Debug: log the response so we can inspect where pagination meta lives
      console.log("fetchOffers response:", res.data);

      // Normalize pagination meta from common shapes (meta, pagination, pager...)
      const rawMeta = res.data.meta || res.data.pagination || res.data.pager || null;
      let normalizedMeta: any = null;

      if (rawMeta) {
        normalizedMeta = {
          current_page: rawMeta.current_page || rawMeta.page || page,
          last_page:
            rawMeta.last_page || rawMeta.total_pages || (rawMeta.total && rawMeta.per_page ? Math.ceil(rawMeta.total / rawMeta.per_page) : undefined) || 1,
          total: rawMeta.total || rawMeta.total_items || undefined,
          per_page: rawMeta.per_page || rawMeta.limit || 15,
        };
      } else {
        // If backend didn't return meta, infer simple meta from data length
        const len = Array.isArray(res.data.data) ? res.data.data.length : 0;
        normalizedMeta = {
          current_page: page,
          last_page: len < 15 ? page : page, // can't infer further; will allow Next to be clicked to verify
          total: undefined,
          per_page: 15,
        };
      }

      set({
        offersProducts: res.data.data,
        offersMeta: normalizedMeta,
        loading: false,
      });

      // return the response for callers that want to inspect meta
      return res.data;
    } catch (err: any) {
      set({
        error: err?.response?.data?.message,
        loading: false,
      });
      throw err;
    }
  },

  fetchBestSellers: async (lang: string) => {
    try {
      set({ loading: true });

      const res = await axios.get(`${baseUrl}api/v1/products`, {
        params: { best_seller: true, per_page: 10 },
        headers: { "Accept-Language": lang },
      });

      set({
        bestSellerProducts: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message,
        loading: false,
      });
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