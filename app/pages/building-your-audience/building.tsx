// pages > building-your-audience > building.tsx
'use client';
import React from 'react';
import tallHand from '@/public/images/tall-hand-holding-bulb.jpg';
import FirstCard from '@/app/components/middleScroll/firstCard';
import CenteringPages from '@/utils/centeringPages';

const Building = () => {
  return (
    <CenteringPages>
        <FirstCard
          imgGen={tallHand}
          title={'Building your audience with subscriber signups'}
          date={'September 25, 2022'}
          duration={'3 min read'}
          bg="#f0f0fe"
          tag={'Health'}
        />
   </CenteringPages>
  );
};

export default Building;
