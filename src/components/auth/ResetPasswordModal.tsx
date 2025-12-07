import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/useauthstore";
import Loader from "@/components/Loader";

interface ResetPasswordProps {
  isopen: boolean;
  email: string;
  code: string;
  onClose: () => void;
}

export default function ResetPasswordModal({
  isopen,
  email,
  code,
  onClose,
}: ResetPasswordProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const { resetPassword, loading } = useAuthStore();

  useEffect(() => {
    setOpen(isopen);
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
    if (!passwordsMatch) return;

    const res = await resetPassword({
      email,
      code,
      password,
      password_confirmation: passwordConfirm,
    });

    if (res?.status === true) {
      handleClose();
      // هنا لو عايز ترجع لصفحة اللوجين استخدم navigate
    }
  };

  return (
    <>
      {loading && <Loader />}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "600px",
            maxWidth: "90%",
            height: "420px",
            borderRadius: "16px",
          },
        }}
      >
        <div className="w-full h-full flex items-center flex-col justify-around">
          <DialogTitle>
            <p className="text-[#211C4D] text-center font-[600] text-[32px]">
              إعادة تعيين كلمة المرور
            </p>
            <p className="text-[#211C4DB2] text-center text-[16px]">
              أدخل كلمة المرور الجديدة ثم أكدها
            </p>
          </DialogTitle>

          <div dir="ltr" className="w-full px-15 space-y-4">
            <div>
              <label className="block mb-2 text-[18px] font-[500] text-[#211C4DB2]">
                كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full p-3 border rounded-lg h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
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
              <label className="block mb-2 text-[18px] font-[500] text-[#211C4DB2]">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassConfirm ? "text" : "password"}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="********"
                  className="w-full p-3 border rounded-lg h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
                />
                <span
                  onClick={() => setShowPassConfirm(!showPassConfirm)}
                  className="absolute left-3 top-3 cursor-pointer text-gray-500"
                >
                  {showPassConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {!passwordsMatch && passwordConfirm.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  كلمتا المرور غير متطابقتين أو أقل من 6 أحرف
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!passwordsMatch}
            className="bg-[#2AA0DC] w-[344px] h-[52px] my-3 rounded-[32px] text-[20px] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            تأكيد كلمة المرور
          </button>
        </div>
      </Dialog>
    </>
  );
}
