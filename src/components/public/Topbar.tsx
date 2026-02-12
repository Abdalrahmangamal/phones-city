interface Topbartype {
  title: string;
  points?: string;
  btn?: boolean;
  onPrint?: () => void;
  onShare?: () => void;
}

export default function Topbar({ title, points, btn, onPrint, onShare }: Topbartype) {
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
          <div className="flex items-center gap-2">
            <button
              className="w-[129px] h-[35px] bg-[#211C4D] rounded-[8px] text-white text-[14px] sm:text-[16px] whitespace-nowrap"
              onClick={handlePrint}
            >
              طباعه الفاتوره
            </button>
            {onShare && (
              <button
                className="h-[35px] px-3 bg-[#211C4D] rounded-[8px] text-white text-[14px] sm:text-[16px] whitespace-nowrap flex items-center gap-1.5"
                onClick={onShare}
                title="مشاركة الفاتورة"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                مشاركة
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}