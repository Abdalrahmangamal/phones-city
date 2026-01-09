import Layout from "@/components/layout/Layout";
import InternalBanner from "@/components/public/Internalbanner";
import { useLangSync } from "@/hooks/useLangSync";
import Loader from "@/components/Loader";
import { usePageData } from "@/hooks/usePageData";

const ReturnPolicy = () => {
  const { lang } = useLangSync();
  const { page, loading } = usePageData("return-policy");
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-8"
        dir={`${lang === "ar" ? "rtl" : "ltr"} `}
      >
        <InternalBanner
          title={page?.title || ""}
          description={page?.short_description || ""}
        />

        <div
          className="mt-12 w-full max-w-[1296px] mx-auto"
          dir={`${lang === "ar" ? "rtl" : "ltr"} `}
          style={{ gap: "32px" }}
        >
          <div className="w-full" style={{ maxWidth: "1284px", gap: "16px" }}>
            <div className="w-full" style={{ maxWidth: "1269px", gap: "8px" }}>
              <div className="mb-8 relative">
                <h1
                  className="text-[#211C4D] font-roboto font-bold text-[35px] md:text-[40px] leading-[36px] relative w-full"
                  style={{ maxWidth: "1275px" }}
                >
                  {page?.title}
                </h1>
                <div
                  className={`${
                    lang === "ar" ? "right-[-35px]" : "left-[-35px]"
                  } absolute top-[-1px] w-[80px]`}
                >
                  <img
                    src="/src/assets/images/Layer_1.png"
                    alt="Layer 1"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[#211C4D] text-[28px] font-bold">
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnPolicy;
