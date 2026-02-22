// Offers.tsx
import Layout from "@/components/layout/layout";
import NewHeroSection from "@/components/public/HeroSection";
import BannerSection from "@/components/public/BannerSection";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";
import Filter from "@/components/public/Filter";
import { useProductsStore } from "@/store/productsStore.ts";
import { useCategoriesStore } from "@/store/categories/useCategoriesStore.ts";
import { useEffect, useMemo, useState, useRef } from "react";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";
import { useHeroSectionStore } from "@/store/home/herosectionStore";
import { useHomePageStore } from '@/store/home/homepageStore';
import type { Product } from '@/types/index';
import { usePageSEO } from "@/hooks/usePageSEO";
import { isProductOnOffer, parseSortToken, getProductNumericPrice } from "@/utils/filterUtils";
import axiosClient from "@/api/axiosClient";

export default function Offers() {
  const { loading } = useProductsStore();
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

  // Ref to track if initial offers have been fetched
  const offersFetched = useRef(false);

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

  // Fetch ALL offer products from API (no sort/filter params - only has_offer)
  useEffect(() => {
    const fetchAllOffers = async () => {
      try {
        setOffersLoading(true);
        // Fetch a large batch of offer products without any sort/filter to get the full set
        const res = await axiosClient.get(`api/v1/products`, {
          params: { has_offer: 1, per_page: 100, simple: 0 },
          headers: { "Accept-Language": lang || "ar" },
        });

        const products = Array.isArray(res.data.data) ? res.data.data : [];
        setAllOfferProducts(products);
        offersFetched.current = true;
      } catch (error) {
        console.error("Error fetching offer products:", error);
        setAllOfferProducts([]);
      } finally {
        setOffersLoading(false);
      }
    };

    fetchAllOffers();
  }, [lang]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategory, sortOption, priceRange]);

  // Apply client-side filtering and sorting on the offer products
  const filteredAndSortedProducts = useMemo(() => {
    // Start with all offer products
    let result = allOfferProducts.filter((product) => isProductOnOffer(product));

    // Apply category filter
    if (selectedSubCategory !== null) {
      const selectedCategory = categories.find(
        cat => cat.id === selectedSubCategory
      );

      if (selectedCategory?.children?.length) {
        const childIds = selectedCategory.children.map(child => child.id);
        result = result.filter(
          (product) => product.category?.id && childIds.includes(product.category.id)
        );
      } else {
        result = result.filter(
          (product) => product.category?.id === selectedSubCategory
        );
      }
    }

    // Apply price range filter
    if (priceRange[0] !== null || priceRange[1] !== null) {
      result = result.filter((product) => {
        const price = getProductNumericPrice(product);
        const min = priceRange[0];
        const max = priceRange[1];

        if (min !== null && price < min) return false;
        if (max !== null && price > max) return false;
        return true;
      });
    }

    // Apply sorting
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
            const aTime = new Date((a as any)?.created_at || 0).getTime() || 0;
            const bTime = new Date((b as any)?.created_at || 0).getTime() || 0;
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
  }, [allOfferProducts, selectedSubCategory, categories, sortOption, priceRange, lang]);

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

  if (isLoading || offersLoading) {
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
          products={paginatedProducts}
          isLoading={offersLoading}
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

        <BannerSection images={data?.main_images || []} />

        <div className="mb-15">
          <Parttner />
        </div>
      </div>
    </Layout>
  );
}
