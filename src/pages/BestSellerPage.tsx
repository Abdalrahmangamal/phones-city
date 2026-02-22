// BestSellerPage.tsx
import { useEffect, useState } from "react";
import Bestseller from "@/components/home/Bestseller";
import Layout from "@/components/layout/Layout";
import Offerherosection from "@/components/public/Offerherosection";
import Sliderbycategory from "@/components/public/Sliderbycategory";
// import BannerSection from "@/components/public/BannerSection";
import Parttner from "@/components/public/Parttner";
import Filter from "@/components/public/Filter";
// import sceondbanner from "../assets/images/sceondbanner.png";
import type { Product } from '@/types/index';
import { useProductsStore } from "@/store/productsStore";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import { useHomePageStore } from '@/store/home/homepageStore'; 
import { parseSortToken } from "@/utils/filterUtils";

export default function BestSellerPage() {
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { fetchProducts, loading } = useProductsStore();
  const { categories, fetchCategories } = useCategoriesStore();
  const { fetchHomePage, data } = useHomePageStore(); // ← جديد

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("best_seller:desc");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([null, null]);

  // حالات الـ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10; // يمكنك تغييره لاحقًا

  // جلب الكاتيجوريز + بيانات الـ homepage 
  useEffect(() => {
    fetchCategories(lang);
    fetchHomePage(lang); 
  }, [lang]);

  // إعادة تعيين الصفحة عند تغيير الفلاتر
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategory, sortOption, priceRange, lang]);

  // جلب المنتجات (Best Sellers) مع الفلاتر والترتيب
  useEffect(() => {
    const loadBestSellers = async () => {
      try {
        const queryParams: any = {
          best_seller: true,
          page: currentPage,
          per_page: itemsPerPage,
        };

        const parsedSort = parseSortToken(sortOption);
        if (parsedSort) {
          queryParams.sort_by = parsedSort.sortBy;
          queryParams.sort_order = parsedSort.sortOrder;
        }

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

        if (priceRange[0] !== null) {
          queryParams.min_price = priceRange[0];
        }
        if (priceRange[1] !== null) {
          queryParams.max_price = priceRange[1];
        }

        const response = await fetchProducts(queryParams, lang);

        let productsData: Product[] = [];
        let totalCount = 0;
        let totalPagesCount = 1;

        if (response && response.data && Array.isArray(response.data)) {
          productsData = response.data;

          if (response.pagination) {
            totalCount = response.pagination.total || productsData.length;
          } else if (response.meta) {
            totalCount = response.meta.total || productsData.length;
          } else {
            totalCount = productsData.length;
          }

          totalPagesCount = Math.max(1, Math.ceil(totalCount / itemsPerPage));
        } else if (Array.isArray(response)) {
          productsData = response;
          totalCount = response.length;
          totalPagesCount = Math.max(1, Math.ceil(totalCount / itemsPerPage));
        }

        setProducts(productsData);
        setTotalItems(totalCount);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error("Error loading best sellers:", error);
        setProducts([]);
        setTotalItems(0);
        setTotalPages(1);
      }
    };

    loadBestSellers();
  }, [lang, selectedSubCategory, categories, sortOption, priceRange, currentPage]);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedSubCategory(categoryId);
  };

  const handlePriceRangeChange = (minPrice: number | null, maxPrice: number | null) => {
    setPriceRange([minPrice, maxPrice]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            title={
              selectedSubCategory
                ? `${t("BestSellers")} - ${categories.find(cat => cat.id === selectedSubCategory)?.name || ''}`
                : t("BestSellers")
            }
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
                  selectedSort={sortOption}
                  selectedCategory={selectedSubCategory}
                  selectedPriceRange={priceRange}
                  resultCount={totalItems}
                />
              </div>
            }
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            showPagination={true}
          />

          {/* البانر الديناميكي تمامًا مثل الـ Home Page */}
          {/* <div className="my-8 md:my-15 xl:px-[90px] px-2 md:px-0">
            <BannerSection images={data?.main_images || []} />
          </div> */}

           <Parttner />

          
        </div>
      </Layout>
    </div>
  );
}
