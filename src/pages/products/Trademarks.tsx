import Bestseller from "@/components/home/Bestseller";
import Layout from "@/components/layout/layout";
import Offerherosection from "@/components/public/Offerherosection";
import Sliderbycategory from "@/components/public/Sliderbycategory";
import Parttner from "@/components/public/Parttner";
import Offerbannersingle from "@/components/public/Offerbannersingle";
import { useLangSync } from "@/hooks/useLangSync";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Filter from "@/components/public/Filter";
import type { Product } from "@/types";

export default function Trademarks() {
  const { lang } = useLangSync();
  const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState("created_at");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([null, null]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const {
    fetchCategoriesbyid,
    Categoriesbyid,
    Catesubgategory,
    fetchCatesubgategory,
    fetchCategories,
    categories,
  } = useCategoriesStore();
  
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    fetchCategoriesbyid(id, "products");
    fetchCatesubgategory(id);
    fetchCategories(lang);
  }, [id, lang]);

  useEffect(() => {
    let products = [...Categoriesbyid] as Product[];
    
    // Apply sub-category filter
    if (activeSubCategory) {
      products = products.filter((p) => p.category?.id === activeSubCategory);
    }
    
    // Apply price range filter
    if (priceRange[0] !== null || priceRange[1] !== null) {
      products = products.filter((p) => {
        const price = parseFloat(p.final_price || p.original_price);
        const min = priceRange[0];
        const max = priceRange[1];
        
        if (min !== null && price < min) return false;
        if (max !== null && price > max) return false;
        return true;
      });
    }
    
    // Apply sorting
    switch (sortOption) {
      case "created_at":
        // Default order (no change needed)
        break;
      case "main_price":
        products = [...products].sort((a, b) => {
          const priceA = parseFloat(a.final_price || a.original_price);
          const priceB = parseFloat(b.final_price || b.original_price);
          return priceA - priceB;
        });
        break;
      case "name_ar":
        products = [...products].sort((a, b) => 
          (a.name_ar || "").localeCompare(b.name_ar || "")
        );
        break;
      case "best_seller":
        products = [...products].sort((a, b) => 
          (b.sales_count || 0) - (a.sales_count || 0)
        );
        break;
      case "average_rating":
        products = [...products].sort((a, b) => 
          (b.average_rating || 0) - (a.average_rating || 0)
        );
        break;
      default:
        // Default order (no change needed)
        break;
    }
    
    setFilteredProducts(products);
  }, [Categoriesbyid, activeSubCategory, sortOption, priceRange]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setActiveSubCategory(categoryId);
  };

  const handlePriceRangeChange = (minPrice: number | null, maxPrice: number | null) => {
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <div>
      <Layout>
        <div className=" lg:px-[45px]  pt-20 md:pt-0 flex-grow">
          <Offerherosection
            title={"افضل اجهزه ابل "}
            description={
              "استمتع بتجربة استثنائية مع أحدث الاجهزه بأفضل الأسعار وخدمة ما بعد البيع المميزة"
            }
          />
          <div className="mx-[-4px] md:-mx-[45px]">
            {Catesubgategory.length > 0 ? (
              <Sliderbycategory
                category={Catesubgategory}
                setSelectedSubCategory={setActiveSubCategory}
              />
            ) : (
              ""
            )}
          </div>
          
          <Bestseller 
            title="المنتجات" 
            products={filteredProducts} 
            filterComponent={
              <div className="flex justify-center">
                <Filter 
                  onSortChange={handleSortChange}
                  onCategoryChange={handleCategoryChange}
                  onPriceRangeChange={handlePriceRangeChange}
                  categories={Catesubgategory}
                  minPrice={0}
                  maxPrice={10000}
                />
              </div>
            }
          />
          <Offerbannersingle />

          <div className="my-12">
            <Parttner />
          </div>
        </div>
      </Layout>
    </div>
  );
}