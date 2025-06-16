import React from 'react'


import tallHand from '@/public/images/tall-hand-holding-bulb.jpg';
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import snailLike from '@/public/images/snail-like.jpg';

const Selling = () => {
  return (
     <div className='flex flex-col gap-12'>
          <FirstCard imgGen={snailLike} title={'Selling memberships with recurring revenue'} 
          date={'March 16, 2021'} duration={'1 min read'}  />
          <AboutTheAuthor />
          <Comments />
     <div className='md:flex'>
      <div className='md:flex-2'>
          <Previous />
          </div>
          <div className='md:flex-[0.5]'></div>
  </div>
    </div>
  )
}

export default Selling;
