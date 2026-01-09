
import { useEffect, useMemo } from "react";
import { usePageStore } from "@/store/customerCareStore";
import { useLangSync } from "@/hooks/useLangSync";

/**
 * Hook مخصص لجلب بيانات الصفحات
 * @param slug - slug الصفحة (مثل: "about-mowara", "return-policy")
 */
export function usePageData(slug: string) {
  const { fetchPage, getPage, isLoading } = usePageStore();
  const { lang } = useLangSync();

  // الحصول على الصفحة من الـ store
  const page = getPage(slug, lang);
  const loading = isLoading(slug, lang);

  useEffect(() => {
    // جلب البيانات فقط إذا لم تكن موجودة وليست قيد التحميل
    if (!page && !loading) {
      fetchPage(slug, lang);
    }
  }, [slug, lang, page, loading, fetchPage]);

  return useMemo(() => ({
    page,
    loading,
    refetch: () => fetchPage(slug, lang),
  }), [page, loading, slug, lang, fetchPage]);
}
