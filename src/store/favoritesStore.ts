import { create } from "zustand";
import axiosClient from "@/api/axiosClient";
import { useProductsStore } from "@/store/productsStore";
interface Category {
  id: number;
  name: string;
  image: string | null;
  parent_id: number | null;
  created_at: string;
}

interface PaymentMethod {
  id: number;
  name: string;
  image: string;
  processing_fee_percentage: string;
  processing_fee_amount: string;
  total_price: string;
}

interface AppliedOffer {
  id: number;
  name: string | null;
  name_en: string;
  name_ar: string;
  value: string;
  type: string;
  status: string;
  apply_to: string;
  start_at: string | null;
  end_at: string | null;
  image: string;
  created_at: string;
}

interface FavoriteProduct {
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
  category: Category;
  images: any[];
  main_image: string;
  applied_offer: AppliedOffer;
  payment_methods: PaymentMethod[];
  is_favorite: boolean;
  in_cart: boolean;
  created_at: string;
  slug: string;
  options: any[];
}

interface FavoriteItem {
  id: number;
  product: FavoriteProduct;
  created_at: string;
}

interface FavoritesResponse {
  status: boolean;
  message: string;
  data: {
    items: FavoriteItem[];
    count: number;
  };
}

interface FavoritesState {
  favorites: FavoriteItem[];
  count: number;
  loading: boolean;
  error: string | null;
  clearFavorites: () => Promise<void>;

  fetchFavorites: (lang?: string) => Promise<void>;
  addFavorite: (productId: number) => Promise<FavoriteItem | void>;
  removeFavorite: (favoriteId: number) => Promise<number | void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  count: 0,
  loading: false,
  error: null,

  fetchFavorites: async (lang?: string) => {
    try {
      set({ loading: true });

      const response = await axiosClient.get(`api/v1/favorites`, {
        headers: {
          Accept: "application/json",
          "Accept-Language": lang || "ar",
        },
      });

      set({
        favorites: response.data.data.items,
        count: response.data.data.count,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to load favorites",
        loading: false,
      });
    }
  },

  addFavorite: async (productId: number) => {
    try {
      set({ loading: true });

      const response = await axiosClient.post(
        `api/v1/favorites`,
        {
          product_id: productId,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const newItem: FavoriteItem = response.data.data;

      set({
        favorites: [...get().favorites, newItem],
        count: get().count + 1,
        loading: false,
      });

      // sync productsStore so product cards update immediately
      try {
        const productsState = useProductsStore.getState();
        const resp = productsState.response;
        if (Array.isArray(resp)) {
          const updated = resp.map((p: any) =>
            p.id === productId ? { ...p, is_favorite: true, favorite_id: newItem.id } : p
          );
          useProductsStore.setState({ response: updated });
        } else if (resp && (resp as any).id === productId) {
          useProductsStore.setState({ response: { ...(resp as any), is_favorite: true, favorite_id: newItem.id } });
        }
      } catch (e) {
        // Sync failed silently
      }

      return newItem;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to add favorite",
        loading: false,
      });
      throw err;
    }
  },

  removeFavorite: async (favoriteId: number) => {
    try {
      set({ loading: true });

      const favoritesList = get().favorites;
      let target = favoritesList.find((f) => f.id === favoriteId);
      if (!target) {
        target = favoritesList.find((f) => f.product?.id === favoriteId);
      }

      if (target) {
        await axiosClient.delete(`api/v1/favorites/${target.id}`, {
          headers: {
            Accept: "application/json",
          },
        });

        set({
          favorites: get().favorites.filter((f) => f.id !== target!.id),
          count: Math.max(0, get().count - 1),
          loading: false,
        });

        // sync productsStore
        try {
          const productId = target.product?.id;
          if (productId) {
            const productsState = useProductsStore.getState();
            const resp = productsState.response;
            if (Array.isArray(resp)) {
              const updated = resp.map((p: any) =>
                p.id === productId ? { ...p, is_favorite: false, favorite_id: undefined } : p
              );
              useProductsStore.setState({ response: updated });
            } else if (resp && (resp as any).id === productId) {
              useProductsStore.setState({ response: { ...(resp as any), is_favorite: false, favorite_id: undefined } });
            }
          }
        } catch (e) {
          // Sync failed silently
        }

        return target.id;
      } else {
        // fallback: call toggle endpoint with product_id
        await axiosClient.post(
          `api/v1/favorites/toggle`,
          { product_id: favoriteId },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        set({
          favorites: get().favorites.filter((f) => f.product?.id !== favoriteId),
          count: Math.max(0, get().count - 1),
          loading: false,
        });

        // sync productsStore (product id case)
        try {
          const productId = favoriteId;
          const productsState = useProductsStore.getState();
          const resp = productsState.response;
          if (Array.isArray(resp)) {
            const updated = resp.map((p: any) =>
              p.id === productId ? { ...p, is_favorite: false, favorite_id: undefined } : p
            );
            useProductsStore.setState({ response: updated });
          } else if (resp && (resp as any).id === productId) {
            useProductsStore.setState({ response: { ...(resp as any), is_favorite: false, favorite_id: undefined } });
          }
        } catch (e) {
          // Sync failed silently
        }

        return favoriteId;
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to remove favorite",
        loading: false,
      });
      throw err;
    }
  },
  // DELETE clear all favorites
  clearFavorites: async () => {
    try {
      set({ loading: true });

      await axiosClient.delete(`api/v1/favorites`, {
        headers: {
          Accept: "application/json",
        },
      });

      // clear favorites store
      set({
        favorites: [],
        count: 0,
        loading: false,
        error: null,
      });

      // sync productsStore (important)
      try {
        const productsState = useProductsStore.getState();
        const resp = productsState.response;

        if (Array.isArray(resp)) {
          const updated = resp.map((p: any) => ({
            ...p,
            is_favorite: false,
            favorite_id: undefined,
          }));
          useProductsStore.setState({ response: updated });
        } else if (resp) {
          useProductsStore.setState({
            response: {
              ...(resp as any),
              is_favorite: false,
              favorite_id: undefined,
            },
          });
        }
      } catch (e) {
        // Sync failed silently
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to clear favorites",
        loading: false,
      });
      throw err;
    }
  },

}));
