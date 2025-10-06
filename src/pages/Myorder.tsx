import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import "../style.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import macbook from "../assets/images/macbook.png";
import image from "../assets/images/air.png";
export default function Myorder() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
        <Sidebar />
        <div className="w-[883px]">
          <div className="w-full h-[45px] p-5 bg-[#E5E5E5] flex items-center rounded-[8px]">
            <p className="text-[#211C4DCC] text-[16px] font-[500]">
              طلباتي
            </p>
          </div>
          <Tabs defaultValue="total" className="w-full mt-[40px]">
            <div className="border-b-2 h-[60px]">
              <TabsList className="flex items-center justify-between w-full bg-transparent   rounded-none px-5 ">
                <TabsTrigger
                  value="Cancelled"
                  className="transition-none !shadow-none text-[16px] flex-none font-[400] text-[#211C4D99] tabs-trigger rounded-none"
                >
                  ملغي 2
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="transition-none !shadow-none text-[#211C4D99] flex-none tabs-trigger rounded-none w-fit"
                >
                  مكتمل 1
                </TabsTrigger>
                <TabsTrigger
                  value="Delivering"
                  className="transition-none !shadow-none text-[#211C4D99] flex-none tabs-trigger rounded-none"
                >
                  جاري التوصيل 2
                </TabsTrigger>
                <TabsTrigger
                  value="total"
                  className="transition-none !shadow-none text-[#211C4D99] flex-none tabs-trigger rounded-none"
                >
                  5 الجميع
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="total">
                <div className="">
              <table
                dir="rtl"
                className="w-full border-separate border-spacing-y-3 mt-6 text-center !rtl min-w-[850px] overflow-x-auto"
              >
                <thead>
                  <tr className="">
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          رقم الطلب
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
                          التاريخ
                        </p>
                      </div>
                    </th>
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          السعر الاجمالي
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
                        #7473567
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
                      2024/10/12
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      399 رس
                    </td>
                    <td className="text-[#F3AC5D] border-b  font-[600] py-4 w-[160px]">
                      في الطريق
                    </td>
                  </tr>
                  <tr className="h-[108px]">
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <input
                          type="checkbox"
                          className="w-[24px] h-[24px] accent-[#211C4D] !border-3 border-[#211C4D] !rounded-[8px] cursor-pointer"
                        />
                        #7473567
                      </div>
                    </td>
                    <td className=" border-b  py-4">
                      <div className="flex justify-start w-[243px] h-[76px] p-1 bg-[#cbcbcb2b] border rounded-[8px] items-center rtl gap-3">
                        <img
                          src={image}
                          alt="Watch"
                          className="w-[75px] h-[76px] object-contain rounded-md"
                        />
                        <div className="text-start  text-[14px]">
                          <p className="font-[600] text-[#211C4D]">
                            ساعة ابل ذكية سلسلة
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-[14px] text-[#6c6c80]">×1</p>
                            <p className="text-[14px] text-[#6c6c80]">أبيض</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      2024/10/12
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      399 رس
                    </td>
                    <td className="text-[#F3AC5D] border-b   font-[600] py-4">
                      تم الاستلام من المتجر
                    </td>
                  </tr>
                  <tr className="h-[108px]">
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <input
                          type="checkbox"
                          className="w-[24px] h-[24px] accent-[#211C4D] !border-3 border-[#211C4D] !rounded-[8px] cursor-pointer"
                        />
                        #7473567
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
                      2024/10/12
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      399 رس
                    </td>
                    <td className="text-[#34A853] border-b  font-[600] py-4 w-[160px]">
                      مكتمل
                    </td>
                  </tr>
                  <tr className="h-[108px]">
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <input
                          type="checkbox"
                          className="w-[24px] h-[24px] accent-[#211C4D] !border-3 border-[#211C4D] !rounded-[8px] cursor-pointer"
                        />
                        #7473567
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
                      2024/10/12
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      399 رس
                    </td>
                    <td className="text-[#E50000] border-b  font-[600] py-4 w-[160px]">
                      ملغي
                    </td>
                  </tr>
                  <tr className="h-[108px]">
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <input
                          type="checkbox"
                          className="w-[24px] h-[24px] accent-[#211C4D] !border-3 border-[#211C4D] !rounded-[8px] cursor-pointer"
                        />
                        #7473567
                      </div>
                    </td>
                    <td className=" border-b  py-4">
                      <div className="flex justify-start w-[243px] h-[76px] p-1 bg-[#cbcbcb2b] border rounded-[8px] items-center rtl gap-3">
                        <img
                          src={image}
                          alt="Watch"
                          className="w-[75px] h-[76px] object-contain rounded-md"
                        />
                        <div className="text-start  text-[14px]">
                          <p className="font-[600] text-[#211C4D]">
                            ساعة ابل ذكية سلسلة
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-[14px] text-[#6c6c80]">×1</p>
                            <p className="text-[14px] text-[#6c6c80]">أبيض</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      2024/10/12
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      399 رس
                    </td>
                    <td className="text-[#E50000] border-b  font-[600] py-4 w-[160px]">
                      ملغي
                    </td>
                  </tr>
                </tbody>
              </table>
                </div>
            </TabsContent>
            <TabsContent value="Delivering">
              <table
                dir="rtl"
                className="w-full border-separate border-spacing-y-3 mt-6 text-center !rtl"
              >
                <thead>
                  <tr className="">
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          رقم الطلب
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
                          التاريخ
                        </p>
                      </div>
                    </th>
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          السعر الاجمالي
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
                        #7473567
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
                      2024/10/12
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      399 رس
                    </td>
                    <td className="text-[#F3AC5D] border-b  font-[600] py-4 w-[160px]">
                      في الطريق
                    </td>
                  </tr>
                  <tr className="h-[108px]">
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <input
                          type="checkbox"
                          className="w-[24px] h-[24px] accent-[#211C4D] !border-3 border-[#211C4D] !rounded-[8px] cursor-pointer"
                        />
                        #7473567
                      </div>
                    </td>
                    <td className=" border-b  py-4">
                      <div className="flex justify-start w-[243px] h-[76px] p-1 bg-[#cbcbcb2b] border rounded-[8px] items-center rtl gap-3">
                        <img
                          src={image}
                          alt="Watch"
                          className="w-[75px] h-[76px] object-contain rounded-md"
                        />
                        <div className="text-start  text-[14px]">
                          <p className="font-[600] text-[#211C4D]">
                            ساعة ابل ذكية سلسلة
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-[14px] text-[#6c6c80]">×1</p>
                            <p className="text-[14px] text-[#6c6c80]">أبيض</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      2024/10/12
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      399 رس
                    </td>
                    <td className="text-[#F3AC5D] border-b   font-[600] py-4">
                      تم الاستلام من المتجر
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="completed">
              <table
                dir="rtl"
                className="w-full border-separate border-spacing-y-3 mt-6 text-center !rtl"
              >
                <thead>
                  <tr className="">
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          رقم الطلب
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
                          التاريخ
                        </p>
                      </div>
                    </th>
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          السعر الاجمالي
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
                        #7473567
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
                      2024/10/12
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      399 رس
                    </td>
                    <td className="text-[#34A853] border-b  font-[600] py-4 w-[160px]">
                      مكتمل
                    </td>
                  </tr>
                  <tr className="h-[108px]">
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <input
                          type="checkbox"
                          className="w-[24px] h-[24px] accent-[#211C4D] !border-3 border-[#211C4D] !rounded-[8px] cursor-pointer"
                        />
                        #7473567
                      </div>
                    </td>
                    <td className=" border-b  py-4">
                      <div className="flex justify-start w-[243px] h-[76px] p-1 bg-[#cbcbcb2b] border rounded-[8px] items-center rtl gap-3">
                        <img
                          src={image}
                          alt="Watch"
                          className="w-[75px] h-[76px] object-contain rounded-md"
                        />
                        <div className="text-start  text-[14px]">
                          <p className="font-[600] text-[#211C4D]">
                            ساعة ابل ذكية سلسلة
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-[14px] text-[#6c6c80]">×1</p>
                            <p className="text-[14px] text-[#6c6c80]">أبيض</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      2024/10/12
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      399 رس
                    </td>
                    <td className="text-[#34A853] border-b  font-[600] py-4 w-[160px]">
                      مكتمل
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="Cancelled">
              <table
                dir="rtl"
                className="w-full border-separate border-spacing-y-3 mt-6 text-center !rtl"
              >
                <thead>
                  <tr className="">
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          رقم الطلب
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
                          التاريخ
                        </p>
                      </div>
                    </th>
                    <th className="text-right pb-6">
                      <div className="flex items-center !justify-start">
                        <p className="bg-[#ABD1E7] text-[#211C4D] text-[13px] font-[500] pt-1 px-5  rounded-[8px] w-fit">
                          السعر الاجمالي
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
                        #7473567
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
                      2024/10/12
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      399 رس
                    </td>
                    <td className="text-[#E50000] border-b  font-[600] py-4 w-[160px]">
                      ملغي
                    </td>
                  </tr>
                  <tr className="h-[108px]">
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      <div className="flex items-center gap-2 justify-start">
                        <input
                          type="checkbox"
                          className="w-[24px] h-[24px] accent-[#211C4D] !border-3 border-[#211C4D] !rounded-[8px] cursor-pointer"
                        />
                        #7473567
                      </div>
                    </td>
                    <td className=" border-b  py-4">
                      <div className="flex justify-start w-[243px] h-[76px] p-1 bg-[#cbcbcb2b] border rounded-[8px] items-center rtl gap-3">
                        <img
                          src={image}
                          alt="Watch"
                          className="w-[75px] h-[76px] object-contain rounded-md"
                        />
                        <div className="text-start  text-[14px]">
                          <p className="font-[600] text-[#211C4D]">
                            ساعة ابل ذكية سلسلة
                          </p>
                          <div className="flex flex-col items-end">
                            <p className="text-[14px] text-[#6c6c80]">×1</p>
                            <p className="text-[14px] text-[#6c6c80]">أبيض</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      2024/10/12
                    </td>
                    <td className="text-[#211C4D] border-b  font-[500] py-4">
                      399 رس
                    </td>
                    <td className="text-[#E50000] border-b  font-[600] py-4 w-[160px]">
                      ملغي
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
