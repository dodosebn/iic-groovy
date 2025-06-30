import React from 'react'


import tallHand from '@/public/images/tall-hand-holding-bulb.jpg';
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import music from '@/public/images/music.jpg';
import boySmiling from '@/public/images/smiling Gee.jpg';

const Musical = () => {
  return (
     <div className='flex flex-col gap-12'>
          <FirstCard imgGen={music} title={'Musical improvisation is the spontaneous music'}
           date={'March 16, 2021'} duration={'3 min read'} bg='#fff2be' tag={'Music'}    imgName= "Jonathan Doe"
              img={boySmiling} />
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

export default Musical;
