import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import loginimage from "@/assets/images/loginimage.png";
import smalllogo from "@/assets/images/smalllogo.png";
import toppatern from "@/assets/images/toppatern.png";
import bottompattern from "@/assets/images/bottompattern.png";
import ForgotPasswordFlowModal from "@/components/auth/ForgotPasswordFlowModal";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {useAuthStore} from '@/store/useauthstore'
import Loader from "@/components/Loader";

type loginInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { sendLogin, loading: authLoading } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginInputs>();
  
  const [showPassword, setShowPassword] = useState(false);
  const [openforgetpassmodal, setopenforgetpassmodal] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showLoader, setShowLoader] = useState(true);

  const onSubmit: SubmitHandler<loginInputs> = async (data, e) => {
    e?.preventDefault();
    setLoginError("");
    
    console.log("Login submitted", data);

    const res = await sendLogin(data);

    if (res?.data?.token) {
      navigate("/");
    } else {
      setLoginError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  const handelopenforgetpass = () => {
    setopenforgetpassmodal(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <>
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

            <form
              className="space-y-5 text-right"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* البريد الإلكتروني */}
              <div>
                <label className="block mb-2 md:mb-0 text-[24px] font-[500] text-[#211C4DB2]">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  {...register("email", { 
                    required: "البريد الإلكتروني مطلوب",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "البريد الإلكتروني غير صالح"
                    }
                  })}
                  placeholder="username@gmail.com"
                  className="w-full p-3 border rounded-lg h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
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
                    {...register("password", { 
                      required: "كلمة المرور مطلوبة",
                      minLength: {
                        value: 6,
                        message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
                      }
                    })}
                    className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#0B60B0]"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 cursor-pointer text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}

                {/* رابط نسيت كلمة المرور */}
                <div
                  onClick={handelopenforgetpass}
                  className="p-0 m-0 bg-transparent hover:bg-transparent focus:ring-0 active:scale-100 border-none shadow-none"
                >
                  <p className="text-[16px] font-[500] text-[#2AA0DC] mt-2 cursor-pointer hover:underline">
                    نسيت كلمة المرور؟
                  </p>
                </div>
              </div>

              {/* عرض خطأ تسجيل الدخول */}
              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-600 text-center text-sm">{loginError}</p>
                </div>
              )}

              {/* زر الدخول */}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#2AA0DC] text-white py-3 rounded-[32px] font-[500] text-[16px] transition-all duration-300 hover:bg-[#0d8ed2] hover:scale-[1.03] shadow-[0_4px_10px_rgba(42,160,220,0.4)] hover:shadow-[0_6px_14px_rgba(42,160,220,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
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

          {/* مودال نسيت كلمة المرور */}
          <ForgotPasswordFlowModal
            isOpen={openforgetpassmodal}
            onClose={() => setopenforgetpassmodal(false)}
          />

          <div className="flex items-center justify-center">
            <img src={loginimage} className="scale-[0.9] md:mb-0 mb-60" alt="" />
          </div>
          <img src={bottompattern} className="absolute bottom-0 right-0" alt="" />
        </div>
      </div>
    </>
  );
}