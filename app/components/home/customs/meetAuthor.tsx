'use client';
import React, { useState, useEffect } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import MeetCont from './meetCont';

const MeetAuthor = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5); // Default to desktop view
  
  useEffect(() => {
    // Function to update itemsToShow based on screen width
    const handleResize = () => {
      setItemsToShow(window.innerWidth >= 768 ? 5 : 2);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= 6 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? 5 : prevIndex - 1
    );
  };

  return (
    <div className='md:py-[4.5rem] p-[1.2rem] md:p-0'>
      <div className='flex w-full justify-between'>
        <div className='mt-3 md:mt-0'>
          <button className='px-5 py-1 bg-[#fff] text-[rgb(51,51,51)] border border-[#333] rounded-3xl font-bold text-lg'>
            Meet The Author
          </button>
        </div>

        <div className='flex space-x-3'>
          <button 
            onClick={handlePrev}
            className='bg-[#fff] text-[#333] border-1 border-[#333] px-4 py-4 rounded-full transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5'
          >
            <FaArrowLeftLong size={24}/>
          </button>
          <button 
            onClick={handleNext}
            className='bg-[#fff] text-[#333] border-1 border-[#333] px-4 py-4 rounded-full transition-transform duration-300 ease-in-out hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5'
          >
            <FaArrowRightLong size={24}/>
          </button>
        </div>
      </div>
      
      <div>
        <MeetCont currentIndex={currentIndex} />
      </div>
    </div>
  )
}

export default MeetAuthor;