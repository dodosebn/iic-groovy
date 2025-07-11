import React from 'react'
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import cubofTea from '@/public/images/cuppy.jpg'
import smilingGirle from '@/public/images/smilingGirlie.jpg';
import CenteringPages from '@/utils/centeringPages';

const What = () => {
  return (
     <CenteringPages>
          <FirstCard imgGen={cubofTea} title={'What you need to know about Ghost Editor'}
      date={'March 16, 2021'} duration={'2 min read'} bg='#fff2be' tag={'Music'}  
 />
         
    </CenteringPages>
  )
}

export default What;
