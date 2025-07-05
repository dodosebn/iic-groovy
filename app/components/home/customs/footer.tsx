
import React from 'react'
import HorizontalDivider from '@/utils/horizontal';
import flyer from '@/public/images/subscribe-airplane.png';
import Image from 'next/image';
import FooterLevel from '../../desktop/footerLevel';
const Footer = () => {
 
  return(
<footer>
     <div className='  bg-[#fffacd]  min-h-[22rem] overflow-y-hidden md:overflow-y-visible'>
            <main className="w-full max-w-[1500px] mx-auto relative">

       <section className='md:flex px-2 gap-10 md:flex-row flex-col '>
        <div className='flex-2 mt-9'> 
        <FooterLevel />
        </div>
        <div className='md:block hidden'> 
          <div className='w-[300px]'></div> 
        </div>
      </section>
    <HorizontalDivider />

   <div className="pb-[1rem] py-4">
  <ul className="flex justify-center items-center space-x-4">
    {['Terms & Condition', 'Faq', 'Privacy Policy'].map((item, ndx) => (
      <li
        key={ndx}
        className={` px-2 flex items-center ${
          ndx !== 0
            ? 'relative before:content-[""] before:absolute before:-left-2 before:h-3 before:w-[2px] before:bg-gray-400'
            : ''
        }`}
      >
        {item}
      </li>
    ))}
  </ul>
</div>



       {/* </section> */}
</main>
      </div>

</footer>
  
  )
}

export default Footer;