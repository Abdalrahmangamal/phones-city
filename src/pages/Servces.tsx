import Layout from "@/components/layout/Layout";
import Offerherosection from "@/components/public/Offerherosection";
import Ellipse from "@/assets/images/Ellipse 3.png";
import Ellipse5 from "@/assets/images/Ellipse 5.png";
import {useServicesStore} from '@/store/servicesStore';
import { useEffect } from "react";
  import { useLangSync } from "@/hooks/useLangSync";
import Loader from "@/components/Loader";

export default function Servces() {
const { lang } = useLangSync();

  const {services,fetchServices} = useServicesStore();
  useEffect(() => {
    fetchServices(lang);
  }, [services]);
  console.log("servvvv",services);
  return (
    <Layout>
        {
        !services ? <Loader /> : null
      }
      <div>
        {/* Hero Section - Responsive for mobile */}
        <Offerherosection title={"كل ما تحتاجه في مدينه الهواتف"} description={"استمتع بتجربة استثنائية معاحسن العروض بأفضل الأسعار وخدمة ما بعد البيع المميزة"} />

        {/* Services Description Section - Separated from cards with proper spacing */}
        <div className="w-full  lg:px-[90px] px-2  md:pt-0">
          <div className="flex flex-col px-[10px]">
            <h2 className="text-[#211C4D] font-roboto font-bold text-[24px] md:text-[40px] leading-9 mb-2">
              في مدينه الهواتف
            </h2>
            <p className="text-[#211C4DCC] font-roboto font-normal text-[20px] md:text-2xl leading-10 text-start">
              نوفر لك تجربة شراء وصيانة متكاملة في مكان واحد لتلبية جميع
              احتياجاتك في عالم الهواتف و الاجهزة الذكية:
            </p>
          </div>
        </div>

        {/* Combined Services Cards Section - Responsive grid layout */}

        <div className="w-full lg:px-[90px] px-2 pt-20 md:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 - Electronics Sales */}
        {services.map((service)=>(
            <div className="w-full h-[484px] rounded-lg p-8 relative overflow-hidden bg-gradient-to-b from-[#F9F9F9] to-[#CBD7F9] shadow-[0px_8px_8px_0px_#0000000D]">
              <img
                src={Ellipse}
                alt=""
                className="absolute w-[288px] h-[288px] top-[-84px] left-[-97px]"
              />
              <img
                src={Ellipse5}
                alt=""
                className="absolute w-[163px] h-[143px] top-[100px] left-[313px]"
              />
              <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-6">
                  <img
                    src={service.image}
                    alt="بيع الأجهزة الاكترونية و الأجهزه الكهربائية المنزلية"
                    className="w-full h-[210px] object-contain"
                  />
                </div>
                <h3 className="text-[#211C4D] font-roboto font-medium text-2xl leading-[30px] mb-4 text-center">
                  {service.name}
                </h3>
                <p className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center">
                  {service.description}
                </p>
              </div>
            </div>

      
))}
          </div>
        </div>
      </div>
    </Layout>
  );
}