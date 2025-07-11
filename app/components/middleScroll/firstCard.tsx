'use client';
import React from 'react'
import Image, { StaticImageData } from 'next/image';
import Button from '@/utils/button';

// import { useTagStore } from '@/app/store/useTagStore';
import FormSurvey from './form/formSurvey';
import FormSurvey2 from './form/formSurvey2';
import FormSurvey3 from './form/formSurvey3';
import ShareAndCopy from './form/shareandcopy';
import socioloji from '@/public/images/socioloji.webp';

interface cardProps {
  imgGen: string | StaticImageData;
 title: string;
 date: string;
 duration: string;
 bg: string;
 tag: string;
//  imgName: string;
//  img: StaticImageData;
}
const FirstCard: React.FC<cardProps > = ({imgGen, title, date, duration, bg, tag, }) => {
    // const { selectedTag } = useTagStore();

  return (
    <>
    <main className='px-3 py-3 lg:py-4  mx-auto rounded-xl border-1 border-[#000]' 
      style={{ backgroundColor: bg }}>
        <div className='relative'>
      <div className='lg:flex-1 md:px-4 relative md:h-[25rem] h-[18rem]'>
  <Image 
    src={imgGen} 
    alt='Article visual'
    className='w-full md:h-[25rem] h-[18rem] object-cover rounded-t-xl border-1 border-[#333]
      transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
                 hover:-translate-y-0.5'
  
    priority
  />
</div>
                <div className="absolute bottom-[90%] flex items-start px-4  md:px-8">
<Button name={tag} spanBg='#c5c5fe'/>
</div>
<div className='md:px-4'>
 <div className='border-2 border-[#333] bg-[#fff] p-6 rounded-b-lg'>
            <h1 className='text-2xl lg:text-3xl font-bold text-gray-800 '>
              {title}
            </h1>
          </div>
          </div>
</div>
      <section className='flex justify-between items-center p-4 lg:p-8'>
            <div className='flex items-start space-x-3 text-gray-600'>
              <p>{date}</p>
            </div>
          
          <div className='flex flex-col sm:flex-row sm:items-center lg:justify-between gap-4'>
            <div className='items-center space-x-3 flex '>
              <Image 
                src={socioloji} 
                alt='Author avatar' 
                width={40}
                height={40}
                className='rounded-full w-8 h-8 object-cover  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000]
                 hover:-translate-y-0.5'
              />
              <p className='font-medium '>Socioloji</p>
            </div>
          
          </div>
      </section>
           <div className='flex flex-col justify-center md:p-5 py-3'>

            <FormSurvey3 />
             {/* {tag === 'Health' ? <FormSurvey />
             : tag === 'Getting Started' ?  */}
             {/* <FormSurvey3 /> : <FormSurvey2 />  } */}
           </div>
      <div className="hidden md:block">
  <ShareAndCopy />
</div>

    </main>
         <div className="md:hidden block">
  <ShareAndCopy />
</div>
</>
  )
}

export default FirstCard;