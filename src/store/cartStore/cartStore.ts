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
  id: number;              // هذا هو cart_item_id (مثل 125)
  product: CartProduct;
  category: CartCategory;
  quantity: number;        // كمية هذا العنصر في السلة
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
  fetchCart: () => Promise<void>;
  addToCart: (id: number, quantity: number, isOption: boolean) => Promise<void>;
  deleteToCart: (productId: number) => Promise<void>;
  deletefromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, newQuantity: number) => Promise<void>;
  updateFinalTotal: (finalTotal: number, selectedPaymentId: number | null) => void;
  clearCart: () => Promise<void>;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useCartStore = create<CartState>((set, get) => ({
  loading: false,
  error: null,
  items: [],
  total: 0,
  finalTotal: 0,
  selectedPaymentId: null,

  // ----------------- GET CART ------------------
  fetchCart: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseUrl}api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const newItems = res?.data?.data?.items || [];
      const newTotal = res?.data?.data?.total || 0;

      const { items, total } = get();

      if (
        JSON.stringify(items) === JSON.stringify(newItems) &&
        total === newTotal
      ) {
        return;
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

      const params = isOption
        ? { product_option_id: id, quantity }
        : { product_id: id, quantity };

      await axios.post(
        `${baseUrl}api/v1/cart`,
        {},
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      await get().fetchCart();
    } catch (error: any) {
      console.error("Add to cart error:", error?.response?.data || error.message);
    }
  },

  // ----------------- DELETE (باستخدام product_id) ------------------
  deleteToCart: async (productId: number) => {
    try {
      const token = localStorage.getItem("token");
      set({ loading: true, error: null });

      const res = await axios.delete(`${baseUrl}api/v1/cart/product`, {
        params: { product_id: productId },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log("remove from cart:", res.data);
      await get().fetchCart(); // تحديث السلة بعد الحذف
      set({ loading: false });
    } catch (err: any) {
      console.log("remove error:", err?.response);
      set({
        error: err?.response?.data?.message || "Failed to remove from cart",
        loading: false,
      });
    }
  },

  // ----------------- DELETE (باستخدام cart_item_id) ------------------
  deletefromCart: async (cartItemId: number) => {
    try {
      const token = localStorage.getItem("token");
      set({ loading: true, error: null });

      const res = await axios.delete(`${baseUrl}api/v1/cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      console.log("Removed from cart:", res.data);
      await get().fetchCart(); // تحديث كامل بدلاً من الفلترة المحلية
      set({ loading: false });
    } catch (err: any) {
      console.log("Remove error:", err?.response);
      set({
        error: err?.response?.data?.message || "Failed to remove from cart",
        loading: false,
      });
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
        console.warn("No token found");
        return;
      }

      await axios.put(
        `${baseUrl}api/v1/cart/${cartItemId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      await get().fetchCart();
      set({ loading: false });
    } catch (error: any) {
      console.error("Update quantity error:", error?.response?.data || error.message);
      set({
        error: error?.response?.data?.message || "فشل تحديث الكمية",
        loading: false,
      });
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
    await axios.delete(`${baseUrl}api/v1/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    console.error("Clear cart error:", error?.response?.data || error.message);
    set({
      error: error?.response?.data?.message || "فشل حذف السلة",
      loading: false,
    });
  }
},
}));