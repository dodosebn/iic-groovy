import AboutMeContainer from '@/utils/aboutMeContainer';
import Button from '@/utils/button';
import React from 'react';

const FourIt = () => {
  return (
    <section>
      <AboutMeContainer name="Tag Cloud">
        <div className="flex justify-start mb-4">
          <Button 
            name="Getting Started" 
            spanBg="#1dd7c2" 
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button name="Health" spanBg="#83ea6c"  />
          <Button name="Lifestyle" spanBg="#ffaeab"  />
          <Button name="Music" spanBg="#ffcf00"  />
          <Button name="Technology" spanBg="#85b2f4"  />
        </div>

        <div className="flex justify-start">
          <Button 
            name="Travel" 
            spanBg="#c5c5fe" 
          />
        </div>
      </AboutMeContainer>
    </section>
  );
};

export default FourIt;