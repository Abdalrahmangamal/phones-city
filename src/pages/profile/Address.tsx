import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { useEffect, useState } from "react";
import edit from "@/assets/images/aedit.png";
import close from "@/assets/images/Close.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAddressStore from "@/store/profile/addressStore";
import { toast, ToastContainer } from "react-toastify";


export default function Address() {
  const { t, i18n } = useTranslation();
  
  // استخدام الـ store
  const {
    addresses,
    selectedAddressId,
    loading,
    error,
    fetchAddresses,
    deleteAddress,
    selectAddress,
    getSelectedAddress,
    setError
  } = useAddressStore();

  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);
console.log(addresses)
  const handleDelete = async (id: number) => {
    // عرض toast.
    toast(
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-lg">
          {i18n.language === "ar" 
            ? "هل أنت متأكد أنك تريد حذف هذا العنوان؟" 
            : "Are you sure you want to delete this address?"}
        </p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss();
              confirmDelete(id);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            {i18n.language === "ar" ? "حذف" : "Delete"}
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            {i18n.language === "ar" ? "إلغاء" : "Cancel"}
          </button>
        </div>
      </div>,
      {
        position: i18n.language === "ar" ? "top-center" : "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        rtl: i18n.language === "ar",
        className: "!rounded-xl !p-4",
      }
    );
  };

  const confirmDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteAddress(id);
      
      // عرض رسالة نجاح
      toast.success(
        i18n.language === "ar" 
          ? "تم حذف العنوان بنجاح" 
          : "Address deleted successfully",
        {
          position: i18n.language === "ar" ? "top-center" : "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          rtl: i18n.language === "ar",
        }
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete address");
      
      // عرض رسالة خطأ
      toast.error(
        err.response?.data?.message || t("Failed to delete address"),
        {
          position: i18n.language === "ar" ? "top-center" : "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          rtl: i18n.language === "ar",
        }
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatAddressDetails = (address: typeof addresses[0]) => {
    return `${address.city}, ${address.country}`;
  };

  // عرض حالة التحميل
  if (loading) {
    return (
      <Layout>
        <ToastContainer
          position={i18n.language === "ar" ? "top-left" : "top-right"}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={i18n.language === "ar"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[883px] w-full">
            <p className="text-[20px] text-[#211C4D] font-[600]">{t("Address")}</p>
            <div className="w-full mt-10 flex justify-center">
              <p className="text-gray-600">{t("Loading...")}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // عرض حالة الخطأ
  if (error) {
    return (
      <Layout>
        <ToastContainer
          position={i18n.language === "ar" ? "top-left" : "top-right"}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={i18n.language === "ar"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[883px] w-full">
            <p className="text-[20px] text-[#211C4D] font-[600]">{t("Address")}</p>
            <div className="w-full mt-10">
              <p className="text-red-500 text-center">{error}</p>
              <button 
                onClick={() => fetchAddresses()}
                className="mt-4 mx-auto block bg-[#211C4D] text-white px-4 py-2 rounded hover:opacity-90"
              >
                {t("Retry")}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div>
      <Layout>
        {/* Toast Container */}
        <ToastContainer
          position={i18n.language === "ar" ? "top-left" : "top-right"}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={i18n.language === "ar"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[883px] w-full">
            <p className="text-[20px] text-[#211C4D] font-[600]">{t("Address")}</p>
            <div className="w-full mt-10">
              {addresses.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-600">{t("No addresses found")}</p>
                  <Link
                    to="/singleaddress"
                    className="text-[#211C4D] underline mt-4 inline-block hover:opacity-80"
                  >
                    {t("Add your first address")}
                  </Link>
                </div>
              ) : (
                <>
                  {addresses.map((item) => (
                    <div
                      key={item.id}
                      className={`flex justify-between my-12 items-center bg-[#F7F7F7] rounded-xl p-5 mb-4 relative transition-all duration-300 ${
                        selectedAddressId === item.id
                          ? "border border-[#211C4D] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                          : "border border-transparent"
                      }`}
                    >
                      {/* Right Side (Address Info) */}
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-3">
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddressId === item.id}
                            onChange={() => selectAddress(item.id)}
                            className="relative w-5 h-5 cursor-pointer appearance-none border-2 border-[#F3AC5D] rounded-full bg-white checked:border-[#F3AC5D] checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-2.5 checked:after:h-2.5 checked:after:rounded-full checked:after:bg-[#F3AC5D]"
                          />

                          <p className="font-semibold text-[#211C4D] text-[17px]">
                            {item.street_address}
                          </p>
                          {item.label && (
                            <span
                              className={`text-white text-[13px] rounded-md px-3 py-1 ${
                                item.label.toLowerCase() === "home" || item.label.toLowerCase() === "المنزل"
                                  ? "bg-[#F4B740]"
                                  : "bg-[#F3AC5D]"
                              }`}
                            >
                              {item.label}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-[15px] mt-2">
                          {item.first_name} {item.last_name}
                        </p>
                        <p className="text-gray-600 text-[15px] mt-1">
                          {formatAddressDetails(item)}
                        </p>
                        <p className="text-gray-600 text-[15px] mt-1">
                          {item.phone}
                        </p>
                        <p className="text-gray-600 text-[15px] mt-1">
                          {item.email}
                        </p>
                      </div>
                      {/* Left Side (Edit + Delete) */}
                      <div className="flex h-full items-center gap-3">
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className={`text-gray-500 hover:text-red-600 text-xl transition ${
                            deletingId === item.id ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          title={t("Delete")}
                        >
                          <img src={close} alt={t("Delete")} />
                          {deletingId === item.id && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                          )}
                        </button>
                        <Link
                          to={`/edit-address/${item.id}`}
                          className="text-gray-500 hover:text-[#211C4D] text-xl transition"
                          title={t("Edit")}
                        >
                          <img src={edit} alt={t("Edit")} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Add New Address */}
              <div className="w-full flex flex-col items-center mt-15">
                <div className="relative w-full flex items-center justify-center">
                  <div className="border-t border-dashed border-gray-300 w-full"></div>
                  <div className="absolute bg-white rounded-full flex items-center justify-center w-6 h-6 border border-gray-300">
                    <span className="bg-[#211C4D] text-white rounded-full w-5 h-5 flex items-center justify-center text-[16px] leading-none">
                      +
                    </span>
                  </div>
                </div>

                <Link
                  className="mt-3 text-[#211C4D] text-[14px] font-medium hover:opacity-80"
                  to="/singleaddress"
                >
                  {t("Addanewtitle")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}