import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";
import content_copy from "@/assets/images/content_copy.png";
import { useTranslation } from "react-i18next";

export default function Discounts() {
      const { t } = useTranslation();

  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const discounts = [
    { id: 1, code: "phone_1234", discount: "5%", title: "للطلب الأول" },
    { id: 2, code: "lab_1234", discount: "5%", title: "للطلب الأول" },
    { id: 3, code: "tab_1234", discount: "5%", title: "للطلب الأول" },
    { id: 4, code: "mac_1234", discount: "5%", title: "للطلب الأول" },
  ];
  return (
    <div>
      <Layout>
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[883px] w-full">
            <section className="w-full flex flex-col items-start px-4 py-10">
              <h2 className="text-[#211C4D] text-[20px]  font-[600] mb-6">
                {t("Discounts")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-6 w-full">
                {discounts.map((item, i) => (
                  <div
                    key={i}
                    dir="rtl"
                    className="border border-[#E0E0E0] rounded-lg p-5 text-right shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-[#211C4D] text-[28px] font-[700] ">
                          {item.discount} خصم
                        </h3>
                        <p className="text-[#211C4D] text-[16px] font-[600] mt-1">
                          {item.title}
                        </p>
                        <div className="flex items-center justify-between gap-2 mt-10">
                          <span className="text-[#F3AC5D] font-medium text-sm">
                            كود: {item.code}
                          </span>
                          <button
                            onClick={() => handleCopy(item.code, item.id)}
                            className="flex items-center gap-1 text-[#211C4D] text-sm hover:opacity-70 transition-all"
                          >
                            <span className="text-[12px] font-[600] text-[#001246]">
                              {copied === item.id ? "تم النسخ!" : "نسخ"}
                            </span>

                            <img src={content_copy} alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 text-[13px] text-[#7B7B93] leading-6 space-y-1">
                        <p>تاريخ الصلاحية.</p>
                        <ul className="list-disc mb-6  pr-4 space-y-1">
                          <li>04:00 05/08/2021 – 12:00 09/08/2021</li>
                          <li>لكل المنتجات.</li>
                          <li>
                            التركيبات: احصل على خصم 20% عند إنفاق أكثر من 169.00
                            رس، أو احصل على خصم 15% عند إنفاق أكثر من 89.00 رس.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </div>
  );
}
