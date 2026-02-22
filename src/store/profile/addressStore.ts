// store/profile/address.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosClient from "@/api/axiosClient";
export interface City {
  id: number;
  slug: string;
  name: string;
  name_en: string;
  name_ar: string;
  status: boolean;
  shipping_fee: string;
  order: number;
  created_at: string;
  updated_at: string;
}

// في addressStore.ts، عدل interface Address:
export interface Address {
  id: number;
  first_name: string;
  last_name: string;
  country: string;
  city_id: number; // تغير من city إلى city_id
  city: { // كائن city الكامل
    id: number;
    slug: string;
    name: string;
    name_en: string;
    name_ar: string;
    shipping_fee: string;
  };
  street_address: string;
  // Saudi National Address Fields
  building_number?: string;      // رقم المبنى
  street_name?: string;          // اسم الشارع
  district?: string;             // اسم الحي
  postal_code?: string;          // الرمز البريدي (5 أرقام)
  additional_number?: string;    // الرقم الإضافي (4 أرقام، اختياري)
  short_national_address?: string; // العنوان الوطني المختصر (8 خانات، اختياري)
  national_address?: string;     // العنوان الوطني
  phone: string;
  email: string;
  label: string | null;
  created_at: string;
}

// Input type for creating/updating address (doesn't require full city object)
export interface AddAddressInput {
  first_name: string;
  last_name: string;
  country: string;
  city_id: string;
  street_address: string;
  // Saudi National Address Fields
  building_number?: string;
  street_name?: string;
  district?: string;
  postal_code?: string;
  additional_number?: string | null;
  short_national_address?: string; // العنوان الوطني المختصر
  national_address: string; // العنوان الوطني - مطلوب
  phone: string;
  email: string;
  label?: string | null;
}

interface AddressState {
  addresses: Address[];
  selectedAddressId: number | null;
  deliveryMethod: "delivery" | "pickup" | null;
  loading: boolean;
  error: string | null;
  cities: City[];
  citiesLoading: boolean;
  citiesError: string | null;
  // Actions
  setAddresses: (addresses: Address[]) => void;
  setSelectedAddressId: (id: number | null) => void;
  setDeliveryMethod: (method: "delivery" | "pickup" | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Async Actions
  fetchCities: (lang: string) => Promise<void>;

  fetchAddresses: () => Promise<void>;
  addAddress: (addressData: AddAddressInput) => Promise<void>;
  updateAddress: (id: number, addressData: Partial<AddAddressInput>) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  selectAddress: (id: number) => void;

  // Getters
  getSelectedAddress: () => Address | null;
  getAddressById: (id: number) => Address | undefined;
}

const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddressId: null,
      deliveryMethod: "delivery",
      loading: false,
      error: null,
      cities: [],
      citiesLoading: false,
      citiesError: null,
      setAddresses: (addresses) => set({ addresses }),
      setSelectedAddressId: (selectedAddressId) => set({ selectedAddressId }),
      setDeliveryMethod: (deliveryMethod) => set({ deliveryMethod }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      fetchAddresses: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.get("/api/v1/locations");
          if (response.data.status) {
            const addresses = response.data.data;
            set({
              addresses,
              selectedAddressId: addresses.length > 0 ? addresses[0].id : null,
              loading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to fetch addresses",
            loading: false,
          });
        }
      },

      addAddress: async (addressData) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.post(
            "/api/v1/locations",
            addressData
          );
          if (response.data.status) {
            const newAddress = response.data.data;
            set((state) => ({
              addresses: [...state.addresses, newAddress],
              selectedAddressId: newAddress.id,
              loading: false,
            }));
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to add address",
            loading: false,
          });
          throw error;
        }
      },

      updateAddress: async (id, addressData) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.put(
            `/api/v1/locations/${id}`,
            addressData
          );
          if (response.data.status) {
            const updatedAddress = response.data.data;
            set((state) => ({
              addresses: state.addresses.map((addr) =>
                addr.id === id ? updatedAddress : addr
              ),
              loading: false,
            }));
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to update address",
            loading: false,
          });
          throw error;
        }
      },

      deleteAddress: async (id) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosClient.delete(`/api/v1/locations/${id}`);
          if (response.data.status) {
            set((state) => {
              const newAddresses = state.addresses.filter(
                (addr) => addr.id !== id
              );
              return {
                addresses: newAddresses,
                selectedAddressId:
                  state.selectedAddressId === id
                    ? newAddresses.length > 0
                      ? newAddresses[0].id
                      : null
                    : state.selectedAddressId,
                loading: false,
              };
            });
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to delete address",
            loading: false,
          });
          throw error;
        }
      },

      selectAddress: (id) => {
        set({ selectedAddressId: id });
      },

      getSelectedAddress: () => {
        const { addresses, selectedAddressId } = get();
        return addresses.find((addr) => addr.id === selectedAddressId) || null;
      },

      getAddressById: (id) => {
        const { addresses } = get();
        return addresses.find((addr) => addr.id === id);
      },
      fetchCities: async (lang: string) => {
        set({ citiesLoading: true, citiesError: null });

        try {
          const response = await axiosClient.get("/api/v1/cities", {
            headers: {
              "Accept-Language": `${lang}`
            },
            params: {
              per_page: 1000  // Fetch all cities by setting a high limit
            }
          });

          if (response.data?.status === true) {
            set({
              cities: response.data.data,
              citiesLoading: false,
            });
          } else {
            set({
              citiesError: "Failed to fetch cities",
              citiesLoading: false,
            });
          }
        } catch (error: any) {
          set({
            citiesError:
              error.response?.data?.message || "Failed to fetch cities",
            citiesLoading: false,
          });
        }
      },
    }),
    {
      name: "address-storage",
      partialize: (state) => ({
        addresses: state.addresses,
        selectedAddressId: state.selectedAddressId,
        deliveryMethod: state.deliveryMethod,
      }),
    }
  )
);

export default useAddressStore;
