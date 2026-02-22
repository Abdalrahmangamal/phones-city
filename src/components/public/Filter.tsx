import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SaudiRiyalIcon } from "@/components/common/SaudiRiyalIcon";

type CategoryLike = {
  id: number;
  name?: string;
  name_ar?: string;
  name_en?: string;
  slug?: string;
  children?: CategoryLike[];
};

interface FilterProps {
  onSortChange: (sortOption: string) => void;
  onCategoryChange: (categoryId: number | null) => void;
  onPriceRangeChange: (minPrice: number | null, maxPrice: number | null) => void;
  categories: CategoryLike[];
  minPrice?: number;
  maxPrice?: number;
  priceStep?: number;
  selectedSort?: string;
  selectedCategory?: number | null;
  selectedPriceRange?: [number | null, number | null];
  initialCategoryId?: number | null;
  subCategories?: CategoryLike[];
  onReset?: () => void;
  resultCount?: number;
  showCategorySearch?: boolean;
  title?: string;
}

const Filter: React.FC<FilterProps> = ({
  onSortChange,
  onCategoryChange,
  onPriceRangeChange,
  categories,
  minPrice = 0,
  maxPrice = 10000,
  priceStep = 100,
  selectedSort,
  selectedCategory,
  selectedPriceRange,
  initialCategoryId = null,
  subCategories,
  onReset,
  resultCount,
  showCategorySearch = true,
  title,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const rootRef = useRef<HTMLDivElement>(null);
  const tf = (key: string, ar: string, en: string) => {
    const translated = t(key);
    if (!translated || translated === key) {
      return isRTL ? ar : en;
    }
    return translated;
  };

  const [open, setOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [categorySearch, setCategorySearch] = useState("");

  const [localSort, setLocalSort] = useState(selectedSort ?? "");
  const [localCategory, setLocalCategory] = useState<number | null>(selectedCategory ?? null);
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number | null, number | null]>(selectedPriceRange ?? [null, null]);
  const [draftRange, setDraftRange] = useState<[number, number]>([
    selectedPriceRange?.[0] ?? minPrice,
    selectedPriceRange?.[1] ?? maxPrice,
  ]);

  const sortOptions = useMemo(
    () => [
      { id: "", label: tf("Default", "الافتراضي", "Default") },
      { id: "created_at:desc", label: tf("Newest", "الأحدث", "Newest") },
      { id: "main_price:asc", label: tf("PriceLowToHigh", "السعر: الأقل للأعلى", "Price: Low to High") },
      { id: "main_price:desc", label: tf("PriceHighToLow", "السعر: الأعلى للأقل", "Price: High to Low") },
      { id: "name_ar:asc", label: tf("NameAZ", "الاسم: أ - ي", "Name: A - Z") },
      { id: "average_rating:desc", label: tf("HighestRated", "الأعلى تقييماً", "Highest Rated") },
      { id: "best_seller:desc", label: tf("BestSelling", "الأكثر مبيعاً", "Best Selling") },
    ],
    [t, isRTL]
  );

  const categorySource = useMemo(
    () => (Array.isArray(subCategories) && subCategories.length > 0 ? subCategories : categories || []),
    [categories, subCategories]
  );

  const normalizeText = (value: unknown) => {
    if (typeof value === "string") return value.trim();
    if (value === null || value === undefined) return "";
    return String(value).trim();
  };

  const categoryLabel = (cat?: CategoryLike | null) =>
    cat
      ? (isRTL ? normalizeText(cat.name_ar) : normalizeText(cat.name_en)) ||
        normalizeText(cat.name) ||
        normalizeText(cat.slug) ||
        `${isRTL ? "فئة" : "Category"} ${cat.id}`
      : "";

  const flatCategories = useMemo(() => {
    const out: CategoryLike[] = [];
    const walk = (items: CategoryLike[]) => {
      items.forEach((c) => {
        out.push(c);
        if (Array.isArray(c.children) && c.children.length) walk(c.children);
      });
    };
    walk(categories || []);
    return out;
  }, [categories]);

  const selectedCategoryObj = useMemo(
    () => flatCategories.find((c) => c.id === localCategory) || categorySource.find((c) => c.id === localCategory) || null,
    [flatCategories, categorySource, localCategory]
  );

  const filteredCategories = useMemo(() => {
    const q = categorySearch.trim().toLowerCase();
    if (!q) return categorySource;
    return categorySource.filter((c) => categoryLabel(c).toLowerCase().includes(q));
  }, [categorySource, categorySearch]);

  useEffect(() => {
    if (selectedSort !== undefined) setLocalSort(selectedSort);
  }, [selectedSort]);

  useEffect(() => {
    if (selectedCategory !== undefined) setLocalCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedPriceRange !== undefined) {
      setAppliedPriceRange(selectedPriceRange);
      setDraftRange([selectedPriceRange[0] ?? minPrice, selectedPriceRange[1] ?? maxPrice]);
    }
  }, [selectedPriceRange, minPrice, maxPrice]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const sortLabel = sortOptions.find((s) => s.id === localSort)?.label || tf("Default", "الافتراضي", "Default");
  const activeMin = appliedPriceRange[0];
  const activeMax = appliedPriceRange[1];

  const activeCount =
    (localSort ? 1 : 0) +
    (localCategory !== null ? 1 : 0) +
    (activeMin !== null || activeMax !== null ? 1 : 0);

  const totalRange = Math.max(1, maxPrice - minPrice);
  const minPercent = ((draftRange[0] - minPrice) / totalRange) * 100;
  const maxPercent = ((draftRange[1] - minPrice) / totalRange) * 100;

  const normalizeRange = (nextMin: number, nextMax: number): [number, number] => {
    let a = Number.isFinite(nextMin) ? nextMin : minPrice;
    let b = Number.isFinite(nextMax) ? nextMax : maxPrice;
    a = Math.max(minPrice, Math.min(a, maxPrice));
    b = Math.max(minPrice, Math.min(b, maxPrice));
    if (a > b) [a, b] = [b, a];
    if (b - a < priceStep) {
      if (a + priceStep <= maxPrice) b = a + priceStep;
      else a = Math.max(minPrice, b - priceStep);
    }
    return [a, b];
  };

  const applyPriceRange = (minVal: number, maxVal: number) => {
    const [a, b] = normalizeRange(minVal, maxVal);
    setDraftRange([a, b]);
    const outMin = a <= minPrice ? null : a;
    const outMax = b >= maxPrice ? null : b;
    setAppliedPriceRange([outMin, outMax]);
    onPriceRangeChange(outMin, outMax);
  };

  const resetPriceRange = () => applyPriceRange(minPrice, maxPrice);

  const setSortValue = (value: string) => {
    setLocalSort(value);
    onSortChange(value);
  };

  const setCategoryValue = (value: number | null) => {
    setLocalCategory(value);
    onCategoryChange(value);
  };

  const resetAll = () => {
    setLocalSort("");
    setLocalCategory(null);
    setCategorySearch("");
    setDraftRange([minPrice, maxPrice]);
    setAppliedPriceRange([null, null]);
    onSortChange("");
    onCategoryChange(null);
    onPriceRangeChange(null, null);
    onReset?.();
  };

  return (
    <div className="relative w-full md:w-[340px]" dir={isRTL ? "rtl" : "ltr"} ref={rootRef}>
      <button
        type="button"
        className="w-full rounded-2xl border border-[#211C4D]/10 bg-white px-4 py-3 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#211C4D] to-[#2AA0DC] text-white grid place-items-center">
            <SlidersHorizontal className="w-5 h-5" />
          </span>
          <div className="min-w-0 text-start">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#211C4D] text-sm truncate">
                {title || tf("Filter", "الفلتر", "Filter")}
              </span>
              {activeCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 rounded-full bg-[#2AA0DC]/15 text-[#0F6FA1] text-[11px] font-bold px-1.5">
                  {activeCount}
                </span>
              )}
            </div>
            <p className="text-xs text-[#667085] truncate">
              {resultCount !== undefined
                ? `${resultCount.toLocaleString()} ${tf("products", "منتج", "items")}`
                : `${sortLabel}`}
            </p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#211C4D]/70 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className={`absolute top-[calc(100%+10px)] z-40 w-full rounded-2xl border border-[#211C4D]/10 bg-white shadow-[0_18px_50px_-20px_rgba(33,28,77,0.35)] ${isRTL ? "right-0" : "left-0"}`}>
          <div className="px-4 py-3 border-b border-[#EEF2F6] bg-gradient-to-r from-[#FAFBFF] to-white flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-[#211C4D]">{title || tf("Filter", "الفلتر", "Filter")}</p>
              <p className="text-xs text-[#667085]">
                {activeCount > 0 ? `${activeCount} ${isRTL ? "فلاتر مفعلة" : "active filters"}` : (isRTL ? "خصص النتائج" : "Customize results")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex items-center gap-1 rounded-full border border-[#E4E7EC] px-2.5 py-1 text-xs text-[#344054] hover:bg-[#F9FAFB]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {tf("resetFilters", "إعادة ضبط", "Reset")}
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E4E7EC] hover:bg-[#F9FAFB]"
                aria-label={isRTL ? "إغلاق" : "Close"}
              >
                <X className="w-4 h-4 text-[#344054]" />
              </button>
            </div>
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-3 space-y-3">
            {activeCount > 0 && (
              <div className="flex flex-wrap gap-2">
                {localSort && (
                  <button
                    type="button"
                    onClick={() => setSortValue("")}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE7F3] bg-[#F7FBFF] px-3 py-1 text-xs text-[#344054]"
                  >
                    {tf("SortBy", "الترتيب", "Sort")}: {sortLabel}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {localCategory !== null && selectedCategoryObj && (
                  <button
                    type="button"
                    onClick={() => setCategoryValue(null)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE7F3] bg-[#F7FBFF] px-3 py-1 text-xs text-[#344054]"
                  >
                    {tf("Categories", "الفئات", "Categories")}: {categoryLabel(selectedCategoryObj)}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {(activeMin !== null || activeMax !== null) && (
                  <button
                    type="button"
                    onClick={resetPriceRange}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE7F3] bg-[#F7FBFF] px-3 py-1 text-xs text-[#344054]"
                  >
                    {tf("Price", "السعر", "Price")}: {(activeMin ?? minPrice).toLocaleString()} - {(activeMax ?? maxPrice).toLocaleString()}
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-[#EEF2F6] overflow-hidden">
              <button type="button" className="w-full px-4 py-3 flex items-center justify-between bg-[#FBFCFE]" onClick={() => setSortOpen((v) => !v)}>
                <div className="text-start">
                  <p className="text-sm font-semibold text-[#211C4D]">{tf("SortBy", "الترتيب", "Sort by")}</p>
                  <p className="text-xs text-[#667085]">{sortLabel}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#344054] transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              {sortOpen && (
                <div className="p-3 space-y-2">
                  {sortOptions.map((opt) => {
                    const selected = localSort === opt.id;
                    return (
                      <button
                        key={opt.id || "default"}
                        type="button"
                        onClick={() => setSortValue(opt.id)}
                        className={`w-full rounded-xl border px-3 py-2.5 text-start transition-all ${selected ? "border-[#2AA0DC]/35 bg-[#EAF8FF]" : "border-[#EEF2F6] hover:bg-[#FAFBFC]"}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${selected ? "bg-[#2AA0DC] border-[#2AA0DC]" : "border-[#D0D5DD]"}`}>
                            {selected && <Check className="w-3 h-3 text-white" />}
                          </span>
                          <span className={`text-sm ${selected ? "font-semibold text-[#211C4D]" : "text-[#344054]"}`}>{opt.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-[#EEF2F6] overflow-hidden">
              <button type="button" className="w-full px-4 py-3 flex items-center justify-between bg-[#FBFCFE]" onClick={() => setCategoryOpen((v) => !v)}>
                <div className="text-start">
                  <p className="text-sm font-semibold text-[#211C4D]">{tf("Categories", "الفئات", "Categories")}</p>
                  <p className="text-xs text-[#667085] truncate max-w-[220px]">
                    {localCategory !== null && selectedCategoryObj ? categoryLabel(selectedCategoryObj) : tf("All", "الكل", "All")}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#344054] transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
              </button>
              {categoryOpen && (
                <div className="p-3 space-y-2">
                  {showCategorySearch && categorySource.length > 6 && (
                    <div className="relative">
                      <Search className={`w-4 h-4 text-[#667085] absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-3" : "left-3"}`} />
                      <input
                        type="text"
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        placeholder={tf("Search", "ابحث عن فئة", "Search category")}
                        className={`w-full rounded-xl border border-[#E4E7EC] py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2AA0DC]/25 ${isRTL ? "pr-9 pl-3" : "pl-9 pr-3"}`}
                      />
                    </div>
                  )}

                  <div className="max-h-[230px] overflow-y-auto space-y-2">
                    <button
                      type="button"
                      onClick={() => setCategoryValue(null)}
                      className={`w-full rounded-xl border px-3 py-2.5 text-start ${localCategory === null ? "border-[#2AA0DC]/35 bg-[#EAF8FF]" : "border-[#EEF2F6] hover:bg-[#FAFBFC]"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${localCategory === null ? "bg-[#2AA0DC] border-[#2AA0DC]" : "border-[#D0D5DD]"}`}>
                          {localCategory === null && <Check className="w-3 h-3 text-white" />}
                        </span>
                        <span className="text-sm text-[#344054]">{tf("All", "الكل", "All")}</span>
                      </div>
                    </button>

                    {filteredCategories.map((cat) => {
                      const selected = localCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategoryValue(cat.id)}
                          className={`w-full rounded-xl border px-3 py-2.5 text-start ${selected ? "border-[#2AA0DC]/35 bg-[#EAF8FF]" : "border-[#EEF2F6] hover:bg-[#FAFBFC]"}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${selected ? "bg-[#2AA0DC] border-[#2AA0DC]" : "border-[#D0D5DD]"}`}>
                              {selected && <Check className="w-3 h-3 text-white" />}
                            </span>
                            <span className={`text-sm truncate ${selected ? "font-semibold text-[#211C4D]" : "text-[#344054]"}`}>{categoryLabel(cat)}</span>
                            {Array.isArray(cat.children) && cat.children.length > 0 && (
                              <span className="ms-auto text-[10px] rounded-full bg-[#F2F4F7] px-2 py-0.5 text-[#667085]">
                                {cat.children.length}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}

                    {filteredCategories.length === 0 && (
                      <div className="rounded-xl border border-dashed border-[#D9E2EC] px-4 py-4 text-center text-sm text-[#667085]">
                        {isRTL ? "لا توجد نتائج للفئات" : "No categories found"}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-[#EEF2F6] overflow-hidden">
              <button type="button" className="w-full px-4 py-3 flex items-center justify-between bg-[#FBFCFE]" onClick={() => setPriceOpen((v) => !v)}>
                <div className="text-start">
                  <p className="text-sm font-semibold text-[#211C4D]">{tf("Price", "السعر", "Price")}</p>
                  <p className="text-xs text-[#667085]">
                    {activeMin !== null || activeMax !== null ? `${(activeMin ?? minPrice).toLocaleString()} - ${(activeMax ?? maxPrice).toLocaleString()}` : (isRTL ? "كل الأسعار" : "All prices")}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#344054] transition-transform ${priceOpen ? "rotate-180" : ""}`} />
              </button>
              {priceOpen && (
                <div className="p-3 space-y-3">
                  <div className="rounded-xl border border-[#EEF2F6] p-3 bg-white">
                    <div className="relative h-2 rounded-full bg-[#EEF2F6] overflow-hidden">
                      <div
                        className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#211C4D] to-[#2AA0DC]"
                        style={{ left: `${Math.max(0, minPercent)}%`, right: `${Math.max(0, 100 - maxPercent)}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="relative">
                        <input
                          type="number"
                          min={minPrice}
                          max={draftRange[1] - priceStep}
                          step={priceStep}
                          value={draftRange[0]}
                          onChange={(e) => setDraftRange(normalizeRange(Number(e.target.value), draftRange[1]))}
                          className={`w-full rounded-lg border border-[#E4E7EC] py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2AA0DC]/25 ${isRTL ? "pr-3 pl-8" : "pl-3 pr-8"}`}
                        />
                        <SaudiRiyalIcon className={`w-4 h-4 text-[#98A2B3] absolute top-1/2 -translate-y-1/2 ${isRTL ? "left-2.5" : "right-2.5"}`} />
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          min={draftRange[0] + priceStep}
                          max={maxPrice}
                          step={priceStep}
                          value={draftRange[1]}
                          onChange={(e) => setDraftRange(normalizeRange(draftRange[0], Number(e.target.value)))}
                          className={`w-full rounded-lg border border-[#E4E7EC] py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2AA0DC]/25 ${isRTL ? "pr-3 pl-8" : "pl-3 pr-8"}`}
                        />
                        <SaudiRiyalIcon className={`w-4 h-4 text-[#98A2B3] absolute top-1/2 -translate-y-1/2 ${isRTL ? "left-2.5" : "right-2.5"}`} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        step={priceStep}
                        value={draftRange[0]}
                        onChange={(e) => setDraftRange(normalizeRange(Number(e.target.value), draftRange[1]))}
                        className="w-full accent-[#211C4D]"
                      />
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        step={priceStep}
                        value={draftRange[1]}
                        onChange={(e) => setDraftRange(normalizeRange(draftRange[0], Number(e.target.value)))}
                        className="w-full accent-[#2AA0DC]"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <button type="button" onClick={() => resetPriceRange()} className="rounded-full border border-[#E4E7EC] px-2.5 py-1 text-[11px] text-[#344054] hover:bg-[#F9FAFB]">
                        {tf("All", "الكل", "All")}
                      </button>
                      <button type="button" onClick={() => applyPriceRange(minPrice, Math.min(maxPrice, minPrice + Math.round((maxPrice - minPrice) / 3)))} className="rounded-full border border-[#E4E7EC] px-2.5 py-1 text-[11px] text-[#344054] hover:bg-[#F9FAFB]">
                        {tf("Budget", "اقتصادي", "Budget")}
                      </button>
                      <button type="button" onClick={() => applyPriceRange(Math.max(minPrice, maxPrice - Math.round((maxPrice - minPrice) / 3)), maxPrice)} className="rounded-full border border-[#E4E7EC] px-2.5 py-1 text-[11px] text-[#344054] hover:bg-[#F9FAFB]">
                        {tf("Premium", "مرتفع", "Premium")}
                      </button>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => applyPriceRange(draftRange[0], draftRange[1])}
                        className="flex-1 rounded-xl bg-[#211C4D] text-white text-sm font-semibold px-3 py-2.5 hover:bg-[#2B2559]"
                      >
                        {tf("Apply", "تطبيق", "Apply")}
                      </button>
                      <button
                        type="button"
                        onClick={resetPriceRange}
                        className="rounded-xl border border-[#E4E7EC] text-sm font-medium text-[#344054] px-3 py-2.5 hover:bg-[#F9FAFB]"
                      >
                        {tf("ResetPrice", "مسح السعر", "Clear")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
