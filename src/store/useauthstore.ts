import { create } from "zustand";
import axios from "axios";

interface ResetPasswordTypes {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

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

interface ForgotPasswordTypes {
  email: string;
}

interface AuthState {
  loading: boolean;
  error: string | null;
  sendRegisterData: (data: RegisterData) => Promise<any>;
  sendVerifyCode: (data: VerifyCodetypes) => Promise<any>;
  sendLogin: (data: Logintypes) => Promise<any>;
  forgotpassword: (data: ForgotPasswordTypes) => Promise<any>;
  resetPassword: (data: ResetPasswordTypes) => Promise<any>;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,

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
      return res.data;
    } catch (err: any) {
      set({ loading: false, error: err?.response?.data?.data || "Error" });
      console.log(err?.response?.data?.data);
      return null;
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
      console.log("VERIFY-CODE RESPONSE:", res.data);
      return res.data;
    } catch (err) {
      set({ loading: false });
      console.log(err);
      return null;
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

      console.log("LOGIN RESPONSE:", res.data);

      // على حسب شكل API بتاعك، افترضنا:
      // { status, message, data: { token, user } }
      localStorage.setItem("userData", JSON.stringify(res.data));
      localStorage.setItem("token", JSON.stringify(res.data.data.token));

      return res.data; // ← ApiResponse
    } catch (err) {
      set({ loading: false });
      console.log(err);
      return null;
    } finally {
      set({ loading: false });
    }
  },

  forgotpassword: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post(
        `${baseUrl}api/v1/auth/forgot-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "en",
          },
        }
      );

      console.log("FORGOT-PASSWORD RESPONSE:", res.data);
      return res.data; // {status, message, data:[]}
    } catch (err) {
      set({ loading: false });
      console.log(err);
      return null;
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post(
        `${baseUrl}api/v1/auth/reset-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "en",
          },
        }
      );

      console.log("RESET-PASSWORD RESPONSE:", res.data);
      return res.data;
    } catch (err) {
      set({ loading: false });
      console.log(err);
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
