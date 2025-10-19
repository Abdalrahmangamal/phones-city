export default function Informationproduct() {
  const specifications = [
    { label: "العلامة التجارية :", value: "HP" },
    { label: "حجم الشاشة :", value: "أنش 15,6" },
    { label: "اللون :", value: "ميكا سيلفر" },
    { label: "حجم القرص الثابت :", value: "جيجابايت 512" },
    { label: "طراز وحدة المعالجة المركزية :", value: "إنتل كور i5" },
    { label: "حجم ذاكرة الوصول العشوائي :", value: "جيجابايت 16" },
    { label: "أنظمة التشغيل :", value: "Windows 11 Home" },
    { label: "ميزة خاصة :", value: "لوحة مفاتيح بإضاءة خلفية" },
    { label: "وصف بطاقة الرسومات :", value: "مخصص" },
  ];

  const features = [
    "أداء قوي: مجهز بمعالج إنتل كور i5-13420H لتعدد المهام بسلاسة وتجربة لعب سلسة.",
    "مساحة تخزين واسعة: يوفر محرك الأقراص ذو الحالة الثابتة سعة 512 جيجابايت أوقات تشغيل سريع ومساحة واسعة وتطبيقاتك.",
    "ذاكرة كبيرة: تتضمن ذاكرة SDRAM سودريم DDR4 سعة 16 جيجابايت لإدارة ذاكرة فعالة للمهام الصعبة.",
    "نظام تشغيل حديث: يعمل على أحدث نظام تشغيل ويندوز 11 لتعزيز الأمان وتجربة المستخدم.",
    "شاشة نابضة بالحياة: شاشة LED FHD IPS مقاس 15.6 أنش مع سطوع 250 ووحدة مضيئة في البكسل ومعدل تحديث 144 .",
  ];
  return (
    <div className="  rounded-lg bg-white p-8 " dir="rtl">
      {/* Main Title */}
      <h1 className="mb-8 text-right text-3xl font-bold text-gray-900">
        تفاصيل المنتج
      </h1>

      {/* Specifications Section */}
      <div className="mb-12">
        <h2 className="mb-6 text-right text-xl font-semibold text-gray-900">
          المواصفات العامة
        </h2>

        <div className="space-y-4">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_auto] justify-between items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="whitespace-nowrap text-right text-base  text-[#211C4DCC]">
                  {spec.label}
                </div>
                <div className="h-px flex-1 border-b border-dotted border-gray-300" />
              </div>
              <div className="text-right text-base text-[#211C4D] font-[500]">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div>
        <h2 className="mb-6 text-right text-[32px] font-semibold text-[#211C4D]">
          عن هذا المنتج
        </h2>

        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start px-4 gap-3 text-right text-base leading-relaxed text-[#211C4DCC]"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-900" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
