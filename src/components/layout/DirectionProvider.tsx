// src/components/layout/DirectionProvider.tsx
import { useEffect } from "react";
import { useSettings } from "@/store/settings";

export default function DirectionProvider({ children }: { children: React.ReactNode }) {
  const { dir, lang } = useSettings();
  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [dir, lang]);

  return <>{children}</>;
}
