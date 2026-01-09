
import Layout from "@/components/layout/Layout";
import InternalBanner from "@/components/public/Internalbanner";
import { useLangSync } from "@/hooks/useLangSync";
import Loader from "@/components/Loader";
import { usePageData } from "@/hooks/usePageData";

const TermsAndConditions = () => {
  const { lang } = useLangSync();
  const { page, loading } = usePageData("terms-and-conditions");
  
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
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <InternalBanner
          title={page?.title || ""}
          description={page?.short_description || ""}
        />

        <div
          className="w-full max-w-[1264px] mx-auto py-8"
          style={{ gap: "50px" }}
        >
          <div className="mb-8 relative">
            <h1
              className="text-right text-[#211C4D] font-roboto font-medium text-[40px] leading-[100%] relative w-full"
              style={{ maxWidth: "1275px" }}
            >
              {page?.title}
            </h1>
            <div
              className="absolute"
              style={{
                top: "-12px",
                right: "-49px",
                width: "110px",
                height: "85.6058px",
              }}
            >
              <img
                src="/src/assets/images/Layer_1.png"
                alt="Layer 1"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div
            dir={`${lang === "ar" ? "rtl" : "ltr"} `}
            className="prose max-w-full"
            dangerouslySetInnerHTML={{ __html: page?.description || "" }}
          ></div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;
