  import Bestseller from "@/components/home/Bestseller";
  import Layout from "@/components/layout/Layout";
  import Offerherosection from "@/components/public/Offerherosection";
  import Sliderbycategory from "@/components/public/Sliderbycategory";
  import Parttner from "@/components/public/Parttner";
  import Offerbannersingle from "@/components/public/Offerbannersingle";
  import { useLangSync } from "@/hooks/useLangSync";
  import { useCategoriesStore } from "@/store/categories/useCategoriesStore";
  import { useEffect, useState } from "react";
  import { useParams } from "react-router";
  // import { useProductsStore } from "@/store/productsStore";
  export default function Trademarks() {
    const { lang } = useLangSync();
    const [activeSubCategory, setActiveSubCategory] = useState(null);

    // const{response,fetchProducts}=useProductsStore();
    const {
      fetchCategoriesbyid,
      Categoriesbyid,
      Catesubgategory,
      fetchCatesubgategory,
    } = useCategoriesStore();
    const { id } = useParams();
    useEffect(() => {
      if (!id) return;
      fetchCategoriesbyid(id, "products");
      fetchCatesubgategory(id);
      // fetchProducts({category_id:Number(id)},lang);
    }, [id, lang]);
    console.log("caregory response", Catesubgategory);
    console.log("id", Categoriesbyid);
const filteredProducts = activeSubCategory
  ? Categoriesbyid.filter((p) => p.category?.id === activeSubCategory)
  : Categoriesbyid;

    return (
      <div>
        <Layout>
          <div className=" lg:px-[45px]  pt-20 md:pt-0 flex-grow">
            <Offerherosection
              title={"افضل اجهزه ابل "}
              description={
                "استمتع بتجربة استثنائية مع أحدث الاجهزه بأفضل الأسعار وخدمة ما بعد البيع المميزة"
              }
            />
            <div className="mx-[-4px] md:-mx-[45px]">
              {Catesubgategory.length>0 ? 
              <Sliderbycategory
                category={Catesubgategory}
                setSelectedSubCategory={setActiveSubCategory}
              />:""
              }
            </div>
            <Bestseller products={filteredProducts} />
          <Bestseller products={filteredProducts} />

            <Offerbannersingle />
       
            <div className="my-12">
              <Parttner />
            </div>
          </div>
        </Layout>
      </div>
    );
  }