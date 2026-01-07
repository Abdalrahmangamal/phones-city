import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function Contactform() {
  const { t } = useTranslation();
  const { lang } = useLangSync();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear messages when user starts typing
    if (successMessage) setSuccessMessage("");
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        `${baseUrl}api/v1/tickets`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Ticket submitted successfully:", response.data);
      setSuccessMessage("تم إرسال التذكرة بنجاح!");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error submitting ticket:", error);
      setErrorMessage(
        error?.response?.data?.message || "حدث خطأ أثناء إرسال التذكرة. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full bg-white py-10 md:p-4 h-full md:px-16 font-sans lg:px-[90px] px-2 pt-20 md:pt-0"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* العنوان */}
      <h2 className="text-[#211C4D] my-9 mx-[30px] md:mx-0 text-[40px] font-[700] mb-8 relative w-fit">
        {t("SendNote")}
      </h2>

      {/* المحتوى */}
      <div className="flex flex-col justify-between md:flex-row gap-[80px]">
        {/* نموذج التواصل */}
        <form onSubmit={handleSubmit} className="bg-white md:w-[800px] p-[40px]  h-[450px] rounded-xl shadow-[0px_1px_13px_0px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("Name")}
              className="border-none h-[50px] bg-[#F5F5F5] rounded-[4px] p-3 transition-all duration-300 ease-in-out focus:bg-white focus:ring-2 focus:ring-[#211C4D] hover:scale-[1.02]"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("Email")}
              className="border-none h-[50px] bg-[#F5F5F5] rounded-[4px] p-3 transition-all duration-300 ease-in-out focus:bg-white focus:ring-2 focus:ring-[#211C4D] hover:scale-[1.02]"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("PhoneNumber")}
              className="border-none h-[50px] col-span-2 md:col-span-1 bg-[#F5F5F5] rounded-[4px] p-3 transition-all duration-300 ease-in-out focus:bg-white focus:ring-2 focus:ring-[#211C4D] hover:scale-[1.02]"
              required
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t("YourMessage")}
            className="border-none h-[200px] w-full bg-[#F5F5F5] rounded-[4px] p-3 transition-all duration-300 ease-in-out focus:bg-white focus:ring-2 focus:ring-[#211C4D] hover:scale-[1.01]"
            required
          ></textarea>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#F3AC5D] mt-[30px] w-[136px] h-[56px] text-white px-6 py-2 rounded-[16px] transition-all duration-300 ease-in-out hover:bg-[#e29b4a] hover:scale-[1.05] focus:ring-4 focus:ring-[#F3AC5D]/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "جاري الإرسال..." : t("Submit")}
          </button>
        </form>

        {/* بيانات التواصل */}
        <div className="bg-white p-9 md:w-[35%] w-full rounded-xl shadow-[0px_1px_13px_0px_rgba(0,0,0,0.05)]">
          <div className="flex mt-[20px] items-center gap-3 mb-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="20" fill="#F3AC5D" />
              <path
                d="M18.5542 14.241L15.1712 10.336C14.7812 9.88601 14.0662 9.88801 13.6132 10.342L10.8312 13.129C10.0032 13.958 9.76623 15.189 10.2452 16.176C13.1069 22.101 17.8853 26.8861 23.8062 29.756C24.7922 30.235 26.0222 29.998 26.8502 29.169L29.6582 26.356C30.1132 25.901 30.1142 25.182 29.6602 24.792L25.7402 21.427C25.3302 21.075 24.6932 21.121 24.2822 21.533L22.9182 22.899C22.8484 22.9722 22.7565 23.0204 22.6566 23.0363C22.5567 23.0522 22.4543 23.0349 22.3652 22.987C20.1357 21.7031 18.2862 19.8512 17.0052 17.62C16.9573 17.5308 16.9399 17.4282 16.9558 17.3282C16.9717 17.2281 17.02 17.136 17.0932 17.066L18.4532 15.705C18.8652 15.291 18.9102 14.651 18.5542 14.24V14.241Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h3 className="font-[500] text-[#000000] text-[24px]">
              {t("Contactinformation")}
            </h3>
          </div>
          <p className="text-[#000000] font-[400] mt-[30px] text-[16px] mb-2">
           {t("Weareavailable24hoursaday7daysaweek")}
          </p>
          <p className="text-[#000000] font-[400] text-[16px] mb-4">
            {t("PhoneNumber")}: +2222222222
          </p>
          <hr className="h-[1px] my-[35px] bg-black text-black" />
          <div className="flex items-center gap-3 mb-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="20" fill="#F3AC5D" />
              <path
                d="M10 13L20 20L30 13M10 27H30V13H10V27Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h3 className="font-[500] text-[black] text-[24px]">
              {t("Sendtothephonecity")}
            </h3>
          </div>
          <p className="text-black font-[400] mt-[30px] text-[16px] mb-1">
           {t("Fillouttheformandwewillcontactyouwithin24hours")}
          </p>
          <div className="flex items-center gap-2 mt-[20px]">
            <p className="text-black font-[400] text-[16px]">
              {t("Email")}:
            </p>
            <p className="text-black font-[400] text-[16px]">
              PHONECITY@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}