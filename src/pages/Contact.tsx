import Location from "@/components/about/Location";
import Contactform from "@/components/contact/Contactform";
import Layout from "@/components/layout/Layout";
import Internalbanner from "@/components/public/Internalbanner";
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";
import { usePageSEO } from "@/hooks/usePageSEO";

export default function contact() {

  const { t } = useTranslation();
  const { lang } = useLangSync();

  // SEO for contact page
  usePageSEO({
    title: lang === "ar" ? "اتصل بنا" : "Contact Us",
    description: lang === "ar"
      ? "تواصل مع مدينة الهواتف - نحن هنا لمساعدتك. اتصل بنا أو زرنا في فروعنا في السعودية"
      : "Contact City Phones - We are here to help. Call us or visit our branches in Saudi Arabia",
    lang,
  });

  return (
    <Layout>
      <div>

        <div>
          <Internalbanner title={t("Contactus")} />
          <Contactform />
          <Location />
        </div>
      </div>
    </Layout>
  );
}
