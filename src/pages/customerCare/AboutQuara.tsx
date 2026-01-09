import React from "react";
import Layout from "@/components/layout/Layout";
import InternalBanner from "@/components/public/Internalbanner";
import { useLangSync } from "@/hooks/useLangSync";
import Loader from "@/components/Loader";
import { usePageData } from "@/hooks/usePageData";

const AboutQuara = () => {
  const { lang } = useLangSync();
  const { page, loading } = usePageData("about-quwara");
  
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
          className="w-full max-w-[1264px] mx-auto py-8 px-4"
          style={{ gap: "50px" }}
        >
          <div className="relative" dir={`${lang === "ar" ? "rtl" : "ltr"} `}>
            <h1
              className="text-[#211C4D] font-roboto font-bold text-[28px] md:text-[32px] leading-[48px] relative w-full pb-8"
              style={{ maxWidth: "1275px" }}
            >
              {page?.title}
            </h1>
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

export default AboutQuara;
