// import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
// import { useLoaderStore } from "@/store/loaderstore";
// import Loader from "@/components/public/Loader";

export default function Layout({ children }: { children: React.ReactNode }) {
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
      <main>{children}</main>
      <Footer />
    </div>
  );
}
