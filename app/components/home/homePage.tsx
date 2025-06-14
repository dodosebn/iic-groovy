// 'use client';
import React from 'react'
import HomeWrapper from './customs/homeWrapper';
import Page1Maps from './data/page1Maps';

const HomePage = () => {
  
  return (
    <div className="home-container">
      {Page1Maps.map((card, index) => (
<div className={index > 0 ? 'mt-6' : ''} key={card.id}> 
         <HomeWrapper
          bg={card.bg}
          pics={card.pics}
          picsIcon1={card.picsIcon1}
          date={card.date}
          duration={card.duration}
          h1={card.h1}
          p={card.p}
          img={card.img}
          imgName={card.imgName}
          btnCol={card.btnCol}
          btnTxt={card.btnTxt}
        />
        </div>
      ))}
    </div>
  )
}

export default HomePage;