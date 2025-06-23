import React from 'react';
import MainAuthWrapper from '../mainAuthWrapper';
import Page1Maps from '@/app/components/home/data/page1Maps';
import AuthWrapper from '../authWrapper';
import SideBar from '@/app/components/desktop/sideBar';
import smiliing from '@/public/authors/auth-smilingGee.jpg';


const Page = () => {
    const name='Jonathan Doe';
  return (
    <div className='px-3'>
      <div className='py-7'>
      <MainAuthWrapper displayImg={smiliing } name={name} describ={'Chile'} paragraph={'Hello! My name is Jonathan Doe working from Chile. I create some Ghost and Wordpress themes for differents markets, also, i offer live support via our ticket system.'} />
     </div>
     <main className='flex gap-6'>
        <div className='flex-2'>
      <div className='flex flex-col gap-6'>
        {Page1Maps.filter(item =>
  item.imgName.toLowerCase().includes(name.slice(0, 4).toLowerCase())
).map(item => (
          <AuthWrapper key={item.id} {...item} />
        ))}
      </div>
      </div>
      <div className='hidden lg:flex'>
        <SideBar />
      </div>
      </main>
    </div>
  );
};

export default Page;
