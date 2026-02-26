// ResetPasswordVerifyCode.tsx
import React, { useEffect, useState, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useAuthStore } from "@/store/useauthstore";
import {
  authDialogSlotProps,
  authDialogSx,
  authOtpSx,
  getAuthDialogPaperSx,
} from "@/components/auth/authDialogStyles";

interface ResetVerifyProps {
  isopen: boolean;
  email: string;
  onClose: () => void;
  onSuccess: (code: string) => void;
}

export default function ResetPasswordVerifyCode({
  isopen,
  email,
  onClose,
  onSuccess,
}: ResetVerifyProps) {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const OTP_LENGTH = 6;

  const normalizeOtpValue = useCallback((value: string) => value.replace(/\D/g, "").slice(0, OTP_LENGTH), []);

  const { sendVerifyCode, loading, error } = useAuthStore();

  useEffect(() => {
    setOpen(isopen);
    if (!isopen) {
      setOtp("");
      setShowSuccess(false);
      setErrorMessage("");
    } else {
      // بدء عداد إعادة الإرسال
      startResendTimer();
    }
  }, [isopen]);

  useEffect(() => {
    if (error) {
      setErrorMessage(
        typeof error === "string"
          ? error
          : error?.message || 
            Object.values(error || {})
              .flat()
              .join(" • ") || "حدث خطأ أثناء التحقق"
      );
    }
  }, [error]);

  const startResendTimer = () => {
    setResendTimer(60); // 60 ثانية
    setCanResend(false);
    
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setErrorMessage("");
    // هنا يمكنك استدعاء دالة إعادة إرسال الكود
    startResendTimer();
    // يمكنك إضافة استدعاء API لإعادة إرسال الكود هنا
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setErrorMessage("الرجاء إدخال الكود المكون من 6 أرقام");
      return;
    }

    // تحقق من أن الكود أرقام فقط
    if (!/^\d{6}$/.test(otp)) {
      setErrorMessage("الكود يجب أن يحتوي على أرقام فقط");
      return;
    }

    setErrorMessage("");
    
    // استخدام purpose 'reset' للتحقق من كود إعادة التعيين
    const res = await sendVerifyCode({ email, code: otp }, "reset");
    

    if (res?.status === true) {
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess(otp);
        setOpen(false);
      }, 1200);
    } else {
      // عرض رسالة الخطأ بشكل أوضح
      const errorMsg = res?.message || "الكود غير صحيح. حاول مرة أخرى";
      setErrorMessage(errorMsg);
      
      // إعادة تعيين OTP في حالة الخطأ
      if (errorMsg.includes('غير صحيح') || errorMsg.includes('منتهي')) {
        setOtp("");
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={authDialogSx}
      slotProps={authDialogSlotProps}
      PaperProps={{
        sx: getAuthDialogPaperSx(580)
      }}
    >
      <div className="p-4 sm:p-8 flex flex-col items-center gap-4 sm:gap-6">
        {!showSuccess ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#211C4D]">
              أدخل رمز التحقق
            </h2>
            <p className="text-center text-sm sm:text-base text-[#211C4DB2] break-all">
              تم إرسال رمز من 6 أرقام إلى {email}
            </p>

            <div
              className="flex justify-center w-full overflow-x-auto py-1"
            >
              <MuiOtpInput
                value={otp}
                length={OTP_LENGTH}
                onChange={(value) => {
                  setOtp(normalizeOtpValue(value));
                  setErrorMessage("");
                }}
                validateChar={(char) => /^\d$/.test(char)}
                autoFocus
                sx={authOtpSx}
              />
            </div>

            {errorMessage && (
              <div className="w-full bg-red-50 border border-red-200 rounded p-3">
                <p className="text-red-600 text-center text-sm">{errorMessage}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !/^\d{6}$/.test(otp)}
              className="bg-[#2AA0DC] w-full sm:w-[340px] h-[52px] rounded-full text-white disabled:opacity-60 hover:bg-[#1e8ec9] transition-colors"
            >
              {loading ? "جاري التحقق..." : "تأكيد"}
            </button>

            <div className="text-center mt-2 sm:mt-4">
              <p className="text-gray-600 text-sm sm:text-base leading-6">
                لم تستلم الكود؟{" "}
                <button
                  onClick={handleResendCode}
                  disabled={!canResend}
                  className={`text-[#2AA0DC] ${!canResend ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
                >
                  {canResend ? "إعادة إرسال" : `إعادة إرسال بعد ${resendTimer} ثانية`}
                </button>
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="text-6xl text-green-500 mb-4">✓</div>
            <p className="text-xl font-medium text-green-700">
              تم التحقق بنجاح!
            </p>
            <p className="text-gray-600 mt-2">جاري الانتقال لتغيير كلمة المرور...</p>
          </div>
        )}
      </div>
    </Dialog>
  );
}
