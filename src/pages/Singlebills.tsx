import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import macbook from "../assets/images/macbook.png";
import Paymentdetails from "@/components/singlebills/Paymentdetails";
import Paymentinformation from "@/components/singlebills/Paymentinformation";
import Topbar from "@/components/public/Topbar";
export default function Singlebills() {
  return (
    <div>
      <Layout>
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[883px] w-full">
            <Topbar title={"تفاصيل الفاتوره #7473567"} btn={true} />
            <div className="overflow-x-auto w-[100vw] md:w-[60vw] lg:w-full xl:w-[883px] md:px-0 px-[20px]">
              <table
                dir="rtl"
                className="w-full border-separate border-spacing-y-3 mt-6 text-center min-w-[883px] !rtl"
              >
                <thead>
                  <tr className="">
                    <th className="text-center ">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          المنتج
                        </p>
                      </div>
                    </th>
                    <th className="text-center ">
                      <div className="flex items-center !justify-center">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          السعر
                        </p>
                      </div>
                    </th>
                    <th className="text-center ">
                      <div className="flex items-center !justify-center">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          الكميه
                        </p>
                      </div>
                    </th>
                    <th className="text-center ">
                      <div className="flex items-center !justify-center">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          السعر الاجمالي
                        </p>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  <tr className="h-[108px]">
                    <td className="text-[#211C4D] w-[32%] border-b  font-[500] py-4">
                      <div className="flex justify-start w-[243px] h-[76px] p-1 bg-[#cbcbcb2b] border rounded-[8px] items-center rtl gap-3">
                        <img
                          src={macbook}
                          alt="Watch"
                          className="w-[75px] h-[76px] object-contain rounded-md"
                        />
                        <div className="text-start ">
                          <p className="font-[600] text-[14px] text-[#211C4D]">
                            لابتوب أبل ماك بوك
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-[14px] text-[#6c6c80]">×1</p>
                            <p className="text-[14px] text-[#6c6c80]">أبيض</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className=" border-b  py-4">
                      <div className="flex justify-center w-full   items-center rtl gap-3">
                        <p>39,900رس</p>
                      </div>
                    </td>
                    <td className="text-[#211C4D] border-b  text-center font-[500] py-4">
                      <div className="w-full flex items-center justify-center">
                        <p>1</p>
                      </div>
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      <div className="w-full flex items-center justify-center">
                        <p>39,900رس</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Topbar title={"تفاصيل الدفع"} />
            <Paymentdetails />
            <Topbar title={"معلومات الدفع"} />
            <Paymentinformation/>
          </div>
        </div>
      </Layout>
    </div>
  );
}
