import React from 'react'


import one from '@/public/images/oneee.jpg';
import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';

const Far = () => {
  return (
     <div className='flex flex-col gap-12'>
          <FirstCard imgGen={one} title={'Far far away, behind the word mountains'} 
          date={'March 16, 2021'} duration={'3 min read'}      bg='#c5f4ef'
/>
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

export default Far;
