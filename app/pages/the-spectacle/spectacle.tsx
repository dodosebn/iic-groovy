import React from 'react'


import tallHand from '@/public/images/tall-hand-holding-bulb.jpg';
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import shoeLike from '@/public/images/shoe.jpg';
import smilingGirle from '@/public/images/smilingGirlie.jpg';
import CenteringPages from '@/utils/centeringPages';

const Spectacle = () => {
  return (
     <CenteringPages>
          <FirstCard imgGen={shoeLike} title={'The spectacle before us was indeed sublime'} 
          bg='#ffeae9'  

      date={'April 26, 2019'} duration={'2 min read'} tag={'Lifestyle'}  />
          {/* <AboutTheAuthor />
          <Comments />
     <div className='lg:flex'>
      <div className='lg:flex-2'>
          <Previous />
          </div>
          <div className='lg:flex-[0.5]'></div>
  </div> */}
    </CenteringPages>
  )
}

export default Spectacle;
