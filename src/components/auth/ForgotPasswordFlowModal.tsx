// ForgotPasswordFlowModal.tsx
import { useState, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/useauthstore";
import Loader from "@/components/Loader";
import { useTranslation } from "react-i18next";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  authDialogSlotProps,
  authDialogSx,
  authOtpSx,
  getAuthDialogPaperSx,
} from "@/components/auth/authDialogStyles";

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
  const OTP_LENGTH = 6;

  /** تطبيع قيمة OTP: أرقام فقط وحد أقصى 6 */
  const normalizeOtpValue = useCallback((value: string) => value.replace(/\D/g, "").slice(0, OTP_LENGTH), []);

  const { forgotpassword, resetPassword, loading } = useAuthStore();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  /** الكود صالح فقط عندما يكون 6 أرقام بالكامل */
  const isValidCode = /^\d{6}$/.test(code);
  const passwordsMatch = password === passwordConfirm && password.length >= 6;

  const handleSendCode = async () => {
    if (!isValidEmail) {
      setErrorMessage(t("forgotPassword.enterValidEmail"));
      return;
    }

    setErrorMessage("");

    try {
      const res = await forgotpassword({ email });

      if (res?.status === true || res?.success === true || res?.message?.toLowerCase().includes("تم")) {
        setStep("code"); // الانتقال إلى نافذة إدخال الكود
        setErrorMessage("");
      } else {
        setErrorMessage(res?.message || t("forgotPassword.failedToSendCode"));
      }
    } catch (err: any) {
      console.error("Forgot password request failed");
      setErrorMessage(err?.message || t("forgotPassword.errorSending"));
    }
  };

  const handleVerifyCode = () => {
    if (!isValidCode) {
      setErrorMessage(t("forgotPassword.enterValidCode"));
      return;
    }

    // التحقق من صحة الكود هنا (يمكنك إضافة API للتحقق)

    // إذا كان الكود صحيح، انتقل إلى نافذة كلمة المرور
    setStep("password");
    setErrorMessage("");
  };

  const handleResetPassword = async () => {
    if (!passwordsMatch) {
      setErrorMessage(t("forgotPassword.passwordsNotMatch"));
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


    try {
      const res = await resetPassword(payload);

      if (res?.status === true) {
        setSuccessMessage(t("forgotPassword.passwordChangedSuccess"));

        setTimeout(() => {
          handleClose();
          alert(t("forgotPassword.passwordChangedAlert"));
        }, 1500);
      } else {
        setErrorMessage(res?.message || t("forgotPassword.failedToResetPassword"));
      }
    } catch (err: any) {
      console.error("Password reset request failed");
      setErrorMessage(t("forgotPassword.errorResetting"));
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
        setErrorMessage("");
        alert(t("forgotPassword.codeSentSuccess"));
      }
    } catch (err) {
      console.error("Resend verification code failed");
    }
  };

  return (
    <>
      {loading && <Loader />}

      {/* ===== النافذة 1: إدخال الإيميل ===== */}
      <Dialog
        open={isOpen && step === "email"}
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        sx={authDialogSx}
        slotProps={authDialogSlotProps}
        PaperProps={{
          sx: getAuthDialogPaperSx(580),
        }}
      >
        <div className="p-4 sm:p-8 flex flex-col items-center gap-4 sm:gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#211C4D]">
            {t("forgotPassword.title")}
          </h2>
          <p className="text-center text-sm sm:text-base text-[#211C4DB2]">
            {t("forgotPassword.subtitle")}
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.trim());
              setErrorMessage("");
            }}
            placeholder="example@email.com"
            className="w-full h-12 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#2AA0DC]"
          />

          {errorMessage && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg w-full text-center">
              {errorMessage}
            </p>
          )}

          <button
            onClick={handleSendCode}
            disabled={!isValidEmail || loading}
            className="bg-[#2AA0DC] w-full sm:max-w-[340px] h-12 rounded-full text-white disabled:opacity-50 hover:bg-[#1e8ec9] transition-colors"
          >
            {loading ? t("forgotPassword.sending") : t("forgotPassword.sendCode")}
          </button>
        </div>
      </Dialog>

      {/* ===== النافذة 2: إدخال الكود فقط ===== */}
      <Dialog
        open={isOpen && step === "code"}
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        sx={authDialogSx}
        slotProps={authDialogSlotProps}
        PaperProps={{
          sx: getAuthDialogPaperSx(580),
        }}
      >
        <div className="p-4 sm:p-8 flex flex-col items-center gap-4 sm:gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#211C4D]">
            {t("forgotPassword.enterVerificationCode")}
          </h2>
          <p className="text-center text-sm sm:text-base text-[#211C4DB2]">
            {t("forgotPassword.codeSentTo")}
            <br />
            <span className="font-semibold break-all">{email}</span>
          </p>

          {/* حقل إدخال الكود: أرقام فقط، تركيز ثابت على المربع الأول */}
          <div
            dir="ltr"
            className="flex justify-center w-full overflow-x-auto py-1"
          >
            <MuiOtpInput
              value={code}
              length={OTP_LENGTH}
              onChange={(value) => {
                setCode(normalizeOtpValue(value));
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

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <button
              onClick={() => setStep("email")}
              className="bg-gray-200 w-full sm:w-1/2 h-12 rounded-full text-gray-700 hover:bg-gray-300 transition-colors"
            >
              {t("forgotPassword.back")}
            </button>
            <button
              onClick={handleVerifyCode}
              disabled={!isValidCode || loading}
              className="bg-[#2AA0DC] w-full sm:w-1/2 h-12 rounded-full text-white disabled:opacity-50 hover:bg-[#1e8ec9] transition-colors"
            >
              {loading ? t("forgotPassword.verifying") : t("forgotPassword.verifyCode")}
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm leading-6">
            {t("forgotPassword.didntReceiveCode")}{' '}
            <button
              onClick={handleResendCode}
              className="text-[#2AA0DC] hover:underline"
            >
              {t("forgotPassword.resend")}
            </button>
          </p>
        </div>
      </Dialog>

      {/* ===== النافذة 3: إدخال كلمة المرور وتأكيدها ===== */}
      <Dialog
        open={isOpen && step === "password"}
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        sx={authDialogSx}
        slotProps={authDialogSlotProps}
        PaperProps={{
          sx: getAuthDialogPaperSx(580),
        }}
      >
        <div className="p-4 sm:p-8 flex flex-col items-center gap-4 sm:gap-6">
          {successMessage ? (
            <div className="text-center py-10">
              <div className="text-6xl text-green-500 mb-4">✓</div>
              <p className="text-xl font-medium text-green-700">
                {successMessage}
              </p>
              <p className="text-gray-600 mt-2">{t("forgotPassword.redirecting")}</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#211C4D]">
                {t("forgotPassword.newPassword")}
              </h2>
              <p className="text-center text-sm sm:text-base text-[#211C4DB2]">
                {t("forgotPassword.enterNewPasswordSubtitle")}
              </p>

              {/* حقل كلمة المرور الجديدة */}
              <div className="w-full">
                <label className="block mb-2 text-base sm:text-[18px] font-[500] text-[#211C4DB2]">
                  {t("forgotPassword.newPasswordLabel")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder={t("forgotPassword.enterStrongPassword")}
                    className="w-full p-3 border rounded-lg h-12 sm:h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-3 cursor-pointer text-gray-500`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
              </div>

              {/* حقل تأكيد كلمة المرور */}
              <div className="w-full">
                <label className="block mb-2 text-base sm:text-[18px] font-[500] text-[#211C4DB2]">
                  {t("forgotPassword.confirmPassword")}
                </label>
                <div className="relative">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    value={passwordConfirm}
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder={t("forgotPassword.reEnterPassword")}
                    className="w-full p-3 border rounded-lg h-12 sm:h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
                  />
                  <span
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-3 cursor-pointer text-gray-500`}
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

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                <button
                  onClick={() => setStep("code")}
                  className="bg-gray-200 w-full sm:w-1/2 h-12 rounded-full text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  {t("forgotPassword.back")}
                </button>
                <button
                  onClick={handleResetPassword}
                  disabled={!passwordsMatch || loading}
                  className="bg-[#2AA0DC] w-full sm:w-1/2 h-12 rounded-full text-white disabled:opacity-50 hover:bg-[#1e8ec9] transition-colors"
                >
                  {loading ? t("forgotPassword.changing") : t("forgotPassword.changePassword")}
                </button>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}
