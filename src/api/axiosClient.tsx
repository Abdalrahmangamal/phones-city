import axios from "axios";
import { useSettings } from "@/store/settings";
const baseUrl = import.meta.env.VITE_BASE_URL;

const getRouteLoginPath = () => {
  const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
  const lang =
    firstSegment === "ar" || firstSegment === "en"
      ? firstSegment
      : (useSettings.getState().lang === "en" ? "en" : "ar");

  return `/${lang}/login`;
};

const axiosClient = axios.create({
  baseURL: baseUrl,
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = getRouteLoginPath();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
