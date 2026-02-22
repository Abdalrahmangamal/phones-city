import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Internalbanner from "@/components/public/Internalbanner";
import { useBlogsStore } from "@/store/blogsStore";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";
import { usePageSEO } from "@/hooks/usePageSEO";

export default function Blog() {
  const { t } = useTranslation();
  const { lang } = useLangSync();
  const { blogs, loading, error, pagination, fetchBlogs } = useBlogsStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBlogs(lang, currentPage);
  }, [lang, currentPage]);

  // SEO for blog listing page
  usePageSEO({
    title: lang === "ar" ? "المدونة - أحدث المقالات والأخبار" : "Blog - Latest Articles & News",
    description: lang === "ar"
      ? "تابع مدونة مدينة الهواتف لأحدث المقالات والأخبار عن الهواتف الذكية والتكنولوجيا والعروض الحصرية"
      : "Follow City Phones blog for the latest articles and news about smartphones, technology, and exclusive offers",
    keywords: lang === "ar"
      ? "مدونة, مقالات, هواتف, تكنولوجيا, أخبار, مدينة الهواتف"
      : "blog, articles, phones, technology, news, City Phones",
    lang,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get localized title and description
  const getLocalizedTitle = (blog: any) => {
    return lang === "ar" ? blog.title_ar : blog.title_en || blog.title;
  };

  const getLocalizedDescription = (blog: any) => {
    return lang === "ar" ? blog.short_description_ar : blog.short_description_en || blog.short_description;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>
        <Internalbanner
          title={t("Blog")}
          description={t("ReadOurLatestArticles")}
        />

        {loading && <Loader />}

        {error && (
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-[90px] py-4 sm:py-6 md:py-8">
            {blogs.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-base sm:text-lg">
                  {t("NoBlogPostsAvailable")}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6 md:mt-8">
                  {blogs.map((blog) => (
                    <Link
                      key={blog.id}
                      to={`/${lang}/blog/${blog.slug}`}
                      className="bg-white rounded-xl sm:rounded-2xl shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] transition-all duration-300 flex flex-col group"
                    >
                      {/* Featured Image */}
                      <div className="w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[280px] overflow-hidden relative">
                        <img
                          src={blog.featured_image}
                          alt={getLocalizedTitle(blog)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                        {/* Date */}
                        <div className="text-[10px] sm:text-xs md:text-sm text-[#F3AC5D] font-medium mb-2 sm:mb-3">
                          {formatDate(blog.published_at)}
                        </div>

                        {/* Title */}
                        <h3 className="text-[#211C4D] font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#F3AC5D] transition-colors duration-300 leading-tight">
                          {getLocalizedTitle(blog)}
                        </h3>

                        {/* Short Description */}
                        <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-3 flex-grow leading-relaxed">
                          {getLocalizedDescription(blog)}
                        </p>

                        {/* Read More */}
                        <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                          <span className="text-[#211C4D] font-semibold text-xs sm:text-sm md:text-base group-hover:text-[#F3AC5D] transition-colors duration-300 inline-flex items-center gap-2">
                            {t("ReadMore")}
                            <span className={`transition-transform duration-300 ${lang === "ar" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}>
                              {lang === "ar" ? "←" : "→"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 bg-gradient-to-r from-[#211C4D]/10 to-[#211C4D]/5 backdrop-blur-md rounded-2xl p-6 border border-[#211C4D]/20 shadow-2xl mt-8 mb-8">
                  <div className="text-center sm:text-left"></div>
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`group flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-base transition-all duration-300 flex-1 sm:flex-none sm:min-w-[120px] ${currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#211C4D] text-white hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105"
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${lang === "ar" ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}>
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                      <span className="inline-block sm:inline">{t("Previous")}</span>
                    </button>

                    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2" dir="ltr">
                      {(() => {
                        const totalPages = pagination?.last_page || 1;
                        const pages: number[] = [];
                        if (totalPages <= 5) {
                          for (let i = 1; i <= totalPages; i++) pages.push(i);
                        } else {
                          let startPage = Math.max(1, currentPage - 2);
                          let endPage = Math.min(totalPages, currentPage + 2);
                          if (endPage - startPage < 4) {
                            if (startPage === 1) endPage = 5;
                            else if (endPage === totalPages) startPage = totalPages - 4;
                          }
                          for (let i = startPage; i <= endPage; i++) pages.push(i);
                        }
                        return pages.map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-lg transition-all duration-300 flex items-center justify-center ${currentPage === page
                              ? "bg-yellow-500 text-[#211C4D] shadow-md sm:shadow-xl shadow-yellow-500/50 scale-105 sm:scale-110"
                              : "bg-white text-[#211C4D] hover:bg-[#211C4D] hover:text-white hover:shadow-md border border-[#211C4D]/20"
                              }`}
                          >
                            {page}
                          </button>
                        ));
                      })()}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!pagination || currentPage === pagination.last_page}
                      className={`group flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-base transition-all duration-300 flex-1 sm:flex-none sm:min-w-[120px] ${!pagination || currentPage === pagination.last_page
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#211C4D] text-white hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105"
                        }`}
                    >
                      <span className="inline-block sm:inline">{t("Next")}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${lang === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}>
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

