// App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useSettings } from "@/store/settings";
import { useMaintenanceStore } from "@/store/maintenanceStore";
import i18n from "@/i18n";
import Home from "@/pages/Home";
import About from "@/pages/about";
import Servces from "@/pages/Servces";
import Contact from "@/pages/Contact";
import SpecialOffersPage from "./pages/products/SpecialOffersPage"; // الصفحة الفعلية لقائمة العروض
import MaintenancePage from "./pages/MaintenancePage";
import Loader from "./components/Loader";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductDetails from "./pages/ProductDetails";
import ReturnPolicy from "./pages/customerCare/ReturnPolicy";
import WarrantyPolicy from "./pages/customerCare/WarrantyPolicy";
import TermsAndConditions from "./pages/customerCare/TermsAndConditions";
import AboutQuara from "./pages/customerCare/AboutQuara";
import AboutMora from "./pages/customerCare/AboutMora";
import Profile from "./pages/profile/Profile";
import Myorder from "./pages/profile/Myorder";
import Bills from "./pages/profile/Bills";
import Singlebills from "./pages/Singlebills";
import Wallet from "./pages/profile/Wallet";
import Address from "./pages/profile/Address";
import Singleaddress from "./pages/Singleaddress";
import Discounts from "./pages/profile/Discounts";
import Favourite from "./pages/profile/Favourite";
import Trademarks from "./pages/products/Trademarks";
import BestSellerPage from "./pages/BestSellerPage";
import Trademarkscategory from "./pages/Trademarkscategory";
import Singleproduct from "./pages/products/Singleproduct";
import SearchResults from "./pages/products/SearchResults";
import CategorySingle from "./pages/products/CategorySingle";
import Checkout from "./pages/checkout/Checkout";
import Protectedroutse from "./store/protectedroutse";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import Blog from "./pages/Blog";
import SingleBlog from "./pages/SingleBlog";
import Offers from "./pages/products/Offers";
import Notifications from "./pages/profile/nothification/Notifications"; // أضف هذا الاستيراد

// Language Wrapper Component
function LangWrapper() {
  const { lang } = useSettings();
  const { lang: urlLang } = useParams<{ lang: string }>();

  // إعادة توجيه إذا اللغة في الـ URL غير صحيحة
  if (urlLang !== "ar" && urlLang !== "en") {
    return <Navigate to={`/${lang}/`} replace />;
  }

  // Sync Global State with URL
  useEffect(() => {
    if (urlLang && (urlLang === "ar" || urlLang === "en") && i18n.language !== urlLang) {
      i18n.changeLanguage(urlLang);
    }
  }, [urlLang]);

  return (
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
        <Route path="notifications" element={<Notifications />} /> {/* أضف هذا المسار المحمي */}
      </Route>

      <Route path="myorder" element={<Myorder />} />
      <Route path="bills" element={<Bills />} />
      <Route path="singlebills" element={<Navigate to={`../bills`} replace />} />
      <Route path="singlebills/:id" element={<Singlebills />} />
      <Route path="address" element={<Address />} />
      <Route path="singleaddress" element={<Singleaddress />} />
      <Route path="discounts" element={<Discounts />} />
      <Route path="favourite" element={<Favourite />} />
      <Route path="trademarks/:id" element={<Trademarks />} />
      <Route path="BestSellerPage" element={<BestSellerPage />} />
      <Route path="trademarkscategory" element={<Trademarkscategory />} />
      <Route path="singleproduct/:id" element={<Singleproduct />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="categorySingle/:id/:productmain?" element={<CategorySingle />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog/:slug" element={<SingleBlog />} />
    </Routes>
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
          <Route path="/return-policy" element={<Navigate to={`/${lang}/return-policy`} replace />} />
          <Route path="/warranty-policy" element={<Navigate to={`/${lang}/warranty-policy`} replace />} />
          <Route path="/terms-and-conditions" element={<Navigate to={`/${lang}/terms-and-conditions`} replace />} />
          <Route path="/about-quara" element={<Navigate to={`/${lang}/about-quara`} replace />} />
          <Route path="/about-mora" element={<Navigate to={`/${lang}/about-mora`} replace />} />
          <Route path="/profile" element={<Navigate to={`/${lang}/profile`} replace />} />
          <Route path="/blog" element={<Navigate to={`/${lang}/blog`} replace />} />
          <Route path="/blog/:slug" element={<Navigate to={`/${lang}/blog/:slug`} replace />} />
          <Route path="/notifications" element={<Navigate to={`/${lang}/notifications`} replace />} /> {/* أضف هذا السطر */}

          {/* جميع الروتات التي تدعم اللغة */}
          <Route path="/:lang/*" element={<LangWrapper />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}