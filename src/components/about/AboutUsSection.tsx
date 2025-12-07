interface AboutUsSectionProps {
  image: string;
  about_us: string;
  lang:string
  aboutus: string;
}
export default function AboutUsSection({image,about_us,lang,aboutus}: AboutUsSectionProps) {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-20 flex md:justify-between flex-col md:flex-row gap-10 " dir={lang==="ar"?"rtl":"ltr"}>
      

      {/* Right Side - Text */}
      <div className="w-full md:w-1/2 md:max-w-[40%] text-[#211C4D] ">
        <h2 className="text-[40px] font-[700]  ">
          {aboutus}
        </h2>

    
          <div dangerouslySetInnerHTML={{ __html: about_us || "" }} />

      </div>
      {/* Left Side - Image */}
    <div className="relative w-full md:w-[509px] md:h-[529px] h-[400px] rounded-xl overflow-hidden" >
  <img
    src={image}
    alt="صورة للمكان"
    className="object-cover w-full h-full"
  />
<div className="w-full h-full top-0 right-0 absolute bg-[linear-gradient(90deg,rgba(33,28,77,0.28)_0%,rgba(33,28,77,0.2156)_30.77%,rgba(33,28,77,0.252)_50.48%,rgba(33,28,77,0)_94.71%)]
">

</div>
  {/* نصف دائرة على الجهة اليسرى */}
<div className={`absolute ${lang==="ar"?"end-0":"end-0 rotate-180"}  top-0 w-1/2 h-full flex items-center justify-start  overflow-hidden`}>
  <div className="w-full h-full bg-[#211C4D]/70 backdrop-blur-sm rounded-r-[9999px] flex items-center px-6">
    <h2 className={`text-white ${lang==="ar"?"":"rotate-180"} font-bold text-[35px] drop-shadow-lg z-10 [text-shadow:-1px_11px_2px_rgba(0,0,0,0.25)]`}>
      صوره للمكان
    </h2>
  </div>
</div>

</div>

    </section>
  );
}
