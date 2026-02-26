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
import { useAuthStore } from '@/store/useauthstore'
import Loader from "@/components/Loader";
import { useTranslation } from "react-i18next";

type loginInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { sendLogin, loading: authLoading } = useAuthStore();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

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


    const res = await sendLogin(data);

    if (res?.data?.token) {
      navigate("/");
    } else {
      const authError = useAuthStore.getState().error;
      const serverMessage =
        typeof authError === "string"
          ? authError
          : authError && typeof authError === "object"
            ? Object.values(authError as Record<string, any>).flat().join(", ")
            : "";

      setLoginError(serverMessage || t("auth.invalidCredentials"));
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
      <div dir={isRTL ? "rtl" : "ltr"} className="relative overflow-x-hidden">
        <div className="w-full flex relative pointer-events-none select-none">
          <img
            src={smalllogo}
            className={`absolute ${isRTL ? 'md:right-15 right-2' : 'md:left-15 left-2'} top-5 z-10`}
            alt=""
          />
          <img
            src={toppatern}
            alt=""
            className={`absolute ${isRTL ? 'left-0' : 'right-0 -scale-x-100'} z-0 pointer-events-none`}
          />
        </div>

        <div className="min-h-screen flex px-4 md:px-0 pt-24 md:pt-0 pb-10 md:pb-0 z-10 flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative isolate">
          <div className={`bg-white rounded-[20px] md:w-[450px] w-full max-w-[450px] ${isRTL ? 'text-start' : 'text-start'} relative z-10`}>
            <h2 className="text-[28px] md:text-[35px] font-[600] text-[#211C4D] mb-2">
              {t("auth.loginToAccount")}
            </h2>
            <p className="text-[#B9B8B8] font-[400] text-[14px] md:text-[16px] md:mb-0 mb-6">
              {t("auth.pleaseLogin")}
            </p>

            <form
              className={`space-y-5 ${isRTL ? 'text-right' : 'text-left'}`}
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* البريد الإلكتروني */}
              <div>
                <label className="block mb-2 md:mb-0 text-[18px] md:text-[24px] font-[500] text-[#211C4DB2]">
                  {t("auth.email")}
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: t("auth.emailRequired"),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t("auth.invalidEmail")
                    }
                  })}
                  placeholder="username@gmail.com"
                  className="w-full p-3 border rounded-lg h-12 md:h-[50px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* كلمة المرور */}
              <div>
                <label className="block mb-2 md:mb-0 text-[18px] md:text-[24px] font-[500] text-[#211C4DB2]">
                  {t("auth.password")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...register("password", {
                      required: t("auth.passwordRequired"),
                      minLength: {
                        value: 6,
                        message: t("auth.passwordMinLength")
                      }
                    })}
                    className={`w-full h-12 md:h-auto p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#0B60B0] ${isRTL ? 'pl-10' : 'pr-10'}`}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-3 cursor-pointer text-gray-500`}
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
                    {t("auth.forgotPassword")}
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
                className="w-full bg-[#2AA0DC] text-white py-3 rounded-[32px] font-[500] text-[16px] transition-all duration-300 hover:bg-[#0d8ed2] hover:scale-[1.02] shadow-[0_4px_10px_rgba(42,160,220,0.4)] hover:shadow-[0_6px_14px_rgba(42,160,220,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authLoading ? t("auth.loggingIn") : t("auth.login")}
              </button>

              {/* تسجيل جديد */}
              <p className="text-[18px] md:text-[24px] text-center mt-4 text-[#211C4D]">
                {t("auth.noAccount")}
                <Link
                  to="/register"
                  className={`text-[#2AA0DC] ${isRTL ? 'mr-1' : 'ml-1'} hover:underline`}
                >
                  {t("auth.registerNow")}
                </Link>
              </p>
            </form>
          </div>

          {/* مودال نسيت كلمة المرور */}
          <ForgotPasswordFlowModal
            isOpen={openforgetpassmodal}
            onClose={() => setopenforgetpassmodal(false)}
          />

          <div className="hidden md:flex items-center justify-center pointer-events-none select-none">
            <img src={loginimage} className="max-w-[520px] scale-[0.9] md:mb-0" alt="" />
          </div>
          <img
            src={bottompattern}
            className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0 -scale-x-100'} pointer-events-none select-none z-0`}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
