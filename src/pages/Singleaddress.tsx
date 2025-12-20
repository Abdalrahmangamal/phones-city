import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAddressStore from "@/store/profile/addressStore";
import { toast, ToastContainer } from "react-toastify";
import { useLangSync } from "@/hooks/useLangSync";

interface AddressFormData {
  first_name: string;
  last_name: string;
  street_address: string;
  city_id: string;
  country: string;
  phone: string;
  email: string;
  label: string;
}

export default function Singleaddress() {
  const { t, i18n } = useTranslation();
  const { lang } = useLangSync();

  const navigate = useNavigate();
  const { addAddress, loading, error, setError, fetchCities, cities } =
    useAddressStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AddressFormData>({
    defaultValues: {
      country: "المملكة العربية السعودية",
      label: "",
    },
  });

  // تعيين القيم الافتراضية عند التحميل
  useEffect(() => {
    setValue("country", "المملكة العربية السعودية");
    fetchCities(lang);
  }, [setValue, lang]);
  console.log("citiessssssssssssss", cities);

  const onSubmit = async (data: AddressFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // تحويل البيانات إلى الشكل المطلوب من الـAPI
      const addressData = {
        first_name: data.first_name,
        last_name: data.last_name,
        street_address: data.street_address,
        city_id: data.city_id,
        country: data.country,
        phone: data.phone,
        email: data.email,
        label: data.label || null,
      };

      await addAddress(addressData);

      // عرض رسالة النجاح
      toast.success(
        i18n.language === "ar"
          ? "تم إضافة العنوان بنجاح"
          : "Address added successfully",
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

      reset();

      // الانتقال إلى صفحة العناوين بعد ثانية ونصف (لإعطاء وقت لعرض الـ toast)
      setTimeout(() => {
        navigate("/address");
      }, 1500);
    } catch (err: any) {
      console.error("Error adding address:", err);
      setError(err.response?.data?.message || t("Failed to add address"));

      // عرض رسالة الخطأ
      toast.error(err.response?.data?.message || t("Failed to add address"), {
        position: i18n.language === "ar" ? "top-center" : "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: i18n.language === "ar",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/address");
  };

  return (
    <div>
      <Layout>
        {/* Toast Container */}
        <ToastContainer
          position={i18n.language === "ar" ? "top-center" : "top-center"}
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

        <div
          dir="rtl"
          className="w-full max-w-5xl mx-auto p-10 rounded-2xl mt-10"
        >
          <h2 className="text-[#211C4D] text-[24px] font-semibold mb-8 text-right">
            {t("Address Details")}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
          >
            {/* الاسم الأول */}
            <div>
              <label className="block text-[#211C4D] mb-2 text-[15px]">
                {t("First Name")}
              </label>
              <input
                type="text"
                placeholder={t("First Name")}
                className={`w-full bg-[#F6F6F6] rounded-[4px] px-4 py-3 text-[#211C4D] focus:outline-none ${
                  errors.first_name
                    ? "border border-red-500"
                    : "focus:ring-2 focus:ring-[#F3AC5D]"
                }`}
                {...register("first_name", {
                  required: t("First name is required"),
                  minLength: {
                    value: 2,
                    message: t("First name must be at least 2 characters"),
                  },
                })}
              />
              {errors.first_name && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* الاسم الثاني */}
            <div>
              <label className="block text-[#211C4D] mb-2 text-[15px]">
                {t("Last Name")}
              </label>
              <input
                type="text"
                placeholder={t("Last Name")}
                className={`w-full bg-[#F6F6F6] rounded-[4px] px-4 py-3 text-[#211C4D] focus:outline-none ${
                  errors.last_name
                    ? "border border-red-500"
                    : "focus:ring-2 focus:ring-[#F3AC5D]"
                }`}
                {...register("last_name", {
                  required: t("Last name is required"),
                  minLength: {
                    value: 2,
                    message: t("Last name must be at least 2 characters"),
                  },
                })}
              />
              {errors.last_name && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            {/* الدولة / المنطقة */}
            <div className="md:col-span-2">
              <p className="block text-[#211C4D] mb-2 text-[15px]">
                {t("Country / Region")}
              </p>
              <p className="text-[#211C4D] text-[16px] font-[700]">
                المملكة العربية السعودية
              </p>
              <input type="hidden" {...register("country")} />
            </div>

            {/* عنوان الشارع */}
            <div>
              <label className="block text-[#211C4D] mb-2 text-[15px]">
                {t("Street Address / District")}
              </label>
              <input
                type="text"
                placeholder={t("Street Address")}
                className={`w-full bg-[#F6F6F6] rounded-[4px] px-4 py-3 text-[#211C4D] focus:outline-none ${
                  errors.street_address
                    ? "border border-red-500"
                    : "focus:ring-2 focus:ring-[#F3AC5D]"
                }`}
                {...register("street_address", {
                  required: t("Street address is required"),
                  minLength: {
                    value: 5,
                    message: t("Address must be at least 5 characters"),
                  },
                })}
              />
              {errors.street_address && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.street_address.message}
                </p>
              )}
            </div>

            {/* المدينة */}
            <div className="w-full">
              <label
                htmlFor="city_id"
                className="block text-[#211C4D] font-medium mb-2 text-[15px]"
              >
                {t("city_id")}
              </label>
              <div className="relative">
                <select
                  id="city_id"
                  className={`w-full appearance-none bg-[#F6F6F6] text-[#747783] text-[15px] rounded-lg px-4 py-3 pr-10 border ${
                    errors.city_id ? "border-red-500" : "border-transparent"
                  } focus:outline-none focus:border-[#F3AC5D] focus:ring-2 focus:ring-[#F3AC5D]/40 transition duration-200 ease-in-out cursor-pointer`}
                  {...register("city_id", {
                    required: t("city_id is required"),
                    validate: (value) =>
                      value !== "" || t("Please select a city_id"),
                  })}
                >
                  {cities.map((city_id) => (
                    <option key={city_id.id} value={city_id.id}>
                      {city_id.name}
                    </option>
                  ))}
                </select>

                <svg
                  className="absolute top-1/2 left-3 w-4 h-4 text-[#747783] transform -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </div>
              {errors.city_id && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.city_id.message}
                </p>
              )}
            </div>

            {/* الهاتف */}
            <div>
              <label className="block text-[#211C4D] mb-2 text-[15px]">
                {t("Phone")}
              </label>
              <input
                type="tel"
                placeholder="+966"
                className={`w-full bg-[#F6F6F6] rounded-[4px] px-4 py-3 text-[#211C4D] focus:outline-none ${
                  errors.phone
                    ? "border border-red-500"
                    : "focus:ring-2 focus:ring-[#F3AC5D]"
                }`}
                {...register("phone", {
                  required: t("Phone number is required"),
                  pattern: {
                    value: /^[+]?[0-9\s\-\(\)]{10,}$/,
                    message: t("Please enter a valid phone number"),
                  },
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* البريد الإلكتروني */}
            <div>
              <label className="block text-[#211C4D] mb-2 text-[15px]">
                {t("Email")}
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className={`w-full bg-[#F6F6F6] rounded-[4px] px-4 py-3 text-[#211C4D] focus:outline-none ${
                  errors.email
                    ? "border border-red-500"
                    : "focus:ring-2 focus:ring-[#F3AC5D]"
                }`}
                {...register("email", {
                  required: t("Email is required"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("Please enter a valid email address"),
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </form>

          {/* معلومات إضافية */}
          <h3 className="text-[#211C4D] text-[24px] font-semibold mt-10 mb-4">
            {t("Additional Information")}
          </h3>
          <div className="mb-10">
            <label className="block text-[#211C4D] mb-2 text-[15px]">
              {t("Save address as (optional)")}
            </label>
            <input
              type="text"
              placeholder={t("Home, Work, etc.")}
              className="w-full bg-[#F6F6F6] rounded-[4px] px-4 py-3 text-[#211C4D] focus:outline-none focus:ring-2 focus:ring-[#F3AC5D]"
              {...register("label")}
            />
          </div>

          {/* الأزرار */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={loading || isSubmitting}
              className="w-full md:w-[40%] bg-[#F3AC5D] text-white py-3 rounded-lg text-[24px] font-semibold hover:opacity_id-90 disabled:opacity_id-50 disabled:cursor-not-allowed"
            >
              {loading || isSubmitting ? t("Saving...") : t("Save Address")}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full md:w-[40%] bg-[#211C4D] text-white py-3 rounded-lg text-[24px] font-semibold hover:opacity_id-90"
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
