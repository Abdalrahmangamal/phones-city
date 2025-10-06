// App.tsx (مثال)
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useSettings } from "@/store/settings";
import i18n from "@/i18n";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Servces from "@/pages/Servces";
import Contact from "@/pages/Contact";
// import NewHome from "@/pages/new/Home";
import React from "react";
import Offers from "./pages/Offers";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Myorder from "./pages/Myorder";
import Bills from "./pages/Bills";
import Wallet from "./pages/Wallet";

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
      <Route path="/profile" element={<Profile/>} />
      <Route path="/myorder" element={<Myorder/>} />
      <Route path="/bills" element={<Bills/>} />
      <Route path="/wallet" element={<Wallet/>} />
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
              <Route path="/profile" element={<Navigate to={`/${lang}/profile`} replace />} />
              <Route path="/myorder" element={<Navigate to={`/${lang}/myorder`} replace />} />
              <Route path="/bills" element={<Navigate to={`/${lang}/bills`} replace />} />
              <Route path="/wallet" element={<Navigate to={`/${lang}/wallet`} replace />} />
          <Route path="/:lang/*" element={<LangLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}