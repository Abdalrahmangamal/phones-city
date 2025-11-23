import Layout from '@/components/layout/Layout';
import InternalBanner from '@/components/public/Internalbanner';
import { useLangSync } from "@/hooks/useLangSync";
import { usePageStore } from "@/store/customerCareStore";
import { useEffect } from "react";
const TermsAndConditions = () => {
    const { page, fetchPage } = usePageStore();
    const { lang } = useLangSync();
     useEffect(() => {
    fetchPage("terms-and-conditions", lang);
  }, [fetchPage, lang]);
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8" dir="rtl">
        <InternalBanner 
         title={`${page?.title}`} description={`${page?.short_description}`}
        />
        
        {/* Content section with policy details - aligned with hero banner */}
        <div className="w-full max-w-[1264px] mx-auto py-8 px-4" style={{ gap: '50px' }}>
          <div className="mb-8 relative">
            <h1 className="text-right text-[#211C4D] font-roboto font-medium text-[40px] leading-[100%] relative w-full" style={{ maxWidth: '1275px' }}>
            {page?.title}
            </h1>
            <div className="absolute" style={{ top: '-12px', right: '-49px', width: '110px', height: '85.6058px' }}>
              <img 
                src="/src/assets/images/Layer_1.png" 
                alt="Layer 1" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* <div className="mb-16 w-full">
            <p className="text-right text-[#211C4D] font-roboto font-medium text-[40px] leading-[100%]">
{page?.short_description}            </p>
          </div> */}
          
         
      
          
          {/* <div className="mb-8">
            <h2 className="text-right text-[#211C4D] font-roboto font-bold text-[32px] leading-[24px] mb-4">
              أحكام عامة
            </h2>
          </div> */}
{/*           
          <div className="mb-8 w-full">
            <ol className="text-right text-[#211C4DCC] font-roboto text-[24px] leading-[48px] list-decimal pr-6" style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '24px', lineHeight: '48px' }}>
              <li className="mb-4">
                <span className="font-bold">القانون المطبق:</span> إن شروط الاستخدام هذه وأياً من الحقوق أو الواجبات غير التعاقدية ذات الصلة يجب إخضاعها وتفسيرها للقوانين المطبقة في المملكة العربية السعودية.
              </li>
              <li className="mb-4">
                <span className="font-bold">حل النزاعات:</span> إذا كان لديك أي من المشكلات الخاصة بخدماتنا يُرجى الاتصال بنا‎. وسنعمل جاهدين على حل المشكلة التي تواجهك في أقرب فرصة ممكنة. يتم تسوية أي من النزاعات أو الخلافات المتعلقة بشروط الاستخدام هذه، بما في ذلك أي حقوق أو واجبات غير تعاقدية ذات صلة عن طريق محاكم المملكة العربية السعودية.
              </li>
              <li className="mb-4">
                <span className="font-bold">حقوق الغير:</span> الشخص الذي لا يُعد جزءاً من شروط الاستخدام هذه ليس لديه أي حق في تنفيذ أي من شروطها.
              </li>
              <li className="mb-4">
                <span className="font-bold">علاقة الأطراف:</span> لا يوجد في شروط الاستخدام هذه ما يمكن للأطراف أو للغير تأويله أو تفسيره ليفسر العلاقة بيننا على أنها بين شركاء أو وكلاء أو يوجِد مشروعاً مشتركاً بين الأطراف، ولكنه من المفهوم والواضح أن كل الأطراف في الاتفاق هي أطراف مستقلة.
              </li>
              <li className="mb-4">
                <span className="font-bold">التأكيدات الإضافية:</span> تقوم الأطراف بالتصرفات اللازمة أو الترتيب لاتخاذ التصرفات اللازمة وتحرير المستندات وغيرها من الأمور التي تقع ضمن سلطتها من أجل إنفاذ شروط الاستخدام هذه والتحقق من العمل بها، بما في ذلك على سبيل المثال لا الحصر مساعدة كل طرف على الالتزام بالقانون المعمول به.
              </li>
              <li className="mb-4">
                <span className="font-bold">التنازل:</span> تلتزم شروط الاستخدام هذه بضمان تحقيق الفائدة للأطراف ولخلفائهم المعنيين والمُفوضين رسمياً. توافق على أنك لن تقوم بالتنازل عن أو نقل شروط الاستخدام أو أي من الحقوق أو الواجبات الخاصة بك والمتعلقة بشروط الاستخدام هذه، سواء كان ذلك بشكلٍ مباشر أو غير مباشر، دون الحصول مسبقاً على موافقة خطية من قبلنا.
              </li>
              <li className="mb-4">
                <span className="font-bold">مجمل الاتفاق:</span> إن شروط الاستخدام هذه والوثائق المشار إليها أو المدرجة في شروط الاستخدام تمثل مجمل الاتفاق بين الأطراف فيما يتعلق بموضوع الاتفاقية وتسمو على وتحجب جميع الاتفاقيات والمفاوضات والإقرارات السابقة، الخطية أو الشفهية، ذات الصلة بالموضوع. باستثناء ما هو محدد في شروط الاستخدام والوثائق المشار إليها أو المدرجة في شروط الاستخدام الماثلة فلا توجد أي شروط أو إقرارات أو ضمانات أو تعهدات أو اتفاقيات بين الأطراف سواء كان ذلك مباشراً أو غير مباشر أو جماعياً أو صريحاً أو ضمنياً.
              </li>
              <li className="mb-4">
                <span className="font-bold">التعديلات:</span> لا يحق إجراء أي تعديل على شروط الاستخدام هذه أو إدخال أي إضافة أو تكملتها. نحن نحتفظ بالحق في إدخال أي تعديل أو تغيير أو إضافة أو إكمال شروط الاستخدام هذه في أي وقت أو من وقتٍ لآخر. وسنقوم بنشر النسخة الحالية لشروط الاستخدام على الموقع وستكون سارية المفعول عند نشرها على الموقع أو بناء على الموعد المحدد من جانبنا بصفته "تاريخ السريان" (إن وجد). إن استخدامك المستمر للخدمات في حال حدوث أي تغييرات يُعد موافقة منك على الالتزام بشروط الاستخدام المعدلة.
              </li>
              <li className="mb-4">
                <span className="font-bold">قابلية الفصل بين البنود:</span> إذا ما تم اعتبار أي من أحكام شروط الاستخدام هذه ملغًى من قبل أيٍّ من المحاكم المختصة أو غير قانوني أو غير معمول به فإنه يتم إلغاء هذا لبند من شروط الاستخدام هذه وتستمر باقي الشروط والأحكام قائمة سارية نافذة طالما ظل الجوهر القانوني والاقتصادي للصفقات التي تمت تحت شروطها قائماً دون أي تأثير معاكس على أطرافها.
              </li>
              <li className="mb-4">
                <span className="font-bold">القوة القاهرة:</span> لا يتحمل أي طرف مسؤولية وجود الخسارة أو الضرر أو التأخير أو عدم الوفاء نتيجة للأعمال الخارجة عن السيطرة لأي من الأطراف سواء كان ذلك العمل يمكن توقعه (مثل القضاء والقدر والإجراءات الصادرة عن السلطات التشريعية أو القضائية أو التنظيمية لأي من الحكومة الفيدرالية أو المحلية أو السلطات القضائية أو الإجراءات التي يقوم بها أي من المقاولين من الباطن التابعين لنا أو أي طرف ثالث مورد البضائع أو الخدمات لنا أو الاضطرابات العمالية أو الانقطاع الكامل للتيار الكهربائي أو المقاطعة الاقتصادية).
              </li>
              <li className="mb-4">
                <span className="font-bold">عدم التنازل:</span> إن التنازل عن أي من الأحكام الواردة في شروط الاستخدام لا يُعد تنازلاً عن أي من الأحكام الأخرى (المشابهة أو غير المشابهة)، ولا يعد أي تنازل آخر تنازلاً مستمراً عن أي من الأحكام المعنية، ما لم ننص على ذلك صراحة وخطياً.
              </li>
              <li className="mb-4">
                <span className="font-bold">التواصل:</span> يمكنك التواصل معنا عن طريق الذهاب إلى قسم "الحساب" ثم الضغط على خانة "تحتاج مساعدة؟"
              </li>
              <li className="mb-4">
                <span className="font-bold">استمرار النفاذ:</span> جميع الأحكام التي يُنص على أنها تظل سارية أو التي تسري بطبيعتها بعد إنهاء التعاقد تظل نافذة المفعول بعد إنهاء أو تعليق عضويتك في الموقع.
              </li>
            </ol>
          </div> */}
        </div>
              <div
              dir={`${lang === "ar" ? "rtl" : "ltr"} `}
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: page?.description || "" }}
            ></div>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;