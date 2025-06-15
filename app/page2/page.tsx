import React from 'react'
import HomePage from '../components/home/homePage'
import TransitionLink from '@/utils/transitionLink'
import Page1Maps from '../components/home/data/page1Maps'
import HomeWrapper from '../components/home/customs/homeWrapper'

const page = () => {
  return (
    <div className="flex justify-center flex-col px-[1rem]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Page1Maps.slice(0, 6).map((item) => (
          <HomeWrapper key={item.id} {...item} />
        ))}
      </div>
     <div className="flex gap-3 w-full mt-6 justify-center">
         <div>
            <TransitionLink href='/'>
          <button 
      className='bg-[#ff4c60] border border-[#333] text-[rgb(0,0,0)] px-[1rem] py-[0.2rem] 
      rounded-2xl flex items-center gap-2 
  transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5'
    >
Previous
      </button>
      </TransitionLink>
      </div>
      <div>
      <p>Page 2 of 2</p>
      </div>
     
     </div>
    </div>
  )
}

export default page
