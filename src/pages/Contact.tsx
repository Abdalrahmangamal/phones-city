import Location from "@/components/about/Location";
import Contactform from "@/components/contact/Contactform";
import Layout from "@/components/layout/Layout";
import Internalbanner from "@/components/public/Internalbanner";

export default function contact() {
  return (
      <Layout>
    <div>

      <div className="md:px-[45px] px-[0px]">
      <Internalbanner />
      <Contactform />
      <Location />
      </div>
    </div>
      </Layout>
  );
}
