import { create } from "zustand";
import axiosClient from "@/api/axiosClient";

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
  quantity: number;
  price: string;
  subtotal: number;
}

interface CartState {
  loading: boolean;
  error: string | null;
  total: number;
  items: CartItem[];
  finalTotal: number;
  selectedPaymentId: number | null;
  freeShippingThreshold: number;
  fetchCart: () => Promise<void>;
  addToCart: (id: number, quantity: number, isOption: boolean) => Promise<void>;
  deleteToCart: (productId: number) => Promise<void>;
  deletefromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, newQuantity: number) => Promise<void>;
  updateFinalTotal: (finalTotal: number, selectedPaymentId: number | null) => void;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  loading: false,
  error: null,
  items: [],
  total: 0,
  finalTotal: 0,
  selectedPaymentId: null,

  freeShippingThreshold: 0,

  fetchCart: async () => {
    try {
      const res = await axiosClient.get(`api/v1/cart`, {
        headers: {
          Accept: "application/json",
        },
      });

      const newItems = res?.data?.data?.items || [];
      const newTotal = res?.data?.data?.total || 0;

      // استخراج حد الشحن المجاني من الملخص
      const summary = res?.data?.data?.summary;
      let newFreeShippingThreshold = 0;

      if (summary && summary.free_shipping_threshold) {
        const thresholdStr = String(summary.free_shipping_threshold).replace(/,/g, "");
        newFreeShippingThreshold = parseFloat(thresholdStr) || 0;
      }

      const { items, total } = get();

      if (
        JSON.stringify(items) === JSON.stringify(newItems) &&
        total === newTotal &&
        get().freeShippingThreshold === newFreeShippingThreshold
      ) {
        return;
      }

      set({
        items: newItems,
        total: newTotal,
        freeShippingThreshold: newFreeShippingThreshold,
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
        return;
      }

      const params = isOption
        ? { product_option_id: id, quantity }
        : { product_id: id, quantity };

      await axiosClient.post(
        `api/v1/cart`,
        {},
        {
          params,
          headers: {
            Accept: "application/json",
          },
        }
      );

      await get().fetchCart();
    } catch (error: any) {
      throw error; // <--- إضافة هذا لرفض الـ Promise وتنفيذ .catch
    }
  },

  deleteToCart: async (productId: number) => {
    try {
      set({ loading: true, error: null });

      await axiosClient.delete(`api/v1/cart/product`, {
        params: { product_id: productId },
        headers: {
          Accept: "application/json",
        },
      });

      await get().fetchCart(); // تحديث السلة بعد الحذف
      set({ loading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to remove from cart",
        loading: false,
      });
      throw err; // اختياري: إضافة throw هنا أيضًا للتوافق مع .catch في ProductCard
    }
  },

  deletefromCart: async (cartItemId: number) => {
    try {
      set({ loading: true, error: null });

      await axiosClient.delete(`api/v1/cart/${cartItemId}`, {
        headers: {
          Accept: "application/json",
        },
      });

      await get().fetchCart(); // تحديث كامل بدلاً من الفلترة المحلية
      set({ loading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to remove from cart",
        loading: false,
      });
      throw err; // اختياري: للتوافق
    }
  },

  // ----------------- UPDATE QUANTITY ------------------
  updateQuantity: async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      await get().deletefromCart(cartItemId);
      return;
    }

    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      await axiosClient.put(
        `api/v1/cart/${cartItemId}`,
        { quantity: newQuantity },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      await get().fetchCart();
      set({ loading: false });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "فشل تحديث الكمية",
        loading: false,
      });
      throw error; // اختياري: للتوافق إذا كان هناك .catch خارجي
    }
  },

  // ----------------- UPDATE FINAL TOTAL ------------------
  updateFinalTotal: (finalTotal: number, selectedPaymentId: number | null) => {
    set({ finalTotal, selectedPaymentId });
  },

  // ----------------- CLEAR CART (اختياري) ------------------
  clearCart: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");

      if (!token) {
        set({ error: "No authentication token found", loading: false });
        return;
      }

      // استخدام الـ endpoint الخاص بحذف الكل
      await axiosClient.delete(`api/v1/cart`, {
        headers: {
          Accept: "application/json",
        },
      });

      // تحديث الحالة المحلية مباشرة
      set({
        items: [],
        total: 0,
        finalTotal: 0,
        selectedPaymentId: null,
        loading: false
      });

    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "فشل حذف السلة",
        loading: false,
      });
      throw error; // اختياري
    }
  },
}));