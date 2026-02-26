import internalbanerimage from "../../assets/images/internalbanerimage.jpg";
interface InternalBannerProps {
  title: string;
  description?: string;
}
import { useLangSync } from "@/hooks/useLangSync";

export default function InternalBanner({ title, description }: InternalBannerProps  ) {
    const { lang } = useLangSync();

  return (
    <div className="lg:px-[90px] px-2 pt-20 md:pt-0">

    <div className="w-full relative isolate h-[180px] md:h-[220px] rounded-[16px] flex flex-col gap-[15px] items-start justify-start  px-[20px] mt-[30px] overflow-hidden">
      <img
        src={internalbanerimage}
        className="w-full h-full absolute top-0 right-0 rounded-[16px] pointer-events-none select-none"
        alt=""
      />
      <h1 className="font-[700] mt-[40px] mx-[30px] text-[25px] md:text-[48px] text-white relative z-10">{title}</h1>
      <p className="relative z-10 font-[700] mx-[30px] text-[16px] text-white ">{description}</p>
      <div className={`absolute top-0 rounded-[16px] right-0 h-full w-full z-0 pointer-events-none ${lang==="ar"?"bg-[linear-gradient(90deg,rgba(33,28,77,0)_5.77%,rgba(33,28,77,0.600962)_56.76%,#211C4D_100%)]":"bg-[linear-gradient(270deg,rgba(33,28,77,0)_5.77%,rgba(33,28,77,0.600962)_56.76%,#211C4D_100%)]"}`}></div>
    </div>
    </div>
  );
}
