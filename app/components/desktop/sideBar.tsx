import React from 'react';
import ThirdIt from './thirdIt';
import SecondIt from './secondIt';
import AboutMeContainer from '@/utils/aboutMeContainer';
import SideTag from './sideTag';
import JohnDoe from './sideBarAuthorDescribtion/first/johnDoe';
import MaryBuzard from './sideBarAuthorDescribtion/first/maryBuzard';
import Joseph from './sideBarAuthorDescribtion/first/joseph';
import James from './sideBarAuthorDescribtion/first/james';

interface SideBarProps {
  name: string;
}

const SideBar: React.FC<SideBarProps> = ({ name }) => {
  const lowerName = name.toLowerCase();

  return (
    <div className="flex flex-col gap-[3rem]">
      {lowerName.includes('jonathan doe') ? (
        <JohnDoe />
      ) : lowerName.includes('mary buzard') ? (
        <MaryBuzard />
      ) : lowerName.includes('joseph fransis') ? (
        <Joseph />
      ) : (
        <James />
      )}

      <SecondIt />
      <ThirdIt />

      <AboutMeContainer name="Tag Cloud">
        <SideTag />
      </AboutMeContainer>
    </div>
  );
};

export default SideBar;
