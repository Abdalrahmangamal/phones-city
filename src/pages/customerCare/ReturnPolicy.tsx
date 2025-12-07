import Layout from "@/components/layout/Layout";
import InternalBanner from "@/components/public/Internalbanner";
import { useLangSync } from "@/hooks/useLangSync";
import { usePageStore } from "@/store/customerCareStore";
import { useEffect } from "react";
import Loader from "@/components/Loader";

const ReturnPolicy = () => {
  const { page, fetchPage } = usePageStore();
  const { lang } = useLangSync();

  useEffect(() => {
    fetchPage("return-policy", lang);
  }, [fetchPage, lang]);
  return (
    <Layout>
        {
        !page ? <Loader /> : null
      }
      <div
        className="container mx-auto px-4 py-8"
        dir={`${lang === "ar" ? "rtl" : "ltr"} `}
      >
        <InternalBanner
          title={page?.title || ""}
          description={page?.short_description || ""}
        />

        {/* Main container with responsive width */}
        <div
          className="mt-12 w-full max-w-[1296px] mx-auto"
          dir={`${lang === "ar" ? "rtl" : "ltr"} `}
          style={{ gap: "32px" }}
        >
          {/* Details container with responsive width */}
          <div className="w-full" style={{ maxWidth: "1284px", gap: "16px" }}>
            {/* Inner container with responsive width */}
            <div className="w-full" style={{ maxWidth: "1269px", gap: "8px" }}>
              <div className="mb-8 relative">
                <h1
                  className=" text-[#211C4D] font-roboto font-bold text-[35px] md:text-[40px] leading-[36px] relative w-full"
                  style={{ maxWidth: "1275px" }}
                >
                  {page?.title}
                </h1>
                <div
                  className={`${
                    lang === "ar" ? "right-[-35px]" : "left-[-35px]"
                  } absolute top-[-1px]  w-[80px]`}
                >
                  <img
                    src="/src/assets/images/Layer_1.png"
                    alt="Layer 1"
                    className="w-full h-full object-contain "
                  />
                </div>
              </div>

              <div className="mb-8">
                <p className=" text-[#211C4D] text-[28px] font-bold">
                  {page?.short_description}
                </p>
              </div>
              <div>
                <div
                  dir={`${lang === "ar" ? "rtl" : "ltr"} `}
                  className="prose max-w-full"
                  dangerouslySetInnerHTML={{ __html: page?.description || "" }}
                ></div>
              </div>
              {/* Text container with responsive width */}
              {/* <div className="mb-8 w-full">
                <ul
                  className="text-right text-[#211C4DCC] font-roboto !text-[20px] leading-[48px] list-disc pr-6"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "24px",
                    lineHeight: "48px",
                  }}
                >
                  <li>
                    يحق للعميل استبدال أو استرجاع المنتج الذي تم شرائه من الموقع
                    الالكتروني خلال 30 يوم من تاريخ الشراء فقط في حالة وجود عيب
                    صناعة بالمنتج وذلك بناءاً على تقرير فني من الصيانة أو مراكز
                    الخدمة المعتمدة (ذلك ينطبق أيضاً على منتجات العناية الشخصية
                    حيث أنها تخضع لشروط صحية ) وذلك طبقاً لقانون حماية المستهلك
                    ، وفي حالة انتهاء مدة الـ 30 يوم لن يتم استبدال أو استرجاع
                    الجهاز لأي سببٍ كان ، ويجب على العميل فى هذه الحالة التواصل
                    مع خدمة العملاء 19319 لتسجيل بلاغ صيانة وذلك بالنسبة للأجهزة
                    التى يتم تسجيل بلاغ صيانة لها ، وذلك طبقاً لنص المادة 21 من
                    قانون حماية المستهلك.
                  </li>
                </ul>
              </div>

              <div className="mb-8 w-full">
                <ul
                  className="text-right text-[#211C4DCC] font-roboto !text-[20px] leading-[48px] list-disc pr-6"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "24px",
                    lineHeight: "48px",
                  }}
                >
                  <li>
                    عند استرجاع أو استبدال المنتج يجب أن تكون الكرتونة ومواد
                    التغليف في حالتها الأصلية وألا يكون قد تم فتح كرتونة المنتج
                    أو استخدامه ويكون بجميع مشتملاته مصحوباً بكافة المستندات
                    الأصلية ، وفي حالة أن هناك هدية على طلب الشراء يجب أن يتم
                    إسترجاعها مع الجهاز و إذا لم يتم إرجاع كافة المرفقات لن يتم
                    الموافقة على طلب الاستبدال أو الاسترجاع ، وفي حالة استرجاع
                    أو استبدال منتج تم شرائه وعليه خصم سعر أو عرض سيتم رد ما قام
                    بدفعه العمل فقط.
                  </li>
                </ul>
              </div>

              <div className="mb-8 w-full">
                <ul
                  className="text-right text-[#211C4DCC] font-roboto !text-[20px] leading-[48px] list-disc pr-6"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "24px",
                    lineHeight: "48px",
                  }}
                >
                  <li>
                    في حالة رغبة العميل في إستبدال أو استرجاع المنتج رغم عدم
                    وجود عيب صناعة به خلال مدة الـ 14 يوم من تاريخ استلام المنتج
                    ( فيما عدا منتجات العناية الشخصية حيث أنها تخضع لشروط صحية )
                    طبقاً للمادة 17 من قانون حماية المستهلك
                  </li>
                </ul>
              </div> */}
            </div>
          </div>

          {/* Details container with responsive width */}
          <div className="w-full" style={{ maxWidth: "1284px", gap: "16px" }}>
            {/* Inner container with responsive width */}
            {/* <div className="w-full" style={{ maxWidth: "1269px", gap: "8px" }}>
              <div className="mb-8">
                <p className="text-right text-[#211C4D] text-2xl font-bold">
                  1. فى حالة أنه لم يتم فتح كرتونة الجهاز أو استخدامه والجهاز
                  مازال بحالته الأصلية :
                </p>
              </div>

              <div className="mb-8 w-full">
                <ul
                  className="text-right text-[#211C4DCC] font-roboto !text-[20px] leading-[48px] list-disc pr-6"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "24px",
                    lineHeight: "48px",
                  }}
                >
                  <li>
                    طبقاً لنص المادة 17 من قانون حماية المستهلك ، يحق للمستهلك
                    طلب استبدال أو استرداد قيمة المنتج خلال 14 يوم من تاريخ
                    استلام المنتج وذلك إذا لم يكن الجهاز به عيب صناعة ، ولكن
                    بشرط أن يكون بالحالة التى كانت عليها السلعة عند التعاقد (أى
                    لم يتم فتحها أو استخدامها).
                  </li>
                </ul>
              </div>

              <div className="mb-8 w-full">
                <ul
                  className="text-right text-[#211C4DCC] font-roboto !text-[20px] leading-[48px] list-disc pr-6"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "24px",
                    lineHeight: "48px",
                  }}
                >
                  <li>
                    فى هذه الحالة يتم استبدال المنتج مع تحصيل رد فرق السعر بين
                    الموديلات إن وجد أو استرجاع المنتج ورد قيمته بعد خصم مصاريف
                    الشحن (300 جنيه لأجهزة التكييفات) وذلك طبقاً للمادة 40 فقرة
                    1 و 2 من قانون حماية المستهلك (يلتزم المورد برد المبلغ
                    المدفوع للعميل بنفس طريقة الدفع ويتحمل المستهلك نفقات الشحن
                    وإعادة المنتج).
                  </li>
                </ul>
              </div>

              <div className="mb-12 w-full">
                <ul
                  className="text-right text-[#211C4DCC] font-roboto !text-[20px] leading-[48px] list-disc pr-6"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "24px",
                    lineHeight: "48px",
                  }}
                >
                  <li>
                    بالإضافة إلى أنه في حالة الدفع الالكتروني أون لاين عن طريق
                    VISA / Master أو فودافون كاش أو اتصالات كاش سيتم خصم مصاريف
                    إدارية بقيمة (1.5%) من قيمة الجهاز ، أو خصم مصاريف إدارية
                    بقيمة (2.25%) من قيمة الجهاز في حالة الدفع من خلال خدمات
                    فوري ، أو خصم مصاريف إدارية بقيمة (1.45% + 1 جنيه) من قيمة
                    الجهاز في حالة الدفع من خلال ماكينات MPOS أثناء استلام
                    المنتج.
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <p className="text-right text-[#211C4D] text-2xl font-bold">
                  2. في حالة قيام العميل بفتح كرتونة الجهاز :
                </p>
              </div>

              <div className="mb-8 w-full">
                <ul
                  className="text-right text-[#211C4DCC] font-roboto !text-[20px] leading-[48px] list-disc pr-6"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "24px",
                    lineHeight: "48px",
                  }}
                >
                  <li>
                    طبقاً لنص المادة 17 من ققانون حماية المستهلك ، يحق للمستهلك
                    طلب استبدال أو استرداد قيمة المنتج خلال 14 يوم من تاريخ
                    استلام المنتج وذلك إذا لم يكن الجهاز به عيب صناعة ، ولكن
                    بشرط أن يكون بالحالة التى كانت عليها السلعة عند التعاقد (أى
                    لم يتم فتحها أو استخدامها).
                  </li>
                </ul>
              </div>

              <div className="mb-8 w-full">
                <ul
                  className="text-right text-[#211C4DCC] font-roboto !text-[20px] leading-[48px] list-disc pr-6"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "24px",
                    lineHeight: "48px",
                  }}
                >
                  <li>
                    فى هذه الحالة يتم استبدال المنتج مع تحصيل رد فرق السعر بين
                    الموديلات إن وجد أو استرجاع المنتج ورد قيمته بعد خصم مصاريف
                    الشحن (300 جنيه لأجهزة التكييفات) وذلك طبقاً للمادة 40 فقرة
                    1 و 2 من قانون حماية المستهلك (يلتزم المورد برد المبلغ
                    المدفوع للعميل بنفس طريقة الدفع ويتحمل المستهلك نفقات الشحن
                    وإعادة المنتج).
                  </li>
                </ul>
              </div>

              <div className="mb-8 w-full">
                <ul
                  className="text-right text-[#211C4DCC] font-roboto !text-[20px] leading-[48px] list-disc pr-6"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontSize: "24px",
                    lineHeight: "48px",
                  }}
                >
                  <li>
                    بالإضافة إلى أنه في حالة الدفع الالكتروني أون لاين عن طريق
                    VISA / Master أو فودافون كاش أو اتصالات كاش سيتم خصم مصاريف
                    إدارية بقيمة (1.5%) من قيمة الجهاز ، أو خصم مصاريف إدارية
                    بقيمة (2.25%) من قيمة الجهاز في حالة الدفع من خلال خدمات
                    فوري ، أو خصم مصاريف إدارية بقيمة (1.45% + 1 جنيه) من قيمة
                    الجهاز في حالة الدفع من خلال ماكينات MPOS أثناء استلام
                    المنتج.
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnPolicy;
