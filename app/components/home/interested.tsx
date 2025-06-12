import Button from '@/utils/button';
import React from 'react';

const Interested = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">
        Interested?
      </h1>
      
      <p className="text-xl mb-8 leading-relaxed">
        <span className="font-bold ">Groovy</span> includes comprehensive documentation and {' '}
        <span className="font-bold ">5-star support </span> within a  <br />
         ticket system.
      </p>
      
      <div className="flex justify-center">
        <Button 
          name='Live Preview' 
          bgCol='#79b530'
          txtCol="#fdfefc"
          px='2.4'
          py='0.75'
        />
      </div>
    </div>
  );
};

export default Interested;