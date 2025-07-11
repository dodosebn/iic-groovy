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
      
</CenteringPages>  )
}

export default Custom;
