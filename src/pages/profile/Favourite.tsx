import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import Bestseller from "@/components/home/Bestseller";
import { useTranslation } from "react-i18next";
import { useFavoritesStore } from '@/store/favoritesStore';
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function Favourite() {
  const { fetchFavorites, favorites, clearFavorites } = useFavoritesStore();
  
  useEffect(() => {
    fetchFavorites();
  }, []);
  
  const { t } = useTranslation();

  const handleDeleteAll = () => {
    // TODO: Implement API call to delete all favorites
    clearFavorites();
  };

  return (
    <div>
      <Layout>
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[1100px] md:px-0">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-[#211C4D] font-[600] text-[24px] md:text-[40px]">
                {t("Favoriteproducts")}
              </h1>
              {favorites.length > 0 && (
              <Button
  variant="destructive"
  onClick={handleDeleteAll}
  className="
    flex items-center gap-2
    transition-all duration-200
    hover:bg-red-700
    hover:scale-[1.02]
    corser:pointer
    active:scale-[0.97]
  "
>
  <Trash2 className="w-4 h-4 transition-transform group-hover:rotate-6" />
  {t("Delete All")}
</Button>

              )}
            </div>
            <Bestseller
              title=""
              btn={false}
              style="lg:!grid-cols-3 gap-[20px] lg:!gap-[80px]"
              products={favorites.map(f => f.product)}
              imagecard=" !object-contain !w-[100px]"
              containerstyle="!p-2 pb-3 !px-0 !rounded-[10px] !min-h-fit"
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}