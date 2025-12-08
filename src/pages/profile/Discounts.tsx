import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { useEffect } from "react";
import content_copy from "@/assets/images/content_copy.png";
import { useTranslation } from "react-i18next";
import { useDiscountStore } from "@/store/profile/discountsStore";

export default function Discounts() {
  const { t } = useTranslation();
  
  // Get state and actions from the store
  const {
    discounts,
    loading,
    error,
    copiedId,
    pagination,
    fetchDiscounts,
    setCopiedId,
    clearError
  } = useDiscountStore();

  // Fetch discounts on component mount
  useEffect(() => {
    fetchDiscounts();
    // Clear error on unmount
    return () => {
      clearError();
    };
  }, [fetchDiscounts, clearError]);

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleRefresh = () => {
    fetchDiscounts();
  };

  const handleNextPage = () => {
    if (pagination && pagination.current_page < pagination.last_page) {
      fetchDiscounts(pagination.current_page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination && pagination.current_page > 1) {
      fetchDiscounts(pagination.current_page - 1);
    }
  };

  // Loading state
  if (loading && discounts.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[883px] w-full">
            <section className="w-full flex flex-col items-start px-4 py-10">
              <h2 className="text-[#211C4D] text-[20px] font-[600] mb-6">
                {t("Discounts")}
              </h2>
              <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">جاري تحميل الخصومات...</div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div>
      <Layout>
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[883px] w-full">
            <section className="w-full flex flex-col items-start px-4 py-10">
              <div className="flex justify-between items-center w-full mb-6">
                <h2 className="text-[#211C4D] text-[20px] font-[600]">
                  {t("Discounts")}
                </h2>
                
                {!loading && (
                  <button
                    onClick={handleRefresh}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    disabled={loading}
                  >
                    {loading ? "جاري التحديث..." : "تحديث"}
                  </button>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 w-full">
                  <div className="flex justify-between items-center">
                    <span>{error}</span>
                    <button
                      onClick={() => clearError()}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {discounts.length === 0 && !loading ? (
                <div className="w-full text-center py-10">
                  <p className="text-gray-500">لا توجد خصومات متاحة حالياً</p>
                  <button
                    onClick={handleRefresh}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    تحديث
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
                    {discounts.map((item) => (
                      <div
                        key={item.id}
                        dir="rtl"
                        className="border border-[#E0E0E0] rounded-lg p-5 text-right shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex flex-col justify-between h-full">
                          <div>
                            <h3 className="text-[#211C4D] text-[28px] font-[700] ">
                              {item.discount_value || item.discount || "خصم"} خصم
                            </h3>
                            <p className="text-[#211C4D] text-[16px] font-[600] mt-1">
                              {item.title || item.description || "خصم خاص"}
                            </p>
                            <div className="flex items-center justify-between gap-2 mt-10">
                              <span className="text-[#F3AC5D] font-medium text-sm">
                                كود: {item.code}
                              </span>
                              <button
                                onClick={() => handleCopy(item.code, item.id)}
                                className="flex items-center gap-1 text-[#211C4D] text-sm hover:opacity-70 transition-all"
                                disabled={copiedId === item.id}
                              >
                                <span className="text-[12px] font-[600] text-[#001246]">
                                  {copiedId === item.id ? "تم النسخ!" : "نسخ"}
                                </span>
                                <img src={content_copy} alt="نسخ" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-4 text-[13px] text-[#7B7B93] leading-6 space-y-1">
                            <p>تاريخ الصلاحية.</p>
                            <ul className="list-disc mb-6 pr-4 space-y-1">
                              <li>
                                {item.valid_from && item.valid_to
                                  ? `${new Date(item.valid_from).toLocaleDateString('ar-SA')} – ${new Date(item.valid_to).toLocaleDateString('ar-SA')}`
                                  : "04:00 05/08/2021 – 12:00 09/08/2021"}
                              </li>
                              <li>
                                {item.applicable_products || "لكل المنتجات."}
                              </li>
                              <li>
                                {item.conditions ||
                                  "التركيبات: احصل على خصم 20% عند إنفاق أكثر من 169.00 رس، أو احصل على خصم 15% عند إنفاق أكثر من 89.00 رس."}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {pagination && pagination.last_page > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8 w-full">
                      <button
                        onClick={handlePrevPage}
                        disabled={pagination.current_page === 1 || loading}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                      >
                        السابق
                      </button>
                      
                      <span className="text-gray-600">
                        الصفحة {pagination.current_page} من {pagination.last_page}
                      </span>
                      
                      <button
                        onClick={handleNextPage}
                        disabled={pagination.current_page === pagination.last_page || loading}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                      >
                        التالي
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </Layout>
    </div>
  );
}