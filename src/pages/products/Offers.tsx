// Offers.tsx
import Layout from "@/components/layout/layout";
import NewHeroSection from "@/components/public/HeroSection";
import BannerSection from "@/components/public/BannerSection";
import banner from "@/assets/images/banner.png";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner"; // الكومبوننت المعدل
import { useProductsStore } from '@/store/productsStore.ts';
import { useCategoriesStore } from '@/store/categories/useCategoriesStore.ts';
import { useEffect, useState } from "react";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import Loader from '@/components/Loader';
import Filter from "@/components/public/Filter";
import { useHeroSectionStore } from "@/store/home/herosectionStore";
export default function Offers() {
  const { fetchProducts, response } = useProductsStore();
  const { fetchCategories, categories } = useCategoriesStore();
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { sliders, fetchSliders, loading: heroLoading } = useHeroSectionStore();

  // useEffect(() => {
  //   fetchProducts({ simple: false, has_offer: 1 }, lang);
  //   fetchCategories(lang);
  // }, [lang]);

  useEffect(() => {
  fetchProducts({ simple: false, has_offer: 1 }, lang);
  fetchCategories(lang);
  fetchSliders(lang);  // أضف هذا السطر
}, [lang]);

  useEffect(() => {
    if (response) {
      let products = Array.isArray(response) ? response : [];
      
      // Apply category filter
      if (selectedCategory) {
        products = products.filter(product => product.category?.id === selectedCategory);
      }
      
      // Apply sorting
      switch (sortOption) {
        case "oldest":
          products = [...products].reverse();
          break;
        case "price-low-high":
          products = [...products].sort((a, b) => {
            const priceA = parseFloat(a.final_price || a.original_price);
            const priceB = parseFloat(b.final_price || b.original_price);
            return priceA - priceB;
          });
          break;
        case "price-high-low":
          products = [...products].sort((a, b) => {
            const priceA = parseFloat(a.final_price || a.original_price);
            const priceB = parseFloat(b.final_price || b.original_price);
            return priceB - priceA;
          });
          break;
        case "latest":
        default:
          // Default order
          break;
      }
      
      setFilteredProducts(products);
    }
  }, [response, sortOption, selectedCategory]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  if (!response) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <NewHeroSection sliders={sliders} />
        <BannerSection image={banner} />
        
        <Bestseller 
          title={`${t("CityofPhonesOffers")}`} 
          btn={true} 
          products={filteredProducts} 
          filterComponent={
            <div className="flex justify-center">
              <Filter 
                onSortChange={handleSortChange}
                onCategoryChange={handleCategoryChange}
                categories={categories}
              />
            </div>
          }
        />
        
        {/* الكومبوننت سيتولى جلب البيانات بنفسه */}
        <div className="mb-15">
          <Parttner />
        </div>
      </div>
    </Layout>
  );
}