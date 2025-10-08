interface Topbartype {
  title:string;
  points?:string;
  btn?:boolean;
}
export default function Topbar({title,points,btn}:Topbartype) {
  return (
    <div>
        <div className="w-full md:h-[45px] h-full p-5 my-5 bg-[#E5E5E5] flex items-center justify-between rounded-[8px]">
              <p className="text-[#211C4D] text-[24px] font-[500]">
              {title}
              </p>
              <p className="text-[#211C4DCC] text-[16px] font-[500]">
              {points}
              </p>
              {btn?(

                <button className="w-[129px] h-[35px] bg-[#211C4D] rounded-[8px] text-white">طباعه الفاتوره</button>
              ):("")

              }
            </div>
    </div>
  )
}
