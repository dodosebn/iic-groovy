import React from 'react'


import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import umbrella from '@/public/images/umbrella.jpg';
import headSet from '@/public/authors/auth-headset.jpg';

const Managing = () => {
  return (
     <div className='flex flex-col gap-12'>
          <FirstCard imgGen={umbrella} title={'Managing admin settings'} 
          date={'April 26, 2019'} duration={'3 min read'}     bg='#c5f4ef'
 tag='Getting Started' imgName="Joseph Fransics" img={headSet}/>
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

export default Managing;
