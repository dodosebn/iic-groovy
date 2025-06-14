import React from 'react'
import Navbar from './navbar';
import FirstCard from '../middleScroll/firstCard';
import SideBar from '../desktop/sideBar';
import AboutTheAuthor from '../middleScroll/aboutTheAuthor';
import Comments from '../middleScroll/comments';
import Previous from '../middleScroll/previous';

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