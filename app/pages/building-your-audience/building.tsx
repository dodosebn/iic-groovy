import React from 'react'


import tallHand from '@/public/images/tall-hand-holding-bulb.jpg';
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';

const Building = () => {
  return (
     <div className='flex flex-col gap-12'>
          <FirstCard imgGen={tallHand} title={'Building your audience with subscriber signups'} 
          date={'September 25, 2022'} duration={'3 min read'}  />
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

export default Building;
