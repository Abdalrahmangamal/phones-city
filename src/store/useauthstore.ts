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
  sendVerifyCode: (data: VerifyCodetypes, purpose?: "register" | "reset") => Promise<any>;
  sendLogin: (data: Logintypes) => Promise<any>;
  forgotpassword: (data: ForgotPasswordTypes) => Promise<any>;
  resetPassword: (data: ResetPasswordTypes) => Promise<any>;
  verifyResetCode: (data: VerifyCodetypes) => Promise<any>; // إضافة جديدة
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
      const serverErrors =
        err?.response?.data?.errors ??
        err?.response?.data?.data ??
        err?.response?.data ??
        err?.message ??
        "Error";
      set({ loading: false, error: serverErrors });
      console.log("Register error:", serverErrors);
      return null;
    } finally {
      set({ loading: false });
    }
  },

  sendVerifyCode: async (data, purpose = "register") => {
    try {
      set({ loading: true, error: null });
      
      // تحديد endpoint بناءً على الغرض
      let endpoint = `${baseUrl}api/v1/auth/verify-code`;
      if (purpose === "reset") {
        endpoint = `${baseUrl}api/v1/auth/verify-reset-code`;
      }
      
      console.log(`Calling endpoint: ${endpoint} for purpose: ${purpose}`);
      
      const res = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });
      
      console.log("VERIFY-CODE RESPONSE:", res.data);

      const api = res.data;

      if (api?.status === true) {
        // فقط في حالة تفعيل الحساب بعد التسجيل نحفظ التوكن وبيانات المستخدم
        if (purpose === "register") {
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
        // في حالة إعادة تعيين كلمة المرور → لا نحفظ أي توكن أو بيانات
      }

      set({ error: null });
      return res.data;
    } catch (err: any) {
      const serverErrors =
        err?.response?.data?.errors ??
        err?.response?.data?.data ??
        err?.response?.data ??
        err?.message ??
        "Error";
      set({ loading: false, error: serverErrors });
      console.log("Verify Code error:", serverErrors);
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // دالة جديدة خاصة بالتحقق من كود إعادة التعيين
  verifyResetCode: async (data) => {
    try {
      set({ loading: true, error: null });
      
      const res = await axios.post(`${baseUrl}api/v1/auth/verify-reset-code`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });
      
      console.log("VERIFY-RESET-CODE RESPONSE:", res.data);
      set({ error: null });
      return res.data;
    } catch (err: any) {
      const serverErrors =
        err?.response?.data?.errors ??
        err?.response?.data?.data ??
        err?.response?.data ??
        err?.message ??
        "Error";
      set({ loading: false, error: serverErrors });
      console.log("Verify Reset Code error:", serverErrors);
      
      // إرجاع بيانات الخطأ بشكل منظم
      return {
        status: false,
        message: err.response?.data?.message || "فشل التحقق من الكود",
        errors: serverErrors,
      };
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
      set({ loading: true, error: null });
      const res = await axios.post(`${baseUrl}api/v1/auth/forgot-password`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "en",
        },
      });

      console.log("FORGOT-PASSWORD RESPONSE:", res.data);
      
      // حفظ الإيميل مؤقتاً في localStorage
      if (res.data?.status === true) {
        localStorage.setItem('resetPasswordEmail', data.email);
      }
      
      return res.data;
    } catch (err: any) {
      set({ loading: false });
      console.log(err);
      
      // إرجاع بيانات الخطأ بشكل منظم
      return {
        status: false,
        message: err.response?.data?.message || "فشل إرسال طلب إعادة التعيين",
        data: err.response?.data?.data || null,
      };
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${baseUrl}api/v1/auth/reset-password`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });

      console.log("RESET-PASSWORD RESPONSE:", res.data);
      
      // تنظيف الإيميل المخزن بعد نجاح العملية
      if (res.data?.status === true) {
        localStorage.removeItem('resetPasswordEmail');
      }
      
      return res.data;
    } catch (err: any) {
      console.log("Reset Password Error:", err.response?.data || err.message);

      return {
        status: false,
        message: err.response?.data?.message || "فشل إعادة تعيين كلمة المرور",
        data: err.response?.data?.data || null,
      };
    } finally {
      set({ loading: false });
    }
  },
}));