
import React from 'react';
import MainAuthWrapper from '../mainAuthWrapper';
import Page1Maps from '@/app/components/home/data/page1Maps';
import AuthWrapper from '../authWrapper';
import SideBar from '@/app/components/desktop/sideBar';



const Page = () => {
    const name='Mary Buzard';
  return (
    <div>
      <div className='py-7'>
<MainAuthWrapper name={name} describ={'Collaborator & editor'}
       paragraph={'Hello! My name is Mary Buzard!, Actively writing articles for this website. I really like tutorials and illustrations, so stay alert for my next tutorials.'} />
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


