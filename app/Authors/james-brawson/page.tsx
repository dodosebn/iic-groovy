import React from 'react';
import MainAuthWrapper from '../mainAuthWrapper';
import Page1Maps from '@/app/components/home/data/page1Maps';
import AuthWrapper from '../authWrapper';
import SideBar from '@/app/components/desktop/sideBar';
import dread from '@/public/authors/auth-dread.jpg';


const Page = () => {
    const name='James Brawson';
  return (
    <div className='px-3'>
      <div className='py-7'>
  <MainAuthWrapper name={'James Brawson'} describ={'Collaborator'}
  displayImg={dread }
       paragraph={'Actively writing articles for this website. I really like traveling and photography, follow me on @Twitter i share content there everyday.'} />
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



