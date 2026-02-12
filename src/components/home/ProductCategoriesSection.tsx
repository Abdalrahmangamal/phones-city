import svg1 from "../../assets/images/Layer_1.png";
import { useLangSync } from "@/hooks/useLangSync";
import "../../style.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import { useEffect } from "react";

export default function ProductCategoriesSection() {
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { fetchCategories, categories } = useCategoriesStore();

  useEffect(() => {
    fetchCategories(lang);
  }, [lang, fetchCategories]);

  return (
    <div className="xl:px-[90px] px-2 pt-2 md:pt-0">
      <div className="relative my-6">
        {/* Section Title */}
        <div className="relative w-fit mx-auto mb-8">
          <h1 className="text-center text-[#211C4D] text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-[700]">
            {t("Sections")}
          </h1>
          <img
            src={svg1}
            alt=""
            className={`absolute block ${lang === "ar"
              ? "w-[80px] md:w-[110px] -bottom-5 md:-bottom-7 -right-10 md:-right-15"
              : "w-[80px] md:w-[110px] -bottom-5 md:-bottom-7 -left-10 md:-left-15 -scale-x-100"
              }`}
          />
        </div>

        {/* Categories Grid - Dynamic Data */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3 lg:gap-4">
          {categories?.filter(cat => cat.image).map((cat) => (
            <Link
              key={cat.id}
              to={`/${lang}/categorySingle/${cat.slug}/products`}
              className="group flex flex-col items-center"
            >
              <div className="w-full aspect-[240/337] rounded-[12px] md:rounded-[16px] overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_0px_rgba(100,100,111,0.3)] hover:scale-[1.03]">
                <img
                  src={cat.image || ""}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}