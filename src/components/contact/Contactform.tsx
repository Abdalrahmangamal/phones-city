import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";
import { useState } from "react";
import axiosClient from "@/api/axiosClient";
import { toast } from "react-toastify";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  general?: string;
}

export default function Contactform() {
  const { t } = useTranslation();
  const { lang } = useLangSync();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // التحقق على العميل قبل الإرسال
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = t("Name is required") || "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = t("Email is required") || "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("Please enter a valid email address") || "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = t("Phone number is required") || "Phone number is required";
    } else if (!/^[\+]?[0-9\s\-\(\)]+$/.test(formData.phone)) {
      errors.phone = t("Please enter a valid phone number") || "Please enter a valid phone number";
    }
    
    if (!formData.message.trim()) {
      errors.message = t("Message is required") || "Message is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // مسح خطأ الحقل عند البدء بالكتابة
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق على العميل أولاً
    if (!validateForm()) {
      toast.error(t("Please correct the errors in the form") || "Please correct the errors in the form");
      return;
    }

    setIsSubmitting(true);
    setValidationErrors({}); // مسح الأخطاء السابقة

    try {
      const response = await axiosClient.post("/api/v1/contact", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim()
      });
      
      if (response.data.status) {
        toast.success(t("Message sent successfully") || "Message sent successfully");
        // إعادة تعيين النموذج
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        toast.error(response.data.message || t("Failed to send message") || "Failed to send message");
      }
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      
      if (error.response) {
        // خطأ من الخادم (مثل 422 للتحقق)
        const responseData = error.response.data;
        
        if (error.response.status === 422 && responseData.errors) {
          // أخطاء التحقق من الخادم
          const serverErrors: ValidationErrors = {};
          
          if (responseData.errors.name) {
            serverErrors.name = Array.isArray(responseData.errors.name) 
              ? responseData.errors.name[0] 
              : responseData.errors.name;
          }
          
          if (responseData.errors.email) {
            serverErrors.email = Array.isArray(responseData.errors.email) 
              ? responseData.errors.email[0] 
              : responseData.errors.email;
          }
          
          if (responseData.errors.phone) {
            serverErrors.phone = Array.isArray(responseData.errors.phone) 
              ? responseData.errors.phone[0] 
              : responseData.errors.phone;
          }
          
          if (responseData.errors.message) {
            serverErrors.message = Array.isArray(responseData.errors.message) 
              ? responseData.errors.message[0] 
              : responseData.errors.message;
          }
          
          setValidationErrors(serverErrors);
          
          // عرض رسالة عامة
          toast.error(t("Please correct the errors in the form") || "Please correct the errors in the form");
        } else if (responseData.message) {
          // خطأ عام من الخادم
          toast.error(responseData.message);
        } else {
          toast.error(t("Server error. Please try again later.") || "Server error. Please try again later.");
        }
      } else if (error.request) {
        // لم يتم استلام رد من الخادم
        toast.error(t("Network error. Please check your connection and try again.") || "Network error. Please check your connection and try again.");
      } else {
        // خطأ آخر
        toast.error(t("Something went wrong. Please try again.") || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // دالة للحصول على class name للحقل بناءً على وجود خطأ
  const getInputClassName = (fieldName: keyof ValidationErrors) => {
    const baseClass = "border-none h-[50px] bg-[#F5F5F5] rounded-[4px] p-3 transition-all duration-300 ease-in-out focus:bg-white hover:scale-[1.02] w-full";
    const errorClass = validationErrors[fieldName] 
      ? "ring-2 ring-red-500 bg-red-50 focus:ring-red-500" 
      : "focus:ring-2 focus:ring-[#211C4D]";
    
    return `${baseClass} ${errorClass}`;
  };

  // دالة للحصول على class name لـ textarea
  const getTextareaClassName = () => {
    const baseClass = "border-none h-[200px] w-full bg-[#F5F5F5] rounded-[4px] p-3 transition-all duration-300 ease-in-out focus:bg-white hover:scale-[1.01]";
    const errorClass = validationErrors.message 
      ? "ring-2 ring-red-500 bg-red-50 focus:ring-red-500" 
      : "focus:ring-2 focus:ring-[#211C4D]";
    
    return `${baseClass} ${errorClass}`;
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
        <form onSubmit={handleSubmit} className="bg-white md:w-[800px] p-[40px] h-auto rounded-xl shadow-[0px_1px_13px_0px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t("Name")}
                className={getInputClassName("name")}
                required
                disabled={isSubmitting}
              />
              {validationErrors.name && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
              )}
            </div>
            
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("Email")}
                className={getInputClassName("email")}
                required
                disabled={isSubmitting}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
              )}
            </div>
            
            <div className="flex flex-col col-span-2 md:col-span-1">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t("PhoneNumber")}
                className={getInputClassName("phone")}
                required
                disabled={isSubmitting}
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t("YourMessage")}
              className={getTextareaClassName()}
              required
              disabled={isSubmitting}
            ></textarea>
            {validationErrors.message && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#F3AC5D] mt-[30px] w-[136px] h-[56px] text-white px-6 py-2 rounded-[16px] transition-all duration-300 ease-in-out hover:bg-[#e29b4a] hover:scale-[1.05] focus:ring-4 focus:ring-[#F3AC5D]/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t("Sending")}
              </span>
            ) : (
              t("Submit")
            )}
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
            نحن متاحون على مدار 24 ساعة طوال الأسبوع.
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
            املأ النموذج وسنتواصل معك خلال 24 ساعة.
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