// Offers.tsx
import Layout from "@/components/layout/layout";
import NewHeroSection from "@/components/public/HeroSection";
import BannerSection from "@/components/public/BannerSection";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";
import Filter from "@/components/public/Filter"; // Import Filter component
import { useProductsStore } from "@/store/productsStore.ts";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore.ts";
import { useEffect, useState } from "react";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";
import { useHeroSectionStore } from "@/store/home/herosectionStore";
import { useHomePageStore } from '@/store/home/homepageStore';
import type { Product } from '@/types/index'; // Import Product type if needed

export default function Offers() {
  const { fetchProducts, response, loading } = useProductsStore();
  const { fetchCategories, categories } = useCategoriesStore();
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { sliders, fetchSliders } = useHeroSectionStore();
  const { fetchHomePage, data } = useHomePageStore();

  // State for filters
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([null, null]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          fetchCategories(lang),
          fetchSliders(lang),
          fetchHomePage(lang)
        ]);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [lang]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategory, sortOption, priceRange, lang]);

  // Fetch products with filters
  useEffect(() => {
    const loadFilteredProducts = async () => {
      try {
        const queryParams: any = {
          has_offer: 1,
          simple: 0,
          page: currentPage,
          per_page: itemsPerPage
        };

        // Add sort option if selected
        if (sortOption) {
          queryParams.sort_by = sortOption;
          queryParams.sort_order = "desc";
        }

        // Add category filter if selected
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

        // Add price range filter
        if (priceRange[0] !== null) {
          queryParams.min_price = priceRange[0];
        }
        if (priceRange[1] !== null) {
          queryParams.max_price = priceRange[1];
        }

        // Fetch products with filters
        const result: any = await fetchProducts(queryParams, lang);

        // Handle response data
        let productsData: Product[] = [];
        let totalCount = 0;

        if (result && result.data && Array.isArray(result.data)) {
          productsData = result.data;

          // Extract pagination info
          if (result.pagination) {
            totalCount = result.pagination.total || productsData.length;
          } else if (result.meta) {
            totalCount = result.meta.total || productsData.length;
          } else {
            totalCount = productsData.length;
          }
        } else if (Array.isArray(result)) {
          productsData = result;
          totalCount = result.length;
        }

        // Update states
        setTotalItems(totalCount);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));

      } catch (error) {
        console.error("Error loading filtered products:", error);
        setTotalItems(0);
        setTotalPages(1);
      }
    };

    // Always load products, even if no categories yet (or empty)
    loadFilteredProducts();

  }, [lang, selectedSubCategory, categories, sortOption, priceRange, currentPage]);

  // تأكد من أن response مصفوفة
  const products = Array.isArray(response) ? response : [];

  // Filter handlers
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

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <NewHeroSection sliders={sliders} showButton={false} />

        <BannerSection images={data?.main_images || []} />

        <Bestseller
          title={`${t("CityofPhonesOffers")}`}
          btn={true}
          link={`/${lang}/SpecialOffersPage`}
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
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          showPagination={true}
        />

        <BannerSection images={data?.main_images || []} />

        <div className="mb-15">
          <Parttner />
        </div>
      </div>
    </Layout>
  );
}