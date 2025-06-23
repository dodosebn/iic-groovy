import Button from '@/utils/button';
import FourthStuff from '@/utils/fourthStuff';
import {Logo} from '@/utils/logo';
import ThreeStuff from '@/utils/threeStuff';
import React from 'react';
import FourIt from './fourIt';

const FooterLevel = () => {
  return (
   <main className='bg-[#fffacd] flex justify-around w-full '>
  {/* Left column */}
  <div className='flex flex-col pt-[4rem] pl-[3rem] w-[16rem] shrink-0'>
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
    <div className='relative -top-[3.5rem] left-[11rem]'>
  <div className='flex flex-row justify-around gap-6'>
    {[ 'Tag Cloud', 'Follow Me!'].map((itm, ndx) => (
      <div
        key={ndx}
        className={`font-bold text-xl bg-white px-6 py-1 border border-[#333] rounded-3xl
        ${ndx === 2 ? 'relative right-[-4rem]' : ''}`} 
      >
        {itm}
      </div>
    ))}
</div>

    </div>

    <section className='pt-5 flex flex-row justify-around'>
      {/* <div className='relative left-[7rem]'><ThreeStuff /></div> */}
      <div className='relative left-[11rem]' id='tag'><FourIt /></div>
      <div className='relative left-[15rem]'><FourthStuff /></div>
    </section>
  </section>
</main>

  );
};

export default FooterLevel;