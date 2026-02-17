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
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Fetch functions
  fetchNotifications: () => Promise<void>;
  fetchUnreadCount: () => Promise<void>;
}

const baseUrl = import.meta.env.VITE_BASE_URL;
const getApiUrl = (endpoint: string): string => {
  const base = import.meta.env.VITE_BASE_URL;
  const cleanBase = base.replace(/\/+$/, ''); // إزالة أي / في النهاية
  const cleanEndpoint = endpoint.replace(/^\/+/, ''); // إزالة / من البداية
  return `${cleanBase}/${cleanEndpoint}`;
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

      markAsRead: (id) => {
        set((state) => {
          const notifications = state.notifications.map(notification =>
            notification.id === id ? { ...notification, read_at: new Date().toISOString() } : notification
          );
          const unreadCount = Math.max(0, state.unreadCount - 1);
          return { notifications, unreadCount };
        });
      },

      markAllAsRead: () => {
        set((state) => {
          const notifications = state.notifications.map(notification => ({
            ...notification,
            read_at: notification.read_at || new Date().toISOString()
          }));
          return { notifications, unreadCount: 0 };
        });
      },

      deleteNotification: (id) => {
        set((state) => {
          const notificationToDelete = state.notifications.find(n => n.id === id);
          const notifications = state.notifications.filter(notification => notification.id !== id);
          const unreadCount = notificationToDelete && !notificationToDelete.read_at 
            ? Math.max(0, state.unreadCount - 1) 
            : state.unreadCount;
          return { notifications, unreadCount };
        });
      },

      clearAllNotifications: () => {
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
  } catch (error: any) {
    set({ error: error?.message ?? 'Failed to fetch notifications' });
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
          const response = await fetch(`${baseUrl}/notifications/unread-count`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const result = await response.json();
            if (result.status && result.data !== undefined) {
              set({ unreadCount: result.data });
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
