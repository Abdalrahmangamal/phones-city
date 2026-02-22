import { create } from "zustand";
import axiosClient from "@/api/axiosClient";
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
  newArrivalsProducts?: Product[];
  // Separate loading states for each section
  offersLoading: boolean;
  bestSellersLoading: boolean;
  newArrivalsLoading: boolean;
  offersMeta?: any;
  fetchBestSellers: (lang: string) => Promise<void>;
  fetchOffers: (lang: string, page?: number) => Promise<void>;
  fetchNewArrivals: (lang: string) => Promise<void>;
  fetchProducts: (params?: productsParams, lang?: string) => Promise<void>;
  fetchProductbyid: (id: string, lang: string, params?: productsParams) => Promise<void>;
}

export const useProductsStore = create<PageState>((set) => ({
  loading: false,
  error: null,
  response: null,
  offersLoading: false,
  bestSellersLoading: false,
  newArrivalsLoading: false,

  fetchProducts: async (params: productsParams = {}, lang?: string) => {
    try {
      set({ loading: true, error: null });

      const cleanedParams: Record<string, unknown> = {};
      Object.keys(params).forEach(key => {
        if (params[key as keyof productsParams] !== undefined && params[key as keyof productsParams] !== null) {
          cleanedParams[key] = params[key as keyof productsParams];
        }
      });

      const res = await axiosClient.get(`api/v1/products`, {
        params: cleanedParams,
        headers: {
          "Accept-Language": `${lang || "ar"}`,
          Accept: "application/json",
        },
      });

      set({
        response: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      set({
        error: error?.response?.data?.message || "Something went wrong",
        loading: false,
      });
      throw err;
    }
  },
  offersMeta: null,

  fetchOffers: async (lang: string, page: number = 1) => {
    try {
      set({ offersLoading: true });

      const res = await axiosClient.get(`api/v1/products`, {
        params: { has_offer: 1, per_page: 15, page, simple: true },
        headers: { "Accept-Language": lang },
      });

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
        const len = Array.isArray(res.data.data) ? res.data.data.length : 0;
        normalizedMeta = {
          current_page: page,
          last_page: len < 15 ? page : page,
          total: undefined,
          per_page: 15,
        };
      }

      set({
        offersProducts: res.data.data,
        offersMeta: normalizedMeta,
        offersLoading: false,
      });

      return res.data;
    } catch (err: any) {
      set({
        error: err?.response?.data?.message,
        offersLoading: false,
      });
      throw err;
    }
  },

  fetchBestSellers: async (lang: string) => {
    try {
      set({ bestSellersLoading: true });

      const res = await axiosClient.get(`api/v1/products`, {
        params: { best_seller: true, per_page: 10, simple: true },
        headers: { "Accept-Language": lang },
      });

      set({
        bestSellerProducts: res.data.data,
        bestSellersLoading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message,
        bestSellersLoading: false,
      });
    }
  },

  fetchNewArrivals: async (lang: string) => {
    try {
      set({ newArrivalsLoading: true });

      const res = await axiosClient.get(`api/v1/products/new-arrivals`, {
        params: { simple: true },
        headers: { "Accept-Language": lang },
      });

      set({
        newArrivalsProducts: res.data.data,
        newArrivalsLoading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message,
        newArrivalsLoading: false,
      });
    }
  },

  fetchProductbyid: async (id: string, lang: string, params: productsParams = {}) => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("token");

      const res = await axiosClient.get(`api/v1/products/${id}`, {
        params,
        headers: {
          "Accept-Language": `${lang}`,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

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