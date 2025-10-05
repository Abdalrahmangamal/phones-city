import Layout from "@/components/layout/Layout";
import NewHeroSection from "@/components/public/HeroSection";
import image from "../assets/images/hero.jpg";
import BannerSection from "@/components/public/BannerSection";
import banner from "../assets/images/banner.png";
import sceondbanner from "../assets/images/sceondbanner.png";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";

export default function Offers() {
  return (
      <Layout >
    <div>

      <div className="md:px-[45px]">
        <NewHeroSection
          slides={[
            {
              title: "أحدث الهواتف الذكية",
              description:
                "استمتع بتجربة استثنائية مع أحدث الهواتف بأفضل الأسعار وخدمة ما بعد البيع المميزة",
              bg: `${image}`,
              link: "/shop",
            },
            {
              title: "عروض خاصة جدًا",
              description:
                "خصومات حصرية على جميع الماركات العالمية لفترة محدودة",
              bg: `${image}`,
              link: "/offers",
            },
          ]}
        />
        <BannerSection image={banner} />
        <Bestseller title={"عروض مدينة الهواتف"} btn={false} />
        <BannerSection image={sceondbanner} />
        <Parttner/>
      </div>

    </div>
      </Layout>
  );
}
