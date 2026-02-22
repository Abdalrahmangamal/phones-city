import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuthStore } from "@/store/useauthstore";
import Loader from "@/components/Loader";
import VerifyCode from "@/components/auth/VerifyCode";
import ResetPasswordModal from "@/components/auth/ResetPasswordModal";

interface ForgotProps {
  isopen: boolean;
  onClose: () => void;
}

export default function ForgotpasswordModal({ isopen, onClose }: ForgotProps) {
  const [open, setOpen] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);

  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifiedCode, setVerifiedCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { forgotpassword, loading } = useAuthStore();

  const [email, setEmail] = useState("");

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => setOpen(isopen), [isopen]);

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
    onClose();
  };

  const handlesendemail = async () => {
    if (!isValid) {
      setErrorMessage("الرجاء إدخال بريد إلكتروني صحيح");
      return;
    }

    setErrorMessage("");
    const res = await forgotpassword({ email });

    if (res?.status === true) {
      setVerifyEmail(email);
      setOpen(false);
      setOpenVerifyModal(true);
    } else {
      setErrorMessage(res?.message || "حدث خطأ في إرسال رمز التحقق. حاول مرة أخرى");
    }
  };

  return (
    <>
      {loading && <Loader />}

      <Dialog 
        open={open && !loading} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "600px",
            maxWidth: "90%",
            height: "380px",
            borderRadius: "16px",
          },
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-around p-6">
          <DialogTitle className="!pb-4">
            <p className="text-[32px] text-center font-bold text-[#211C4D]">
              نسيت كلمة المرور؟
            </p>
            <p className="text-[16px] text-center text-[#211C4DB2]">
              أدخل بريدك لنرسل رمز التحقق
            </p>
          </DialogTitle>

          <div className="w-3/4 space-y-4">
            <input
              type="email"
              placeholder="username@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              className="w-full p-3 border rounded-lg outline-none h-[50px] focus:ring-2 focus:ring-[#0B60B0]"
            />
            
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-center text-sm">
                  {errorMessage}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handlesendemail}
            disabled={!isValid || loading}
            className="bg-[#2AA0DC] w-[380px] h-[52px] rounded-[32px] text-white text-[18px] disabled:opacity-40 hover:bg-[#1E8BC3] transition-colors"
          >
            {loading ? "جاري الإرسال..." : "استمر"}
          </button>
        </div>
      </Dialog>

      <VerifyCode
        isopen={openVerifyModal}
        email={verifyEmail}
        onClose={() => {
          setOpenVerifyModal(false);
          setOpen(true);
        }}
        onSuccess={(code) => {
          setVerifiedCode(code);
          setOpenVerifyModal(false);
          setOpenResetModal(true);
        }}
      />

      <ResetPasswordModal
        isopen={openResetModal}
        email={verifyEmail}
        code={verifiedCode}
        onClose={() => {
          setOpenResetModal(false);
          setOpen(true);
        }}
      />
    </>
  );
}
