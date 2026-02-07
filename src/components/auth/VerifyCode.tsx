import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useAuthStore } from "@/store/useauthstore";
import { useNavigate } from "react-router-dom";

interface VerifyProps {
  isopen: boolean;
  email: string;
  onClose: () => void;
  onSuccess: (code: string) => void;
}

const VerifyCode: React.FC<VerifyProps> = ({
  isopen,
  email,
  onClose,
  onSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { sendVerifyCode, loading, error } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(isopen);
    if (!isopen) {
      setOtp("");
      setShowSuccess(false);
      setErrorMessage("");
    }
  }, [isopen]);

  useEffect(() => {
    if (error) {
      if (typeof error === "string") {
        setErrorMessage(error);
      } else {
        const errorObj = error as Record<string, any>;
        const messages: string[] = [];
        Object.entries(errorObj).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            messages.push(...value);
          } else if (value && typeof value === "string") {
            messages.push(value);
          }
        });
        setErrorMessage(messages.join(" • ") || "حدث خطأ في التحقق");
      }
    }
  }, [error]);

  const handleSubmit = async () => {
    if (otp.length !== 6) return;

    setErrorMessage("");
    const res = await sendVerifyCode({
      email,
      code: otp,
    });

    if (res?.status === true) {
      // 🟢 Extract token
      const token =
        res?.data?.token ??
        res?.data?.data?.token ??
        res?.token ??
        res?.access_token;

      if (token) {
        localStorage.setItem("token", token);
      }

      // 🟢 Extract user (optional)
      const user = res?.data?.user ?? res?.data?.data?.user;
      if (user) {
        localStorage.setItem("userData", JSON.stringify(user));
      }

      // 🟢 Success UI
      setShowSuccess(true);
      onSuccess(otp);

      // ⏳ Close modal then redirect
      setTimeout(() => {
        setOpen(false);
        onClose();
        navigate("/");
      }, 1500);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "600px",
          height: "400px",
          borderRadius: "16px",
        },
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-around px-6">
        <DialogTitle>
          {!showSuccess ? (
            <>
              <p className="text-center text-[32px] font-[600] text-[#211C4D]">
                أدخل رمز التحقق
              </p>
              <p className="text-center text-[16px] text-[#211C4DB2]">
                تم إرسال رمز من 6 أرقام إلى بريدك الإلكتروني
              </p>
            </>
          ) : (
            <p className="text-center text-[32px] font-[600] text-[#27ae60]">
              تم التحقق بنجاح 🎉
            </p>
          )}
        </DialogTitle>

        {!showSuccess ? (
          <>
            <div dir="ltr" className="flex justify-center w-full">
              <MuiOtpInput value={otp} length={6} onChange={setOtp} />
            </div>

            {errorMessage && (
              <div className="w-full max-w-[400px] bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-center text-sm font-semibold">
                  ✗ {errorMessage}
                </p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || otp.length !== 6}
              className="bg-[#2AA0DC] w-[344px] h-[52px] rounded-[32px] text-white text-[22px] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "جاري التحقق..." : "استمر"}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 animate-fadeIn">
            <div className="w-[70px] h-[70px] rounded-full bg-green-500 flex items-center justify-center text-white text-[36px]">
              ✓
            </div>
            <p className="text-[20px] text-[#555]">
              أهلاً بيك 👋 جاري تحويلك للصفحة الرئيسية
            </p>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default VerifyCode;
