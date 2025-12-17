// Singlebills.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import Paymentdetails from "@/components/singlebills/Paymentdetails";
import Paymentinformation from "@/components/singlebills/Paymentinformation";
import Topbar from "@/components/public/Topbar";
import { useInvoicesStore } from "@/store/profile/indexStore";


export default function Singlebills() {
  const { id } = useParams<{ id: string }>(); 
  const { currentInvoice, singleLoading, singleError, fetchInvoiceById } = useInvoicesStore();

  useEffect(() => {
    if (id) {
      fetchInvoiceById(parseInt(id));
    }
  }, [id, fetchInvoiceById]);

  if (singleLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>جاري تحميل تفاصيل الفاتورة...</p>
        </div>
      </Layout>
    );
  }

  if (singleError || !currentInvoice) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{singleError || "لم يتم العثور على الفاتورة"}</p>
        </div>
      </Layout>
    );
  }

  return (
    <div>
      <Layout>
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[883px] w-full">
            <Topbar title={`تفاصيل الفاتورة #${currentInvoice.invoice_number}`} btn={true} />
            
            {/* جدول المنتجات */}
            <div className="overflow-x-auto w-[100vw] md:w-[60vw] lg:w-full xl:w-[883px] md:px-0 px-[20px]">
              <table
                dir="rtl"
                className="w-full border-separate border-spacing-y-3 mt-6 text-center min-w-[883px] !rtl"
              >
                <thead>
                  <tr className="">
                    <th className="text-center ">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5 rounded-[8px] w-fit">
                          المنتج
                        </p>
                      </div>
                    </th>
                    <th className="text-center ">
                      <div className="flex items-center !justify-center">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5 rounded-[8px] w-fit">
                          السعر
                        </p>
                      </div>
                    </th>
                    <th className="text-center ">
                      <div className="flex items-center !justify-center">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5 rounded-[8px] w-fit">
                          الكميه
                        </p>
                      </div>
                    </th>
                    <th className="text-center ">
                      <div className="flex items-center !justify-center">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5 rounded-[8px] w-fit">
                          السعر الاجمالي
                        </p>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {currentInvoice.order.items.map((item) => (
                    <tr key={item.id} className="h-[108px]">
                      <td className="text-[#211C4D] w-[32%] border-b font-[500] py-4">
                        <div className="flex justify-start w-[243px] h-[76px] p-1 bg-[#cbcbcb2b] border rounded-[8px] items-center rtl gap-3">
                          <img
                            src={item.product.main_image || "https://via.placeholder.com/75"}
                            alt={item.product.name}
                            className="w-[75px] h-[76px] object-contain rounded-md"
                          />
                          <div className="text-start">
                            <p className="font-[600] text-[14px] text-[#211C4D]">
                              {item.product.name}
                            </p>
                            <div className="flex flex-col items-end">
                              <p className="text-[14px] text-[#6c6c80]">×{item.quantity}</p>
                              {item.product_option && (
                                <p className="text-[14px] text-[#6c6c80]">
                                  {item.product_option.value}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border-b py-4">
                        <div className="flex justify-center w-full items-center rtl gap-3">
                          <p>{item.price.toLocaleString()} رس</p>
                        </div>
                      </td>
                      <td className="text-[#211C4D] border-b text-center font-[500] py-4">
                        <div className="w-full flex items-center justify-center">
                          <p>{item.quantity}</p>
                        </div>
                      </td>
                      <td className="text-[#211C4D] border-b font-[500] py-4">
                        <div className="w-full flex items-center justify-center">
                          <p>{item.total.toLocaleString()} رس</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Topbar title={"تفاصيل الدفع"} />
            <Paymentdetails invoice={currentInvoice} />
            
            <Topbar title={"معلومات الدفع"} />
            <Paymentinformation invoice={currentInvoice} />
          </div>
        </div>
      </Layout>
    </div>
  );
}