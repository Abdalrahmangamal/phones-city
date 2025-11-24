import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { useTranslation } from "react-i18next";

import user from "@/assets/images/User.png";
import edit from "@/assets/images/edit.png";
import call from "@/assets/images/call-calling.png";
import sms from "@/assets/images/sms.png";
import home from "@/assets/images/home-2.png";
import key from "@/assets/images/key.png";
import Offerherosection from "@/components/public/Offerherosection";
export default function profile() {
      const { t } = useTranslation();

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
        <Sidebar />
        <div className="md:w-[883px] px-5 md:px-0">
          <div className="w-full h-[45px] p-5 bg-[#E5E5E5] flex items-center rounded-[8px]">
            <p className="text-[#211C4DCC] text-[16px] font-[500]">
              {t("PersonalData")}
            </p>
          </div>
          <form action="" className="grid mt-11 gap-[20px] md:grid-cols-2 grid-cols-1">
            <div className="">
              <label htmlFor="" className="text-[#211C4DCC] text-[14px] font-[500] ">{t("FirstName")}</label>
              <div className="relative">
              <input type="text" placeholder="منه " className="w-full h-[48px] px-[40px] rounded-[8px] border  border-[#939393]" />
              <img src={user} className="absolute start-3 top-3" alt="" />
              <img src={edit} className="absolute end-3 top-3" alt="" />

              </div>
            </div>
            <div className="">
              <label htmlFor="" className="text-[#211C4DCC] text-[14px] font-[500] ">{t("LastName")}</label>
              <div className="relative">
              <input type="text" placeholder=" ابوطالب  " className="w-full h-[48px] px-[40px] rounded-[8px] border  border-[#939393]" />
              <img src={user} className="absolute start-3 top-3" alt="" />
              <img src={edit} className="absolute end-3 top-3" alt="" />

              </div>
            </div>
            <div className="">
              <label htmlFor="" className="text-[#211C4DCC] text-[14px] font-[500] ">{t("PhoneNumber")}</label>
              <div className="relative">
              <input type="text" placeholder="+966999999999 " className="w-full h-[48px] px-[40px] rounded-[8px] border  border-[#939393]" />
              <img src={call} className="absolute start-3 top-3" alt="" />
              <img src={edit} className="absolute end-3 top-3" alt="" />

              </div>
            </div>
            <div className="">
              <label htmlFor="" className="text-[#211C4DCC] text-[14px] font-[500] ">{t("EmailAddress")}</label>
              <div className="relative">
              <input type="text" placeholder="memo@email.com " className="w-full h-[48px] px-[40px] rounded-[8px] border  border-[#939393]" />
              <img src={sms} className="absolute start-3 top-3" alt="" />
              <img src={edit} className="absolute end-3 top-3" alt="" />

              </div>
            </div>
            <div className="">
              <label htmlFor="" className="text-[#211C4DCC] text-[14px] font-[500] ">{t("FullAddress")}</label>
              <div className="relative">
              <input type="text" placeholder="ابو بكر الصديق، شبرا، الطائف 26522، " className="w-full h-[48px] px-[40px] rounded-[8px] border  border-[#939393]" />
              <img src={home} className="absolute start-3 top-3" alt="" />
              <img src={edit} className="absolute end-3 top-3" alt="" />

              </div>
            </div>
            <div className="">
              <label htmlFor="" className="text-[#211C4DCC] text-[14px] font-[500] ">{t("UserPassword")}</label>
              <div className="relative">
              <input type="text" placeholder="*********** " className="w-full h-[48px] px-[40px] rounded-[8px] border  border-[#939393]" />
              <img src={key} className="absolute start-3 top-3" alt="" />
              <img src={edit} className="absolute end-3 top-3" alt="" />

              </div>
            </div>
          </form>
        <Offerherosection title={"افضل اجهزه الكمبيوتر المحموله"} padding="!px-0" description={"استمتع بتجربة استثنائية مع أحدث الهواتف بأفضل الأسعار وخدمة ما بعد البيع المميزة"} style={"!h-[243px]"} descriptionstyle={"!max-w-[60%]"} textstyle={"!text-[32px] !max-w-[80%]"}/>
        </div>
      </div>
    </Layout>
  );
}
