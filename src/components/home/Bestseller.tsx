import ProductCard from "../public/ProductCard";
import pattern from '../../assets/images/Layer_1.png'
export default function Bestseller() {
  return (
    <div className="mt-[80px]">
      <div className="flex items-center w-full justify-between relative">
        <div className="relative">
        <p className="text-[#211C4D] font-[600] text-[40px]">الأكثر مبيعاً</p>
<img className="absolute top-[50px] right-[-40px]" src={pattern} alt="" />
        </div>
        <div className="flex items-center justify-center gap-[10px]">
          <p className="text-[#211C4D] text-[24px] font-[500]">عرض المزيد</p>
         
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.64137 16.9474C8.27446 17.3485 7.68649 17.3423 7.32811 16.9335L1.03529 9.75688C0.676903 9.34816 0.683811 8.69168 1.05072 8.29059L7.49317 1.24795C7.86008 0.846858 8.44804 0.853046 8.80643 1.26177C9.16482 1.67049 9.15791 2.32697 8.791 2.72806L3.01289 9.04447L8.6568 15.4811C9.01518 15.8898 9.00827 16.5463 8.64137 16.9474Z"
              fill="#211C4D"
            />
          </svg>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-[20px] mt-[90px] justify-between w-full">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
