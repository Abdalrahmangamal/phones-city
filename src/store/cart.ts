// src/store/cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useSettings } from "./settings";

type CartItem = { id: string; name: string; price: number; qty: number };
type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
  totalFormatted: () => string;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) => {
          const exist = s.items.find((x) => x.id === item.id);
          return {
            items: exist
              ? s.items.map((x) => (x.id === item.id ? { ...x, qty: x.qty + item.qty } : x))
              : [...s.items, item],
          };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      totalFormatted: () => {
        const { lang, currency } = useSettings.getState();
        return new Intl.NumberFormat(lang, { style: "currency", currency }).format(get().total());
      },
    }),
    { name: "cart-v1" }
  )
);
