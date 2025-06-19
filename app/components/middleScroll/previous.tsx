import AboutMeContainer from '@/utils/aboutMeContainer';
import React from 'react'
import Image from 'next/image';
import imgSrc from '@/public/images/introImg.avif';
import Button from '@/utils/button';
import oneImg from '@/public/images/oneee.jpg';
import Imager from '@/utils/imager';
const Previous = () => {
  return (
    <section>
      <AboutMeContainer name='Previous Article'>
        <div className='flex gap-4 lg:gap-6 p-3 rounded-lg transition-colors duration-200'>
          <div className='flex-shrink-0 lg:flex hidden'>
            <Imager
              src={oneImg}
              alt="Article thumbnail"
              width={100}
              height={100}
              className="rounded-sm w-[12rem] h-[15rem] object-cover"
            />
          </div>
          
          <div className='flex flex-col justify-center space-y-2'>
            <div className='lg:flex hidden'>
              <Button name={'Getting Started'} spanBg={'#1dd7c2'} />
            </div>
            
            <h1 className='text-2xl lg:text-3xl  font-bold text-gray-900
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