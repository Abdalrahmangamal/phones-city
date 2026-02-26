import { lazy, Suspense, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useSettings } from "@/store/settings";
// import { useLoaderStore } from "@/store/loaderstore";
// import Loader from "@/components/public/Loader";

const ChatBot = lazy(() => import("./Chatbot"));

export default function Layout({ children }: { children: React.ReactNode }) {
  const { lang } = useSettings();
  const [shouldMountChatbot, setShouldMountChatbot] = useState(false);
  const isEn = lang === "en";
  // const { isLoading, setLoading } = useLoaderStore();

  // useEffect(() => {
  //   const handleLoad = () => setLoading(false);

  //   if (document.readyState === "complete") {
  //     setLoading(false);
  //   } else {
  //     window.addEventListener("load", handleLoad);
  //   }

  //   return () => {
  //     window.removeEventListener("load", handleLoad);
  //   };
  // }, [setLoading]);

  return (
    <div>
      {/* {isLoading ? (
        <Loader />
      ) : (
        <>
        </>
      )} */}
      <Header />
      <main className="pt-[70px] md:pt-[170px]">{children}</main>
      <Footer />
      {!shouldMountChatbot && (
        <button
          type="button"
          onClick={() => setShouldMountChatbot(true)}
          aria-label={isEn ? "Open chat assistant" : "فتح المساعد الذكي"}
          className={`fixed z-[500] bottom-4 md:bottom-6 ${isEn ? "right-4 md:right-6" : "left-4 md:left-6"} flex items-center gap-2 rounded-full bg-[#2F2C79] px-4 py-3 text-white shadow-[0_12px_32px_rgba(47,44,121,0.35)] transition-transform hover:scale-105 active:scale-95`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5m8-2a8 8 0 10-15.5 2.5L4 20l5.8-1.5A8 8 0 0021 12z" />
          </svg>
          <span className="text-sm font-medium">
            {isEn ? "Chat" : "محادثة"}
          </span>
        </button>
      )}
      {shouldMountChatbot && (
        <Suspense fallback={null}>
          <ChatBot initialOpen />
        </Suspense>
      )}
    </div>
  );
}
