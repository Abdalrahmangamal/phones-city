import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useAuthStore } from "@/store/useauthstore";

interface VerifyProps {
  isopen: boolean;
  email: string;
  onClose: () => void;
  onSuccess: (code: string) => void;
}

export default function VerifyCode({
  isopen,
  email,
  onClose,
  onSuccess,
}: VerifyProps) {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const { sendVerifyCode, loading } = useAuthStore();

  useEffect(() => {
    setOpen(isopen);
  }, [isopen]);

  const handleSubmit = async () => {
    if (otp.length !== 6) return;

    const res = await sendVerifyCode({
      email,
      code: otp,
    });

    if (res?.status === true) {
      setOpen(false);
      onClose();
      onSuccess(otp);
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
      <div className="w-full h-full flex items-center flex-col justify-around">
        <DialogTitle>
          <p className="text-center text-[32px] font-[600] text-[#211C4D]">
            أدخل رمز التحقق
          </p>
          <p className="text-center text-[16px] text-[#211C4DB2]">
            تم إرسال رمز من 6 أرقام إلى بريدك الإلكتروني
          </p>
        </DialogTitle>

        <MuiOtpInput value={otp} length={6} onChange={setOtp} />

        <button
          onClick={handleSubmit}
          className="bg-[#2AA0DC] w-[344px] h-[52px] rounded-[32px] text-white text-[24px]"
        >
          {loading ? "جاري التحقق..." : "استمر"}
        </button>
      </div>
    </Dialog>
  );
}
