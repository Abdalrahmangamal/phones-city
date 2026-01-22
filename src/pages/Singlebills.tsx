// Singlebills.tsx
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/layout";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/public/Topbar";
import { useInvoicesStore } from "@/store/profile/indexStore";
import { useLangSync } from "@/hooks/useLangSync";


export default function Singlebills() {
  const { id } = useParams<{ id: string }>();
  const { currentInvoice, singleLoading, singleError, fetchInvoiceById } = useInvoicesStore();
  const printRef = useRef<HTMLDivElement>(null);
  const { lang } = useLangSync();

  useEffect(() => {
    if (id) {
      fetchInvoiceById(parseInt(id));
    }
  }, [id, fetchInvoiceById]);

  // Calculate tax and subtotal (14% VAT included in price)
  const calculateTaxAndSubtotal = () => {
    if (!currentInvoice?.order) {
      return { subtotal: 0, tax: 0, total: 0 };
    }

    // السعر الإجمالي للمنتجات (شامل الضريبة) = مجموع أسعار المنتجات
    const totalPriceWithTax = currentInvoice.order.items.reduce((sum, item) => sum + item.total, 0);
    
    // الضريبة = 14% من السعر الإجمالي
    const taxRate = 0.14;
    const tax = totalPriceWithTax * taxRate;
    
    // المجموع الفرعي = السعر الإجمالي - الضريبة
    const subtotal = totalPriceWithTax - tax;
    
    // الإجمالي النهائي = السعر الإجمالي للمنتجات + الشحن
    const shipping = currentInvoice.order.shipping || 0;
    const total = totalPriceWithTax + shipping;
    
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTaxAndSubtotal();

  const handlePrint = () => {
    if (!currentInvoice) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to print the invoice.");
      return;
    }

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>فاتورة #${currentInvoice.invoice_number}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
                body { font-family: 'Cairo', 'Arial', sans-serif; }
                @media print {
                    .no-print { display: none; }
                    /* Ensure background colors print */
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                }
            </style>
        </head>
        <body class="bg-gray-100 p-0 m-0" dir="rtl">
            <div class="max-w-[800px] mx-auto bg-white p-10 my-10 shadow-lg print:shadow-none print:m-0 print:w-full print:max-w-none">
                
                <!-- Header -->
                <div class="flex justify-between items-start mb-10 pb-5 border-b-4 border-[#2c3e50]">
                    <div class="text-[#2c3e50]">
                        <h1 class="text-[28px] font-bold mb-2">City Phones</h1>
                        <p class="text-sm text-[#7f8c8d]">المملكة العربية السعودية</p>
                    </div>
                    <div class="text-left">
                        <h2 class="text-[#211C4D] text-[32px] font-bold mb-2">فاتورة</h2>
                        <p class="text-sm my-1 text-[#555]"><strong>رقم الفاتورة:</strong> <span class="text-[#2c3e50]">${currentInvoice.invoice_number}</span></p>
                        <p class="text-sm my-1 text-[#555]"><strong>تاريخ الفاتورة:</strong> <span class="text-[#2c3e50]">${currentInvoice.invoice_date}</span></p>
                        <p class="text-sm my-1 text-[#555]"><strong>رقم الطلب:</strong> <span class="text-[#2c3e50]">${currentInvoice.order_number || '-'}</span></p>
                    </div>
                </div>

                <!-- Details -->
                <div class="flex justify-between mb-10 gap-5 flex-wrap">
                    <div class="flex-1 min-w-[200px]">
                        <h3 class="text-[#2c3e50] text-base font-bold mb-3 uppercase border-b border-gray-100 pb-1">معلومات الطلب</h3>
                        <p class="text-sm text-[#555] my-1"><strong>الحالة:</strong> مكتمل</p>
                        <p class="text-sm text-[#555] my-1"><strong>طريقة الدفع:</strong> ${currentInvoice.order.payment_method?.name_ar || "-"}</p>
                    </div>
                    <!-- Placeholders for Ship To if needed later -->
                     <div class="flex-1 min-w-[200px]">
                        <h3 class="text-[#2c3e50] text-base font-bold mb-3 uppercase border-b border-gray-100 pb-1">العميل</h3>
                        <p class="text-sm text-[#555] my-1"><strong>الاسم:</strong> ${currentInvoice.user?.name || 'عميل'}</p>
                    </div>
                </div>

                <!-- Items Table -->
                <table class="w-full border-collapse mb-8">
                    <thead>
                        <tr class="bg-[#211C4D] text-white">
                            <th class="p-3 text-right text-sm font-semibold">المنتج</th>
                            <th class="p-3 text-right text-sm font-semibold">الكمية</th>
                            <th class="p-3 text-right text-sm font-semibold">السعر</th>
                            <th class="p-3 text-right text-sm font-semibold">الإجمالي</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${currentInvoice.order.items.map(item => `
                            <tr class="hover:bg-gray-50 border-b border-gray-200">
                                <td class="p-3 text-sm text-[#333]">
                                    <strong class="block">${lang === 'ar' ? (item.product.name_ar || item.product.name) : (item.product.name_en || item.product.name)}</strong>
                                    ${item.product_option ? `<small class="text-gray-500">${item.product_option.value}</small>` : ''}
                                </td>
                                <td class="p-3 text-sm text-[#333]">${item.quantity}</td>
                                <td class="p-3 text-sm text-[#333]">${item.price.toLocaleString()} رس</td>
                                <td class="p-3 text-sm text-[#333] font-bold">${item.total.toLocaleString()} رس</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <!-- Totals -->
                <div class="flex justify-start mb-10">
                    <table class="w-[350px]">
                        <tr class="border-b border-gray-200">
                            <td class="p-2 text-sm text-[#7f8c8d] font-medium text-right">المجموع الفرعي</td>
                            <td class="p-2 text-sm text-left font-semibold text-[#333]">${subtotal.toLocaleString()} رس</td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-2 text-sm text-[#7f8c8d] font-medium text-right">الضريبة</td>
                            <td class="p-2 text-sm text-left font-semibold text-[#333]">${tax.toLocaleString()} رس</td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-2 text-sm text-[#7f8c8d] font-medium text-right">الشحن</td>
                            <td class="p-2 text-sm text-left font-semibold text-[#333]">${currentInvoice.order.shipping?.toLocaleString() || 0} رس</td>
                        </tr>
                        <tr class="bg-[#2c3e50] text-white text-lg font-bold">
                            <td class="p-3 text-right border-none">الإجمالي</td>
                            <td class="p-3 text-left border-none">${total.toLocaleString()} رس</td>
                        </tr>
                    </table>
                </div>

                <!-- Footer -->
                <div class="text-center pt-5 border-t-2 border-gray-100 text-xs text-[#7f8c8d] mt-12">
                    <p class="mb-1">شكراً لتعاملكم معنا!</p>
                    <p>هذه فاتورة إلكترونية صالحة بدون توقيع.</p>
                </div>
            </div>
            <script>
                window.onload = function() { window.print(); }
            </script>
        </body>
        </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
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
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px] mb-20">
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
                  {/* ... thead ... */}
                  <thead>
                    {/* ... */}
                  </thead>

                  <tbody className="bg-white">
                    {currentInvoice.order.items.map((item) => (
                      <tr key={item.id} className="h-[108px]">
                        <td className="text-[#211C4D] w-[32%] border-b font-[500] py-4">
                          <div className="flex justify-start w-[243px] h-[76px] p-1 bg-[#cbcbcb2b] border rounded-[8px] items-center rtl gap-3">
                            <img
                              src={item.product.main_image || "https://via.placeholder.com/75"}
                              alt={lang === 'ar' ? (item.product.name_ar || item.product.name) : (item.product.name_en || item.product.name)}
                              className="w-[75px] h-[76px] object-contain rounded-md"
                            />
                            <div className="text-start w-[140px]">
                              <p className="font-[600] text-[14px] text-[#211C4D] line-clamp-2 leading-tight" title={item.product.name}>
                                {lang === 'ar' ? (item.product.name_ar || item.product.name) : (item.product.name_en || item.product.name)}
                              </p>
                              <div className="flex flex-col items-end">
                                <p className="text-[14px] text-[#6c6c80] mt-1">×{item.quantity}</p>
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
                  <p className="font-[300] text-[16px] text-[#211C4D]">{subtotal.toLocaleString()} رس</p>
                </div>
                <div className="flex items-center my-5 justify-between">
                  <p className="text-[16px] font-[500] text-[#211C4D]">الضريبة المقدرة</p>
                  <p className="font-[300] text-[16px] text-[#211C4D]">{tax.toLocaleString()} رس</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-[500] text-[#211C4D]">تكلفة الشحن </p>
                  <p className="font-[300] text-[16px] text-[#211C4D]">{currentInvoice.order.shipping?.toLocaleString() || '0'} رس</p>
                </div>
                <div className="flex items-center mt-6 justify-between">
                  <p className="text-[24px] font-[500] text-[#211C4D]">المجموع الاجمالي </p>
                  <p className="text-[24px] font-[500] text-[#211C4D]">{total.toLocaleString()} رس </p>
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
                  <p className="text-[24px] font-[500] text-[#211C4D]">{total.toLocaleString()}</p>
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