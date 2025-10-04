// App.tsx (مثال)
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useSettings } from "@/store/settings";
import i18n from "@/i18n";
import Home from "@/pages/Home";
import About from "@/pages/about";
import Servces from "@/pages/Servces";
// import NewHome from "@/pages/new/Home";
import React from "react";

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
          <Route path="/:lang/*" element={<LangLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}