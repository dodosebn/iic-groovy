import React from 'react';
import ThirdIt from './thirdIt';
import FourIt from './fourIt';
import FirstIt from './firstIt';
import SecondIt from './secondIt';
import AboutMeContainer from '@/utils/aboutMeContainer';
import SideTag from './sideTag';

const SideBar = () => {
  return (
    <div className="flex flex-col gap-[3rem]">
<FirstIt />
  <SecondIt />
     <ThirdIt />
<AboutMeContainer  name={'Tag Cloud'}>
  <SideTag />
     </AboutMeContainer>
    </div>
  );
};

export default SideBar;
