import React from 'react';
import MainAuthWrapper from '../mainAuthWrapper';
import Page1Maps from '@/app/components/home/data/page1Maps';
import AuthWrapper from '../authWrapper';
import SideBar from '@/app/components/desktop/sideBar';



const Page = () => {
    const name='James Brawson';
  return (
    <div>
      <div className='py-7'>
  <MainAuthWrapper name={'James Brawson'} describ={'Collaborator'}
       paragraph={'Actively writing articles for this website. I really like traveling and photography, follow me on @Twitter i share content there everyday.'} />
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



