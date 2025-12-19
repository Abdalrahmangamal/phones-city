interface Topbartype {
  title:string;
  points?:string;
  btn?:boolean;
  onPrint?: () => void;
}

export default function Topbar({title, points, btn, onPrint}: Topbartype) {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div>
        <div className="w-full min-h-[45px] p-4 my-5 bg-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-3 rounded-[8px]">
              <p className="text-[#211C4D] text-[20px] sm:text-[24px] font-[500]">
              {title}
              </p>
              <p className="text-[#211C4DCC] text-[14px] sm:text-[16px] font-[500]">
              {points}
              </p>
              {btn ? (
                <button 
                  className="w-[129px] h-[35px] bg-[#211C4D] rounded-[8px] text-white text-[14px] sm:text-[16px] whitespace-nowrap"
                  onClick={handlePrint}
                >
                  طباعه الفاتوره
                </button>
              ) : (
                ""
              )}
            </div>
    </div>
  )
}