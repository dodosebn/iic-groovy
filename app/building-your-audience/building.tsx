import React from 'react'
import Previous from '../components/middleScroll/previous';
import Comments from '../components/middleScroll/comments';
import AboutTheAuthor from '../components/middleScroll/aboutTheAuthor';
import FirstCard from '../components/middleScroll/firstCard';

const Building = () => {
  return (
     <div className='flex flex-col gap-12'>
          <FirstCard />
          <AboutTheAuthor />
          <Comments />
     <div className='md:flex'>
      <div className='md:flex-2'>
          <Previous />
          </div>
          <div className='md:flex-[0.5]'></div>
  </div>
    </div>
  )
}

export default Building;
