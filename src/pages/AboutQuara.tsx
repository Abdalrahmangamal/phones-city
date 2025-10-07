import React from 'react';
import Layout from '@/components/layout/Layout';

const AboutQuara = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8" dir="rtl">
        {/* Custom Hero Section for About Quara page */}
        <div className="w-full max-w-[1264px] h-[347px] rounded-lg mb-16 relative overflow-hidden mx-auto">
          <img 
            alt="المزيد عن كوارا" 
            className="w-full h-full object-cover" 
            src="/src/assets/images/internalbanerimage.jpg" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#211c4d33] to-[#211C4D]"></div>
          <div className="absolute inset-0 flex flex-col justify-center text-right p-4 md:p-0 pr-[57px]">
            <h1 className="text-white font-roboto font-bold text-3xl md:text-5xl leading-[48px] md:leading-[68px] mb-2 md:mb-4">
              المزيد عن كوارا
            </h1>
            <p className="text-white font-roboto font-bold text-xl md:text-2xl leading-[48px] md:leading-[68px]">
              تعرف علينا
            </p>
          </div>
        </div>
        
        {/* Content section with policy details - aligned with hero banner */}
        <div className="w-full max-w-[1264px] mx-auto py-8 px-4" style={{ gap: '50px' }}>
          <div className="mb-8 relative">
            <h1 className="text-right text-[#211C4D] font-roboto font-bold text-[40px] leading-[36px] relative" style={{ width: '100%', maxWidth: '1275px' }}>
              ما هي كوارا (Quara Finance)؟
            </h1>
            <div className="absolute" style={{ top: '-12px', right: '-49px', width: '110px', height: '85.6058px' }}>
              <img 
                src="/src/assets/images/Layer_1.png" 
                alt="Layer 1" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-right text-[#211C4D] font-roboto font-medium text-[24px] leading-[48px]">
              كوارا هي شركة تمويل توفر خدمة الشراء الآن والدفع لاحقًا بالتقسيط 🛍️<br />
              تساعدك تشتري المنتجات اللي بتحبها وتدفعها على أقساط مريحة بدون الحاجة لأي إجراءات بنكية معقدة.<br />
              ⚡ تتميز بسرعة الموافقة وسهولة التسجيل، وتحتاج فقط بعض البيانات البسيطة.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-right text-[#211C4D] font-roboto font-bold text-[40px] leading-[24px] mb-4">
              خطوات التسجيل في كوارا
            </h2>
          </div>
          
          <div className="mb-8">
            <h3 className="text-right text-[#211C4D] font-roboto font-bold text-[32px] leading-[24px] mb-4">
              1. إنشاء حساب جديد
            </h3>
            <ul className="text-right text-black text-lg leading-7 list-disc pr-6">
              <li className="mb-2">اضغط على زر «سجّل في كوارا».</li>
              <li className="mb-2">أدخل بياناتك الأساسية (الاسم الكامل، رقم الموبايل، البريد الإلكتروني، الرقم القومي).</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-right text-[#211C4D] font-roboto font-bold text-[32px] leading-[24px] mb-4">
              2. تأكيد رقم الموبايل
            </h3>
            <ul className="text-right text-black text-lg leading-7 list-disc pr-6">
              <li className="mb-2">سيصلك كود OTP على رقم هاتفك.</li>
              <li className="mb-2">أدخله لتفعيل حسابك.</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-right text-[#211C4D] font-roboto font-bold text-[32px] leading-[24px] mb-4">
              3. رفع مستندات بسيطة
            </h3>
            <ul className="text-right text-black text-lg leading-7 list-disc pr-6">
              <li className="mb-2">صورة بطاقة الرقم القومي.</li>
              <li className="mb-2">إيصال مرافق حديث (كهرباء أو مياه).</li>
              <li className="mb-2">إثبات دخل إذا وُجد.</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-right text-[#211C4D] font-roboto font-bold text-[32px] leading-[24px] mb-4">
              4. ابدأ الشراء بالتقسيط
            </h3>
            <ul className="text-right text-black text-lg leading-7 list-disc pr-6">
              <li className="mb-2">بعد مراجعة البيانات والموافقة عليها، يمكنك شراء المنتجات وتقسيطها فورًا من خلال كوارا.</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-right text-[#211C4D] font-roboto font-bold text-[40px] leading-[36px] mb-4">
              ⚡ ملاحظات مهمة
            </h2>
            <ul className="text-right text-black text-lg leading-7 list-disc pr-6">
              <li className="mb-2">يجب أن يكون عمرك فوق 21 سنة.</li>
              <li className="mb-2">يجب أن تمتلك بطاقة رقم قومي سارية.</li>
              <li className="mb-2">تتم الموافقة على الطلبات غالبًا خلال دقائق قليلة.</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-right text-[#211C4D] font-roboto font-bold text-[40px] leading-[36px] mb-4">
              رابط التسجيل مع كوارا
            </h2>
            <a 
              href="https://quarafinance.com/en/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#211C4D] font-roboto font-medium text-[32px] leading-[24px] underline"
              style={{ width: '1269px', height: '24px' }}
            >
              سجل مع كوارا الان
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutQuara;