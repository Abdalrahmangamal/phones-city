/**
 * SEO Helper Hook - Manages document title, meta tags, canonical URLs, 
 * Open Graph, Twitter Cards, and JSON-LD structured data.
 * 
 * This hook does NOT affect any UI, logic, or functionality.
 * It only modifies the <head> section of the HTML document.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME_AR = "مدينة الهواتف";
const SITE_NAME_EN = "City Phones";
const SITE_URL = "https://cityphonesa.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    lang?: string;
    ogImage?: string;
    ogType?: "website" | "article" | "product";
    noIndex?: boolean;
    jsonLd?: Record<string, any> | Record<string, any>[];
}

export function usePageSEO({
    title,
    description,
    keywords,
    lang = "ar",
    ogImage,
    ogType = "website",
    noIndex = false,
    jsonLd,
}: SEOProps) {
    const location = useLocation();
    const siteName = lang === "ar" ? SITE_NAME_AR : SITE_NAME_EN;
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const canonicalUrl = `${SITE_URL}${location.pathname}`;
    const alternateLang = lang === "ar" ? "en" : "ar";
    const alternateUrl = `${SITE_URL}${location.pathname.replace(`/${lang}`, `/${alternateLang}`)}`;

    useEffect(() => {
        // --- Document Title ---
        document.title = fullTitle;

        // --- HTML lang & dir ---
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

        // --- Helper: set or create meta tag ---
        const setMeta = (attr: string, attrValue: string, content: string) => {
            let el = document.querySelector(`meta[${attr}="${attrValue}"]`) as HTMLMetaElement | null;
            if (!el) {
                el = document.createElement("meta");
                el.setAttribute(attr, attrValue);
                document.head.appendChild(el);
            }
            el.setAttribute("content", content);
        };

        // --- Helper: set or create link tag ---
        const setLink = (rel: string, href: string, extraAttrs?: Record<string, string>) => {
            const selector = extraAttrs
                ? `link[rel="${rel}"]${Object.entries(extraAttrs).map(([k, v]) => `[${k}="${v}"]`).join("")}`
                : `link[rel="${rel}"]`;
            let el = document.querySelector(selector) as HTMLLinkElement | null;
            if (!el) {
                el = document.createElement("link");
                el.setAttribute("rel", rel);
                if (extraAttrs) {
                    Object.entries(extraAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
                }
                document.head.appendChild(el);
            }
            el.setAttribute("href", href);
        };

        // --- Meta Description ---
        if (description) {
            setMeta("name", "description", description);
        }

        // --- Meta Keywords ---
        if (keywords) {
            setMeta("name", "keywords", keywords);
        }

        // --- Robots ---
        if (noIndex) {
            setMeta("name", "robots", "noindex, nofollow");
        } else {
            setMeta("name", "robots", "index, follow");
        }

        // --- Canonical URL ---
        setLink("canonical", canonicalUrl);

        // --- Hreflang alternate ---
        setLink("alternate", alternateUrl, { hreflang: alternateLang });
        setLink("alternate", canonicalUrl, { hreflang: lang });

        // --- Open Graph ---
        setMeta("property", "og:title", fullTitle);
        setMeta("property", "og:site_name", siteName);
        setMeta("property", "og:url", canonicalUrl);
        setMeta("property", "og:type", ogType);
        setMeta("property", "og:locale", lang === "ar" ? "ar_SA" : "en_US");
        setMeta("property", "og:locale:alternate", lang === "ar" ? "en_US" : "ar_SA");
        if (description) {
            setMeta("property", "og:description", description);
        }
        setMeta("property", "og:image", ogImage || DEFAULT_OG_IMAGE);

        // --- Twitter Card ---
        setMeta("name", "twitter:card", "summary_large_image");
        setMeta("name", "twitter:title", fullTitle);
        if (description) {
            setMeta("name", "twitter:description", description);
        }
        setMeta("name", "twitter:image", ogImage || DEFAULT_OG_IMAGE);

        // --- JSON-LD Structured Data ---
        // Remove previous JSON-LD injected by this hook
        document.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());

        if (jsonLd) {
            const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
            items.forEach((item) => {
                const script = document.createElement("script");
                script.type = "application/ld+json";
                script.setAttribute("data-seo-jsonld", "true");
                script.textContent = JSON.stringify(item);
                document.head.appendChild(script);
            });
        }

        // Cleanup: remove JSON-LD on unmount
        return () => {
            document.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
        };
    }, [fullTitle, description, keywords, lang, canonicalUrl, alternateUrl, ogImage, ogType, noIndex, jsonLd]);
}

/**
 * Pre-built JSON-LD generators for common types
 */
export const jsonLdGenerators = {
    organization: (lang: string) => ({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: lang === "ar" ? "مدينة الهواتف" : "City Phones",
        url: SITE_URL,
        logo: `${SITE_URL}/src/assets/images/logo.png`,
        description: lang === "ar"
            ? "متجر مدينة الهواتف - أفضل العروض على الهواتف والأجهزة الإلكترونية في السعودية"
            : "City Phones Store - Best deals on phones and electronics in Saudi Arabia",
        address: {
            "@type": "PostalAddress",
            addressCountry: "SA",
        },
        sameAs: [
            "https://www.tiktok.com/@madinatalhawatif",
            "https://www.snapchat.com/add/madinat6100",
            "https://x.com/AlhwatfMdy43074",
            "https://www.instagram.com/cityphone.sa",
            "https://www.facebook.com/share/14PAhVuoWz7/",
        ],
    }),

    website: (lang: string) => ({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: lang === "ar" ? "مدينة الهواتف" : "City Phones",
        url: SITE_URL,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/${lang}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    }),

    product: (product: any, lang: string) => ({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.main_image || product.images?.[0],
        description: product.description || product.short_description || product.name,
        brand: {
            "@type": "Brand",
            name: product.brand?.name || (lang === "ar" ? "مدينة الهواتف" : "City Phones"),
        },
        offers: {
            "@type": "Offer",
            priceCurrency: "SAR",
            price: product.final_price,
            availability: product.stock_status === "out_of_stock"
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
            url: `${SITE_URL}/${lang}/singleproduct/${product.slug || product.id}`,
        },
        ...(product.reviews_count > 0 && {
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.average_rating || 4.5,
                reviewCount: product.reviews_count,
            },
        }),
    }),

    breadcrumb: (items: { name: string; url: string }[]) => ({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.url}`,
        })),
    }),

    article: (blog: any, lang: string) => ({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: lang === "ar" ? blog.title_ar : blog.title_en || blog.title,
        image: blog.featured_image,
        datePublished: blog.published_at,
        dateModified: blog.updated_at || blog.published_at,
        author: {
            "@type": "Person",
            name: blog.author_name || blog.author?.name || (lang === "ar" ? "مدينة الهواتف" : "City Phones"),
        },
        publisher: {
            "@type": "Organization",
            name: lang === "ar" ? "مدينة الهواتف" : "City Phones",
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/src/assets/images/logo.png`,
            },
        },
        description: lang === "ar"
            ? blog.short_description_ar || blog.meta_description_ar || ""
            : blog.short_description_en || blog.meta_description_en || "",
    }),
};
