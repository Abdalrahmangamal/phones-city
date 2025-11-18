import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useauthstore";
import "@/style.css";
interface VerifyData {
  isopen: boolean;
}
interface otptype{
    email:string;
    code:string;
}
export default function VerifyCode({ isopen }: VerifyData) {
  const [open, setOpen] = React.useState(false);
  const { sendVerifyCode } = useAuthStore();

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(isopen);
  }, [isopen]);
  const [otp, setOtp] = React.useState("");

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };
  console.log(otp);

const userdata = JSON.parse(localStorage.getItem("userData") || "{}").data.user.email;
 console.log(userdata)
 const VerifyCodetypes={
    email:userdata,
    code:otp
 }
const handlesendotp = ()=>{
sendVerifyCode(VerifyCodetypes)
}
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "600px", // العرض اللي إنت عايزه
            maxWidth: "90%", // علشان ما يطلعش برا الشاشة
            height: "400px", // الارتفاع
            borderRadius: "16px", // تجميل لو عايز
          },
        }}
      >
        <div className="w-full h-full flex items-center flex-col justify-around">
          <DialogTitle>
            <p className="text-[#211C4D] text-center font-[600] text-[32px]">
              أدخل رمز التحقق
            </p>
            <p className="text-[#211C4DB2] font-[400] text-center text-[16px]">
              تم إرسال رمز مكون من 6 أرقام إلى بريدك الإلكتروني
            </p>
          </DialogTitle>
          <div dir="ltr">
            <MuiOtpInput value={otp} length={6} onChange={handleChange} />
          </div>
          <div>
            <button onClick={handlesendotp} className="bg-[#2AA0DC] w-[344px] h-[52px] my-5 rounded-[32px] text-[24px] text-white">
              استمر
            </button>
          </div>
          <div>
            <p className="text-[#F2451C] text-[16px] font-[400]">00:30</p>
          </div>
          <Button>إعادة إرسال الرمز</Button>
        </div>
      </Dialog>
    </>
  );
}
