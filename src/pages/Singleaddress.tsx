import Layout from "@/components/layout/Layout";

export default function Singleaddress() {
  return (
    <div>
      <Layout>
        <div
          dir="rtl"
          className="w-full max-w-5xl mx-auto  p-10 rounded-2xl mt-10 "
        >
          <h2 className="text-[#211C4D] text-[22px] font-semibold mb-8 text-right">
            تفاصيل العنوان
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* الاسم الأول */}
            <div>
              <label className="block text-[#211C4D] mb-2 text-[15px]">
                الاسم الأول
              </label>
              <input
                type="text"
                placeholder="منه"
                className="w-full bg-[#F6F6F6] rounded-md px-4 py-3 text-[#211C4D] focus:outline-none focus:ring-2 focus:ring-[#F3AC5D]"
              />
            </div>

            {/* الاسم الثاني */}
            <div>
              <label className="block text-[#211C4D] mb-2 text-[15px]">
                الاسم الثاني
              </label>
              <input
                type="text"
                placeholder="أبوطالب"
                className="w-full bg-[#F6F6F6] rounded-md px-4 py-3 text-[#211C4D] focus:outline-none focus:ring-2 focus:ring-[#F3AC5D]"
              />
            </div>

            {/* الدولة / المنطقة */}
            <div className="md:col-span-2 ">
              <p className="block  text-[#211C4D] mb-2 text-[15px]">
                الدوله \ المنطقه
              </p>
              <p className="text-[#211C4D] text-[16px] font-[700]">
                المملكة العربيه السعوديه
              </p>
            </div>

            {/* عنوان الشارع */}
            <div>
              <label className="block text-[#211C4D] mb-2 text-[15px]">
                عنوان الشارع / الحي
              </label>
              <input
                type="text"
                placeholder="شارع"
                className="w-full bg-[#F6F6F6] rounded-md px-4 py-3 text-[#211C4D]"
              />
            </div>

            {/* المدينة */}
            <div>
              <label className="block text-[#211C4D] mb-2 text-[15px]">
                المدينة
              </label>
              <select className="w-full bg-[#F6F6F6] rounded-md px-4 py-3 text-[#211C4D] focus:outline-none focus:ring-2 focus:ring-[#F3AC5D]">
                <option>الرياض</option>
                <option>جدة</option>
                <option>مكة</option>
              </select>
            </div>

            {/* الهاتف */}
            <div>
              <label className="block text-[#211C4D] mb-2 text-[15px]">
                الهاتف
              </label>
              <input
                type="text"
                placeholder="+299"
                className="w-full bg-[#F6F6F6] rounded-md px-4 py-3 text-[#211C4D]"
              />
            </div>

            {/* البريد الإلكتروني */}
            <div>
              <label className="block text-[#211C4D] mb-2 text-[15px]">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="memo123@gmail.com"
                className="w-full bg-[#F6F6F6] rounded-md px-4 py-3 text-[#211C4D]"
              />
            </div>
          </form>

          {/* معلومات إضافية */}
          <h3 className="text-[#211C4D] text-[18px] font-semibold mt-10 mb-4">
            معلومات إضافية
          </h3>
          <div className="mb-10">
            <label className="block text-[#211C4D] mb-2 text-[15px]">
              حفظ العنوان باسم (اختياري)
            </label>
            <input
              type="text"
              placeholder="المنزل 2"
              className="w-full bg-[#F6F6F6] rounded-md px-4 py-3 text-[#211C4D]"
            />
          </div>

          {/* الأزرار */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button className="w-full md:w-[48%] bg-[#211C4D] text-white py-3 rounded-lg text-[16px] font-semibold hover:opacity-90">
              إلغاء
            </button>
            <button className="w-full md:w-[48%] bg-[#F3AC5D] text-white py-3 rounded-lg text-[16px] font-semibold hover:opacity-90">
              حفظ العنوان
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
