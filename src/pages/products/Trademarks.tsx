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
  const [sortOption, setSortOption] = useState("latest");
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
        // Default order (no change needed)
        break;
    }
    
    setFilteredProducts(products);
  }, [Categoriesbyid, activeSubCategory, sortOption]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setActiveSubCategory(categoryId);
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
          
          {/* Filter Section */}
          <div className="flex justify-center my-6">
            <Filter 
              onSortChange={handleSortChange}
              onCategoryChange={handleCategoryChange}
              categories={Catesubgategory}
            />
          </div>
          
          <Bestseller title="المنتجات" products={filteredProducts} />
          <Offerbannersingle />

          <div className="my-12">
            <Parttner />
          </div>
        </div>
      </Layout>
    </div>
  );
}