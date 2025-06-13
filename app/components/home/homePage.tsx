import React from 'react'
import Navbar from './navbar';
import FirstCard from '../middleScroll/firstCard';
const HomePage = () => {
  return (
    <div className='md:px-[4rem] md:py-[2rem]' >
<Navbar />
<div className='flex px-2 gap-10 md:flex-row flex-col md:mt-[5rem] mt-[3rem]'>
  <div className='flex-2'>
  <FirstCard />
  </div>
  <div className='flex-1'>

    <FirstCard />
  </div>

</div>
    </div>
  )
}

export default HomePage;
