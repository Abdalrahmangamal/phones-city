// Trademarks.tsx
import Bestseller from "@/components/home/Bestseller";
import Layout from "@/components/layout/layout";
import Offerherosection from "@/components/public/Offerherosection";
import Sliderbycategory from "@/components/public/Sliderbycategory";
import Parttner from "@/components/public/Parttner";
import Filter from "@/components/public/Filter";
import { useLangSync } from "@/hooks/useLangSync";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { usePageData } from "@/hooks/usePageData";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";
import type { Product } from '@/types/index';
import axios from "axios";
import { getProductNumericPrice, parseSortToken } from "@/utils/filterUtils";

export default function Trademarks() {
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  // Filters
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([null, null]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isLoading, setIsLoading] = useState(true);
  const [trademarkName, setTrademarkName] = useState<string>("");

  const {
    fetchCategoriesbyid,
    Categoriesbyid = [],
    Catesubgategory = [],
    fetchCatesubgategory,
    fetchtradmarks,
    treadmark = [],
  } = useCategoriesStore();

  const { page: trademarksBannerPage, loading: isBannerLoading } = usePageData("tredmarks-banner");

  // Reset route-scoped filters when trademark changes to prevent stale filters/products from the previous trademark page.
  useEffect(() => {
    setSelectedSubCategory(null);
    setActiveSubCategory(null);
    setSortOption("");
    setPriceRange([null, null]);
    setCurrentPage(1);
    setTrademarkName("");
  }, [id, lang]);

  // Load initial data
  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    
    const loadData = async () => {
      try {
        await Promise.all([
          fetchtradmarks(lang),
          fetchCategoriesbyid(id, "products", lang),
          fetchCatesubgategory(id, lang)
        ]);
      } catch (error) {
        console.error("Error loading trademark data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [id, lang, fetchCategoriesbyid, fetchCatesubgategory, fetchtradmarks]);

  // Get trademark name with language support
  useEffect(() => {
    if (!id) return;
    
    const fetchTrademarkName = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${baseUrl}api/v1/categories/trademarks`, {
          headers: { 
            "Accept-Language": lang,
            "Accept": "application/json"
          }
        });
        
        const data = response.data.data;
        const trademark = data?.find((item: any) => 
          item.id === parseInt(id) || item.slug === id
        );
        
        if (trademark) {
          setTrademarkName(
            lang === 'ar' 
              ? (trademark.name_ar || trademark.name || trademark.slug)
              : (trademark.name_en || trademark.name || trademark.slug)
          );
        }
      } catch (error) {
        console.error("Error fetching trademark name:", error);
        // Fallback
        const fallback = treadmark.find((item: any) => 
          item.id === parseInt(id) || item.slug === id
        );
        if (fallback) setTrademarkName(fallback.name || fallback.slug);
      }
    };

    fetchTrademarkName();
  }, [id, lang, treadmark]);

  // Handle subcategory selection from slider
  const handleSubCategorySelect = (categoryId: number | null) => {
    setActiveSubCategory(categoryId);
    setSelectedSubCategory(categoryId);
    setCurrentPage(1);
  };

  // ── 1. Filter + Sort (independent of current page) ──
  const filteredAndSortedProducts = useMemo(() => {
    if (!Categoriesbyid?.length) return [];

    let result = [...Categoriesbyid];

    // Filter by active subcategory (from slider)
    if (activeSubCategory) {
      result = result.filter(p => p.category?.id === activeSubCategory);

      // Fallback filters if no match
      if (!result.length) {
        result = Categoriesbyid.filter(p => 
          p.category_ids?.includes(activeSubCategory) ||
          p.categories?.some((c: any) => c.id === activeSubCategory) ||
          p.category?.parent_id === activeSubCategory
        );
      }
    }

    // Filter by selected subcategory (from Filter component)
    if (selectedSubCategory !== null && !activeSubCategory) {
      result = result.filter(p => 
        p.category?.id === selectedSubCategory || 
        p.category?.parent_id === selectedSubCategory
      );
    }

    // Price range filter
    if (priceRange[0] !== null) {
      result = result.filter((p) => getProductNumericPrice(p) >= priceRange[0]!);
    }
    if (priceRange[1] !== null) {
      result = result.filter((p) => getProductNumericPrice(p) <= priceRange[1]!);
    }

    // Sorting
    const parsedSort = parseSortToken(sortOption);
    if (parsedSort) {
      result = [...result].sort((a, b) => {
        switch (parsedSort.sortBy) {
          case "main_price": {
            const diff = getProductNumericPrice(a) - getProductNumericPrice(b);
            return parsedSort.sortOrder === "asc" ? diff : -diff;
          }
          case "name_ar": {
            const diff = (a.name || "").localeCompare(b.name || "", lang === "ar" ? "ar" : "en");
            return parsedSort.sortOrder === "asc" ? diff : -diff;
          }
          case "average_rating": {
            const diff = Number(a.average_rating || 0) - Number(b.average_rating || 0);
            return parsedSort.sortOrder === "asc" ? diff : -diff;
          }
          case "created_at": {
            const aTime = new Date((a as any)?.created_at || "1970-01-01").getTime();
            const bTime = new Date((b as any)?.created_at || "1970-01-01").getTime();
            const diff = aTime - bTime;
            return parsedSort.sortOrder === "asc" ? diff : -diff;
          }
          case "best_seller": {
            const diff = Number((a as any)?.sales_count || 0) - Number((b as any)?.sales_count || 0);
            return parsedSort.sortOrder === "asc" ? diff : -diff;
          }
          default:
            return 0;
        }
      });
    }

    return result;
  }, [
    Categoriesbyid,
    activeSubCategory,
    selectedSubCategory,
    sortOption,
    priceRange,
    lang
  ]);

  // ── 2. Pagination calculations ──
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // ── 3. Slice products for current page only ──
  const productsToShow = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAndSortedProducts.slice(start, end);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  // Handlers
  const handleSortChange = (option: string) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedSubCategory(categoryId);
    setActiveSubCategory(null);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (min: number | null, max: number | null) => {
    setPriceRange([min, max]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setActiveSubCategory(null);
    setSelectedSubCategory(null);
    setSortOption("");
    setPriceRange([null, null]);
    setCurrentPage(1);
  };

  // Loading state
  if (isBannerLoading || isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </Layout>
    );
  }

  const pageTitle = trademarkName
    ? lang === 'ar'
      ? `${t("products")} ${trademarkName}`
      : `${trademarkName} ${t("products")}`
    : trademarksBannerPage?.title || t("BrandProducts");

  const selectedSubCatName = activeSubCategory
    ? Catesubgategory.find(cat => cat.id === activeSubCategory)?.name || ""
    : "";

  const showFilterStatus = !!(activeSubCategory || selectedSubCategory || sortOption || priceRange[0] || priceRange[1]);

  return (
    <Layout>
      <Offerherosection
        title={pageTitle}
        description={trademarksBannerPage?.short_description || ""}
      />

      <div className="lg:px-[45px] pt-20 md:pt-0 flex-grow">
        <div className="mx-[-4px] md:-mx-[45px]">
          {Catesubgategory.length > 0 && (
            <>
              <Sliderbycategory
                category={Catesubgategory}
                setSelectedSubCategory={handleSubCategorySelect}
              />

              {showFilterStatus && (
                <div className="mt-4 px-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg font-medium text-[#211C4D]">
                      {t("showingFilteredProducts")}
                    </span>
                    {selectedSubCatName && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {t("category")}: {selectedSubCatName}
                      </span>
                    )}
                    
                  </div>

                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                  >
                    {t("resetFilters")}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <Bestseller
          title={pageTitle}
          btn={false}
          products={productsToShow}
          isLoading={false}
          filterComponent={
            <div className="flex justify-center">
              <Filter
                onSortChange={handleSortChange}
                onCategoryChange={handleCategoryChange}
                onPriceRangeChange={handlePriceRangeChange}
                categories={Catesubgategory}
                minPrice={0}
                maxPrice={10000}
                selectedCategory={selectedSubCategory}
                selectedSort={sortOption}
                selectedPriceRange={priceRange}
                resultCount={totalItems}
                onReset={handleResetFilters}
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
      </div>

      <div className="my-12">
        <Parttner />
      </div>
    </Layout>
  );
}
