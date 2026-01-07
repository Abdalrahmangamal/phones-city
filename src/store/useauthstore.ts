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
  error: any | null;
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
      set({ loading: true, error: null });
      const res = await axios.post(`${baseUrl}api/v1/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });
      console.log(res.data);
      try {
        localStorage.setItem("userData", JSON.stringify(res.data));
      } catch (e) {}
      set({ error: null });
      return res.data;
    } catch (err: any) {
      // Extract errors from response - API returns { errors: { field: ["message"] } }
      const serverErrors = err?.response?.data?.errors ?? err?.response?.data?.data ?? err?.response?.data ?? err?.message ?? "Error";
      set({ loading: false, error: serverErrors });
      console.log("Register error:", serverErrors);
      return null;
    } finally {
      set({ loading: false });
    }
  },

  sendVerifyCode: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${baseUrl}api/v1/auth/verify-code`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });
      console.log("VERIFY-CODE RESPONSE:", res.data);

      // If verification succeeded, persist token and user data for immediate use
      const api = res.data; // API response body
      if (api?.status === true) {
        const token = api?.data?.token ?? api?.token ?? api?.access_token;
        if (token) {
          try {
            localStorage.setItem("token", token);
          } catch (e) {}
        }

        const user = api?.data?.user ?? api?.data ?? null;
        if (user) {
          try {
            localStorage.setItem("userData", JSON.stringify(user));
          } catch (e) {}
        }
      }

      set({ error: null });
      return res.data;
    } catch (err: any) {
      const serverErrors = err?.response?.data?.errors ?? err?.response?.data?.data ?? err?.response?.data ?? err?.message ?? "Error";
      set({ loading: false, error: serverErrors });
      console.log("Verify Code error:", serverErrors);
      return null;
    } finally {
      set({ loading: false });
    }
  },

sendLogin: async (data) => {
  try {
    set({ loading: true });

    const res = await axios.post(
      `${baseUrl}api/v1/auth/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "en",
          // ❌ مفيش Authorization هنا
        },
      }
    );

    const token = res?.data?.data?.token;
    const user = res?.data?.data?.user;

    if (token) localStorage.setItem("token", token);
    if (user) localStorage.setItem("userData", JSON.stringify(user));

    return res.data;
  } catch (err) {
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

  // Update the resetPassword function for bett
resetPassword: async (data) => {
  try {
    set({ loading: true, error: null });
    const res = await axios.post(
      `${baseUrl}api/v1/auth/reset-password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      }
    );

    console.log("RESET-PASSWORD RESPONSE:", res.data);
    return res.data;
  } catch (err: any) {
    console.log("Reset Password Error:", err.response?.data || err.message);
    
    // Return structured error response
    return {
      status: false,
      message: err.response?.data?.message || "فشل إعادة تعيين كلمة المرور",
      data: err.response?.data?.data || null
    };
  } finally {
    set({ loading: false });
  }
},
}));
