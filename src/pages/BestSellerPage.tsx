// BestSellerPage.tsx
import { useEffect, useState } from "react";
import Bestseller from "@/components/home/Bestseller";
import Layout from "@/components/layout/Layout";
import Offerherosection from "@/components/public/Offerherosection";
import Sliderbycategory from "@/components/public/Sliderbycategory";
import BannerSection from "@/components/public/BannerSection";
import Parttner from "@/components/public/Parttner";
import Filter from "@/components/public/Filter";
import sceondbanner from "../assets/images/sceondbanner.png";
import type { Product } from '@/types/index';
import { useProductsStore } from "@/store/productsStore";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore"; 

export default function BestSellerPage() {
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { fetchProducts, loading } = useProductsStore();
  const { categories, fetchCategories } = useCategoriesStore(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("best_seller");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([null, null]);

  useEffect(() => {
    // جلب الفئات عند تحميل الصفحة
    fetchCategories(lang);
  }, [lang]);

  useEffect(() => {
  const loadBestSellers = async () => {
    try {
      const queryParams: any = {
        best_seller: true,
        sort_by: sortOption,
        sort_order: "desc",
        per_page: 20,
      };

      
      if (selectedSubCategory !== null) {
        const selectedCategory = categories.find(
          cat => cat.id === selectedSubCategory
        );

        if (selectedCategory?.children?.length) {
          queryParams.category_ids = selectedCategory.children.map(
            child => child.id
          );
        } else {
          queryParams.category_id = selectedSubCategory;
        }
      }

      // Apply price range filter
      if (priceRange[0] !== null) {
        queryParams.min_price = priceRange[0];
      }
      if (priceRange[1] !== null) {
        queryParams.max_price = priceRange[1];
      }

      
      const data = await fetchProducts(queryParams, lang);

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }

    } catch (error) {
      console.error("Error loading best sellers:", error);
      setProducts([]);
    }
  };

  loadBestSellers();
}, [lang, selectedSubCategory, categories, sortOption, priceRange]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedSubCategory(categoryId);
  };

  const handlePriceRangeChange = (minPrice: number | null, maxPrice: number | null) => {
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <div>
      <Layout>
        <div>
          <Offerherosection
            title={t("BestsellerPageTitle")} 
            description={t("BestSellersDescription")}
          />

          {categories.length > 0 && (
            <Sliderbycategory 
              category={categories} 
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory} 
            />
          )}

          
          
          <Bestseller 
            title={selectedSubCategory 
            ? `${t("BestSellers")} - ${categories.find(cat => cat.id === selectedSubCategory)?.name || ''}`
            : t("BestSellers")} 
            products={products} 
            isLoading={loading}
            filterComponent={
              <div className="flex justify-center">
                <Filter 
                  onSortChange={handleSortChange}
                  onCategoryChange={handleCategoryChange}
                  onPriceRangeChange={handlePriceRangeChange}
                  categories={categories}
                  minPrice={0}
                  maxPrice={10000}
                />
              </div>
            }
          />
          <BannerSection image={sceondbanner} />
          <div className="my-12">
            <Parttner />
          </div>
        </div>
      </Layout>
    </div>
  );
}