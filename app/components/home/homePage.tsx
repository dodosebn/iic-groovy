// 'use client';
import React from 'react';
import HomeWrapper from './customs/homeWrapper';
import Page1Maps from './data/page1Maps';

const HomePage = ({ num1, num2 }: { num1: number , num2: number}) => {
  return (
    <div className="home-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Page1Maps.slice(num1, num2).map((item) => (
          <HomeWrapper key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
