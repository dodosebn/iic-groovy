import React from 'react';
import MainAuthWrapper from '../mainAuthWrapper';
import Page1Maps from '@/app/components/home/data/page1Maps';
import AuthWrapper from '../authWrapper';
import SideBar from '@/app/components/desktop/sideBar';



const Page = () => {
    const name='Jonathan Doe';
  return (
    <div>
      <div className='py-7'>
      <MainAuthWrapper name={name} describ={'Chile'} paragraph={'Hello! My name is Jonathan Doe working from Chile. I create some Ghost and Wordpress themes for differents markets, also, i offer live support via our ticket system.'} />
     </div>
     <main className='flex gap-6'>
        <div className='flex-2'>
      <div className='flex flex-col gap-6'>
        {Page1Maps.filter(item => item.imgName === name).map(item => (
          <AuthWrapper key={item.id} {...item} />
        ))}
      </div>
      </div>
      <div>
        <SideBar />
      </div>
      </main>
    </div>
  );
};

export default Page;
