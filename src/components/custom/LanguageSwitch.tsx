// src/components/custom/LanguageSwitch.tsx
import i18n from "@/i18n";
import { useSettings } from "@/store/settings";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSwitch() {
  const { lang, setLang } = useSettings();

  const changeLanguage = (newLang: "ar" | "en") => {
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1 text-sm font-normal text-white hover:bg-white/10 hover:text-white">
          <Globe className="h-4 w-4" />
          <span>{lang === "ar" ? "العربية" : "English"}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24">
        <DropdownMenuItem onClick={() => changeLanguage("ar")}>
          العربية
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
