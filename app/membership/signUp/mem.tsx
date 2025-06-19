import TransitionLink from '@/utils/transitionLink';
import React from 'react'

const Mem = () => {
  return (
    <div className='bg-[#fffacd] border-1 border-[#333] rounded-2xl p-6 lg:px-[2rem] lg:py-[3rem]
     hover:shadow-[12px_12px_0px_rgba(0,0,0,0.15)]
      transition-all duration-300 w-full max-w-2xl mx-auto flex flex-col justify-between'>
      <div className='flex flex-col gap-5 lg:gap-9'>
        <div className='text-center space-y-5'>
          <h1 className='text-2xl lg:text-4xl font-bold text-[#333]'>Subscribe to Groovy</h1>
          <p className='text-base lg:text-lg text-[#555]'>Become a Member & Never Miss an Update</p>
        </div>
        
        <div className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-lg font-medium text-[#333] ml-4">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full indent-[1rem]  p-3 bg-[#fff] text-sm rounded-full border-1 border-[#333] 
                        focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 
                        transition-all duration-200 lg:text-lg"
            />
          </div>
          
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg font-medium text-[#333] ml-4">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full indent-[1rem]  p-3 bg-[#fff] text-sm rounded-full border-1 border-[#333] 
                        focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 
                        transition-all duration-200 lg:text-lg"
            />
          </div>
          
          {/* Phone Number Input */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-lg font-medium text-[#333] ml-4">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+234 (706) 456-7890"
              className="w-full p-3 indent-[1rem] bg-[#fff] text-sm rounded-full border-1 border-[#333] 
                        focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 
                        transition-all duration-200 lg:text-lg"
            />
          </div>
          
          {/* Submit Button - centered and smaller */}
          <div className="flex justify-center pt-2">
            <button
              className="bg-[#ff4c60] text-[#333] px-8 py-2 
                        rounded-full font-medium text-sm lg:text-base
                        transition-all duration-200 hover:scale-105 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.3)]
                        active:scale-95 active:shadow-[1px_1px_0px_rgba(0,0,0,0.3)]"
            >
              Subscribe
            </button>
          </div>
        </div>
        
        <div>
          <p className='text-center text-sm text-[#333]'>
            Already have an account? <span className='font-bold cursor-pointer'>
              <TransitionLink href='/signIn'>Sign In</TransitionLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Mem;