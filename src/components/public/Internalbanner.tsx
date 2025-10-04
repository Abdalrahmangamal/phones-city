import internalbanerimage from "../../assets/images/internalbanerimage.jpg";
export default function internalbanner() {
  return (
    <div className="w-full relative h-[220px] rounded-[16px] flex flex-col gap-[15px] items-start justify-start  px-[20px] mt-[30px]">
      <img
        src={internalbanerimage}
        className="w-full h-full absolute top-0 right-0 rounded-[16px] "
        alt=""
      />
      <h1 className="font-[700] mt-[25px] text-[48px] text-white relative z-2">عن مدينه الهواتف</h1>
      <p className="z-2 relative font-[700] text-[16px] text-white ">تعرف علينا</p>
      <div className="absolute top-0 rounded-[16px] right-0 h-full w-full z-1 bg-[linear-gradient(90deg,rgba(33,28,77,0)_5.77%,rgba(33,28,77,0.600962)_56.76%,#211C4D_100%)]"></div>
    </div>
  );
}
