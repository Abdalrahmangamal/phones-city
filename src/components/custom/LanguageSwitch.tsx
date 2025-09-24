// src/components/custom/LanguageSwitch.tsx
import i18n from "@/i18n";
import { useSettings } from "@/store/settings";
import { Button } from "@/components/ui/button"; // أو زر عادي لو مش مركّب shadcn

export default function LanguageSwitch() {
  const { lang, setLang } = useSettings();
  const toggle = () => {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);            // يظبط dir/lang في الـ <html> لو عاملها في DirectionProvider أو useEffect
    i18n.changeLanguage(next); // يظبط ترجمة i18n
  };

  return (
    <Button variant="outline" onClick={toggle}>
      {lang === "ar" ? "English" : "العربية"}
    </Button>
  );
}
