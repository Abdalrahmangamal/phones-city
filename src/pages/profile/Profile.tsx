import { useEffect, useState } from "react";
import Layout from "@/components/layout/layout";
import Sidebar from "@/components/layout/Sidebar";
import { useTranslation } from "react-i18next";
import { useProfileStore } from "@/store/profile/profileStore";
import axiosClient from "@/api/axiosClient";

import user from "@/assets/images/User.png";

import call from "@/assets/images/call-calling.png";
import sms from "@/assets/images/sms.png";
import home from "@/assets/images/home-2.png";
import key from "@/assets/images/key.png";
import { usePageStore } from '@/store/customerCareStore';
import FeaturedHeroSection from "@/components/home/FeaturedHeroSection";
import Loader from '@/components/Loader'
import { useLangSync } from "@/hooks/useLangSync";

export default function Profile() {
  const { t } = useTranslation();
  const { lang } = useLangSync();
  const { profile, isLoading, error, fetchProfile, updateProfile } = useProfileStore();
  const { fetchPage, getPage, isLoading: isPageLoading } = usePageStore();
  const page = getPage("profilepagebaner", lang);
  const pageLoading = isPageLoading("profilepagebaner", lang);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({ ...formData });
  
  // States لتغيير كلمة المرور
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    password_confirmation: ""
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
    // Fetch banner data from backend
    fetchPage("profilepagebaner", lang);
  }, [lang, fetchProfile, fetchPage]);

  // Update form data when profile is loaded
  useEffect(() => {
    if (profile) {
      console.log('🔄 تحديث formData بالبيانات الجديدة:', profile);
      const newData = {
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        email: profile.email || '',
        address: profile.address || '',
      };
      setFormData(newData);
      setOriginalData(newData);
    }
  }, [profile]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsEditing(true);
  };

  const handleSaveAll = async () => {
    console.log('💾 حفظ جميع التعديلات:', formData);
    
    // تجهيز البيانات للإرسال
    const updateData: any = {};
    
    // إذا تغير الاسم الأول أو الأخير، نرسل name كامل
    if (formData.firstName !== originalData.firstName || 
        formData.lastName !== originalData.lastName) {
      updateData.name = `${formData.firstName} ${formData.lastName}`.trim();
    }
    
    // إضافة الحقول الأخرى إذا تغيرت
    if (formData.phone !== originalData.phone) {
      updateData.phone = formData.phone;
    }
    
    if (formData.email !== originalData.email) {
      updateData.email = formData.email;
    }
    
    if (formData.address !== originalData.address) {
      updateData.address = formData.address;
    }
    
    // إذا كان هناك أي تغيير
    if (Object.keys(updateData).length > 0) {
      try {
        await updateProfile(updateData);
        setOriginalData({ ...formData });
        setIsEditing(false);
      } catch (error) {
        console.error('❌ خطأ في الحفظ:', error);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
  };

  const hasChanges = () => {
    return formData.firstName !== originalData.firstName ||
           formData.lastName !== originalData.lastName ||
           formData.phone !== originalData.phone ||
           formData.email !== originalData.email ||
           formData.address !== originalData.address;
  };

  // دالة لتغيير كلمة المرور
  const handleChangePassword = async () => {
    // تحقق من البيانات
    if (!passwordForm.password || !passwordForm.password_confirmation) {
      setPasswordError("الرجاء ملء جميع الحقول");
      return;
    }
    
    if (passwordForm.password.length < 6) {
      setPasswordError("كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    
    if (passwordForm.password !== passwordForm.password_confirmation) {
      setPasswordError("كلمة المرور الجديدة غير متطابقة");
      return;
    }
    
    setIsChangingPassword(true);
    setPasswordError("");
    setPasswordSuccess("");
    
    try {
      console.log("🔐 جاري تغيير كلمة المرور:", passwordForm);
      
      const response = await axiosClient.put("/api/v1/profile", {
        password: passwordForm.password,
        password_confirmation: passwordForm.password_confirmation
      });
      
      console.log("✅ استجابة تغيير كلمة المرور:", response.data);
      
      if (response.data.status) {
        setPasswordSuccess("تم تغيير كلمة المرور بنجاح!");
        
        // إعادة تعيين النموذج
        setPasswordForm({
          password: "",
          password_confirmation: ""
        });
        
        // إخفاء النموذج بعد 2 ثانية
        setTimeout(() => {
          setShowPasswordForm(false);
          setPasswordSuccess("");
        }, 2000);
      } else {
        setPasswordError(response.data.message || "فشل في تغيير كلمة المرور");
      }
    } catch (error: any) {
      console.error("❌ خطأ في تغيير كلمة المرور:", error);
      
      let errorMessage = "حدث خطأ أثناء تغيير كلمة المرور";
      
      if (error.response?.status === 422) {
        const errors = error.response.data?.errors;
        if (errors?.password) {
          errorMessage = errors.password[0];
        } else if (errors?.password_confirmation) {
          errorMessage = errors.password_confirmation[0];
        } else {
          errorMessage = error.response.data?.message || "بيانات غير صالحة";
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setPasswordError(errorMessage);
    } finally {
      setIsChangingPassword(false);
    }
  };

  // دالة لإغلاق نموذج كلمة المرور
  const closePasswordForm = () => {
    setShowPasswordForm(false);
    setPasswordForm({
      password: "",
      password_confirmation: ""
    });
    setPasswordError("");
    setPasswordSuccess("");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-[#211C4DCC] mt-4">جاري تحميل بيانات الملف الشخصي...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">❌ خطأ: {error}</p>
            <button 
              onClick={fetchProfile}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {t("Retry")}
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
        <Sidebar />
        <div className="md:w-[883px] px-5 md:px-0">
          <div className="w-full h-[45px] p-5 bg-[#E5E5E5] flex items-center justify-between rounded-[8px]">
            <p className="text-[#211C4DCC] text-[16px] font-[500]">
              {t("PersonalData")}
            </p>
            
            {/* زر الحفظ إذا كان في وضع التعديل */}
            {isEditing && hasChanges() && (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {t("Cancel")}
                </button>
                <button
                  onClick={handleSaveAll}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {t("SaveChanges")}
                </button>
              </div>
            )}
          </div>
          
          {/* مؤشر التعديل */}
          {isEditing && hasChanges() && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-yellow-700 text-sm">
                {t("UnsavedChanges")}
              </p>
            </div>
          )}
          
          <div className="grid mt-11 gap-[20px] md:grid-cols-2 grid-cols-1">
            {/* First Name */}
            <div>
              <label className="text-[#211C4DCC] text-[14px] font-[500] block mb-2">
                {t("FirstName")}
                {formData.firstName !== originalData.firstName && (
                  <span className="mr-2 text-xs text-blue-600">✏️ {t("edited")}</span>
                )}
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full h-[48px] px-[40px] rounded-[8px] border border-[#939393]"
                  placeholder={t("FirstNamePlaceholder")}
                />
                <img src={user} className="absolute start-3 top-3 w-5 h-5" alt="user" />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="text-[#211C4DCC] text-[14px] font-[500] block mb-2">
                {t("LastName")}
                {formData.lastName !== originalData.lastName && (
                  <span className="mr-2 text-xs text-blue-600">✏️ {t("edited")}</span>
                )}
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full h-[48px] px-[40px] rounded-[8px] border border-[#939393]"
                  placeholder={t("LastNamePlaceholder")}
                />
                <img src={user} className="absolute start-3 top-3 w-5 h-5" alt="user" />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-[#211C4DCC] text-[14px] font-[500]">
                {t("PhoneNumber")}
                {formData.phone !== originalData.phone && (
                  <span className="mr-2 text-xs text-blue-600">✏️ {t("edited")}</span>
                )}
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full h-[48px] px-[40px] rounded-[8px] border border-[#939393]"
                  placeholder={t("PhonePlaceholder")}
                />
                <img src={call} className="absolute start-3 top-3 w-5 h-5" alt="call" />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="text-[#211C4DCC] text-[14px] font-[500]">
                {t("EmailAddress")}
                {formData.email !== originalData.email && (
                  <span className="mr-2 text-xs text-blue-600">✏️ {t("edited")}</span>
                )}
              </label>
              <div className="relative">
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full h-[48px] px-[40px] rounded-[8px] border border-[#939393]"
                  placeholder={t("EmailPlaceholder")}
                />
                <img src={sms} className="absolute start-3 top-3 w-5 h-5" alt="sms" />
              </div>
            </div>

            {/* Full Address */}
            <div>
              <label className="text-[#211C4DCC] text-[14px] font-[500]">
                {t("FullAddress")}
                <span className="text-xs text-gray-500 mr-2">({t("optional")})</span>
                {formData.address !== originalData.address && (
                  <span className="mr-2 text-xs text-blue-600">✏️ {t("edited")}</span>
                )}
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full h-[48px] px-[40px] rounded-[8px] border border-[#939393]"
                  placeholder={t("AddressPlaceholder")}
                />
                <img src={home} className="absolute start-3 top-3 w-5 h-5" alt="home" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[#211C4DCC] text-[14px] font-[500]">
                {t("UserPassword")}
              </label>
              <div className="relative">
                <input 
                  type="password"
                  value="***********"
                  readOnly
                  className="w-full h-[48px] px-[40px] rounded-[8px] border border-[#939393] bg-gray-100 cursor-default"
                />
                <img src={key} className="absolute start-3 top-3 w-5 h-5" alt="key" />
                
                {/* زر التعديل */}
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="absolute end-3 top-3 flex items-center gap-1 text-blue-600 hover:text-blue-800 bg-white px-2 py-1 rounded border border-blue-200 hover:bg-blue-50 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span className="text-sm">{t("ChangePassword")}</span>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t("PasswordSecurityTip")}</span>
              </div>
            </div>
          </div>
          
          {/* أزرار الحفظ في الأسفل */}
          {isEditing && hasChanges() && (
            <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{t("ReviewChanges")}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t("ReviewChangesDescription")}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    {t("CancelAllChanges")}
                  </button>
                  <button
                    onClick={handleSaveAll}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    {t("SaveAllChanges")}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Modal لتغيير كلمة المرور */}
          {showPasswordForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                {/* الهيدر */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{t("ChangePassword")}</h2>
                    <p className="text-gray-600 text-sm mt-1">{t("EnterNewPassword")}</p>
                  </div>
                  <button
                    onClick={closePasswordForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* الرسائل */}
                <div className="px-6 pt-4">
                  {passwordError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-700 text-sm">{passwordError}</p>
                    </div>
                  )}
                  
                  {passwordSuccess && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-green-700 font-medium">{passwordSuccess}</p>
                        <p className="text-green-600 text-sm mt-1">سيتم إغلاق النموذج تلقائياً...</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* النموذج */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* كلمة المرور الجديدة */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        {t("NewPassword")}
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value={passwordForm.password}
                          onChange={(e) => setPasswordForm(prev => ({...prev, password: e.target.value}))}
                          className="w-full h-[48px] px-4 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                          placeholder={t("NewPasswordPlaceholder")}
                          disabled={isChangingPassword}
                        />
                        <div className="absolute left-3 top-3.5">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* تأكيد كلمة المرور الجديدة */}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        {t("ConfirmNewPassword")}
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value={passwordForm.password_confirmation}
                          onChange={(e) => setPasswordForm(prev => ({...prev, password_confirmation: e.target.value}))}
                          className="w-full h-[48px] px-4 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                          placeholder={t("ConfirmNewPasswordPlaceholder")}
                          disabled={isChangingPassword}
                        />
                        <div className="absolute left-3 top-3.5">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* نصائح الأمان */}
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="text-sm font-medium text-blue-700 mb-2">{t("PasswordTipsTitle")}</h4>
                      <ul className="text-xs text-blue-600 space-y-1">
                        <li>{t("PasswordTip1")}</li>
                        <li>{t("PasswordTip2")}</li>
                        <li>{t("PasswordTip3")}</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* الأزرار */}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={closePasswordForm}
                      disabled={isChangingPassword}
                      className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
                    >
                      {t("Cancel")}
                    </button>
                    <button
                      onClick={handleChangePassword}
                      disabled={isChangingPassword}
                      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                    >
                      {isChangingPassword ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          {t("Updating")}...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {t("ChangePassword")}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Show loader while fetching banner data */}
          {pageLoading && <Loader />}
          {/* Display banner when data is loaded */}


          <div className="mt-6 mb-4">

              {!pageLoading && page && (
              <FeaturedHeroSection
                title={page.title || ""}
                description={page.short_description || ""}
                buttonText="تسوق الآن"
                buttonLink="/offers"
                backgroundImage={page.banner || ""}
              />
            )}
                    
          </div>
          
        </div>
      </div>
    </Layout>
  );
}