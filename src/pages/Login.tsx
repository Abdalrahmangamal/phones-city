import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import loginimage from "@/assets/images/loginimage.png";
import smalllogo from "@/assets/images/smalllogo.png";
import toppatern from "@/assets/images/toppatern.png";
import bottompattern from "@/assets/images/bottompattern.png";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="w-full flex relative">
        <img src={smalllogo} className="absolute md:right-15 right-2 top-5 z-2" alt="" />
        <img src={toppatern} alt="" className="absolute left-0 z-4 " />
      </div>
      <div className="min-h-screen flex md:mt-[0px] mt-[200px] md:p-0 px-4 z-3 flex-col md:flex-row items-center justify-center gap-20 relative">
        <div className="bg-white rounded-[20px] md:w-[450px]   w-full text-start">
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
              <label className="block mb-2 md:mb-0 text-[24px]  font-[500] text-[#211C4DB2]">
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-0 m-0 bg-transparent hover:bg-transparent focus:ring-0 active:scale-100 border-none shadow-none"
                  >
                    <p className="text-[16px] font-[500] text-[#2AA0DC] mt-2 cursor-pointer">
                      نسيت كلمة المرور؟
                    </p>
                  </Button>
                </DialogTrigger>

                <DialogPortal>
                  {/* خلفية ضبابية */}
                  <DialogOverlay className="fixed inset-0 bg-black/0 backdrop-blur-sm transition-all duration-300" />

                  {/* المودال نفسه */}
                  <DialogContent className="p-10">
                    <DialogHeader>
                      <DialogTitle className="text-[#211C4D] text-center font-[600] text-[24px]">
                        نسيت كلمة المرور؟
                      </DialogTitle>
                      <DialogTitle className="text-[#878787] mt-[30px] text-center font-[500] text-[11px]">
                        أدخل عنوان بريدك الإلكتروني وسنرسل لك رمز التأكيد لإعادة
                        تعيين كلمة المرور الخاصة بك.
                      </DialogTitle>
                      <div>
                        <form>
                          <label className="block mb-2 text-[24px] mt-8 font-[500] text-start text-[#211C4DB2]">
                            البريد الإلكتروني
                          </label>
                          <input
                            type="email"
                            placeholder="username@gmail.com"
                            className="w-full p-3 border rounded-lg mt-2 h-[56px] outline-none focus:ring-2 focus:ring-[#0B60B0]"
                          />
                          <button
  className="
    w-full
    h-[62px]
    bg-[#2AA0DC]
    rounded-[32px]
    text-[24px]
    font-[600]
    text-white
    mt-10
    transition-all
    duration-300
    hover:bg-[#0d8ed2]
    hover:scale-[1.03]
    shadow-[0_4px_10px_rgba(42,160,220,0.3)]
    hover:shadow-[0_6px_14px_rgba(42,160,220,0.5)]
  "
>
  استمر
</button>

                        </form>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </DialogPortal>
              </Dialog>
            </div>

            {/* زر الدخول */}
            <button
              type="submit"
              className="
    w-full 
    bg-[#2AA0DC] 
    text-white 
    py-3 
    rounded-[32px] 
    font-[500] 
    text-[16px] 
    transition-all 
    duration-300 
    hover:bg-[#0d8ed2] 
    hover:scale-[1.03] 
    shadow-[0_4px_10px_rgba(42,160,220,0.4)]
    hover:shadow-[0_6px_14px_rgba(42,160,220,0.6)]
  "
            >
              تسجيل الدخول
            </button>

            {/* تسجيل بحسابات أخرى */}
            <div className="flex justify-center gap-3 mt-4">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="0.5"
                  width="39"
                  height="39"
                  rx="19.5"
                  stroke="#D6D6D6"
                />
                <path
                  d="M30.3055 18.0415H29.5V18H20.5V22H26.1515C25.327 24.3285 23.1115 26 20.5 26C17.1865 26 14.5 23.3135 14.5 20C14.5 16.6865 17.1865 14 20.5 14C22.0295 14 23.421 14.577 24.4805 15.5195L27.309 12.691C25.523 11.0265 23.134 10 20.5 10C14.9775 10 10.5 14.4775 10.5 20C10.5 25.5225 14.9775 30 20.5 30C26.0225 30 30.5 25.5225 30.5 20C30.5 19.3295 30.431 18.675 30.3055 18.0415Z"
                  fill="#FFC107"
                />
                <path
                  d="M11.653 15.3455L14.9385 17.755C15.8275 15.554 17.9805 14 20.5 14C22.0295 14 23.421 14.577 24.4805 15.5195L27.309 12.691C25.523 11.0265 23.134 10 20.5 10C16.659 10 13.328 12.1685 11.653 15.3455Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20.5 30.0001C23.083 30.0001 25.43 29.0116 27.2045 27.4041L24.1095 24.7851C23.0718 25.5743 21.8038 26.0011 20.5 26.0001C17.899 26.0001 15.6905 24.3416 14.8585 22.0271L11.5975 24.5396C13.2525 27.7781 16.6135 30.0001 20.5 30.0001Z"
                  fill="#4CAF50"
                />
                <path
                  d="M30.3055 18.0415H29.5V18H20.5V22H26.1515C25.7571 23.1082 25.0467 24.0766 24.108 24.7855L24.1095 24.7845L27.2045 27.4035C26.9855 27.6025 30.5 25 30.5 20C30.5 19.3295 30.431 18.675 30.3055 18.0415Z"
                  fill="#1976D2"
                />
              </svg>
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="0.5"
                  width="39"
                  height="39"
                  rx="19.5"
                  stroke="#D6D6D6"
                />
                <path
                  d="M30.3055 18.0415H29.5V18H20.5V22H26.1515C25.327 24.3285 23.1115 26 20.5 26C17.1865 26 14.5 23.3135 14.5 20C14.5 16.6865 17.1865 14 20.5 14C22.0295 14 23.421 14.577 24.4805 15.5195L27.309 12.691C25.523 11.0265 23.134 10 20.5 10C14.9775 10 10.5 14.4775 10.5 20C10.5 25.5225 14.9775 30 20.5 30C26.0225 30 30.5 25.5225 30.5 20C30.5 19.3295 30.431 18.675 30.3055 18.0415Z"
                  fill="#FFC107"
                />
                <path
                  d="M11.653 15.3455L14.9385 17.755C15.8275 15.554 17.9805 14 20.5 14C22.0295 14 23.421 14.577 24.4805 15.5195L27.309 12.691C25.523 11.0265 23.134 10 20.5 10C16.659 10 13.328 12.1685 11.653 15.3455Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20.5 30.0001C23.083 30.0001 25.43 29.0116 27.2045 27.4041L24.1095 24.7851C23.0718 25.5743 21.8038 26.0011 20.5 26.0001C17.899 26.0001 15.6905 24.3416 14.8585 22.0271L11.5975 24.5396C13.2525 27.7781 16.6135 30.0001 20.5 30.0001Z"
                  fill="#4CAF50"
                />
                <path
                  d="M30.3055 18.0415H29.5V18H20.5V22H26.1515C25.7571 23.1082 25.0467 24.0766 24.108 24.7855L24.1095 24.7845L27.2045 27.4035C26.9855 27.6025 30.5 25 30.5 20C30.5 19.3295 30.431 18.675 30.3055 18.0415Z"
                  fill="#1976D2"
                />
              </svg>
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="0.5"
                  width="39"
                  height="39"
                  rx="19.5"
                  stroke="#D6D6D6"
                />
                <path
                  d="M30.3055 18.0415H29.5V18H20.5V22H26.1515C25.327 24.3285 23.1115 26 20.5 26C17.1865 26 14.5 23.3135 14.5 20C14.5 16.6865 17.1865 14 20.5 14C22.0295 14 23.421 14.577 24.4805 15.5195L27.309 12.691C25.523 11.0265 23.134 10 20.5 10C14.9775 10 10.5 14.4775 10.5 20C10.5 25.5225 14.9775 30 20.5 30C26.0225 30 30.5 25.5225 30.5 20C30.5 19.3295 30.431 18.675 30.3055 18.0415Z"
                  fill="#FFC107"
                />
                <path
                  d="M11.653 15.3455L14.9385 17.755C15.8275 15.554 17.9805 14 20.5 14C22.0295 14 23.421 14.577 24.4805 15.5195L27.309 12.691C25.523 11.0265 23.134 10 20.5 10C16.659 10 13.328 12.1685 11.653 15.3455Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20.5 30.0001C23.083 30.0001 25.43 29.0116 27.2045 27.4041L24.1095 24.7851C23.0718 25.5743 21.8038 26.0011 20.5 26.0001C17.899 26.0001 15.6905 24.3416 14.8585 22.0271L11.5975 24.5396C13.2525 27.7781 16.6135 30.0001 20.5 30.0001Z"
                  fill="#4CAF50"
                />
                <path
                  d="M30.3055 18.0415H29.5V18H20.5V22H26.1515C25.7571 23.1082 25.0467 24.0766 24.108 24.7855L24.1095 24.7845L27.2045 27.4035C26.9855 27.6025 30.5 25 30.5 20C30.5 19.3295 30.431 18.675 30.3055 18.0415Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

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
        <div className="flex items-center justify-center">
          <img src={loginimage} className="scale-[0.9] md:mb-0 mb-60" alt="" />
        </div>
        <img src={bottompattern} className="absolute bottom-0 right-0" alt="" />
      </div>
    </div>
  );
}
