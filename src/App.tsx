// App.tsx (مثال)
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useSettings } from "@/store/settings";
import i18n from "@/i18n";
import Home from "@/pages/Home";
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
      <Route path="" element={<Home />} />
      {/* بقية الصفحات */}
    </Routes>
  );
}

export default function App() {
  const { lang } = useSettings();
  return (
    <div className=""> {/* Removed pr-4 padding since we're handling it in the Home component */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={`/${lang}`} replace />} />
          <Route path="/:lang/*" element={<LangLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}