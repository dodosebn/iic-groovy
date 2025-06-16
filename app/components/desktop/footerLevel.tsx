import Button from '@/utils/button';
import FourthStuff from '@/utils/fourthStuff';
import Logo from '@/utils/logo';
import ThreeStuff from '@/utils/threeStuff';
import React from 'react';
import FourIt from './fourIt';

const FooterLevel = () => {
  return (
    <main className='bg-[#fffacd] relative p-6'>
        <div className='relative -top-[4.9rem]'>
      <div className='flex flex-row  justify-around gap-6 '>
        <div className='font-bold text-xl bg-white px-5 py-1 
      border border-[#333] rounded-3xl'>Latest Article</div> 
        <div className='font-bold text-xl bg-white px-5 py-1 
       border border-[#333] rounded-3xl'>Tag Cloud</div> 
        <div className='font-bold text-xl bg-white px-5 py-1 
       border border-[#333] rounded-3xl'>Follow Me!</div> 
      </div>
</div>
      {/* Main content container */}
      <section className='pt-5 flex flex-row justify-around relative'>
       

        <div className=''>
          <ThreeStuff />
        </div>
{/* 
        <div>
          <div className="flex justify-start mb-4">
            <Button name="Getting Started" spanBg="#1dd7c2" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button name="Health" spanBg="#83ea6c" />
            <Button name="Lifestyle" spanBg="#ffaeab" />
          </div>

<div className="grid grid-cols-2 gap-3 mb-4">
            <Button name="Music" spanBg="#ffcf00" />
            <div>{''}</div>
          </div>
<div className="flex  gap-3 mb-4">
            <Button name="Technology" spanBg="#85b2f4" />
            <div>{''}</div>
          </div>

           <div className="grid grid-cols-2 gap-3 mb-4">
            <Button name="Travel" spanBg="#c5c5fe" />
            <div>{''}</div>
          </div>
        
        </div> */}
<FourIt />
        <div>
          <FourthStuff />
        </div>
      </section>
    </main>
  );
};

export default FooterLevel;