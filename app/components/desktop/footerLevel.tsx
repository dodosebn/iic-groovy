import Button from '@/utils/button';
import FourthStuff from '@/utils/fourthStuff';
import {Logo} from '@/utils/logo';
import ThreeStuff from '@/utils/threeStuff';
import React from 'react';
import FourIt from './fourIt';

const FooterLevel = () => {
  return (
    <>
    <div className='hidden md:block'>
   <main className='bg-[#fffacd] flex justify-around w-full '>
  {/* Left column */}
  <div className='flex flex-col  pl-[3rem] w-[23rem] shrink-0'>
    <div><Logo /></div>
    <div>
      <p className='text-sm py-5'>
        A super modern theme following the latest trends with premium Membership and fully compatible with 
        <span className='font-bold'> Ghost.</span>
      </p>
      <p className='text-sm'>Check more themes like this on estudiopatagon.com</p>
    </div>
  </div>

  {/* Main section that should take up remaining space */}
  <section className='flex-1'>
    <div className='relative -top-[3.5rem] left-[13rem]'>
  <div className='flex flex-row justify-between gap-20'>
    {[ 'Tag Cloud', 'Follow Us!'].map((itm, ndx) => (
      <div
        key={ndx}
        className={`font-bold text-xl bg-white px-6 border border-[#333] rounded-3xl
    `} 
      >
        {itm}
      </div>
    ))}
</div>

    </div>

    <section className='flex flex-row justify-around'>
      {/* <div className='relative left-[7rem]'><ThreeStuff /></div> */}
      <div className='relative left-[11rem]' id='tag'><FourIt /></div>
      <div className='relative left-[15rem] pb-12'><FourthStuff /></div>
    </section>
  </section>
</main>
</div>
<div className='md:hidden block'>
  <main className='bg-[#fffacd] flex flex-col md:flex-row justify-around w-full p-6 gap-8'>
      {/* Left column */}
      <div className='flex flex-col w-full md:w-[16rem] shrink-0'>
        <div><Logo /></div>
        <div>
          <p className='text-sm py-5'>
            A super modern theme following the latest trends with premium Membership and fully compatible with 
            <span className='font-bold'> Ghost.</span>
          </p>
          <p className='text-sm'>Check more themes like this on estudiopatagon.com</p>
        </div>
      </div>

      {/* Right section */}
      <section className='flex-1 flex flex-col items-center md:items-start'>
        {/* Buttons */}
        {/* <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-4'>
          {['', 'Follow Me!'].map((itm, ndx) => (
          
          ))}
        </div> */}

        {/* Contents */}
        <section className='pt-6 flex flex-col md:flex-row justify-center md:justify-between gap-8 w-full'>
          <div className='space-y-6'>  
            <div className='flex'>
            <div
              // key={ndx}
              className='font-bold text-xl bg-white px-6 py-1 border border-[#333] rounded-3xl'
            >
Tag Cloud            </div> <div className='w-1/2'></div></div><FourIt /></div>
          
                    <div className='space-y-6'>  
<div className='flex'>
            <div
              // key={ndx}<
              className='font-bold text-xl flex justify-center bg-white px-6 w-[55%] py-1 border border-[#333] rounded-3xl'
            >
Follow US!            </div> <div className='w-1/2'></div></div> <FourthStuff /></div>
        </section>
      </section>
    </main>
    </div>
    </>
  );
};

export default FooterLevel;