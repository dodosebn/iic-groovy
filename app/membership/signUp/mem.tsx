
'use client';

import React, { useState, useEffect } from 'react';
import TransitionLink from '@/utils/transitionLink';
import { supabase } from '@/app/store/supabaseClient';
import { useAuthStore } from '@/app/store/authState';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mem = () => {
  const { email, password, handleEmailChange, handlePasswordChange } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(async (event, session) => {
  //     if (event === 'SIGNED_IN') {
  //       const user = session?.user;
  //       if (user?.email_confirmed_at) {
  //         setIsConfirmed(true);
  //         toast.success('Thanks for subscribing to Groovy! We will keep you updated on premium information.');
  //       }
  //     }
  //   });
  // }, []);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     // 1. Check if email exists in iic_membership
  //     const { data: existingUsers, error: fetchError } = await supabase
  //       .from('iic_membership')
  //       .select('email')
  //       .eq('email', email);

  //     if (fetchError) throw fetchError;

  //     if (existingUsers && existingUsers.length > 0) {
  //       toast.warning(
  //         <div>
  //           <p>This email is already registered!</p>
  //           <p className="text-sm mt-1">
  //             <TransitionLink href="/signIn">
  //             <span className="underline font-bold"> Sign in here</span>
  //             </TransitionLink>
  //           </p>
  //         </div>,
  //         { autoClose: 5000 }
  //       );
  //       return;
  //     }

  //     // 2. Sign up with Supabase Auth
  //     const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: { phone },
  //         emailRedirectTo: `${window.location.origin}/signIn`
  //       },
  //     });

  //     if (signUpError) throw signUpError;

  //     // 3. Only proceed if signup was successful
  //     if (signUpData.user) {
  //       // 4. Insert into iic_membership table
  //       const { error: insertError } = await supabase
  //         .from('iic_membership')
  //         .insert([{
  //           email,
  //           phone,
  //           user_uid: signUpData.user.id, // Link to auth user
  //           created_at: new Date().toISOString()
  //         }]);

  //       if (insertError) throw insertError;

  //       toast.success(`Check ${email} for confirmation link!`);
  //     }
  //   } catch (error: any) {
  //     console.error('Signup error:', error);
      
  //     if (error.message.includes('already registered')) {
  //       toast.warning(
  //         <div>
  //           <p>This email is already registered!</p>
  //           <p className="text-sm mt-1">
  //             <TransitionLink href="/signIn">
  //            <span  className="underline font-bold"> Sign in here</span>  
  //             </TransitionLink>
  //           </p>
  //         </div>,
  //         { autoClose: 5000 }
  //       );
  //     } else {
  //       toast.error(error.message || 'Signup failed. Please try again.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // if (isConfirmed) {
  //   return (
  //     <div className='bg-[#fffacd] border-1 border-[#333] rounded-2xl p-6 lg:px-[2rem] lg:py-[3rem] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.15)] transition-all duration-300 w-full max-w-2xl mx-auto flex flex-col justify-between'>
  //       <div className='text-center space-y-5'>
  //         <h1 className='text-2xl lg:text-4xl font-bold text-[#333]'>Welcome to Groovy!</h1>
  //         <p className='text-base lg:text-lg text-[#555]'>
  //           Thanks for subscribing to Groovy! We will keep you updated on premium information as a member.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} />
      <div className='bg-[#fffacd] border-1 border-[#333] rounded-2xl p-6 lg:px-[2rem] lg:py-[3rem] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.15)] transition-all duration-300 w-full max-w-2xl mx-auto flex flex-col justify-between'>
        <form className='flex flex-col gap-5 lg:gap-9'>
          <div className='text-center space-y-5'>
            <h1 className='text-2xl lg:text-4xl font-bold text-[#333]'>Subscribe to Groovy</h1>
            <p className='text-base lg:text-lg text-[#555]'>Become a Member & Never Miss an Update</p>
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
                value={email}
                onChange={handleEmailChange}
                placeholder="your@email.com"
                className="w-full indent-[1rem] p-3 bg-[#fff] text-sm rounded-full border-1 border-[#333]
                focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 lg:text-lg"
                required
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 (706) 456-7890"
                className="w-full p-3 indent-[1rem] bg-[#fff] text-sm rounded-full border-1 border-[#333]
                focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 lg:text-lg"
                required
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
                value={password}
                onChange={handlePasswordChange}
                placeholder="Create a password"
                className="w-full p-3 indent-[1rem] bg-[#fff] text-sm rounded-full border-1 border-[#333]
                focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 lg:text-lg"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#ff4c60] text-[#333] px-8 py-2 rounded-full font-medium text-sm lg:text-base
                transition-all duration-200 hover:scale-105 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.3)]
                active:scale-95 active:shadow-[1px_1px_0px_rgba(0,0,0,0.3)] disabled:opacity-70"
              >
                {loading ? 'Signing you up…' : 'Subscribe'}
              </button>
            </div>
          </div>

          <div>
            <p className='text-center text-sm text-[#333]'>
              Already have an account?{' '}
              <span className='font-bold cursor-pointer'>
                <TransitionLink href='/signIn'>Sign In</TransitionLink>
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Mem;