import { Link } from 'react-router-dom'
import coara from '../../assets/images/coara.png'
import mora from '../../assets/images/mora.png'
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";

interface installmenttype {
  title?: string;
}

export default function InstallmentSection({ title }: installmenttype) {
  const { t } = useTranslation();
  const { lang } = useLangSync();

  return (
    <div className='xl:px-[90px] px-2 pt-0 md:pt-0'>

      <div className='md:h-[300px] h-[150px] w-full bg-gradient-to-br from-[#211a44] to-[#2a2355] md:pt-[5px] pt-[10px] rounded-[16px] px-5 border-2 border-[#F3AC5D] relative overflow-hidden shadow-lg'>
        {/* Orange accent glow line at top */}
        <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F3AC5D] to-transparent'></div>
        <p className={`mt-3 text-[11px] font-[500] text-white relative z-10 ${lang === 'en' ? 'md:text-[24px] lg:text-[28px]' : 'md:text-[38px] lg:text-[42px]'}`}>{title || t('ExclusiveSpecialOffers')}</p>
        <div className='flex items-center mt-[20px] justify-between md:px-[30px] relative z-10'>
          <Link to="/about-quara"><img className='w-[120px] md:w-full' src={coara} alt="" /></Link>
          <Link to="/about-mora"><img src={mora} className='w-[120px] md:w-full' alt="" /></Link>
        </div>
      </div>
    </div>
  )
}