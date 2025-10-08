import sucsespayment from "@/assets/images/sucsespayment.png";
export default function Paymentinformation() {
  return (
    <div className="md:w-[883px] flex-col md:flex-row flex  items-center justify-center md:justify-between  shadow-[0_4px_8px_rgba(0,0,0,0.2)] rounded-xl bg-white md:py-4  p-6 md:h-[190px] h-full mt-4">
      <div className="text-center md:text-start ">
        <h1 className="text-[32px] font-[500] text-[#211C4D]">معلومات الدفع</h1>
        <p className="text-[#211C4D] mt-20 text-[16px] font-[500] md:mt-2 md:mr-2">
          طريقه الدفع
        </p>
        <p className="text-[24px] text-[#211C4D] font-[500] mr-2">
          بطاقه ائتمان
        </p>
      </div>
      <div className="mt-20 md:mt-0">
        <p className="text-[16px] font-[500] text-[#211C4D] md:mt-15">
          المبلغ الإجمالي
        </p>
        <p className="text-[24px] font-[500] text-[#211C4D]">252,650</p>
      </div>
      <div>
        <img
          src={sucsespayment}
          className="w-[100px] h-[122px] object-contain"
          alt=""
        />
      </div>
    </div>
  );
}
