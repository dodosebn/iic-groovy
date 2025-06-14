import React from 'react'
import FooterLevel from '../desktop/footerLevel';
import HorizontalDivider from '@/utils/horizontal';
import flyer from '@/public/images/subscribe-airplane.png';
import Imager from '@/utils/imager';
import Image from 'next/image';
const Footer = () => {
  return(
<footer>
     <div className='  bg-[#fffacd] md:min-h-screen min-h-[22rem] overflow-y-hidden md:overflow-y-visible'>
       <section className='md:flex px-2 gap-10 md:flex-row flex-col hidden'>
        <div className='flex-2 mt-9'> 
        <FooterLevel />
        </div>
        <div className='md:block hidden'> 
          <div className='w-[300px]'></div> 
        </div>
      </section>
    <HorizontalDivider />
       <section >
        <div className='text-center space-y-6 py-8'>
          <h2 className='text-xl font-semibold text-gray-700'>Like what you read?</h2>
          <div className='flex justify-center'>
            <div className='hidden md:flex'><Image src={flyer} alt='somthgin' className='w-[6rem] h-[6rem]'/></div>
          <div>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>Subscribe to our Newsletter</h1>
  <div className="relative max-w-md mx-auto ">
  <input
    type="email"
    placeholder="Enter your email address"
    className="w-full bg-[#fff] px-5 py-3 pr-32 rounded-full border border-[#333] 
    focus:outline-none focus:ring-2 focus:ring-yellow-500"
  />
  <button
    className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#ff4c60] text-white px-4 py-1.5 rounded-full text-sm font-medium 
              transition-shadow duration-200 ease-out 
              hover:shadow-[3px_3px_0px_rgba(0,0,0,0.3)]"
  >
    Subscribe
  </button>
</div>
</div>
</div>
          <p className='text-gray-600 max-w-2xl md:pl-[6rem] px-[3rem] md:px-0 mx-auto'>
            Subscribe to our email newsletter and unlock access to <br className='hidden md:flex' /> <span className='font-bold'> 
            members-only</span> content and <span className='font-bold'>exclusive updates.</span>
          </p>
        </div>
       </section>

      </div>
</footer>
  
  )
}

export default Footer;
