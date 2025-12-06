import { create } from "zustand";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  code: string;
}
interface VerifyCodetypes {
  code: string;
  email: string;
}
interface Logintypes {
  email: string;
  password: string;
}
interface forgotpasswordtypes {
  email: string;
}
interface AuthState {
  loading: boolean;
  error: string | null;
  sendRegisterData: (data: RegisterData) => Promise<any>;
  sendVerifyCode: (data: VerifyCodetypes) => Promise<any>;
  sendLogin: (data: Logintypes) => Promise<any>;
  forgotpassword: (data: forgotpasswordtypes) => Promise<any>;
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
      localStorage.setItem("userData", res.data);
    } catch (err) {
      set({ loading: false, error: err?.response?.data.data });
      console.log(err?.response?.data.data);
    } finally {
      set({ loading: false });
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
      set({ loading: false });
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },
  sendLogin: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post(`${baseUrl}api/v1/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "en",
        },
      });
      localStorage.setItem("userData", res.data);
      localStorage.setItem("token", res.data.data.token);
      console.log(res.data);
      return res.data;
    } catch (err) {
      set({ loading: false });
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },
  forgotpassword: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post(`${baseUrl}api/v1/auth/forgot-password`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "en",
        },
      });
      console.log(res.data);
    } catch (err) {
      set({ loading: false });
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },
}));
