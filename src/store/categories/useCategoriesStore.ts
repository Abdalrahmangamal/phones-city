import { create } from "zustand";
import axios from "axios";
interface Category {
  id: number;
  name: string;
  image?: string | null;
  parent_id?: number | null;
  created_at?: string;
  children?: Category[];
}

interface CategoriesState {
  categories: Category[];
  Categoriesbyid: Category[];
  loading: boolean;
  error: string | null;
  fetchCategoriesbyid: (id: string) => Promise<void>;
  fetchCategories: (lang: string) => Promise<void>;
}
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  loading: false,
  error: null,
  Categoriesbyid: [],
  fetchCategories: async (lang) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${baseUrl}api/v1/categories`, {
        headers: {
          "Accept-Language": `${lang}`,
        },
      });
      set({ categories: res.data.data, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch categories",
        loading: false,
      });
    }
  },
  fetchCategoriesbyid: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${baseUrl}api/v1/categories/${id}`);

      set({
        // singleCategory: res.data.data,  // تخزن object هنا
        Categoriesbyid: res.data.data.products, // تخزن array للمنتجات هنا
        loading: false,
      });
    } catch (err) {
      set({
        error: "Failed to fetch categories",
        loading: false,
      });
    }
  },
}));
