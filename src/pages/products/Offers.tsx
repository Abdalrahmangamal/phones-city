// Offers.tsx
import Layout from "@/components/layout/layout";
import NewHeroSection from "@/components/public/HeroSection";
import BannerSection from "@/components/public/BannerSection";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";
import Filter from "@/components/public/Filter";
import DeferredSection from "@/components/common/DeferredSection";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore.ts";
import { useEffect, useMemo, useState } from "react";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";
import { useHeroSectionStore } from "@/store/home/herosectionStore";
import { useHomePageStore } from '@/store/home/homepageStore';
import type { Product } from '@/types/index';
import { usePageSEO } from "@/hooks/usePageSEO";
import { getCategorySelectionIdSet, isProductOnOffer, parseSortToken, productMatchesCategoryIdSet } from "@/utils/filterUtils";
import axiosClient from "@/api/axiosClient";

export default function Offers() {
  const { fetchCategories, categories } = useCategoriesStore();
  const { lang } = useLangSync();
  const { t } = useTranslation();
  const { sliders, fetchSliders } = useHeroSectionStore();
  const { fetchHomePage, data } = useHomePageStore();

  // All offer products fetched from API (no sorting/filtering sent to API)
  const [allOfferProducts, setAllOfferProducts] = useState<Product[]>([]);
  const [offersLoading, setOffersLoading] = useState(false);

  // State for filters
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number | null, number | null]>([null, null]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
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

  // SEO for offers page
  usePageSEO({
    title: lang === "ar" ? "العروض - أفضل العروض والخصومات" : "Offers - Best Deals & Discounts",
    description: lang === "ar"
      ? "اكتشف أفضل عروض وخصومات مدينة الهواتف على الهواتف الذكية والأجهزة الإلكترونية في السعودية"
      : "Discover the best deals and discounts at City Phones on smartphones and electronics in Saudi Arabia",
    keywords: lang === "ar"
      ? "عروض, خصومات, تخفيضات, هواتف, أجهزة إلكترونية, مدينة الهواتف"
      : "offers, deals, discounts, phones, electronics, City Phones",
    lang,
  });

  const selectedCategoryIds = useMemo(
    () => getCategorySelectionIdSet(selectedSubCategory, categories as any),
    [selectedSubCategory, categories]
  );

  const parsedSort = useMemo(() => parseSortToken(sortOption), [sortOption]);

  const apiCategoryId = useMemo(() => {
    if (selectedSubCategory === null) return null;
    if (!selectedCategoryIds || selectedCategoryIds.size !== 1) return null;
    if (!Array.isArray(categories) || categories.length === 0) return null;
    return Array.from(selectedCategoryIds)[0] ?? null;
  }, [selectedSubCategory, selectedCategoryIds, categories]);

  // Fetch offer products from API with server-side sort/price filtering when possible.
  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const fetchAllOffers = async () => {
      try {
        setOffersLoading(true);

        const params: Record<string, unknown> = {
          has_offer: 1,
          per_page: 100,
          simple: 0,
        };

        if (priceRange[0] !== null) params.min_price = priceRange[0];
        if (priceRange[1] !== null) params.max_price = priceRange[1];
        if (parsedSort) {
          params.sort_by = parsedSort.sortBy;
          params.sort_order = parsedSort.sortOrder;
        }
        if (apiCategoryId !== null) {
          params.category_id = apiCategoryId;
        }

        const res = await axiosClient.get(`api/v1/products`, {
          params,
          signal: controller.signal,
          headers: { "Accept-Language": lang || "ar" },
        });

        if (cancelled) return;
        const products = Array.isArray(res.data.data) ? res.data.data : [];
        setAllOfferProducts(products);
      } catch (error) {
        if (
          (error as any)?.name === "CanceledError" ||
          (error as any)?.code === "ERR_CANCELED" ||
          controller.signal.aborted
        ) {
          return;
        }
        console.error("Error fetching offer products:", error);
        if (!cancelled) {
          setAllOfferProducts([]);
        }
      } finally {
        if (!cancelled) {
          setOffersLoading(false);
        }
      }
    };

    fetchAllOffers();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [lang, priceRange, parsedSort, apiCategoryId]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategory, sortOption, priceRange]);

  // Keep only the remaining client-side work: offer safety check + tree category filtering.
  const filteredAndSortedProducts = useMemo(() => {
    // Start with all offer products
    let result = allOfferProducts.filter((product) => isProductOnOffer(product));

    // Apply category filter locally only when we need tree/descendants matching.
    if (selectedSubCategory !== null && selectedCategoryIds && apiCategoryId === null) {
      result = result.filter((product) =>
        productMatchesCategoryIdSet(product, selectedCategoryIds)
      );
    }

    return result;
  }, [allOfferProducts, selectedSubCategory, selectedCategoryIds, apiCategoryId]);

  // Client-side pagination
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

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

  if (isLoading || (offersLoading && allOfferProducts.length === 0)) {
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

        <DeferredSection
          minHeight={160}
          rootMargin="200px 0px"
          placeholder={<div className="h-32 md:h-48" aria-hidden />}
        >
          <BannerSection images={data?.main_images || []} />
        </DeferredSection>

        <Bestseller
          title={`${t("CityofPhonesOffers")}`}
          btn={true}
          link={`/${lang}/SpecialOffersPage`}
          products={paginatedProducts}
          isLoading={offersLoading && allOfferProducts.length === 0}
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

        <DeferredSection
          minHeight={160}
          rootMargin="400px 0px"
          placeholder={<div className="h-32 md:h-48" aria-hidden />}
        >
          <BannerSection images={data?.main_images || []} />
        </DeferredSection>

        <DeferredSection minHeight={120} rootMargin="500px 0px">
          <div className="mb-15">
            <Parttner />
          </div>
        </DeferredSection>
      </div>
    </Layout>
  );
}
