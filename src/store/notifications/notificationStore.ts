import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationData {
  order_id: number;
  order_number: string;
  type: string;
  title: string;
  message: string;
  status: string;
}

export interface Notification {
  id: string;
  type: string;
  data: NotificationData;
  read_at: string | null;
  created_at: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Fetch functions
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
}

const getApiUrl = (endpoint: string): string => {
  const base = import.meta.env.VITE_BASE_URL;
  const cleanBase = base.replace(/\/+$/, ''); // إزالة أي / في النهاية
  const cleanEndpoint = endpoint.replace(/^\/+/, ''); // إزالة / من البداية
  return `${cleanBase}/${cleanEndpoint}`;
};

const getAuthToken = (): string => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Unauthenticated');
  }
  return token;
};

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const payload = await response.json();
    return payload?.message || payload?.error || `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
};

const authRequest = async (endpoint: string, init: RequestInit = {}) => {
  const token = getAuthToken();
  const response = await fetch(getApiUrl(endpoint), {
    ...init,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response;
};

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
      error: null,

      setNotifications: (notifications) => {
        const unreadCount = notifications.filter(n => !n.read_at).length;
        set({ notifications, unreadCount });
      },

      addNotification: (notification) => {
        set((state) => {
          const notifications = [notification, ...state.notifications];
          const unreadCount = notification.read_at ? state.unreadCount : state.unreadCount + 1;
          return { notifications, unreadCount };
        });
      },

      markAsRead: async (id) => {
        await authRequest(`api/v1/notifications/${encodeURIComponent(id)}/read`, {
          method: 'POST',
        });

        set((state) => {
          const now = new Date().toISOString();
          const notifications = state.notifications.map((notification) =>
            notification.id === id && !notification.read_at
              ? { ...notification, read_at: now }
              : notification
          );
          const unreadCount = notifications.filter((n) => !n.read_at).length;
          return { notifications, unreadCount };
        });
      },

      markAllAsRead: async () => {
        await authRequest('api/v1/notifications/read-all', {
          method: 'POST',
        });

        set((state) => {
          const now = new Date().toISOString();
          const notifications = state.notifications.map((notification) => ({
            ...notification,
            read_at: notification.read_at || now,
          }));
          return { notifications, unreadCount: 0 };
        });
      },

      deleteNotification: async (id) => {
        await authRequest(`api/v1/notifications/${encodeURIComponent(id)}`, {
          method: 'DELETE',
        });

        set((state) => {
          const notificationToDelete = state.notifications.find(n => n.id === id);
          const notifications = state.notifications.filter(notification => notification.id !== id);
          const unreadCount = notificationToDelete && !notificationToDelete.read_at 
            ? Math.max(0, state.unreadCount - 1) 
            : state.unreadCount;
          return { notifications, unreadCount };
        });
      },

      clearAllNotifications: async () => {
        await authRequest('api/v1/notifications/clear-all', {
          method: 'DELETE',
        });

        set({ notifications: [], unreadCount: 0 });
      },

      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),

      fetchNotifications: async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    set({ notifications: [], unreadCount: 0, error: null });
    return;
  }

  set({ isLoading: true, error: null });
  
  try {
    const response = await fetch(getApiUrl('api/v1/notifications'), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const json = await response.json();
      const list = json?.data?.notifications ?? json?.data?.data ?? json?.data ?? json?.notifications ?? [];
      const items = Array.isArray(list) ? list : [];
      const unreadCount = items.filter((n: Notification) => !n.read_at).length;
      set({ notifications: items, unreadCount, error: null });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch notifications';
    set({ error: message });
  } finally {
    set({ isLoading: false });
  }
},

      fetchUnreadCount: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({ unreadCount: 0 });
          return;
        }

        try {
          // إذا كان الـ API يوفر endpoint منفصل للعداد، استخدمه
          // وإلا استخدم fetchNotifications لحساب العدد
          const response = await fetch(getApiUrl('api/v1/notifications/unread-count'), {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const result = await response.json();
            const nextUnreadCount =
              result?.data?.unread_count ??
              result?.data?.count ??
              result?.unread_count ??
              result?.count ??
              result?.data;
            if (nextUnreadCount !== undefined && nextUnreadCount !== null) {
              set({ unreadCount: Number(nextUnreadCount) || 0 });
            }
          } else {
            // إذا لم يكن endpoint العداد موجوداً، احسب من الإشعارات
            await get().fetchNotifications();
          }
        } catch (error) {
          console.error('Error fetching unread count:', error);
          // في حالة الخطأ، احسب من الإشعارات المحلية
          const unreadCount = get().notifications.filter(n => !n.read_at).length;
          set({ unreadCount });
        }
      },
    }),
    {
      name: 'notifications-storage',
      partialize: (state) => ({ 
        notifications: state.notifications,
        unreadCount: state.unreadCount 
      }),
    }
  )
);

// دالة مساعدة لاستخدام الـ store في المكونات
export const useNotifications = () => {
  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    setNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    setLoading,
    setError,
    fetchNotifications,
    fetchUnreadCount,
  } = useNotificationStore();

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    setNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    setLoading,
    setError,
    fetchNotifications,
    fetchUnreadCount,
  };
};
