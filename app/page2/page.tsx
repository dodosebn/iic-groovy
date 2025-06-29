'use client';

import React from 'react';
import HomePage from '../components/home/homePage';
import TransitionLink from '@/utils/transitionLink';
import { useTagStore } from '../store/useTagStore';

const Page2 = () => {
  const { selectedTag, clicked, resetTag } = useTagStore();

  const isFiltering = selectedTag && clicked;
  const num1 = isFiltering ? 0 : 6;
  const num2 = isFiltering ? 6 : 12;

  return (
    <div className="flex justify-center flex-col px-[1rem]">
      <HomePage num1={num1} num2={num2} />

      <div className="flex gap-3 w-full py-6 justify-center">
        <div>
          <TransitionLink href="/" onClick={resetTag}>
            <button
              className="bg-[#ff4c60] border border-[#333] text-white px-[1.5rem] py-[0.3rem] font-semibold rounded-3xl flex items-center gap-2 
              transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5"
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
  );
};

export default Page2;
