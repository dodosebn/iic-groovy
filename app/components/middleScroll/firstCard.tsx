'use client';
import React from 'react'
import Image, { StaticImageData } from 'next/image';
import Button from '@/utils/button';
import HorizontalDivider from '@/utils/horizontal';
import hadShowingBulb from '@/public/images/hand-invention.jpg';
import cubofTea from '@/public/images/cuppy.jpg'
import boySmiling from '@/public/images/smiling Gee.jpg';
import fan from '@/public/images/fan.jpg';
// import { useTagStore } from '@/app/store/useTagStore';
import FormSurvey from './form/formSurvey';
import FormSurvey2 from './form/formSurvey2';
import FormSurvey3 from './form/formSurvey3';
import FormSurvey4 from './form/formSurvey4';

interface cardProps {
  imgGen: string | StaticImageData;
 title: string;
 date: string;
 duration: string;
 bg: string;
 tag: string;
 imgName: string;
 img: StaticImageData;
}
const FirstCard: React.FC<cardProps > = ({imgGen, title, date, duration, bg, tag,  imgName, img}) => {
    // const { selectedTag } = useTagStore();

  return (
    <main className='px-3 py-3 lg:py-4  mx-auto rounded-xl border-1 border-[#000]' 
      style={{ backgroundColor: bg }}>
      <section className='flex flex-col lg:flex-row gap-8 CC lg:p-8'>
      <div className='lg:flex-1 h-[38vh] lg:h-[25rem]'>
  <Image 
    src={imgGen} 
    alt='Article visual'
    className='w-full h-full object-cover rounded-xl border-1 border-[#333]  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
                 hover:-translate-y-0.5'
  
    priority
  />
</div>
        
        {/* Content Section */}
        <div className='lg:flex-[1.5] flex flex-col justify-center lg:py-4 space-y-6'>
          {/* Category and Date */}
          <div className='flex flex-col space-y-3'>
            <div>
         
<Button name={tag} spanBg='#c5c5fe'/>
            </div>
            <div className='flex items-center space-x-3 text-gray-600'>
              <p>{date}</p>
              <span className='w-1 h-1 bg-pink-600 rounded-full'></span>
              <p>{duration}</p>
            </div>
          </div>
          
          {/* Title */}
          <div className='border-2 border-[#333] bg-[#fff] p-6 rounded-lg'>
            <h1 className='text-2xl lg:text-3xl font-bold text-gray-800 '>
              {title}
            </h1>
          </div>

          {/* Author and Update */}
          <div className='flex flex-col sm:flex-row sm:items-center lg:justify-between gap-4'>
            <div className='items-center space-x-3 lg:flex hidden'>
              <Image 
                src={img} 
                alt='Author avatar' 
                width={40}
                height={40}
                className='rounded-full w-10 h-10 object-cover  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
                 hover:-translate-y-0.5'
              />
              <p className='font-medium '>{imgName}</p>
            </div>
            <div className='text-sm text-gray-500'>
              <span className='font-semibold'>Last Update: </span>March 13, 2025
            </div>
          </div>
        </div>
  <div className='flex flex-col justify-center p-5'>
             {tag === 'Health' ? <FormSurvey />
             : tag === 'Getting Started' ? 
             <FormSurvey3 /> :  tag === 'Music' ? <FormSurvey4 />  :  <FormSurvey2 />}
           </div>
      </section>
         
    </main>
  )
}

export default FirstCard;