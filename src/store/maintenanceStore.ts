// src/store/maintenanceStore.ts
import { create } from "zustand";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface MaintenanceSettings {
    maintenance_mode: boolean;
    maintenance_message_ar?: string;
    maintenance_message_en?: string;
}

interface MaintenanceState {
    isMaintenanceMode: boolean;
    maintenanceMessageAr: string;
    maintenanceMessageEn: string;
    loading: boolean;
    error: string | null;
    hasChecked: boolean;
    checkMaintenanceStatus: () => Promise<void>;
    getMessage: (lang: string) => string;
}

export const useMaintenanceStore = create<MaintenanceState>((set, get) => ({
    isMaintenanceMode: false,
    maintenanceMessageAr: "نقوم حالياً بإجراء تحسينات على الموقع. سنعود قريباً!",
    maintenanceMessageEn: "We are currently making improvements to our site. We will be back soon!",
    loading: true,
    error: null,
    hasChecked: false,

    checkMaintenanceStatus: async () => {
        // Prevent multiple checks
        if (get().hasChecked) return;

        try {
            set({ loading: true, error: null });

            const response = await axios.get<{ status: boolean; data: MaintenanceSettings }>(
                `${baseUrl}api/v1/settings`,
                {
                    headers: {
                        Accept: "application/json",
                    },
                    timeout: 10000,
                }
            );

            const data = response.data.data;

            set({
                isMaintenanceMode: data.maintenance_mode ?? false,
                maintenanceMessageAr: data.maintenance_message_ar || get().maintenanceMessageAr,
                maintenanceMessageEn: data.maintenance_message_en || get().maintenanceMessageEn,
                loading: false,
                hasChecked: true,
            });
        } catch (err: any) {
            console.error("Failed to check maintenance status:", err);
            // On error, assume site is NOT in maintenance mode to avoid blocking users
            set({
                isMaintenanceMode: false,
                loading: false,
                hasChecked: true,
                error: err?.message || "Failed to check maintenance status",
            });
        }
    },

    getMessage: (lang: string) => {
        const state = get();
        return lang === "ar" ? state.maintenanceMessageAr : state.maintenanceMessageEn;
    },
}));
