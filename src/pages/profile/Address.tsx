import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";
import edit from "@/assets/images/aedit.png";
import close from "@/assets/images/Close.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Address() {
    const { t } = useTranslation();

  const [selectedId, setSelectedId] = useState<number | null>(1);

  const addresses = [
    {
      id: 1,
      type: "المنزل",
      address: "2118 شارع الملك محمد",
      details: "ابو بكر الصديق، شبرا، الهاتف: 26522",
      phone: "0999999999999",
    },
    {
      id: 2,
      type: "الشغل",
      address: "2118 شارع الملك محمد",
      details: "ابو بكر الصديق، شبرا، الهاتف: 26522",
      phone: "0999999999999",
    },
  ];
  return (
    <div>
      <Layout>
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[883px] w-full">
            <p className="text-[20px] text-[#211C4D] font-[600]"> {t("Address")}</p>
            <div className="w-full   mt-10">
              {addresses.map((item) => (
                <div
                  key={item.id}
                  className={`flex justify-between my-12 items-center bg-[#F7F7F7] rounded-xl p-5 mb-4 relative transition-all duration-300 ${
                    selectedId === item.id
                      ? "border border-[#211C4D] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                      : "border border-transparent"
                  }`}
                >
                  {/* Right Side (Address Info) */}
                  <div className="text-right ">
                    <div className="flex items-center justify-end gap-3">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedId === item.id}
                        onChange={() => setSelectedId(item.id)}
                        className="relative w-5 h-5 cursor-pointer appearance-none border-2 border-[#F3AC5D] rounded-full bg-white checked:border-[#F3AC5D] checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-2.5 checked:after:h-2.5 checked:after:rounded-full checked:after:bg-[#F3AC5D]"
                      />

                      <p className="font-semibold text-[#211C4D] text-[17px]">
                        {item.address}
                      </p>
                      <span
                        className={`text-white text-[13px] rounded-md px-3 py-1 ${
                          item.type === "المنزل"
                            ? "bg-[#F4B740]"
                            : "bg-[#F3AC5D]"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-[15px] mt-2">
                      {item.details}
                    </p>
                    <p className="text-gray-600 text-[15px] mt-1">
                      {item.phone}
                    </p>
                  </div>
                  {/* Left Side (Edit + Delete) */}
                  <div className="flex h-full items-center gap-3">
                    <button className="text-gray-500 hover:text-red-600 text-xl">
                      <img src={close} alt="" />
                    </button>
                    <button className="text-gray-500 hover:text-[#211C4D] text-xl">
                      <img src={edit} alt="" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Address */}
              <div className="w-full flex flex-col  items-center mt-15">
                {/* الخط المتقطع */}
                <div className="relative w-full flex items-center justify-center">
                  <div className="border-t border-dashed border-gray-300 w-full"></div>
                  <div className="absolute bg-white rounded-full flex items-center justify-center w-6 h-6 border border-gray-300">
                    <span className="bg-[#211C4D] text-white rounded-full w-5 h-5 flex items-center justify-center text-[16px] leading-none">
                      +
                    </span>
                  </div>
                </div>

                {/* النص */}
                <Link className="mt-3 text-[#211C4D] text-[14px] font-medium hover:opacity-80" to={"/singleaddress"}>
                  {t("Addanewtitle")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
