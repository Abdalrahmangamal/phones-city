import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAddressStore from "@/store/profile/addressStore";
import { toast, ToastContainer } from "react-toastify";
import { useLangSync } from "@/hooks/useLangSync";
import SaudiNationalAddressForm from "@/components/checkout/address/SaudiNationalAddressForm";
import ShortNationalAddressField from "@/components/checkout/address/ShortNationalAddressField";

interface AddressFormData {
  first_name: string;
  last_name: string;
  // Saudi National Address Fields
  building_number: string;
  street_name: string;
  district: string;
  city_id: string;
  postal_code: string;
  additional_number?: string;
  national_address: string; // العنوان الوطني - مطلوب
  country: string;
  // Short National Address
  short_national_address?: string;
  // Contact Info
  phone: string;
  email: string;
  label: string;
}

export default function Singleaddress() {
  const { t, i18n } = useTranslation();
  const { lang } = useLangSync();
  const isRTL = i18n.language === "ar";

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
    watch,
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

  const onSubmit = async (data: AddressFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Format full street address from national address fields
      const streetAddress = [
        data.building_number,
        data.street_name,
        data.district,
        data.postal_code,
        data.additional_number
      ]
        .filter(Boolean)
        .join(" - ");

      // تحويل البيانات إلى الشكل المطلوب من الـAPI
      const addressData = {
        first_name: data.first_name,
        last_name: data.last_name,
        street_address: streetAddress,
        // Saudi National Address fields
        building_number: data.building_number,
        street_name: data.street_name,
        district: data.district,
        postal_code: data.postal_code,
        additional_number: data.additional_number || null,
        national_address: data.national_address, // العنوان الوطني - مطلوب
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
          dir={isRTL ? "rtl" : "ltr"}
          className="w-full max-w-5xl mx-auto p-6 md:p-10 rounded-2xl mt-10"
        >
          <h2 className={`text-[#211C4D] text-[24px] font-semibold mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("Address Details")}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* الاسم الأول */}
              <div>
                <label className="block text-[#211C4D] mb-2 text-[15px] font-medium">
                  {t("First Name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("First Name")}
                  className={`w-full bg-[#F6F6F6] rounded-lg px-4 py-3 text-[#211C4D] focus:outline-none transition-all duration-200 ${errors.first_name
                    ? "border-2 border-red-500"
                    : "focus:ring-2 focus:ring-[#F3AC5D] border border-transparent"
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
                  <p className="mt-1.5 text-red-500 text-sm flex items-center gap-1">
                    <span>⚠</span> {errors.first_name.message}
                  </p>
                )}
              </div>

              {/* الاسم الثاني */}
              <div>
                <label className="block text-[#211C4D] mb-2 text-[15px] font-medium">
                  {t("Last Name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("Last Name")}
                  className={`w-full bg-[#F6F6F6] rounded-lg px-4 py-3 text-[#211C4D] focus:outline-none transition-all duration-200 ${errors.last_name
                    ? "border-2 border-red-500"
                    : "focus:ring-2 focus:ring-[#F3AC5D] border border-transparent"
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
                  <p className="mt-1.5 text-red-500 text-sm flex items-center gap-1">
                    <span>⚠</span> {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Saudi National Address Form */}
            <SaudiNationalAddressForm
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              cities={cities.map((city) => ({ id: city.id, name: city.name }))}
              isLoading={loading}
            />

            {/* Short National Address Field */}
            <ShortNationalAddressField
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />

            {/* Contact Information */}
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-[#211C4D] to-[#3D3685] rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">📞</span>
                </div>
                <div>
                  <h3 className="text-[#211C4D] text-xl font-bold">
                    {t("Contactinformation")}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* الهاتف */}
                <div>
                  <label className="block text-[#211C4D] mb-2 text-[15px] font-medium">
                    {t("Phone")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+966 5XX XXX XXXX"
                    className={`w-full bg-[#F6F6F6] rounded-lg px-4 py-3 text-[#211C4D] focus:outline-none transition-all duration-200 ${errors.phone
                      ? "border-2 border-red-500"
                      : "focus:ring-2 focus:ring-[#F3AC5D] border border-transparent"
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
                    <p className="mt-1.5 text-red-500 text-sm flex items-center gap-1">
                      <span>⚠</span> {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* البريد الإلكتروني */}
                <div>
                  <label className="block text-[#211C4D] mb-2 text-[15px] font-medium">
                    {t("Email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className={`w-full bg-[#F6F6F6] rounded-lg px-4 py-3 text-[#211C4D] focus:outline-none transition-all duration-200 ${errors.email
                      ? "border-2 border-red-500"
                      : "focus:ring-2 focus:ring-[#F3AC5D] border border-transparent"
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
                    <p className="mt-1.5 text-red-500 text-sm flex items-center gap-1">
                      <span>⚠</span> {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
              <h3 className="text-[#211C4D] text-xl font-bold mb-4">
                {t("Additional Information")}
              </h3>
              <div>
                <label className="block text-[#211C4D] mb-2 text-[15px] font-medium">
                  {t("Save address as (optional)")}
                </label>
                <input
                  type="text"
                  placeholder={t("Home, Work, etc.")}
                  className="w-full bg-[#F6F6F6] rounded-lg px-4 py-3 text-[#211C4D] focus:outline-none focus:ring-2 focus:ring-[#F3AC5D] border border-transparent transition-all duration-200"
                  {...register("label")}
                />
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full md:w-[45%] bg-gradient-to-r from-[#F3AC5D] to-[#FF7B54] text-white py-4 rounded-xl text-xl font-semibold hover:from-[#FF7B54] hover:to-[#F3AC5D] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading || isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    {t("Saving...")}
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    {t("Save Address")}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full md:w-[45%] bg-[#211C4D] text-white py-4 rounded-xl text-xl font-semibold hover:bg-[#2A2460] transition-all"
              >
                {t("Cancel")}
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}
