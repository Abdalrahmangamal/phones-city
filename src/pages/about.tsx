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

export default function About() {
  const { t } = useTranslation();

  const { lang } = useLangSync();
  const { fetchAbout, data } = useAboutStore();
  useEffect(() => {
    fetchAbout(lang);
  }, [lang]);
  console.log("dd", data);
  return (
    <Layout>
       {
        !data ? <Loader /> : null
      }
      <div>
        <Internalbanner title={t("AboutCityPhones")} description={t("Gettoknowus")} />
        <Aboutcityphones description={data?.about_website} />
        <AboutUsSection
          image={data?.image ?? ""}
          about_us={data?.about_us ?? ""}
          lang={lang}
          aboutus={t("AboutUs")}
        />
        <Location />
      </div>
    </Layout>
  );
}
