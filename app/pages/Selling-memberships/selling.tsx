import React from 'react'


import AboutTheAuthor from '@/app/components/middleScroll/aboutTheAuthor';
import Comments from '@/app/components/middleScroll/comments';
import FirstCard from '@/app/components/middleScroll/firstCard';
import Previous from '@/app/components/middleScroll/previous';
import snailLike from '@/public/images/snail-like.jpg';

const Selling = () => {
  return (
     <div className='flex flex-col gap-12'>
          <FirstCard imgGen={snailLike} title={'Selling memberships with recurring revenue'} bg='#dff9d9'
      date={'March 16, 2021'} duration={'1 min read'} tag={'Health'}  />
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

export default Selling;
