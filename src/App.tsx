// App.tsx
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useSettings } from "@/store/settings";
import i18n from "@/i18n";
import Home from "@/pages/Home";
import About from "@/pages/about";
import Servces from "@/pages/Servces";
import Contact from "@/pages/Contact";
import Offers from "./pages/products/Offers";
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
import Trademarkbestoffer from "./pages/products/Trademarkbestoffer";
import Singleproduct from "./pages/products/Singleproduct";
import SearchResults from "./pages/products/SearchResults";
import CategorySingle from "./pages/products/CategorySingle";
import Checkout from "./pages/chekout/Checkout";
import Protectedroutse from "./store/protectedroutse";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";

// Language Wrapper Component
function LangWrapper() {
  const { lang } = useSettings();
  const { lang: urlLang } = useParams<{ lang: string }>();
  
  // If URL language doesn't match app language, redirect
  if (urlLang !== "ar" && urlLang !== "en") {
    return <Navigate to={`/${lang}/`} replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About/>} />
      <Route path="/servces" element={<Servces/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/offers" element={<Offers/>} />
      <Route path="/search" element={<SearchResults/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/product-details" element={<ProductDetails/>} />
      <Route path="/return-policy" element={<ReturnPolicy/>} />
      <Route path="/warranty-policy" element={<WarrantyPolicy/>} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
      <Route path="/about-quara" element={<AboutQuara/>} />
      <Route path="/about-mora" element={<AboutMora/>} />
      <Route element={<Protectedroutse/>} >
        <Route path="/profile" element={<Profile/>} />
      </Route>
      <Route path="/myorder" element={<Myorder/>} />
      <Route path="/bills" element={<Bills/>} />
      <Route path="/singlebills/:id" element={<Singlebills/>} /> {/* ✅ أضف :id هنا */}
      <Route path="/address" element={<Address/>} />
      <Route path="/singleaddress" element={<Singleaddress/>} />
      <Route path="/discounts" element={<Discounts/>} />
      <Route path="/favourite" element={<Favourite/>} />
      <Route path="/trademarks/:id" element={<Trademarks/>} />
      <Route path="/BestSellerPage" element={<BestSellerPage/>} />
      <Route path="/trademarkscategory" element={<Trademarkscategory/>} />
      <Route path="/SpecialOffersPage" element={<Trademarkbestoffer/>} />
      <Route path="/singleproduct/:id" element={<Singleproduct/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="categorySingle/:id/:productmain?" element={<CategorySingle/>} />
      <Route path="/wallet" element={<Wallet/>} />
    </Routes>
  );
}

export default function App() {
  const { lang } = useSettings();
  return (
    <div className="flex flex-col min-h-screen relative"> 
      <BrowserRouter>
        <ScrollToTop />
        
        {/* ToastContainer */}
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
          <Route path="/" element={<Navigate to={`/${lang}`} replace />} />
          <Route path="/about" element={<Navigate to={`/${lang}/about`} replace />} />
          <Route path="/servces" element={<Navigate to={`/${lang}/servces`} replace />} />
          <Route path="/contact" element={<Navigate to={`/${lang}/contact`} replace />} />
          <Route path="/offers" element={<Navigate to={`/${lang}/offers`} replace />} />
          <Route path="/login" element={<Navigate to={`/${lang}/login`} replace />} />
          <Route path="/register" element={<Navigate to={`/${lang}/register`} replace />} />
          <Route path="/product-details" element={<Navigate to={`/${lang}/product-details`} replace />} />
          <Route path="/return-policy" element={<Navigate to={`/${lang}/return-policy`} replace />} />
          <Route path="/warranty-policy" element={<Navigate to={`/${lang}/warranty-policy`} replace />} />
          <Route path="/terms-and-conditions" element={<Navigate to={`/${lang}/terms-and-conditions`} replace />} />
          <Route path="/about-quara" element={<Navigate to={`/${lang}/about-quara`} replace />} />
          <Route path="/about-mora" element={<Navigate to={`/${lang}/about-mora`} replace />} />
          <Route path="/profile" element={<Navigate to={`/${lang}/profile`} replace />} />
          <Route path="/:lang/*" element={<LangWrapper />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}