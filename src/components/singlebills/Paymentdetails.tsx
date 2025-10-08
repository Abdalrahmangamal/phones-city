
export default function Paymentdetails() {
  return (
    <div className="md:w-[883px]  shadow-[0_4px_8px_rgba(0,0,0,0.2)] rounded-xl bg-white py-4 p-6 h-[222px] mt-4">
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-[500] text-[#211C4D]">المجموع الفرعي</p>
        <p className="font-[300] text-[16px] text-[#211C4D]">252,640 رس</p>
      </div>
      <div className="flex items-center my-5 justify-between">
        <p className="text-[16px] font-[500] text-[#211C4D]">الضريبة المقدرة</p>
        <p className="font-[300] text-[16px] text-[#211C4D]">70 رس</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-[500] text-[#211C4D]">تكلفة الشحن </p>
        <p className="font-[300] text-[16px] text-[#211C4D]">50 رس</p>
      </div>
      <div className="flex items-center mt-6 justify-between">
        <p className="text-[24px] font-[500] text-[#211C4D]">المجموع الاجمالي </p>
        <p className="text-[24px] font-[500] text-[#211C4D]">252,640 رس </p>
      </div>

    </div>
  )
}
