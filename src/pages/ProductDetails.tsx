import React from 'react';
import Layout from '@/components/layout/Layout';

const ProductDetails: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8" dir="rtl">
        {/* Custom Hero Section for this page only */}
        <div className="w-full max-w-[1264px] h-[347px] rounded-lg mb-16 relative overflow-hidden">
          <img 
            alt="كيف تشتري من مدينة الهواتف" 
            className="w-full h-full object-cover" 
            src="/src/assets/images/Frame 1321317076.png" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#211c4d33] to-[#211C4D]"></div>
          <div className="absolute inset-0 flex flex-col justify-center text-right p-4 md:p-0 pr-[57px]">
            <h1 className="text-white font-roboto font-bold text-3xl md:text-5xl leading-[48px] md:leading-[68px] mb-2 md:mb-4" 
                style={{ 
                  textShadow: '0px 15px 5px #00000040',
                  filter: 'drop-shadow(0px 15px 5px rgba(0, 0, 0, 0.25))'
                }}>
              كيف تشتري من مدينة الهواتف
            </h1>
            <p className="text-white font-roboto font-bold text-3xl md:text-5xl leading-[48px] md:leading-[68px]" 
               style={{ 
                 textShadow: '0px 15px 5px #00000040',
                 filter: 'drop-shadow(0px 15px 5px rgba(0, 0, 0, 0.25))'
               }}>
              بالتقسيط وبدون فوائد
            </p>
          </div>
        </div>
        
        {/* Plain text content with proper spacing and colors */}
        <div className="mt-12 max-w-[1296px] mx-auto" style={{ gap: '32px' }}>
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-2xl font-bold">1. تمارا</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">ما هي شروط تمارا للتقسيط ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              ما هي شروط تمارا وهل أنا مؤهل لاستخدام الخدمة؟ سؤال مهم جدا يبحث العديد من المستخدمين عن إجابة له. وتضع تمارا عددا من الشروط التي يجب على الشخص استيفائها من أجل أن يتمكن من التقسيط عبر تطبيق تمارا وتشمل شروط تمارا للتقسيط ما يلي:
            </p>
            <ul className="text-right text-black mt-2 list-disc pr-6">
              <li className="mt-2">أن يكون عمر المتقدم 18 عاما فأكثر.</li>
              <li className="mt-2">يجب أن يكون الشخص مواطن أو مقيم في السعودية.</li>
              <li className="mt-2">يكون لديه بطاقة بنكية متاحه للشراء أونلاين.</li>
              <li className="mt-2">يجب الشراء من المتاجر التابعة لخدمة تمارا.</li>
              <li className="mt-2">متوفر رقم جوال مربوط بهوية المتقدم.</li>
              <li className="mt-2">عدم وجود أي مبالغ غير مدفوعة في الخدمة.</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">طريقة التقسيط مع تمارا ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              للاستفادة من خدمة التقسيط مع تمارا، يجب اتباع الخطوات التالية:
            </p>
            <ul className="text-right text-black mt-2 list-decimal pr-6">
              <li className="mt-2">تسجيل الدخول: قم بتسجيل الدخول إلى تمارا باستخدام التطبيق الذي تم تنزيله على هاتفك المحمول.</li>
              <li className="mt-2">إدخال رقم الجوال: أدخل رقم هاتفك الخلوي.</li>
              <li className="mt-2">إدخال رقم الهوية الوطنية: توثيق الهوية من خلال نفاذ أو رمز التحقق المرسل على رقم جوال أبشر.</li>
              <li className="mt-2">إدخال رقم البطاقة البنكية: أدخل رقم بطاقة البنكية.</li>
              <li className="mt-2">إدخال البريد الإلكتروني: لإتمام عملية شرائية عن طريق شركة تمارا.</li>
              <li className="mt-2">حدد الدفعات: 2 دفعات , 3 دفعات , 4 دفعات , 6 دفعات ,9 دفعات , 12 دفعه</li>
              <li className="mt-2">الدفع: ادفع القسط الأول باستخدام الرابط المرسل إلى هاتفك المحمول عبر الرسائل القصيرة.</li>
              <li className="mt-2">متابعة المدفوعات: تتبع المدفوعات المتبقية عبر التطبيق. يمكنك التواصل مع شركة تمارا داخل السعودية على الرقم 8001240441 من الساعة التاسعة صباحًا حتى السادسة مساءً للحصول على المساعد</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-2xl font-bold">2. تابي</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">ما هي شروط تابي للتقسيط ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              ما هي شروط تابي وهل أنا مؤهل لاستخدام الخدمة؟ سؤال مهم جدا يبحث العديد من المستخدمين عن إجابة له. وتضع تابي عددا من الشروط التي يجب على الشخص استيفائها من أجل أن يتمكن من التقسيط عبر تطبيق تابي وتشمل شروط تابي للتقسيط ما يلي:
            </p>
            <ul className="text-right text-black mt-2 list-disc pr-6">
              <li className="mt-2">أن يكون عمر المتقدم 18 عاما فأكثر.</li>
              <li className="mt-2">يجب أن يكون الشخص مواطن أو مقيم في السعودية.</li>
              <li className="mt-2">يكون لديه بطاقة بنكية متاحه للشراء أونلاين.</li>
              <li className="mt-2">يجب الشراء من المتاجر التابعة لخدمة تابي.</li>
              <li className="mt-2">متوفر رقم جوال مربوط بهوية المتقدم.</li>
              <li className="mt-2">عدم وجود أي مبالغ غير مدفوعة في الخدمة.</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">طريقة التقسيط مع تابي ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              للاستفادة من خدمة التقسيط مع تابي، يجب اتباع الخطوات التالية:
            </p>
            <ul className="text-right text-black mt-2 list-decimal pr-6">
              <li className="mt-2">تسجيل الدخول: قم بتسجيل الدخول إلى تابي باستخدام التطبيق الذي تم تنزيله على هاتفك المحمول.</li>
              <li className="mt-2">إدخال رقم الجوال: أدخل رقم هاتفك الخلوي.</li>
              <li className="mt-2">إدخال رقم الهوية الوطنية: توثيق الهوية من خلال نفاذ أو رمز التحقق المرسل على رقم جوال أبشر.</li>
              <li className="mt-2">إدخال رقم البطاقة البنكية: أدخل رقم بطاقة البنكية.</li>
              <li className="mt-2">إدخال البريد الإلكتروني: لإتمام عملية شرائية عن طريق شركة تابي.</li>
              <li className="mt-2">حدد الدفعات: 2 دفعات , 3 دفعات , 4 دفعات , 6 دفعات ,9 دفعات , 12 دفعه</li>
              <li className="mt-2">الدفع: ادفع القسط الأول باستخدام الرابط المرسل إلى هاتفك المحمول عبر الرسائل القصيرة.</li>
              <li className="mt-2">متابعة المدفوعات: تتبع المدفوعات المتبقية عبر التطبيق. يمكنك التواصل مع شركة تابي داخل السعودية على الرقم 8001240441 من الساعة التاسعة صباحًا حتى السادسة مساءً للحصول على المساعد</li>
            </ul>
          </div>
          
          {/* New sections */}
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-2xl font-bold">3. اموال</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">ما هي شروط اموال للتقسيط ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              ما هي شروط اموال وهل أنا مؤهل لاستخدام الخدمة؟ سؤال مهم جدا يبحث العديد من المستخدمين عن إجابة له. وتضع اموال عددا من الشروط التي يجب على الشخص استيفائها من أجل أن يتمكن من التقسيط عبر تطبيق اموال وتشمل شروط اموال للتقسيط ما يلي:
            </p>
            <ul className="text-right text-black mt-2 list-disc pr-6">
              <li className="mt-2">أن يكون عمر المتقدم 18 عاما فأكثر.</li>
              <li className="mt-2">يجب أن يكون الشخص مواطن أو مقيم في السعودية.</li>
              <li className="mt-2">يكون لديه بطاقة بنكية متاحه للشراء أونلاين.</li>
              <li className="mt-2">يجب الشراء من المتاجر التابعة لخدمة اموال.</li>
              <li className="mt-2">متوفر رقم جوال مربوط بهوية المتقدم.</li>
              <li className="mt-2">عدم وجود أي مبالغ غير مدفوعة في الخدمة.</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">طريقة التقسيط مع اموال ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              للاستفادة من خدمة التقسيط مع اموال، يجب اتباع الخطوات التالية:
            </p>
            <ul className="text-right text-black mt-2 list-decimal pr-6">
              <li className="mt-2">تسجيل الدخول: قم بتسجيل الدخول إلى اموال باستخدام التطبيق الذي تم تنزيله على هاتفك المحمول.</li>
              <li className="mt-2">إدخال رقم الجوال: أدخل رقم هاتفك الخلوي.</li>
              <li className="mt-2">إدخال رقم الهوية الوطنية: توثيق الهوية من خلال نفاذ أو رمز التحقق المرسل على رقم جوال أبشر.</li>
              <li className="mt-2">إدخال رقم البطاقة البنكية: أدخل رقم بطاقة البنكية.</li>
              <li className="mt-2">إدخال البريد الإلكتروني: لإتمام عملية شرائية عن طريق شركة اموال.</li>
              <li className="mt-2">حدد الدفعات: 2 دفعات , 3 دفعات , 4 دفعات , 6 دفعات ,9 دفعات , 12 دفعه</li>
              <li className="mt-2">الدفع: ادفع القسط الأول باستخدام الرابط المرسل إلى هاتفك المحمول عبر الرسائل القصيرة.</li>
              <li className="mt-2">متابعة المدفوعات: تتبع المدفوعات المتبقية عبر التطبيق. يمكنك التواصل مع شركة اموال داخل السعودية على الرقم 8001240441 من الساعة التاسعة صباحًا حتى السادسة مساءً للحصول على المساعد</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-2xl font-bold">4. مدفوع</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">ما هي شروط مدفوع للتقسيط ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              ما هي شروط مدفوع وهل أنا مؤهل لاستخدام الخدمة؟ سؤال مهم جدا يبحث العديد من المستخدمين عن إجابة له. وتضع مدفوع عددا من الشروط التي يجب على الشخص استيفائها من أجل أن يتمكن من التقسيط عبر تطبيق مدفوع وتشمل شروط مدفوع للتقسيط ما يلي:
            </p>
            <ul className="text-right text-black mt-2 list-disc pr-6">
              <li className="mt-2">أن يكون عمر المتقدم 18 عاما فأكثر.</li>
              <li className="mt-2">يجب أن يكون الشخص مواطن أو مقيم في السعودية.</li>
              <li className="mt-2">يكون لديه بطاقة بنكية متاحه للشراء أونلاين.</li>
              <li className="mt-2">يجب الشراء من المتاجر التابعة لخدمة مدفوع.</li>
              <li className="mt-2">متوفر رقم جوال مربوط بهوية المتقدم.</li>
              <li className="mt-2">عدم وجود أي مبالغ غير مدفوعة في الخدمة.</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">طريقة التقسيط مع مدفوع ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              للاستفادة من خدمة التقسيط مع مدفوع، يجب اتباع الخطوات التالية:
            </p>
            <ul className="text-right text-black mt-2 list-decimal pr-6">
              <li className="mt-2">تسجيل الدخول: قم بتسجيل الدخول إلى مدفوع باستخدام التطبيق الذي تم تنزيله على هاتفك المحمول.</li>
              <li className="mt-2">إدخال رقم الجوال: أدخل رقم هاتفك الخلوي.</li>
              <li className="mt-2">إدخال رقم الهوية الوطنية: توثيق الهوية من خلال نفاذ أو رمز التحقق المرسل على رقم جوال أبشر.</li>
              <li className="mt-2">إدخال رقم البطاقة البنكية: أدخل رقم بطاقة البنكية.</li>
              <li className="mt-2">إدخال البريد الإلكتروني: لإتمام عملية شرائية عن طريق شركة مدفوع.</li>
              <li className="mt-2">حدد الدفعات: 2 دفعات , 3 دفعات , 4 دفعات , 6 دفعات ,9 دفعات , 12 دفعه</li>
              <li className="mt-2">الدفع: ادفع القسط الأول باستخدام الرابط المرسل إلى هاتفك المحمول عبر الرسائل القصيرة.</li>
              <li className="mt-2">متابعة المدفوعات: تتبع المدفوعات المتبقية عبر التطبيق. يمكنك التواصل مع شركة مدفوع داخل السعودية على الرقم 8001240441 من الساعة التاسعة صباحًا حتى السادسة مساءً للحصول على المساعد</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-2xl font-bold">5. إمكان</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">ما هي شروط إمكان للتقسيط ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              ما هي شروط إمكان وهل أنا مؤهل لاستخدام الخدمة؟ سؤال مهم جدا يبحث العديد من المستخدمين عن إجابة له. وتضع إمكان عددا من الشروط التي يجب على الشخص استيفائها من أجل أن يتمكن من التقسيط عبر تطبيق إمكان وتشمل شروط إمكان للتقسيط ما يلي:
            </p>
            <ul className="text-right text-black mt-2 list-disc pr-6">
              <li className="mt-2">أن يكون عمر المتقدم 18 عاما فأكثر.</li>
              <li className="mt-2">يجب أن يكون الشخص مواطن أو مقيم في السعودية.</li>
              <li className="mt-2">يكون لديه بطاقة بنكية متاحه للشراء أونلاين.</li>
              <li className="mt-2">يجب الشراء من المتاجر التابعة لخدمة إمكان.</li>
              <li className="mt-2">متوفر رقم جوال مربوط بهوية المتقدم.</li>
              <li className="mt-2">عدم وجود أي مبالغ غير مدفوعة في الخدمة.</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">طريقة التقسيط مع إمكان ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              للاستفادة من خدمة التقسيط مع إمكان، يجب اتباع الخطوات التالية:
            </p>
            <ul className="text-right text-black mt-2 list-decimal pr-6">
              <li className="mt-2">تسجيل الدخول: قم بتسجيل الدخول إلى إمكان باستخدام التطبيق الذي تم تنزيله على هاتفك المحمول.</li>
              <li className="mt-2">إدخال رقم الجوال: أدخل رقم هاتفك الخلوي.</li>
              <li className="mt-2">إدخال رقم الهوية الوطنية: توثيق الهوية من خلال نفاذ أو رمز التحقق المرسل على رقم جوال أبشر.</li>
              <li className="mt-2">إدخال رقم البطاقة البنكية: أدخل رقم بطاقة البنكية.</li>
              <li className="mt-2">إدخال البريد الإلكتروني: لإتمام عملية شرائية عن طريق شركة إمكان.</li>
              <li className="mt-2">حدد الدفعات: 2 دفعات , 3 دفعات , 4 دفعات , 6 دفعات ,9 دفعات , 12 دفعه</li>
              <li className="mt-2">الدفع: ادفع القسط الأول باستخدام الرابط المرسل إلى هاتفك المحمول عبر الرسائل القصيرة.</li>
              <li className="mt-2">متابعة المدفوعات: تتبع المدفوعات المتبقية عبر التطبيق. يمكنك التواصل مع شركة إمكان داخل السعودية على الرقم 8001240441 من الساعة التاسعة صباحًا حتى السادسة مساءً للحصول على المساعد</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-2xl font-bold">6. MISPay</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">ما هي شروط MISPay للتقسيط ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              ما هي شروط MISPay وهل أنا مؤهل لاستخدام الخدمة؟ سؤال مهم جدا يبحث العديد من المستخدمين عن إجابة له. وتضع MISPay عددا من الشروط التي يجب على الشخص استيفائها من أجل أن يتمكن من التقسيط عبر تطبيق MISPay وتشمل شروط MISPay للتقسيط ما يلي:
            </p>
            <ul className="text-right text-black mt-2 list-disc pr-6">
              <li className="mt-2">أن يكون عمر المتقدم 18 عاما فأكثر.</li>
              <li className="mt-2">يجب أن يكون الشخص مواطن أو مقيم في السعودية.</li>
              <li className="mt-2">يكون لديه بطاقة بنكية متاحه للشراء أونلاين.</li>
              <li className="mt-2">يجب الشراء من المتاجر التابعة لخدمة MISPay.</li>
              <li className="mt-2">متوفر رقم جوال مربوط بهوية المتقدم.</li>
              <li className="mt-2">عدم وجود أي مبالغ غير مدفوعة في الخدمة.</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-[#211C4D] text-xl font-bold">طريقة التقسيط مع MISPay ؟</p>
          </div>
          
          <div className="mb-4">
            <p className="text-right text-black">
              للاستفادة من خدمة التقسيط مع MISPay، يجب اتباع الخطوات التالية:
            </p>
            <ul className="text-right text-black mt-2 list-decimal pr-6">
              <li className="mt-2">تسجيل الدخول: قم بتسجيل الدخول إلى MISPay باستخدام التطبيق الذي تم تنزيله على هاتفك المحمول.</li>
              <li className="mt-2">إدخال رقم الجوال: أدخل رقم هاتفك الخلوي.</li>
              <li className="mt-2">إدخال رقم الهوية الوطنية: توثيق الهوية من خلال نفاذ أو رمز التحقق المرسل على رقم جوال أبشر.</li>
              <li className="mt-2">إدخال رقم البطاقة البنكية: أدخل رقم بطاقة البنكية.</li>
              <li className="mt-2">إدخال البريد الإلكتروني: لإتمام عملية شرائية عن طريق شركة MISPay.</li>
              <li className="mt-2">حدد الدفعات: 2 دفعات , 3 دفعات , 4 دفعات , 6 دفعات ,9 دفعات , 12 دفعه</li>
              <li className="mt-2">الدفع: ادفع القسط الأول باستخدام الرابط المرسل إلى هاتفك المحمول عبر الرسائل القصيرة.</li>
              <li className="mt-2">متابعة المدفوعات: تتبع المدفوعات المتبقية عبر التطبيق. يمكنك التواصل مع شركة MISPay داخل السعودية على الرقم 8001240441 من الساعة التاسعة صباحًا حتى السادسة مساءً للحصول على المساعد</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;