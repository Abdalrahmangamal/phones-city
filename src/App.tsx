// App.tsx (مثال)
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useSettings } from "@/store/settings";
import i18n from "@/i18n";
import Home from "@/pages/Home";
import About from "@/pages/about";
import Servces from "@/pages/Servces";
import Contact from "@/pages/Contact";
// import NewHome from "@/pages/new/Home";
import React from "react";
import Offers from "./pages/Offers";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import ReturnPolicy from "./pages/ReturnPolicy";
import WarrantyPolicy from "./pages/WarrantyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

function LangLayout() {
  const { lang: urlLang } = useParams();
  const { lang, setLang } = useSettings();

  // لو البراميتر مش صالح رجّع لِغة الستيت
  if (urlLang !== "ar" && urlLang !== "en") {
    return <Navigate to={`/${lang}/`} replace />;
  }

  // 👈 التزامن هنا داخل useEffect، مش أثناء render
  React.useEffect(() => {
    if (urlLang && urlLang !== lang) {
      setLang(urlLang as "ar" | "en");
      i18n.changeLanguage(urlLang);
    }
  }, [urlLang, lang, setLang]);

  return (
    <Routes>
      {/* <Route path="" element={<NewHome />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About/>} />
      <Route path="/servces" element={<Servces/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/offers" element={<Offers/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/product-details" element={<ProductDetails/>} />
      <Route path="/return-policy" element={<ReturnPolicy/>} />
      <Route path="/warranty-policy" element={<WarrantyPolicy/>} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
    </Routes>
  );
}

export default function App() {
  const { lang } = useSettings();
  return (
    <div className="flex flex-col min-h-screen"> {/* Added flex-col and min-h-screen to ensure footer stays at bottom */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={`/${lang}`} replace />} />
              <Route path="/about" element={<Navigate to={`/${lang}/about`} replace />} />
              <Route path="/servces" element={<Navigate to={`/${lang}/servces`} replace />} />
              <Route path="/contact" element={<Navigate to={`/${lang}/contact`} replace />} />
              <Route path="/offers" element={<Navigate to={`/${lang}/offers`} replace />} />
              <Route path="/login" element={<Navigate to={`/${lang}/login`} replace />} />
              <Route path="/product-details" element={<Navigate to={`/${lang}/product-details`} replace />} />
              <Route path="/return-policy" element={<Navigate to={`/${lang}/return-policy`} replace />} />
              <Route path="/warranty-policy" element={<Navigate to={`/${lang}/warranty-policy`} replace />} />
              <Route path="/terms-and-conditions" element={<Navigate to={`/${lang}/terms-and-conditions`} replace />} />
          <Route path="/:lang/*" element={<LangLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}