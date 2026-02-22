import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axiosClient from '@/api/axiosClient';

interface Certificate {
  id: number;
  name: string;
  name_en: string;
  name_ar: string;
  image: string;
  main_image: string;
  created_at: string;
  updated_at: string;
}

interface CertificateState {
  certificates: Certificate[];
  currentCertificate: Certificate | null;
  loading: boolean;
  loadingSingle: boolean;
  error: string | null;

  // Actions
  fetchCertificates: () => Promise<void>;
  fetchCertificateById: (id: number) => Promise<void>;
  getCertificateById: (id: number) => Certificate | undefined;
  getFirstTwoCertificates: () => Certificate[];
  getRestCertificates: () => Certificate[];
  clearCertificates: () => void;
  clearCurrentCertificate: () => void;
  clearError: () => void;
}

const CERTIFICATES_CACHE_TTL_MS = 60_000;
let certificatesCache: { data: Certificate[]; fetchedAt: number } | null = null;
let certificatesInFlight: Promise<void> | null = null;

export const useCertificateStore = create<CertificateState>()(
  devtools(
    (set, get) => ({
      certificates: [],
      currentCertificate: null,
      loading: false,
      loadingSingle: false,
      error: null,

      // Fetch all certificates
      fetchCertificates: async () => {
        if (
          certificatesCache &&
          Date.now() - certificatesCache.fetchedAt < CERTIFICATES_CACHE_TTL_MS
        ) {
          set(() => ({
            certificates: certificatesCache!.data,
            loading: false,
            error: null,
          }));
          return;
        }

        if (certificatesInFlight) {
          return certificatesInFlight;
        }

        set(() => ({ loading: true, error: null }));

        certificatesInFlight = (async () => {
          try {
            const response = await axiosClient.get("/api/v1/certificates");

            if (response.data.status) {
              const nextCertificates = Array.isArray(response.data.data)
                ? response.data.data
                : [];

              certificatesCache = {
                data: nextCertificates,
                fetchedAt: Date.now(),
              };

              set(() => ({
                certificates: nextCertificates,
                loading: false,
                error: null,
              }));
            } else {
              set(() => ({
                error: response.data.message || "Failed to fetch certificates",
                loading: false
              }));
            }

          } catch (error: any) {
            console.error("Error fetching certificates");
            set(() => ({
              error: error?.response?.data?.message || "Network error occurred",
              loading: false
            }));
          } finally {
            certificatesInFlight = null;
          }
        })();

        return certificatesInFlight;
      },

      // Fetch a single certificate
      fetchCertificateById: async (id: number) => {
        set(() => ({ loadingSingle: true, error: null }));

        try {
          const response = await axiosClient.get(`/api/v1/certificates/${id}`);

          if (response.data.status) {
            set(() => ({
              currentCertificate: response.data.data,
              loadingSingle: false
            }));
          } else {
            set(() => ({
              error: response.data.message || "Failed to fetch certificate",
              loadingSingle: false
            }));
          }

        } catch (error: any) {
          console.error("Error fetching single certificate");
          set(() => ({
            error: error?.response?.data?.message || "Network error occurred",
            loadingSingle: false
          }));
        }
      },

      // Local helper getters
      getCertificateById: (id: number) => {
        return get().certificates.find(cert => cert.id === id);
      },

      getFirstTwoCertificates: () => {
        return get().certificates.slice(0, 2);
      },

      getRestCertificates: () => {
        return get().certificates.slice(2);
      },

      // Clear functions
      clearCertificates: () => {
        set(() => ({ certificates: [] }));
      },

      clearCurrentCertificate: () => {
        set(() => ({ currentCertificate: null }));
      },

      clearError: () => {
        set(() => ({ error: null }));
      },
    }),

    { name: "certificate-store" }
  )
);
