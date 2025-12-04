import { create } from "zustand";
import axios from "axios";
export interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
  order: number;
  created_at: string;
}

export interface ServicesResponse {
  status: boolean;
  message: string;
  data: Service[];
}

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
  
  fetchServices: (lang:string) => Promise<void>;
}
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useServicesStore = create<ServicesState>((set) => ({
  services: [],
  loading: false,
  error: null,

  fetchServices: async (lang) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.get(`${baseUrl}api/v1/services`,{

        headers:{
                    "Accept-Language": `${lang}`
        },
      }
      ); // GET https://city-phone.abaadre.com/api/v1/services

      set({
        services: response.data.data,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch services",
        loading: false,
      });
    }
  },
}));
