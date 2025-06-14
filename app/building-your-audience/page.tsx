import React from 'react'
import FirstCard from '../components/middleScroll/firstCard';
import AboutTheAuthor from '../components/middleScroll/aboutTheAuthor';
import Comments from '../components/middleScroll/comments';
import Previous from '../components/middleScroll/previous';


const HomePage = () => {
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

export default HomePage;