import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useauthstore";
import VerifyCode from '@/components/auth/VerifyCode'
import "@/style.css";
interface VerifyData {
  isopen: boolean;
  onClose: () => void;
}

export default function ForgotpasswordModal({ isopen, onClose }: VerifyData) {
  const [open, setOpen] = React.useState(false);
  const { forgotpassword } = useAuthStore();

  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  useEffect(() => {
    setOpen(isopen);
  }, [isopen]);

  const [otp] = React.useState("");

  console.log(otp);

  const [sendemail, setsendemail] = React.useState("");
   const VerifyCodetypes={
      email:sendemail,
   }
  const handlesendemail = () => {
    forgotpassword(VerifyCodetypes);
  };
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
              نسيت كلمة المرور؟
            </p>
            <p className="text-[#211C4DB2] font-[400] text-center text-[16px]">
              أدخل عنوان بريدك الإلكتروني وسنرسل لك رمز التأكيد لإعادة تعيين
              كلمة المرور الخاصة بك.
            </p>
          </DialogTitle>
          <div dir="ltr" className="w-full px-15">
            <div>
              <label className="block mb-2  text-[24px] font-[500] text-[#211C4DB2]">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="username@gmail.com"
                onChange={(e) => {
                  setsendemail(e.target.value);
                }}
                className="w-full p-3 border rounded-lg h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
              />
            </div>
          </div>
          <div>
            <button
              onClick={handlesendemail}
              className="bg-[#2AA0DC] w-[400px] h-[52px] my-5 rounded-[32px] text-[24px] text-white"
            >
              استمر
            </button>
          </div>
        </div>
        
      </Dialog>
    </>
  );
}
