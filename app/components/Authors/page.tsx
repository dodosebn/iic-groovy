import React from 'react';
import Page1Maps from '../home/data/page1Maps';
import MainAuthWrapper from './mainAuthWrapper';
import AuthWrapper from '@/app/Authors/authWrapper';

const Page = () => {
  return (
    <div>
      <MainAuthWrapper name='Jonathan Doe' describ={'Chile'} paragraph={'Hello! My name is Jonathan Doe working from Chile. I create some Ghost and Wordpress themes for differents markets, also, i offer live support via our ticket system.'} />
      <div>
        {Page1Maps.filter(item => item.imgName === 'Jonathan ').map(item => (
          <AuthWrapper key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
