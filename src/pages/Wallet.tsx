import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import "../style.css";
import macbook from "../assets/images/macbook.png";
import warning from "../assets/images/warning.png";
export default function Wallet() {
  return (
    <div>
      <Layout>
        <div className="flex flex-col mb-40 md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[883px] w-full">
            <div className="w-full  justify-between h-[45px] px-7 p-5 bg-[#E5E5E5] flex items-center rounded-[8px]">
              <p className="text-[#211C4DCC] text-[16px] font-[500]">نقاطي</p>
              <p>270 نقطه</p>
            </div>
            <div className="w-full  justify-between h-[60px] px-7  mt-[20px] p-5 bg-[#F3AC5D73] flex items-center rounded-[8px]">
              <p className="text-[#211C4DCC] text-[24px] font-[500]">
                تنبيه لك 200 نقطه تنتهي خلال 7 ايام - استخدمها الان
              </p>

              <img src={warning} alt="" />
            </div>
      <div className="overflow-x-auto w-[100vw] md:w-[60vw] lg:w-full xl:w-[883px] md:px-0 px-[20px]">
              <table
                dir="rtl"
                className="w-full border-separate border-spacing-y-3 mt-6 text-center !rtl min-w-[883px] overflow-x-auto"
              >
                <thead>
                  <tr className="">
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-2  rounded-[8px] w-fit">
                        التاريخ الصلاحيه
                        </p>
                      </div>
                    </th>
                    <th className="text-right pb-6 w-[35%]">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          المنتج
                        </p>
                      </div>
                    </th>
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          عدد النقاط
                        </p>
                      </div>
                    </th>
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                        العمليه
                        </p>
                      </div>
                    </th>
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          الحاله
                        </p>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  <tr className="h-[108px]">
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <input
                          type="checkbox"
                          className="w-[24px] h-[24px] accent-[#211C4D] !border-3 border-[#211C4D] !rounded-[8px] cursor-pointer"
                        />
                        2024/10/12
                      </div>
                    </td>
                    <td className=" border-b  py-4">
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
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      <div className="flex items-center justify-center">

                    70
                      </div>
                    </td>
                    <td className="text-[#40A529] border-b  font-[500] py-4">
                    +70
                    </td>
                    <td className="text-[#211C4D] border-b  font-[600] py-4 w-[160px]">
                      صالحة
                    </td>
                  </tr>
              
                  <tr className="h-[108px]">
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <input
                          type="checkbox"
                          className="w-[24px] h-[24px] accent-[#211C4D] !border-3 border-[#211C4D] !rounded-[8px] cursor-pointer"
                        />
                        2024/10/12
                      </div>
                    </td>
                    <td className=" border-b  py-4">
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
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                    70
                    </td>
                    <td className="text-[#40A529] border-b  font-[500] py-4">
                    +70
                    </td>
                    <td className="text-[#211C4D] border-b  font-[600] py-4 w-[160px]">
                      صالحة
                    </td>
                  </tr>
              
                </tbody>
              </table>
                </div>          </div>
        </div>
      </Layout>
    </div>
  );
}
