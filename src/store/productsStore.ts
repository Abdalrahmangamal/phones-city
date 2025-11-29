import { create } from "zustand";
import axios from "axios";

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

// شكل الداتا الراجعة من الـ API
interface Product {
  id: number;
  name: string;
  main_image: string | null;
  original_price: string;
  final_price: string;
  stock_status: "in_stock" | "out_of_stock";
  options: any[];
}

interface PageState {
  loading: boolean;
  error: string | null;

  response: Product[] | null;   // الداتا الراجعة فعليًا
  fetchProducts: (params?: productsParams) => Promise<void>;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProductsStore = create<PageState>((set) => ({
  loading: false,
  error: null,
  response: null,

fetchProducts: async (params: productsParams = {}) => {
  try {
    set({ loading: true, error: null });

    const res = await axios.get(`${baseUrl}api/v1/products`, { params });

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
