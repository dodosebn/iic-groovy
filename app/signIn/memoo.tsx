import TransitionLink from '@/utils/transitionLink';
import React from 'react'

const Memoo = () => {
  return (
    <div className='bg-[#fffacd] border-1 border-[#333] rounded-2xl p-6 md:px-[3rem] md:py-[4rem]
     hover:shadow-[12px_12px_0px_rgba(0,0,0,0.15)]
      transition-all duration-300 w-full max-w-2xl mx-auto flex flex-col justify-between'>
      <div className='flex flex-col gap-5 md:gap-9'>
        <div className='text-center space-y-5'>
          <h1 className='text-2xl md:text-4xl font-bold text-[#333]'>sign in to Groovy</h1>
          <p className='text-base md:text-lg text-[#555]'>Thoughts, stories and idea</p>
        </div>
        
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full p-4 bg-[#fff] text-sm  rounded-full border-1 border-[#333] 
                      focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 
                      transition-all duration-200  md:text-lg"
          />
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#ff4c60] text-[#333] px-4 py-1.5 md:px-6 md:py-2.5 
                      rounded-full font-medium text-sm md:text-base
                      transition-all duration-200 hover:scale-105 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.3)]
                      active:scale-95 active:shadow-[1px_1px_0px_rgba(0,0,0,0.3)]"
          >
            LogIn
          </button>
        </div>
        
        <div>
        <p className='text-center text-sm text-[#333]'>
Don't have an account? <span className='font-bold cursor-pointer'> <TransitionLink href='membership/signUp'>
  Sign Up</TransitionLink></span>

        </p>
        </div>
      </div>
    </div>
  )
}

export default Memoo;