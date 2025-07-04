
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

       <section className='md:flex px-2 gap-10 md:flex-row flex-col '>
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
          <div className="absolute lg:left-[-2rem] left-[-2rem] top-2/5  -translate-y-1/3 lg:-translate-y-2/4">
  <div className="flex">
    <Image src={flyer} alt="something" className="w-[6.5rem] h-[6.5rem]" />
  </div>
</div>
          
        <div className='pt-[3rem]
       w-full max-w-2xl mx-auto flex flex-col justify-between'>
      <div className='flex flex-col lg:gap-8'>
        <div className='text-center space-y-5'>
          <h1 className='text-2xl lg:text-4xl py-5 md:py-0 font-bold text-[#333]'>Join the Movement</h1>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className=" text-lg flex ml-4 flex-start justify-start font-medium text-[#333] ">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full indent-[1rem]  p-3 bg-[#fff] text-sm rounded-full border-1 border-[#333] 
                        focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 
                        transition-all duration-200 lg:text-lg"
            />
          </div>
          
          <div className="space-y-2">
             <label htmlFor="name" className=" text-lg flex ml-4 flex-start justify-start font-medium text-[#333] ">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full indent-[1rem]  p-3 bg-[#fff] text-sm rounded-full border-1 border-[#333] 
                        focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 
                        transition-all duration-200 lg:text-lg"
            />
            
          </div>
          
          
                    <div className="flex justify-center pt-2">
            <button
              className="bg-[#ff4c60] text-[#333] px-8 py-2 
                        rounded-full font-medium text-sm lg:text-base
                        transition-all duration-200 hover:scale-105 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.3)]
                        active:scale-95 active:shadow-[1px_1px_0px_rgba(0,0,0,0.3)]"
            >
              Subscribe
            </button>
          </div>
        </div>
      
      </div>
    </div>

          <p className='text-gray-600 lg:max-w-2xl  text-sm   mx-auto w-full'>
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