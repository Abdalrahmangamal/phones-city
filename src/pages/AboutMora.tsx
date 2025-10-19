import React from 'react';
import Layout from '@/components/layout/Layout';
import InternalBanner from '@/components/public/Internalbanner';

const AboutMora = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8" dir="rtl">
        <InternalBanner 
          title="المزيد عن موارا" 
          description="تعرف علينا" 
        />
        
        {/* Content section with policy details - aligned with hero banner */}
        <div className="w-full max-w-[1264px] mx-auto py-8 px-4" style={{ gap: '50px' }}>
          <div className=" relative">
            <h1 className="text-right text-[#211C4D] font-roboto font-bold text-[28px] md:text-[32px] leading-[48px] relative w-full pb-8" style={{ width: '100%', maxWidth: '1275px' }}>
              ما هي مورا (Mora Finance)؟
            </h1>
            <div className="absolute" style={{ top: '-12px', right: '-49px', width: '110px', height: '85.6058px' }}>
              <img 
                src="/src/assets/images/Layer_1.png" 
                alt="Layer 1" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="mb-12">
            <p className="text-right text-[#211C4DCC] font-roboto font-normal text-[20px] leading-[48px]" style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '24px', lineHeight: '48px' }}>
              مورا هي شركة تمويل توفر خدمة الشراء الآن والدفع لاحقًا بالتقسيط 🛍️<br />
              تساعدك تشتري المنتجات اللي بتحبها وتدفعها على أقساط مريحة بدون الحاجة لأي إجراءات بنكية معقدة.<br />
              ⚡ تتميز بسرعة الموافقة وسهولة التسجيل، وتحتاج فقط بعض البيانات البسيطة.
            </p>
          </div>
          
          <div className="mb-10">
            <h2 className="text-right text-[#211C4D] font-roboto font-bold text-[28px] md:text-[32px] leading-[48px] mb-6">
              خطوات التسجيل في مورا
            </h2>
          </div>
          
          <div className="mb-10">
            <h3 className="text-right text-[#211C4D] font-roboto font-bold text-[24px] md:text-[28px] leading-[24px] mb-6">
              1. إنشاء حساب جديد
            </h3><br/>
            <ul className="text-right text-[#211C4DCC] font-roboto font-normal text-[20px] leading-[48px] list-disc pr-6" style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '24px', lineHeight: '48px' }}>
              <li className="mb-3">اضغط على زر «سجّل في مورا».</li>
              <li className="mb-3">أدخل بياناتك الأساسية (الاسم الكامل، رقم الموبايل، البريد الإلكتروني، الرقم القومي).</li>
            </ul>
          </div>
          
          <div className="mb-10">
            <h3 className="text-right text-[#211C4D] font-roboto font-bold text-[24px] md:text-[28px] leading-[24px] mb-6">
              2. تأكيد رقم الموبايل
            </h3><br/>
            <ul className="text-right text-[#211C4DCC] font-roboto font-normal text-[20px] leading-[48px] list-disc pr-6" style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '24px', lineHeight: '48px' }}>
              <li className="mb-3">سيصلك كود OTP على رقم هاتفك.</li>
              <li className="mb-3">أدخله لتفعيل حسابك.</li>
            </ul>
          </div>
          
          <div className="mb-10">
            <h3 className="text-right text-[#211C4D] font-roboto font-bold text-[24px] md:text-[28px] leading-[24px] mb-6">
              3. رفع مستندات بسيطة
            </h3><br/>
            <ul className="text-right text-[#211C4DCC] font-roboto font-normal text-[20px] leading-[48px] list-disc pr-6" style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '24px', lineHeight: '48px' }}>
              <li className="mb-3">صورة بطاقة الرقم القومي.</li>
              <li className="mb-3">إيصال مرافق حديث (كهرباء أو مياه).</li>
              <li className="mb-3">إثبات دخل إذا وُجد.</li>
            </ul>
          </div>
          
          <div className="mb-10">
            <h3 className="text-right text-[#211C4D] font-roboto font-bold text-[24px] md:text-[28px] leading-[24px] mb-6">
              4. ابدأ الشراء بالتقسيط
            </h3><br/>
            <ul className="text-right text-[#211C4DCC] font-roboto font-normal text-[20px] leading-[48px] list-disc pr-6" style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '24px', lineHeight: '48px' }}>
              <li className="mb-3">بعد مراجعة البيانات والموافقة عليها، يمكنك شراء المنتجات وتقسيطها فورًا من خلال مورا.</li>
            </ul>
          </div>
          
          <div className="mb-10">
            <h2 className="text-right text-[#211C4D] font-roboto font-bold text-[30px] md:text-[34px] leading-[36px] mb-6">
              ⚡ ملاحظات مهمة
            </h2><br/>
            <ul className="text-right text-[#211C4DCC] font-roboto font-normal text-[20px] leading-[48px] list-disc pr-6" style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '24px', lineHeight: '48px' }}>
              <li className="mb-3">يجب أن يكون عمرك فوق 21 سنة.</li>
              <li className="mb-3">يجب أن تمتلك بطاقة رقم قومي سارية.</li>
              <li className="mb-3">تتم الموافقة على الطلبات غالبًا خلال دقائق قليلة.</li>
            </ul>
          </div>
          
          <div className="mb-24">
            <h2 className="text-right text-[#211C4D] font-roboto font-bold text-[30px] md:text-[32px] leading-[48px] mb-6">
              رابط التسجيل مع مورا
            </h2>
            <a 
              href="https://morafinance.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#211C4D] font-roboto font-medium text-[28px] md:text-[28px] leading-[24px] underline block w-full"
            >
              سجل مع مورا الان
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutMora;