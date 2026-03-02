// App.tsx
import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { useSettings } from "@/store/settings";
import { useMaintenanceStore } from "@/store/maintenanceStore";
import i18n from "@/i18n";
import Loader from "./components/Loader";

// Home is eagerly loaded (main entry point)
import Home from "@/pages/Home";

// Lazy-loaded pages (loaded on demand)
const About = lazy(() => import("@/pages/about"));
const Servces = lazy(() => import("@/pages/Servces"));
const Contact = lazy(() => import("@/pages/Contact"));
const SpecialOffersPage = lazy(() => import("./pages/products/SpecialOffersPage"));
const MaintenancePage = lazy(() => import("./pages/MaintenancePage"));

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const ReturnPolicy = lazy(() => import("./pages/customerCare/ReturnPolicy"));
const WarrantyPolicy = lazy(() => import("./pages/customerCare/WarrantyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/customerCare/TermsAndConditions"));
const AboutQuara = lazy(() => import("./pages/customerCare/AboutQuara"));
const AboutMora = lazy(() => import("./pages/customerCare/AboutMora"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Myorder = lazy(() => import("./pages/profile/Myorder"));
const Bills = lazy(() => import("./pages/profile/Bills"));
const Singlebills = lazy(() => import("./pages/Singlebills"));
const Wallet = lazy(() => import("./pages/profile/Wallet"));
const Address = lazy(() => import("./pages/profile/Address"));
const Singleaddress = lazy(() => import("./pages/Singleaddress"));
const Discounts = lazy(() => import("./pages/profile/Discounts"));
const Favourite = lazy(() => import("./pages/profile/Favourite"));
const Trademarks = lazy(() => import("./pages/products/Trademarks"));
const BestSellerPage = lazy(() => import("./pages/BestSellerPage"));
const Trademarkscategory = lazy(() => import("./pages/Trademarkscategory"));
const Singleproduct = lazy(() => import("./pages/products/Singleproduct"));
const SearchResults = lazy(() => import("./pages/products/SearchResults"));
const CategorySingle = lazy(() => import("./pages/products/CategorySingle"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const Blog = lazy(() => import("./pages/Blog"));
const SingleBlog = lazy(() => import("./pages/SingleBlog"));
const Offers = lazy(() => import("./pages/products/Offers"));
const Notifications = lazy(() => import("./pages/profile/nothification/Notifications"));

import Protectedroutse from "./store/protectedroutse";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";

function CategorySingleRoute() {
  const { lang, id, productmain } = useParams<{ lang: string; id: string; productmain?: string }>();

  return (
    <CategorySingle key={`${lang || ""}:${id || ""}:${productmain || ""}`} />
  );
}

function TrademarksRoute() {
  const { lang, id } = useParams<{ lang: string; id: string }>();

  return <Trademarks key={`${lang || ""}:${id || ""}`} />;
}

function RedirectToLangCheckout() {
  const { lang } = useSettings();
  const location = useLocation();
  const suffix = location.pathname.replace(/^\/(checkout|payments|payment)/i, "");

  return (
    <Navigate to={`/${lang}/checkout${suffix}${location.search}${location.hash}`} replace />
  );
}

// Language Wrapper Component
function LangWrapper() {
  const { lang, setLang } = useSettings();
  const { lang: urlLang } = useParams<{ lang: string }>();

  // إعادة توجيه إذا اللغة في الـ URL غير صحيحة
  if (urlLang !== "ar" && urlLang !== "en") {
    return <Navigate to={`/${lang}/`} replace />;
  }

  // Sync Global State with URL
  useEffect(() => {
    if (!urlLang || (urlLang !== "ar" && urlLang !== "en")) {
      return;
    }

    if (lang !== urlLang) {
      setLang(urlLang);
    }

    const currentI18nLang = i18n.language?.toLowerCase().startsWith("en") ? "en" : "ar";
    if (currentI18nLang !== urlLang) {
      i18n.changeLanguage(urlLang);
    }
  }, [lang, setLang, urlLang]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="servces" element={<Servces />} />
        <Route path="contact" element={<Contact />} />

        {/* صفحة قائمة جميع العروض */}
        <Route path="offers" element={<Offers />} />

        <Route path="SpecialOffersPage" element={<SpecialOffersPage />} />

        {/* صفحة تفاصيل عرض فردي - الجديدة */}
        {/* <Route path="offer/:slugOrId" element={<OfferDetails />} /> */}

        <Route path="search" element={<SearchResults />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="product-details" element={<ProductDetails />} />
        <Route path="return-policy" element={<ReturnPolicy />} />
        <Route path="warranty-policy" element={<WarrantyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="about-quara" element={<AboutQuara />} />
        <Route path="about-mora" element={<AboutMora />} />

        {/* Protected Routes */}
        <Route element={<Protectedroutse />}>
          <Route path="profile" element={<Profile />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        <Route path="myorder" element={<Myorder />} />
        <Route path="bills" element={<Bills />} />
        <Route path="singlebills" element={<Navigate to={`../bills`} replace />} />
        <Route path="singlebills/:id" element={<Singlebills />} />
        <Route path="address" element={<Address />} />
        <Route path="singleaddress" element={<Singleaddress />} />
        <Route path="discounts" element={<Discounts />} />
        <Route path="favourite" element={<Favourite />} />
        <Route path="trademarks/:id" element={<TrademarksRoute />} />
        <Route path="BestSellerPage" element={<BestSellerPage />} />
        <Route path="trademarkscategory" element={<Trademarkscategory />} />
        <Route path="singleproduct/:id" element={<Singleproduct />} />
        <Route path="checkout/*" element={<Checkout />} />
        <Route path="payment/*" element={<Checkout />} />
        <Route path="payments/*" element={<Checkout />} />
        <Route path="categorySingle/:id/:productmain?" element={<CategorySingleRoute />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<SingleBlog />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  const { lang } = useSettings();
  const { isMaintenanceMode, loading, checkMaintenanceStatus } = useMaintenanceStore();

  // Check maintenance status on app mount
  useEffect(() => {
    checkMaintenanceStatus();
  }, [checkMaintenanceStatus]);

  // Show loader while checking maintenance status
  if (loading) {
    return <Loader />;
  }

  // Show maintenance page if maintenance mode is active
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <BrowserRouter>
        <ScrollToTop />

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={lang === "ar"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          {/* Redirects للصفحات بدون لغة → مع لغة */}
          <Route path="/" element={<Navigate to={`/${lang}`} replace />} />
          <Route path="/about" element={<Navigate to={`/${lang}/about`} replace />} />
          <Route path="/servces" element={<Navigate to={`/${lang}/servces`} replace />} />
          <Route path="/contact" element={<Navigate to={`/${lang}/contact`} replace />} />
          <Route path="/offers" element={<Navigate to={`/${lang}/offers`} replace />} />
          <Route path="/SpecialOffersPage" element={<Navigate to={`/${lang}/SpecialOffersPage`} replace />} />
          <Route path="/offer/:slugOrId" element={<Navigate to={`/${lang}/offer/:slugOrId`} replace />} />
          <Route path="/login" element={<Navigate to={`/${lang}/login`} replace />} />
          <Route path="/register" element={<Navigate to={`/${lang}/register`} replace />} />
          <Route path="/product-details" element={<Navigate to={`/${lang}/product-details`} replace />} />
          <Route path="/singleaddress" element={<Navigate to={`/${lang}/singleaddress`} replace />} />
          <Route path="/address" element={<Navigate to={`/${lang}/address`} replace />} />
          <Route path="/return-policy" element={<Navigate to={`/${lang}/return-policy`} replace />} />
          <Route path="/warranty-policy" element={<Navigate to={`/${lang}/warranty-policy`} replace />} />
          <Route path="/terms-and-conditions" element={<Navigate to={`/${lang}/terms-and-conditions`} replace />} />
          <Route path="/about-quara" element={<Navigate to={`/${lang}/about-quara`} replace />} />
          <Route path="/about-mora" element={<Navigate to={`/${lang}/about-mora`} replace />} />
          <Route path="/profile" element={<Navigate to={`/${lang}/profile`} replace />} />
          <Route path="/blog" element={<Navigate to={`/${lang}/blog`} replace />} />
          <Route path="/blog/:slug" element={<Navigate to={`/${lang}/blog/:slug`} replace />} />
          <Route path="/notifications" element={<Navigate to={`/${lang}/notifications`} replace />} /> {/* أضف هذا السطر */}
          <Route path="/checkout/*" element={<RedirectToLangCheckout />} />
          <Route path="/payment/*" element={<RedirectToLangCheckout />} />
          <Route path="/payments/*" element={<RedirectToLangCheckout />} />

          {/* جميع الروتات التي تدعم اللغة */}
          <Route path="/:lang/*" element={<LangWrapper />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
