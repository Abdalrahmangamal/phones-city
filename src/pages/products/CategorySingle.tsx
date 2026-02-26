import Layout from "@/components/layout/Layout";
import DeferredSection from "@/components/common/DeferredSection";
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

const CATEGORY_PAGE_CACHE_TTL_MS = 60_000;
const CATEGORY_TREE_CACHE_TTL_MS = 120_000;
const CATEGORY_FETCH_ALL_CACHE_TTL_MS = 120_000;
const MAX_PARALLEL_CATEGORY_FETCHES = 4;

type TimedCacheEntry<T> = {
  data: T;
  fetchedAt: number;
};

const categoryPageCache = new Map<string, TimedCacheEntry<any>>();
const categoryTreeCache = new Map<string, TimedCacheEntry<Product[]>>();
const categoryFetchAllCache = new Map<string, TimedCacheEntry<Product[]>>();

const getFreshCacheValue = <T,>(
  cache: Map<string, TimedCacheEntry<T>>,
  key: string,
  ttlMs: number
): T | null => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.fetchedAt > ttlMs) return null;
  return entry.data;
};

const buildCacheParamsKey = (params: Record<string, unknown>) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${String(value)}`)
    .join("&");

const buildCategoryPageCacheKey = (langCode: string, params: Record<string, unknown>) =>
  `${langCode || "ar"}::page::${buildCacheParamsKey(params)}`;

const buildCategoryFetchAllCacheKey = (
  categoryId: number,
  langCode: string,
  params: Record<string, unknown>
) => `${langCode || "ar"}::all::${categoryId}::${buildCacheParamsKey(params)}`;

const buildCategoryTreeCacheKey = (
  langCode: string,
  categoryIds: number[],
  params: Record<string, unknown>
) =>
  `${langCode || "ar"}::tree::${[...categoryIds].sort((a, b) => a - b).join(",")}::${buildCacheParamsKey(params)}`;

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  if (items.length === 0) return [];

  const safeLimit = Math.max(1, Math.min(limit, items.length));
  const results = new Array<R>(items.length);
  let nextIndex = 0;

  const worker = async () => {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= items.length) return;
      results[index] = await mapper(items[index], index);
    }
  };

  await Promise.all(Array.from({ length: safeLimit }, () => worker()));
  return results;
}

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

  const fetchProductsPageRaw = async (
    params: Record<string, unknown>,
    langCode: string,
    signal?: AbortSignal
  ) => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const res = await axiosClient.get(`api/v1/products`, {
          params,
          signal,
          headers: {
            "Accept-Language": `${langCode || "ar"}`,
            Accept: "application/json",
          },
        });
        return res.data;
      } catch (error: any) {
        if (signal?.aborted || error?.code === "ERR_CANCELED" || error?.name === "CanceledError") {
          throw error;
        }
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
    extraParams: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<Product[]> => {
    const cacheKey = buildCategoryFetchAllCacheKey(categoryId, langCode, extraParams);
    const cached = getFreshCacheValue(categoryFetchAllCache, cacheKey, CATEGORY_FETCH_ALL_CACHE_TTL_MS);
    if (cached) {
      return cached;
    }

    const perPage = 100;
    const all: Product[] = [];
    let page = 1;
    let lastPage = 1;
    let safety = 0;

    while (page <= lastPage && safety < 50) {
      if (signal?.aborted) {
        throw new Error("Category products request cancelled");
      }
      safety += 1;

      const raw = await fetchProductsPageRaw(
        {
          // Category grid only needs list-card fields; `simple` reduces payload size.
          simple: true,
          category_id: categoryId,
          page,
          per_page: perPage,
          ...extraParams,
        },
        langCode,
        signal
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

    categoryFetchAllCache.set(cacheKey, { data: all, fetchedAt: Date.now() });
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
    setProductsLoading(false);
  }, [id, lang]);

  useEffect(() => {
    const loadData = async () => {
      const shouldFetchCategories = categories.length === 0;
      const shouldFetchSliders = sliders.length === 0;

      if (!shouldFetchCategories && !shouldFetchSliders) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(shouldFetchCategories);
        await Promise.all([
          shouldFetchCategories ? fetchCategories(lang) : Promise.resolve(),
          shouldFetchSliders ? fetchSliders(lang) : Promise.resolve(),
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
    const controller = new AbortController();

    const loadFilteredProducts = async () => {
      try {
        const currentRouteCategoryKey = String(id ?? "");
        const queryParams: any = {
          // Product cards on category pages only need summary fields.
          simple: true,
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

        const parsedSort = parseSortToken(sortOption);
        if (!aggregateParentAndChildren && parsedSort) {
          queryParams.sort_by = parsedSort.sortBy;
          queryParams.sort_order = parsedSort.sortOrder;
        }

        let productsData: Product[] = [];
        let totalCount = 0;

        if (aggregateParentAndChildren) {
          const treeFilterParams: Record<string, unknown> = {};
          if (queryParams.min_price !== undefined) treeFilterParams.min_price = queryParams.min_price;
          if (queryParams.max_price !== undefined) treeFilterParams.max_price = queryParams.max_price;

          const treeCacheKey = buildCategoryTreeCacheKey(lang, allCategoryIds, treeFilterParams);
          let mergedBaseProducts = getFreshCacheValue(categoryTreeCache, treeCacheKey, CATEGORY_TREE_CACHE_TTL_MS);

          if (!mergedBaseProducts) {
            setProductsLoading(true);

            const categoryIdsSet = new Set(allCategoryIds.map(Number));
            const categoryResults = await mapWithConcurrency(
              allCategoryIds.map(Number),
              MAX_PARALLEL_CATEGORY_FETCHES,
              (categoryId) => fetchAllProductsForCategory(categoryId, lang, treeFilterParams, controller.signal)
            );

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

            mergedBaseProducts = [...deduped.values()];
            categoryTreeCache.set(treeCacheKey, {
              data: mergedBaseProducts,
              fetchedAt: Date.now(),
            });
          }

          const mergedProducts = sortProductsLocally(mergedBaseProducts, sortOption);
          totalCount = mergedProducts.length;
          const start = (currentPage - 1) * itemsPerPage;
          productsData = mergedProducts.slice(start, start + itemsPerPage);
        } else {
          // Single category request can rely on backend pagination.
          const pageCacheKey = buildCategoryPageCacheKey(lang, queryParams);
          let raw = getFreshCacheValue(categoryPageCache, pageCacheKey, CATEGORY_PAGE_CACHE_TTL_MS);

          if (!raw) {
            setProductsLoading(true);
            raw = await fetchProductsPageRaw(queryParams, lang, controller.signal);
            categoryPageCache.set(pageCacheKey, {
              data: raw,
              fetchedAt: Date.now(),
            });
          }

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

      } catch (error: any) {
        if (
          cancelled ||
          controller.signal.aborted ||
          error?.code === "ERR_CANCELED" ||
          error?.name === "CanceledError"
        ) {
          return;
        }
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
      controller.abort();
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

  if (isLoading && categories.length === 0) {
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

          <DeferredSection
            minHeight={160}
            rootMargin="200px 0px"
            placeholder={<div className="h-32 md:h-48" aria-hidden />}
          >
            <BannerSection images={data?.main_images || []} />
          </DeferredSection>
          
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
          
          <DeferredSection minHeight={120} rootMargin="500px 0px">
            <div className="mb-15">
              <Parttner />
            </div>
          </DeferredSection>
        </div>
      </div>
    </Layout>
  );
}
