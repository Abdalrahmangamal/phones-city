import Aboutcityphones from "@/components/about/Aboutcityphones";
import AboutUsSection from "@/components/about/AboutUsSection";
import Layout from "@/components/layout/Layout";
import Internalbanner from "@/components/public/Internalbanner";
import Location from "@/components/about/Location";

export default function about() {

  return (
<Layout>
  

<div className="px-[10px] md:px-[45px]">
<Internalbanner/>
<Aboutcityphones/>
<AboutUsSection/>
<Location/>
</div>
    
</Layout>
  )
}
