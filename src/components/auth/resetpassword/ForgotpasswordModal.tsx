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

  const { forgotpassword, loading } = useAuthStore();

  const [email, setEmail] = useState("");

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => setOpen(isopen), [isopen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handlesendemail = async () => {
    if (!isValid) return;

    const res = await forgotpassword({ email });

    if (res?.status === true) {
      setVerifyEmail(email);
      setOpen(false);
      setOpenVerifyModal(true);
    }
  };

  useEffect(() => {
    if (verifiedCode) {
      console.log("ForgotpasswordModal: verifiedCode set ->", verifiedCode);
    }
  }, [verifiedCode]);

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
            height: "350px",
            borderRadius: "16px",
          },
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-around p-6">
          <DialogTitle>
            <p className="text-[32px] text-center font-bold">
              نسيت كلمة المرور؟
            </p>
            <p className="text-[16px] text-center text-gray-600">
              أدخل بريدك لنرسل رمز التحقق
            </p>
          </DialogTitle>

          <input
            type="email"
            placeholder="username@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-3/4 p-3 border rounded-lg outline-none h-[50px]"
          />

          <button
            onClick={handlesendemail}
            disabled={!isValid}
            className="bg-[#2AA0DC] w-[380px] h-[52px] rounded-[32px] text-white text-[18px] disabled:opacity-40"
          >
            استمر
          </button>
        </div>
      </Dialog>

      <VerifyCode
        isopen={openVerifyModal}
        email={verifyEmail}
        onClose={() => setOpenVerifyModal(false)}
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
        onClose={() => setOpenResetModal(false)}
      />
    </>
  );
}