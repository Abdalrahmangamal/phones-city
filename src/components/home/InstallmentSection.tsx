import { Link } from 'react-router-dom'
import coara from '../../assets/images/coara.png'
import mora from '../../assets/images/mora.png'
export default function InstallmentSection() {
  return (
    <div className='h-[300px] w-full bg-[#4058A61A] md:pt-[5px] pt-[40px] rounded-[16px] px-5'>
        <p className='md:text-[50px] text-[25px] font-[700] text-[#211C4D]'>موظف ونسبة التزاماتك أقل من45%قسط مشترياتك بدون دفعة أولى الى36شهر مع</p>
        <div className='flex items-center mt-[20px] justify-between md:px-[30px]'>
            <Link to={''}><img src={coara} alt="" /></Link>
            <Link to={''}><img src={mora} alt="" /></Link>
        </div>
    </div>
  )
}
