import React from 'react';
import ThirdIt from './thirdIt';
import FourIt from './fourIt';
import FirstIt from './firstIt';
import SecondIt from './secondIt';

const SideBar = () => {
  return (
    <div className="flex flex-col gap-[3rem]">
<FirstIt />
  <SecondIt />
     <ThirdIt />
     <FourIt />
    </div>
  );
};

export default SideBar;
