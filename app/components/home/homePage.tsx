// 'use client';
import React from 'react'
import HomeWrapper from './customs/homeWrapper';
import Page1Maps from './data/page1Maps';

const HomePage = () => {
  
  return (
    <div className="home-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Page1Maps.slice(0, 6).map((item) => (
          <HomeWrapper key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default HomePage;