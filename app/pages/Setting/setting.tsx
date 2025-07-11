import React from 'react'


import tallHand from '@/public/images/tall-hand-holding-bulb.jpg';
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import gadget from '@/public/images/gadgets.jpg';
import boySmiling from '@/public/images/smiling Gee.jpg';
import CenteringPages from '@/utils/centeringPages';

const Selling = () => {
  return (
     <CenteringPages>
          <FirstCard imgGen={gadget} title={'Setting up apps and custom integrations'}
      date={'March 16, 2021'} duration={'2 min read'} bg='#c5f4ef' tag={'Getting Started'}     />
      
         </CenteringPages>

  )
}

export default Selling;
