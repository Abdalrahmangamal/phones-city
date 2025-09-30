import svg from "../../assets/images/svg/svg2.png";
export default function LatestOffers() {
  return (
    <div className="w-full h-[70vh] relative">
      <h1 className="text-[40px] font-[700] text-[#211C4D] text-center">
        احدث العروض
      </h1>
      <img className="absolute top-[20px] right-[37%]" src={svg} alt="" />
      <div className="grid grid-cols-8" >
<div className="gli"></div>
<div></div>
      </div>

    </div>
  );
}
