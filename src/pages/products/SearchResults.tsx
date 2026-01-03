import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Bestseller from "@/components/home/Bestseller";
import { useProductsStore } from "@/store/productsStore";
import { useLangSync } from "@/hooks/useLangSync";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SearchResults() {
  const { fetchProducts, loading } = useProductsStore();
  const { lang } = useLangSync();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || searchParams.get("search") || "";
  const [products, setProducts] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const run = async () => {
      try {
        const data = await fetchProducts({ search: q, per_page: 24 }, lang);
        if (Array.isArray(data)) setProducts(data);
        else setProducts([]);
      } catch (e) {
        setProducts([]);
      }
    };

    if (q && q.trim().length > 0) run();
    else setProducts([]);
  }, [q, lang]);

  return (
    <Layout>
      <div className="min-h-screen py-10 px-4 lg:px-20">
        <h2 className="text-2xl font-semibold mb-6">{t("Searchresultsfor")} "{q}"</h2>
        <Bestseller containercard={`lg:!px-[10px]`} title="" products={products} isLoading={loading} />
      </div>
    </Layout>
  );
}
