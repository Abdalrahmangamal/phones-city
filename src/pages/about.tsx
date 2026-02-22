import Aboutcityphones from "@/components/about/Aboutcityphones";
import AboutUsSection from "@/components/about/AboutUsSection";
import Layout from "@/components/layout/Layout";
import Internalbanner from "@/components/public/Internalbanner";
import Location from "@/components/about/Location";
import { useAboutStore } from "@/store/aboutusStore";
import { useEffect } from "react";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";
import { usePageSEO } from "@/hooks/usePageSEO";

import { usePageStore } from "@/store/customerCareStore";

export default function About() {
  const { t } = useTranslation();

  const { lang } = useLangSync();
  const fetchAbout = useAboutStore((state) => state.fetchAbout);
  const data = useAboutStore((state) => state.data);
  const { fetchPage, page } = usePageStore();

  useEffect(() => {
    fetchAbout(lang);
    fetchPage("image-of-the-place", lang);
  }, [fetchAbout, fetchPage, lang]);

  // SEO for about page
  usePageSEO({
    title: lang === "ar" ? "من نحن - تعرف على مدينة الهواتف" : "About Us - Get to Know City Phones",
    description: lang === "ar"
      ? "تعرف على متجر مدينة الهواتف - رؤيتنا ومهمتنا وخدماتنا في عالم الهواتف الذكية والأجهزة الإلكترونية في السعودية"
      : "Learn about City Phones - our vision, mission and services in the world of smartphones and electronics in Saudi Arabia",
    lang,
  });

  return (
    <Layout>
      {
        !data ? <Loader /> : null
      }
      <div>
        <Internalbanner title={t("AboutCityPhones")} description={t("Gettoknowus")} />
        <Aboutcityphones description={data?.about_website} />
        <AboutUsSection
          image={page?.banner || data?.image || ""}
          about_us={data?.about_us ?? ""}
          lang={lang}
          aboutus={t("AboutUs")}
          overlayTitle={page?.title}
        />
        <Location />
      </div>
    </Layout>
  );
}
