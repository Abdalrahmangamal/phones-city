import { useTranslation } from "react-i18next";
import LanguageSwitch from "@/components/custom/LanguageSwitch";

const Home = () => {
  const { t } = useTranslation(); // مهم

  return (
    <div className="p-6 space-y-4">
      <LanguageSwitch />
      <h1 className="text-2xl">{t("welcome")}</h1>
      <button className="px-3 py-2 border rounded">{t("add_to_cart")}</button>
    </div>
  );
};

export default Home;
