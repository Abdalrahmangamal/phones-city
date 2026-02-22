import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import loginimage from "@/assets/images/loginimage.png";
import smalllogo from "@/assets/images/smalllogo.png";
import toppattern from "@/assets/images/toppatern.png";
import bottompattern from "@/assets/images/bottompattern.png";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/useauthstore";
import VerifyCode from "@/components/auth/VerifyCode";
export default function Register() {
  const { sendRegisterData, error: authError } = useAuthStore();
  // translate
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openverifymodal, setopenverifymodal] = useState(false)
  const [verifyEmail, setVerifyEmail] = useState<string>("")
  // ✅ Zod Schema
  const signupSchema = z
    .object({
      name: z.string().min(1, { message: `${t(`Nameisrequired`)}` }),
      email: z
        .string()
        .min(1, { message: `${t(`Emailisrequired`)}` })
        .email({ message: "Not a valid email" }),
      phone: z.string().min(1, { message: `${t(`Phoneisrequired`)}` }),
      password: z
        .string()
        .min(6, { message: `${t(`Passwordmustbeatleast6characters`)}` }),
      password_confirmation: z.string().min(6, {
        message: `${t(`Passwordconfirmationmustbeatleast6characters`)}`,
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: `${t(`Passwordsdonotmatch`)}`,
      path: ["password_confirmation"],
    });

  type ISignup = z.infer<typeof signupSchema>;

  // React Hook Form
  const {
    handleSubmit,
    register,
    // setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ISignup>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });

  // Manual Validation
  const onSubmit: SubmitHandler<ISignup> = async (data) => {
    const result = signupSchema.safeParse(data);
    if (!result.success) {
      return; // validation failed
    }

    // send to API and open verify modal on success
    try {
      const res = await sendRegisterData(result.data);

      // If the API call returns successfully and status is true (or it's just truthy with no status false)
      if (res && res.status !== false) {
        setVerifyEmail(result.data.email);
        setopenverifymodal(true);
        reset();
      } else if (res && res.status === false) {
      }
    } catch (err) {
      console.error("Register request failed");
    }
  };
  // عرض أخطاء التحقق (Zod) فقط داخل النموذج — لا نعرض رسائل السيرفر (مثل "email already taken") في النافذة
  const signupInputs = [
    {
      title: "Name",
      type: "text",
      name: "name",
      register: register("name"),
      error: errors.name?.message,
    },
    {
      title: "Email",
      type: "text",
      name: "email",
      register: register("email"),
      error: errors.email?.message,
    },
    {
      title: "Phone",
      type: "number",
      name: "phone",
      register: register("phone"),
      error: errors.phone?.message,
    },
    {
      title: "Password",
      type: showPassword ? "text" : "password",
      name: "password",
      register: register("password"),
      showtoggle: true,
      function: () => setShowPassword(!showPassword),
      error: errors.password?.message,
      icontoggle: showPassword ? <EyeOff size={22} /> : <Eye size={22} />,
    },
    {
      title: "Password_confirmation",
      type: showConfirmPassword ? "text" : "password",
      name: "password_confirmation",
      register: register("password_confirmation"),
      showtoggle: true,
      function: () => setShowConfirmPassword(!showConfirmPassword),
      error: errors.password_confirmation?.message,
      icontoggle: showConfirmPassword ? (
        <EyeOff size={22} />
      ) : (
        <Eye size={22} />
      ),
    },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <VerifyCode
        isopen={openverifymodal}
        email={verifyEmail}
        onClose={() => setopenverifymodal(false)}
        onSuccess={(code) => {
          setopenverifymodal(false);
        }}
      />
      <img
        src={smalllogo}
        className={`smalllogo absolute ${isRTL ? 'md:right-[60px] right-2' : 'md:left-[60px] left-2'} top-5 z-10 w-auto`}
        alt=""
      />
      <img src={toppattern} alt="" className={`absolute ${isRTL ? 'left-0' : 'right-0 -scale-x-100'} z-4`} />

      <div className="min-h-screen flex md:mt-0 mt-[60px] md:p-0 px-4 z-3 flex-col md:flex-row items-center justify-center gap-30 relative">
        <div className={`bg-white scale-[0.9] rounded-[20px] md:w-[600px] w-full text-start pt-4 form-wrap`}>
          <h2 className={`text-[32px] font-[600] mt-5 text-[#211C4D] mb-3 ${isRTL ? 'text-right' : 'text-left'} leading-[32px] tracking-[-0.52px]`}>
            {t("auth.createNewAccount")}
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`grid grid-cols-2 gap-4 pt-0 bg-white p-6 rounded-2xl ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {/* عرض أخطاء السيرفر */}
            {authError && (
              <div className="col-span-2 mb-2 p-3 bg-red-50 border border-red-300 rounded-xl text-red-600 font-semibold text-sm">
                {typeof authError === "string"
                  ? authError
                  : Object.values(authError).flat().join(", ")}
              </div>
            )}

            {/* الاسم */}
            {signupInputs.map((inputt) => (
              <div
                key={inputt.name}
                className={`relative ${inputt.name === "password_confirmation" ? "col-span-2" : ""
                  }`}
              >
                <label className="block mb-2 text-[18px] font-semibold text-[#211C4DB2]">
                  {t(`${inputt.title}`)}
                </label>
                <input
                  type={inputt.type}
                  placeholder={`${t("Enter")} ${t(`${inputt.title}`)}`}
                  className={`w-full p-3 border rounded-xl h-[50px] transition-all ${inputt.error
                    ? "border-red-400 bg-red-50 focus:ring-red-300 focus:ring-2"
                    : "border-gray-300 focus:ring-blue-300 focus:ring-2"
                    }`}
                  {...inputt.register}
                />
                {inputt.showtoggle && (
                  <span
                    onClick={inputt.function}
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-[49px] cursor-pointer text-gray-500`}
                  >
                    {inputt.icontoggle}
                  </span>
                )}

                {inputt.error && (
                  <div className="mt-2 bg-red-50 border border-red-200 rounded px-2 py-1">
                    <p className="text-red-600 text-xs font-semibold">✗ {inputt.error}</p>
                  </div>
                )}
              </div>
            ))}

            {/* البريد */}
            {/* <div>
              <label className="block mb-2 text-[18px] font-semibold text-[#211C4DB2]">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="username@gmail.com"
                className="w-full p-3 border border-gray-300 rounded-xl h-[50px]"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div> */}

            {/* رقم الهاتف */}
            {/* <div>
              <label className="block mb-2 text-[18px] font-semibold text-[#211C4DB2]">
                رقم الهاتف
              </label>
              <input
                type="number"
                placeholder="+299999999999"
                className="w-full p-3 border border-gray-300 rounded-xl h-[50px]"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div> */}

            {/* كلمة المرور */}
            {/* <div>
              <label className="block mb-2 text-[18px] font-semibold text-[#211C4DB2]">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full p-3 border border-gray-300 rounded-xl h-[50px]"
                  {...register("password")}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-[13px] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div> */}

            {/* تأكيد كلمة المرور */}
            {/* <div className="col-span-2">
              <label className="block mb-2 text-[18px] font-semibold text-[#211C4DB2]">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full p-3 border border-gray-300 rounded-xl h-[50px]"
                  {...register("password_confirmation")}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-3 top-[13px] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={22} />
                  ) : (
                    <Eye size={22} />
                  )}
                </span>
              </div>
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div> */}

            {/* زر التسجيل */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="
    col-span-2 w-full h-[54px] bg-[#2AA0DC] rounded-[32px] text-[20px] font-bold text-white mt-2
    transition-all duration-300 ease-out
    hover:bg-[#238ec4]
    hover:scale-[1.02]
    hover:shadow-[0_8px_20px_rgba(42,160,220,0.35)]
    active:scale-[0.98]
    disabled:opacity-60 disabled:cursor-not-allowed
  "
            >
              {isSubmitting ? t("auth.registering") : t("auth.register")}
            </button>

            {/* تسجيل عبر السوشيال */}
            <div className="col-span-2 flex flex-col items-center gap-3 mt-4">

              <p className="text-[18px] text-[#211C4D] mt-1">
                {t("auth.haveAccount")}{" "}
                <Link to="/login" className="text-[#2AA0DC] hover:underline">
                  {t("auth.loginNow")}
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center">
          <img src={loginimage} className="scale-[0.9]" alt="" />
        </div>
        <img src={bottompattern} className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0 -scale-x-100'}`} alt="" />
      </div>
    </div>
  );
}
