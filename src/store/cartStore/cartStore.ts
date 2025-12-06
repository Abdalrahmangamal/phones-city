import { create } from "zustand";
import axios from "axios";

interface CartProduct {
  id: number;
  name: string;
  description: string;
  details: string;
  about: string;
  product_mark: string;
  capacity: string;
  points: number;
  is_new: boolean;
  original_price: string;
  final_price: string;
  discount_amount: string;
  quantity: number;
  stock_status: string;
}

interface CartCategory {
  id: number;
  name: string;
  image: string | null;
  parent_id: number | null;
  created_at: string;
}

interface CartItem {
  id: number;
  product: CartProduct;
  category: CartCategory;
}

interface CartState {
  loading: boolean;
  error: string | null;
  total: number;
  items: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  deleteToCart: (productId: number) => Promise<void>;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useCartStore = create<CartState>((set, get) => ({
  loading: false,
  error: null,
  items: [],
  total: 0,
  // ----------------- GET CART ------------------
  fetchCart: async () => {
    try {
      const token = localStorage.getItem("token") || "";
      set({ loading: true, error: null });

      const res = await axios.get(`${baseUrl}api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      set({
        total: res?.data?.data?.total || 0,
        items: [...(res?.data?.data?.items || [])],
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to fetch cart",
        loading: false,
      });
    }
  },

  // ----------------- ADD TO CART ------------------
  addToCart: async (productId: number, quantity: number) => {
    try {
      const token = localStorage.getItem("token");
      set({ loading: true, error: null });

      const form = new FormData();
      form.append("product_id", String(productId));
      form.append("quantity", String(quantity));

      // 1) ابعت الريكوست وخزّن الرد
      const res = await axios.post(`${baseUrl}api/v1/cart`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // 2) اطبع الريسبونس كامل
      console.log("ADD TO CART RESPONSE:", res.data);

      // 3) بعد الإضافة اعمل refresh
      await get().fetchCart();

      set({ loading: false });
    } catch (err: any) {
      console.log("ADD TO CART ERROR:", err?.response);

      set({
        error: err?.response?.data?.message || "Failed to add to cart",
        loading: false,
      });
    }
  },
  deleteToCart: async (productId: number) => {
    try {
      const token = localStorage.getItem("token");

      // const token = localStorage.getItem("token") || "";
      set({ loading: true, error: null });

      // 1) ابعت الريكوست وخزّن الرد
      const res = await axios.delete(`${baseUrl}/api/v1/cart/product`, {
        params: { product_id: productId },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // 2) اطبع الريسبونس كامل
      console.log("remove frome card:", res.data);

      set({ loading: false });
    } catch (err: any) {
      console.log("remove frome card:", err?.response);

      set({
        error: err?.response?.data?.message || "Failed to add to cart",
        loading: false,
      });
    }
  },
}));
