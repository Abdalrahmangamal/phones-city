import Layout from '@/components/layout/layout'
import HeroSection from '@/components/custom/HeroSection'
import SearchSection from '../components/custom/SearchSection'
import CategoriesSection from '../components/custom/CategoriesSection'
import TrendingProductsSection from '../components/custom/TrendingProductsSection'

const Home = () => {
  return (
    <div dir="rtl">
       <Layout/>
       <div className="px-4">
         <div className="mt-6">
           <HeroSection />
         </div>
         <div className="mt-6">
           <SearchSection />
         </div>
       </div>
       <div className="mt-6">
         <CategoriesSection />
       </div>
       <div className="mt-6">
         <TrendingProductsSection />
       </div>
    </div>
  );
};

export default Home;