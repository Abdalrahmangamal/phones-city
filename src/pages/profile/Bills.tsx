import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import "@/style.css";
import more from "@/assets/images/More.png";
import { Link } from "react-router-dom";
export default function Myorder() {
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
                        المبلع الاجمالي
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
                <tr className="h-[108px]">
                  <td className="text-[#211C4D] border-b  font-[500] py-4">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-full items-center justify-center">
                        <p className="text-center">#7473567</p>
                      </div>
                    </div>
                  </td>
                  <td className=" border-b  py-4">
                    <div className="flex justify-center w-full   items-center rtl gap-3">
                      <p>#7473567</p>
                    </div>
                  </td>
                  <td className="text-[#211C4D] border-b  text-center font-[500] py-4">
                    <div className="w-full flex items-center justify-center">
                      <p>2024/10/12</p>
                    </div>
                  </td>
                  <td className="text-[#211C4D] border-b  font-[500] py-4">
                    <div className="w-full flex items-center justify-center">
                      <p>1,104 رس</p>
                    </div>
                  </td>
                  <td className="text-[#F3AC5D] border-b text-center font-[600] py-4 w-[160px]">
                    <div className="w-full flex items-center justify-center">
                      <Link to={"/singlebills"}>
                        <img src={more} alt="" />
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr className="h-[108px]">
                  <td className="text-[#211C4D] border-b  font-[500] py-4">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-full items-center justify-center">
                        <p className="text-center">#7473567</p>
                      </div>
                    </div>
                  </td>
                  <td className=" border-b  py-4">
                    <div className="flex justify-center w-full   items-center rtl gap-3">
                      <p>#7473567</p>
                    </div>
                  </td>
                  <td className="text-[#211C4D] border-b  text-center font-[500] py-4">
                    <div className="w-full flex items-center justify-center">
                      <p>2024/10/12</p>
                    </div>
                  </td>
                  <td className="text-[#211C4D] border-b  font-[500] py-4">
                    <div className="w-full flex items-center justify-center">
                      <p>1,104 رس</p>
                    </div>
                  </td>
                  <td className="text-[#F3AC5D] border-b text-center font-[600] py-4 w-[160px]">
                    <div className="w-full flex items-center justify-center">
                      <Link to={"/singlebills"}>
                        <img src={more} alt="" />
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr className="h-[108px]">
                  <td className="text-[#211C4D] border-b  font-[500] py-4">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-full items-center justify-center">
                        <p className="text-center">#7473567</p>
                      </div>
                    </div>
                  </td>
                  <td className=" border-b  py-4">
                    <div className="flex justify-center w-full   items-center rtl gap-3">
                      <p>#7473567</p>
                    </div>
                  </td>
                  <td className="text-[#211C4D] border-b  text-center font-[500] py-4">
                    <div className="w-full flex items-center justify-center">
                      <p>2024/10/12</p>
                    </div>
                  </td>
                  <td className="text-[#211C4D] border-b  font-[500] py-4">
                    <div className="w-full flex items-center justify-center">
                      <p>1,104 رس</p>
                    </div>
                  </td>
                  <td className="text-[#F3AC5D] border-b text-center font-[600] py-4 w-[160px]">
                    <div className="w-full flex items-center justify-center">
                      <Link to={"/singlebills"}>
                        <img src={more} alt="" />
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr className="h-[108px]">
                  <td className="text-[#211C4D] border-b  font-[500] py-4">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-full items-center justify-center">
                        <p className="text-center">#7473567</p>
                      </div>
                    </div>
                  </td>
                  <td className=" border-b  py-4">
                    <div className="flex justify-center w-full   items-center rtl gap-3">
                      <p>#7473567</p>
                    </div>
                  </td>
                  <td className="text-[#211C4D] border-b  text-center font-[500] py-4">
                    <div className="w-full flex items-center justify-center">
                      <p>2024/10/12</p>
                    </div>
                  </td>
                  <td className="text-[#211C4D] border-b  font-[500] py-4">
                    <div className="w-full flex items-center justify-center">
                      <p>1,104 رس</p>
                    </div>
                  </td>
                  <td className="text-[#F3AC5D] border-b text-center font-[600] py-4 w-[160px]">
                    <div className="w-full flex items-center justify-center">
                      <Link to={"/singlebills"}>
                        <img src={more} alt="" />
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
