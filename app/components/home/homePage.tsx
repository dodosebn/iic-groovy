import React from 'react'
import Navbar from './navbar';
import FirstCard from '../middleScroll/firstCard';
import SideBar from '../desktop/sideBar';
import AboutTheAuthor from '../middleScroll/aboutTheAuthor';
import Comments from '../middleScroll/comments';
import Previous from '../middleScroll/previous';

const HomePage = () => {
  return (
    <div>
      <div className='flex px-2 gap-10 md:flex-row flex-col md:mt-[5rem] mt-[3rem]'>
        <div className='flex-2'>
          <FirstCard />
        </div>
        <div className='md:block hidden'>
          <SideBar />
        </div>
      </div>
      <div className='flex px-2 gap-10 md:flex-row flex-col'>
        <div className='flex-2 mt-9'> 
          <AboutTheAuthor />
        </div>
        <div className='md:block hidden'> 
          <div className='w-[310px]'></div> 
        </div>
      </div>
      <div className='flex px-2 gap-10 md:flex-row flex-col'>
        <div className='flex-2 mt-9'> 
          <Comments />
        </div>
        <div className='md:block hidden'> 
          <div className='w-[310px]'></div> 
        </div>
      </div>
      <div className='flex md:py-5 px-2 gap-10 md:flex-row flex-col'>
        <div className='flex-2 mt-9'> 
          <Previous />
        </div>
        <div className='md:block hidden'> 
          <div className=' w-[500px]'></div> 
        </div>
      </div>
    </div>
  )
}

export default HomePage;