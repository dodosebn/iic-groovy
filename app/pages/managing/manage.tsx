import React from 'react'


import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import umbrella from '@/public/images/umbrella.jpg';
import headSet from '@/public/authors/auth-headset.jpg';
import CenteringPages from '@/utils/centeringPages';

const Managing = () => {
  return (
    <CenteringPages>
          <FirstCard imgGen={umbrella} title={'Managing admin settings'} 
          date={'April 26, 2019'} duration={'3 min read'}     bg='#c5f4ef'
 tag='Getting Started' />
     </CenteringPages>
  )
}

export default Managing;
