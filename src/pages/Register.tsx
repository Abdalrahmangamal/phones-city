import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import loginimage from "@/assets/images/loginimage.png";
import smalllogo from "@/assets/images/smalllogo.png";
import toppattern from "@/assets/images/toppatern.png";
import bottompattern from "@/assets/images/bottompattern.png";
import google from "@/assets/images/Google.png";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <img
        src={smalllogo}
        className="smalllogo absolute md:right-[60px] right-2 top-5 z-10 w-auto"
        alt=""
      />
      <img src={toppattern} alt="" className="absolute left-0 z-4" />

      <div className="min-h-screen flex md:mt-0 mt-[60px] md:p-0 px-4 z-3 flex-col md:flex-row items-center justify-center gap-4 relative">
        <div className="bg-white rounded-[20px] md:w-[400px] w-full text-start pt-4 form-wrap">
          <h2 className="text-[32px] font-[600] text-[#211C4D] mb-3 text-right leading-[32px] tracking-[-0.52px]">
            انشاء حساب جديد
          </h2>

          <form className="space-y-3 text-right px-5 pb-3">
            <div>
              <label className="block mb-1 text-[20px] font-[500] text-[#211C4DB2] text-right">
                الاسم
              </label>
              <input
                type="text"
                placeholder="الاسم"
                className="w-full p-3 border border-[#D6D6D6] rounded-lg h-[48px] outline-none focus:ring-2 focus:ring-[#0B60B0] text-[14px] font-[500]"
              />
            </div>

            <div>
              <label className="block mb-1 text-[20px] font-[500] text-[#211C4DB2] text-right">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="username@gmail.com"
                className="w-full p-3 border border-[#D6D6D6] rounded-lg h-[48px] outline-none focus:ring-2 focus:ring-[#0B60B0] text-[14px] font-[500]"
              />
            </div>

            <div>
              <label className="block mb-1 text-[20px] font-[500] text-[#211C4DB2] text-right">
                رقم الهاتف
              </label>
              <input
                type="tel"
                placeholder="+299999999999"
                className="w-full p-3 border border-[#D6D6D6] rounded-lg h-[48px] outline-none focus:ring-2 focus:ring-[#0B60B0] text-[14px] font-[500]"
              />
            </div>

            <div>
              <label className="block mb-1 text-[20px] font-[500] text-[#211C4DB2] text-right">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full p-3 border border-[#D6D6D6] rounded-lg h-[48px] outline-none focus:ring-2 focus:ring-[#0B60B0] text-[14px] font-[500]"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-[20px] font-[500] text-[#211C4DB2] text-right">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full p-3 border border-[#D6D6D6] rounded-lg h-[48px] outline-none focus:ring-2 focus:ring-[#0B60B0] text-[14px] font-[500]"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 top-3 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[52px] bg-[#2AA0DC] rounded-[32px] text-[20px] font-[600] text-white mt-1 transition-all duration-300 hover:bg-[#0d8ed2] hover:scale-[1.03]"
            >
              تسجيل الدخول
            </button>

            <div className="flex flex-col items-center gap-2 mt-3">
              <div className="flex gap-4">
                <button className="w-[40px] h-[40px] rounded-full bg-white border border-gray-300 flex items-center justify-center">
                  <img src={google} alt="Google" className="w-[24px] h-[24px]" />
                </button>
                <button className="w-[40px] h-[40px] rounded-full bg-white border border-gray-300 flex items-center justify-center">
                  <img src={google} alt="Google" className="w-[24px] h-[24px]" />
                </button>
                <button className="w-[40px] h-[40px] rounded-full bg-white border border-gray-300 flex items-center justify-center">
                  <img src={google} alt="Google" className="w-[24px] h-[24px]" />
                </button>
              </div>

              <p className="text-[20px] text-center text-[#211C4D]">
                لدي حساب ؟ {" "}
                <Link to="/login" className="text-[#2AA0DC] mr-1 hover:underline">
                  سجل الدخول
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center">
          <img src={loginimage} className="scale-[0.7]" alt="" />
        </div>
        <img src={bottompattern} className="absolute bottom-0 right-0" alt="" />
      </div>

      <style>{`\n        .form-wrap { margin-top: 0; }\n        @media (min-width: 768px) and (max-width: 1434px) {\n          .smalllogo { width: 213px; height: auto; }\n          .form-wrap { margin-top: 84px !important; }\n        }\n        @media (min-width: 1306px) {\n          .form-wrap { margin-top: 0 !important; }\n          .smalllogo { width: auto; }\n        }\n      `}</style>
    </div>
  );
}
