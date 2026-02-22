import Layout from "@/components/layout/Layout";
import BannerSection from "@/components/public/BannerSection";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";
import Filter from "@/components/public/Filter";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore.ts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "@/components/Loader";
import { useHeroSectionStore } from "@/store/home/herosectionStore";
import { useLangSync } from "@/hooks/useLangSync";
import HeroSection from "@/components/public/HeroSection";
import { useHomePageStore } from "@/store/home/homepageStore";
import { useProductsStore } from "@/store/productsStore.ts";
import { useTranslation } from "react-i18next";
import type { Product } from '@/types/index';
import { parseSortToken } from "@/utils/filterUtils";

export default function CategorySingle() {
  const { id, productmain } = useParams();
  const { fetchSliders, sliders } = useHeroSectionStore();
  const { lang } = useLangSync();
  const { data } = useHomePageStore();
  const { t } = useTranslation();
  
  
  // State for filters
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([null, null]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  
  const [categoryTitle, setCategoryTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [allCategoryIds, setAllCategoryIds] = useState<number[]>([]);

  const { fetchCategories, categories } = useCategoriesStore();
  const { fetchProducts, loading } = useProductsStore();

  // React Router reuses this component when only the route param changes.
  // Reset page-specific state immediately so products/filters from the previous category do not bleed into the next one.
  useEffect(() => {
    setSelectedSubCategory(null);
    setSortOption("");
    setPriceRange([null, null]);
    setCurrentPage(1);
    setTotalPages(1);
    setTotalItems(0);
    setCategoryTitle("");
    setCategoryInfo(null);
    setCategoryProducts([]);
    setAllCategoryIds([]);
  }, [id, lang]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          fetchCategories(lang),
          fetchSliders(lang),
        ]);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [lang]);

  // Find category info and collect all subcategory IDs
  useEffect(() => {
    if (categories.length > 0 && id) {
      // Try to find category by slug or id
      let foundCategory = null;
      
      // First, check all categories
      const allCategories: any[] = [];
      const flattenCategories = (cats: any[]) => {
        cats.forEach(cat => {
          allCategories.push(cat);
          if (cat.children && cat.children.length > 0) {
            flattenCategories(cat.children);
          }
        });
      };
      
      flattenCategories(categories);
      
      // Try to find by slug (id might be slug in your case)
      foundCategory = allCategories.find(cat => 
        cat.slug === id || cat.id.toString() === id
      );
      
      if (foundCategory) {
        setCategoryInfo(foundCategory);
        setCategoryTitle(foundCategory.name);
        
        // Collect all category IDs (main category + all subcategories)
        const categoryIds: number[] = [foundCategory.id];
        
        // Function to recursively collect subcategory IDs
        const collectSubCategoryIds = (category: any) => {
          if (category.children && category.children.length > 0) {
            category.children.forEach((child: any) => {
              categoryIds.push(child.id);
              collectSubCategoryIds(child);
            });
          }
        };
        
        collectSubCategoryIds(foundCategory);
        setAllCategoryIds(categoryIds);
      } else {
        setCategoryInfo(null);
        setCategoryTitle("");
        setAllCategoryIds([]);
        setCategoryProducts([]);
        setTotalItems(0);
        setTotalPages(1);
      }
    }
  }, [categories, id]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategory, sortOption, priceRange, lang]);

  // Fetch products for this category with filters
  useEffect(() => {
    let cancelled = false;

    const loadFilteredProducts = async () => {
      try {
        const currentRouteCategoryKey = String(id ?? "");
        const queryParams: any = {
          simple: false,
          page: currentPage,
          per_page: itemsPerPage
        };

        // Determine which category to filter by
        let categoryIdsToFilter: number[] = [];
        
        if (selectedSubCategory !== null) {
          // If a specific subcategory is selected
          categoryIdsToFilter = [selectedSubCategory];
        } else if (categoryInfo?.id && allCategoryIds.length > 0) {
          // Keep descendants list locally (used for UI state), but the API expects `category_id`.
          // Sending `category_ids` is ignored by the backend and returns unfiltered products.
          categoryIdsToFilter = allCategoryIds;
        }

        // Always send a single category_id.
        // The backend already includes child-category products when using a parent category_id.
        const activeCategoryId =
          selectedSubCategory !== null
            ? selectedSubCategory
            : categoryInfo?.id ?? null;

        if (activeCategoryId !== null) {
          queryParams.category_id = activeCategoryId;
        }

        // Add sort option if selected
        const parsedSort = parseSortToken(sortOption);
        if (parsedSort) {
          queryParams.sort_by = parsedSort.sortBy;
          queryParams.sort_order = parsedSort.sortOrder;
        }

        // Add price range filter
        if (priceRange[0] !== null) {
          queryParams.min_price = priceRange[0];
        }
        if (priceRange[1] !== null) {
          queryParams.max_price = priceRange[1];
        }

        
        if (categoryIdsToFilter.length === 0) {
          if (cancelled) return;
          setCategoryProducts([]);
          setTotalItems(0);
          setTotalPages(1);
          return;
        }
        
        // Fetch products with filters
        const result = await fetchProducts(queryParams, lang);

        // Ignore late responses from a previous category route.
        if (cancelled || String(id ?? "") !== currentRouteCategoryKey) {
          return;
        }

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
        } else {
          productsData = [];
        }

        // Update states
        setCategoryProducts(productsData);
        setTotalItems(totalCount);
        setTotalPages(Math.ceil(totalCount / itemsPerPage) || 1);
        
        
      } catch (error) {
        if (cancelled) return;
        console.error("Error loading filtered products:", error);
        setCategoryProducts([]);
        setTotalItems(0);
        setTotalPages(1);
      }
    };

    const categoryMatchesRoute = !!(
      id &&
      categoryInfo &&
      (categoryInfo.slug === id || String(categoryInfo.id) === String(id))
    );

    if (categories.length > 0 && categoryMatchesRoute && allCategoryIds.length > 0) {
      loadFilteredProducts();
    }
    return () => {
      cancelled = true;
    };
  }, [lang, id, selectedSubCategory, sortOption, priceRange, currentPage, categoryInfo, allCategoryIds, fetchProducts, categories.length]);

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
        <div>
          <HeroSection sliders={sliders} />

          <BannerSection images={data?.main_images || []} />
          
          {/* Use Bestseller component with similar structure as Offers.tsx */}
          <Bestseller
            title={categoryTitle || t("CategoryProducts") || "منتجات الفئة"}
            btn={false}
            products={categoryProducts}
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
                  initialCategoryId={categoryInfo?.id ? Number(categoryInfo.id) : null}
                  subCategories={categoryInfo?.children || []}
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
          
          <div className="mb-15">
            <Parttner />
          </div>
        </div>
      </div>
    </Layout>
  );
}
