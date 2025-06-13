import React, { ReactNode } from 'react';

interface AboutMeContainerProps {
  children: ReactNode;
  name: string;
}

const AboutMeContainer = ({ children, name }: AboutMeContainerProps) => {
  return (
    <main className='bg-[#fffacd] border border-[#333] rounded-2xl relative p-6'>
      <div className='absolute -top-5 left-6 bg-white px-5 py-1 text-sm font-medium border border-[#333]
       rounded-3xl '>
       <h1 className='font-bold text-xl'>{name}</h1> 
      </div>
      <div className='pt-5'>{children}</div>
    </main>
  );
};

export default AboutMeContainer;