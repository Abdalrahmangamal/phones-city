import Layout from "@/components/layout/Layout";
import NewHeroSection from "@/components/public/HeroSection";
import image from "@/assets/images/hero.jpg";
import BannerSection from "@/components/public/BannerSection";
import banner from "@/assets/images/banner.png";
import Bestseller from "@/components/home/Bestseller";
import Parttner from "@/components/public/Parttner";
import {useCategoriesStore} from '@/store/categories/useCategoriesStore.ts';
import { useEffect } from "react";
import { useParams } from "react-router";
import Loader from '@/components/Loader'
export default function Offers() {
  let {id,productmain} = useParams();

const { Categoriesbyid ,fetchCategoriesbyid} = useCategoriesStore();
useEffect(() => {
  if (id) {
    fetchCategoriesbyid(id,productmain);
  }
}, [id]);

  console.log("asdasd",Categoriesbyid)

  return (
    <Layout>
        {
        !Categoriesbyid ? <Loader /> : null
      }
      <div>
        <div>
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
          {/* <Bestseller title={"عروض مدينة الهواتف"}  /> */}
{Categoriesbyid && (
  <Bestseller title="" products={Categoriesbyid} />
)}
          <div className="mb-15">
            <Parttner />
          </div>
        </div>
      </div>
    </Layout>
  );
}
