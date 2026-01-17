// ForgotPasswordFlowModal.tsx
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/useauthstore";
import Loader from "@/components/Loader";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordFlowModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { forgotpassword, resetPassword, loading } = useAuthStore();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidCode = code.length === 6;
  const isValidPassword = password.length >= 6;
  const passwordsMatch = password === passwordConfirm && password.length >= 6;

  const handleSendCode = async () => {
    if (!isValidEmail) {
      setErrorMessage("الرجاء إدخال بريد إلكتروني صالح");
      return;
    }

    setErrorMessage("");
    
    try {
      const res = await forgotpassword({ email });
      console.log("Forgot Password Response:", res);

      if (res?.status === true || res?.success === true || res?.message?.toLowerCase().includes("تم")) {
        setStep("code"); // الانتقال إلى نافذة إدخال الكود
        setErrorMessage("");
      } else {
        setErrorMessage(res?.message || "فشل إرسال الكود، جرب تاني");
      }
    } catch (err: any) {
      console.error("Forgot Password Error:", err);
      setErrorMessage(err?.message || "حدث خطأ أثناء الإرسال");
    }
  };

  const handleVerifyCode = () => {
    if (!isValidCode) {
      setErrorMessage("الرجاء إدخال الكود المكون من 6 أرقام");
      return;
    }
    
    // التحقق من صحة الكود هنا (يمكنك إضافة API للتحقق)
    console.log("Verifying code:", code);
    
    // إذا كان الكود صحيح، انتقل إلى نافذة كلمة المرور
    setStep("password");
    setErrorMessage("");
  };

  const handleResetPassword = async () => {
    if (!passwordsMatch) {
      setErrorMessage("كلمتا المرور غير متطابقتين أو أقل من 6 أحرف");
      return;
    }

    setErrorMessage("");
    
    // تجميع جميع البيانات في كائن واحد
    const payload = {
      email,
      code,
      password,
      password_confirmation: passwordConfirm,
    };

    console.log("Sending reset payload:", payload);

    try {
      const res = await resetPassword(payload);
      console.log("Reset Password Response:", res);
      
      if (res?.status === true) {
        setSuccessMessage("تم تغيير كلمة المرور بنجاح!");
        
        setTimeout(() => {
          handleClose();
          // يمكنك إضافة إعادة توجيه أو رسالة نجاح هنا
          alert("تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.");
        }, 1500);
      } else {
        setErrorMessage(res?.message || "فشل إعادة تعيين كلمة المرور. حاول مرة أخرى.");
      }
    } catch (err: any) {
      console.error("Reset Password Error:", err);
      setErrorMessage("حدث خطأ أثناء إعادة تعيين كلمة المرور. حاول مرة أخرى.");
    }
  };

  const handleClose = () => {
    setEmail("");
    setCode("");
    setPassword("");
    setPasswordConfirm("");
    setErrorMessage("");
    setSuccessMessage("");
    setStep("email");
    onClose();
  };

  const handleResendCode = async () => {
    if (!isValidEmail) return;
    
    setErrorMessage("");
    try {
      const res = await forgotpassword({ email });
      if (res?.status === true) {
        setErrorMessage(""); // مسح أي أخطاء
        // يمكنك إضافة رسالة نجاح صغيرة هنا
        alert("تم إعادة إرسال الكود بنجاح!");
      }
    } catch (err) {
      console.error("Resend error:", err);
    }
  };

  return (
    <>
      {loading && <Loader />}

      {/* ===== النافذة 1: إدخال الإيميل ===== */}
      <Dialog
        open={isOpen && step === "email"}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "580px", maxWidth: "90%", borderRadius: "16px" },
        }}
      >
        <div className="p-8 flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold text-center text-[#211C4D]">
            نسيت كلمة المرور؟
          </h2>
          <p className="text-center text-[#211C4DB2]">
            أدخل بريدك الإلكتروني ليصلك كود إعادة تعيين كلمة المرور
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.trim());
              setErrorMessage("");
            }}
            placeholder="example@email.com"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#2AA0DC]"
          />

          {errorMessage && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg w-full text-center">
              {errorMessage}
            </p>
          )}

          <button
            onClick={handleSendCode}
            disabled={!isValidEmail || loading}
            className="bg-[#2AA0DC] w-full max-w-[340px] h-12 rounded-full text-white disabled:opacity-50 hover:bg-[#1e8ec9] transition-colors"
          >
            {loading ? "جاري الإرسال..." : "إرسال الكود"}
          </button>
        </div>
      </Dialog>

      {/* ===== النافذة 2: إدخال الكود فقط ===== */}
      <Dialog
        open={isOpen && step === "code"}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "580px", maxWidth: "90%", borderRadius: "16px" },
        }}
      >
        <div className="p-8 flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold text-center text-[#211C4D]">
            أدخل كود التحقق
          </h2>
          <p className="text-center text-[#211C4DB2]">
            تم إرسال كود مكون من 6 أرقام إلى بريدك الإلكتروني
            <br />
            <span className="font-semibold">{email}</span>
          </p>

          {/* حقل إدخال الكود */}
          <input
            type="text"
            value={code}
            onChange={(e) => {
              // السماح فقط بالأرقام
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setCode(value);
              setErrorMessage("");
            }}
            placeholder="أدخل 6 أرقام"
            className="w-full p-3 border rounded-lg h-[60px] outline-none focus:ring-2 focus:ring-[#2AA0DC] text-center text-2xl tracking-widest"
            autoFocus
          />

          {errorMessage && (
            <div className="w-full bg-red-50 border border-red-200 rounded p-3">
              <p className="text-red-600 text-center text-sm">{errorMessage}</p>
            </div>
          )}

          <div className="flex gap-4 w-full">
            <button
              onClick={() => setStep("email")}
              className="bg-gray-200 w-1/2 h-12 rounded-full text-gray-700 hover:bg-gray-300 transition-colors"
            >
              رجوع
            </button>
            <button
              onClick={handleVerifyCode}
              disabled={!isValidCode || loading}
              className="bg-[#2AA0DC] w-1/2 h-12 rounded-full text-white disabled:opacity-50 hover:bg-[#1e8ec9] transition-colors"
            >
              {loading ? "جاري التحقق..." : "تحقق من الكود"}
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm">
            لم تستلم الكود؟{' '}
            <button
              onClick={handleResendCode}
              className="text-[#2AA0DC] hover:underline"
            >
              إعادة إرسال
            </button>
          </p>
        </div>
      </Dialog>

      {/* ===== النافذة 3: إدخال كلمة المرور وتأكيدها ===== */}
      <Dialog
        open={isOpen && step === "password"}
        onClose={handleClose}
        PaperProps={{
          sx: { 
            width: "580px", 
            maxWidth: "90%", 
            borderRadius: "16px",
          },
        }}
      >
        <div className="p-8 flex flex-col items-center gap-6">
          {successMessage ? (
            <div className="text-center py-10">
              <div className="text-6xl text-green-500 mb-4">✓</div>
              <p className="text-xl font-medium text-green-700">
                {successMessage}
              </p>
              <p className="text-gray-600 mt-2">جاري إعادة توجيهك...</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center text-[#211C4D]">
                كلمة المرور الجديدة
              </h2>
              <p className="text-center text-[#211C4DB2]">
                أدخل كلمة المرور الجديدة ثم أكدها
              </p>

              {/* حقل كلمة المرور الجديدة */}
              <div className="w-full">
                <label className="block mb-2 text-[18px] font-[500] text-[#211C4DB2]">
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="أدخل كلمة مرور قوية"
                    className="w-full p-3 border rounded-lg h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 cursor-pointer text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
              </div>

              {/* حقل تأكيد كلمة المرور */}
              <div className="w-full">
                <label className="block mb-2 text-[18px] font-[500] text-[#211C4DB2]">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    value={passwordConfirm}
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="أعد إدخال كلمة المرور"
                    className="w-full p-3 border rounded-lg h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
                  />
                  <span
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute left-3 top-3 cursor-pointer text-gray-500"
                  >
                    {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="w-full bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-600 text-center text-sm">{errorMessage}</p>
                </div>
              )}

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setStep("code")}
                  className="bg-gray-200 w-1/2 h-12 rounded-full text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  رجوع
                </button>
                <button
                  onClick={handleResetPassword}
                  disabled={!passwordsMatch || loading}
                  className="bg-[#2AA0DC] w-1/2 h-12 rounded-full text-white disabled:opacity-50 hover:bg-[#1e8ec9] transition-colors"
                >
                  {loading ? "جاري التغيير..." : "تغيير كلمة المرور"}
                </button>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}