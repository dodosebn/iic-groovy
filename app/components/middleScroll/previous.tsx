import AboutMeContainer from '@/utils/aboutMeContainer';
import React from 'react'
import Image from 'next/image';
import imgSrc from '@/public/images/introImg.avif';
import Button from '@/utils/button';

const Previous = () => {
  return (
    <section>
      <AboutMeContainer name='Previous Article'>
        <div className='flex gap-4 md:gap-6 p-3 rounded-lg transition-colors duration-200'>
          <div className='flex-shrink-0 md:flex hidden'>
            <Image
              src={imgSrc}
              alt="Article thumbnail"
              width={100}
              height={100}
              className="rounded-sm w-[12rem] h-[15rem] object-cover 
              transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5"
            />
          </div>
          
          <div className='flex flex-col justify-center space-y-2'>
            <div className='md:flex hidden'>
              <Button name={'Getting Started'} spanBg={'#1dd7c2'} />
            </div>
            
            <h1 className='text-2xl md:text-3xl  font-bold text-gray-900 hover:text-[#ff4c60]
             transition-colors cursor-pointer'>
              Far far away, behind the word mountains
            </h1>
            
            <div className='flex items-center space-x-3 text-gray-600'>
              <p>September 25, 2022</p>
              <span className='w-1 h-1 bg-pink-600 rounded-full'></span>
              <p>3 min read</p>
            </div>
          </div>
        </div>
      </AboutMeContainer>
    </section>
  )
}

export default Previous;