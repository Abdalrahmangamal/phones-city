import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Bell, Check, Trash2, CheckCircle, XCircle } from "lucide-react";
import { useNotifications } from "@/store/notifications/notificationStore";
import Layout from "@/components/layout/layout";
import Sidebar from "@/components/layout/Sidebar";
import { useLangSync } from "@/hooks/useLangSync";
import { toast } from "react-toastify";

const Notifications = () => {
  const { t } = useTranslation();
  const { lang } = useLangSync();

  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  } = useNotifications();

  // جلب الإشعارات عند تحميل الصفحة
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // دالة لتحديد الإشعار كمقروء مع معالجة الأخطاء
  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      toast.success(t("MarkedAsReadSuccess"), {
        position: "top-center",
        rtl: lang === "ar",
      });
    } catch (error) {
      toast.error(t("MarkAsReadError"), {
        position: "top-center",
        rtl: lang === "ar",
      });
    }
  };

  // دالة لحذف الإشعار مع معالجة الأخطاء
  const handleDeleteNotification = async (id: string) => {
    if (window.confirm(t("DeleteNotificationConfirm"))) {
      try {
        await deleteNotification(id);
        toast.success(t("NotificationDeletedSuccess"), {
          position: "top-center",
          rtl: lang === "ar",
        });
      } catch (error) {
        toast.error(t("DeleteNotificationError"), {
          position: "top-center",
          rtl: lang === "ar",
        });
      }
    }
  };

  // دالة لتحديد الكل كمقروء
  const handleMarkAllAsRead = async () => {
    if (notifications.length === 0) return;
    
    if (window.confirm(t("MarkAllAsReadConfirm"))) {
      try {
        await markAllAsRead();
        toast.success(t("AllMarkedAsReadSuccess"), {
          position: "top-center",
          rtl: lang === "ar",
        });
      } catch (error) {
        toast.error(t("MarkAllAsReadError"), {
          position: "top-center",
          rtl: lang === "ar",
        });
      }
    }
  };

  // دالة لحذف جميع الإشعارات
  const handleClearAllNotifications = async () => {
    if (notifications.length === 0) return;
    
    if (window.confirm(t("ClearAllNotificationsConfirm"))) {
      try {
        await clearAllNotifications();
        toast.success(t("AllNotificationsClearedSuccess"), {
          position: "top-center",
          rtl: lang === "ar",
        });
      } catch (error) {
        toast.error(t("ClearAllNotificationsError"), {
          position: "top-center",
          rtl: lang === "ar",
        });
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
        <Sidebar />
        
        <div className="md:w-[883px] px-5 md:px-0">
          {/* Header Section */}
          <div className="w-full h-[45px] p-5 bg-[#E5E5E5] flex items-center justify-between rounded-[8px] mb-6">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-blue-600" />
              <p className="text-[#211C4DCC] text-[16px] font-[500]">
                {t("Notifications")}
                {unreadCount > 0 && (
                  <span className="mr-3 text-sm bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {unreadCount} {t("unread")}
                  </span>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            {notifications.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={isLoading || notifications.filter(n => !n.read_at).length === 0}
                  className="px-4 py-2 text-sm bg-green-100 text-green-700 border border-green-300 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  <CheckCircle size={16} />
                  {t("MarkAllAsRead")}
                </button>
                
                <button
                  onClick={handleClearAllNotifications}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  <XCircle size={16} />
                  {t("ClearAll")}
                </button>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-[#211C4DCC] mt-4">{t("LoadingNotifications")}</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">{t("ErrorLoadingNotifications")}</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchNotifications}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                {t("TryAgain")}
              </button>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                <Bell className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{t("NoNotifications")}</h3>
              <p className="text-gray-500 max-w-md mx-auto">{t("NoNotificationsDescription")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-6 rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md ${
                    notif.read_at
                      ? "bg-gray-50 border-gray-200"
                      : "bg-blue-50 border-blue-200 hover:bg-blue-100"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      {/* Notification Header */}
                      <div className="flex items-center gap-2 mb-3">
                        {!notif.read_at && (
                          <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                        )}
                        <h3 className="font-semibold text-lg text-gray-800">
                          {notif.data?.title || t("NewNotification")}
                        </h3>
                        {notif.data?.status && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            notif.data.status === "success" 
                              ? "bg-green-100 text-green-800"
                              : notif.data.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {notif.data.status}
                          </span>
                        )}
                      </div>

                      {/* Notification Body */}
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {notif.data?.message || notif.type}
                      </p>

                      {/* Order Details */}
                      {notif.data?.order_number && (
                        <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {notif.data.order_id && (
                              <div>
                                <span className="text-sm text-gray-500">{t("OrderID")}:</span>
                                <span className="text-sm font-medium mr-2">#{notif.data.order_id}</span>
                              </div>
                            )}
                            {notif.data.order_number && (
                              <div>
                                <span className="text-sm text-gray-500">{t("OrderNumber")}:</span>
                                <span className="text-sm font-medium mr-2">{notif.data.order_number}</span>
                              </div>
                            )}
                            {notif.data.type && (
                              <div>
                                <span className="text-sm text-gray-500">{t("Type")}:</span>
                                <span className="text-sm font-medium mr-2">{notif.data.type}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Notification Footer */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div className="text-xs text-gray-500">
                          {new Date(notif.created_at).toLocaleString(lang === "ar" ? "ar-EG" : "en-US", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!notif.read_at && (
                            <button
                              onClick={() => handleMarkAsRead(notif.id)}
                              className="text-xs px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Check size={14} />
                              {t("MarkAsRead")}
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDeleteNotification(notif.id)}
                            className="text-xs px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            {t("Delete")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Summary */}
          {notifications.length > 0 && !isLoading && !error && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
                  <div className="text-sm text-gray-600">{t("TotalNotifications")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {notifications.filter(n => n.read_at).length}
                  </div>
                  <div className="text-sm text-gray-600">{t("ReadNotifications")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {notifications.filter(n => !n.read_at).length}
                  </div>
                  <div className="text-sm text-gray-600">{t("UnreadNotifications")}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {notifications.length > 0 
                      ? new Date(notifications[0].created_at).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")
                      : "-"
                    }
                  </div>
                  <div className="text-sm text-gray-600">{t("LatestNotification")}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;