import Aboutcityphones from "@/components/about/Aboutcityphones";
import AboutUsSection from "@/components/about/AboutUsSection";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";
import Internalbanner from "@/components/public/Internalbanner";

export default function about() {
  return (
    <>
<Layout/>
<div className="px-[10px] md:px-[45px]">
<Internalbanner/>
<Aboutcityphones/>
<AboutUsSection/>
</div>
<Footer/>
    </>
  )
}
