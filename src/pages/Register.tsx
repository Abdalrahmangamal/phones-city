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
      <div className="w-full flex relative">
        <img src={smalllogo} className="absolute md:right-15 right-2 top-5 z-2" alt="" />
        <img src={toppattern} alt="" className="absolute left-0 z-4 " />
      </div>

      <div className="min-h-screen flex md:mt-[80px] mt-[200px] md:p-0 px-4 z-3 flex-col md:flex-row items-center justify-center gap-20 relative">
        <div className="bg-white rounded-[20px] md:w-[450px] w-full text-start pt-8">
          <h2 className="text-[40px] font-[600] text-[#211C4D] mb-6 text-right leading-[40px] tracking-[-0.52px]">
            انشاء حساب جديد
          </h2>

          <form className="space-y-6 text-right px-8 pb-8">
            {/* الاسم */}
            <div>
              <label className="block mb-2 text-[24px] font-[500] text-[#211C4DB2] text-right">
                الاسم
              </label>
              <input
                type="text"
                placeholder="الاسم"
                className="w-full p-4 border border-[#D6D6D6] rounded-lg h-[56px] outline-none focus:ring-2 focus:ring-[#0B60B0] text-[16px] font-[500]"
              />
            </div>

            {/* البريد الإلكتروني */}
            <div>
              <label className="block mb-2 text-[24px] font-[500] text-[#211C4DB2] text-right">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="username@gmail.com"
                className="w-full p-4 border border-[#D6D6D6] rounded-lg h-[56px] outline-none focus:ring-2 focus:ring-[#0B60B0] text-[16px] font-[500]"
              />
            </div>

            {/* رقم الهاتف */}
            <div>
              <label className="block mb-2 text-[24px] font-[500] text-[#211C4DB2] text-right">
                رقم الهاتف
              </label>
              <input
                type="tel"
                placeholder="+299999999999"
                className="w-full p-4 border border-[#D6D6D6] rounded-lg h-[56px] outline-none focus:ring-2 focus:ring-[#0B60B0] text-[16px] font-[500]"
              />
            </div>

            {/* كلمة المرور */}
            <div>
              <label className="block mb-2 text-[24px] font-[500] text-[#211C4DB2] text-right">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full p-4 border border-[#D6D6D6] rounded-lg h-[56px] outline-none focus:ring-2 focus:ring-[#0B60B0] text-[16px] font-[500]"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-4 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            {/* تأكيد كلمة المرور */}
            <div>
              <label className="block mb-2 text-[24px] font-[500] text-[#211C4DB2] text-right">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full p-4 border border-[#D6D6D6] rounded-lg h-[56px] outline-none focus:ring-2 focus:ring-[#0B60B0] text-[16px] font-[500]"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 top-4 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            {/* زر التسجيل */}
            <button
              type="submit"
              className="w-full h-[62px] bg-[#2AA0DC] rounded-[32px] text-[24px] font-[600] text-white mt-4 transition-all duration-300 hover:bg-[#0d8ed2] hover:scale-[1.03]"
            >
              تسجيل الدخول
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-[16px] text-gray-500">أو</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Other Method Login */}
            <div className="flex flex-col items-center gap-4">
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

              {/* تسجيل دخول */}
              <p className="text-[24px] text-center text-[#211C4D]">
                لدي حساب ؟{" "}
                <Link to="/login" className="text-[#2AA0DC] mr-1 hover:underline">
                  سجل الدخول
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center">
          <img src={loginimage} className="scale-[0.9] md:mb-0 mb-60" alt="" />
        </div>
        <img src={bottompattern} className="absolute bottom-0 right-0" alt="" />
      </div>
    </div>
  );
}