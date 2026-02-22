import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/layout";
import { useBlogsStore } from "@/store/blogsStore";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";
import { usePageSEO, jsonLdGenerators } from "@/hooks/usePageSEO";

export default function SingleBlog() {
  const { t } = useTranslation();
  const { lang } = useLangSync();
  const { slug } = useParams<{ slug: string }>();
  const { singleBlog, loadingSingle, errorSingle, fetchBlogBySlug } = useBlogsStore();

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug, lang);
    }
  }, [slug, lang]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get localized content
  const getLocalizedTitle = (blog: any) => {
    return lang === "ar" ? blog.title_ar : blog.title_en || blog.title;
  };

  const getLocalizedContent = (blog: any) => {
    return lang === "ar" ? blog.content_ar : blog.content_en || blog.content;
  };

  const getLocalizedDescription = (blog: any) => {
    return lang === "ar" ? blog.short_description_ar : blog.short_description_en || blog.short_description;
  };

  // SEO: Dynamic meta tags for single blog post
  const blogJsonLd = useMemo(() => {
    if (!singleBlog) return undefined;
    return [
      jsonLdGenerators.article(singleBlog, lang),
      jsonLdGenerators.breadcrumb([
        { name: lang === "ar" ? "الرئيسية" : "Home", url: `/${lang}/` },
        { name: lang === "ar" ? "المدونة" : "Blog", url: `/${lang}/blog` },
        { name: getLocalizedTitle(singleBlog), url: `/${lang}/blog/${singleBlog.slug}` },
      ]),
    ];
  }, [singleBlog, lang]);

  usePageSEO({
    title: singleBlog ? getLocalizedTitle(singleBlog) : (lang === "ar" ? "المدونة" : "Blog"),
    description: singleBlog
      ? (lang === "ar" ? singleBlog.meta_description_ar || singleBlog.short_description_ar : singleBlog.meta_description_en || singleBlog.short_description_en || singleBlog.short_description) || ""
      : "",
    keywords: singleBlog
      ? (lang === "ar" ? singleBlog.meta_keywords_ar : singleBlog.meta_keywords_en || singleBlog.meta_keywords) || undefined
      : undefined,
    lang,
    ogType: "article",
    ogImage: singleBlog?.featured_image,
    jsonLd: blogJsonLd,
  });

  if (loadingSingle) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (errorSingle || !singleBlog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center mt-32">
          <p className="text-red-500 text-base sm:text-lg">
            {errorSingle || t("BlogPostNotFound")}
          </p>
          <Link
            to={`/${lang}/blog`}
            className="mt-4 inline-block text-[#211C4D] hover:underline text-sm sm:text-base"
          >
            {t("BackToBlog")}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-[90px] py-4 sm:py-6 md:py-8" dir={lang === "ar" ? "rtl" : "ltr"}>
        {/* Breadcrumbs */}
        <div className={`py-2 sm:py-4 mb-4 sm:mb-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
          <nav aria-label="breadcrumb" dir={lang === "ar" ? "rtl" : "ltr"}>
            <ol className="flex flex-wrap items-center gap-x-3 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-sm sm:text-base md:text-lg leading-none">
              <li className="flex-shrink-0">
                <Link
                  to={`/${lang}/blog`}
                  className="text-[#181D25] hover:text-[#211C4D] font-[500] underline underline-offset-4 sm:underline-offset-6 decoration-1 whitespace-nowrap"
                >
                  {t("Blog")}
                </Link>
              </li>
              <li className="flex-shrink-0">
                <span className="text-[#333D4C] font-[500] whitespace-nowrap text-xs sm:text-sm md:text-base line-clamp-1">
                  {getLocalizedTitle(singleBlog)}
                </span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Featured Image */}
        <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)]">
          <img
            src={singleBlog.featured_image}
            alt={getLocalizedTitle(singleBlog)}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          {/* Date */}
          <div className="text-xs sm:text-sm md:text-base text-[#F3AC5D] font-medium mb-3 sm:mb-4">
            {formatDate(singleBlog.published_at)}
          </div>

          {/* Title */}
          <h1 className="text-[#211C4D] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 leading-tight">
            {getLocalizedTitle(singleBlog)}
          </h1>

          {/* Short Description */}
          {getLocalizedDescription(singleBlog) && (
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6 mb-6 sm:mb-8">
              <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
                {getLocalizedDescription(singleBlog)}
              </p>
            </div>
          )}

          {/* Main Content */}
          <div
            className="prose prose-sm sm:prose-base md:prose-lg max-w-none mb-6 sm:mb-8 blog-content"
            dangerouslySetInnerHTML={{ __html: getLocalizedContent(singleBlog) }}
            style={{
              color: "#333",
              lineHeight: "1.8",
            }}
          />

          <style>{`
            .blog-content h1,
            .blog-content h2,
            .blog-content h3,
            .blog-content h4 {
              color: #211C4D;
              font-weight: bold;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
            }
            @media (min-width: 640px) {
              .blog-content h1,
              .blog-content h2,
              .blog-content h3,
              .blog-content h4 {
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
            }
            .blog-content p {
              margin-bottom: 1rem;
              font-size: 0.95rem;
            }
            @media (min-width: 640px) {
              .blog-content p {
                margin-bottom: 1.5rem;
                font-size: 1.1rem;
              }
            }
            .blog-content img {
              border-radius: 8px;
              margin: 1.5rem 0;
              max-width: 100%;
              height: auto;
            }
            @media (min-width: 640px) {
              .blog-content img {
                border-radius: 12px;
                margin: 2rem 0;
              }
            }
            .blog-content a {
              color: #F3AC5D;
              text-decoration: underline;
            }
            .blog-content ul,
            .blog-content ol {
              margin: 1rem 0;
              padding-${lang === "ar" ? "right" : "left"}: 1.5rem;
            }
            @media (min-width: 640px) {
              .blog-content ul,
              .blog-content ol {
                margin: 1.5rem 0;
                padding-${lang === "ar" ? "right" : "left"}: 2rem;
              }
            }
            .blog-content li {
              margin-bottom: 0.5rem;
            }
            @media (min-width: 640px) {
              .blog-content li {
                margin-bottom: 0.75rem;
              }
            }
          `}</style>

          {/* Additional Images */}
          {singleBlog.images && singleBlog.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {singleBlog.images.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${getLocalizedTitle(singleBlog)} - ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Back to Blog Button */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
            <Link
              to={`/${lang}/blog`}
              className="inline-flex items-center gap-2 sm:gap-3 text-[#211C4D] hover:text-[#F3AC5D] font-semibold text-base sm:text-lg transition-all duration-300 group"
            >
              <span className={`transform transition-transform duration-300 ${lang === "ar" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}>
                {lang === "ar" ? "←" : "→"}
              </span>
              <span>{t("BackToBlog")}</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

