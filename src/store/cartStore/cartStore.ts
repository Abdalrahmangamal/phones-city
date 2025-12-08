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
  addToCart: (id: number, quantity: number, isOption: boolean) => Promise<void>;
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
    const token = localStorage.getItem("token") ;
    const res = await axios.get(`${baseUrl}api/v1/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const newItems = res?.data?.data?.items || [];
    const newTotal = res?.data?.data?.total || 0;

    const { items, total } = get();

    // امنع الـ set لو مفيش تغيير حقيقي
    if (
      JSON.stringify(items) === JSON.stringify(newItems) &&
      total === newTotal
    ) {
      return; // مفيش تغيير → مفيش re-render → مفيش loop
    }

    set({
      items: newItems,
      total: newTotal,
      loading: false,
    });
  } catch (err) {
    set({ error: "Failed to fetch cart", loading: false });
  }
},


  // ----------------- ADD TO CART ------------------
addToCart: async (id: number, quantity: number, isOption: boolean) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found");
      return;
    }

    // تحديد الـ Params حسب نوع الإرسال
    const params = isOption
      ? { product_option_id: id, quantity }
      : { product_id: id, quantity };

    const res = await axios.post(
      `${baseUrl}api/v1/cart`,
      {}, // Body فارغ — الـ API لا يقبل body
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    console.log("CART ADDED SUCCESS:", res.data);

    // تحديث الكارت بعد الإضافة
    await get().fetchCart();

  } catch (error: any) {
    console.error(
      "Add to cart error:",
      error?.response?.data || error.message
    );
  }
},




  deleteToCart: async (productId: number) => {
    try {
      const token = localStorage.getItem("token");

      set({ loading: true, error: null });

      // 1) ابعت الريكوست وخزّن الرد
      const res = await axios.delete(`${baseUrl}api/v1/cart/product`, {
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
