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
    <div className='h-[300px] w-full bg-[#4058A61A] md:pt-[5px] pt-[40px] rounded-[16px] px-5'>
        <p className='md:text-[38px] lg:text-[50px] text-[25px] font-[700] text-[#211C4D]'>{title}</p>
        <div className='flex items-center mt-[20px] justify-between md:px-[30px]'>
            <Link to={`${coaralink}`}><img src={coara} alt="" /></Link>
            <Link to={`${moralink}`}><img src={mora} alt="" /></Link>
        </div>
    </div>
  )
}
