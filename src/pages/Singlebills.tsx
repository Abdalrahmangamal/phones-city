// Singlebills.tsx
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/layout";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/public/Topbar";
import { useInvoicesStore } from "@/store/profile/indexStore";


export default function Singlebills() {
  const { id } = useParams<{ id: string }>(); 
  const { currentInvoice, singleLoading, singleError, fetchInvoiceById } = useInvoicesStore();
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      fetchInvoiceById(parseInt(id));
    }
  }, [id, fetchInvoiceById]);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      
      // Use the same window for printing
      const originalContent = document.body.innerHTML;
      
      document.body.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif; direction: rtl;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1>فاتورة رقم #${currentInvoice?.invoice_number}</h1>
          </div>
          ${printContent}
        </div>
      `;
      
      window.print();
      
      // Restore original content
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

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
            <Topbar title={`تفاصيل الفاتورة #${currentInvoice.invoice_number}`} btn={true} onPrint={handlePrint} />
            
            {/* Printable Content */}
            <div ref={printRef}>
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

              {/* Payment Details Section */}
              <div className="md:w-[883px] shadow-[0_4px_8px_rgba(0,0,0,0.2)] rounded-xl bg-white py-4 px-6 mt-4">
                <h2 className="text-[24px] font-[500] text-[#211C4D] mb-4">تفاصيل الدفع</h2>
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-[500] text-[#211C4D]">المجموع الفرعي</p>
                  <p className="font-[300] text-[16px] text-[#211C4D]">{currentInvoice.order.subtotal?.toLocaleString() || '0'} رس</p>
                </div>
                <div className="flex items-center my-5 justify-between">
                  <p className="text-[16px] font-[500] text-[#211C4D]">الضريبة المقدرة</p>
                  <p className="font-[300] text-[16px] text-[#211C4D]">{currentInvoice.order.tax?.toLocaleString() || '0'} رس</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-[500] text-[#211C4D]">تكلفة الشحن </p>
                  <p className="font-[300] text-[16px] text-[#211C4D]">{currentInvoice.order.shipping?.toLocaleString() || '0'} رس</p>
                </div>
                <div className="flex items-center mt-6 justify-between">
                  <p className="text-[24px] font-[500] text-[#211C4D]">المجموع الاجمالي </p>
                  <p className="text-[24px] font-[500] text-[#211C4D]">{currentInvoice.order.total?.toLocaleString() || '0'} رس </p>
                </div>
              </div>
              
              {/* Payment Information Section */}
              <div className="md:w-[883px] flex-col md:flex-row flex items-center justify-between shadow-[0_4px_8px_rgba(0,0,0,0.2)] rounded-xl bg-white md:py-4 px-6 py-4 mt-4">
                <div className="text-center md:text-start">
                  <h2 className="text-[24px] font-[500] text-[#211C4D] mb-4">معلومات الدفع</h2>
                  <p className="text-[#211C4D] text-[16px] font-[500] md:mt-2 md:mr-2">
                    طريقه الدفع
                  </p>
                  <p className="text-[24px] text-[#211C4D] font-[500] mr-2">
                    {currentInvoice.order.payment_method?.name_ar || "بطاقه ائتمان"}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-[16px] font-[500] text-[#211C4D]">
                    المبلغ الإجمالي
                  </p>
                  <p className="text-[24px] font-[500] text-[#211C4D]">{currentInvoice.order.total?.toLocaleString() || "0"}</p>
                </div>
                <div>
                  <img
                    src="/src/assets/images/sucsespayment.png"
                    className="w-[100px] h-[122px] object-contain"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}