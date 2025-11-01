import { Link } from 'react-router-dom'
import coara from '../../assets/images/coara.png'
import mora from '../../assets/images/mora.png'
interface installmenttype{
  title:string;
  coaralink:string;
  moralink:string;
}
export default function InstallmentSection({title,coaralink,moralink}:installmenttype) {
  return (
    <div className='xl:px-[90px] px-2 pt-0 md:pt-0'>

    <div className='md:h-[300px] h-[150px] w-ful0l  bg-[#4058A61A] md:pt-[5px] pt-[10px] rounded-[16px] px-5'>
        <p className='md:text-[38px] lg:text-[42px] mt-3 text-[11px] font-[500] text-[#211C4D]'>{title}</p>
        <div className='flex items-center mt-[20px] justify-between md:px-[30px]'>
            <Link to="/about-quara"><img className='w-[120px] md:w-full' src={coara} alt="" /></Link>
            <Link to="/about-mora"><img src={mora} className='w-[120px] md:w-full' alt="" /></Link>
        </div>
    </div>
    </div>
  )
}