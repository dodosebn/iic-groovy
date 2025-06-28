'use client';

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authState';
// import { supabase } from '@/app/store/supabaseClient';
import TransitionLink from '@/utils/transitionLink';
// import { toast } from 'react-toastify';

const SignIn = () => {
  // const router = useRouter();
  const { email, password, handleEmailChange, handlePasswordChange } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   if (password.length < 6) {
  //     toast.error('Password must be at least 6 characters.');
  //     setLoading(false);
  //     return;
  //   }

  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     toast.error(error.message);
  //   } else {
  //     toast.success('Welcome back! Signed in successfully 🎉');
  //     router.push('/');
  //   }

  //   setLoading(false);
  // };

  return (
    <div className='bg-[#fffacd] border-1 border-[#333] rounded-2xl p-6 lg:px-[2rem] lg:py-[3rem] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.15)] transition-all duration-300 w-full max-w-2xl mx-auto flex flex-col justify-between'>
      <form  className='flex flex-col gap-5 lg:gap-9'>
        <div className='text-center space-y-5'>
          <h1 className='text-2xl lg:text-4xl font-bold text-[#333]'>Sign In to Groovy</h1>
          <p className='text-base lg:text-lg text-[#555]'>Welcome back! Please enter your details</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg font-medium text-[#333] ml-4">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your@email.com"
              className="w-full indent-[1rem] p-3 bg-[#fff] text-sm rounded-full border-1 border-[#333] focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 lg:text-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-lg font-medium text-[#333] ml-4">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full p-3 indent-[1rem] bg-[#fff] text-sm rounded-full border-1 border-[#333] focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 lg:text-lg"
              required
            />
          </div>

          <div className="flex justify-between items-center px-4">
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" />
              <label htmlFor="remember" className="ml-2 block text-sm text-[#333]">Remember me</label>
            </div>
            <TransitionLink href="/Features/forgetPass">
              <span className="text-sm font-bold text-[#333] hover:underline">Forgot password?</span>
            </TransitionLink>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#ff4c60] text-[#333] px-8 py-2 rounded-full font-medium text-sm lg:text-base transition-all duration-200 hover:scale-105 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.3)] active:scale-95 active:shadow-[1px_1px_0px_rgba(0,0,0,0.3)] disabled:opacity-60"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </div>

        <div>
          <p className='text-center text-sm text-[#333]'>
            Don&apos;t have an account?{' '}
            <span className='font-bold cursor-pointer'>
              <TransitionLink href='/membership/signUp'>Sign Up</TransitionLink>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
