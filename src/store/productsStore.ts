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

const PRODUCTS_SECTION_CACHE_TTL_MS = 60_000;
const offersSectionCache = new Map<string, { data: Product[]; meta: any; fetchedAt: number }>();
const offersSectionInFlight = new Map<string, Promise<any>>();
const bestSellerCache = new Map<string, { data: Product[]; fetchedAt: number }>();
const bestSellerInFlight = new Map<string, Promise<void>>();
const newArrivalsCache = new Map<string, { data: Product[]; fetchedAt: number }>();
const newArrivalsInFlight = new Map<string, Promise<void>>();

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
    const langKey = lang || "ar";
    const cacheKey = `${langKey}:${page}`;
    const cached = offersSectionCache.get(cacheKey);
    if (cached && Date.now() - cached.fetchedAt < PRODUCTS_SECTION_CACHE_TTL_MS) {
      set({
        offersProducts: cached.data,
        offersMeta: cached.meta,
        offersLoading: false,
        error: null,
      });
      return { data: cached.data, meta: cached.meta };
    }

    const pending = offersSectionInFlight.get(cacheKey);
    if (pending) {
      return pending;
    }

    set({ offersLoading: true });

    const request = (async () => {
      try {
        const res = await axiosClient.get(`api/v1/products`, {
          params: { has_offer: 1, per_page: 15, page, simple: true },
          headers: { "Accept-Language": langKey },
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

        const nextOffers = Array.isArray(res.data.data) ? res.data.data : [];
        offersSectionCache.set(cacheKey, {
          data: nextOffers,
          meta: normalizedMeta,
          fetchedAt: Date.now(),
        });

        set({
          offersProducts: nextOffers,
          offersMeta: normalizedMeta,
          offersLoading: false,
          error: null,
        });

        return res.data;
      } catch (err: any) {
        set({
          error: err?.response?.data?.message,
          offersLoading: false,
        });
        throw err;
      } finally {
        offersSectionInFlight.delete(cacheKey);
      }
    })();

    offersSectionInFlight.set(cacheKey, request);
    return request;
  },

  fetchBestSellers: async (lang: string) => {
    const langKey = lang || "ar";
    const cached = bestSellerCache.get(langKey);
    if (cached && Date.now() - cached.fetchedAt < PRODUCTS_SECTION_CACHE_TTL_MS) {
      set({
        bestSellerProducts: cached.data,
        bestSellersLoading: false,
        error: null,
      });
      return;
    }

    const pending = bestSellerInFlight.get(langKey);
    if (pending) {
      return pending;
    }

    set({ bestSellersLoading: true });

    const request = (async () => {
      try {
        const res = await axiosClient.get(`api/v1/products`, {
          params: { best_seller: true, per_page: 10, simple: true },
          headers: { "Accept-Language": langKey },
        });

        const nextBest = Array.isArray(res.data.data) ? res.data.data : [];
        bestSellerCache.set(langKey, { data: nextBest, fetchedAt: Date.now() });

        set({
          bestSellerProducts: nextBest,
          bestSellersLoading: false,
          error: null,
        });
      } catch (err: any) {
        set({
          error: err?.response?.data?.message,
          bestSellersLoading: false,
        });
      } finally {
        bestSellerInFlight.delete(langKey);
      }
    })();

    bestSellerInFlight.set(langKey, request);
    return request;
  },

  fetchNewArrivals: async (lang: string) => {
    const langKey = lang || "ar";
    const cached = newArrivalsCache.get(langKey);
    if (cached && Date.now() - cached.fetchedAt < PRODUCTS_SECTION_CACHE_TTL_MS) {
      set({
        newArrivalsProducts: cached.data,
        newArrivalsLoading: false,
        error: null,
      });
      return;
    }

    const pending = newArrivalsInFlight.get(langKey);
    if (pending) {
      return pending;
    }

    set({ newArrivalsLoading: true });

    const request = (async () => {
      try {
        const res = await axiosClient.get(`api/v1/products/new-arrivals`, {
          params: { simple: true },
          headers: { "Accept-Language": langKey },
        });

        const nextNewArrivals = Array.isArray(res.data.data) ? res.data.data : [];
        newArrivalsCache.set(langKey, { data: nextNewArrivals, fetchedAt: Date.now() });

        set({
          newArrivalsProducts: nextNewArrivals,
          newArrivalsLoading: false,
          error: null,
        });
      } catch (err: any) {
        set({
          error: err?.response?.data?.message,
          newArrivalsLoading: false,
        });
      } finally {
        newArrivalsInFlight.delete(langKey);
      }
    })();

    newArrivalsInFlight.set(langKey, request);
    return request;
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
