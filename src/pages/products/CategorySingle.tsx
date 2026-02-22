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
import { useTranslation } from "react-i18next";
import type { Product } from '@/types/index';
import { getProductNumericPrice, parseSortToken } from "@/utils/filterUtils";
import axiosClient from "@/api/axiosClient";

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
  const [productsLoading, setProductsLoading] = useState(false);

  const { fetchCategories, categories } = useCategoriesStore();

  const sortProductsLocally = (products: Product[], sortToken: string) => {
    const parsedSort = parseSortToken(sortToken);
    if (!parsedSort) return products;

    const { sortBy, sortOrder } = parsedSort;
    const dir = sortOrder === "asc" ? 1 : -1;
    const sorted = [...products];

    const str = (value: unknown) => (value == null ? "" : String(value)).toLowerCase();
    const num = (value: unknown) => {
      const n = Number(value);
      return Number.isFinite(n) ? n : 0;
    };

    sorted.sort((a: any, b: any) => {
      let left: any;
      let right: any;

      switch (sortBy) {
        case "main_price":
          left = getProductNumericPrice(a);
          right = getProductNumericPrice(b);
          break;
        case "average_rating":
          left = num(a?.average_rating);
          right = num(b?.average_rating);
          break;
        case "created_at":
          left = Date.parse(a?.created_at || "") || 0;
          right = Date.parse(b?.created_at || "") || 0;
          break;
        case "name_ar":
        case "name_en":
          left = str(a?.name);
          right = str(b?.name);
          break;
        case "best_seller":
          left = num(a?.best_seller ?? a?.is_best_seller);
          right = num(b?.best_seller ?? b?.is_best_seller);
          break;
        default:
          left = a?.[sortBy];
          right = b?.[sortBy];
          break;
      }

      if (typeof left === "string" || typeof right === "string") {
        return str(left).localeCompare(str(right), lang || "ar") * dir;
      }

      if (left === right) return 0;
      return (left > right ? 1 : -1) * dir;
    });

    return sorted;
  };

  const fetchProductsPageRaw = async (params: Record<string, unknown>, langCode: string) => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const res = await axiosClient.get(`api/v1/products`, {
          params,
          headers: {
            "Accept-Language": `${langCode || "ar"}`,
            Accept: "application/json",
          },
        });
        return res.data;
      } catch (error: any) {
        const status = error?.response?.status;
        if (status === 429 && attempt < 2) {
          await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
          continue;
        }
        throw error;
      }
    }

    return { data: [] };
  };

  const fetchAllProductsForCategory = async (
    categoryId: number,
    langCode: string,
    extraParams: Record<string, unknown>
  ): Promise<Product[]> => {
    const perPage = 100;
    const all: Product[] = [];
    let page = 1;
    let lastPage = 1;
    let safety = 0;

    while (page <= lastPage && safety < 50) {
      safety += 1;

      const raw = await fetchProductsPageRaw(
        {
          simple: false,
          category_id: categoryId,
          page,
          per_page: perPage,
          ...extraParams,
        },
        langCode
      );

      const pageItems = Array.isArray(raw?.data) ? raw.data : [];
      all.push(...pageItems);

      const pager = raw?.pagination || raw?.meta || raw?.pager;
      const parsedLastPage = Number(
        pager?.last_page ?? pager?.total_pages ?? 1
      );
      lastPage =
        Number.isFinite(parsedLastPage) && parsedLastPage > 0
          ? parsedLastPage
          : pageItems.length < perPage
            ? page
            : page + 1;

      if (pageItems.length < perPage && !pager) {
        break;
      }

      page += 1;
    }

    return all;
  };

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
        setProductsLoading(true);
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
          setProductsLoading(false);
          return;
        }

        const aggregateParentAndChildren =
          selectedSubCategory === null && allCategoryIds.length > 1;

        let productsData: Product[] = [];
        let totalCount = 0;

        if (aggregateParentAndChildren) {
          const extraParams: Record<string, unknown> = {};
          if (queryParams.min_price !== undefined) extraParams.min_price = queryParams.min_price;
          if (queryParams.max_price !== undefined) extraParams.max_price = queryParams.max_price;
          if (queryParams.sort_by !== undefined) extraParams.sort_by = queryParams.sort_by;
          if (queryParams.sort_order !== undefined) extraParams.sort_order = queryParams.sort_order;

          const categoryIdsSet = new Set(allCategoryIds.map(Number));
          const categoryResults: Product[][] = [];
          for (const categoryId of allCategoryIds) {
            const productsForCategory = await fetchAllProductsForCategory(
              Number(categoryId),
              lang,
              extraParams
            );
            categoryResults.push(productsForCategory);
          }

          // Merge and remove duplicates (products can belong to both parent and child categories).
          const deduped = new Map<number, Product>();
          for (const list of categoryResults) {
            for (const product of list) {
              const productCategories = Array.isArray((product as any)?.categories)
                ? (product as any).categories
                : [];

              const belongsToRequestedTree =
                productCategories.length === 0 ||
                productCategories.some((cat: any) => categoryIdsSet.has(Number(cat?.id)));

              if (!belongsToRequestedTree) continue;
              if (!deduped.has(product.id)) {
                deduped.set(product.id, product);
              }
            }
          }

          const mergedProducts = sortProductsLocally([...deduped.values()], sortOption);
          totalCount = mergedProducts.length;
          const start = (currentPage - 1) * itemsPerPage;
          productsData = mergedProducts.slice(start, start + itemsPerPage);
        } else {
          // Single category request can rely on backend pagination.
          const raw = await fetchProductsPageRaw(queryParams, lang);
          productsData = Array.isArray(raw?.data) ? raw.data : [];
          totalCount =
            Number(raw?.pagination?.total ?? raw?.meta?.total ?? raw?.pager?.total) ||
            productsData.length;
        }

        // Ignore late responses from a previous category route.
        if (cancelled || String(id ?? "") !== currentRouteCategoryKey) {
          return;
        }

        // Update states
        setCategoryProducts(productsData);
        setTotalItems(totalCount);
        setTotalPages(Math.ceil(totalCount / itemsPerPage) || 1);
        setProductsLoading(false);
        
        
      } catch (error) {
        if (cancelled) return;
        console.error("Error loading filtered products:", error);
        setCategoryProducts([]);
        setTotalItems(0);
        setTotalPages(1);
        setProductsLoading(false);
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
  }, [lang, id, selectedSubCategory, sortOption, priceRange, currentPage, categoryInfo, allCategoryIds, categories.length]);

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
            isLoading={productsLoading}
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
