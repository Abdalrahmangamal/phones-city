import { create } from "zustand";
import axios from "axios";
interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  code:string;
}
interface VerifyCodetypes{
    code:string;
    email:string;
}
interface AuthState {
  loading: boolean;
  error: string | null;
  sendRegisterData: (data: RegisterData) => Promise<any>;
  sendVerifyCode: (data: VerifyCodetypes) => Promise<any>;
}
const baseUrl = import.meta.env.VITE_BASE_URL;
export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  // baseurl:import.meta.env.VITE_BASE_URL ,
  sendRegisterData: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post(`${baseUrl}api/v1/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });
      console.log(res.data);
      localStorage.setItem("userData", JSON.stringify(res.data));

    } catch (err) {
      set({ loading:false });
      console.log(err);
    }finally{
        set({ loading:false });
    }
  },
  sendVerifyCode: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post(`${baseUrl}api/v1/auth/verify-code`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "en",
        },
      });
      console.log(res.data);
    } catch (err) {
      set({ loading:false });
      console.log(err);
    }finally{
        set({ loading:false });
    }
  },
}));
