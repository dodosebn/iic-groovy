import TransitionLink from '@/utils/transitionLink';
import React from 'react'

const SignIn = () => {
  return (
    <div className='bg-[#fffacd] border-1 border-[#333] rounded-2xl p-6 md:px-[2rem] md:py-[3rem]
     hover:shadow-[12px_12px_0px_rgba(0,0,0,0.15)]
      transition-all duration-300 w-full max-w-2xl mx-auto flex flex-col justify-between'>
      <div className='flex flex-col gap-5 md:gap-9'>
        <div className='text-center space-y-5'>
          <h1 className='text-2xl md:text-4xl font-bold text-[#333]'>Sign In to Groovy</h1>
          <p className='text-base md:text-lg text-[#555]'>Welcome back! Please enter your details</p>
        </div>
        
        <div className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg font-medium text-[#333] ml-4">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full indent-[1rem] p-3 bg-[#fff] text-sm rounded-full border-1 border-[#333] 
                        focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 
                        transition-all duration-200 md:text-lg"
            />
          </div>
          
          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-lg font-medium text-[#333] ml-4">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 indent-[1rem] bg-[#fff] text-sm rounded-full border-1 border-[#333] 
                        focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 
                        transition-all duration-200 md:text-lg"
            />
          </div>
          
          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center px-4">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-[#333]">
                Remember me
              </label>
            </div>
            <span className='text-sm font-bold cursor-pointer text-[#333] hover:underline'>
              Forgot password?
            </span>
          </div>
          
          {/* Submit Button - centered and smaller */}
          <div className="flex justify-center pt-2">
            <button
              className="bg-[#ff4c60] text-[#333] px-8 py-2 
                        rounded-full font-medium text-sm md:text-base
                        transition-all duration-200 hover:scale-105 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.3)]
                        active:scale-95 active:shadow-[1px_1px_0px_rgba(0,0,0,0.3)]"
            >
              Sign In
            </button>
          </div>
        </div>
        
        <div>
          <p className='text-center text-sm text-[#333]'>
            Don't have an account? <span className='font-bold cursor-pointer'>
              <TransitionLink href='/membership/signUp'>Sign Up</TransitionLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn;