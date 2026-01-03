import { create } from "zustand";
import axios from "axios";
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

const baseUrl = import.meta.env.VITE_BASE_URL;

interface FavoritesState {
  favorites: FavoriteItem[];
  count: number;
  loading: boolean;
  error: string | null;
  clearFavorites: () => Promise<void>; 

  fetchFavorites: () => Promise<void>;
  addFavorite: (productId: number) => Promise<void>;
  removeFavorite: (favoriteId: number) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  count: 0,
  loading: false,
  error: null,

  // GET /favorites
  fetchFavorites: async () => {
    try {
      const token = localStorage.getItem("token");

      set({ loading: true });

      const response = await axios.get(`${baseUrl}api/v1/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
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

  // POST add to favorites
  addFavorite: async (productId: number) => {
    try {
      const token = localStorage.getItem("token");

      set({ loading: true });

      const response = await axios.post(
        `${baseUrl}api/v1/favorites`,
        {
          product_id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
        console.warn("Failed to sync productsStore after addFavorite", e);
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

  // DELETE remove favorite
  removeFavorite: async (favoriteId: number) => {
    try {
      const token = localStorage.getItem("token");

      set({ loading: true });

      const favoritesList = get().favorites;
      // try to find by favorite id first
      let target = favoritesList.find((f) => f.id === favoriteId);
      // if not found, try find by product id
      if (!target) {
        target = favoritesList.find((f) => f.product?.id === favoriteId);
      }

      if (target) {
        // delete by favorite id
        await axios.delete(`${baseUrl}api/v1/favorites/${target.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
          console.warn("Failed to sync productsStore after removeFavorite", e);
        }

        return target.id;
      } else {
        // fallback: call toggle endpoint with product_id
        await axios.post(
          `${baseUrl}api/v1/favorites/toggle`,
          { product_id: favoriteId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
          console.warn("Failed to sync productsStore after removeFavorite(toggle)", e);
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
    const token = localStorage.getItem("token");

    set({ loading: true });

    await axios.delete(`${baseUrl}api/v1/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
      console.warn("Failed to sync productsStore after clearFavorites", e);
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
