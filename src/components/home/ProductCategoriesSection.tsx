import svg1 from "../../assets/images/Layer_1.png";
import { useLangSync } from "@/hooks/useLangSync";
import "../../style.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore"; // Added import
import { useEffect } from "react"; // Added import

// Category images from old website
const categoryImages = {
  installments: "https://cityphonesa.com/wp-content/uploads/2025/03/%D9%82%D8%B3%D9%85-%D8%A7%D9%84%D8%AA%D9%82%D8%B3%D9%8A%D8%B7-%D8%B3%D9%8A%D8%AA%D9%8A-%D9%81%D9%88%D9%86-1.png.webp",
  tablets: "https://cityphonesa.com/wp-content/uploads/2025/01/3-1.png.webp",
  apple: "https://cityphonesa.com/wp-content/uploads/2025/01/9-1.png.webp",
  android: "https://cityphonesa.com/wp-content/uploads/2025/01/2-1.png.webp",
  headphones: "https://cityphonesa.com/wp-content/uploads/2025/01/5-1.png.webp",
  watches: "https://cityphonesa.com/wp-content/uploads/2025/01/4-1.png.webp",
  routers: "https://cityphonesa.com/wp-content/uploads/2025/01/6-1.png.webp",
  cables: "https://cityphonesa.com/wp-content/uploads/2025/01/1-3.png.webp",
  powerbanks: "https://cityphonesa.com/wp-content/uploads/2025/02/2.png.webp",
  accessories: "https://cityphonesa.com/wp-content/uploads/2025/02/1.png.webp",
};

// Static categories data matching old website
const categoriesData = [
  {
    id: "installments",
    nameAr: "قسم التقسيط",
    nameEn: "Installments",
    image: categoryImages.installments,
    defaultSlug: "قسم-التقسيط",
    matchKeywords: ["تقسيط", "installments"]
  },
  {
    id: "tablets",
    nameAr: "الأجهزة اللوحية",
    nameEn: "Tablets",
    image: categoryImages.tablets,
    defaultSlug: "الاجهزة-اللوحية",
    matchKeywords: ["لوحية", "tablets", "ipad", "ايباد"]
  },
  {
    id: "apple",
    nameAr: "منتجات أبل",
    nameEn: "Apple Products",
    image: categoryImages.apple,
    defaultSlug: "apple-products",
    matchKeywords: ["apple", "أبل", "ايفون", "iphone"]
  },
  {
    id: "android",
    nameAr: "أجهزة أندرويد",
    nameEn: "Android Devices",
    image: categoryImages.android,
    defaultSlug: "اجهزة-اندرويد",
    matchKeywords: ["android", "اندرويد", "gamsung", "سامسونج"]
  },
  {
    id: "headphones",
    nameAr: "السماعات",
    nameEn: "Headphones",
    image: categoryImages.headphones,
    defaultSlug: "السماعات",
    matchKeywords: ["سماعات", "headphones", "airpods", "headset"]
  },
  {
    id: "watches",
    nameAr: "الساعات والنوكيا",
    nameEn: "Watches & Nokia",
    image: categoryImages.watches,
    defaultSlug: "الساعات-وأجهزة-النوكيا",
    matchKeywords: ["ساعات", "watches", "nokia", "نوكيا", "smart watch"]
  },
  {
    id: "routers",
    nameAr: "الراوترات والإنترنت",
    nameEn: "Routers & Internet",
    image: categoryImages.routers,
    defaultSlug: "الراوترات-والانترنت-وملحقاتها",
    matchKeywords: ["راوتر", "router", "internet", "انترنت", "ميقا", "fi"]
  },
  {
    id: "cables",
    nameAr: "الكيابل والشواحن",
    nameEn: "Cables & Chargers",
    image: categoryImages.cables,
    defaultSlug: "الكيابل-وروس-الشواحن-بأنوعها",
    matchKeywords: ["كيابل", "cables", "شواحن", "chargers", "cable"]
  },
  {
    id: "powerbanks",
    nameAr: "البوربنك والمنصات",
    nameEn: "Powerbanks",
    image: categoryImages.powerbanks,
    defaultSlug: "البوربنك-والمنصات-والوصلات-الكهربائ",
    matchKeywords: ["powerbank", "بوربنك", "منصات", "station", "بطاريات"]
  },
  {
    id: "accessories",
    nameAr: "الإكسسوارات",
    nameEn: "Accessories",
    image: categoryImages.accessories,
    defaultSlug: "الإكسسوارات",
    matchKeywords: ["accessories", "اكسسوارات", "حماية", "protection"]
  },
];

export default function ProductCategoriesSection() {
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { fetchCategories, categories } = useCategoriesStore();

  useEffect(() => {
    fetchCategories(lang);
  }, [lang, fetchCategories]);

  // Helper function to find matching category slug
  const getCategorySlug = (staticCat: typeof categoriesData[0]) => {
    if (!categories || categories.length === 0) return staticCat.defaultSlug;

    // Flatten categories to include subcategories if necessary, though simpler to check top-level first
    // Checks for exact name match first
    const exactMatch = categories.find(
      (c: any) =>
        c.name.toLowerCase() === staticCat.nameEn.toLowerCase() ||
        c.name === staticCat.nameAr
    );
    if (exactMatch) return exactMatch.slug;

    // Check by keywords
    const keywordMatch = categories.find((c: any) =>
      staticCat.matchKeywords.some(keyword =>
        c.name.toLowerCase().includes(keyword.toLowerCase()) ||
        c.slug.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    if (keywordMatch) return keywordMatch.slug;

    return staticCat.defaultSlug;
  };

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

        {/* Categories Grid - matching old website layout */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3 lg:gap-4">
          {categoriesData.map((cat) => (
            <Link
              key={cat.id}
              to={`/${lang}/categorySingle/${getCategorySlug(cat)}/products`}
              className="group flex flex-col items-center"
            >
              <div className="w-full aspect-[240/337] rounded-[12px] md:rounded-[16px] overflow-hidden transition-all duration-300 hover:shadow-[0px_8px_30px_0px_rgba(100,100,111,0.3)] hover:scale-[1.03]">
                <img
                  src={cat.image}
                  alt={lang === "ar" ? cat.nameAr : cat.nameEn}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}