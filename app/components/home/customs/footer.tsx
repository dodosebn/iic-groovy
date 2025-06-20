
import React from 'react'
import HorizontalDivider from '@/utils/horizontal';
import flyer from '@/public/images/subscribe-airplane.png';
import Image from 'next/image';
import FooterLevel from '../../desktop/footerLevel';
const Footer = () => {
 
  return(
<footer>
     <div className='  bg-[#fffacd] md:min-h-screen min-h-[22rem] overflow-y-hidden md:overflow-y-visible'>
            <main className="w-full max-w-[1500px] mx-auto relative">

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
        <div className='text-center space-y-6 py-8 relative max-w-3xl px-[2rem] lg:px-0 mx-auto'>
          <div className="absolute lg:left-[3rem] left-6 top-1/3 -translate-y-1/3 lg:-translate-y-2/4">
  <div className="flex">
    <Image src={flyer} alt="something" className="w-[6.5rem] h-[6.5rem]" />
  </div>
</div>
          
          <h1 className='text-2xl md:text-[2.5rem] font-bold text-gray-900 mb-10'>
            Subscribe to our Newsletter</h1>
  <div className="relative max-w-lg mx-auto ">
  <input
    type="email"
    placeholder="Enter your email address"
    className=" w-full bg-[#fff] px-5 py-4 pr-28 rounded-full border border-[#333] 
    focus:outline-none focus:ring-1 focus:ring-yellow-500"
  />
  <button
    className="absolute right-2 top-1/2 -translate-y-1/2 ring-1 ring-[#333] bg-[#ff4c60]
     text-white md:px-7 px-3 py-2 rounded-full lg:text-lg text-sm font-bold  
              transition-shadow duration-200 ease-out 
              hover:shadow-[3px_3px_0px_rgba(0,0,0,0.3)]"
  >
    Subscribe
  </button>
</div>

          <p className='text-gray-600 lg:max-w-2xl  text-sm  md:px-0 mx-auto w-full'>
            Subscribe to our email newsletter and unlock access to <br className='hidden md:flex' /> <span className='font-bold'> 
            members-only</span> content and <span className='font-bold'>exclusive updates.</span>
          </p>
        </div>
   <div className="pb-[1rem]">
  <ul className="flex justify-center space-x-4">
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



       </section>
</main>
      </div>

</footer>
  
  )
}

export default Footer;