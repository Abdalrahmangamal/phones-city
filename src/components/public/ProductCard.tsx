import image from '../../assets/images/image1.png'
import whitebolit from '../../assets/images/whitebolit.png'
import pinkbolit from '../../assets/images/pinkbolit.png'
import bluebolit from '../../assets/images/bluebolit.png'
import blackbolit from '../../assets/images/blackbolit.png'

import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';

export default function ProductCard() {
  return (
    <div className="max-w-[350px] bg-[#FFFFFF] min-w-[300px] h-[400px] rounded-[16px] p-[15px] shadow-[0px_4px_4px_0px_#00000040]">
        <div className='flex items-center justify-center relative'>
      <img src={image} className='w-[220px] h-[220px]' alt="" />
      <div>
        <div className='flex w-full items-center justify-between absolute right-0 top-0'>
<div className='bg-[#EEF1F6] flex items-center justify-center w-[36px] h-[36px] rounded-full'>
<svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.9 1.96094C4.11914 1.96094 1.75 4.04024 1.75 6.74073C1.75 8.60369 2.62235 10.1721 3.77849 11.4714C4.93066 12.7661 6.41714 13.853 7.76097 14.7626L10.0796 16.332C10.3335 16.5039 10.6665 16.5039 10.9204 16.332L13.239 14.7626C14.5829 13.853 16.0693 12.7661 17.2215 11.4714C18.3777 10.1721 19.25 8.60369 19.25 6.74073C19.25 4.04024 16.8809 1.96094 14.1 1.96094C12.6665 1.96094 11.4052 2.63308 10.5 3.50277C9.59484 2.63308 8.33347 1.96094 6.9 1.96094Z" stroke="#211C4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
<div className='w-[41px] h-[20px] flex items-center justify-center rounded-[4px] bg-[#259ACB] ' >
<p className='text-[white] *:'>جديد</p>
</div>
        </div>
      </div>
        </div>
      <h2 className='text-[24px] font-[500] text-[#211C4D]'>أبل آيفون 14 128 جيجا.....</h2>
      <div className='flex items-center gap-[7px] mt-[10px] justify-start'>
        <button className='w-[15px] h-[15px] rounded-full'><img src={whitebolit} alt="" /></button>
        <button className='w-[15px] h-[15px] rounded-full'><img src={pinkbolit} alt="" /></button>
        <button className='w-[15px] h-[15px] rounded-full'><img src={bluebolit} alt="" /></button>
        <button className='w-[15px] h-[15px] rounded-full'><img src={blackbolit} alt="" /></button>
      </div>
  <div className="flex mt-[10px] items-center justify-start  gap-3">
      <Rating defaultValue={3}>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton className="text-yellow-500" key={index} />
        ))}
      </Rating>
    </div>
    <div className='flex items-center justify-between mt-[10px]  w-full'>
        <p>899.00 رس </p>
        <div className='w-[40px] h-[40px] bg-[#EEF1F6] flex items-center justify-center'>
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.9987 14.3333C5.95267 14.3333 5.91536 14.3706 5.91536 14.4167C5.91536 14.4627 5.95267 14.5 5.9987 14.5C6.04472 14.5 6.08203 14.4627 6.08203 14.4167C6.08203 14.3706 6.04472 14.3333 5.9987 14.3333ZM4.7487 14.4167C4.7487 13.7263 5.30834 13.1667 5.9987 13.1667C6.68905 13.1667 7.2487 13.7263 7.2487 14.4167C7.2487 15.107 6.68905 15.6667 5.9987 15.6667C5.30834 15.6667 4.7487 15.107 4.7487 14.4167Z" fill="#211C4D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.332 14.3333C13.286 14.3333 13.2487 14.3706 13.2487 14.4167C13.2487 14.4627 13.286 14.5 13.332 14.5C13.3781 14.5 13.4154 14.4627 13.4154 14.4167C13.4154 14.3706 13.3781 14.3333 13.332 14.3333ZM12.082 14.4167C12.082 13.7263 12.6417 13.1667 13.332 13.1667C14.0224 13.1667 14.582 13.7263 14.582 14.4167C14.582 15.107 14.0224 15.6667 13.332 15.6667C12.6417 15.6667 12.082 15.107 12.082 14.4167Z" fill="#211C4D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.0820312 1.08333C0.0820312 0.761167 0.343198 0.5 0.665365 0.5H3.33203C3.61006 0.5 3.84945 0.696225 3.90402 0.96885L4.47734 3.83333H15.332C15.5059 3.83333 15.6707 3.91087 15.7815 4.04482C15.8923 4.17877 15.9376 4.35517 15.905 4.52594L14.8375 10.1236C14.7499 10.5649 14.5099 10.9612 14.1595 11.2433C13.8106 11.5241 13.3745 11.6738 12.9269 11.6667H6.45713C6.00951 11.6738 5.57343 11.5241 5.22461 11.2433C4.87434 10.9613 4.63436 10.5652 4.54664 10.1241L3.43249 4.55754C3.42828 4.54056 3.42481 4.52329 3.42213 4.50577L2.85388 1.66667H0.665365C0.343198 1.66667 0.0820312 1.4055 0.0820312 1.08333ZM4.71085 5L5.69086 9.89636C5.72515 10.069 5.81907 10.2241 5.95618 10.3345C6.0933 10.4448 6.26487 10.5035 6.44085 10.5001L6.45203 10.5H12.932L12.9432 10.5001C13.1192 10.5035 13.2908 10.4448 13.4279 10.3345C13.5645 10.2245 13.6582 10.0701 13.6928 9.89826L13.6932 9.89636L14.6269 5H4.71085Z" fill="#211C4D"/>
</svg>

        </div>
    </div>
    </div>
  );
}
