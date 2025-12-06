interface AboutcityphonesProps {
  description?: string;
  
}
export default function Aboutcityphones({ description }: AboutcityphonesProps) {
  return (
    <div className="mt-[30px] text-start lg:px-[90px] px-2 pt-20 md:pt-0" >
  
      <div dangerouslySetInnerHTML={{ __html: description || "" }} />

    </div>
  );
}
