import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import Bestseller from "@/components/home/Bestseller";
import { useTranslation } from "react-i18next";


import {useFavoritesStore} from '@/store/favoritesStore';
import { useEffect } from "react";
export default function Favourite() {
  const { fetchFavorites, favorites } = useFavoritesStore();
  useEffect(() => {
    fetchFavorites();
  }, []);
console.log("fav",favorites.product)
      const { t } = useTranslation();


  return (
    <div>
      <Layout>
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[1100px]  md:px-0">
            <Bestseller
              title={t("Favoriteproducts")}
              btn={false}
              style="lg:!grid-cols-3 lg:!gap-[80px]"
              products={favorites.map(f => f.product)}
                  imagecard="!h-[100px] !w-[100px]"
            containerstyle="!p-2 pb-3 !px-0 !rounded-[10px] !min-h-fit"
                         />
          </div>
        </div>
      </Layout>
    </div>
  );
}
