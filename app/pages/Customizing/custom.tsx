import React from 'react'
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import stripeShii from '@/public/images/stripesShii.jpg';
import smilingGirle from '@/public/images/smilingGirlie.jpg';
import CenteringPages from '@/utils/centeringPages';

const Custom = () => {
  return (
    <CenteringPages>
          <FirstCard imgGen={stripeShii} title={'Customizing your brand and design settings'}
      date={'March 16, 2021'} bg='#e0ebfc' tag={'Technology'} duration={''} />
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

export default Custom;
