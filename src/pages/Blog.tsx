import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Internalbanner from "@/components/public/Internalbanner";
import { useBlogsStore } from "@/store/blogsStore";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";

export default function Blog() {
  const { t } = useTranslation();
  const { lang } = useLangSync();
  const { blogs, loading, error, pagination, fetchBlogs } = useBlogsStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBlogs(lang, currentPage);
  }, [lang, currentPage]);

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
                {pagination && pagination.last_page > 1 && (
                  <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-6 sm:mt-8 mb-6 sm:mb-8 px-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-[#211C4D] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2458] transition-colors"
                    >
                      {t("Previous")}
                    </button>

                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg ${
                          currentPage === page
                            ? "bg-[#F3AC5D] text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        } transition-colors`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pagination.last_page}
                      className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-[#211C4D] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2458] transition-colors"
                    >
                      {t("Next")}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

