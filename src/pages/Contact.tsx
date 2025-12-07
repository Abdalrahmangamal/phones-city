import Location from "@/components/about/Location";
import Contactform from "@/components/contact/Contactform";
import Layout from "@/components/layout/Layout";
import Internalbanner from "@/components/public/Internalbanner";
import { useTranslation } from "react-i18next";

export default function contact() {
  
  const { t } = useTranslation();
  return (
      <Layout>
    <div>

      <div>
      <Internalbanner title={t("Contactus")}  />
      <Contactform />
      <Location />
      </div>
    </div>
      </Layout>
  );
}
