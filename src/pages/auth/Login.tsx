import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import loginimage from "@/assets/images/loginimage.png";
import smalllogo from "@/assets/images/smalllogo.png";
import toppatern from "@/assets/images/toppatern.png";
import bottompattern from "@/assets/images/bottompattern.png";
import ForgotpasswordModal from "@/components/auth/resetpassword/ForgotpasswordModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [openforgetpassmodal, setopenforgetpassmodal] = useState(false);
const handelopenforgetpass=()=>{
setopenforgetpassmodal(true)
}
  return (
    <div>
      <div className="w-full flex relative">
        <img
          src={smalllogo}
          className="absolute md:right-15 right-2 top-5 z-2"
          alt=""
        />
        <img src={toppatern} alt="" className="absolute left-0 z-4 " />
      </div>

      <div className="min-h-screen flex md:mt-[0px] mt-[200px] md:p-0 px-4 z-3 flex-col md:flex-row items-center justify-center gap-20 relative">
        <div className="bg-white rounded-[20px] md:w-[450px] w-full text-start">
          <h2 className="text-[35px] font-[600] text-[#211C4D] mb-2">
            تسجيل الدخول إلى حسابك
          </h2>
          <p className="text-[#B9B8B8] font-[400] text-[16px] md:mb-0 mb-8">
            برجى تسجيل الدخول إلى حسابك
          </p>

          <form className="space-y-5 text-right">
            {/* البريد الإلكتروني */}
            <div>
              <label className="block mb-2 md:mb-0 text-[24px] font-[500] text-[#211C4DB2]">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="username@gmail.com"
                className="w-full p-3 border rounded-lg h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
              />
            </div>

            {/* كلمة المرور */}
            <div>
              <label className="block mb-2 md:mb-0 text-[24px] font-[500] text-[#211C4DB2]">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#0B60B0]"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              {/* Dialog */}
             
                <p
                  onClick={handelopenforgetpass}
                    // variant="ghost"
                    className="p-0 m-0 bg-transparent hover:bg-transparent focus:ring-0 active:scale-100 border-none shadow-none" >
                    <p className="text-[16px] font-[500] text-[#2AA0DC] mt-2 cursor-pointer">
                      نسيت كلمة المرور؟
                    </p>
                  </p>
            </div>

            {/* زر الدخول */}
            <button
              type="submit"
              className="w-full bg-[#2AA0DC] text-white py-3 rounded-[32px] font-[500] text-[16px] transition-all duration-300 hover:bg-[#0d8ed2] hover:scale-[1.03] shadow-[0_4px_10px_rgba(42,160,220,0.4)] hover:shadow-[0_6px_14px_rgba(42,160,220,0.6)]"
            >
              تسجيل الدخول
            </button>

            {/* تسجيل جديد */}
            <p className="text-[24px] text-center mt-4 text-[#211C4D]">
              ليس لديك حساب؟
              <Link
                to="/register"
                className="text-[#2AA0DC] ml-1 hover:underline"
              >
                سجل الآن
              </Link>
            </p>
          </form>
        </div>
        <ForgotpasswordModal isopen={openforgetpassmodal}   onClose={() => setopenforgetpassmodal(false)}
 />
        <div className="flex items-center justify-center">
          <img src={loginimage} className="scale-[0.9] md:mb-0 mb-60" alt="" />
        </div>
        <img src={bottompattern} className="absolute bottom-0 right-0" alt="" />
      </div>
    </div>
  );
}
