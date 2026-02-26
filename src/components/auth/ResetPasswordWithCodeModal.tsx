import React, { useState, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import { Eye, EyeOff } from "lucide-react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useAuthStore } from "@/store/useauthstore";
import {
  authDialogSlotProps,
  authDialogSx,
  authOtpSx,
  getAuthDialogPaperSx,
} from "@/components/auth/authDialogStyles";

interface Props {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ResetPasswordWithCodeModal({
  isOpen,
  email,
  onClose,
  onSuccess,
}: Props) {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const OTP_LENGTH = 6;

  const normalizeOtpValue = useCallback((value: string) => value.replace(/\D/g, "").slice(0, OTP_LENGTH), []);

  const { resetPassword, loading } = useAuthStore();

  const handleSubmit = async () => {
    setError("");

    if (otp.length !== 6) {
      setError("الكود يجب أن يكون مكون من 6 أرقام");
      return;
    }

    if (password.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    const payload = {
      email,
      code: otp,
      password,
      password_confirmation: confirmPassword,
    };

    try {
      const res = await resetPassword(payload);

      if (res?.status === true) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess?.();
        }, 1800);
      } else {
        setError(res?.message || "حدث خطأ أثناء تغيير كلمة المرور");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "فشل تغيير كلمة المرور");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={authDialogSx}
      slotProps={authDialogSlotProps}
      PaperProps={{
        sx: getAuthDialogPaperSx(600),
      }}
    >
      <div className="p-4 sm:p-8 flex flex-col items-center gap-4 sm:gap-6">
        {success ? (
          <div className="text-center py-12">
            <div className="text-6xl text-green-500 mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              تم تغيير كلمة المرور بنجاح!
            </h2>
            <p className="text-gray-600">يمكنك الآن تسجيل الدخول</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#211C4D] text-center">
              إعادة تعيين كلمة المرور
            </h2>
            <p className="text-center text-sm sm:text-base text-[#211C4DB2] mb-2 sm:mb-4 break-all">
              أدخل الكود المرسل إلى {email} ثم كلمة المرور الجديدة
            </p>

            {/* حقل الكود */}
            <div className="w-full max-w-md">
              <label className="block mb-2 text-base sm:text-lg font-medium text-[#211C4DB2]">
                كود التحقق
              </label>
              <div className="overflow-x-auto py-1" dir="ltr">
                <MuiOtpInput
                  value={otp}
                  length={OTP_LENGTH}
                  onChange={(value) => setOtp(normalizeOtpValue(value))}
                  validateChar={(char) => /^\d$/.test(char)}
                  autoFocus
                  sx={authOtpSx}
                />
              </div>
            </div>

            {/* كلمة المرور الجديدة */}
            <div className="w-full max-w-md space-y-5 mt-4">
              <div>
                <label className="block mb-2 text-base sm:text-lg font-medium text-[#211C4DB2]">
                  كلمة المرور الجديدة
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 h-12 border rounded-lg outline-none focus:ring-2 focus:ring-[#2AA0DC]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-base sm:text-lg font-medium text-[#211C4DB2]">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 h-12 border rounded-lg outline-none focus:ring-2 focus:ring-[#2AA0DC]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="w-full max-w-md bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || otp.length !== 6 || !password || !confirmPassword}
              className="bg-[#2AA0DC] w-full max-w-md h-12 sm:h-14 rounded-full text-white font-medium text-base sm:text-lg disabled:opacity-50 mt-4 sm:mt-6"
            >
              {loading ? "جاري المعالجة..." : "تأكيد وتغيير كلمة المرور"}
            </button>
          </>
        )}
      </div>
    </Dialog>
  );
}
