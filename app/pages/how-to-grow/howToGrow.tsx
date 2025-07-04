import React from 'react'


import tallHand from '@/public/images/tall-hand-holding-bulb.jpg';
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import fan from '@/public/images/fan.jpg';
import dreadedG from '@/public/authors/auth-dread.jpg';
import CenteringPages from '@/utils/centeringPages';

const HowToGrow = () => {
  return (
    <CenteringPages>
          <FirstCard imgGen={fan} title={'How to grow your business around an audience'} bg='#c5f4ef'

      date={'March 16, 2021'} duration={'2 min read'} tag={'Getting Started'}   
 />
          {/* <AboutTheAuthor />
          <Comments />
     <div className='lg:flex'>
      <div className='lg:flex-2'>
          <Previous />
          </div>
          <div className='lg:flex-[0.5]'></div>
  </div> */}
</CenteringPages>  )
}

export default HowToGrow;
