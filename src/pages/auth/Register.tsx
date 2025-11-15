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

      <div className="min-h-screen flex md:mt-0 mt-[60px] md:p-0 px-4 z-3 flex-col md:flex-row items-center justify-center gap-30 relative">
        <div className="bg-white scale-[0.9] rounded-[20px] md:w-[600px] w-full text-start pt-4 form-wrap">
          <h2 className="text-[32px] font-[600] text-[#211C4D] mb-3 text-right leading-[32px] tracking-[-0.52px]">
            انشاء حساب جديد
          </h2>

    <form className="grid grid-cols-2 gap-6 bg-white p-6 rounded-2xl  text-right">

  {/* الاسم */}
  <div>
    <label className="block mb-2 text-[18px] font-semibold text-[#211C4DB2]">
      الاسم
    </label>
    <input
      type="text"
      placeholder="الاسم"
      className="w-full p-3 border border-gray-300 rounded-xl h-[50px] focus:ring-2 focus:ring-[#2AA0DC] focus:border-[#2AA0DC] transition-all text-[15px]"
    />
  </div>

  {/* البريد */}
  <div>
    <label className="block mb-2 text-[18px] font-semibold text-[#211C4DB2]">
      البريد الإلكتروني
    </label>
    <input
      type="email"
      placeholder="username@gmail.com"
      className="w-full p-3 border border-gray-300 rounded-xl h-[50px] focus:ring-2 focus:ring-[#2AA0DC] transition-all text-[15px]"
    />
  </div>

  {/* رقم الهاتف */}
  <div>
    <label className="block mb-2 text-[18px] font-semibold text-[#211C4DB2]">
      رقم الهاتف
    </label>
    <input
      type="tel"
      placeholder="+299999999999"
      className="w-full p-3 border border-gray-300 rounded-xl h-[50px] focus:ring-2 focus:ring-[#2AA0DC] transition-all text-[15px]"
    />
  </div>

  {/* كلمة المرور */}
  <div>
    <label className="block mb-2 text-[18px] font-semibold text-[#211C4DB2]">
      كلمة المرور
    </label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="********"
        className="w-full p-3 border border-gray-300 rounded-xl h-[50px] focus:ring-2 focus:ring-[#2AA0DC] transition-all text-[15px]"
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute left-3 top-[13px] cursor-pointer text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
      </span>
    </div>
  </div>

  {/* تأكيد كلمة المرور */}
  <div className="col-span-2">
    <label className="block mb-2 text-[18px] font-semibold text-[#211C4DB2]">
      تأكيد كلمة المرور
    </label>
    <div className="relative">
      <input
        type={showConfirmPassword ? "text" : "password"}
        placeholder="********"
        className="w-full p-3 border border-gray-300 rounded-xl h-[50px] focus:ring-2 focus:ring-[#2AA0DC] transition-all text-[15px]"
      />
      <span
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute left-3 top-[13px] cursor-pointer text-gray-500 hover:text-gray-700"
      >
        {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
      </span>
    </div>
  </div>

  {/* زر التسجيل */}
  <button
    type="submit"
    className="col-span-2 w-full h-[54px] bg-[#2AA0DC] rounded-[32px] text-[20px] font-bold text-white mt-2 transition-all hover:bg-[#0C8ED2] hover:shadow-md hover:scale-[1.02]"
  >
    تسجيل الدخول
  </button>

  {/* تسجيل عبر السوشيال */}
  <div className="col-span-2 flex flex-col items-center gap-3 mt-4">
    <div className="flex gap-4">
      {["g", "g", "g"].map((_, i) => (
        <button
          key={i}
          className="w-[45px] h-[45px] rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md transition flex items-center justify-center"
        >
          <img src={google} alt="Google" className="w-[24px] h-[24px]" />
        </button>
      ))}
    </div>

    <p className="text-[18px] text-[#211C4D] mt-1">
      لدي حساب ؟{" "}
      <Link to="/login" className="text-[#2AA0DC] hover:underline">
        سجل الدخول
      </Link>
    </p>
  </div>
</form>

        </div>

        <div className="flex items-center justify-center">
          <img src={loginimage} className="scale-[0.9]" alt="" />
        </div>
        <img src={bottompattern} className="absolute bottom-0 right-0" alt="" />
      </div>

      <style>{`\n        .form-wrap { margin-top: 0; }\n        @media (min-width: 768px) and (max-width: 1434px) {\n          .smalllogo { width: 213px; height: auto; }\n          .form-wrap { margin-top: 84px !important; }\n        }\n        @media (min-width: 1306px) {\n          .form-wrap { margin-top: 0 !important; }\n          .smalllogo { width: auto; }\n        }\n      `}</style>
    </div>
  );
}
