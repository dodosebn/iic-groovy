import React from 'react'


import tallHand from '@/public/images/tall-hand-holding-bulb.jpg';
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import music from '@/public/images/music.jpg';
import boySmiling from '@/public/images/smiling Gee.jpg';
import CenteringPages from '@/utils/centeringPages';

const Musical = () => {
  return (
     <CenteringPages>
          <FirstCard imgGen={music} title={'Musical improvisation is the spontaneous music'}
           date={'March 16, 2021'} duration={'3 min read'} bg='#fff2be' tag={'Music'}   />
        </CenteringPages>
  )
}

export default Musical;
