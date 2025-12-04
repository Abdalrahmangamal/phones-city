import { create } from "zustand";
import axios from "axios";
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
      set({ loading: true });

      const response = await axios.get(`${baseUrl}api/v1/favorites`);

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
      set({ loading: true });

      const response = await axios.post(`${baseUrl}api/v1/favorites`, {
        product_id: productId,
      });

      const newItem: FavoriteItem = response.data.data;

      set({
        favorites: [...get().favorites, newItem],
        count: get().count + 1,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to add favorite",
        loading: false,
      });
    }
  },

  // DELETE remove favorite
  removeFavorite: async (favoriteId: number) => {
    try {
      set({ loading: true });

      await axios.delete(`${baseUrl}api/v1/favorites/${favoriteId}`);

      set({
        favorites: get().favorites.filter((f) => f.id !== favoriteId),
        count: get().count - 1,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to remove favorite",
        loading: false,
      });
    }
  },
}));
