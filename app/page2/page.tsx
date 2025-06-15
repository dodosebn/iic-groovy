import React from 'react'
import HomePage from '../components/home/homePage'
import TransitionLink from '@/utils/transitionLink'

const page = () => {
  return (
    <div className="flex justify-center flex-col px-[1rem]">
          <HomePage num1={6} num2={12}/>
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
