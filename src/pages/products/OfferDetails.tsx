import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLangSync } from "@/hooks/useLangSync";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";
import Bestseller from "@/components/home/Bestseller";
import Layout from "@/components/layout/layout";

export default function OfferDetails() {
  const { t } = useTranslation();
  const { lang } = useLangSync();
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const [offer, setOffer] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOfferData = async () => {
      if (!slugOrId) return;

      try {
        // جلب تفاصيل العرض
        const offerResponse = await fetch(`/api/v1/offers/${slugOrId}`);
        const offerJson = await offerResponse.json();

        if (offerJson.status && offerJson.data?.data?.length > 0) {
          setOffer(offerJson.data.data[0]);
        } else {
          setError(true);
        }

        // جلب المنتجات المرتبطة بالعرض (افتراضيًا API موجود أو سيتم إضافته)
        // لو مفيش API منفصل، ممكن تستخدم نفس API العروض العامة وتفلتر هنا
        try {
          const productsResponse = await fetch(`/api/v1/offers/${slugOrId}/products?lang=${lang}`);
          const productsJson = await productsResponse.json();
          setProducts(productsJson.data || []);
        } catch (prodErr) {
          console.warn("Products endpoint not available, skipping...");
          // fallback: استخدم منتجات العروض العامة إذا لزم الأمر
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferData();
  }, [slugOrId, lang]);

  if (loading) return <Layout><Loader /></Layout>;

  if (error || !offer) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("OfferNotFound")}</h2>
          <Link
            to={`/${lang}/offers`}
            className="inline-block px-8 py-4 bg-[#F3AC5D] text-white rounded-lg hover:bg-[#e79940]"
          >
            {t("BackToAllOffers")}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <div className={`text-center md:text-${lang === "ar" ? "right" : "left"} mb-10`}>
          <h1 className="text-4xl md:text-5xl font-bold text-[#211C4D] mb-6">
            {lang === "ar" ? offer.name_ar : offer.name_en || offer.name_ar}
          </h1>

          {offer.image && (
            <img
              src={`/storage/${offer.image}`}
              alt={offer.name_ar}
              className="mx-auto max-w-full h-auto rounded-2xl shadow-2xl mb-8 max-h-[500px] object-contain"
            />
          )}

          <div className="inline-block bg-orange-100 px-8 py-6 rounded-2xl text-3xl font-bold text-[#211C4D]">
            {t("Discount")}:{" "}
            {offer.type === "percentage"
              ? `${offer.value}%`
              : `${offer.value} ${t("SAR")}`}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[#211C4D] my-10 text-center">
          {t("ProductsOnThisOffer")}
        </h2>

        {products.length > 0 ? (
          <Bestseller
            products={products}
            title=""
            btn={false}
            style="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          />
        ) : (
          <div className="text-center py-10 text-gray-600 text-xl">
            {t("NoProductsYet")}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to={`/${lang}/offers`}
            className="inline-block px-10 py-4 bg-[#F3AC5D] text-white text-lg font-semibold rounded-lg hover:bg-[#e79940] transition-all"
          >
            {t("BackToAllOffers")}
          </Link>
        </div>
      </div>
    </Layout>
  );
}