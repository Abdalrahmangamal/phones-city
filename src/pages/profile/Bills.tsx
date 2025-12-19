// Bills.tsx
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import "@/style.css";
import more from "@/assets/images/More.png";
import { Link } from "react-router-dom";
import { useInvoicesStore } from "@/store/profile/indexStore";
import { useSettings } from "@/store/settings"; 

export default function Myorder() {
  // جميع الـ Hooks يجب أن تكون في الأعلى، بدون شروط
  const { invoices, loading, error, fetchInvoices } = useInvoicesStore();
  const { lang } = useSettings();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // بعد الـ Hooks، يمكنك وضع الشروط للعرض
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>جاري تحميل الفواتير...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
        <Sidebar />
        <div className="md:w-[883px] w-full">
          <div className="w-full h-[45px] p-5 bg-[#E5E5E5] flex items-center rounded-[8px]">
            <p className="text-[#211C4DCC] text-[16px] font-[500]">الفواتير</p>
          </div>
          <div className="overflow-x-auto w-[100vw] md:w-[60vw] lg:w-full xl:w-[883px] md:px-0 px-[20px]">
            <table
              dir="rtl"
              className="w-full border-separate border-spacing-y-3 mt-6 text-center min-w-[883px] !rtl"
            >
              <thead>
                <tr className="">
                  <th className="text-center ">
                    <div className="flex items-center !justify-center">
                      <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                        رقم الطلب
                      </p>
                    </div>
                  </th>
                  <th className="text-center ">
                    <div className="flex items-center !justify-center">
                      <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                        رقم الفاتورة
                      </p>
                    </div>
                  </th>
                  <th className="text-center ">
                    <div className="flex items-center !justify-center">
                      <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                        تاريخ الاصدار
                      </p>
                    </div>
                  </th>
                  <th className="text-center ">
                    <div className="flex items-center !justify-center">
                      <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                        المبلغ الاجمالي
                      </p>
                    </div>
                  </th>
                  <th className="text-center ">
                    <div className="flex items-center !justify-center">
                      <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                        التفاصيل
                      </p>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {invoices.length > 0 ? invoices.map((invoice) => (
                  <tr key={invoice.id} className="h-[108px]">
                    <td className="text-[#211C4D] border-b font-[500] py-4">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-full items-center justify-center">
                          <p className="text-center">{invoice.order_number}</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b py-4">
                      <div className="flex justify-center w-full items-center rtl gap-3">
                        <p>{invoice.invoice_number}</p>
                      </div>
                    </td>
                    <td className="text-[#211C4D] border-b text-center font-[500] py-4">
                      <div className="w-full flex items-center justify-center">
                        <p>{invoice.invoice_date}</p>
                      </div>
                    </td>
                    <td className="text-[#211C4D] border-b font-[500] py-4">
                      <div className="w-full flex items-center justify-center">
                        <p>{invoice.total_amount.toLocaleString()} رس</p>
                      </div>
                    </td>
                    <td className="text-[#F3AC5D] border-b text-center font-[600] py-4 w-[160px]">
                      <div className="w-full flex items-center justify-center">
                        <Link to={`/${lang}/singlebills/${invoice.id}`}>
  <img src={more} alt="تفاصيل" />
</Link>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="text-center py-8">
                      <p>لا توجد فواتير</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}