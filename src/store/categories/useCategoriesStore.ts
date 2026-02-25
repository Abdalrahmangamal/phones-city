import { create } from "zustand";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  slug?: string;
  image?: string | null;
  parent_id?: number | null;
  created_at?: string;
  children?: Category[];
}

interface CategoriesState {
  categories: Category[];
  treadmark: Category[];
  Categoriesbyid: Category[];
  Catesubgategory: Category[];
  loading: boolean;
  error: string | null;
  fetchCategoriesbyid: (id: string, productsmain?: string, lang?: string) => Promise<void>;
  fetchCatesubgategory: (id: string, lang?: string) => Promise<void>;
  fetchCategories: (lang: string) => Promise<void>;
  fetchtradmarks: (lang?: string) => Promise<void>;
}
const baseUrl = import.meta.env.VITE_BASE_URL;
const CATEGORIES_CACHE_TTL_MS = 60_000;
const categoriesCache = new Map<string, { data: Category[]; fetchedAt: number }>();
const categoriesInFlight = new Map<string, Promise<void>>();

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  loading: false,
  error: null,
  Categoriesbyid: [],
  treadmark: [],
  Catesubgategory: [],
  fetchCategories: async (lang) => {
    const normalizedLang = (lang || "ar").trim() || "ar";
    const cached = categoriesCache.get(normalizedLang);
    if (cached && Date.now() - cached.fetchedAt < CATEGORIES_CACHE_TTL_MS) {
      set({ categories: cached.data, loading: false, error: null });
      return;
    }

    const pending = categoriesInFlight.get(normalizedLang);
    if (pending) {
      return pending;
    }

    set({ loading: true, error: null });
    const token = localStorage.getItem("token");

    const request = (async () => {
      try {
        const res = await axios.get(`${baseUrl}api/v1/categories`, {
          headers: {
            "Accept-Language": normalizedLang,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const nextCategories = Array.isArray(res.data?.data) ? res.data.data : [];
        categoriesCache.set(normalizedLang, {
          data: nextCategories,
          fetchedAt: Date.now(),
        });

        set({ categories: nextCategories, loading: false, error: null });
      } catch {
        set({
          error: "Failed to fetch categories",
          loading: false,
        });
      } finally {
        categoriesInFlight.delete(normalizedLang);
      }
    })();

    categoriesInFlight.set(normalizedLang, request);
    return request;
  },
  fetchCategoriesbyid: async (id: string, productsmain?: string, lang?: string) => {
    set({ loading: true, error: null });
    const token = localStorage.getItem("token");
    const normalizedLang = (lang || "ar").trim() || "ar";
    const endpoint = `${baseUrl}api/v1/categories/${id}${productsmain ? "/" + productsmain : ""}`;
    const headers = {
      "Accept-Language": normalizedLang,
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      const res = await axios.get(endpoint, { headers });

      let allProducts = Array.isArray(res?.data?.data?.products) ? res.data.data.products : [];
      const pagination = res?.data?.pagination;
      const lastPage = Number(pagination?.last_page || 1);

      // `/categories/{slug}/products` is paginated by the backend (default 15).
      // Trademarks page applies client-side filters/pagination, so we need the full list.
      if (productsmain === "products" && lastPage > 1) {
        const nextPages = await Promise.all(
          Array.from({ length: lastPage - 1 }, (_, index) =>
            axios.get(endpoint, {
              params: { page: index + 2 },
              headers,
            })
          )
        );

        for (const pageRes of nextPages) {
          const pageProducts = Array.isArray(pageRes?.data?.data?.products)
            ? pageRes.data.data.products
            : [];
          allProducts = allProducts.concat(pageProducts);
        }
      }

      set({
        // singleCategory: res.data.data,  // تخزن object هنا
        Categoriesbyid: allProducts, // تخزن array للمنتجات هنا
        loading: false,
      });
    } catch {
      set({
        error: "Failed to fetch categories",
        loading: false,
      });
    }
  },
  fetchCatesubgategory: async (id: string, lang?: string) => {
    set({ loading: true, error: null });
    const normalizedLang = (lang || "ar").trim() || "ar";

    try {
      const res = await axios.get(`${baseUrl}api/v1/categories/${id}`, {
        headers: {
          "Accept-Language": normalizedLang,
          Accept: "application/json",
        },
      });

      set({
        // singleCategory: res.data.data,  // تخزن object هنا
        Catesubgategory: res.data.data.category.children, // تخزن array للمنتجات هنا
        loading: false,
      });
    } catch {
      set({
        error: "Failed to fetch categories",
        loading: false,
      });
    }
  },
  fetchtradmarks: async (lang?: string) => {
    set({ loading: true, error: null });
    const normalizedLang = (lang || "ar").trim() || "ar";

    try {
      const res = await axios.get(`${baseUrl}api/v1/categories/trademarks`, {
        headers: {
          "Accept-Language": normalizedLang,
          Accept: "application/json",
        },
      });

      set({
        // singleCategory: res.data.data,  // تخزن object هنا
        treadmark: res.data.data, // تخزن array للمنتجات هنا
        loading: false,
      });
    } catch {
      set({
        error: "Failed to fetch categories",
        loading: false,
      });
    }
  },
}));
