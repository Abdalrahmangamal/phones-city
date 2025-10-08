import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/layout/Sidebar";
import Bestseller from '@/components/home/Bestseller'
export default function Favourite() {
  return (
    <div>
      <Layout>
        <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px]">
          <Sidebar />
          <div className="md:w-[900px] px-5 md:px-0">
            <Bestseller title={"المنتجات المفضله"} btn={false}/>
          </div>
        </div>
      </Layout>
    </div>
  );
}
