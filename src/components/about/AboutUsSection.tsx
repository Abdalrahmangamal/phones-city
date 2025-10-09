import imageSrc from '../../assets/images/aboutusimage.jpg'; // replace with actual image path

export default function AboutUsSection() {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-20 flex md:justify-between flex-col md:flex-row gap-10 " dir="rtl">
      

      {/* Right Side - Text */}
      <div className="w-full md:w-1/2 md:max-w-[40%] text-[#211C4D] ">
        <h2 className="text-[40px] font-[700]  ">
          من نحن
        </h2>

        <p className="text-base leading-[40px] font-[400] text-[#211C4DCC] text-[24px] ">
          سنظل دائمًا الاسم الذي يحظى بثقة عملائنا وشركاء النجاح، من خلال منتجاتنا وخدماتنا؛ نساهم في بناء مجتمع أفضل.
          وانطلاقًا من سعينا الدائم للحفاظ على ثقة العملاء وشركاء النجاح؛ نلتزم بـ:
        </p>

        <ul className="list-disc pr-5 text-[#211C4DCC] text-[20px] space-y-2 marker:text-[#211C4DCC]">
          <li>تقديم منتجات كهربائية وإلكترونية بجودة عالمية وخدمة متميزة في الأسواق المحلية والخارجية.</li>
          <li>إقامة علاقات متوازنة ومستدامة مع موردينا.</li>
          <li>تنمية فريق عمل فاعل ومنتج وأرضي في بيئة عمل مميزة وملهمة.</li>
          <li>المحافظة على منظومة القيم الراسخة التي بنيت عليها الشركة.</li>
          <li>تأدية دور فاعل في تنمية المجتمع.</li>
          <li>تعظيم قيمة الشركة وتطوير مكانتها.</li>
        </ul>
      </div>
      {/* Left Side - Image */}
    <div className="relative w-full md:w-[509px] md:h-[529px] h-[400px] rounded-xl overflow-hidden">
  <img
    src={imageSrc}
    alt="صورة للمكان"
    className="object-cover w-full h-full"
  />
<div className="w-full h-full top-0 right-0 absolute bg-[linear-gradient(90deg,rgba(33,28,77,0.28)_0%,rgba(33,28,77,0.2156)_30.77%,rgba(33,28,77,0.252)_50.48%,rgba(33,28,77,0)_94.71%)]
">

</div>
  {/* نصف دائرة على الجهة اليسرى */}
<div className="absolute end-0 top-0 w-1/2 h-full flex items-center justify-start  overflow-hidden">
  <div className="w-full h-full bg-[#211C4D]/70 backdrop-blur-sm rounded-r-[9999px] flex items-center px-6">
    <h2 className="text-white font-bold text-[35px] drop-shadow-lg z-10 [text-shadow:-1px_11px_2px_rgba(0,0,0,0.25)]">
      صوره للمكان
    </h2>
  </div>
</div>

</div>

    </section>
  );
}
