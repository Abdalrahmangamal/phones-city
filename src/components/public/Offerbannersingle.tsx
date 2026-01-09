
import { useLangSync } from "@/hooks/useLangSync";
import Loader from "@/components/Loader";
import { usePageData } from "@/hooks/usePageData"; 

export default function Offerbannersingle() {
  const { lang } = useLangSync();
  
  // ✅ استخدام الـ Hook الجديد - أبسط وأكثر كفاءة
  const { page, loading: isPageLoading } = usePageData("trademark");

  // عرض Loader أثناء التحميل
  if (isPageLoading || !page) {
    return (
      <div className="lg:px-[90px] px-2 md:pt-0 pt-[50px]">
        <div className="relative w-full h-[350px] rounded-[16px] my-18 overflow-hidden flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  // البيانات المطلوبة من صفحة trademark
  const bannerTitle = page.title || "Enjoy Best Offers With Us";
  const bannerDescription = page.short_description;
  const bannerImage = page.banner; 

  return (
    <div className="lg:px-[90px] px-2 md:pt-0 pt-[50px]">
      <div className="relative w-full h-[350px] rounded-[16px] my-18 overflow-hidden flex items-center justify-end">
        {/* الخلفية - استخدام الصورة من الداشبورد */}
        {bannerImage && (
          <img
            src={bannerImage}
            alt="Banner"
            className="absolute inset-0 w-full h-full object-fill"
            loading="lazy"
          />
        )}

        {/* التدرج اللوني */}
        <div className="w-full h-full top-0 right-0 absolute bg-[linear-gradient(90deg,rgba(33,28,77,0.28)_0%,rgba(33,28,77,0.2156)_30.77%,rgba(33,28,77,0.252)_50.48%,rgba(33,28,77,0)_94.71%)]"></div>

        {/* الدائرة مع blur */}
        <div
          className="absolute end-[-850px] top-0 rounded-l-[80px] rounded-r-[80px] bg-[#211C4D5C] w-[891px] h-[684px]"
          style={{
            backdropFilter: "blur(15px)",
            clipPath: "url(#bgblur_clip)",
            height: "100%",
            width: "100%",
          }}
        ></div>

        {/* المحتوى - الحفاظ على التصميم الأصلي */}
        <div className="relative z-10 text-white">
          <h2 className="text-[45px] md:max-w-[80%] leading-[70px] font-[500] mb-3 text-[white] [text-shadow:-1px_11px_2px_rgba(0,0,0,0.25)]">
            {bannerTitle}
          </h2>

          <p className="text-[20px] mb-6 max-w-[400px]">
            {bannerDescription}
          </p>
          <div className="w-full flex items-center justify-start">
            <button className="bg-[#F3AC5D] hover:bg-[#d9944d] text-[white] font-[600] px-6 py-3 rounded-[8px] transition">
              {lang === "ar" ? "تسوق الآن →" : "Shop Now →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
