import Layout from "@/components/layout/Layout";
import Offerherosection from "@/components/public/Offerherosection";
import Ellipse from "@/assets/images/Ellipse 3.png";
import Ellipse5 from "@/assets/images/Ellipse 5.png";
import img1 from '@/assets/images/isometric view of laptop, tablet, notebook, smartwatch.png'
import img2 from '@/assets/images/Hourglass And Stack of Coins For Installment.png'
import img3 from '@/assets/images/Group 1000005944.png'
import img4 from '@/assets/images/Engineer working with robotic arm.png'
import img5 from '@/assets/images/planet.png'
import img6 from '@/assets/images/documentation.png'
export default function Servces() {
  return (
    <Layout>
      <div>
        {/* Hero Section - Responsive for mobile */}
        <Offerherosection title={"كل ما تحتاجه في مدينه الهواتف"} description={"استمتع بتجربة استثنائية معاحسن العروض بأفضل الأسعار وخدمة ما بعد البيع المميزة"} />

        {/* Services Description Section - Separated from cards with proper spacing */}
        <div className="w-full  lg:px-[90px] px-2  md:pt-0">
          <div className="flex flex-col px-[10px]">
            <h2 className="text-[#211C4D] font-roboto font-bold text-[24px] md:text-[40px] leading-9 mb-2">
              في مدينه الهواتف
            </h2>
            <p className="text-[#211C4DCC] font-roboto font-normal text-[20px] md:text-2xl leading-10 text-right">
              نوفر لك تجربة شراء وصيانة متكاملة في مكان واحد لتلبية جميع
              احتياجاتك في عالم الهواتف و الاجهزة الذكية:
            </p>
          </div>
        </div>

        {/* Combined Services Cards Section - Responsive grid layout */}
        <div className="w-full lg:px-[90px] px-2 pt-20 md:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 - Electronics Sales */}
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
                    src={img1}
                    alt="بيع الأجهزة الاكترونية و الأجهزه الكهربائية المنزلية"
                    className="w-full h-[210px] object-contain"
                  />
                </div>
                <h3 className="text-[#211C4D] font-roboto font-medium text-2xl leading-[30px] mb-4 text-center">
                  بيع الأجهزة الاكترونية و الأجهزه الكهربائية المنزلية
                </h3>
                <p className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center">
                  ( جوالات - الحواسيب - ايبادات - تابات - الطابعات - الراوترات -
                  الانترنت ) مع جميع الملحقات وكسسواراتها
                </p>
              </div>
            </div>

            {/* Service Card 2 - Installment Service */}
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
                    src={img2}
                    alt="خدمة الشراء بالتقسيط"
                    className="w-full h-[210px] object-contain"
                  />
                </div>
                <h3 className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-4 text-center">
                  خدمة الشراء بالتقسيط
                </h3>
                <p className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center">
                  عبر منصات (تمارا - تابي - أموال - مدفوع - إمكان - مورا - كوارا
                  - MISPay) بدون دفعة اولي .
                </p>
              </div>
            </div>

            {/* Service Card 3 - Device Replacement */}
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
                    src={img3}
                    alt="استبدال الاجهزة"
                    className="w-full h-[210px] object-contain"
                  />
                </div>
                <h3 className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-4 text-center">
                  استبدال الاجهزة
                </h3>
                <p className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center">
                  ( الجديدة او المستعملة ) بجهاز اخر بكل سهولة
                </p>
              </div>
            </div>

            {/* Service Card 4 - Repair and Programming */}
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
                    src={img4}
                    alt="صيانة وبرمجة جميع الاجهزة"
                    className="w-full h-[210px] object-contain"
                  />
                </div>
                <h3 className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-4 text-center">
                  صيانة وبرمجة جميع الاجهزة
                </h3>
                <p className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center">
                  اجهزة جوالات واجهزة حواسيب والاجهزه الالكترونية وكهربائيه
                </p>
              </div>
            </div>

            {/* Service Card 5 - Telecommunications */}
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
                    src={img5}
                    alt="خدمات الاتصالات و الانترنت"
                    className="w-full h-[210px] object-contain"
                  />
                </div>
                <h3 className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-4 text-center">
                  خدمات الاتصالات و الانترنت
                </h3>
                <p className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center">
                  وتوفير باقات متنوعة تناسب الجميع
                </p>
              </div>
            </div>

            {/* Service Card 6 - Customer Service */}
            <div className="w-full mb-[80px] h-[484px] rounded-lg p-8 relative overflow-hidden bg-gradient-to-b from-[#F9F9F9] to-[#CBD7F9] shadow-[0px_8px_8px_0px_#0000000D]">
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
                    src={img6}
                    alt="نقديم خدمات عملاء مميزة"
                    className="w-full h-[210px] object-contain"
                  />
                </div>
                <h3 className="text-[#211C4D] font-roboto font-medium text-2xl leading-none mb-4 text-center">
                  نقديم خدمات عملاء مميزة
                </h3>
                <p className="text-[#211C4DCC] font-roboto font-normal text-base leading-6 text-center">
                  لزوار الفرع والمتجر إلكتروني وجود خدمة تقسيط متعدده وأصناف
                  منتجات مختلفه تميز بها المتجر
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}