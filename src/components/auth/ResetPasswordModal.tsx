import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/useauthstore";
import Loader from "@/components/Loader";
import {
  authDialogSlotProps,
  authDialogSx,
  getAuthDialogPaperSx,
} from "@/components/auth/authDialogStyles";

interface ResetPasswordProps {
  isopen: boolean;
  email: string;
  code: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ResetPasswordModal({
  isopen,
  email,
  code,
  onClose,
  onSuccess,
}: ResetPasswordProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { resetPassword, loading } = useAuthStore();

  useEffect(() => {
    setOpen(isopen);
    if (!isopen) {
      setPassword("");
      setPasswordConfirm("");
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [isopen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const passwordsMatch =
    password.trim().length >= 6 &&
    passwordConfirm.trim().length >= 6 &&
    password === passwordConfirm;

  const handleSubmit = async () => {
    if (!passwordsMatch) {
      setErrorMessage("كلمتا المرور غير متطابقتين أو أقل من 6 أحرف");
      return;
    }

    setErrorMessage("");
    
    const payload = {
      email,
      code: typeof code === "string" ? code.trim() : code,
      password,
      password_confirmation: passwordConfirm,
    };


    try {
      const res = await resetPassword(payload);
      
      if (res?.status === true) {
        setSuccessMessage("تم تغيير كلمة المرور بنجاح!");
        
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
            handleClose();
          }, 1500);
        } else {
          setTimeout(() => {
            handleClose();
          }, 1500);
        }
      } else {
        setErrorMessage(res?.message || "فشل إعادة تعيين كلمة المرور. حاول مرة أخرى.");
      }
    } catch (err: any) {
      console.error("Reset password request failed");
      setErrorMessage("حدث خطأ أثناء إعادة تعيين كلمة المرور. حاول مرة أخرى.");
    }
  };

  return (
    <>
      {loading && <Loader />}

      <Dialog
        open={open && !loading}
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        sx={authDialogSx}
        slotProps={authDialogSlotProps}
        PaperProps={{
          sx: [
            getAuthDialogPaperSx(600),
            {
              minHeight: { xs: "auto", sm: "480px" },
            },
          ],
        }}
      >
        <div className="w-full h-full flex items-center flex-col justify-around gap-4 sm:gap-6 p-4 sm:p-6">
          <DialogTitle className="w-full">
            <p className="text-[#211C4D] text-center font-[600] text-2xl sm:text-[32px]">
              إعادة تعيين كلمة المرور
            </p>
            <p className="text-[#211C4DB2] text-center text-sm sm:text-[16px]">
              أدخل كلمة المرور الجديدة ثم أكدها
            </p>
          </DialogTitle>

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
              <div dir="ltr" className="w-full space-y-4">
                <div>
                  <label className="block mb-2 text-base sm:text-[18px] font-[500] text-[#211C4DB2]">
                    كلمة المرور الجديدة
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMessage("");
                      }}
                      placeholder="********"
                      className="w-full p-3 border rounded-lg h-12 sm:h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
                    />
                    <span
                      onClick={() => setShowPass(!showPass)}
                      className="absolute left-3 top-3 cursor-pointer text-gray-500"
                    >
                      {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-base sm:text-[18px] font-[500] text-[#211C4DB2]">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={showPassConfirm ? "text" : "password"}
                      value={passwordConfirm}
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                        setErrorMessage("");
                      }}
                      placeholder="********"
                      className="w-full p-3 border rounded-lg h-12 sm:h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
                    />
                    <span
                      onClick={() => setShowPassConfirm(!showPassConfirm)}
                      className="absolute left-3 top-3 cursor-pointer text-gray-500"
                    >
                      {showPassConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="w-full bg-red-50 border border-red-200 rounded p-3 mt-2">
                    <p className="text-red-600 text-center text-sm">{errorMessage}</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!passwordsMatch || loading}
                className="bg-[#2AA0DC] w-full sm:max-w-[380px] h-[52px] my-1 sm:my-3 rounded-[32px] text-base sm:text-[20px] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1e8ec9] transition-colors"
              >
                {loading ? "جاري التغيير..." : "تأكيد كلمة المرور"}
              </button>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}
