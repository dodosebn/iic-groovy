import React from 'react';
import Image from 'next/image';
import introImg from '@/public/images/introImg.avif';

const SResult = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Speed Results</h1>

      <p className="text-lg mb-8">
        Check <span className="font-bold">Groovy</span> performance with the most important{' '}
        <span className="font-bold">speed tests:</span>
      </p>
      
      <section className="flex flex-col items-center gap-8">
        {/* Main large image */}
        <div className="w-full max-w-2xl group">
          <Image 
            src={introImg} 
            alt="Performance illustration"
            className="rounded-lg shadow-md w-full h-[13rem] object-cover 
            transition-transform duration-300 group-hover:scale-[1.0] group-hover:-translate-y-1"
          />
        </div>
        
        {/* Two smaller images in a row below */}
        <div className="w-full max-w-2xl">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group transition-transform duration-300 hover:scale-[1.0] hover:-translate-y-1">
                <Image 
                  src={introImg} 
                  alt="Performance metric 1"
                  className="rounded-lg shadow-md w-[13rem] h-[13rem] border-4 border-[#3f82f7]"
                />
              </div>
              <div className="group transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1">
                <Image 
                  src={introImg} 
                  alt="Performance metric 2"
                  className="rounded-lg shadow-md w-[13rem] h-[13rem] border-4 border-[#8ba4be]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SResult;