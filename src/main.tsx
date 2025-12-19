// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import DirectionProvider from "@/components/layout/DirectionProvider";
import { useLangSync } from "@/hooks/useLangSync";

function Root() {
  useLangSync();  
  return (
    <DirectionProvider>
      <App />
    </DirectionProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Root />
  </>
);
