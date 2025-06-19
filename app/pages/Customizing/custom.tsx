import React from 'react'
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import stripeShii from '@/public/images/stripesShii.jpg';

const Custom = () => {
  return (
     <div className='flex flex-col gap-12'>
          <FirstCard imgGen={stripeShii} title={'Customizing your brand and design settings'} 
          date={'March 16, 2021'} duration={'1 min read'}     bg='#e0ebfc'
 />
          <AboutTheAuthor />
          <Comments />
     <div className='lg:flex'>
      <div className='lg:flex-2'>
          <Previous />
          </div>
          <div className='lg:flex-[0.5]'></div>
  </div>
    </div>
  )
}

export default Custom;
